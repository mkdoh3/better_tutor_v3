import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "./components/DataTable";
import DropSelect from "./components/DropSelect";
import Btn from "./components/Btn";
import ActiveSession from "./components/ActiveSession";
import SaveModal from "./components/SaveModal";
import API from "./services/API";
import { filter, obj } from "./utils";
import { sortBy, findIndex } from "lodash";
import "./App.css";

class App extends Component {
  state = {
    sessionData: [],
    rosterData: [],
    updated: [],
    activeSession: null,
    tab: "todaysSessions",
    attemptedTabClick: null,
    show: false
  };
  componentDidMount() {
    this.fetchSessionData();
    this.fetchRosterData();
  }
  modalToggle = () => {
    this.setState({ show: !this.state.show });
  };

  fetchSessionData = async () => {
    try {
      const sessionRes = await API.getSheetData(1);
      const sessionData = await sessionRes.data;
      return this.setState({ sessionData, show: false, updated: [] });
    } catch (err) {
      throw new Error(err);
    }
  };

  fetchRosterData = async () => {
    try {
      const rosterRes = await API.getSheetData(3);
      const rosterData = await rosterRes.data;
      console.log("get dis data -------> ", rosterData);
      return this.setState({ rosterData, show: false, updated: [] });
    } catch (err) {
      throw new Error(err);
    }
  };
  //rework to rely on actual data instead of made up index
  findSessionNotes = (email, date) => {
    const sessionData = this.state.sessionData.filter(
      row => row.email === email
    );
    const sortedSessions = sortBy(sessionData, "sessionDate");
    const prevIndex = findIndex(sortedSessions, { sessionDate: date }) - 1;
    return sessionData[prevIndex].notes;
  };
  //maybe update based on id instead of index
  //this is probably a little sloppy. The idea is to save the indices of updated object to later do a batch update on the backend on save or componentWillUnmount
  handleSessionUpdate = (data, table) => {
    const { rowId } = data;
    const sessionData = [...this.state.sessionData];
    const updated = [...this.state.updated];
    if (!updated.includes(rowId)) {
      updated.push(rowId);
    }
    const index = findIndex(sessionData, { rowId });
    sessionData[index] = data;
    this.setState({ sessionData, updated });
  };

  handleSaveSessions = () => {
    debugger;
    const updates = this.state.sessionData.filter(session => {
      return this.state.updated.includes(session.rowId);
    });
    API.updateSheet(updates, "sessionData").then(() => {
      this.fetchSessionData();
    });
  };

  handleDiscardChanges = () => {
    if (this.state.tab === "roster") {
      this.fetchRosterData();
    } else {
      this.fetchSessionData();
    }
    this.setState({
      tab: this.state.attemptedTabClick,
      attemptedTabClick: null
    });
  };

  handleAddStudent = () => {
    const rosterData = [...this.state.rosterData];
    const updated = [...this.state.updated];
    const rowData = { ...this.state.rosterData[0] };
    obj.placeholderObj(rowData);
    this.handleAddRow("rosterData", rosterData, rowData, updated);
  };

  handleAddSession = eventKey => {
    const sessionData = [...this.state.sessionData];
    const updated = [...this.state.updated];
    const rowData = filter.findStudent(eventKey, this.state.rosterData);
    const newRow = obj.buildSession(sessionData[0], rowData);
    sessionData.push(newRow);
    updated.push(newRow.rowId);
    this.setState({ sessionData, updated });
  };

  handleAddRow = (table, data, newRow) => {
    const updated = [...this.state.updated];
    const newIndex = data.length;
    newRow.index = newIndex;
    newRow.newRow = true;
    data.push(newRow);
    updated.push(newIndex);
    this.setState({ [table]: data, updated });
  };

  handleRowDelete = id => {
    API.deleteRow(id);
    const sessionData = this.state.sessionData.filter(
      session => session.rowId !== id
    );
    this.setState({ sessionData });
  };

  handleStartSession = activeSession => {
    //do we need to even save all of this active session data in state?? can I just do state.activeSession: true?
    //then from here could we pass the row data directly to renderActiveSession?
    if (!this.state.activeSession) {
      this.setState({ activeSession });
    }
  };

  renderTodaysSession = () => {
    const data = filter.filterTodaysSessions(this.state.sessionData);
    if (data.length === 0) {
      return <h1 className="no-sessions">Sorry, no sessions today</h1>;
    } else {
      return (
        <DataTable
          data={data}
          sessions={true}
          todaysSessions={true}
          tableName="sessionData"
          handleRowUpdate={this.handleSessionUpdate}
          handleStartSession={this.handleStartSession}
        />
      );
    }
  };
  //pretty sure the sessions arg is now obsolete?
  renderDataTable = (table, sessions = false) => {
    const handler =
      table === "sessionData"
        ? this.handleSessionUpdate
        : this.handleRosterUpdate;
    return this.state[table].length > 0 ? (
      <DataTable
        tableName={table}
        sessions={sessions}
        data={this.state[table]}
        handleRowUpdate={handler}
        handleRowDelete={this.handleRowDelete}
      />
    ) : (
      <h1>Fetching Table Data</h1>
    );
  };

  renderDropSelect = () => {
    return this.state.rosterData.length > 0 ? (
      <DropSelect
        title="Add Session"
        onSelect={this.handleAddSession}
        options={filter.filterNames(this.state.rosterData)}
      />
    ) : null;
  };

  renderAddStudentBtn = () => (
    <Btn variant="primary" onClick={this.handleAddStudent} text="Add Student" />
  );

  renderSaveBtn = table => {
    const handler =
      table === "sessionData" ? this.handleSaveSessions : this.handleSaveRoster;
    return this.state.updated.length > 0 ? (
      <Btn variant="success" text="save" onClick={handler} />
    ) : null;
  };

  renderActiveSession = () => {
    //this component already has the whole list of session, so we should probs just find the previous session notes from here and make ActiveSession stateless
    const studentData = { ...this.state.activeSession };
    const { email, sessionDate } = studentData;
    const prevNotes = this.findSessionNotes(email, sessionDate);
    studentData.prevNotes = prevNotes;
    return <ActiveSession studentData={studentData} />;
  };

  renderSaveModal = () => {
    const { tab } = this.state;
    const table =
      this.state.tab === "todaysSession" || tab === "allSessions"
        ? "sessionData"
        : "rosterData";
    return (
      <SaveModal
        table={table}
        show={this.state.show}
        modalToggle={this.modalToggle}
        handleDiscardChanges={this.handleDiscardChanges}
        handleSaveChanges={this.handleOnSave}
      />
    );
  };
  handleTabSelect = tab => {
    if (this.state.updated.length === 0) {
      this.setState({ tab });
    } else {
      this.setState({ attemptedTabClick: tab });
      this.modalToggle();
    }
  };

  render() {
    return (
      <>
        {this.state.show && this.renderSaveModal()}
        <Tabs activeKey={this.state.tab} onSelect={this.handleTabSelect}>
          <Tab eventKey="todaysSessions" title="Today's Sessions">
            {this.renderTodaysSession()}
            {this.renderSaveBtn("sessionData")}
            {this.state.activeSession && this.renderActiveSession()}
          </Tab>
          <Tab eventKey="allSessions" title="All Sessions">
            {this.renderDataTable("sessionData", true)}
            {this.state.updated.length > 0
              ? this.renderSaveBtn("sessionData")
              : this.renderDropSelect()}
          </Tab>
          <Tab eventKey="roster" title="Roster">
            {this.renderDataTable("rosterData")}
            {this.state.updated.length > 0
              ? this.renderSaveBtn("rosterData")
              : this.renderAddStudentBtn()}
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;

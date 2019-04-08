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
import uniqid from "uniqid";
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

  findSessionNotes = (email, date) => {
    const sessionData = this.state.sessionData.filter(
      row => row.email === email
    );
    const sortedSessions = sortBy(sessionData, "sessionDate");
    const prevIndex = findIndex(sortedSessions, { sessionDate: date }) - 1;
    return sessionData[prevIndex].notes;
  };

  //handleAddStudent and handleAddSession were originally a single function
  // - but it seemed to cause more headaches than a few less lines of code were worth

  handleAddStudent = () => {
    const rosterData = [...this.state.rosterData];
    const updated = [...this.state.updated];
    const rowData = { ...this.state.rosterData[0] };
    const newRow = obj.placeholderObj(rowData);
    newRow.rowId = uniqid();
    newRow.newRow = true;
    rosterData.push(newRow);
    updated.push(newRow.rowId);
    this.setState({ rosterData, updated });
  };

  handleAddSession = eventKey => {
    const sessionData = [...this.state.sessionData];
    const updated = [...this.state.updated];
    const rowData = filter.findStudent(eventKey, this.state.rosterData);
    const newRow = obj.buildSessionRow(sessionData[0], rowData);
    sessionData.push(newRow);
    updated.push(newRow.rowId);
    this.setState({ sessionData, updated });
  };

  //save a ref to the updated session obj for later batch save
  handleRowUpdate = (data, table) => {
    // debugger;
    const { rowId } = data;
    const rowData = [...this.state[table]];
    const updated = [...this.state.updated];
    if (!updated.includes(rowId)) {
      updated.push(rowId);
    }
    const index = findIndex(table, { rowId });
    rowData[index] = data;
    this.setState({ [table]: rowData, updated });
  };

  handleSaveChanges = async table => {
    console.log(table);
    const updates = this.state[table].filter(row => {
      return this.state.updated.includes(row.rowId);
    });
    await API.updateSheet(updates, table);
    // re-fetching the data so that the row is no longer set as newRow: true
    // ..couldn't figure out a better way to do this on the front end
    this.fetchSessionData();
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

  handleRowDelete = id => {
    API.deleteRow(id);
    const sessionData = this.state.sessionData.filter(
      session => session.rowId !== id
    );
    this.setState({ sessionData });
  };

  handleStartSession = activeSession => {
    if (!this.state.activeSession) {
      this.setState({ activeSession });
    }
  };

  handleEndSession = () => {
    this.setState({ activeSession: null });
  };

  renderFilteredSessions = filterType => {
    const data = filter.filterSessions(filterType, this.state.sessionData);
    if (data.length === 0) {
      return <h1 className="no-sessions">No Sessions Scheduled</h1>;
    } else {
      return this.renderDataTable("sessionData", true, true, data);
    }
  };

  renderDataTable = (
    tableName,
    sessions = false,
    today = false,
    filteredData = false
  ) => {
    return this.state.sessionData.length > 0 ? (
      <DataTable
        tableName={tableName}
        sessions={sessions}
        data={filteredData || this.state[tableName]}
        todaysSessions={today}
        handleRowUpdate={this.handleRowUpdate}
        handleRowDelete={this.handleRowDelete}
        handleStartSession={today && this.handleStartSession}
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

  renderSaveBtn = (table = "sessionData") => {
    return this.state.updated.length > 0 ? (
      <Btn
        variant="success"
        text="save"
        onClick={() => this.handleSaveChanges(table)}
      />
    ) : null;
  };

  renderActiveSession = () => {
    const studentData = { ...this.state.activeSession };
    const { email, sessionDate } = studentData;
    const prevNotes = this.findSessionNotes(email, sessionDate);
    studentData.prevNotes = prevNotes;
    return (
      <ActiveSession
        studentData={studentData}
        handleEndSession={this.handleEndSession}
      />
    );
  };

  //I'm sure there's a way reuse my save buttons inside of my modal
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
        handleSaveChanges={() => this.handleSaveChanges(table)}
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
            {this.renderFilteredSessions("today")}
            {this.renderSaveBtn()}
            {this.state.activeSession && this.renderActiveSession()}
          </Tab>
          <Tab eventKey="tomorrowsSessions" title="Tomorrow's Sessions">
            {this.renderFilteredSessions("tomorrow")}
            {this.renderSaveBtn()}
          </Tab>
          <Tab eventKey="weeksSessions" title="Next 7 Days">
            {this.renderFilteredSessions("weekly")}
            {this.renderSaveBtn()}
          </Tab>
          <Tab eventKey="allSessions" title="All Sessions">
            {this.renderDataTable("sessionData", true)}
            {this.state.updated.length > 0
              ? this.renderSaveBtn()
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

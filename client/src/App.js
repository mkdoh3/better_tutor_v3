import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "./components/DataTable";
import DropSelect from "./components/DropSelect";
import Btn from "./components/Btn";
import API from "./utils/API";
import ActiveSession from "./components/ActiveSession";
import filter from "./utils/dataFilter";
import "./App.css";

class App extends Component {
  state = {
    sessionData: [],
    rosterData: [],
    updated: [],
    activeSession: null
  };
  componentDidMount() {
    this.fetchSessionData();
    this.fetchRosterData();
  }

  fetchSessionData = async () => {
    try {
      const sessionRes = await API.getSheetData(1);
      const sessionData = await sessionRes.data;
      sessionData.forEach((record, i) => (record.index = i));
      return this.setState({ sessionData });
    } catch (err) {
      throw new Error(err);
    }
  };

  fetchRosterData = async () => {
    try {
      const rosterRes = await API.getSheetData(3);
      const rosterData = await rosterRes.data;
      rosterData.forEach((record, i) => (record.index = i));
      return this.setState({ rosterData });
    } catch (err) {
      throw new Error(err);
    }
  };

  findSessionNotes = (studentEmail, index) => {
    const sessionData = this.state.sessionData;
    for (let i = index - 1; i >= 0; i--) {
      if (sessionData[i].studentEmail === studentEmail) {
        return sessionData[i].notes;
      }
    }
  };

  //this is probably a little sloppy. The idea is to save the indices of updated object to later do a batch update on the backend on save or componentWillUnmount
  handleRowUpdate = (data, table) => {
    console.log(data);
    const indexRef = data.index;
    const tableData = [...this.state[table]];
    const updated = [...this.state.updated];
    if (!updated.includes(indexRef)) {
      updated.push(indexRef);
    }
    tableData[indexRef] = data;
    this.setState({ [table]: tableData, updated });
  };

  handleOnSave = tableName => {
    const updates = [];
    this.state.updated.forEach(indexRef => {
      updates.push(this.state[tableName][indexRef]);
    });
    API.update(updates, tableName).then(() => this.setState({ updated: [] }));
  };

  handleAddStudent = () => {
    const rosterData = [...this.state.rosterData];
    const rowData = { ...this.state.rosterData[0] };
    //set placeholder text
    for (let key in rowData) {
      rowData[key] = key;
    }
    rowData.index = rosterData.length;
    //set newRow property for properly handling update in the sheetsUtils.updateSheet
    rowData.newRow = true;
    rosterData.push(rowData);
    this.setState({ rosterData });
  };

  handleAddSession = eventKey => {
    const sessionData = [...this.state.sessionData];
    const updated = [...this.state.updated];
    const newIndex = sessionData.length;
    const rowData = this.state.rosterData.find(
      student => student.studentName === eventKey
    );
    for (let key in sessionData[0]) {
      if (!rowData.hasOwnProperty(key)) {
        rowData[key] = "";
      }
    }
    rowData.index = newIndex;
    rowData.newRow = true;
    sessionData.push(rowData);
    updated.push(newIndex);
    this.setState({ sessionData, updated });
  };
  //this is set up to grab all of the row data on row double click within the 'todays sessions' tab
  //that data should be used to render everything else relevant to the current session - adp notes form(b2b, no-show etc. copy to clipboard and launch link to adp)
  //survey link and class code(copy to clip board option), embedded tutor survey pre populated with student data
  //timer? launch zoom link? update adp time in and out? better way to save data after session end?
  handleStartSession = activeSession => {
    //do we need to even save all of this active session data in state?? can I just do state.activeSession: true?
    //then from here could we pass the row data directly to renderActiveSession?
    console.log(activeSession);
    if (!this.state.activeSession) {
      this.setState({ activeSession });
    }
  };

  renderSaveBtn = table => {
    return this.state.updated.length > 0 ? (
      <Btn
        variant="success"
        text="save"
        onClick={() => this.handleOnSave(table)}
      />
    ) : null;
  };

  renderTodaysSession = () => {
    const data = filter.filterTodaysSessions(this.state.sessionData);
    if (data.length === 0) {
      return <h1>Sorry, no sessions today</h1>;
    } else {
      return (
        <DataTable
          data={data}
          sessions={true}
          tableName="sessionData"
          handleRowUpdate={this.handleRowUpdate}
          handleStartSession={this.handleStartSession}
        />
      );
    }
  };

  renderDataTable = (table, sessions = false) => {
    return this.state[table].length > 0 ? (
      <DataTable
        tableName={table}
        sessions={sessions}
        data={this.state[table]}
        handleRowUpdate={this.handleRowUpdate}
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

  renderActiveSession = () => {
    //this component already has the whole list of session, so we should probs just find the previous session notes from here and make ActiveSession stateless
    const studentData = { ...this.state.activeSession };
    const { studentEmail, index } = studentData;
    const prevNotes = this.findSessionNotes(studentEmail, index);
    studentData.prevNotes = prevNotes;
    return <ActiveSession studentData={studentData} />;
  };

  render() {
    return (
      <Tabs defaultActiveKey="todaysSessions">
        <Tab
          className="mb-5"
          eventKey="todaysSessions"
          title="Today's Sessions"
        >
          {this.renderTodaysSession()}
          {this.renderSaveBtn("sessionData")}
          {this.state.activeSession && this.renderActiveSession()}
        </Tab>
        <Tab className="mb-5" eventKey="allSessions" title="All Sessions">
          {this.renderDataTable("sessionData", true)}
          {this.renderDropSelect()}
          {this.renderSaveBtn("sessionData")}
        </Tab>
        <Tab className="mb-5" eventKey="roster" title="Roster">
          {this.renderDataTable("rosterData")}
          <Btn
            variant="primary"
            onClick={this.handleAddStudent}
            text="Add Student"
          />
          {this.renderSaveBtn("rosterData")}
        </Tab>
      </Tabs>
    );
  }
}

export default App;

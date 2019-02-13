import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "./components/DataTable";
import DropSelect from "./components/DropSelect";
import Btn from "./components/Btn";
import API from "./utils/API";
import filter from "./utils/dataFilter";
import "./App.css";

class App extends Component {
  state = {
    sessionData: [],
    rosterData: [],
    updated: []
  };
  componentDidMount() {
    this.fetchSessionData();
    this.fetchRosterData();
  }

  fetchSessionData = async () => {
    try {
      const sessionRes = await API.getRows(1);
      const sessionRows = await sessionRes.data;
      const sessionData = await filter.filterRowData(sessionRows, "sessions");
      return this.setState({ sessionData });
    } catch (err) {
      throw new Error(err);
    }
  };

  fetchRosterData = async () => {
    try {
      const rosterRes = await API.getRows(2);
      const rosterRows = await rosterRes.data;
      const rosterData = await filter.filterRowData(rosterRows, "roster");
      return this.setState({ rosterData });
    } catch (err) {
      throw new Error(err);
    }
  };

  //this is probably a little sloppy. The idea is to save the indices of updated object to later do a batch update on the backend on save or componentWillUnmount
  handleRowUpdate = (data, table) => {
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
      student => student.studentname === eventKey
    );
    rowData.index = newIndex;
    rowData.newRow = true;
    sessionData.push(rowData);
    updated.push(newIndex);
    this.setState({ sessionData, updated });
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
          tableName="sessionData"
          handleRowUpdate={this.handleRowUpdate}
          data={data}
          sessions={true}
        />
      );
    }
  };

  renderDataTable = (table, sessions = false) => {
    return this.state[table].length > 0 ? (
      <DataTable
        tableName={table}
        handleRowUpdate={this.handleRowUpdate}
        data={this.state[table]}
        sessions={sessions}
      />
    ) : (
      <h1>Fetching Table Data</h1>
    );
  };

  renderDropSelect = () => {
    return this.state.rosterData.length > 0 ? (
      <DropSelect
        options={filter.filterNames(this.state.rosterData)}
        title="Add Session"
        onSelect={this.handleAddSession}
      />
    ) : null;
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

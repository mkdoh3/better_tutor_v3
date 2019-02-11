import React, { Component } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import DataTable from "./components/DataTable";
import DropdownSelect from "./components/DropdownSelect";
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
    this.fetchSessionData()
      .then(sessionData => {
        this.fetchRosterData()
          .then(rosterData => this.setState({ sessionData, rosterData }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  fetchSessionData = async () => {
    const sessionRes = await API.getRows(1);
    const sessionRows = await sessionRes.data;
    const sessionData = await filter.filterRowData(sessionRows, "sessions");
    return sessionData;
  };
  fetchRosterData = async () => {
    const rosterRes = await API.getRows(2);
    const rosterRows = await rosterRes.data;
    const rosterData = await filter.filterRowData(rosterRows, "roster");
    return rosterData;
  };
  handleAddSession = () => {
    console.log("hi");
  };
  //this is probably a little sloppy. The idea is to save the indices of updated object to later do a batch update on the backend on save or componentWillUnmount
  handleRowUpdate = data => {
    const index = data.index;
    const sessionData = [...this.state.sessionData];
    const updated = [...this.state.updated];
    console.log(updated);
    if (updated.indexOf(index) < 0) {
      updated.push(index);
    }
    sessionData[index] = data;
    this.setState({ sessionData, updated });
  };
  handleOnSave = () => {
    const updates = [];
    this.state.updated.forEach(index => {
      updates.push(this.state.sessionData[index]);
    });
    console.log(updates);
    API.update(updates).then(() => this.setState({ updated: [] }));
  };

  render() {
    return (
      <>
        <Tabs defaultActiveKey="todaysSessions">
          <Tab eventKey="todaysSessions" title="Today's Sessions">
            {filter.filterTodaysSessions(this.state.sessionData).length > 0 ? (
              <DataTable
                handleRowUpdate={this.handleRowUpdate}
                data={filter.filterTodaysSessions(this.state.sessionData)}
                sessions={true}
              />
            ) : (
              <h1>Sorry, no sessions today</h1>
            )}
          </Tab>
          <Tab eventKey="allSessions" title="All Sessions">
            {this.state.sessionData && (
              <DataTable
                handleRowUpdate={this.handleRowUpdate}
                data={this.state.sessionData}
                sessions={true}
              />
            )}
            {this.state.updated.length > 0 && (
              <Button onClick={this.handleOnSave}>Save</Button>
            )}
            {this.state.sessionData && (
              <DropdownSelect
                options={filter.filterNames(this.state.rosterData)}
                title="Add Session"
              />
            )}
          </Tab>
          <Tab eventKey="roster" title="Roster">
            {this.state.rosterData && (
              <DataTable
                handleRowUpdate={this.handleRowUpdate}
                data={this.state.rosterData}
              />
            )}
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;

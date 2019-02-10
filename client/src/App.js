import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DataTable from "./components/DataTable";
import DropdownSelect from "./components/DropdownSelect";
import API from "./utils/API";
import filter from "./utils/dataFilter";

class App extends Component {
  state = {
    sessionData: null
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

  render() {
    return (
      <>
        <Tabs defaultActiveKey="session">
          <Tab eventKey="todaysSessions" title="Today's Sessions">
            {this.state.sessionData && (
              <DataTable
                data={filter.filterTodaysSessions(this.state.sessionData)}
                sessions={true}
              />
            )}
          </Tab>
          <Tab eventKey="allSessions" title="All Sessions">
            {this.state.sessionData && (
              <DataTable data={this.state.sessionData} sessions={true} />
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
              <DataTable data={this.state.rosterData} />
            )}
          </Tab>
        </Tabs>
      </>
    );
  }
}

export default App;

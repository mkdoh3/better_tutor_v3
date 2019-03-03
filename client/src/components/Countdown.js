import React, { Component } from "react";

export default class Countdown extends Component {
  state = {
    count: 60
  };
  componentDidMount() {
    this.initiateCountdown();
  }
  initiateCountdown = () => {
    const timer = setInterval(() => {
      if (this.state.count === 1) {
        clearInterval(timer);
      }
      this.setState({ count: this.state.count - 1 });
    }, 60000);
  };
  render() {
    return (
      <h1
        style={{ textAlign: "center" }}
        id={this.state.count === 0 ? "times-up" : undefined}
      >
        Time remaining: {this.state.count}
      </h1>
    );
  }
}

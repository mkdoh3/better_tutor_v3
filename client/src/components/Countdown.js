import React, { Component } from "react";

export default class Countdown extends Component {
  state = {
    count: 6
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
    }, 600);
  };
  render() {
    return (
      <h1 style={{ textAlign: "center" }}>
        Time remaining: {this.state.count}
      </h1>
    );
  }
}

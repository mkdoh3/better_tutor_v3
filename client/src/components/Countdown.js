import React from "react";

const Countdown = props => {
  return (
    <h1 className="countdown" id={props.timer === 0 ? "times-up" : undefined}>
      Time remaining: {props.timer}
    </h1>
  );
};

export default Countdown;

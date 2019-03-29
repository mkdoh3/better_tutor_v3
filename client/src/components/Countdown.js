import React from "react";

// I don't think an h1 is going to
// be the proper use of a heading
// tag. This will most likely be
// semantically incorraect where
// you place it, but more importantly
// it will corrupt heading ranks.
//
//
// If timer is the only prop you really care about, 
// you can destructure it in the arguments.
//
// const Countdown = ({ timer }) =>
const Countdown = props => {
  return (
    // undefined is returned always, unless you explicitly return something else.
    // Since this is a component, create a function to return the ID, instead of
    // inlining it.
    <h1 className="countdown" id={props.timer === 0 ? "times-up" : undefined}>
      Time remaining: {props.timer}
    </h1>
  );
};

export default Countdown;

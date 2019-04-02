import React from "react";
import { Button } from "react-bootstrap";

// Is it really worth creating a button component
// using Bootstrap's button?
const Btn = props => {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
      {props.text}
    </Button>
  );
};
export default Btn;

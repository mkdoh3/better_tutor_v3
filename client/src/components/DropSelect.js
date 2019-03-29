import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

// If you wanted, you could destructure props.
const DropSelect = props => {
  return (
    <DropdownButton
      className="dropdown-basic-button"
      title={props.title}
      drop="up"
      onSelect={props.onSelect}
    >
      {/*
        When you map children like this, its best to
        put it in a separate rendering method on
        your component for better readability.
      */}
      {props.options.map((option, i) => (
        <Dropdown.Item key={i} eventKey={option}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropSelect;

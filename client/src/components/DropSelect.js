import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
const DropSelect = props => {
  return (
    <DropdownButton
      className="dropdown-basic-button"
      title={props.title}
      drop="up"
      onSelect={props.onSelect}
    >
      {props.options.map((option, i) => (
        <Dropdown.Item key={i} eventKey={option}>
          {option}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropSelect;

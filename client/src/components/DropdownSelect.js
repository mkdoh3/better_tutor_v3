import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
const DropdownSelect = props => {
  console.log(props.options);
  return (
    <DropdownButton id="dropdown-basic-button" title={props.title} drop="right">
      {props.options.map((option, i) => (
        <Dropdown.Item key={i}>{option}</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownSelect;

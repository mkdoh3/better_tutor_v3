import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

// MB: You could use ES6 destructuring here: ({ options })
const DropdownSelect =  ({ options })=> {
  const {
    title,
  } = options;

  return (
    // MB: Avoid using IDs on components. This states that only 1 dropdown component
    // can be used within your app. IDs are meant to be singular, and multiple IDs
    // will create numerious issues from the browser and javascript perspectives.
    // If you are targeting CSS, use class selectors. If you are targeting JS, use
    // data attribute selectors.
    <DropdownButton id="dropdown-basic-button" title={ title } drop="right">
      {/*
        MB: It can be easier to read and more flexible to split child mapping
        into a function call  on the parent container. Good choice on having
        a separate child component.
      */}
      {props.options.map((option, index) => (
        <Dropdown.Item key={ index }>{ option }</Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownSelect;

// MB: Use PropTypes to describe and validate
// data schema: https://www.npmjs.com/package/prop-types

import React from "react";

const TutorForm = props => {
  const date = props.date.split("-");
  console.log(date);

  const baseURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSc_q0CSp5Bpn7lfDAdoPCbBTW-OxWQVhC3gG5P9e6iE4FERjw/viewform";
  const code = `?entry.1626809215=${props.code}`;
  const name = `&entry.1262798942=${props.name}`;
  const email = `&entry.1509111758=${props.email}`;
  const github = `&entry.2097580399=${props.github}`;
  const tutorName = "&entry.737967299=Doherty, Michael"; //enter your name here
  const year = `&entry.401287639_year=${date[0]}`;
  const month = `&entry.401287639_month=${date[1]}`;
  const day = `&entry.401287639_day=${date[2]}`;
  const prefillURL = `${baseURL}${code}${name}${email}${github}${tutorName}${year}${month}${day}`;
  return <iframe title="tutor evaluation form" src={prefillURL} />;
};

export default TutorForm;

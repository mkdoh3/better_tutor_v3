import moment from "moment";
export default {
  filterRowData: (data, table) => {
    const filteredData = [];
    // MB: You could clean this up with some ES6 destructuring
    // Also note, use camel case for better reading:
    data.forEach((row, index) => {
      const {
        classCode,
        graduationDate,
        studentName,
        studentEmail,
        studentGithubUsername,
        studentTz,
        tzDif,
        zoomLink,
      } = row;

      const rowData = {
        index,
        classCode,
        graduationDate,
        studentName,
        studentEmail,
        studentGithubUsername,
        studentTz,
        tzDif,
        zoomLink,
      };

      if (table === "sessions") {
        const {
          sessionDate,
          aptTimeIn,
          aptTimeOut,
          back2Back,
          showNoShow,
          topicsCovered,
          notes,
          tutorsEvalFormwsSubmitted,
          paymentDateAmnt,
        } = row;

        rowData.sessionDate = sessionDate;
        rowData.adpTimeIn = adpTimeIn;
        rowData.adpTimeOut = adpTimeOut;
        rowData.back2Back = back2Back;
        rowData.showNoShow = showNoShow;
        rowData.topicsCovered = topicsCovered;
        rowData.notes = notes;
        rowData.tutorsEvalFormSubmitted = tutorsEvalFormSubmitted;
        rowData.paymentDateAmnt = paymentDateAmnt;
      }

      filteredData.push(rowData);
    });

    return filteredData;
  },

  filterTodaysSessions: data => {
    return data.filter(session => {
      // MB: Save things like formatting and other strings
      // in a /types directory.
      //
      // const DateFormats = Object.freeze({
      //   YYYYMMDD: 'YYYY-MM-DD',
      // });
      return moment().format("YYYY-MM-DD") === session.sessiondate;
    });
  },

  filterNames: data => {
    return data.map(row => row.studentname);
  }
};

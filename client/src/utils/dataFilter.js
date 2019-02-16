import moment from "moment";
export default {
  filterRowData: (data, table) => {
    const filteredData = [];
    data.forEach((row, i) => {
      const {
        classCode,
        graduationDate,
        studentName,
        studentEmail,
        studentGithubUserName,
        studentTz,
        tzDif,
        zoomLink
      } = row;

      let rowData = {
        index: i,
        classCode,
        graduationDate,
        studentName,
        studentEmail,
        studentGithubUserName,
        studentTz,
        tzDif,
        zoomLink
      };

      if (table === "sessions") {
        const {
          sessionDate,
          adpTimeIn,
          adpTimeOut,
          back2Back,
          showNoShow,
          topicsCovered,
          notes,
          tutorsEvalFormSubmitted,
          paymentDateAmnt
        } = row;
        rowData = {
          ...rowData,
          sessionDate,
          adpTimeIn,
          adpTimeOut,
          back2Back,
          showNoShow,
          topicsCovered,
          notes,
          tutorsEvalFormSubmitted,
          paymentDateAmnt
        };
      }
      filteredData.push(rowData);
    });
    return filteredData;
  },
  filterTodaysSessions: data => {
    return data.filter(session => {
      return moment().format("YYYY-MM-DD") === session.sessiondate;
    });
  },
  filterNames: data => {
    return data.map(row => row.studentname);
  }
};

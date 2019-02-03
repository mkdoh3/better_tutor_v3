const sheets = require("../utils/sheetsHandler");

module.exports = {
  getRows: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    sheets
      .getRows(tabNumber)
      .then(rows => res.status(200).json(rows))
      .catch(err => res.status(422).json({ err }));
  },
  addRow: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    const data = { ...req.body };
    sheets
      .addRow(data, tabNumber)
      .then(row => res.status(200).json(row))
      .catch(err => res.status(422).json({ err }));
  },
  createSession: (req, res) => {
    const studentName = req.body.name;
    sheets.getRows(2).then(rows => {
      const studentInfo = rows.filter(
        student => student.studentname === studentName
      );
      const {
        classcode,
        graduationdate,
        studentname,
        studentemail,
        studentgithubusername,
        tzdif,
        zoomlink
      } = studentInfo[0];
      sheets
        //sheets is trying to interpret any digits as a date?? need to workout bug associated with tz_dif
        .addRow(
          {
            Class_Code: classcode,
            Graduation_Date: graduationdate,
            Student_Name: studentname,
            student_Email: studentemail,
            Student_Github_Username: studentgithubusername,
            tz_dif: tzdif,
            Confirmation_Sent: "Y",
            Zoom_Link: zoomlink
          },
          1
        )
        .then(row => res.status(200).json(row))
        .catch(err => res.status(422).json({ err }));
    });
  }
};

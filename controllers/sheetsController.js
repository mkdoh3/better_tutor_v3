const sheets = require("../utils/sheetsUtils");

module.exports = {
  handleHook: (req, res) => {
    if (req.body.event === "invitee.created") {
      sheets.createSession(req.body.payload).then(() => {
        res.status(200).send("OK");
      });
    } else {
      sheets.deleteSession(req.body.payload.event.uuid).then(() => {
        res.status(200).send("OK");
      });
    }
  },

  getRows: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    sheets
      .get(tabNumber)
      .then(rows => res.status(200).json(rows))
      .catch(err => res.status(422).json(err));
  },

  addRow: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    const data = { ...req.body };
    sheets
      .add(data, tabNumber)
      .then(row => res.status(200).json(row))
      .catch(err => res.status(422).json(err));
  }
};
// curl --header "X-TOKEN: BFKNPPBBMF4MMAJANSMZSQRJXWVW7RVO" https://calendly.com/api/v1/hooks
// curl  -X DELETE --header "X-TOKEN: BFKNPPBBMF4MMAJANSMZSQRJXWVW7RVO" https://calendly.com/api/v1/hooks/350890
// curl --header "X-TOKEN: BFKNPPBBMF4MMAJANSMZSQRJXWVW7RVO" --data "url=https://vast-atoll-36147.herokuapp.com/api/sheets/hook" --data "events[]=invitee.created" https://calendly.com/api/v1/hooks

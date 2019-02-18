const sheets = require("../utils/sheetsUtils");

module.exports = {
  handleHook: (req, res) => {
    if (req.body.event === "invitee.created") {
      sheets.createSession(req.body, true).then(() => {
        res.status(200).send("OK");
      });
    } else {
      sheets.deleteSession(req.body.payload.event.uuid).then(() => {
        res.status(200).send("OK");
      });
    }
  },

  getRoster: (req, res) => {
    sheets
      .getRosterData(2)
      .then(rows => res.json(rows))
      .catch(err => res.status(422).json(err));
  },

  getRows: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    sheets
      .getAllRows(tabNumber)
      .then(rows => res.status(200).json(rows))
      .catch(err => res.status(422).json(err));
  },

  addRow: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    const data = { ...req.body };
    sheets
      .addNewRow(data, tabNumber)
      .then(row => res.status(200).json(row))
      .catch(err => res.status(422).json({ err }));
  },
  update: (req, res) => {
    const { updates, tableName } = req.body;
    sheets.updateSheet(updates, tableName);
    res.status(200).send("OK");
  },
  createSession: async (req, res) => {
    try {
      const row = await sheets.createSession(req.body);
      res.status(200).json(row);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};

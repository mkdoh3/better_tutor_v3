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
  getSheetData: (req, res) => {
    const tabNumber = parseInt(req.params.tab);
    sheets
      .querySheet(tabNumber)
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
  updateRows: async (req, res) => {
    const { updates, tableName } = req.body;
    const updated = await sheets.updateSheet(updates, tableName);
    res.status(200).json(updated);
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

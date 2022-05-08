const { Ticket } = require(".././models/ticket");

module.exports.getPendingTransactions = async () => {
  const pendingTransactions = await Ticket.find();
  return pendingTransactions;
};

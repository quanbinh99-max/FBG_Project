const { Transaction } = require('../../models/transaction');
const { Ticket } = require('../../models/ticket');
const { TicketDetail } = require('../../models/ticket-detail');
const db = require('../../util/database');
const StatusEnum = require('../../models/transaction').StatusEnum;
const transactionController = require('../../controller/transaction');

db.getConnectDB();

const handler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const pendingTransactions =
				await transactionController.getPendingTransactions();
			return res.status(200).json(pendingTransactions);
		} else if (req.method == 'PUT') {
			const { transaction_id, ticket_id } = req.body;
			const ticketDetail = await TicketDetail.findById(ticket_id, 'type');
			const ticket_type = ticketDetail.type;
			await Ticket.findByIdAndUpdate(ticket_type, {
				$inc: {
					quantity: -1
				}
			});
			await Transaction.findByIdAndUpdate(transaction_id, {
				paymentStatus: StatusEnum.SUCCESS
			});
			return res.status(200).json({ message: 'Thanh toán thành công' });
		} else if (req.method == 'POST') {
			const { participant_id, ticket_id } = req.body;
			const { result, message } = await transactionController.createTransaction(
				participant_id,
				ticket_id
			);
			if (result) {
				return res.status(200).json({ message: message });
			} else {
				return res.status(400).json({ message: message });
			}
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
};

export default handler;

const db = require('../../util/database');
const transactionController = require('../../controller/transaction');
const input = require('../../util/input');

db.getConnectDB();

const handler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const pendingTransactions =
				await transactionController.getPendingTransactions();
			return res.status(200).json(pendingTransactions);
		} else if (req.method == 'PUT') {
			const { transaction_id, ticket_id } = req.body;
			if (!input.isObjectIdValid(ticket_id)) {
				return res.status(400).json({ message: 'Vé không hợp lệ' });
			}
			if (!input.isObjectIdValid(transaction_id)) {
				return res.status(400).json({ message: 'Giao dịch không hợp lệ' });
			}
			const { result, message } = await transactionController.completePayment(
				transaction_id,
				ticket_id
			);
			if (result) {
				return res.status(200).json({ message: message });
			}
			return res.status(400).json({ message: message });
		} else if (req.method == 'POST') {
			const { participant_id, ticket_id } = req.body;
			if (!input.isObjectIdValid(ticket_id)) {
				return res.status(400).json({ message: 'Ticket ID is invalid' });
			}
			if (!input.isObjectIdValid(participant_id)) {
				return res.status(400).json({ message: 'Participant ID is invalid' });
			}
			const { result, message } = await transactionController.createTransaction(
				participant_id,
				ticket_id
			);
			if (result) {
				return res.status(200).json({ message: message });
			}
			return res.status(400).json({ message: message });
		} else if (req.method == 'DELETE') {
			const { transaction_id } = req.body;
			const { result, message } = await transactionController.cancelTransaction(
				transaction_id
			);
			if (result) {
				return res.status(200).json({ message: message });
			}
			return res.status(400).json({ message: message });
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
};

export default handler;

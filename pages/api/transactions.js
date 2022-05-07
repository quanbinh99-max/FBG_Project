const { Transaction } = require('../../models/transaction');
const { Participant } = require('../../models/participant');
const { TicketDetail } = require('../../models/ticket-detail');
const db = require('../../util/database');
const StatusEnum = require('../../models/transaction').StatusEnum;

export default async function handler(req, res) {
	try {
		await db.getConnectDB();
		if (req.method === 'GET') {
			const pendingTransactions = await Transaction.find({
				paymentStatus: 'Chưa thanh toán'
			});
			return res.status(200).json(pendingTransactions);
		} else if (req.method === 'POST') {
			const { participant_id, ticket_id } = req.body;
			var transaction, participant, ticketDetail;
			await Promise.all(
				(transaction = Transaction.findOne({
					participant_id: participant_id
				})),
				(participant = Participant.findOne({
					participant_id: participant_id
				})),
				(ticketDetail = TicketDetail.findOne({
					ticket_id: ticket_id
				}))
			);
			if (transaction != null) {
				return res.status(404).json({ message: 'Mỗi người chỉ được mua một vé!' });
			}
			if (participant == null) {
				return res.status(404).json({ message: 'Phải đăng ký trước khi mua vé!' });
			}
			if (ticketDetail == null) {
				return res.status(404).json({ message: 'Vé không hợp lệ!' });
			}
			const status = StatusEnum.PENDING;
			const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
			const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
			await Transaction.create({
				participant_id,
				ticket_id,
				status,
				created_at,
				updated_at
			});
			return res.status(200).json({ message: 'Đăng ký mua vé thành công' });
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
}

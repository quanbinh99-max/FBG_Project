const { Participant } = require('.././models/participant');
const { Transaction } = require('.././models/transaction');
const { TicketDetail } = require('.././models/ticket-detail');
const { Ticket } = require('.././models/ticket');

const StatusEnum = require('.././models/transaction').StatusEnum;
const moment = require('moment');

module.exports.getPendingTransactions = async () => {
	const pendingTransactions = await Transaction.find({
		paymentStatus: StatusEnum.PENDING
	});
	return pendingTransactions;
};

module.exports.getTransactionByParticipant = async (participant_id) => {
	const transaction = await Transaction.findOne({
		participant_id: participant_id
	});
	return transaction;
};

module.exports.createTransaction = async (participant_id, ticket_id) => {
	var transaction, participant, ticketDetail;

	transaction = await Transaction.findOne({
		participant_id: participant_id
	});
	if (transaction != null) {
		return { result: false, message: 'Mỗi người chỉ được mua một vé!' };
	}

	participant = await Participant.findById(participant_id);
	if (participant == null) {
		return { result: false, message: 'Phải đăng ký trước khi mua vé!' };
	}

	ticketDetail = await TicketDetail.findById(ticket_id);
	if (ticketDetail == null) {
		return { result: false, message: 'Vé không hợp lệ!' };
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

	return { result: true, message: 'Đăng ký mua vé thành công' };
};

module.exports.completePayment = async (transaction_id, ticket_id) => {
	const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
	const ticketDetail = await TicketDetail.findById(ticket_id, 'type');
	const ticket_type = ticketDetail.type;
	const ticket = await Ticket.findByIdAndUpdate(ticket_type, {
		$inc: {
			quantity: -1
		}
	});
	if (ticket == null) {
		return { result: false, message: 'Không thể mua loại vé này' };
	}
	const transaction = await Transaction.findByIdAndUpdate(transaction_id, {
		paymentStatus: StatusEnum.SUCCESS,
		updated_at: updated_at
	});
	if (transaction == null) {
		return { result: false, message: 'Giao dịch không tồn tại' };
	}
	return { result: true, message: 'Giao dịch thành công' };
};

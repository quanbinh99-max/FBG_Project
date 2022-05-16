const { Participant } = require('.././models/participant');
const { Transaction } = require('.././models/transaction');
const { TicketDetail } = require('.././models/ticket-detail');
const { Ticket } = require('.././models/ticket');
const ticketDetailController = require('.././controller/ticket-detail');

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
	const { result, type, message } = await ticketDetailController.checkTicket(
		ticket_id
	);
	if (!result) {
		return { result: false, message: message };
	}
	const transaction = await Transaction.findByIdAndUpdate(transaction_id, {
		paymentStatus: StatusEnum.SUCCESS,
		updated_at: updated_at
	});
	if (transaction == null) {
		return { result: false, message: 'Giao dịch không tồn tại' };
	}
	const ticket = await Ticket.findByIdAndUpdate(type, {
		$inc: {
			quantity: -1
		}
	});
	return { result: true, message: 'Giao dịch thành công' };
};

module.exports.cancelTransaction = async (transaction_id) => {
	var result = false;
	let transaction;
	try {
		transaction = await Transaction.deleteOne({ _id: transaction_id });
		console.log('OK: ', transaction);
		if (transaction.deletedCount == 1) {
			console.log('OK');
			return { result: true, message: 'Huỷ giao dịch thành công' };
		}
		return { result: false, message: 'Huỷ giao dịch không thành công' };
	} catch (err) {
		console.log(err);
	}
};

const mongoose = require('mongoose');

const StatusEnum = {
	PENDING: 'Chưa thanh toán',
	SUCCESS: 'Đã thanh toán',
	CANCELED: 'Đã huỷ'
};

const TransactionSchema = new mongoose.Schema({
	participant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'participants'
	},
	ticket_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ticketDetails'
	},
	paymentStatus: {
		type: StatusEnum,
		default: StatusEnum.PENDING
	},
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true }
});

const Transaction = mongoose.model(
	'transactions',
	TransactionSchema,
	'transactions'
);

module.exports = { TransactionSchema, Transaction };

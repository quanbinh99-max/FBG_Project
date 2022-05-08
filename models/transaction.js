const mongoose = require('mongoose');

const StatusEnum = {
	PENDING: 'Chưa thanh toán',
	SUCCESS: 'Đã thanh toán'
};

const TransactionSchema = new mongoose.Schema({
	participant_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'participants',
		unique: [true, 'Mỗi người chỉ được mua một vé']
	},
	ticket_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ticketDetails'
	},
	paymentStatus: {
		type: String,
		enum: [StatusEnum.PENDING, StatusEnum.SUCCESS],
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

module.exports = { TransactionSchema, Transaction, StatusEnum };

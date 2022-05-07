const mongoose = require('mongoose');

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
		enum: ['Chưa thanh toán', 'Đã thanh toán'],
		default: 'Chưa thanh toán'
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

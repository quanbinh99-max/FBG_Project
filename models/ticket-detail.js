const mongoose = require('mongoose');

const TicketDetailSchema = new mongoose.Schema({
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tickets',
		unique: [true, 'Loại vé này đã tồn tại'],
		require: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: [0, 'Giá vé không thể nhỏ hơn 0']
	},
	startingDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	}
});

const TicketDetail = mongoose.model(
	'ticketDetails',
	TicketDetailSchema,
	'ticketDetails'
);

module.exports = { TicketDetailSchema, TicketDetail };

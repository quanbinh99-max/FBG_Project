const mongoose = require('mongoose');
const { Ticket, TicketSchema } = require('./ticket');

const TicketDetailSchema = new mongoose.Schema({
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'tickets'
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

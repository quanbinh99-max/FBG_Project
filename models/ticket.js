const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		unique: true,
		enum: ['Loại 1', 'Loại 2', 'Loại 3']
	},
	quantity: {
		type: Number,
		required: true,
		min: [0, 'Số lượng vé không thể nhỏ hơn 0']
	}
});

const Ticket = mongoose.model('tickets', TicketSchema, 'tickets');

module.exports = { TicketSchema, Ticket };

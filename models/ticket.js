const mongoose = require('mongoose');

const TypeEnum = {
	TYPE_1: 'Loại 1',
	TYPE_2: 'Loại 2',
	TYPE_3: 'Loại 3'
};

const TicketSchema = new mongoose.Schema({
	type: {
		type: TypeEnum,
		required: true,
		unique: true
	},
	quantity: {
		type: Number,
		required: true,
		min: [0, 'Số lượng vé không thể nhỏ hơn 0']
	}
});

const Ticket = mongoose.model('tickets', TicketSchema, 'tickets');

module.exports = { TicketSchema, Ticket };

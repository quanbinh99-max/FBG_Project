const { Ticket } = require('.././models/ticket');

module.exports.getQuantity = async (id) => {
	const ticket = await Ticket.findById(id, 'quantity');
	if (ticket == null) {
		return { result: false, quantity: -1, message: 'Loại vé không hợp lệ' };
	}
	return {
		result: true,
		quantity: ticket.quantity,
		message: 'Lấy số lượng vé thành công'
	};
};

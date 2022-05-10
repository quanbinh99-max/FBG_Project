const { TicketDetail } = require('.././models/ticket-detail');
const ticketController = require('.././controller/ticket');

var getType = async (ticket_id) => {
	try {
		const ticketDetail = await TicketDetail.findOne({ _id: ticket_id }, 'type');
		if (ticketDetail == null) {
			return { result: false, type: '', message: 'Vé không hợp lệ' };
		}
		const ticket_type = ticketDetail.type;
		return { result: true, type: ticket_type, message: 'Tìm loại vé thành công' };
	} catch (e) {
		return { result: false, type: '', message: 'Vé không hợp lệ' };
	}
};

var checkTicket = async (ticket_id) => {
	const { result, type, message } = await getType(ticket_id);
	if (!result) {
		return { result: false, type: '', message: message };
	}
	const quantity = await (await ticketController.getQuantity(type)).quantity;
	if (quantity <= 0) {
		return {
			result: false,
			type: type,
			message: 'Loại vé này đã hết'
		};
	}
	return {
		result: true,
		type: type,
		message: 'Vé hợp lệ'
	};
};

module.exports = { getType, checkTicket };

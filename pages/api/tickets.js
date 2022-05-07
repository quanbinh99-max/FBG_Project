const { Ticket } = require('../../models/ticket');
const db = require('../../util/database');

export default async function handler(req, res) {
	try {
		await db.getConnectDB();

		if (req.method === 'POST') {
			const { type, quantity } = req.body;
			await Ticket.create({ type, quantity });
			return res.status(200).json({ message: 'Tạo loại vé mới thành công' });
		} else if (req.method == 'GET') {
			const ticketTypes = await Ticket.find();
			return res.status(200).json(ticketTypes);
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
}

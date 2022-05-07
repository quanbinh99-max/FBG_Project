const mongoose = require('mongoose');
const { TicketDetail } = require('../../models/ticket-detail');
const db = require('../../util/database');

export default async function handler(req, res) {
	try {
		await db.getConnectDB();

		if (req.method == 'POST') {
			const { type, description, price, startingDate, endDate } = req.body;
			await TicketDetail.create({
				type,
				description,
				price,
				startingDate,
				endDate
			});
			return res.status(200).json({ message: 'Thêm chi tiết vé thành công!' });
		} else if (req.method == 'GET') {
			const listTickets = await TicketDetail.find();
			return res.status(200).json(listTickets);
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json(e.message);
	}
}

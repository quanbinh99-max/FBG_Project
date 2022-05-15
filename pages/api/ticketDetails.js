const { TicketDetail } = require('../../models/ticket-detail');
const db = require('../../util/database');

db.getConnectDB();

const handler = async (req, res) => {
	try {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
		  "Access-Control-Allow-Headers",
		  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
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
};

export default handler;

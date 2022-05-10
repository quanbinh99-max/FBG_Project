const moment = require('moment');
const { Participant } = require('../../models/participant');
const db = require('../../util/database');
const input = require('../../util/input');
const transactionController = require('../../controller/transaction');
const ticketDetailController = require('../../controller/ticket-detail');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

db.getConnectDB();
const handler = async (req, res) => {
	try {
		const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
		const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
		if (req.method == 'POST') {
			const { email, name, phoneNumber, school, studentID, ticket_id } = req.body;

			// Check ticket_id
			if (!input.isObjectIdValid(ticket_id)) {
				return res.status(400).json({ message: 'Ticket ID is invalid' });
			}
			var checkTicket = await ticketDetailController.checkTicket(ticket_id);
			var result = checkTicket.result;
			var message = checkTicket.message;
			if (!result) {
				return res.status(400).json({ message: message });
			}

			// Check participant
			var participant;
			participant = await Participant.findOne({
				$or: [{ email: email }, { phoneNumber: phoneNumber }]
			});
			if (participant == null) {
				participant = await Participant.create({
					email,
					name,
					phoneNumber,
					school,
					studentID,
					created_at,
					updated_at
				});
			}

			// Check transaction
			const participant_id = participant._id;
			var checkTransaction = await transactionController.createTransaction(
				participant_id,
				ticket_id
			);
			result = checkTransaction.result;
			message = checkTransaction.message;
			if (result) {
				return res.status(200).json({ message: message });
			} else {
				return res.status(400).json({ message: message });
			}
		} else if (req.method == 'GET') {
			const listUsers = await Participant.find();
			return res.status(200).json(listUsers);
		} else if (req.method == 'PUT') {
			const { participant_id, vcsc } = req.body;
			if (!input.isObjectIdValid(participant_id)) {
				return res.status(400).json({ message: 'Participant ID is invalid' });
			}
			const participant = await Participant.findByIdAndUpdate(participant_id, {
				$set: {
					vcsc: vcsc,
					updated_at: updated_at
				}
			});
			if (participant == null) {
				return res.status(400).json({ message: 'Tạo tài khoản VCSC thất bại' });
			}
			return res.status(200).json({ message: 'Tạo tài khoản VCSC thành công' });
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
};

export default handler;

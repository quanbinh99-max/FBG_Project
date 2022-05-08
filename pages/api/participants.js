const moment = require('moment');
const { Participant } = require('../../models/participant');
const db = require('../../util/database');
const transactionController = require('../../controller/transaction');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

db.getConnectDB();
const handler = async (req, res) => {
	try {
		const updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
		const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
		if (req.method === 'POST') {
			const { email, name, phoneNumber, school, studentID, ticket_id } = req.body;
			var participant;
			participant = await Participant.findOne({
				$or: [{ email: email }, { phoneNumber: phoneNumber }]
			});
			if (participant == null) {
				{
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
				const participant_id = participant._id;
				const { result, message } = await transactionController.createTransaction(
					participant_id,
					ticket_id
				);
				if (result) {
					return res.status(200).json({ message: message });
				} else {
					return res.status(400).json({ message: message });
				}
			} else if (req.method === 'GET') {
				const listUsers = await Participant.find();
				return res.status(200).json(listUsers);
			}
		}
	} catch (e) {
		console.log(e.message);
		return res.status(400).json({ message: e.message });
	}
};

export default handler;

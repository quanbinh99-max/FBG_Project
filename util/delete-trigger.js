const moment = require('moment');
const Date = require('Date');

exports = async function deleteOverdueTransactions() {
	const current = moment();
	let created_at;
	let lastingTime;
	let deletedTransaction;
	const mongodb = context.services.get('Cluster0');
	const transaction = mongodb.db('FBG_Soi').collection('transactions');
	const result = await transaction
		.find(
			{
				paymentStatus: 'Chưa thanh toán'
			},
			{
				created_at: 1
			}
		)
		.toArray();
	let i = 0;
	let total = result.length;
	let count = 0;

	const checkOverdue = async (item) => {
		created_at = Date.parse(item.created_at);
		lastingTime = current - created_at;
		if (lastingTime >= 25200000) {
			// compare lasting time with 7 hours in ms
			deletedTransaction = await transaction.deleteOne({ _id: item._id });
			if (deletedTransaction.deletedCount > 0) {
				return true;
			}
		}
		return false;
	};
	for (i = 0; i < total; i++) {
		if (checkOverdue(result[i])) {
			count++;
		}
	}
	return { deletedCount: count };
};

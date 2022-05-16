const moment = require('moment');

exports = async function () {
	const current = moment();
	const mongodb = context.services.get('Cluster0');
	const transaction = mongodb.db('FBG_Soi').collection('transactions');
	const result = await transaction.find({
		paymentStatus: 'Chưa thanh toán'
	});
	result.forEach((pendingTransaction) => {});
	return result;
};

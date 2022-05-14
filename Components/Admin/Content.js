import { useState, useEffect } from 'react';
import apiClient from '../../util/http-common';
import { Table, message, Button } from 'antd';

function Conten() {
	const [getResult, setGetResult] = useState([]);

	useEffect(() => {
		let pendingTransactions = apiClient
			.get('/transactions')
			.then((res) => {
				const result = res.data;
				console.log(result);
				return result;
			})
			.catch((err) => {
				console.log(err);
				return err.response?.data || err;
			});
		setGetResult(pendingTransactions.result);
	}, []);

	const error = async (content) => {
		await message.error(
			{
				content: content,
				style: {
					marginTop: '5vh'
				}
			},
			10000
		);
	};
	const approveTransaction = async (transaction_id, ticket_id) => {
		apiClient
			.put('/transactions', transaction_id, ticket_id)
			.then(() => {
				setPendingParticipants();
			})
			.catch((err) => {
				error('Xác nhận giao dịch không thành công');
				setPendingParticipants();
			});
	};
	const cancelTransaction = async (transaction_id) => {
		apiClient
			.delete('/transactions', transaction_id)
			.then(() => {
				setPendingParticipants();
			})
			.catch((err) => {
				error('Huỷ giao dịch không thành công');
				setPendingParticipants();
			});
	};
	const columns = [
		{
			title: 'Tên',
			dataIndex: 'participant.name'
		},
		{
			title: 'VCSC',
			dataIndex: 'participant.vcsc'
		},
		{
			title: 'Xác nhận',
			render: (text, record) => (
				<Button onClick={approveTransaction(record._id, record.ticket_id)}>
					Xác nhận
				</Button>
			)
		},
		{
			title: 'Huỷ',
			render: (text, record) => (
				<Button onClick={cancelTransaction(record._id)}>Huỷ</Button>
			)
		}
	];

	return <div className="content"></div>;
}

export default Conten;

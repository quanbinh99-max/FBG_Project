import React, { useEffect, useState } from 'react';
import apiClient from '../../util/http-common';
import 'antd/dist/antd.css';
import { Table, Button, message } from 'antd';
const loai1 = '628b2802722701e5b355740a';
const loai2 = '628b2816722701e5b355740c';
const loai3 = '628b2825722701e5b355740e';
function Transactions(props) {
	const [dataTransactions, setDataTransactions] = useState([]);
	const [dataParticipants, setDataParticipants] = useState([]);
	const [putResult, setPutResult] = useState(null);

	useEffect(() => {
		const participants = async () => {
			try {
				const response = await apiClient.get('/participants');
				setDataParticipants(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		participants();
	}, []);

	useEffect(() => {
		const transactions = async () => {
			try {
				const response = await apiClient.get('/transactions');

				setDataTransactions(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		transactions();
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

	const success = async (content) => {
		await message.success(
			{
				content: content,
				style: {
					marginTop: '5vh'
				}
			},
			5000
		);
	};

	const approveTransaction = async (transaction_id, ticket_id) => {
		let response;
		try {
			response = await apiClient.put('/transactions', {
				transaction_id: transaction_id,
				ticket_id: ticket_id
			});
			success('Xác nhận thanh toán thành công');
		} catch (err) {
			error('Xác nhận thanh toán không thành công');
			console.log(err);
		} finally {
			const newTransactions = await apiClient.get('/transactions');
			setDataTransactions(newTransactions.data);
		}
	};

	const cancelTransaction = async (transaction_id) => {
		try {
			const response = await apiClient.delete('/transactions', {
				data: {
					transaction_id: transaction_id
				}
			});
			success('Huỷ thanh toán thành công');
		} catch (err) {
			error('Huỷ thanh toán không thành công');
		} finally {
			const newTransactions = await apiClient.get('/transactions');
			setDataTransactions(newTransactions.data);
		}
	};

	const data = [];

	if (dataTransactions.length !== 0 && dataParticipants.length !== 0) {
		for (var i = 0; i < dataTransactions.length; i++) {
			for (var j = 0; j < dataParticipants.length; j++) {
				if (dataTransactions[i].participant_id === dataParticipants[j]._id) {
					data.push({
						...dataParticipants[j],
						paymentStatus: dataTransactions[i].paymentStatus,
						transaction_id: dataTransactions[i]._id,
						ticket_id: dataTransactions[i].ticket_id,
						ticket_type:
							dataTransactions[i].ticket_id === loai1
								? 'Loại 1'
								: dataTransactions[i].ticket_id === loai2
								? 'Loại 2'
								: 'Loại 3'
					});
				}
			}
		}
	}

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber'
		},
		{
			title: 'Trường',
			dataIndex: 'school',
			key: 'school'
		},
		{
			title: 'MSSV',
			dataIndex: 'studentID',
			key: 'studentID'
		},
		{
			title: 'Ngày đặt',
			dataIndex: 'created_at',
			key: 'created_at'
		},
		{
			title: 'Trạng thái',
			dataIndex: 'paymentStatus',
			key: 'paymentStatus'
		},
		{
			title: 'Loại vé',
			dataIndex: 'ticket_type',
			key: 'ticket_type'
		},
		{
			title: 'Xác nhận',
			render: (text, record) => (
				<Button
					onClick={() => {
						approveTransaction(record.transaction_id, record.ticket_id);
					}}
				>
					Xác nhận
				</Button>
			)
		},
		{
			title: 'Huỷ',
			render: (text, record) => (
				<Button
					onClick={() => {
						cancelTransaction(record.transaction_id);
					}}
				>
					Huỷ
				</Button>
			)
		}
	];

	return (
		<div>
			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default Transactions;

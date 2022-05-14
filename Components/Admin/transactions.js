import React, { useEffect, useState } from 'react';
import apiClient from '../../util/http-common';
import 'antd/dist/antd.css';
import { Table, Button, message } from 'antd';
const loai1 = '6276c172419e149a048aba17';
const loai2 = '6276c183419e149a048aba19';
const loai3 = '6276c18f419e149a048aba1b';
function Transactions(props) {
	const [data, setData] = useState([]);
	const [dataTransactions, setDataTransactions] = useState([]);
	const [dataParticipants, setDataParticipants] = useState([]);

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
		try {
			const response = await apiClient.put('/transactions', {
				transaction_id: transaction_id,
				ticket_id: ticket_id
			});
			success('Xác nhận thanh toán thành công');
		} catch (err) {
			error('Xác nhận thanh toán không thành công');
		} finally {
			const newTransactions = await apiClient.get('/transactions');
			setDataTransactions(newTransactions.data);
		}
	};

	const test = [];

	if (dataTransactions.length !== 0 && dataParticipants.length !== 0) {
		for (var i = 0; i < dataTransactions.length; i++) {
			for (var j = 0; j < dataParticipants.length; j++) {
				if (dataTransactions[i].participant_id === dataParticipants[j]._id) {
					test.push({
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
		}
	];

	return (
		<div>
			<Table columns={columns} dataSource={test} />
		</div>
	);
}

export default Transactions;

import React, { useEffect, useState, useRef } from 'react';
import Admin from '../../Components/Admin/index';
import { message } from 'antd';

// import { useRouter } from "next/router";

function Index(props) {
	const key_value = '123';
	const post_key = useRef(null);
	// const router = useRouter();
	const [login, setLogin] = useState(false);
	// console.log(router.query.key);

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

	const checkLogin = async (e) => {
		e.preventDefault();
		const postData = {
			key: post_key.current.value
		};
		if (postData.key == key_value) {
			success('Đăng nhập thành công');
			setLogin(true);
		} else {
			error('Đăng nhập thất bại');
			console.error(error);
		}
	};

	return (
		<div>
			{login === true ? (
				<Admin></Admin>
			) : (
				<div
					style={{
						textAlign: 'center'
					}}
				>
					<form>
						<input
							type="password"
							placeholder="Vui lòng nhập key"
							ref={post_key}
						></input>
						<button onClick={checkLogin}>Gửi</button>
					</form>
				</div>
			)}
		</div>
	);
}

export default Index;

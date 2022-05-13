import React, { useEffect, useRef, useState } from 'react';
import apiClient from '.././util/http-common';
import { Button, message } from 'antd';

const ticket1 = '6276c172419e149a048aba17';
const ticket2 = '6276c183419e149a048aba19';
const ticket3 = '6276c18f419e149a048aba1b';

function Conten() {
	const post_email = useRef(null);
	const post_name = useRef(null);
	const post_phoneNumber = useRef(null);
	const post_school = useRef(null);
	const post_studentID = useRef(null);
	const post_ticket_id = useRef(null);
	var postResult;
	const [loadings, setLoadings] = useState([]);

	const enterLoading = (index) => {
		setLoadings((prevLoadings) => {
			const newLoadings = [...prevLoadings];
			newLoadings[index] = true;
			return newLoadings;
		});
	};

	const endLoading = (index) => {
		setLoadings((prevLoadings) => {
			const newLoadings = [...prevLoadings];
			newLoadings[index] = false;
			return newLoadings;
		});
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

	const postData = async (e) => {
		enterLoading(0);
		e.preventDefault();
		const postData = {
			email: post_email.current.value,
			name: post_name.current.value,
			phoneNumber: post_phoneNumber.current.value,
			school: post_school.current.value,
			studentID: post_studentID.current.value,
			ticket_id: post_ticket_id.current.value
		};
		try {
			const res = await apiClient.post('/participants', postData, {
				headers: {
					'x-access-token': 'token-value'
				}
			});
			endLoading(0);
			postResult = 'Đăng ký mua vé thành công!';
			console.log(postResult);
			success(postResult);
		} catch (err) {
			endLoading(0);
			postResult = err.response?.data.message || err;
			error(postResult);
		} finally {
			console.log('Post message: ', postResult);
			postResult = null;
		}
	};

	return (
		<div className="content">
			<section id="livestream" className="container">
				<h3>Xem Livestream</h3>
				<div className="row livestream__content">
					<div className="col-xs-12 col-lg-6">
						<div className="livestream__pic">
							<img
								className="img-fluid"
								src="https://i.imgur.com/2iQQqBC.png"
								alt="LIVESTREAM"
							/>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<form className="inputCode">
							<p>Nhập mã code xuống bên dưới mới được xem :&gt;</p>
							<input
								type="text"
								name="livestream_code"
								id="livestream_code"
								className="livestream__inputCode"
								placeholder="CODE"
							/>
							<br />
							<button className="btn btn-primary btn__active">Kích hoạt</button>
						</form>
					</div>
				</div>
				<hr className="line" />
			</section>
			<section id="buyTicket" className="container">
				<h3>Đặt mua vé</h3>
				<form method="POST">
					<div className="row">
						<div className="col-xs-12 col-lg-6 text-center">
							<div className="buyTicket__left ">
								<div className="form-group">
									<input
										type="text"
										name="name"
										required
										ref={post_name}
										placeholder="Họ tên"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										name="email"
										required
										ref={post_email}
										placeholder="Email"
									/>
								</div>
								<div className="form-group">
									<input
										type="number"
										name="phoneCall"
										required
										ref={post_phoneNumber}
										placeholder="Số điện thoại"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										name="school"
										required
										ref={post_school}
										placeholder="Trường"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										name="studentID"
										required
										ref={post_studentID}
										placeholder="MSSV"
									/>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-lg-6 buyTicket__right">
							<select
								className=" buyTicket__select"
								name="ticket_id"
								ref={post_ticket_id}
							>
								<option value disabled selected hidden>
									LOẠI VÉ
								</option>
								<option value={ticket1}>One</option>
								<option value={ticket2}>Two</option>
								<option value={ticket3}>Three</option>
							</select>
							<div className="ticketInfor">
								<h4>Hạng vé</h4>
								<h1>Giá</h1>
								<p>Quyền lợi 1</p>
								<p>Quyền lợi 2</p>
								<p>Quyền lợi 3</p>
								<Button
									type="primary"
									size="large"
									loading={loadings[0]}
									onClick={postData}
								>
									Đăng ký
								</Button>
							</div>
						</div>
						<hr className="line" />
					</div>
				</form>
			</section>
			<section id="info" className="container">
				<div className="row">
					<div className="col-xs-12 col-md-5">
						<div className="info_pic text-right">
							<img
								className="img-fluid"
								src="https://i.imgur.com/oteqTmB.png"
								alt="info-pic"
							/>
						</div>
					</div>
					<div className="col-xs-12 col-md-7">
						<div className="meetingSoi">
							<p>HỘI THẢO SOI</p>
						</div>
						<div className="info-detail">
							<h1>Câu hỏi khơi mào vấn đề ?</h1>
							<p>
								Văn bản giới thiệu về sứ mệnh hay chi chi đó về hội thảo, nói chung
								dài dài một tí :v chi tiết kiểu bla bla để trả lời cho các vấn đề
								phát sinh ở trên còn ở bên trái là poster của hội thảo này
							</p>
						</div>
					</div>
				</div>
				<hr className="line" />
			</section>
			<footer className="container">
				<div className="row">
					<div className="col-md-4">
						<p>SOI</p>
					</div>
					<div className="col-md-4 center">
						<span>Sẵn sàng để khám phá? </span>
						<button className="btn btn-primary btn__active">Mua vé ngay</button>
					</div>
					<div className="col-md-4 footerIcon lastComponent">
						<i className="fab fa-instagram" />
						<i className="fab fa-linkedin-in" />
						<i className="fab fa-facebook-f" />
					</div>
				</div>
				<hr className="footer-line" />
				<div id="contact" className="row">
					<div className="col-md-4 col-xs-12">
						<span>Liên hệ để được tư vấn: </span>
						<i className="icomoon icon-phone" />
						<span> 0123.458.456 (A.Phi)</span>
					</div>
					<div className="col-md-4 col-xs-12 center">
						<span>Mong muốn cộng tác? </span>
						<i className="icomoon icon-phone" />
						<span> 0456.456.5456 (C.Hoa)</span>
					</div>
					<div className="col-md-4 col-xs-12 lastComponent">
						<i className="fa fa-envelope" />
						<span>fbgcaigido@gmail.com</span>
					</div>
				</div>
				<div className="privacy">
					<p> © Copyright FBG | Privacy Policy</p>
				</div>
			</footer>
		</div>
	);
}

export default Conten;

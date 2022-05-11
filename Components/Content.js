import React from 'react';
import axios from 'axios';

function Conten(props) {
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
				<form>
					<div className="row">
						<div className="col-xs-12 col-lg-6 text-center">
							<div className="buyTicket__left ">
								<div className="form-group">
									<input type="text" name="name" placeholder="Họ tên" />
								</div>
								<div className="form-group">
									<input type="text" name="email" placeholder="Email" />
								</div>
								<div className="form-group">
									<input
										type="number"
										name="phoneCall"
										placeholder="Số điện thoại"
									/>
								</div>
								<div className="form-group">
									<input type="text" name="school" placeholder="Trường" />
								</div>
								<div className="form-group">
									<input type="text" name="id" placeholder="MSSV" />
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-lg-6 buyTicket__right">
							<select className=" buyTicket__select">
								<option value disabled selected hidden>
									LOẠI VÉ
								</option>
								<option value={1}>One</option>
								<option value={2}>Two</option>
								<option value={3}>Three</option>
							</select>
							<div className="ticketInfor">
								<h4>Hạng vé</h4>
								<h1>Giá</h1>
								<p>Quyền lợi 1</p>
								<p>Quyền lợi 2</p>
								<p>Quyền lợi 3</p>
								<button type="submit" className="btn btn-primary btnSignup">
									Đăng ký
								</button>
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
					<div className="col-md-6">
						<span>Sẵn sàng để khám phá?</span>
						<button className="btn btn-primary btn__active">Mua vé ngay</button>
					</div>
					<div className="col-md-2 footerIcon lastComponent">
						<i className="fab fa-instagram" />
						<i className="fab fa-linkedin-in" />
						<i className="fab fa-facebook-f" />
					</div>
				</div>
				<hr className="footer-line" />
				<div id="contact" className="row">
					<div className="col-md-4 col-xs-12">
						<span>Liên hệ để được tư vấn:</span>
						<i className="icomoon icon-phone" />
						<span> 0123.458.456(A.Phi)</span>
					</div>
					<div className="col-md-4 col-xs-12">
						<span>Mong muốn cộng tác?</span>
						<i className="icomoon icon-phone" />
						<span>0456.456.5456(C.Hoa)</span>
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

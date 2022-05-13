const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email không được để trống'],
		trim: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ'],
		unique: [true, 'Email này đã tồn tại']
	},
	name: {
		type: String,
		trim: true,
		required: [true, 'Tên không được để trống']
	},
	phoneNumber: {
		type: String,
		required: [true, 'Số điện thoại không được để trống'],
		minlength: [10, 'Số điện thoại phải có 10 số'],
		maxlength: [10, 'Số điện thoại phải có 10 số'],
		unique: [true, 'Số điện thoại này đã tồn tại']
	},
	school: {
		type: String,
		trim: true,
		required: [true, 'Tên trường không được để trống']
	},
	studentID: {
		type: String,
		trim: true,
		required: [true, 'MSSV không được để trống']
	},
	vcsc: {
		type: String,
		default: ''
	},
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true }
});

const Participant = mongoose.model(
	'participants',
	ParticipantSchema,
	'participants'
);

module.exports = { ParticipantSchema, Participant };

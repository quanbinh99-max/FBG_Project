const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Không được để trống'],
		trim: true,
		unique: true
	},
	name: {
		type: String,
		required: [true, 'Không được để trống']
	},
	phoneNumber: {
		type: String,
		required: [true, 'Không được để trống'],
		maxlength: [10, 'Tối đa 10 số']
	},
	school: {
		type: String,
		required: [true, 'Không được để trống']
	},
	studentID: {
		type: String,
		required: [true, 'Không được để trống']
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

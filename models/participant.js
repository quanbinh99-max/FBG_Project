const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Không được để trống'],
		trim: true,
		unique: true
	},
	name: { type: String, required: true },
	phoneNumber: {
		type: String,
		required: true,
		maxlength: [10, 'Tối đa 10 số']
	},
	school: { type: String, required: true },
	studentID: { type: String, required: true },
	vcsc: {
		type: String,
		required: true,
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

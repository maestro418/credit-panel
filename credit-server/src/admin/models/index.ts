import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    }
});

const Admin = mongoose.model("admin", AdminSchema);

const AdminModel = {
    Admin
}



export default AdminModel;
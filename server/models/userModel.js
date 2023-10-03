import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
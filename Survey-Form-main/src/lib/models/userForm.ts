import { Schema, model, models } from "mongoose";

const userFormSchema = new Schema({
  name: { type: String, required: true, trim: true },
  gender: { type: String, trim: true },
  email: { type: String, required: true, trim: true },
  age: { type: Number, trim: true },
  pincode: { type: String, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const UserForm = models.UserForm || model("UserForm", userFormSchema);
export default UserForm;

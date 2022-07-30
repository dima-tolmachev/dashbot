import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    discordID: { type: String, required: true },
    roles: { type: [String], required: false },
    license: { type: String, required: false },
    deviceID: { type: String, required: false },
    IP: { type: String, required: false },
    expires: { type: Date, required: true },
    freezed: { type: Boolean, required: false },
});

export default mongoose.model('User', UserSchema, 'users');

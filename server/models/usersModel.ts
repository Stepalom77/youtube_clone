import * as mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    telephone_number: number;
    description: string;
    payment_method: string;
    rating: string;
    subscriptions: string;
    subscribers: string;
    members: string;
    liked_videos: string;
    createdAt: Date;
    updatedAt: Date;
  }

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name : {
        type: String,
        require : [true, 'Please write your first name']
    },
    last_name : {
        type: String,
        require : [true, 'Please write your last name']
    },
    email: {
        type: String,
        require : [true, 'Please write your email'],
        unique: true
    },
    username: {
        type: String,
        require: [true, 'Please write your username'],
        unique: true
    },
    password: {
        type: String,
        require : [true, 'Please write your password']
    },
    telephone_number: {
        type: Number,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    payment_method: {
        type: String,
        require: false
    },
    rating: {
        type: String,
        require: false
    },
    subscriptions: {
        type: String,
        require: false
    },
    subscribers: {
        type: String,
        require: false
    },
    members: {
        type: String,
        require: false
    },
    liked_videos: {
        type: String,
        require: false
    }
}, {
    timestamps: true
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
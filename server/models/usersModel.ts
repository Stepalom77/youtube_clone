import * as mongoose from 'mongoose';
import { VideosDocument }  from './videosModels';
import { CommentsDocument } from './commentsModels';
import { PostsDocument } from './postsModels';

export interface UsersDocument {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    telephone_number?: number;
    description?: string;
    payment_method?: string;
    rating?: string;
    subscriptions?: string;
    subscribers?: string;
    members?: string;
    liked_videos?: string;
    comments?: mongoose.Types.Array<mongoose.Types.ObjectId>;
    posts?: mongoose.Types.Array<mongoose.Types.ObjectId>;
    videos?: mongoose.Types.Array<mongoose.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
  }

export interface PopulatedUser {
    comments?: CommentsDocument | null;
    posts?: PostsDocument | null;
    videos?: VideosDocument | null;
  }

const UserSchema = mongoose.Schema;

const userSchema = new UserSchema<UsersDocument>({
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
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'Comment'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'Post'
        }
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: 'Video'
        }
    ]
}, {
    timestamps: true
})

const User = mongoose.model<UsersDocument>('User', userSchema);

export default User;
/*import * as mongoose from 'mongoose';

export interface CommentsDocument extends mongoose.Document {
    content: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
    updatedAt: Date;
  }

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    videos: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Video'
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Post'
    },
    content: {
            type: String,
            require: [true, 'Please write the content of the comment']
    },
    likes: {
        type: Number,
        require: false
    },
    dislikes: {
        type: Number,
        require: false
    }
}, {
    timestamps: true
});

const Comment = mongoose.model<CommentsDocument>('Comment', commentSchema);

export default Comment;*/
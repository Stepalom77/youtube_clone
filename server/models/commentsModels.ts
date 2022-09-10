import * as mongoose from 'mongoose';

export interface CommentsDocument {
    content: string;
    likes?: number;
    dislikes?: number;
    user: mongoose.Types.ObjectId;
    video?: mongoose.Types.ObjectId;
    post?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

export const CommentSchema = mongoose.Schema;

const commentSchema = new CommentSchema({
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Video'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Post'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model<CommentsDocument>('Comment', commentSchema);

export default Comment;
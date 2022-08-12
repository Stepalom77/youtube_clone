import * as mongoose from 'mongoose';

export interface PostsDocument extends mongoose.Document {
    content: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
    updatedAt: Date;
  }

const Schema = mongoose.Schema;

const postSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    content: {
            type: String,
            require: [true, 'Please write the content of the post']
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

const Post = mongoose.model<PostsDocument>('Post', postSchema);

export default Post;
import * as mongoose from 'mongoose';
import { CommentsDocument } from './commentsModels';

export interface PostsDocument {
    content: string;
    likes?: number;
    dislikes?: number;
    user: mongoose.Types.ObjectId;
    comments?: mongoose.Types.Array<mongoose.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface PopulatedPost {
    comments?: CommentsDocument | null;
  }

export const PostSchema = mongoose.Schema;

const postSchema = new PostSchema({
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        require: false,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

const Post = mongoose.model<PostsDocument>('Post', postSchema);

export default Post;
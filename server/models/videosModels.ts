import * as mongoose from 'mongoose';
import { CommentsDocument } from './commentsModels';

export interface VideosDocument {
    title: string;
    description: string;
    likes?: number;
    dislikes?: number;
    video: string;
    rating: string;
    user: mongoose.Types.ObjectId;
    comments?: mongoose.Types.Array<mongoose.Types.ObjectId>;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface PopulatedVideo {
    comments?: CommentsDocument | null;
  }

export const VideoSchema = mongoose.Schema;

const videosSchema = new VideoSchema({
    title: {
            type: String,
            require: [true, 'Please write the title of the video']
    },
    description: {
            type: String,
            require: [true, 'Please write the title of the video']
    },
    likes: {
        type: Number,
        require: false
    },
    dislikes: {
        type: Number,
        require: false
    },
    video: {
        type: String,
        require: [true, 'Please uploud the video']
    },
    rating: {
        type: String,
        require: [true, 'Please specify the rating of the video']
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

const Video = mongoose.model<VideosDocument>('Video', videosSchema);

export default Video;
import * as mongoose from 'mongoose';

export interface VideosDocument extends mongoose.Document {
    title: string;
    description: string;
    likes: number;
    dislikes: number;
    video: string;
    rating: string;
    createdAt: Date;
    updatedAt: Date;
  }

const Schema = mongoose.Schema;

const videosSchema = new Schema({
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
    }
}, {
    timestamps: true
});

const Video = mongoose.model<VideosDocument>('Video', videosSchema);

export default Video;
import {Request, Response} from "express";
import  Video, { PopulatedVideo }  from '../models/videosModels';
import User from "../models/usersModel";

export class VideosController {
     public async getVideos  (req:Request, res:Response) {
        let allVideos = {};
     try {
        allVideos = await Video.find({}); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allVideos);
     }

     public async getVideosWithComments  (req:Request, res:Response) {
        let allVideos = {};
     try {
        allVideos = await Video.find({})
        .populate<Pick<PopulatedVideo, 'comments'>>('comments').exec(); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allVideos);
     }
     
    public async getVideo  (req:Request, res:Response) {
         let videoSearched = null;
         let videoId = req.params.id;
         try {
            videoSearched = await Video.findById(videoId);
         } catch (err) {
             console.error(err);
             if (!videoSearched) {
                 return res.status(404).json({message: 'Error, the video your searched does not exists'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(videoSearched);
     };

     public async getVideoWithComments  (req:Request, res:Response) {
        let videoSearched = null;
        let videoId = req.params.id;
        try {
           videoSearched = await Video.findById(videoId)
           .populate<Pick<PopulatedVideo, 'comments'>>('comments').exec();
        } catch (err) {
            console.error(err);
            if (!videoSearched) {
                return res.status(404).json({message: 'Error, the video your searched does not exists'})
            } else {
                return res.status(400).json({message: 'There was an error'})
            };
        };
        return res.status(200).json(videoSearched);
    };
     
      public async createVideo (req:Request, res:Response) {
         let videoCreated = null;
         let savedVideo = null;
         let {title, description, likes, dislikes, views, video, rating, user, comments} = req.body
         let usersModel = await User.findById(user)
         try{
            videoCreated = await Video.create({
                title,
                description,
                likes,
                dislikes,
                views,
                video,
                rating,
                user: usersModel?._id,
                comments
            })
            savedVideo = await videoCreated.save()
            usersModel?.videos?.push(savedVideo._id)
            await usersModel?.save()
         } catch (err) {
             console.error(err);
             return res.status(400).json({message: 'There was an error'})
         };
         return res.status(201).json(videoCreated);
     };
     
      public async updateVideo (req:Request, res:Response) {
        let videoSearched = null;
        let videoId = req.params.id;
        let videoUpdated = null;
        try {
            videoSearched =  await Video.findById(videoId);
            videoUpdated =  await Video.findByIdAndUpdate(videoId, req.body, {
               new: true,
           })
        } catch (err) {
            console.error(err);
            if (!videoSearched) {
                return res.status(404).json({message: 'The video you are trying to updated does not exist'})
            } else {
                return res.status(400).json({message: 'There was an error'})
            };
        };
        return res.status(200).json(videoUpdated);
     };
     
      public async deleteVideo (req:Request, res:Response) {
         let videoDeleted = null;
         let videoId = req.params.id;
         let videoSearched = null;
         try {
            videoSearched =  await Video.findById(videoId);
            videoDeleted = await videoSearched?.remove()
         } catch (err) {
             console.error(err);
             if(!videoSearched) {
                 return res.status(404).json({message: 'The video you are trying to delete does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             }
         };
         return res.status(204).json({message: 'The video was deleted'});
     }
     
}

 
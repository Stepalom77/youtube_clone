import {Request, Response} from "express";
import  Video  from '../models/videosModels';

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
     
      public async createVideo (req:Request, res:Response) {
         let videoCreated = null;
         try{
            videoCreated = await Video.create(req.body)
         } catch (err) {
             console.error(err);
             return res.status(400).json({message: 'There was an error'})
         };
         return res.status(200).json(videoCreated);
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
            videoDeleted = await Video.remove()
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

 
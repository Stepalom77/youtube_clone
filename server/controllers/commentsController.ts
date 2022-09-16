import {Request, Response} from "express";
import  Comment  from '../models/commentsModels';
import Post from "../models/postsModels";
import User from "../models/usersModel";
import Video from "../models/videosModels";




export class CommentsController {
     public async getComments  (req:Request, res:Response) {
        let allComments = {};
     try {
        allComments = await Comment.find({}); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allComments);
     }

     
     
    public async getComment  (req:Request, res:Response) {
         let commentSearched = null;
         let commentId = req.params.id;
         try {
            commentSearched = await Comment.findById(commentId);
         } catch (err) {
             console.error(err);
             if (!commentSearched) {
                 return res.status(404).json({message: 'Error, the comment your searched does not exists'})
             } else {
                 return res.status(400).json({message: 'There was a error'})
             };
         };
         return res.status(200).json(commentSearched);
     };
     
      public async createComment (req:Request, res:Response) {
         let commentCreated = null;
         let savedComment = null;
         let {content, likes, dislikes, user, video, post} = req.body
         let usersModel = await User.findById(user)
         let videoModel = await Video.findById(video)
         let postModel = await Post.findById(post)
         try{
            commentCreated = await Comment.create({
                content,
                likes,
                dislikes,
                user: usersModel?._id,
                video: videoModel?._id,
                post: postModel?._id
            })
            savedComment = await commentCreated.save()
            usersModel?.comments?.push(savedComment._id)
            await usersModel?.save()
            videoModel?.comments?.push(savedComment._id)
            await videoModel?.save()
            postModel?.comments?.push(savedComment._id)
            await postModel?.save()
         } catch (err) {
             console.error(err);
             return res.status(400).json({message: 'There was an error'})
         };
         return res.status(201).json(savedComment);
     };

      public async updateComment (req:Request, res:Response) {
         let commentSearched = null;
         let commentId = req.params.id;
         let commentUpdated = null;
         try {
            commentSearched =  await Comment.findById(commentId);
            commentUpdated =  await Comment.findByIdAndUpdate(commentId, req.body, {
                new: true,
            })
         } catch (err) {
             console.error(err);
             if (!commentSearched) {
                 return res.status(404).json({message: 'The comment you are trying to updated does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(commentUpdated);
     };
     
      public async deleteComment (req:Request, res:Response) {
         let commentDeleted = null;
         let commentId = req.params.id;
         let commentSearched = null;
         try {
            commentSearched =  await Comment.findById(commentId);
            commentDeleted = await commentSearched?.remove()
         } catch (err) {
             console.error(err);
             if(!commentSearched) {
                 return res.status(404).json({message: 'The comment you are trying to delete does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             }
         };
         return res.status(204).json({message: 'The comment was deleted'});
     }
     
}

 
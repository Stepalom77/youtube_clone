import {Request, Response} from "express";
import  Post  from '../models/postsModels';

export class PostsController {
     public async getPosts  (req:Request, res:Response) {
        let allPosts = {};
     try {
        allPosts = await Post.find({}); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allPosts);
     }
     
       public async getPost  (req:Request, res:Response) {
         let postSearched = null;
         let postId = req.params.id;
         try {
            postSearched = await Post.findById(postId);
         } catch (err) {
             console.error(err);
             if (!postSearched) {
                 return res.status(404).json({message: 'Error, the post your searched does not exists'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(postSearched);
     };
     
      public async createPost (req:Request, res:Response) {
         let postCreated = null;
         try{
            postCreated = await Post.create(req.body)
         } catch (err) {
             console.error(err);
             return res.status(400).json({message: 'There was an error'})
         };
         return res.status(200).json(postCreated);
     };
     
      public async updatePost (req:Request, res:Response) {
         let postSearched = null;
         let postId = req.params.id;
         let postUpdated = null;
         try {
            postSearched =  await Post.findById(postId);
            postUpdated =  await Post.findByIdAndUpdate(postId, req.body, {
                new: true,
            })
         } catch (err) {
             console.error(err);
             if (!postSearched) {
                 return res.status(404).json({message: 'The post you are trying to updated does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(postUpdated);
     };
     
      public async deletePost (req:Request, res:Response) {
         let postDeleted = null;
         let postId = req.params.id;
         let postSearched = null;
         try {
            postSearched =  await Post.findById(postId);
            postDeleted = await Post.remove()
         } catch (err) {
             console.error(err);
             if(!postSearched) {
                 return res.status(404).json({message: 'The post you are trying to delete does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             }
         };
         return res.status(204).json({message: 'The post was deleted'});
     }
     
}

 
import {Request, Response} from "express";
import  User  from '../models/usersModel';

export class UsersController {
     public async getUsers  (req:Request, res:Response) {
        let allUsers = {};
     try {
        allUsers = await User.find({}); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allUsers);
     }
     
       public async getUser  (req:Request, res:Response) {
         let userSearched = null;
         let userId = req.params.id;
         try {
             userSearched = await User.findById(userId);
         } catch (err) {
             console.error(err);
             if (!userSearched) {
                 return res.status(404).json({message: 'Error, the user your searched does not exists'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(userSearched);
     };
     
      public async createUser (req:Request, res:Response) {
         let userCreated = null;
         try{
             userCreated = await User.create(req.body)
         } catch (err) {
             console.error(err);
             return res.status(400).json({message: 'There was an error'})
         };
         return res.status(200).json(userCreated);
     };
     
      public async updateUser (req:Request, res:Response) {
         let userUpdated = null;
         let userId = req.params.id;
         let {
             first_name, last_name, email, username, password, telephone_number, description, payment_method,
             rating, subscriptions, subscribers, members, liked_videos 
         } = req.body
         try {
             userUpdated =  await User.findById(userId);
             userUpdated =  await User.updateMany({
                 first_name: first_name,
                 last_name: last_name,
                 email: email,
                 username: username,
                 password: password,
                 telephone_number: telephone_number,
                 description: description,
                 payment_method: payment_method,
                 rating: rating,
                 subscriptions: subscriptions,
                 subscribers: subscribers,
                 members: members,
                 liked_videos: liked_videos
             })
         } catch (err) {
             console.error(err);
             if (!userUpdated) {
                 return res.status(404).json({message: 'The user you are trying to updated does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             };
         };
         return res.status(200).json(userUpdated);
     };
     
      public async deleteUser (req:Request, res:Response) {
         let userDeleted = null;
         let userId = req.params.id;
         let userSearched = null;
         try {
            userSearched =  await User.findById(userId);
             userDeleted = await User.remove()
         } catch (err) {
             console.error(err);
             if(!userSearched) {
                 return res.status(404).json({message: 'The user you are trying to delete does not exist'})
             } else {
                 return res.status(400).json({message: 'There was an error'})
             }
         };
         return res.status(204).json({message: 'The user was deleted'});
     }
     
}

 
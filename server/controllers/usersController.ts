import {Request, Response} from "express";
import  User, {PopulatedUser}  from '../models/usersModel';
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


     public async getUsersWithComments  (req:Request, res:Response) {
        let allUsers = {};
     try {
        allUsers = await User.find({})
        .populate<Pick<PopulatedUser, 'comments'>>('comments').exec(); 
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allUsers);
     }

     public async getUsersWithVideos  (req:Request, res:Response) {
        let allUsers = {};
     try {
        allUsers = await User.find({})
        .populate<Pick<PopulatedUser, 'videos'>>('videos').exec();
     } catch (err) {
         console.log(err);
         return res.status(400).json({message: 'There was an error'});
     }
     return res.status(200).json(allUsers);
     }

     public async getUsersWithPosts  (req:Request, res:Response) {
        let allUsers = {};
     try {
        allUsers = await User.find({})
        .populate<Pick<PopulatedUser, 'posts'>>('posts').exec(); 
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

     public async getUserWithComments  (req:Request, res:Response) {
        let userSearched = null;
        let userId = req.params.id;
        try {
            userSearched = await User.findById(userId)
            .populate<Pick<PopulatedUser, 'comments'>>('comments').exec();
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

    public async getUserWithVideos  (req:Request, res:Response) {
        let userSearched = null;
        let userId = req.params.id;
        try {
            userSearched = await User.findById(userId)
            .populate<Pick<PopulatedUser, 'videos'>>('videos').exec();
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

    public async getUserWithPosts  (req:Request, res:Response) {
        let userSearched = null;
        let userId = req.params.id;
        try {
            userSearched = await User.findById(userId)
            .populate<Pick<PopulatedUser, 'posts'>>('posts').exec();
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
         const {email, username} = req.body;
         let userExist = null;
         try{
            userExist = await User.findOne({email, username});
            userCreated = await User.create(req.body);
         } catch (err) {
             console.error(err);
             if(userExist) {
                return res.status(400).json({message: 'Error, the user already exist.'})
             } else {
                return res.status(400).json({message: 'There was an error'})
             } 
         };
         return res.status(201).json(userCreated);
     };
     
      public async updateUser (req:Request, res:Response) {
        let userSearched = null;
        let userId = req.params.id;
        let userUpdated = null;
        try {
            userSearched =  await User.findById(userId);
            userUpdated =  await User.findByIdAndUpdate(userId, req.body, {
               new: true,
           })
        } catch (err) {
            console.error(err);
            if (!userSearched) {
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
            userDeleted = await userSearched?.remove()
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

 
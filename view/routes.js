import express from 'express';
import { getAllUser,addUser,updateUser ,deleteUser} from '../controller/userController.js';

const router= express.Router();

router.get('/getAll',getAllUser);
router.post('/addUser',addUser);//for adding  new user
router.put('/user/:userId',updateUser)//for updating
router.delete('/user/:userId',deleteUser)//for deleting


export default router;
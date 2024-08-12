const express = require('express')
const {userCreate,usersGet,userGet,userUpdate,userDelete,userLogin,userLogout} = require('../controllers/usercontroller')
const taskController = require('../controllers/taskcontroller');
const SendEmailController = require('../controllers/SendEmailController')
const ImageUploadController = require('../controllers/ImageUploadController')
const auth = require('../middlewares/authenticate')
const uploads = require('../middlewares/upload')
const router = new express.Router();

//user routes
router.post('/users', userCreate);
router.get('/users',auth, usersGet);
router.get('/users/:id',auth, userGet)
router.put('/users/:userId',auth, userUpdate);
router.delete('/users/:userId',auth, userDelete)

//task routes
router.post('/tasks', taskController.taskCreate)
router.get('/tasks',auth, taskController.tasksGet)
router.get('/tasks/:id',auth, taskController.taskGet)
router.put('/tasks/:taskId',auth, taskController.taskUpdate);
router.delete('/tasks/:taskId',auth, taskController.taskDelete)

//login route
router.post('/login',userLogin);
router.post('/logout', auth, userLogout);
router.get('/sendemail', SendEmailController.sendMail);
router.post('/upload', auth, uploads, ImageUploadController.imageUpload);

module.exports = router

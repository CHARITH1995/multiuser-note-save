const express = require('express');
const router = express.Router();

//import text file controller;
const textController = require('../controllers/file.controller');

//import validations
const validations = require('../helpers/validations/validation');

//save text files on db
router.post('/addText',validations.fileValidations,textController.textFileAdd);

//update a file
router.put('/update/:id',validations.fileValidations,textController.updateAFile);

//delete a file by using id
router.delete('/delete/:id',validations.userIdValidations,textController.deleteAFile);

// archieve files
router.put('/setArchieve/:id',validations.userIdValidations,textController.archieveAFile);

//get unarchieve files
router.put('/unArchieve/:id',validations.userIdValidations,textController.unArchieveAFile);

//get the list of archived files
router.get('/archivedlist/:userId',textController.getArchivedList)

//get the list of unarchived files
router.get('/unarchivedlist/:userId',textController.getUnArchivedList)












module.exports = router;
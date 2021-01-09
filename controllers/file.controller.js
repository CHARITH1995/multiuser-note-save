const Joi = require('joi');
require('dotenv').config();

//import the file archieve
var fileArchieve = require('../helpers/fileArchieve/fileArchieve');

//import the file unarchive
var fileUnarchive = require('../helpers/fileUnarchieve/fileUnarchieve');

//import the file schema
var fileScheme = require('../models/textFile.model');

//import textFile schema;
var TextFileSchema = require('../models/textFile.model');

//add file to a database
module.exports.textFileAdd = (req, res, next) => {

    let fileContent = req.body.textBody;
    let userId = req.body.userId;

    let file = new fileScheme({
        userId: userId,
        textBody: fileContent,
        is_archived:false
    });

    file.save().then(savedFile => {
        res.status(200).json({
            "message":"successfully added!",
            "id" : savedFile.id
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

//update previously add note
module.exports.updateAFile = (req, res, next) => {

    let fileContent = req.body.textBody;
    let userId = req.body.userId;
    let id = req.params.id;

    const body = {
        textBody: fileContent,
    }

    fileScheme.findById(id, (err, file) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!file || file.userId != userId) {
            res.status(200).send("File Not Found")
        } else {
            file.textBody = fileContent;
            let fileSave = (message) => {
                file.save()
                    .then(note => {
                        res.status(200).json({
                            "message":message,
                            "id" : file.id
                        })
                    })
                    .catch(err => {
                        res.status(500).send(err)

                    });
            }

            if (file.is_archived == true) {
                fileArchieve(file, (err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    } else {
                        fileSave("Successfully updated archived file!")
                    }
                })
            } else {
                fileSave("Successfully updated file!")
            }
        }
    })
}

//delete a file by Id
module.exports.deleteAFile = (req, res, next) => {
    let id = req.params.id;
    let userId = req.body.userId
    fileScheme.findById(id, (err, file) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!file || file.userId !== userId) {
            res.status(200).send("user not matched")
        } else {

            let deleteFile = (message) => {
                file.deleteOne().then(deletedFile => {
                    res.status(200).json({
                        "message":message,
                        "id" : deletedFile.id
                    })
                }).catch(err =>{
                    res.status(500).send(err);
                })
            }

            if (file.is_archived == true) {
                fileUnarchive(file, (err) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    } else {
                        deleteFile("Archived File Deleted!!");
                    }
                })
            } else {
                deleteFile("File Deleted!!");
            }
        }
    })
}


//archieve a file using file id
module.exports.archieveAFile = (req, res, next) => {
    let id = req.params.id;
    let userId = req.body.userId;

    const body = {
        is_archived: true
    }
    fileScheme.findById(id, (err, file) => {
        if (err) {
            res.status(500).send("File cannot Find");
            return;
        } else if (!file || file.userId == userId) {
            file.is_archived = true
            fileArchieve(file, (err) => {
                if (!err) {
                    file.save().then(textFile => {
                        res.status(200).json({
                            "message":"File archieved",
                            "id" : file.id
                        })
                    }).catch(err => {
                        res.status(500).send("File cannot archieve");
                    })
                } else {
                    res.status(500).send("Internal error");
                }
            })

        } else {
            res.status(500).send("user not Matched");
        }
    })
}

//unarchieve a file using file id
module.exports.unArchieveAFile = (req, res, next) => {
    let id = req.params.id;
    let userId = req.body.userId;

    const body = {
        is_archived: false
    }

    fileScheme.findById(id, (err, file) => {
        if (err) {
            res.status(500).send("File cannot Find");
            return;
        } else if (!file || file.userId == userId) {
            file.is_archived = false
            fileUnarchive(file, (err) => {
                if (!err) {
                    file.save().then(textFile => {
                        res.status(200).json({
                            "message":"File Unarchived",
                            "id" : file.id
                        })
                    }).catch(err => {
                        res.status(500).send("File cannot Unarchived");
                    })
                } else {
                    res.status(500).send("Internal error");
                }
            })
        } else {
            res.status(500).send("cannot archieve");
        }
    })
}

//get the archived list
module.exports.getArchivedList = (req, res, next) => {
    let userId = req.params.userId;

    fileScheme.find({ userId: userId, is_archived: true }, (err, files) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!files) {
            res.status(200).send("no archived files!");
        } else {
            res.status(200).json(files);
        }
    })
}


//get the unarchived list
module.exports.getUnArchivedList = (req, res, next) => {
    let userId = req.params.userId;

    fileScheme.find({ userId: userId, is_archived: false }, (err, files) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else if (!files) {
            res.status(200).send("no archived files!");
        } else {
            res.status(200).json(files);
        }
    })
}
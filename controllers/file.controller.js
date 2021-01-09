const Joi = require("joi");
require("dotenv").config();

const fileArchieve = require("../helpers/fileArchieve/fileArchieve");
const fileUnarchive = require("../helpers/fileUnarchieve/fileUnarchieve");

const fileScheme = require("../models/textFile.model");

module.exports.textFileAdd = (req, res, _next) => {
  const fileContent = req.body.textBody;
  const userId = req.body.userId;

  const file = new fileScheme({
    userId: userId,
    textBody: fileContent,
    is_archived: false,
  });

  file
    .save()
    .then((savedFile) => {
      res.status(200).json({
        message: "successfully added!",
        id: savedFile.id,
      });
    })
    .catch((err) => {
      throw err;
    });
};

//update previously add note
module.exports.updateAFile = (req, res, _next) => {
  const fileContent = req.body.textBody;
  const userId = req.body.userId;
  const id = req.params.id;

  fileScheme.findById(id, (err, file) => {
    if (err) {
      return res.status(500).send(err);
    } else if (!file || file.userId != userId) {
      console.log("here");
      return res.status(500).send("File Not Found");
    } else {
      file.textBody = fileContent;
      const fileSave = (message) => {
        file
          .save()
          .then((note) => {
            console.log(note);
            res.status(200).json({
              message: message,
              id: note.id,
            });
          })
          .catch((err) => {
            throw err;
          });
      };

      if (file.is_archived == true) {
        fileArchieve(file, (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          } else {
            fileSave("Successfully updated archived file!");
          }
        });
      } else {
        fileSave("Successfully updated file!");
      }
    }
  });
};

//delete a file by Id
module.exports.deleteAFile = (req, res, _next) => {
  const id = req.params.id;
  const userId = req.body.userId;

  fileScheme.findById(id, (err, file) => {
    if (err) {
      return res.status(500).send(err);
    } else if (!file || file.userId !== userId) {
      return res.status(500).send("Invalid Details");
    } else {
      const deleteFile = (message) => {
        file
          .deleteOne()
          .then((deletedFile) => {
            res.status(200).json({
              message: message,
              id: deletedFile.id,
            });
          })
          .catch((err) => {
            throw err;
          });
      };

      if (file.is_archived == true) {
        fileUnarchive(file, (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          } else {
            deleteFile("Archived File Deleted!!");
          }
        });
      } else {
        deleteFile("File Deleted!!");
      }
    }
  });
};

//archieve a file using file id
module.exports.archieveAFile = (req, res, _next) => {
  const id = req.params.id;
  const userId = req.body.userId;

  fileScheme.findById(id, (err, file) => {
    if (err) {
      return res.status(500).send("File cannot Find");
    } else if (!file || file.userId == userId) {
      return res.status(500).send("user not Matched");
    } else {
      file.is_archived = true;
      fileArchieve(file, (err) => {
        if (!err) {
          file
            .save()
            .then((_textFile) => {
              res.status(200).json({
                message: "File archieved",
                id: file.id,
              });
            })
            .catch((err) => {
              throw err;
            });
        } else {
          res.status(500).send("Internal error");
        }
      });
    }
  });
};

//unarchieve a file using file id
module.exports.unArchieveAFile = (req, res, _next) => {
  const id = req.params.id;
  const userId = req.body.userId;

  fileScheme.findById(id, (err, file) => {
    if (err) {
      return res.status(500).send("File cannot Find");
    } else if (!file || file.userId == userId) {
      return res.status(500).send("cannot archieve");
    } else {
      file.is_archived = false;
      fileUnarchive(file, (err) => {
        if (!err) {
          file
            .save()
            .then((_textFile) => {
              res.status(200).json({
                message: "File Unarchived",
                id: file.id,
              });
            })
            .catch((err) => {
              throw err;
            });
        } else {
          res.status(500).send("Internal error");
        }
      });
    }
  });
};

//get the archived list
module.exports.getArchivedList = (req, res, _next) => {
  const userId = req.params.userId;

  fileScheme.find({ userId: userId, is_archived: true }, (err, files) => {
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!files) {
      res.status(500).send("no archived files!");
    } else {
      res.status(200).json(files);
    }
  });
};

//get the unarchived list
module.exports.getUnArchivedList = (req, res, _next) => {
  const userId = req.params.userId;

  fileScheme.find({ userId: userId, is_archived: false }, (err, files) => {
    if (err) {
      res.status(500).send(err);
      return;
    } else if (!files) {
      res.status(500).send("no archived files!");
    } else {
      res.status(200).json(files);
    }
  });
};

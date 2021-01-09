# multiuser-note-save

## what you need
* node 
* npm

## how to run

* install npm packages - npm i / npm install
* run the project - nodemon / node index.js
* then you will see  - "good to go 8000" and "Database Connected"

----- note --------

* api will served at - localhost:8000/api/v1/textFile/

* you can change the port by changing the PORT constant at index.js
* if you change the port , you should the change the port in api - localhost:[ PORT ] /api/v1/textFile/
* you wont need to setup database settings , its host in mlab 

# Assumptions

## Notes save in english language
## User cannot update the file to archive file using update api.update api update only file body and updated body will update on archive file if file is archived.
## When user delete a archived file , it delete on database file and archived file.


# Apis

## Add a note file to the system.

* http://localhost:8000/api/v1/textFile/addText

-- request body --
{
	"userId":1,
	"textBody":"this is the note"
}

-- response body --

{
    "message": "successfully added!",
    "id": "5ff924a92cf6ca3310f0376c"
}

## Update a note file in system.

* http://localhost:8000/api/v1/textFile/update/:id

-- request body --
{
	"userId":12,
	"textBody":"this file after update"
}

-- response body not archived file --

{
    "message": "successfully updated!",
    "id": "5ff924a92cf6ca3310f0376c"
}

--- response body archived file update --
{
    "message": "Successfully updated archived file!",
    "id": "5ff8afb8c7209d3f84d4c8b8"
}

## delete a file 

* http://localhost:8000/api/v1/textFile/delete/:id

--request body --
{
	"userId":1278
}

-- response body not archived file --

{
    "message": "File Deleted!!",
    "id": "5ff924a92cf6ca3310f0376c"
}

--- response body archived file update --
{
    "message": "Archived File Deleted!!",
    "id": "5ff92886a9e14740e405b4ce"
}

## archive a file

* http://localhost:8000/api/v1/textFile/setArchieve/:id

--request body --
{
	"userId":12
}

-- response body not archived file --

{
    "message": "File archieved",
    "id": "5ff92929a900ac349845d7f4"
}

## unarchive a file

* http://localhost:8000/api/v1/textFile/unArchieve/:id

--request body --
{
	"userId":12
}

-- response body not archived file --

{
    "message": "File Unarchived",
    "id": "5ff92929a900ac349845d7f4"
}


## get the archived file list

* http://localhost:8000/api/v1/textFile/archivedlist/:userId

-- response body --
[
    {
        "_id": "5ff918104bdd8a1d245067cd",
        "userId": 1,
        "textBody": "asdasdsad",
        "is_archived": true,
        "__v": 0
    },
    {
        "_id": "5ff91b1c4b715c3410f97e5b",
        "userId": 1,
        "textBody": "asdasdsad",
        "is_archived": true,
        "__v": 0
    }
]

## get unarchived file list

* http://localhost:8000/api/v1/textFile/unarchivedlist/:userId

-- response body --

[
    {
        "_id": "5ff923f8b5af121848e4521d",
        "userId": 1,
        "textBody": "asdasdsad",
        "is_archived": false,
        "__v": 0
    },
    {
        "_id": "5ff924a92cf6ca3310f0376c",
        "userId": 1,
        "textBody": "asdasdsad",
        "is_archived": false,
        "__v": 0
    }
]


## node.js 

* its light weight and scalable. Using nodejs can easily handle I/O operations. npm package manager can use with Node , 
it will allows developer to use librauries that minimize coding.

## mongodb

*  Mongodb can handle large unstructured data like files.
*  Mongodb have a large memory.
*  do not need any query knowlege and syntax to use mongodb , for all db operations mongodb has functions.
*  less time consumption


## what will improve

* Backup plan

After archive a file it will save on as zip file inside a folder. But if a virus attack or other thing can damage those files. Because of that file Backup plan is very usefull to this system. For that we can use google drive or another cloud service like aws(s3)

* Authentication

there is no any middleware to check each api call. If we can use a token to validate the user , this system security will increase.









 
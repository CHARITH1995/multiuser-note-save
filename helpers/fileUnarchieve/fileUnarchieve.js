var fs = require('fs');
var filePath = require('../../filePath');


//zip file delete
const fileUnarchieve = (file, next) => {
    try {
        const path = filePath(file);
        fs.unlinkSync(path)
        next();
    } catch (err) {
        console.error(err)
        next(err);
    }

}

module.exports = fileUnarchieve;
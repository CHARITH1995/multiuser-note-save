var fs = require('fs');
var archiver = require('archiver');
var filePath = require('../../filePath');


//create a zip file using the archiver npm package
const fileArchieve = (note, next) => {
    try {
        const output = fs.createWriteStream(filePath(note));
        const archive = archiver('zip', {
            zlib: { level: 9 } 
        });

        output.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
        });

        output.on('end', function () {
            console.log('Data has been drained');
        });

        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
            } else {
                throw err;
            }
        });

        archive.on('error', function (err) {
            throw err;
        });

        archive.pipe(output);

        var buffer3 = Buffer.from(note.textBody);
        archive.append(buffer3, { name: `${note.id}.txt` });

        archive.finalize();
        console.log(`${filePath(note)} created`)
        next();

    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports = fileArchieve;
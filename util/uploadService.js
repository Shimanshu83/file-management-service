const multer = require('multer');
const path = require('path');
const fs = require('fs');
let nanoid = require('nanoid');

/**
 * UploadService is a wrapper service using multer for uploading file 
 */
class UploadService {
    constructor() {

        this.storage = multer.diskStorage({
            destination: this.destination.bind(this),
            filename: this.filename.bind(this)
        });

        this.upload = multer({
            storage: this.storage,
            limits: {
                fileSize: 1000 * 1024 * 1024 // 1000 MB file size limit
            }
        });

    }

    destination(req, file, cb) {
        let folder;

        if (file.mimetype.startsWith('image')) {
            folder = 'uploads/images';
        } 
        else if (file.mimetype.startsWith('video')) {
            folder = 'uploads/videos';
        } 
        else if (file.mimetype.startsWith('audio')) {
            folder = 'uploads/audio';
        } 
        else if(file.mimetype.startsWith('text')  ){
            folder = 'uploads/text';
        }
        else if(file.mimetype.startsWith('application')){
            folder = 'upload/application'; 
        }
        else {
            folder = 'uploads/others';
        }
        // checking if folder do not exists then creating the folder 
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
    }

    /**
     * 
     * @param {*} req req object
     * @param {*} file file object 
     * @param {*} cb and callback after updated file
     */
    filename(req, file, cb) {
        
        const fileId = nanoid(); // Generate nanoid
        const extname = path.extname(file.originalname);
        const originalFilenameWithoutExt = path.basename(file.originalname, extname);
        const newFilename = originalFilenameWithoutExt + '-' + fileId + extname;
        cb(null, newFilename);
    }

    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('video') && !file.mimetype.startsWith('audio')) {
            return cb(new Error('Only images, videos, and audio files are allowed.'));
        }
        cb(null, true);
    }
}


module.exports = UploadService ; 
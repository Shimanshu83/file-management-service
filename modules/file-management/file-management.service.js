const responses = require('./file-management.response');
const responseHandler = new (require('../../util/baseResponse'))(responses);
const uuid = require('uuid');
const fileManagementModel = new ( require('./file-management.model'))() ; 
const fs = require('fs');

module.exports = class fileManagementService {
    constructor() { }

    async upload(formData){

        let files = formData.files ; 

        let fileModel = files.map((fileObj) => {
            return {
                file_name : fileObj.filename , 
                original_file_name : fileObj.originalname,
                destination : fileObj.destination, 
                mimetype : fileObj.mimetype ,
                size_bytes : fileObj.size ,
                encoding : fileObj.encoding ,
                file_uuid : uuid.v4(),
                user_id : formData.user_id , 
                request_id : formData.request_id

            }
        }); 

        let saveRespose = await fileManagementModel.insertFileModel(fileModel);

        return responseHandler.success('file_uploaded_successfully' , fileModel);
    }


    async deleteFiles(formData){

        let getFileDetail = await fileManagementModel.getFilesDetail(formData.file_uuids); 

        if(getFileDetail.length === 0 ){
            return responseHandler.failure('file_not_found' );
        }

        let isFileAlreadyDeleted = getFileDetail.filter( fileObj => {
            return fileObj.is_deleted === 1 
        });

        if( isFileAlreadyDeleted.length > 0 ){
            let deletedFileUUID = isFileAlreadyDeleted.map( file => file.file_uuid);
            return responseHandler.failure('file_already_deleted' , {deleted_file : deletedFileUUID});
        }

        let deleteFilePromiseArr = [] 

        for( let fileObj of getFileDetail){
            let filePath = fileObj.destination + "/" + fileObj.file_name ; 
            deleteFilePromiseArr.push(this.deleteFile( filePath));
        }

        try {
            // once all the file is deleted ; 
            await Promise.all(deleteFilePromiseArr);
        } catch (error) {
            return responseHandler.catch_error(error);
        }

        await fileManagementModel.updateDeletedFile(formData.file_uuids);

        // update the is deleted files 
        return responseHandler.success('file_deleted_successfully')


    }



    deleteFile(filePath){
        return new Promise((resolve , reject ) => {

            fs.unlink(filePath, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            })
            
        });
    }

    async listFile(formData){
        let fileData = await fileManagementModel.getAllUserFiles(formData);
        
        if(fileData.length == 0 ){
            return responseHandler.success('file_data_not_found');
        }

        return responseHandler.success('categorized_file_data_found', fileData ); 


    }

    /**
     * 
     * @param {*} formData { user_id }
     * 
     * It will categorize the data based on mime type 
     * one can also share the mime type on the request. 
     */
    async getFileCategory(formData){
        let fileData = await fileManagementModel.getAllUserFiles(formData);
        
        if(fileData.length == 0 ){
            return responseHandler.success('file_data_not_found');
        }

        let categorizeData = this.mappedData(fileData); 

        return responseHandler.success('categorized_file_data_found', categorizeData ); 


    }


    mappedData(fileData){
        let mappedObj = {}; 

        for(let file of fileData ){
            let type = file.mimetype.split('/')[0]; 
            file['is_deleted'] = file['is_deleted'] === 1 ? true : false ;  
            if( type in mappedObj){
                mappedObj[type].push(file)
            }
            else {
                mappedObj[type] = [file]
            }
        }

        return mappedObj ; 

    }



}
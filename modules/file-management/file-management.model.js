const knex = require('../../config/kenx'); 

module.exports = class fileManagementModel {
    
    fileTable = "file_management" ; 
    constructor() {} 

    insertFileModel(fileObjArray){
        return knex(this.fileTable).insert(fileObjArray);
    }

    getFilesDetail( fileUuidArr ){
        return knex(this.fileTable).select("*").whereIn( "file_uuid" , fileUuidArr);
    }

    updateDeletedFile( fileUuidArr ){
        return knex(this.fileTable).update({is_deleted : 1}).whereIn("file_uuid" , fileUuidArr); 
    }

    getAllUserFiles(formData){
        return knex(this.fileTable).select("*").where( "user_id" , formData.user_id);
    }

    

    

}
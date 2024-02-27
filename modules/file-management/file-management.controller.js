
const fileManagementValidator = new (require('./file-management.validator'))();
const fileManagementService = new (require('./file-management.service'))();
const Validator = require('validatorjs');
const responses = require('./file-management.response');
const responseHandler = new (require('../../util/baseResponse'))(responses);
module.exports = class fileManagementController {

  async uploadFiles(req , res){

    let returnResponse = {} ; 

    let formData = {
      user_id : req.body.user_id, 
      request_id : req.body.request_id,
      files : req.files 
    }

    let validation = new Validator( formData , fileManagementValidator.upload()); 

    if(validation.passes()){
      try {
        returnResponse = await fileManagementService.upload(formData); 
      } catch (error) {

        returnResponse = responseHandler.catch_error(error);

      }

    }
    else {
      returnResponse = responseHandler.failure("input_validation_failed" , validation.errors.errors);
    }

    res.status(returnResponse.status_code).send(returnResponse);

  }

  async deleteFiles(req , res ){
    let returnResponse  = {}  ; 

    let formData = {
      file_uuids : req.body.file_uuids
    } 
    let validation = new Validator( formData , fileManagementValidator.deleteFiles()); 

    if(validation.passes()){

      try {
        returnResponse = await fileManagementService.deleteFiles(formData); 
      } catch (error) {

        returnResponse = responseHandler.catch_error(error);

      }

    }
    else {
      returnResponse = responseHandler.failure("input_validation_failed" , validation.errors.errors);
    }

    res.status(returnResponse.status_code).send(returnResponse);
  }

  async listFile(req , res ){
    let returnResponse = {} 
    let formData = {
      user_id : req.query.user_id
    }

    let validation = new Validator( formData , fileManagementValidator.listFile()); 

    if(validation.passes()){

      try {
        returnResponse = await fileManagementService.listFile(formData); 
      } catch (error) {

        returnResponse = responseHandler.catch_error(error);

      }

    }
    else {
      returnResponse = responseHandler.failure("input_validation_failed" , validation.errors.errors);
    }

    res.status(returnResponse.status_code).send(returnResponse);



    
  }


  async getFileCategory(req , res ){
    let returnResponse = {} 
    let formData = {
      user_id : req.query.user_id
    }

    let validation = new Validator( formData , fileManagementValidator.getFileCategory()); 

    if(validation.passes()){

      try {
        returnResponse = await fileManagementService.getFileCategory(formData); 
      } catch (error) {

        returnResponse = responseHandler.catch_error(error);

      }

    }
    else {
      returnResponse = responseHandler.failure("input_validation_failed" , validation.errors.errors);
    }

    res.status(returnResponse.status_code).send(returnResponse);
  }

}
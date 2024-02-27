module.exports = class userValidator {

    constructor() { }

    upload(){
      return {
        user_id : 'required|string|min:10|max:50', 
        request_id : 'required|string|min:10|max:50',
        files : 'required|array'
      }
    }

    deleteFiles(){
      return {
        file_uuids : 'required|array'
      }
    }

    getFileCategory(){
      return {
        user_id : 'required'
      }
    }

    listFile(){
      return {
        user_id : 'required'
      }
    }


}
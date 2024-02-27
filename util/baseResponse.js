module.exports = class responseHandler {

    /**
     * @param {*} moduleResponsesError  [{
     *    message : string , 
     *    code : string , 
     * }]
     */
    constructor(moduleResponsesError) {
        this.moduleResponsesError = moduleResponsesError;
    }
    /**
     * 
     * @param {*} key will be the key which is declared in moduleResponsesError
     * @param {*} values data which needed is needed to send to the user
     */
    success(key, values, status_code) {
        let returnResponse = this.moduleResponsesError[key] == undefined ? {} : this.moduleResponsesError[key];
        returnResponse.status = true;
        values ? returnResponse.values = values : '';
        returnResponse.status_code = status_code ? status_code : 200;
        return returnResponse;
    }

    failure(key, errors, status_code) {
        let returnResponse = this.moduleResponsesError[key] == undefined ? {} : this.moduleResponsesError[key];
        returnResponse.status = false;
        errors && errors != key ? returnResponse.error = errors : '';
        returnResponse.status_code = status_code ? status_code : 400;
        return returnResponse;
    }

    catch_error(err, status_code) {
        console.log(err);
        let returnResponse = this.moduleResponsesError[err.message] == undefined ? { message: err.message } : this.moduleResponsesError[err.message];
        if (this.moduleResponsesError[err.message] == undefined) console.log(err);
        returnResponse.status = false;
        returnResponse.status_code = status_code ? status_code : 500;
        return returnResponse;
    }


}
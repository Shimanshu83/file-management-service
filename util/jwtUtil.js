const jwt = require("jsonwebtoken");


function signToken(payload  ,  expiresIn) {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: expiresIn,
            issuer: 'auth',
        };

        jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET , options, (err, token) => {
            if (err) {
                reject({ isError: true, message: 'Invalid operation!' });
            } else {
                resolve(token);
            }
        })
    });
}



module.exports = {
    signToken
}
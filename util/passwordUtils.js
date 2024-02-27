const crypto = require('crypto');
require('dotenv').config();

function validPassword(password, hash) {
    let hashVerify = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    let salt = process.env.SALT;
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return genHash;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
"use strict";
// import * as crypto from 'crypto';
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSHA256 = exports.crypt = void 0;
function crypt(ENCRYPTION_KEY) {
    // // Must be 256 bits (32 characters)
    // if (!ENCRYPTION_KEY) throw new Error('encrytion key not found'); // For AES, this is always 16
    // const algorithm = 'aes-256-cbc';
    // // generate 16 bytes of random data
    // const initVector = crypto.randomBytes(16);
    // const Securitykey = crypto.randomBytes(32);
    // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    // // secret key generate 32 bytes of random data
    // // the cipher function
    return {
        encrypt: (message) => {
            return message;
            // return cipher.update(message, 'utf-8', 'hex');
        },
        decrypt: (message) => {
            return message;
            // let decryptedData = decipher.update(message, 'hex', 'utf-8');
            // decryptedData += decipher.final('utf8');
            // return decryptedData;
        }
    };
}
exports.crypt = crypt;
function createSHA256(pwd) {
    return pwd;
    //return crypto.createHash('sha256').update(pwd).digest('hex');
}
exports.createSHA256 = createSHA256;
//# sourceMappingURL=crypt.js.map
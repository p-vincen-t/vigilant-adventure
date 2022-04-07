// import * as crypto from 'crypto';

export function crypt(ENCRYPTION_KEY: any): { encrypt: (message: string) => string; decrypt: (message: string) => string } {
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
    encrypt: (message: string) => {
      return message;
     // return cipher.update(message, 'utf-8', 'hex');
    },
    decrypt: (message: string) => {
      return message;
      // let decryptedData = decipher.update(message, 'hex', 'utf-8');
      // decryptedData += decipher.final('utf8');
      // return decryptedData;
    }
  };
}
export function createSHA256(pwd: string) {
  return pwd;
  //return crypto.createHash('sha256').update(pwd).digest('hex');
}

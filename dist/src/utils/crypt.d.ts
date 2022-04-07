export declare function crypt(ENCRYPTION_KEY: any): {
    encrypt: (message: string) => string;
    decrypt: (message: string) => string;
};
export declare function createSHA256(pwd: string): string;

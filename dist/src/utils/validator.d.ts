/**
 * Validates that a value is a byte buffer.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is byte buffer or not.
 */
export declare function isBuffer(value: any): boolean;
/**
 * Validates that a value is an array.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is an array or not.
 */
export declare function isArray(value: any): boolean;
/**
 * Validates that a value is a non-empty array.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a non-empty array or not.
 */
export declare function isNonEmptyArray(value: any): boolean;
/**
 * Validates that a value is a boolean.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a boolean or not.
 */
export declare function isBoolean(value: any): boolean;
/**
 * Validates that a value is a number.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a number or not.
 */
export declare function isNumber(value: any): boolean;
/**
 * Validates that a value is a string.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a string or not.
 */
export declare function isString(value: any): value is string;
/**
 * Validates that a value is a base64 string.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a base64 string or not.
 */
export declare function isBase64String(value: any): boolean;
/**
 * Validates that a value is a non-empty string.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a non-empty string or not.
 */
export declare function isNonEmptyString(value: any): boolean;
/**
 * Validates that a value is a nullable object.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is an object or not.
 */
export declare function isObject(value: any): boolean;
/**
 * Validates that a value is a non-null object.
 *
 * @param {any} value The value to validate.
 * @return {boolean} Whether the value is a non-null object or not.
 */
export declare function isNonNullObject(value: any): boolean;
/**
 * Validates that a string is a valid Firebase Auth uid.
 *
 * @param {any} uid The string to validate.
 * @return {boolean} Whether the string is a valid Firebase Auth uid.
 */
export declare function isUid(uid: any): boolean;
/**
 * Validates that a string is a valid Firebase Auth password.
 *
 * @param {any} password The password string to validate.
 * @return {boolean} Whether the string is a valid Firebase Auth password.
 */
export declare function isPassword(password: any): boolean;
/**
 * Validates that a string is a valid email.
 *
 * @param {any} email The string to validate.
 * @return {boolean} Whether the string is valid email or not.
 */
export declare function isEmail(email: any): boolean;
/**
 * Validates that a string is a valid phone number.
 *
 * @param {any} phoneNumber The string to validate.
 * @return {boolean} Whether the string is a valid phone number or not.
 */
export declare function isPhoneNumber(phoneNumber: any): boolean;
/**
 * Validates that the provided topic is a valid FCM topic name.
 *
 * @param {any} topic The topic to validate.
 * @return {boolean} Whether the provided topic is a valid FCM topic name.
 */
export declare function isTopic(topic: any): boolean;

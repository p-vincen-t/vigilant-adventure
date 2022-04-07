export declare function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown>;
/**
 * Return a unique identifier with the given `len`.
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
export declare const uid: (len: number) => string;
export declare const code: (len: number) => string;
export declare const asyncPipe: (...fns: any[]) => (x: any) => any;

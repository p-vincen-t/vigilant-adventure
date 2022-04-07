/**
 *
 *
 * @export
 * @interface Visitor
 * @template T
 * @template R
 */
export interface Visitor<T, R> {
    /**
     *
     *
     * @param {T} t
     * @param {...any[]} args
     * @return {*}  {R}
     * @memberof Visitor
     */
    visit(t: T, args: any): R;
}
/**
 *
 *
 * @export
 * @interface Acceptor
 * @template T
 * @template R
 */
export interface Acceptor<T, R> {
    /**
     *
     *
     * @param {Visitor<T, R>} t
     * @param {...any[]} args
     * @return {*}  {R}
     * @memberof Acceptor
     */
    accept(t: Visitor<T, R>, args: any): R;
}
/**
 *
 *
 * @export
 * @class AcceptorImpl
 * @implements {Acceptor<T, R>}
 * @template T
 * @template R
 */
export declare class AcceptorImpl<T, R> implements Acceptor<T, R> {
    /**
     *
     *
     * @param {Visitor<T, R>} t
     * @param {...any[]} args
     * @return {*}  {R}
     * @memberof AcceptorImpl
     */
    accept(t: Visitor<T, R>, args?: any): R;
}

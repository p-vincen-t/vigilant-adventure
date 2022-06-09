export interface Type<T = any> extends Function {
    new (): T;
}
export interface TypeWithArgs<T, A extends any[]> extends Function {
    new (...args: A): T;
}

// export interface Type<T> extends Function {
//     new(...args: any[]): T;    
// }

export type Type = {
    //   new(...args: any[]): A
}

export interface TypeWithArgs<T, A extends any[]> extends Function { new(...args: A): T; } 
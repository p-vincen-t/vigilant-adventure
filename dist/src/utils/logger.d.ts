export declare const prefixes: {
    wait: string;
    error: string;
    warn: string;
    ready: string;
    info: string;
    event: string;
};
export declare const LogType: ({ name, msg, force }: {
    name: any;
    msg: any;
    force?: boolean | undefined;
}) => {
    name: any;
    msg: any;
    force: boolean;
};
export declare const info: (object: {
    name: string;
    msg: any;
    force?: false | undefined;
}) => void;
export declare const warn: (object: {
    name: string;
    msg: any;
    force?: false | undefined;
}) => void;
export declare const error: (object: {
    name: string;
    msg: any;
    force?: false | undefined;
}) => void;
export declare const fatal: (object: {
    name: string;
    msg: any;
    force?: false | undefined;
}) => void;

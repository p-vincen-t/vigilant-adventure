"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conditions = void 0;
class Conditions {
    constructor() { }
}
exports.Conditions = Conditions;
Conditions.checkArgument$1 = (expression) => {
    if (!expression) {
        throw new Error();
    }
};
Conditions.checkArgument$2 = (expression, errorMessage) => {
    if (!expression) {
        throw new Error(errorMessage);
    }
};
Conditions.checkArgument$3 = (b, errorMessageTemplate, p1) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1));
    }
};
Conditions.checkArgument$4 = (b, errorMessageTemplate, p1, p2) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2));
    }
};
Conditions.checkArgument$5 = (b, errorMessageTemplate, p1, p2, p3) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3));
    }
};
Conditions.checkArgument$6 = (b, errorMessageTemplate, p1, p2, p3, p4) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3, p4));
    }
};
Conditions.checkArgument = (...args$) => {
    switch (args$.length) {
        case 1:
            return Conditions.checkArgument$1(...args$);
        case 2:
            return Conditions.checkArgument$2(...args$);
        case 3:
            return Conditions.checkArgument$3(...args$);
        case 4:
            return Conditions.checkArgument$4(...args$);
        case 5:
            return Conditions.checkArgument$5(...args$);
        case 6:
            return Conditions.checkArgument$6(...args$);
    }
};
Conditions.checkState$1 = (expression) => {
    if (!expression) {
        throw new Error();
    }
};
Conditions.checkState$2 = (expression, errorMessage) => {
    if (!expression) {
        throw new Error(errorMessage);
    }
};
Conditions.checkState$3 = (b, errorMessageTemplate, p1) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1));
    }
};
Conditions.checkState$4 = (b, errorMessageTemplate, p1, p2) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2));
    }
};
Conditions.checkState$5 = (b, errorMessageTemplate, p1, p2, p3) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3));
    }
};
Conditions.checkState$6 = (b, errorMessageTemplate, p1, p2, p3, p4) => {
    if (!b) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3, p4));
    }
};
Conditions.checkState = (...args$) => {
    switch (args$.length) {
        case 1:
            return Conditions.checkState$1(...args$);
        case 2:
            return Conditions.checkState$2(...args$);
        case 3:
            return Conditions.checkState$3(...args$);
        case 4:
            return Conditions.checkState$4(...args$);
        case 5:
            return Conditions.checkState$5(...args$);
        case 6:
            return Conditions.checkState$6(...args$);
    }
};
Conditions.checkNotNull$1 = (reference) => {
    if (reference === null) {
        throw new Error();
    }
    return reference;
};
Conditions.checkNotNull$2 = (reference, errorMessage) => {
    if (reference === null) {
        throw new Error(errorMessage);
    }
    return reference;
};
Conditions.checkNotNull$3 = (obj, errorMessageTemplate, p1) => {
    if (obj === null) {
        throw new Error(Conditions.format(errorMessageTemplate, p1));
    }
    return obj;
};
Conditions.checkNotNull$4 = (obj, errorMessageTemplate, p1, p2) => {
    if (obj === null) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2));
    }
    return obj;
};
Conditions.checkNotNull$5 = (obj, errorMessageTemplate, p1, p2, p3) => {
    if (obj === null) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3));
    }
    return obj;
};
Conditions.checkNotNull$6 = (obj, errorMessageTemplate, p1, p2, p3, p4) => {
    if (obj === null) {
        throw new Error(Conditions.format(errorMessageTemplate, p1, p2, p3, p4));
    }
    return obj;
};
Conditions.checkNotNull = (...args$) => {
    switch (args$.length) {
        case 1:
            return Conditions.checkNotNull$1(...args$);
        case 2:
            return Conditions.checkNotNull$2(...args$);
        case 3:
            return Conditions.checkNotNull$3(...args$);
        case 4:
            return Conditions.checkNotNull$4(...args$);
        case 5:
            return Conditions.checkNotNull$5(...args$);
        case 6:
            return Conditions.checkNotNull$6(...args$);
    }
};
Conditions.checkElementIndex$2 = (index, size) => {
    return Conditions.checkElementIndex(index, size, 'getIndex');
};
Conditions.checkElementIndex$3 = (index, size, desc) => {
    if (index < 0 || index >= size) {
        throw new Error(Conditions.badElementIndex(index, size, desc));
    }
    return index;
};
Conditions.checkElementIndex = (...args$) => {
    switch (args$.length) {
        case 2:
            return Conditions.checkElementIndex$2(...args$);
        case 3:
            return Conditions.checkElementIndex$3(...args$);
    }
};
Conditions.badElementIndex = (index, size, desc) => {
    if (index < 0) {
        return Conditions.format('%s (%s) must not be negative', desc, index);
    }
    else {
        if (size < 0) {
            throw new Error('negative size: ' + size);
        }
        else {
            return Conditions.format('%s (%s) must be less than size (%s)', desc, index, size);
        }
    }
};
Conditions.checkPositionIndex$2 = (index, size) => {
    return Conditions.checkPositionIndex(index, size, 'getIndex');
};
Conditions.checkPositionIndex$3 = (index, size, desc) => {
    if (index < 0 || index > size) {
        throw new Error(Conditions.badPositionIndex(index, size, desc));
    }
    return index;
};
Conditions.checkPositionIndex = (...args$) => {
    switch (args$.length) {
        case 2:
            return Conditions.checkPositionIndex$2(...args$);
        case 3:
            return Conditions.checkPositionIndex$3(...args$);
    }
};
Conditions.badPositionIndex = (index, size, desc) => {
    if (index < 0) {
        return Conditions.format('%s (%s) must not be negative', desc, index);
    }
    else {
        if (size < 0) {
            throw new Error('negative size: ' + size);
        }
        else {
            return Conditions.format('%s (%s) must not be ' + 'greater than size (%s)', desc, index, size);
        }
    }
};
Conditions.checkPositionIndexes = (start, end, size) => {
    if (start < 0 || end < start || end > size) {
        throw new Error(Conditions.badPositionIndexes(start, end, size));
    }
};
Conditions.badPositionIndexes = (start, end, size) => {
    if (start < 0 || start > size) {
        return Conditions.badPositionIndex(start, size, 'start getIndex');
    }
    if (end < 0 || end > size) {
        return Conditions.badPositionIndex(end, size, 'end getIndex');
    }
    return Conditions.format('end getIndex (%s) must not be l' + 'ess than start getIndex (%s)', end, start);
};
Conditions.format = (template, args) => {
    template = String.valueOf(template);
    const builder = new String(template.length() + 16 * args.length);
    let templateStart = 0;
    let i = 0;
    while (i < args.length) {
        const placeholderStart = template.indexOf('%s', templateStart);
        if (placeholderStart === -1) {
            break;
        }
        builder.append(template, templateStart, placeholderStart);
        builder.append(args[i++]);
        templateStart = placeholderStart + 2;
    }
    builder.append(template, templateStart, template.length());
    if (i < args.length) {
        builder.append(' [');
        builder.append(args[i++]);
        while (i < args.length) {
            builder.append(', ');
            builder.append(args[i++]);
        }
        builder.append(93);
    }
    return builder.toString();
};
//# sourceMappingURL=conditions.js.map
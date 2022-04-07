// the helper function
function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        );
      });
    });
  }

  class Final {}
  // @ts-ignore
  export function Extends(class1, class2): typeof Final {      
      // @ts-ignore
      interface Final extends class1, class2 {}
      applyMixins(Final, [class1, class2]);
      return Final;
  }
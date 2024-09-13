import { globalEmitter } from './globalEmitter';

export function emit(event: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);
      globalEmitter.emit(event);
      return result;
    };

    return descriptor;
  };
}

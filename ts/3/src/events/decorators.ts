import { globalEmitter } from './globalEmitter';

export function emit(event: string) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const result = originalMethod.apply(this, args);
      globalEmitter.emit(event);
      return result;
    };

    return descriptor;
  };
}

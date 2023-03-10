import type { $IntentionalAny } from './types';
declare type PathToProp = Array<string | number>;
declare type PointerMeta = {
    root: {};
    path: (string | number)[];
};
export declare type UnindexableTypesForPointer = number | string | boolean | null | void | undefined | Function;
export declare type UnindexablePointer = {
    [K in $IntentionalAny]: Pointer<undefined>;
};
/**
 * A wrapper type for the type a `Pointer` points to.
 */
export declare type PointerType<O> = {
    /**
     * Only accessible via the type system.
     * This is a helper for getting the underlying pointer type
     * via the type space.
     */
    $$__pointer_type: O;
};
/**
 * The type of {@link Atom} pointers. See {@link pointer|pointer()} for an
 * explanation of pointers.
 *
 * @see Atom
 *
 * @remarks
 * The Pointer type is quite tricky because it doesn't play well with `any` and other inexact types.
 * Here is an example that one would expect to work, but currently doesn't:
 * ```ts
 * declare function expectAnyPointer(pointer: Pointer<any>): void
 *
 * expectAnyPointer(null as Pointer<{}>) // this shows as a type error because Pointer<{}> is not assignable to Pointer<any>, even though it should
 * ```
 *
 * The current solution is to just avoid using `any` with pointer-related code (or type-test it well).
 * But if you enjoy solving typescript puzzles, consider fixing this :)
 * Potentially, [TypeScript variance annotations in 4.7+](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7-beta/#optional-variance-annotations-for-type-parameters)
 * might be able to help us.
 */
export declare type Pointer<O> = PointerType<O> & PointerInner<Exclude<O, undefined>, undefined extends O ? undefined : never>;
declare type PointerInner<O, Optional> = O extends UnindexableTypesForPointer ? UnindexablePointer : unknown extends O ? UnindexablePointer : O extends (infer T)[] ? Pointer<T>[] : O extends {} ? {
    [K in keyof O]-?: Pointer<O[K] | Optional>;
} : UnindexablePointer;
/**
 * Returns the metadata associated with the pointer. Usually the root object and
 * the path.
 *
 * @param p - The pointer.
 */
export declare const getPointerMeta: <_>(p: PointerType<_>) => PointerMeta;
/**
 * Returns the root object and the path of the pointer.
 *
 * @example
 * ```ts
 * const {root, path} = getPointerParts(pointer)
 * ```
 *
 * @param p - The pointer.
 *
 * @returns An object with two properties: `root`-the root object or the pointer, and `path`-the path of the pointer. `path` is an array of the property-chain.
 */
export declare const getPointerParts: <_>(p: Pointer<_>) => {
    root: {};
    path: PathToProp;
};
/**
 * Creates a pointer to a (nested) property of an {@link Atom}.
 *
 * @remarks
 * Pointers are used to make derivations of properties or nested properties of
 * {@link Atom|Atoms}.
 *
 * Pointers also allow easy construction of new pointers pointing to nested members
 * of the root object, by simply using property chaining. E.g. `somePointer.a.b` will
 * create a new pointer that has `'a'` and `'b'` added to the path of `somePointer`.
 *
 * @example
 * ```ts
 * // Here, sum is a derivation that updates whenever the a or b prop of someAtom does.
 * const sum = prism(() => {
 *   return val(pointer({root: someAtom, path: ['a']})) + val(pointer({root: someAtom, path: ['b']}));
 * });
 *
 * // Note, atoms have a convenience Atom.pointer property that points to the root,
 * // which you would normally use in this situation.
 * const sum = prism(() => {
 *   return val(someAtom.pointer.a) + val(someAtom.pointer.b);
 * });
 * ```
 *
 * @param args - The pointer parameters.
 *
 * @typeParam O - The type of the value being pointed to.
 */
declare function pointer<O>(args: {
    root: {};
    path?: Array<string | number>;
}): Pointer<O>;
export default pointer;
/**
 * Returns whether `p` is a pointer.
 */
export declare const isPointer: (p: $IntentionalAny) => p is Pointer<unknown>;
//# sourceMappingURL=pointer.d.ts.map
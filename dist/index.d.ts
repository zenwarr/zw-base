export interface ComponentOptions {
    rootSelector?: string;
}
/**
 * Gets value of a binary option that can be specified either through attribute on an element or as a default value in options.
 * @param {Element} elem Element to check attribute on
 * @param {string} attrName Attribute name
 * @param {boolean} defaultState Default result value
 * @returns {boolean} False if elem has no attribute (or its value is equal to "false") and default value is false
 * True if elem has attribute whose value is not equal to "false" or default value is true.
 */
export declare function checkBinaryOptionAttr(elem: Element, attrName: string | null | undefined, defaultState: boolean): boolean;
export declare class Component<OptionsType extends ComponentOptions> {
    protected _root: Element;
    protected _options: OptionsType;
    constructor(_root: Element, _options: OptionsType);
    readonly root: Element;
    readonly options: OptionsType;
    /**
     * This function helps to iterate over child elements with given selector, taking into account nesting.
     * It will be called for each element inside the root element of this component, but not for elements that are inside component of same class nested inside this component.
     * @param {string} selector
     * @param {(elem: Element) => void} cb
     * @private
     */
    protected _each(selector: string, cb: (elem: Element) => void): void;
}
export interface ComponentCtor<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
    new (root: Element, options?: OptionsType): ComponentType;
}
export declare type ComponentCreatorFunc<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> = (root: Element, options?: OptionsType) => ComponentType;
export declare class ComponentFactory<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
    protected _compName: string;
    protected _defOptions: OptionsType;
    protected _defComponent: ComponentCtor<ComponentType, OptionsType>;
    constructor(_compName: string, _defOptions: OptionsType, _defComponent: ComponentCtor<ComponentType, OptionsType>);
    init(options?: OptionsType, ctor?: ComponentCtor<ComponentType, OptionsType> | null | undefined): void;
    initByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, options?: OptionsType): void;
    createComp(ctor: ComponentCtor<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType;
    createCompByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType;
    ctorToCreator(ctor?: ComponentCtor<ComponentType, OptionsType> | null | undefined): ComponentCreatorFunc<ComponentType, OptionsType>;
    fromRoot(root: Element): ComponentType | null;
    static fromRoot<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions>(componentName: string, root: Element): ComponentType | null;
    static setComponent<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions>(componentName: string, root: Element, comp: Component<OptionsType>): void;
}
export declare function assign(target: object, ...sources: any[]): any;

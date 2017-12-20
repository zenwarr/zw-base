export interface ComponentOptions {
    rootSelector?: string;
}
export interface ComponentStatic<OptionsType> {
    fromRoot(root: Element): Component<OptionsType> | null;
}
export declare class Component<OptionsType extends ComponentOptions> {
    protected _root: Element;
    protected _options: OptionsType;
    constructor(_root: Element, _options: OptionsType);
    readonly root: Element;
    readonly options: OptionsType;
    static fromRoot<OptionsType>(componentName: string, root: Element): Component<OptionsType> | null;
    static setComponent<OptionsType>(componentName: string, root: Element, comp: Component<OptionsType>): void;
}
export interface ComponentCtor<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
    new (root: Element, options?: OptionsType): ComponentType;
    fromRoot(componentName: string, root: Element): ComponentType | null;
    setComponent(componentName: string, root: Element, comp: ComponentType): void;
}
export declare type ComponentCreatorFunc<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> = (root: Element, options?: OptionsType) => ComponentType;
export declare class ComponentFactory<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
    protected _compName: string;
    protected _defOptions: OptionsType;
    protected _defComponent: ComponentCtor<ComponentType, OptionsType>;
    constructor(_compName: string, _defOptions: OptionsType, _defComponent: ComponentCtor<ComponentType, OptionsType>);
    init(ctor?: ComponentCtor<ComponentType, OptionsType> | null | undefined, options?: OptionsType): void;
    initByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, options?: OptionsType): void;
    createComp(ctor: ComponentCtor<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType;
    createCompByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType;
    ctorToCreator(ctor?: ComponentCtor<ComponentType, OptionsType> | null | undefined): ComponentCreatorFunc<ComponentType, OptionsType>;
}
export declare function assign(target: object, ...sources: any[]): any;

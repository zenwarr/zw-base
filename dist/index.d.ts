export interface ComponentOptions {
    rootSelector?: string;
}
export declare class Component<OptionsType extends ComponentOptions> {
    protected _root: Element;
    protected _options: OptionsType;
    constructor(_root: Element, _options: OptionsType);
    readonly root: Element;
    readonly options: OptionsType;
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

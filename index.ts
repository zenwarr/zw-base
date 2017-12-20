export interface ComponentOptions {
  rootSelector?: string;
}

export interface ComponentStatic<OptionsType> {
  fromRoot(root: Element): Component<OptionsType>|null;
}

export class Component<OptionsType extends ComponentOptions> {
  constructor(protected _root: Element, protected _options: OptionsType) {

  }

  get root(): Element { return this._root; }

  get options(): OptionsType { return this._options; }

  static fromRoot<OptionsType>(componentName: string, root: Element): Component<OptionsType>|null {
    return (root as any)[`__hidden_comp_${componentName}`] || null;
  }

  static setComponent<OptionsType>(componentName: string, root: Element, comp: Component<OptionsType>): void {
    (root as any)[`__hidden_comp_${componentName}`] = comp;
  }
}

export interface ComponentCtor<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
  new (root: Element, options?: OptionsType): ComponentType;
  fromRoot(componentName: string, root: Element): ComponentType|null;
  setComponent(componentName: string, root: Element, comp: ComponentType): void;
}

export type ComponentCreatorFunc<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions>
    = (root: Element, options?: OptionsType) => ComponentType;

export class ComponentFactory<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
  constructor(protected _compName: string, protected _defOptions: OptionsType,
              protected _defComponent: ComponentCtor<ComponentType, OptionsType>) {

  }

  init(ctor?: ComponentCtor<ComponentType, OptionsType>|null|undefined, options?: OptionsType): void {
    return this.initByFunc(this.ctorToCreator(ctor), options);
  }

  initByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, options?: OptionsType): void {
    let rootSelector = options && options.rootSelector ? options.rootSelector : this._defOptions.rootSelector as string;
    let roots = document.querySelectorAll(rootSelector);
    for (let q = 0; q < roots.length; ++q) {
      this.createCompByFunc(creator, roots[q], options);
    }
  }

  createComp(ctor: ComponentCtor<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType {
    return this.createCompByFunc(this.ctorToCreator(ctor), root, options);
  }

  createCompByFunc(creator: ComponentCreatorFunc<ComponentType, OptionsType>, root: Element, options?: OptionsType): ComponentType {
    options = assign({}, this._defOptions, options);
    let r: ComponentType|null = null;
    if (this._defComponent) {
      r = this._defComponent.fromRoot(this._compName, root);
    }
    if (!r) {
      r = creator(root, options);
      this._defComponent.setComponent(this._compName, root, r);
    }
    return r;
  }

  ctorToCreator(ctor?: ComponentCtor<ComponentType, OptionsType>|null|undefined): ComponentCreatorFunc<ComponentType, OptionsType> {
    if (!ctor && !this._defComponent) {
      throw new Error('Cannot create component: given type is empty');
    }
    let uCtor = (ctor || this._defComponent) as ComponentCtor<ComponentType, OptionsType>;
    return (root, options) => new uCtor(root, options);
  }
}

export function assign(target: object, ...sources: any[]): any {
  if ((Object as any).assign) {
    return (Object as any).assign.call(this, target, ...sources);
  } else {
    if (target === undefined || target === null) {
      throw new TypeError('assign: Cannot convert first argument to object');
    }

    let to = Object(target);
    for (let i = 1; i < arguments.length; i++) {
      let nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      let keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        let nextKey = keysArray[nextIndex];
        let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }
}

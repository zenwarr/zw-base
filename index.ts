import closest from '@zcomp/closest';

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
export function checkBinaryOptionAttr(elem: Element, attrName: string|null|undefined, defaultState: boolean): boolean {
  if (!attrName || !elem.hasAttribute(attrName)) {
    return !!defaultState;
  } else {
    return (elem.getAttribute(attrName) as string).toLowerCase() !== 'false';
  }
}

export class Component<OptionsType extends ComponentOptions> {
  constructor(protected _root: Element, protected _options: OptionsType) {

  }

  get root(): Element { return this._root; }

  get options(): OptionsType { return this._options; }

  /**
   * This function helps to iterate over child elements with given selector, taking into account nesting.
   * It will be called for each element inside the root element of this component, but not for elements that are inside component of same class nested inside this component.
   * @param {string} selector
   * @param {(elem: Element) => void} cb
   * @private
   */
  protected _each(selector: string, cb: (elem: Element) => void): void {
    let elements = this.root.querySelectorAll(selector);
    for (let q = 0; q < elements.length; ++q) {
      let elem = elements[q];
      if (closest(elem, this.options.rootSelector || '') === this.root) {
        cb(elem);
      }
    }
  }
}

export interface ComponentCtor<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
  new (root: Element, options?: OptionsType): ComponentType;
}

export type ComponentCreatorFunc<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions>
    = (root: Element, options?: OptionsType) => ComponentType;

export class ComponentFactory<ComponentType extends Component<OptionsType>, OptionsType extends ComponentOptions> {
  constructor(protected _compName: string, protected _defOptions: OptionsType,
              protected _defComponent: ComponentCtor<ComponentType, OptionsType>) {

  }

  init(options?: OptionsType, ctor?: ComponentCtor<ComponentType, OptionsType>|null|undefined): void {
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
      r = ComponentFactory.fromRoot(this._compName, root);
    }
    if (!r) {
      r = creator(root, options);
      ComponentFactory.setComponent(this._compName, root, r);
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

  fromRoot(root: Element): ComponentType|null {
    return ComponentFactory.fromRoot<ComponentType, OptionsType>(this._compName, root);
  }

  static fromRoot<
      ComponentType extends Component<OptionsType>,
      OptionsType extends ComponentOptions
      >(componentName: string, root: Element): ComponentType|null {
    return (root as any)[`__hidden_comp_${componentName}`] || null;
  }

  static setComponent<
      ComponentType extends Component<OptionsType>,
      OptionsType extends ComponentOptions
      >(componentName: string,root: Element, comp: Component<OptionsType>): void {
    (root as any)[`__hidden_comp_${componentName}`] = comp;
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

import { expect } from 'chai';
import {Component, ComponentFactory, ComponentOptions} from "./index";

function init(html: string): void {
  document.body.innerHTML = html;
}

function elem(id: string): Element {
  return document.getElementById(id) as Element;
}

interface SomeComponentOptions extends ComponentOptions {
  someOption?: string;
  otherOption?: string;
}

class SomeComponent extends Component<SomeComponentOptions> {
  constructor(root: Element, options: SomeComponentOptions) {
    super(root, options);
  }
}

let factory = new ComponentFactory<SomeComponent, SomeComponentOptions>('SomeComponent', {
  someOption: 'some value',
  otherOption: 'other value',
  rootSelector: '.js-some'
}, SomeComponent);

describe("ComponentFactory", function () {
  it('should create components', function () {
    init(`<div id="root" class="js-some"></div><div class="not-a-root" id="not-a-root"></div>`);
    factory.init({
      someOption: '10'
    });
    let comp = ComponentFactory.fromRoot('SomeComponent', elem('root'));
    expect(comp).to.not.be.empty;
    expect(factory.fromRoot(elem('root'))).to.be.equal(comp);
    if (comp) {
      expect(comp.root).to.be.equal(elem('root'));
      expect(comp.options).to.be.deep.equal({
        someOption: '10',
        otherOption: 'other value',
        rootSelector: '.js-some'
      } as SomeComponentOptions);
    }
  });
});

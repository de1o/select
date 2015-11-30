const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const Simulate = TestUtils.Simulate;
const Select = require('../');
const Option = Select.Option;
const $ = require('jquery');

describe('Combobox', () => {
  let div = null;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('should be combobox', () => {
    const instance = ReactDOM.render(
      <Select combobox>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
      </Select>, div
    );
    expect(!!ReactDOM.findDOMNode(instance.refs.selection).getAttribute('tabindex')).to.be(false);
  });

  it('support defaultValue', () => {
    const instance = ReactDOM.render(
      <Select combobox defaultValue="1">
        <Option value="22222">22222</Option>
        <Option value="11111">11111</Option>
      </Select>, div
    );
    const input = ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'rc-select-search__field')[0]);
    expect(input.value).to.be('1');
    Simulate.click(input);
    const activeItem = $(instance.getPopupDOMNode()).find('.rc-select-dropdown-menu-item-active')[0];
    expect(activeItem.innerHTML).to.be('11111');
    Simulate.click(activeItem);
    expect(input.value).to.be('11111');
  });
});

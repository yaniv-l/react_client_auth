import jsdom from 'jsdom';
/* import jquery but instead of using the typical '$' sign, we use '_$' - this
  is since we are not realey in a browser and do not have a window - if using
  jquey $, wheh jquery will load up it will immideiatly will try to get a
  reference to the window which we do not have, hence we use _$ which will use
  to customize to reference jquery to our fake window
  BTW - _$ is just a name and has no significant - can be any name! */
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
// Since we're using JSX (inside renderComponent) we have to import react,
// otherwise the test will issue errors of 'ReferenceError: React is not
// defined'
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

/*** Setup a testing envinroment to run like a browser in a commandline ***/
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// The following line will cutomise the $ jquery to refer our fake window
const $ = _$(global.window);

/*** Build a renderComponent helper that should render a given react class ***/
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>);
  // Produc HTML
  return $(ReactDOM.findDOMNode(componentInstance));
}

/*** Build a simulate function to simulate events ***/
// addign a simulate function to jquery - once added, this method will be
// expoced for any jquery object to execute
$.fn.simulate = function (eventName, value) {
  if (value) {
    this.val(value);
  }
  // Since we need to simulate a dynamic event, we'll call the specific
  // function using index (i.e instaed of TestUtils.Simulate.click)
  // Since 'this' may be any element, like div, which can have many childs,
  // here again, we'll access that first one (the caller and hence this
  // reference) using index, i.e this[0]
  TestUtils.Simulate[eventName](this[0]);
};

/*** Setup chaiJquery ***/
chaiJquery(chai, chai.util, $);

/*** export ***/
export { renderComponent, expect };

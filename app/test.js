import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiImmutable from 'chai-immutable';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Config from './config'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import * as router from 'react-router';
import React from 'react';
import { mount,render,shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import jsdom from 'jsdom'

chai.use(chaiEnzyme());
chai.use(chaiImmutable);
chai.use(sinonChai);

function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}
global.expect = chai.expect;
global.sessionStorage  = storageMock();
global.localStorage = storageMock();
global.mockStore = configureMockStore([thunk]);
global.config = new Config();
global.mock = new MockAdapter(axios);
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.React = React;
global.router = router;
global.sinon = sinon;

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

global.navigator = {
  userAgent: 'node.js'
};

router.browserHistory = { push: ()=>{} };
const browserHistoryPushStub = sinon.stub(router.browserHistory, 'push', () => { });

global.browserHistoryPushStub = browserHistoryPushStub;

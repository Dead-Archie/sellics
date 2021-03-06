import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

let store = {
	uploadImage: {},
};

describe('App test suite', () => {
  const props = {};
  let wrapper, instance;


  function renderShallow() {
    wrapper = shallow(<App {...props} store={store}/>);
    instance = wrapper.instance();
  }


  it('<APP/> should render with default props', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  
})
import React from 'react';
import { shallow } from 'enzyme';
import ImageDescription from '../index';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('App test suite', () => {
  const props = {};
  let wrapper, instance;


  function renderShallow() {
    wrapper = shallow(<ImageDescription {...props} />);
    instance = wrapper.instance();
  }


  it('<APP/> should render with default props', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });
})
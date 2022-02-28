import React from 'react';
import { shallow } from 'enzyme';
import ImageListing from '../index';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('App test suite', () => {
  const props = {};
  let wrapper, instance;


  function renderShallow() {
    wrapper = shallow(<ImageListing {...props} />);
    instance = wrapper.instance();
  }


  it('<APP/> should render with default props', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });
})
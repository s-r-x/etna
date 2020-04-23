import React from 'react';
import {IndexPage} from './index';
import {shallow} from 'enzyme';

it('should inc/dec', () => {
  let counter = 42;
  const inc = jest.fn(() => counter++),
    dec = jest.fn(() => counter--);
  const wrap = shallow(<IndexPage counter={counter} inc={inc} dec={dec} />);

  expect(wrap.find('#counter')).toHaveText('42');

  wrap.find('#inc').simulate('click');
  wrap.find('#inc').simulate('click');
  wrap.find('#dec').simulate('click');
  expect(inc).toHaveBeenCalledTimes(2);
  expect(dec).toHaveBeenCalledTimes(1);

  wrap.setProps({counter});
  expect(wrap.find('#counter')).toHaveText('43');
});

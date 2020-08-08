import React from 'react';
import { shallow } from 'enzyme';
import Account from '../Account';

describe('A suite', function() {

  it('should mount in a full DOM', function() {
    expect(shallow(<Account />).find('#container-account').length).toBe(1);
  });


});
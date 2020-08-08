import React from 'react';
import { mount, shallow } from 'enzyme';

import { Home } from '../Home';

describe('A suite', function() {

  it('should mount in a full DOM', function() {
    expect(shallow(<Home />).find('#container-home').length).toBe(1);
  });


});
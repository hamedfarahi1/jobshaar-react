import React from 'react';
import { shallow, mount } from 'enzyme';

import {Suggests} from '../Suggests';

describe('A suite', function() {

  it('should mount in a full DOM', function() {
    expect(mount(<Suggests />).find('.hamed').length).toBe(1);
  });

  it('renders list-items', () => {
    const items = [{
        id: 0,
        title: 'one'

    },{
        id: 1,
        title: 'two'  
      },{
        id: 2,
        title: 'three'
    },];
    const wrapper = mount(<Suggests/>);
  });

});
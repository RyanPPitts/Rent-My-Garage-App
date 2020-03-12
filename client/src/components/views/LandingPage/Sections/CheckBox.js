import React from 'react';
import { Checkbox, Collapse } from 'antd';

const {Panel} = Collapse

const locations = [
  {
    _id: 1,
    name: 'Washington'
  },
  {
    _id: 2,
    name: 'Oregon'
  },
  {
    _id: 3,
    name: 'Idaho'
  },
  {
    _id: 4,
    name: 'California'
  },
  {
    _id: 5,
    name: 'Other'
  }
];

function CheckBox() {
  return <div>
    <Collapse defaultActiveKey={['0']} >
      <Panel header key='1'>
        {locations.map((value, index) => (
          <React.Fragment key={index}>
            <CheckBox
            onChange
            type="checkbox"
            checked
            />
            <span>{value.name}</span>
          </React.Fragment>
        ))}
      </Panel>
    
    </Collapse>

  </div>;
  )
}

export default CheckBox;

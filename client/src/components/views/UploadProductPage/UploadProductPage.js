import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const Locations = [
  { key: 1, value: 'Washington' },
  { key: 2, value: 'Oregon' },
  { key: 3, value: 'Idaho' },
  { key: 4, value: 'California' },
  { key: 5, value: 'Other' }
];

function UploadProductPage() {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);
  const [LocationValue, setLocationValue] = useState(1);

  const onTitleChange = event => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = event => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = event => {
    setPriceValue(event.currentTarget.value);
  };

  const onLocationsSelectChange = event => {
    setLocationValue(event.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Pictures</Title>
      </div>

      <Form onSubmit>
        <br />
        <br />

        <label>Title:</label>
        <Input onChange={onTitleChange} value={TitleValue} />

        <br />
        <br />

        <label>Description:</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />

        <br />
        <br />

        <label>Price($):</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />

        <br />
        <br />

        <select onChange={onLocationsSelectChange}>
          {Locations.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button onClick>Submit Listing</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;

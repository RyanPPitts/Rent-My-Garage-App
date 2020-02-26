import React, { useState } from 'react';

const Locations = [
  { key: 1, value: 'Seattle' },
  { key: 2, value: 'Bellevue/Redmond' },
  { key: 3, value: 'Renton' },
  { key: 4, value: 'Auburn/Kent' },
  { key: 5, value: 'Tacoma' },
  { key: 6, value: 'Olympia' },
  { key: 7, value: 'Other' }
];

function UploadProductPage() {
  const [TitleValue, setTitleValue] = useState('');
  const [DescriptionValue, setDescriptionValue] = useState('');
  const [PriceValue, setPriceValue] = useState(0);

  const onTitleChange = event => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = event => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = event => {
    setPriceValue(event.currentTarget.value);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Upload Product</h2>
      </div>

      <form onSubmit>
        <br />
        <br />

        <label>Title:</label>
        <input onChange={onTitleChange} value={TitleValue} />

        <br />
        <br />

        <label>Description:</label>
        <textarea onChange={onDescriptionChange} value={DescriptionValue} />

        <br />
        <br />

        <label>Price($):</label>
        <input onChange={onPriceChange} value={PriceValue} type="number" />

        <br />
        <br />

        <select>
          {Locations.map(item => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <button onClick>Submit Listing</button>
      </form>
    </div>
  );
}

export default UploadProductPage;

const price = [
  {
    _id: 0,
    name: 'Any',
    array: []
  },
  {
    _id: 1,
    name: '$0 to $2,000',
    array: [0, 2000]
  },
  {
    _id: 2,
    name: '$2,000 to $6,000',
    array: [2001, 6000]
  },
  {
    _id: 3,
    name: '$6,000 to $15,000',
    array: [6001, 15000]
  },
  {
    _id: 4,
    name: '$15,000 to $30,000',
    array: [15001, 30000]
  },
  {
    _id: 5,
    name: 'More than $30,000',
    array: [30001, 2000000]
  }
];

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

export { price, locations };

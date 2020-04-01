import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { locations, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function LandingPage() {
  // state of the component
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState('');
  const [Filters, setFilters] = useState({
    locations: [],
    price: []
  });

  // When more than 8 posts shows show load more button.  Less than 8 items no load more button.

  useEffect(() => {
    // get information from the MongoDB for the landing page
    const variables = {
      skip: Skip,
      limit: Limit
    };
    getProducts(variables);
  }, []);

  const getProducts = variables => {
    Axios.post('/api/product/getProducts', variables).then(response => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        //   spread operator to bring in the first 8 plus the next 8 products

        setPostSize(response.data.postSize);
        console.log(response.data.products);
      } else {
        alert('Failed to get product information');
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = filters => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    };

    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      console.log('key', key);
      console.log('value', value);
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log('array', array);
    return array;
  };

  const handleFilters = (filters, category) => {
    console.log(filters);
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category == 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = newSearchTerm => {
    setSearchTerms(newSearchTerm);
    console.log(newSearchTerm);

    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);
    getProducts(variables);
  };

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Want a cool car?</h2>
      </div>

      {/* filter */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={locations}
            handleFilters={filters => handleFilters(filters, 'locations')}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={filters => handleFilters(filters, 'price')}
          />
        </Col>
      </Row>

      {/* search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto'
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>

      {Products.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      {PostSize >= Limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;

import React, { useEffect, useState } from 'react';
import { FaCode, FaCreditCard } from 'react-icons/fa';
import Axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import { Icon, Col, Card, Row } from 'antd';
import CheckBox from './Sections/CheckBox';

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

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
        //   spread operator to bring in the first 8 plus the next 8 products
        setProducts([...Products, response.data.products]);
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
      limit: Limit
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card hoverable={true} cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '80%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Want a cool car?</h2>
      </div>

      {/* filter */}
      <CheckBox />

      {/* search */}

      {Products.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <h2> No cars listed yet</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {renderCards}
            })>
          </Row>
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

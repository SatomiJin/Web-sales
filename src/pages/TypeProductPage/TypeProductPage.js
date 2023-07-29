import { Col, Pagination, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as ProductService from "../../Services/ProductService";
import NavBar from "../../components/NavBarComponent/NavBar";
import CardProduct from "../../components/CardComponent/CardProduct";
import "./TypeRroductPage.css";
import Loading from "../../loading/Loading";

function TypeProductPage() {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onChange = () => {};

  const fetchProductType = async (type) => {
    setIsLoading(true);
    const res = await ProductService.getAllProdctType(type);

    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res.data);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state);
    }
  }, [state]);
  console.log("products", products);
  return (
    <div className="container-type-product">
      <Row className="type-product-wrapper">
        <Col span={4} className="nav-type-product">
          <NavBar />
        </Col>
        <Col span={20}>
          <Loading isLoading={isLoading}>
            <div className="card-product-list">
              {products?.map((product) => {
                return (
                  <CardProduct
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    discount={product.discount}
                    sold={product.sold}
                    id={product._id}
                  />
                );
              })}
            </div>
            <Pagination className="pagination-type-product" total={products.length} onChange={onChange} />
          </Loading>
        </Col>
      </Row>
    </div>
  );
}

export default TypeProductPage;

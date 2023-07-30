import { Col, Pagination, Row } from "antd";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import * as ProductService from "../../Services/ProductService";
import NavBar from "../../components/NavBarComponent/NavBar";
import CardProduct from "../../components/CardComponent/CardProduct";
import "./TypeRroductPage.css";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";

function TypeProductPage() {
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });
  const onChange = (current, pageSize) => {
    console.log({ current, pageSize });
    setPaginate({ ...paginate, page: current - 1, limit: pageSize });
  };

  const fetchProductType = async (type, page, limit) => {
    setIsLoading(true);
    const res = await ProductService.getAllProdctType(type, page, limit);
    console.log(res);
    if (res?.status === "OK") {
      setIsLoading(false);
      setProducts(res.data);
      setPaginate({ ...paginate, total: res?.totalProduct });
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state) {
      fetchProductType(state, paginate.page, paginate.limit);
    }
  }, [state, paginate.page, paginate.limit]);

  return (
    <div className="container-type-product">
      <Row className="type-product-wrapper">
        <Col span={4} className="nav-type-product">
          <NavBar />
        </Col>
        <Col span={20}>
          <Loading isLoading={isLoading}>
            <div className="card-product-list">
              {products
                ?.filter((pro) => {
                  if (searchDebounce === "") {
                    return pro;
                  } else if (pro?.name?.toLowerCase().includes(searchDebounce.toLowerCase())) {
                    return pro;
                  }
                })
                ?.map((product) => {
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
          </Loading>
        </Col>
      </Row>
      <Pagination
        className="pagination-type-product"
        defaultCurrent={paginate.page + 1}
        total={paginate?.total}
        onChange={onChange}
      />
    </div>
  );
}

export default TypeProductPage;

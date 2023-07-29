import { useQuery } from "@tanstack/react-query";

import CardProduct from "../../components/CardComponent/CardProduct";
import ProductType from "../../components/ProductType/ProductType";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../Services/ProductService";
import "./Home.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Loading from "../../loading/Loading";
import useDebounce from "../../hooks/useDebounce";

function Home() {
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  //lấy loại sản phầm
  const fetchGetAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res.data);
    }
  };
  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  //lấy loại sản phầm
  useEffect(() => {
    fetchGetAllTypeProduct();
  }, []);
  return (
    <Loading isLoading={isLoading}>
      <div className="home-container">
        <div className="product-type">
          {typeProducts.map((typeProduct) => {
            return <ProductType typeProduct={typeProduct} name={typeProduct} key={typeProduct} />;
          })}
        </div>
        <div className="sliders-container">
          <SliderComponent className="slider-items" />
          <div className="card-homepages">
            {products?.data?.map((product) => {
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
          <div className="button-wrapper">
            <ButtonComponent
              disabled={products?.totalProduct === products?.data?.length}
              className="button-show-more"
              textButton="Xem thêm"
              dash="true"
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
}

export default Home;

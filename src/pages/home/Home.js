import { useQuery } from "@tanstack/react-query";

import CardProduct from "../../components/CardComponent/CardProduct";
import ProductType from "../../components/ProductType/ProductType";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../Services/ProductService";
import "./Home.css";

function Home() {
  const arr = ["TV", "Tủ lạnh", "laptop"];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const { isLoading, data: products } = useQuery(["product"], fetchProductAll, { retry: 3, retryDelay: 1000 });
  return (
    <div className="home-container">
      <div className="product-type">
        {arr.map((arrs) => {
          return <ProductType name={arrs} key={arrs} />;
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
              />
            );
          })}
        </div>
        <div className="button-wrapper">
          <ButtonComponent className="button-show-more" textButton="Xem thêm" dash="true" />
        </div>
      </div>
    </div>
  );
}

export default Home;

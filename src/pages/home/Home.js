import CardProduct from "../../components/CardComponent/CardProduct";
import ProductType from "../../components/ProductType/ProductType";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./Home.css";

function Home() {
  const products = ["TV", "Tủ lạnh", "laptop"];
  return (
    <>
      <div className="product-type">
        {products.map((product) => {
          return <ProductType name={product} key={product} />;
        })}
      </div>
      <div className="sliders-container">
        <SliderComponent className="slider-items" />
        <div className="card-homepages">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        <div className="button-wrapper">
          <ButtonComponent
            className="button-show-more"
            textButton="Xem thêm"
            dash="true"
          />
        </div>
      </div>
    </>
  );
}

export default Home;

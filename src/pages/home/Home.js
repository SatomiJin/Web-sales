import ProductType from "../../components/ProductType/ProductType";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
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
      </div>
    </>
  );
}

export default Home;

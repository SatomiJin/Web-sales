import ProductType from "../../components/ProductType/ProductType";
import "./Home.css";

function Home() {
  const products = ["TV", "Tủ lạnh", "laptop"];
  return (
    <div className="wrapper">
      {products.map((product) => {
        return <ProductType name={product} key={product} />;
      })}
    </div>
  );
}

export default Home;

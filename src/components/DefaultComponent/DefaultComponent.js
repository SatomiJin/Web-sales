import Footer from "../Footer/Footer";
import Header from "../HeaderrComponent/Header";

function DefaultComponent({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultComponent;

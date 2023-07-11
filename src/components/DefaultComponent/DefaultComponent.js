import Header from "../HeaderrComponent/Header";

function DefaultComponent({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DefaultComponent;

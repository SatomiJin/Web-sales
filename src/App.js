import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "@tanstack/react-query";

function App() {
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}product/detail-all-product`);
    return res.data;
  };
  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  console.log(query);
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Pages = route.page;
            const Layouts = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layouts>
                    <Pages />
                  </Layouts>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

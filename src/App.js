import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import * as UserService from "./Services/UserService";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routes";
import { isJsonString } from "./utils";
import { updateUser } from "./redux/slides/UserSlide";
import Loading from "./loading/Loading";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  axios.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    setIsLoading(true);
    let storageData = localStorage.getItem("access_token");
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      const decoded = jwt_decode(storageData);
      if (decoded?.id) {
        handleGetDetailsUser(decoded?.id, storageData);
      }
    }
    setIsLoading(false);
  }, []);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res, access_token: token }));
    setIsLoading(false);
  };

  //

  return (
    <div className="App">
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Pages = route.page;
              const isCheckAuth = !route.isPrivate || user?.isAdmin;
              const Layouts = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={index}
                  path={isCheckAuth ? route.path : ""}
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
      </Loading>
    </div>
  );
}

export default App;

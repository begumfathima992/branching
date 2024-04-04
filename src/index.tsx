import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";

import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import { useAppDispatch } from "./store/hooks";
import { useProfileQuery } from "./store/slices/authApiSlice";
import { setCities, setState } from "./store/slices/userSlice";
import { store } from "./store/store";
import { theme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

export const WithRedux = () => {
  useProfileQuery();
  const dispatch = useAppDispatch();
  const states = localStorage.getItem("states");
  const cities = localStorage.getItem("cities");

  useLayoutEffect(() => {
    const getStates = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("https://countriesnow.space/api/v0.1/countries/states", {
            method: "POST",
            body: JSON.stringify({
              country: "Canada",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch("https://countriesnow.space/api/v0.1/countries/cities", {
            method: "POST",
            body: JSON.stringify({
              country: "Canada",
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);
        const states = await res1.json();
        const cities = await res2.json();
        if ("data" in states) {
          dispatch(setState(states));
          localStorage.setItem("states", JSON.stringify(states));
        }
        if ("data" in cities) {
          dispatch(setCities(cities));
          localStorage.setItem("cities", JSON.stringify(cities));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (cities === null || states === null) {
      getStates();
    }
  }, [cities, states]);

  return <App />;
};

root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Provider store={store}>
        <WithRedux />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);

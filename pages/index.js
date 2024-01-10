import React, { useState, useContext, useEffect } from "react";

import {
  Header,
  Home,
  Action,
  GetPool,
  Networks,
  LiqudityHistory,
  PoolHistory,
  Promo,
  Loader,
  IconOne,
  IconTwo,
} from "../components/index";
import { Context } from "../context/index";

const index = () => {
  const { Dapp_Name, loading, GET_POOL_ADDRESS, GET_POOL_DETAILS } =
    useContext(Context);

  // STATE VARIABLE
  const [activeNetwork, setActiveNetwork] = useState("");
  const [activeComponent, setActiveComponent] = useState("Home");

  useEffect(() => {
    const network = JSON.parse(localStorage.getItem("activeNetwork"));
    setActiveNetwork(network?.name);
  }, [activeNetwork]);
  return (
    <div className="bg-slate-900">
      <Header
        setActiveComponent={setActiveComponent}
        activeNetwork={activeNetwork}
      />
      {activeComponent === "Home" ? (
        <Home
          setActiveComponent={setActiveComponent}
          GET_POOL_DETAILS={GET_POOL_DETAILS}
        />
      ) : activeComponent === "Home" ? (
        <GetPool GET_POOL_ADDRESS={GET_POOL_ADDRESS} />
      ) : activeComponent === "Home" ? (
        <PoolHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent === "Home" ? (
        <LiqudityHistory setActiveComponent={setActiveComponent} />
      ) : activeComponent === "Home" ? (
        <Networks setActiveComponent={setActiveComponent} />
      ) : (
        ""
      )}
    </div>
  );
};

export default index;

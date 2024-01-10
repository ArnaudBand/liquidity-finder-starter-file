import React, { useState, useContext, useEffect } from 'react';

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
  const { Dapp_Name } = useContext(Context);
  return (
    <div>
      {Dapp_Name}
    </div>
  )
}

export default index;

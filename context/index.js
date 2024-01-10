import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import axios from "axios";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import toast from "react-hot-toast";

// internal imports
import { FACTORY_ABI, FACTORY_ADDRESS } from "./constants";
import { } from "../utils/shortaddress";

export const Context = React.createContext();

export const Provider = ( { children } ) => {
  const Dapp_Name = "WEB3-UNISWAP-V3";
  const [ loading, setLoading ] = useState( false );

  // Notification
  const notifyError = ( message ) => toast.error( message, { duration: 4000 } );
  const notifySuccess = ( message ) => toast.success( message, { duration: 4000 } );

  // NETWORKS
  const GET_POOL_ADDRESS = async ( liquidity, selectedNetwork ) => {

    try {
      // PROVIDER
      const PROVIDER = new ethers.providers.JsonRpcProvider(
        selectedNetwork.rpcUrl
      );
      const factoryContract = new ethers.Contract(
        FACTORY_ADDRESS,
        FACTORY_ABI,
        PROVIDER
      );

      const poolAddress = await factoryContract.functions.getPool(
        liquidity.tokenA,
        liquidity.tokenB,
        Number(liquidity.fee)
      );

      const poolHistory = {
        token_A: liquidity.token_A,
        token_B: liquidity.token_B,
        fee: liquidity.fee,
        network: selectedNetwork.name,
        pool_address: poolAddress,
      }
      
    } catch (error) {
      
    }
  };

  return (
    <Context.Provider value={ { Dapp_Name } }>{ children }</Context.Provider>
  );
};
import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import axios from "axios";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import toast from "react-hot-toast";

// internal imports
import { FACTORY_ABI, FACTORY_ADDRESS } from "./constants";
import { } from "../utils/shortaddress";
import Loader from '../components/Loader';

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
      setLoading( true );
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
        Number( liquidity.fee )
      );

      const poolHistory = {
        token_A: liquidity.token_A,
        token_B: liquidity.token_B,
        fee: liquidity.fee,
        network: selectedNetwork.name,
        pool_address: poolAddress,
      }

      let poolArray = [];
      const poolLists = localStorage.getItem( "poolArray" );
      if ( poolLists ) {
        poolArray = JSON.parse( poolLists );
        poolArray.push( poolHistory );
        localStorage.setItem( "poolArray", JSON.stringify( poolArray ) );
      } else {
        poolArray.push( poolHistory );
        localStorage.setItem( "poolArray", JSON.stringify( poolArray ) );
      }

      setLoading( false );
      notifySuccess( "Pool Address Generated Successfully" );

      return poolAddress;

    } catch ( error ) {
      setLoading( false );
      notifyError( "error" );
    }
  };

  // GET POOL DETAILS
  const getPoolData = async ( poolContract, selectedNetwork, poolAddress ) => {
    const [liquidity, fee, token0, token1] = await Promise.all([
      poolContract.liquidity(),
      poolContract.fee(),
      poolContract.token0(),
      poolContract.token1(),
    ])

    return {
      liquidity: liquidity.toString(),
      fee: fee,
      token0: token0,
      token1: token1,
      poolAddress: poolAddress,
      network: selectedNetwork.name,
    }
  }

  // GET POOL DETAILS
  const GET_POOL_DETAILS = async (poolAddress, selectednetwork) => {
    try {
      setLoading( true );

      const PROVIDER = new ethers.providers.JsonRpcProvider(
        selectednetwork.rpcUrl
      );

      const poolContract = new Contract(
        poolAddress,
        UniswapV3Pool.abi,
        PROVIDER
      );

      const poolData = await getPoolData(poolContract, selectednetwork, poolAddress);

      let liquidityArray = [];
      const poolLists = localStorage.getItem( "liquidityArray" );
      if ( poolLists ) {
        liquidityArray = JSON.parse( poolLists );
        liquidityArray.push( poolData );
        localStorage.setItem( "liquidityArray", JSON.stringify( liquidityArray ) );
      } else {
        liquidityArray.push( poolData );
        localStorage.setItem( "liquidityArray", JSON.stringify( liquidityArray ) );
      }

      setLoading( false );
      notifySuccess( "Pool Address Generated Successfully" );

    } catch (error) {
      setLoading( false );
      notifyError( "error" );
    }
  }

  return (
    <Context.Provider value={ { Dapp_Name, loading, GET_POOL_ADDRESS, GET_POOL_DETAILS } }>
      { children }
    </Context.Provider>
  );
};
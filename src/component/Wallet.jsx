import React, { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";

const Wallet = ({ url, upDateBalance }) => {
  const [walletStats, setWalletStats] = useState();

  var eth = 0;
  var ethPrice = 0;
  var usdc = 0;
  var usdt = 0;
  var walletValueInUsd = 0;

  const fetchData = () => {
    axios
      .get(url)
      .then((response) => {
        setWalletStats(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (walletValueInUsd != 0) {
      setTimeout(() => upDateBalance(walletValueInUsd), 0);
    }
  }, [walletStats]);

  if (walletStats) {
    walletStats.data.items.map((item) => {
      switch (item.contract_name) {
        case "Ether":
          eth = item.balance / 1000000000000000000;
          ethPrice = item.quote_rate;
          break;
        case "USD Coin":
          usdc = item.balance / 1000000;
          break;
        case "Tether USD":
          usdt = item.balance / 1000000;
          break;
        default:
      }
    });
    walletValueInUsd = usdt + usdc + eth * ethPrice;

    return (
      <div className="wallet">
        <div className="wallet-name">{walletStats.data.address}</div>
        <ul>
          <li>
            ETH : {eth} <br />
            ETH Value : $ {millify(eth * ethPrice)}
          </li>
          <li>Tether USD : {millify(usdt)}</li>
          <li>USD Coin : {millify(usdc)}</li>
        </ul>
        <span className="totalWallet">Sum $ : {millify(walletValueInUsd)}</span>
      </div>
    );
  } else {
    return <div className="loading">Loading..</div>;
  }
};

export default Wallet;

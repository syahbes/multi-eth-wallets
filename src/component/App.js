import React, { useState } from "react";
import Wallet from "./Wallet";
import millify from "millify";
import address from "./address";

const host = "https://api.covalenthq.com/v1/1/address/";
const path = "/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_dd2c48b01cef47519d0b23ea1a3";

const App = () => {
  const [totalUsdBalance, setTotalUsdBalance] = useState(0);
  const upDateBalance = (num) => {
    setTotalUsdBalance((preState) => num + preState);
  };

  return (
    <div className="app-container">
      <div className="header">
        Total Wallets
        <span className="header-balance">${millify(totalUsdBalance)}</span>
        <div>$ {totalUsdBalance}</div>
      </div>

      <div className="wallets-container">
        {address.map((item, i) => {
          return (
            <Wallet
              url={`${host}${item}${path}`}
              upDateBalance={upDateBalance}
              key={i}
            />
          );
        })}
      </div>
    </div>

    // <div className="container">
    //   <div className="header">
    //     <div className="info">
    //
    //
    //     </div>
    //     <div className="info2"></div>
    //   </div>
    // </div>
  );
};

export default App;

import React from "react";
import transaction from "../../assets/transaction.svg";

function NoTransaction() {
  return (
    <div className="flex justify-center items-center w-full flex-col mb-8">
      <img src={transaction} className="w-[350px] m-16" alt="img" />
      <p className="text-xl text-center">You Have No Transactions Currently</p>
    </div>
  );
}
export default NoTransaction;

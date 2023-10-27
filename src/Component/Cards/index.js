import React from "react";
import { Card, Row } from "antd";

function Cards({
  currentBalance,
  income,
  expenses,
  showExpenseModal,
  showIncomeModal,
  reset,
}) {
  const cardStyle = {
    borderRadius: "0.5rem",
    minWidth:"315px",
    flex: 1,
  };

  function convertIntoStr(input){
    return Number.toLocaleString(input);
  }

  return (
    <Row className="flex flex-wrap gap-4 justify-between mt-4">
      <Card bordered={true} style={cardStyle} className="my-4 mx-2 bg-[var(--cardWhite)] border-[var(--white)]">
        <h2 className="text-xl font-bold my-4 text-[var(--textColor)] underline">Current Balance</h2>
        <p className="my-2 text-[var(--textColor)] text-xl ">₹ {currentBalance}</p>
        {/* <button
          className="bg-[var(--blue)] text-center text-[var(--white)] w-[100%] rounded m-0 p-1 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-gray-600"
          onClick={reset}
        >
          Reset Balance
        </button> */}
      </Card>

      <Card bordered={true} style={cardStyle} className="my-4 mx-2 bg-[var(--cardWhite)] border-[var(--white)]">
        <h2 className="text-xl font-bold my-4 text-[var(--textColor)]">Total Income</h2>
        <p className="my-2 text-[var(--textColor)]">₹ {income}</p>
        <button
          className="bg-[var(--blue)] text-center text-[var(--white)] w-[100%] rounded m-0 p-1 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-gray-600"
          onClick={showIncomeModal}
        >
          Add Income
        </button>
      </Card>

      <Card bordered={true} style={cardStyle} className="my-4 mx-2 bg-[var(--cardWhite)] border-[var(--white)]">
        <h2 className="text-xl font-bold my-4 text-[var(--textColor)]">Total Expenses</h2>
        <p className="my-2 text-[var(--textColor)]">₹ {expenses}</p>
        <button
          className="bg-[var(--blue)] text-center text-[var(--white)] w-[100%] rounded m-0 p-1 cursor-pointer hover:bg-white hover:text-black hover:border hover:border-gray-600"
          onClick={showExpenseModal}
        >
          Add Expense
        </button>
      </Card>
    </Row>
  );
}

export default Cards;

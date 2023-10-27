import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Table, Select, Radio, Card } from "antd";
import { toast } from "react-toastify";
import { parse } from "papaparse";
import "./style.css";
const { Option } = Select;

function TransactionTable({
  transactions,
  exportToCsv,
  addTransaction,
  fetchTransactions,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const searchMatch = search
      ? transaction.name.toLowerCase().includes(search.toLowerCase())
      : true;
    const tagMatch = selectedTag ? transaction.tag === selectedTag : true;
    const typeMatch = type ? transaction.type === type : true;

    return searchMatch && tagMatch && typeMatch;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transaction, index) => ({
    key: index,
    ...transaction,
  }));

  return (
    <div className="w-full  p-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-[var(--cardWhite)] px-2 py-1 gap-1 my-2 rounded-lg w-[75%]">
          <BsSearch />
          <input
            placeholder="Search by Name"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent text-[var(--textColor)]"
          />
        </div>
        <div className="w-[25%]">
          <Select
            className="select-input w-[100%] bg-transparent"
            onChange={(value) => setType(value)}
            value={type}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
      </div>
      <div className="bg-[var(--cardWhite)] sm:p-4 p-2 rounded ">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full my-4 gap-4">
          <h2 className="font-bold sm:text-2xl text-[var(--textColor)]">My Transactions</h2>

          <Radio.Group
            className="input-radio border-[var(--blue)]"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div className="flex justify-center gap-4 sm:w-[400px]">
            <button
              className="border px-2 sm:px-6 py-1 rounded border-[var(--blue)] text-[var(--blue)] hover:text-white hover:bg-[var(--blue)]"
              onClick={exportToCsv}
            >
              Export to CSV
            </button>
            <label
              for="file-csv"
              className="border border-[var(--blue)] px-2 sm:px-6 py-1 rounded text-white bg-[var(--blue)] hover:bg-white hover:text-[var(--blue)]"
            >
              Import from CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
          <Table columns={columns} dataSource={dataSource} size="small" className="bg-[var(--cardWhite)]"/>
      </div>
    </div>
  );
}

export default TransactionTable;

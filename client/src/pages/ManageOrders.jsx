import { useEffect, useState } from "react";
import Table from "../components/Table";
import TransactionCard from "../components/Transaction";

function ManageOrders() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/order');

        const orders = await response.json();
        setTableData(orders);
      } catch (error) {
        console.error(`An error occured while fetchign the orders from the server: ${error.message}`);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Table tableData={tableData} />
      <TransactionCard />
    </div>
  )
};

export default ManageOrders;

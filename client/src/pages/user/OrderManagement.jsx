import { useEffect, useState } from "react";
import Table from "../../components/Table";
import Navbar from "../../components/UserNavbar";
import TransactionCard from "../../components/Transaction";

function OrderManagement() {
  const [tableData, setTableData] = useState([]);
  const [transactions, setTransactions] = useState([]);
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

  useEffect(() => {
    console.log('ordermanagement transactions:');
    console.log(transactions);
  }, [transactions])

  return (
    <div>
      < Navbar />
      <div className="flex w-full p-16 justify-center text-black overflow-scroll">
        <div className="flex-row justify-center">
          <div className="text-3xl font-bold">Manage Orders</div>
          <div className="flex gap-2 min-w-max">
            <Table tableData={tableData} setTableData={setTableData} setTransactions={setTransactions} isAdmin={false} />
            <div className="w-[26.5rem] overflow-auto hidden xl:flex gap-2 card items-center bg-white border-4 border-farmgreen p-4">
              {transactions.length == 0 && <div>Click an order to preview</div>}
              {transactions.map((item, index) => {
                return <TransactionCard name={item.product_name} price={item.product_price} quantity={item.quantity} />
              }
              )}
            </div>

          </div>
        </div>
      </div>
    </div >
  )
};

export default OrderManagement;

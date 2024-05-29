import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "./StatusBadge";
import CancelButton from "./CancelButton";
import ConfirmButton from "./ConfirmButton";

function Table({ tableData, setTableData, setTransactions, isAdmin }) {

  const previewOrder = async (order_id) => {
    try {
      console.log(order_id);
      const response = await fetch(`http://localhost:3000/transaction?order_id=${order_id}`);
      const updatedTransactions = await response.json();

      console.log('updated Transactions:')
      console.log(updatedTransactions);

      setTransactions(updatedTransactions);
    } catch (error) {
      console.error(`An error occurred while fetching the transactions: ${error.message}`);
    }
  };

  const updateTableData = (id, status) => {
    setTableData((prevData) => prevData.map((order) =>
      order._id === id ? { ...order, status } : order
    ));
  };

  return (
    <div className="shadow-lg h-max card overflow-auto border-4 border-farmgreen">
      < table className="bg-white text-neutral" >
        <thead className="bg-farmgreen rounded-3xl sticky top-0">
          <tr className="*:text-left *:p-4 *:text-xl">
            <th>Order ID</th>
            <th>Date Ordered</th>
            <th>Status</th>
            {/* additional columns for cancel and preview button */}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="h-96 overflow-auto">
          {tableData.map((data, index) => {
            const date = new Date(data.createdAt);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            return (
              <tr key={index} className="even:bg-neutral-200 *:p-4">
                <td>{data._id}</td>
                <td>{month} {day}, {year}</td>
                <td>
                  <StatusBadge status={data.status} />
                </td>
                <td>
                  {!isAdmin && <CancelButton id={data._id} status={data.status} updateTableData={updateTableData} />}
                  {isAdmin && <ConfirmButton id={data._id} status={data.status} updateTableData={updateTableData} />}
                </td>
                <td>
                  <button onClick={() => previewOrder(data._id)}>
                    <div className="hover:bg-neutral-300 btn-circle justify-center items-center flex">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                  </button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table >
    </div >
  )
}

export default Table;

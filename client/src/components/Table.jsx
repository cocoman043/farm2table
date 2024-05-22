import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "./StatusBadge";
import CancelButton from "./CancelButton";

function Table({ tableData }) {

  const previewOrder = async () => {
    // TODO:

    console.log('Insert order preview here');
  };

  return (
    <div className="max-h-96 rounded-3xl overflow-auto">
      <table className="bg-white text-neutral">
        <thead className="bg-green-300 rounded-3xl sticky top-0">
          <tr className="*:text-left *:p-4 *:text-xl">
            <th>Id</th>
            <th>Date</th>
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
                  <CancelButton id={data._id} status={data.status} />
                </td>
                <td>
                  <button onClick={previewOrder}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table;

import { useEffect, useState } from "react";

function SalesReportTable({ startDate, endDate }) {
  const [productDetails, setProductDetails] = useState([]);

  const fetchProducts = async (startDate, endDate) => {
    try {
      const response = await fetch(`http://localhost:3000/salesReport?startDate=${startDate}&endDate=${endDate}`);

      const products = await response.json();
      console.log(products)

      if (products) {
        setProductDetails(products);
      }
    } catch (error) {
      console.error(`An error occured while fetching the sales report.${error.message} `);
    }
  }

  useEffect(() => {
    fetchProducts(startDate, endDate);
  }, [startDate]);

  return (
    <div className="h-max card overflow-auto border-4 border-farmgreen shadow-lg">
      < table className="bg-white text-neutral" >
        <thead className="bg-farmgreen rounded-3xl sticky top-0">
          <tr className="*:text-left *:p-4 *:text-xl">
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody className="h-96 overflow-auto">
          {productDetails.map((item, index) =>
            <tr key={index} className="even:bg-neutral-200 *:p-4">
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
              <td>{item.sold}</td>
              <td>{item.profit}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  );
};

export default SalesReportTable;

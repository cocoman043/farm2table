import { useState } from "react";
import Navbar from "../../components/AdminNavbar";
import SalesReportTable from "../../components/SalesReportTable";

function AdminDashboard() {
  const [startDate, setStartDate] = useState(null);
  const currentDate = new Date();

  const handleSetStartDate = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <Navbar />
      <div className="flex w-100 p-16 justify-center text-black overflow-scroll">
        <div className="flex flex-col justify-center w-full gap-4">
          <div className="text-3xl font-bold text-black">Sales Report</div>
          <div className="flex gap-4 text-black rounded-full shadow-lg 4 p-2 ">
            <button className="hover:bg-neutral-100 rounded-full px-2" onClick={() => handleSetStartDate(new Date(0))}>All Time</button>
            <button className="hover:bg-neutral-100 rounded-full px-2" onClick={() => handleSetStartDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))}>This Week</button>
            <button className="hover:bg-neutral-100 rounded-full px-2" onClick={() => {
              const oneMonthBefore = new Date(currentDate);
              oneMonthBefore.setMonth(currentDate.getMonth() - 1);
              handleSetStartDate(oneMonthBefore);
            }}>This Month</button>
            <button className="hover:bg-neutral-100 rounded-full px-2" onClick={() => {
              const oneYearBefore = new Date(currentDate);
              oneYearBefore.setFullYear(currentDate.getFullYear() - 1);
              handleSetStartDate(oneYearBefore);
            }}>This Year</button>
          </div>
          <SalesReportTable startDate={startDate} />
        </div>
      </div>
    </div >
  );
}

export default AdminDashboard;

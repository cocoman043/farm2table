import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorCard from "./components/ErrorCard";
import Shop from "./pages/user/Shop";

function App() {
  return (
    <>
      {/* <div className="flex p-8 w-screen justify-center h-screen items-center"> */}
        <Router>
          <Routes>
            <Route path="user/shop" element={<Shop />} />
            <Route path="*" element={<ErrorCard />} />
          </Routes>
        </Router>
      {/* </div> */}
    </>
  );
}

export default App;

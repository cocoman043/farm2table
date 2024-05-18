import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorCard from "./components/ErrorCard";

function App() {
  return (
    <>
      <div className="flex p-8 w-screen justify-center h-screen items-center">
        <Router>
          <Routes>
            {/* Insert routes here */}
            <Route path="*" element={<ErrorCard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

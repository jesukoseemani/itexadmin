import React from "react";
import NavBar from "../../components/navbar/NavBar";
import PosDataTabs from "../../components/posTabs/PosDataTabs";

const POS = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Point Of Sale"/>
      <PosDataTabs />
    </div>
  );
};

export default POS;
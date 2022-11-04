import React from "react";
import LegalDataTabs from "../../components/legalTabs/LegalDataTabs";
import NavBar from "../../components/navbar/NavBar";

const Legal = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Legal Businesses"/>
      <LegalDataTabs />
    </div>
  );
};

export default Legal;
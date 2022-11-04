import styles from "./FraudRiskManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { TabPanel } from "../../components/Tabs/Tabs";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import FraudSummary from "./FraudSummary";
import ReuseModal from "./ReuseModal"
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";

interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  merchant_name: string;
  volume: string;
  value: number;
  fraud_type: string;
  chargeback_type: string;
}

const CBFraudSummary = () => {
  const [value, setValue] = React.useState(0);
  const [settlementLogged, setSettlementLogged] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalRows, setTotalRows] = useState<number>(0);

  const [dataValue, setDataValue] = useState<number | string>(0);
  const [selected, setSelected] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
    id: "",
    type: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };


  useEffect(() => {
    open &&
      dispatch(
        openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <div className="modalDiv">
              <ReuseModal
                dataValue={dataValue}
                open={open}
                setOpen={setOpen}
                title="Chargeback details"
                type="Chargeback"
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);

  const handleReport = () => {
    history.push(`/settlements/report`);
  };

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/fraudMgt_cbandfraudsummary.json`, {
				baseURL: '',
			})
			.then((res) => {
				setApiRes(res.data);
			});
  }, []);

  useEffect(() => {
    setTotalRows(Number(apiRes?.length));
  }, [apiRes, rows]);

  interface Column {
    id:
      | "id"
      | "merchant_name"
      | "volume"
      | "value"
      | "chargeback_type"
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "merchant_name", label: "Merchant Name", minWidth: 100 },
    { id: "volume", label: "Total Volume", minWidth: 100 },
    { id: "value", label: "Total Value", minWidth: 100 },
    { id: "chargeback_type", label: "Chargeback Type", minWidth: 100 }
  ];
  const SettlementsRowTab = useCallback(
    (
      id: number | string,
      merchant_name: string,
      volume: string,
      value: string,
      chargeback_type: string
    ) => ({
      id: id,
      merchant_name: merchant_name,
      volume: volume,
      value: value,
      chargeback_type: chargeback_type,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.map((each: any) =>
          newRowOptions.push(
            SettlementsRowTab(
              each.id,
              each.merchant_name,
              each.volume,
              each.value,
              each.chargeback_type
            )
          )
        );
    setRows(newRowOptions);
  }, [apiRes, SettlementsRowTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            style={{ padding: "0 1rem", margin: "0" }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                background: "#27AE60",
                borderRadius: "8px",
                height: "4px",
              },
            }}
          >
            <Tab
              label="Chargeback Summary"
              style={{
                margin: "0 1rem",
                textTransform: "capitalize",
                color: value === 0 ? "#27AE60" : "#333333",
              }}
            />
            <Tab
              label="Fraud Summary"
              style={{
                textTransform: "capitalize",
                margin: "0 1rem",
                color: value === 1 ? "#27AE60" : "#333333",
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p>
                {apiRes?.length} Chargeback Summary
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
             
            </div>
          </div>
          <div className={styles.m1}>
            <OperantTable
              columns={columns}
              rows={rows}
              totalRows={totalRows}
              changePage={changePage}
              limit={limit}
              setDataValue={setDataValue}
              setOpen={setOpen}
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <FraudSummary />
        </TabPanel>
      </Box>
    </div>
  );
};

export default CBFraudSummary;

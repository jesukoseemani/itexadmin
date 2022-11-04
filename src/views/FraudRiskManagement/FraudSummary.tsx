import styles from "./FraudRiskManagement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router-dom";
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
                title="Fraud details"
                type="Fraud"
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);


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
      | "fraud_type"
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "merchant_name", label: "Merchant Name", minWidth: 100 },
    { id: "volume", label: "Total Volume", minWidth: 100 },
    { id: "value", label: "Total Value", minWidth: 100 },
    { id: "fraud_type", label: "Chargeback Type", minWidth: 100 }
  ];
  const SettlementsRowTab = useCallback(
    (
      id: number | string,
      merchant_name: string,
      volume: string,
      value: string,
     fraud_type: string
    ) => ({
      id: id,
      merchant_name: merchant_name,
      volume: volume,
      value: value,
      fraud_type: fraud_type
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
              each.fraud_type
            )
          )
        );
    setRows(newRowOptions);
  }, [apiRes, SettlementsRowTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p>
                {apiRes?.length} Fraud Summary
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
    </div>
  );
};

export default CBFraudSummary;

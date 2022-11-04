import React from "react";
import NavBar from "../../components/navbar/NavBar";
import styles from "./FeesAndLimits.module.scss";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { GetProviderApiTypes } from "../../types/UserTableTypes";
import AddProviderModal from "../../components/feesAndLimitsModals/AddProvider";
import axios from "axios";
import ActivityTypes from "../../types/ActivityTypes";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";

const Providers = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<GetProviderApiTypes>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
    5
  );
  const [totalRows, setTotalRows] = useState<number>(0);
  const [dataValue, setDataValue] = useState<number | string>(0);
  const [open, setOpen] = useState<boolean>(false);

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const dispatch = useDispatch();

  const addProviderHandler = () => {
    
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddProviderModal />
          </div>
        ),
      })
    );
  };


  useEffect(() => {
    dispatch(openLoader());
    axios
      .get<GetProviderApiTypes>(
        `/admin/provider?perpage=${rowsPerPage}&page=${pageNumber}`
      )
      .then((res) => {
        dispatch(closeLoader());
        setApiRes(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(closeLoader());
      });
  }, [rowsPerPage, pageNumber]);

  useEffect(() => {
    setTotalRows(Number(apiRes?.providers.length));
  }, [apiRes]);

  interface Column {
    id: "provider_name" | "provider_short_name" | "currency";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "provider_name", label: "Provider name", minWidth: 100 },
    { id: "provider_short_name", label: "Provider short name", minWidth: 100 },
    { id: "currency", label: "Currency", minWidth: 100 },
  ];

  const ProviderRowTab = useCallback(
    (
      id: number | string,
      name: string,
      shortname: string | number,
      currency: string | number
    ) => ({
      provider_name: name,
      provider_short_name: shortname,
      currency: currency,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.providers.map((each: any) =>
        newRowOptions.push(
          ProviderRowTab(each.code, each.name, each.shortname, each.currency)
        )
      );
    setRows(newRowOptions);
  }, [apiRes, ProviderRowTab]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="All Providers" />

      <div className={styles.feediv}>
        <div className={styles.tableHeader}>
          <div className={styles.tableHeaderLeft}>
            <p className={styles.header}>
              {apiRes?._metadata?.totalcount} Providers
            </p>
          </div>
          <div className={styles.tableHeaderRight}>
            <div className={styles.buttonDiv}>
              <button className={styles.buttonAdd} onClick={addProviderHandler}>
                <p>Add a new provider</p>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.m1}>
        {apiRes?.providers.length && (
          <OperantTable
            columns={columns}
            rows={rows}
            totalRows={totalRows}
            changePage={changePage}
            limit={limit}
            setDataValue={setDataValue}
            setOpen={setOpen}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Providers;

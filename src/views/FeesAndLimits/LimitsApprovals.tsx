import styles from "./FeesAndLimits.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { GetLimitsApproval } from "../../types/UserTableTypes";
import { format, parseISO } from "date-fns";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import LimitsApprovalModal from "./LimitsApprovalModal";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";

const LimitsApproval = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<GetLimitsApproval>();
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

  useEffect(() => {
    open &&
      dispatch(
        openModalAndSetContent({
          modalStyles: {
            padding: 0,
          },
          modalContent: (
            <div className="modalDiv">
              <LimitsApprovalModal
                dataValue={dataValue}
                open={open}
                setOpen={setOpen}
              />
            </div>
          ),
        })
      );
  }, [dataValue, open]);

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    dispatch(openLoader());
    axios
      .get<GetLimitsApproval>(
        `/admin/business/limit?merchantcode=ITX_M_V9ZJE4GL`
      )
      .then((res) => {
        dispatch(closeLoader());
        setApiRes(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(closeLoader());
      });
  }, []);

  useEffect(() => {
    setTotalRows(Number(apiRes?.businesses.length));
  }, [apiRes]);

  interface Column {
    id: "request_date" | "limit_type" | "requester" | "status";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "request_date", label: "Request date", minWidth: 100 },
    { id: "limit_type", label: "Limit type", minWidth: 100 },
    { id: "requester", label: "Requester", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
  ];

  const FeeApproavalRowTab = useCallback(
    (
      id: number | string,
      added: string,
      type: string,
      initiatedby: string | number
    ) => ({
      request_date: `${format(parseISO(added), "dd MMM yyyy")}`,
      limit_type: type,
      requester: initiatedby,
      status: (
        <span>
          <button className={styles.buttonPending}>Pending review</button>
        </span>
      ),
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.businesses.map((each: any) =>
        newRowOptions.push(
          FeeApproavalRowTab(
            each?.merchantcode,
            each?.added,
            each?.limitsetup[0]?.transactiontype,
            each?.limitsetup[0]?.initiatedby
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, FeeApproavalRowTab]);

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderLeft}>
          <p className={styles.header}>
            {apiRes?._metadata?.totalcount} fees pending approval
          </p>
        </div>
        <div className={styles.tableHeaderRight}></div>
      </div>
      <div className={styles.m1}>
        {apiRes?.businesses.length && (
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
    </Box>
  );
};

export default LimitsApproval;

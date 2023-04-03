import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import { useDispatch } from "react-redux";
import {
  closeLoader,
  openLoader,
} from "../../redux/actions/loader/loaderActions";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
import { useHistory } from "react-router-dom";
import {
  ColumnSettlementRollingModule,
  RollingReserveModuleData,
} from "../../types/RollingReserveTypes";
import TableHeader from "../../components/TableHeader/TableHeader";
import PaginationTable from "../../components/paginatedTable/pagination-table";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import RollbackModal from "./RollbackModal";
import useDownload from '../../interfaces/Download';

const RollingReserve = () => {
  const [contentAction, setContentAction] = useState<any>({});
  const [value, setValue] = useState("");

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tableRow, setTableRow] = useState<any[]>();

  const [totalRows, setTotalRows] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElDownload, setAnchorElDownload] = useState<null | HTMLElement>(
    null
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [bearer, setBearer] = useState<boolean>(false);
  const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
    false
  );
  const [dropdown, setDropdown] = useState(false);
  const [rollingRes, setRollingRes] = useState<any>();
  const dispatch = useDispatch();

  const history = useHistory();

  const getRollingReserve = async () => {
    dispatch(openLoader());
    try {
      const { data } = await axios.get(
        `/v1/rollingreserve?fromdate=${fromDate}&search=${value}&todate=${toDate}&perpage=${rowsPerPage}&page=${pageNumber}`
      );
      setRollingRes(data);
      dispatch(closeLoader());
      setBearer(false);
    } catch (error: any) {
      dispatch(closeLoader());
      const { message } = error.response.data;
      dispatch(
        dispatch(
          openToastAndSetContent({
            toastContent: message,
            toastStyles: {
              backgroundColor: "red",
            },
          })
        )
      );
    }
  };

  useEffect(() => {
    getRollingReserve();
  }, [bearer, value, pageNumber, rowsPerPage]);

  useEffect(() => {
    setPageNumber(rollingRes?._metadata?.page || 1);
  }, [rollingRes]);

  // useEffect(() => {
  //   Object.values(contentAction).length > 0 &&
  //     history.push(`/rollingreserve/${contentAction?.id}`);
  // }, [contentAction]);

  const dataReserve = () => {
    const tempArr: RollingReserveModuleData[] = [];
    rollingRes?.rollingreserves
      ?.slice(0)
      .reverse()
      .forEach((rolling: any, index: number) => {
        return tempArr.push({
          id: rolling?.id,
          rolling_id: rolling?.id,
          settlement_id: rolling?.settlementid,
          amount: rolling?.amount,
          currency: rolling?.currency,
          status: rolling?.status,
          balanceBefore: rolling?.balanceBefore,
          balanceAfter: rolling?.balanceAfter,
          merchantcode: rolling?.business?.merchantcode,
          duedate: rolling?.duedate,
          action: <Box className={styles.rolling}>
            <button onClick={() => showRollBackForm(rolling?.id)}>Reserve</button>
          </Box>,
          date: rolling?.createdat,
        });
      });
    return tempArr;
  };

  useEffect(() => {
    setTableRow(dataReserve());
  }, [rollingRes?.rollingreserves]);

  const showRollBackForm = (id: any) => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
          width: 400,
          // height: 500,
          borderRadius: "20px",
        },
        modalContent: (
          <div className={styles.modalDiv}>
            <RollbackModal id={id} />
          </div>
        ),
      })
    );
  };

  const { calDownload } = useDownload(
    { url: 'https://staging.itex-pay.com/ipgadmin/api/v1/rollingreserve/download', filename: `RollingReserve${Date.now()}.csv` }
  );

  const handleDownload = async () => {
    try {
      dispatch(openLoader());
      await calDownload();
      dispatch(closeLoader());
    } catch (error) {
      dispatch(closeLoader());
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="Rolling reserve" />


      <Box
        sx={{
          marginTop: "2rem",
          padding: "2rem",
        }}
      >
        <TableHeader
          pageName="Rolling Reserve"
          data={rollingRes?.rollingreserves}
          dataLength={rollingRes?._metadata.totalcount}
          value={value}
          setValue={setValue}
          dropdown={dropdown}
          setDropdown={setDropdown}
          placeHolder="Search"
          handleClick={handleDownload}
        />

        <Box sx={{ overflowX: "auto" }}>

          <PaginationTable
            data={tableRow ? tableRow : []}
            columns={
              ColumnSettlementRollingModule ? ColumnSettlementRollingModule : []
            }
            emptyPlaceHolder={
              rollingRes?._metadata?.totalcount == 0
                ? "You currently do not have any data"
                : "Loading..."
            }
            value={value}
            total={rollingRes?._metadata.totalcount}
            totalPage={rollingRes?._metadata.pagecount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            nextPage={nextPage}
            setNextPage={setNextPage}
            previousPage={previousPage}
            setPreviousPage={setPreviousPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            clickAction={true}
            setContentAction={setContentAction}
          />
        </Box>

      </Box>
    </div>
  );
};

export default RollingReserve;

import styles from "./Settlement.module.scss";
import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch, useSelector } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Menu, MenuItem } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import SingleSettlementModal from "./SingleSettlementModal";
import { Checkbox } from "@material-ui/core";
import BulkSettlement from "./BulkSettlement";

interface data {
  open: boolean;
}

interface dataTypes {
  id: string;
  amount: string;
  narration: string;
  number: number;
  initiated_by: string;
  reference: string;
  code: string;
}

const SettlementPendingApproval = () => {
  const [value, setValue] = React.useState(0);
  const [settlementLogged, setSettlementLogged] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isSingleModalOpen, setIsSingleModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<dataTypes[]>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeChecked, setActiveChecked] = useState<boolean | undefined>(
    false
  );
  const [dataValue, setDataValue] = useState<number | string>(0);
  const [selected, setSelected] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<{ id: string; type: string }>({
    id: "",
    type: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  const [gotopage, setGotopage] = useState<boolean>(false);

  const show = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const HandleAllChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setActiveChecked(true);
      setSelected([]);
    } else {
      setActiveChecked(false);
      setSelected([]);
    }
  };

  useEffect(() => {
    if (gotopage) history.push("/settlement");
  }, [gotopage]);

  const checkChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedId({ id: value, type: "add" });
    } else {
      setSelectedId({ id: value, type: "remove" });
    }
  };

  useEffect(() => {
    const { id, type } = selectedId;
    if (type === "add") {
      if (!selected.includes(id)) {
        setSelected((prev: any) => [...prev, id]);
      }
    } else {
      const elems = selected?.filter((elem: any) => elem !== id);
      setSelected(elems);
    }
  }, [selectedId]);

  const openSingleModal = () => {
    setIsSingleModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <SingleSettlementModal />
          </div>
        ),
      })
    );
  };

  const openBulkModal = () => {
    setIsBulkModalOpen(true);
    handleMenuClose();

    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <BulkSettlement title="Bulk Settlement" setGotopage={setGotopage} />
          </div>
        ),
      })
    );
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const { access_token } = useSelector((state) => state?.authPayReducer?.auth);

  useEffect(() => {
    axios
			.get<dataTypes[]>(`/axiosCall/settlement_pending.json`, { baseURL: '' })
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
      | "actions"
      | "amount"
      | "narration"
      | "number"
      | "initiated_by"
      | "reference"
      | "code";
    label: any;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }

  const columns: Column[] = [
    {
      id: "actions",
      label: <Checkbox onChange={HandleAllChecked} />,
      minWidth: 100,
    },
    { id: "amount", label: "Amount Due", minWidth: 100 },
    { id: "narration", label: "Narration", minWidth: 100 },
    { id: "number", label: "Account Number", minWidth: 100 },
    { id: "initiated_by", label: "Initiated by", minWidth: 100 },
    { id: "reference", label: "Reference", minWidth: 100 },
    { id: "code", label: "Bank Code", minWidth: 100 }
  ];
  const SettlementsRowTab = useCallback(
    (
      id: number | string,
      amount: string,
      narration: string,
      number: string,
      initiated_by: string | number,
      reference: string,
      code: string,
      activeChecked: boolean | undefined
    ) => ({
      id: id,
      actions: (
        <>
          {!activeChecked && (
            <Checkbox
              value={id}
              key={Math.random()}
              onChange={checkChangeHandler}
            />
          )}
          {activeChecked && <Checkbox checked={true} />}
        </>
      ),
      amount: amount,
      narration: narration,
      number: number,
      initiated_by: initiated_by,
      reference: reference,
      code: code,
    }),
    []
  );

  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes.map((each: any) =>
          newRowOptions.push(
            SettlementsRowTab(
              each.id,
              each.amount,
              each.narration,
              each.number,
              each.initiated_by,
              each.reference,
              each.code,
              activeChecked
            )
          )
        );
    setRows(newRowOptions);
  }, [apiRes, SettlementsRowTab, activeChecked]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar name="" />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
       
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderLeft}>
              <p className={styles.tableTitle}>
                {apiRes?.length} settlement due fees
              </p>
            </div>
            <div className={styles.tableHeaderRight}>
              <div>
                <button className={styles.button1}>
                  <p className={styles.buttonSpan}>
                    Download
                    <span className={styles.mlhalf}>
                      <CloudDownloadIcon style={{ fontSize: 15 }} />
                    </span>
                  </p>
                </button>

                <button
                  className={styles.buttonAdd}
                  id="log-refund-button"
                  aria-controls={open ? "refund-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleMenuClick}
                >
                  Log settlement
                </button>
                <Menu
                  id="refund-menu"
                  anchorEl={anchorEl}
                  open={show}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "log-refund-button",
                  }}
                  PaperProps={{
                    style: {
                      maxWidth: "150px",
                      padding: ".25rem",
                    },
                  }}
                >
                  <MenuItem onClick={openSingleModal}>
                    <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>
                      Single settlement
                    </p>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={openBulkModal}>
                    <p style={{ padding: ".4rem", fontSize: "0.7rem" }}>
                      Bulk settlement
                    </p>
                  </MenuItem>
                </Menu>
              </div>
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
      </Box>
    </div>
  );
};

export default SettlementPendingApproval;

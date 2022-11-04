import { useState, useEffect, useCallback } from "react";
import ActivityTypes from "../../types/ActivityTypes";
import { useDispatch } from "react-redux";
import OperantTable from "../../components/table/OperantTable";
import { GetFees } from "../../types/UserTableTypes";
import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { openModalAndSetContent } from "../../redux/actions/modal/modalActions";
import AddNewTransferFee from "../../components/feesAndLimitsModals/AddNewTransferFee";

const TransferFees = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [rows, setRows] = useState<ActivityTypes[]>([]);
  const [transferRows, setTransferRows] = useState<ActivityTypes[]>([]);
  const [apiRes, setApiRes] = useState<GetFees>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [totalRows, setTotalRows] = useState<number>(0);

  const [dataValue, setDataValue] = useState<number | string>(0);

  const [open, setOpen] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const changePage = (value: number) => {
    setPageNumber(value);
  };

  const limit = (value: number) => {
    setRowsPerPage(value);
  };

  const handleNewTransferFee = () => {
    dispatch(
      openModalAndSetContent({
        modalStyles: {
          padding: 0,
        },
        modalContent: (
          <div className="modalDiv">
            <AddNewTransferFee />
          </div>
        ),
      })
    );
  };


  useEffect(() => {
    axios
      .get<GetFees>(
        `/admin/provider/fee?perpage=${rowsPerPage}&page=${pageNumber}`
      )
      .then((res) => {
        setApiRes(res.data);
      });
  }, [rowsPerPage, pageNumber]);

  useEffect(() => {
    setTotalRows(Number(apiRes?.providers?.length));
  }, [apiRes]);

  interface Column {
    id: "currency" | "fee";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
  }
  const columns: Column[] = [
    { id: "currency", label: "Transfer currency", minWidth: 100 },
    { id: "fee", label: "Fee", minWidth: 100 },
  ];
  const FeeRowTab = useCallback(
    (id: number | string, currency: string, value: string | number) => ({
      currency: currency,
      fee: value,
    }),
    []
  );
  useEffect(() => {
    const newRowOptions: any[] = [];
    apiRes &&
      apiRes?.providers?.map((each: any) =>
        each?.feesetup?.map((each: any) =>
          newRowOptions.push(
            FeeRowTab(
              each.providercode,
              each.fees[0]?.currency,
              each.fees[0]?.value
            )
          )
        )
      );
    setRows(newRowOptions);
  }, [apiRes, FeeRowTab]);

  return (
    <div>
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
  );
};

export default TransferFees;

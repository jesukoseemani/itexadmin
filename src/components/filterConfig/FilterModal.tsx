import { Backdrop, Button, Divider, Modal } from "@mui/material";
import styles from "./FilterModal.module.scss";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import Mark from "../../assets/images/u-mark.svg";
import Times from "../../assets/images/u_multiply (1).svg";

interface FilterModalProps {
  setEventDate?: React.Dispatch<React.SetStateAction<string>>;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setFromDate?: React.Dispatch<
    React.SetStateAction<dayjs.Dayjs | null | string>
  >;
  setToDate?: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null | string>>;
  eventDate?: string;
  fromDate?: dayjs.Dayjs | null | string;
  toDate?: dayjs.Dayjs | null | string;
  filteredArray?: {
    name: string;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    selective?: any;
    selectHelper?: boolean;
  }[];
  setBearer?: React.Dispatch<React.SetStateAction<boolean>>;
  clearHandler?: () => void;
  oneDate?: boolean;
}

const FilterModal = ({
  setEventDate,
  dropdown,
  setDropdown,
  setFromDate,
  setToDate,
  toDate,
  fromDate,
  eventDate,
  setBearer,
  clearHandler,
  filteredArray,
}: FilterModalProps) => {
  const handleClick = (event: any) => {
    setEventDate?.(event.currentTarget.getAttribute("data-value"));
  };

  const fromDateHandler = (newValue: Dayjs | null) => {
    setFromDate?.(dayjs(newValue).format("YYYY-MM-DD"));
  };

  const toDateHandler = (newValue: Dayjs | null) => {
    setToDate?.(dayjs(newValue).format("YYYY-MM-DD"));
  };

  const applyHandler = () => {
    setDropdown(false);
    setBearer?.(true);
  };

  return (
    <div className={styles.modalwrapper}>
      <div className={styles.modalhead}>
        <h3 className={styles.modalheadh3}>Filters</h3>
      </div>
      <Divider style={{ margin: 0, padding: 0 }} />
      <div
        style={{
          padding: "32px 24px",
        }}
      >
        <div className={styles.dateWrapper}>
          <p className={styles.dateWrapper_p}>Date range</p>
          <div className={styles.dateWrapper_content}>
            <button
              className={styles.dateWrapper_contentbutton}
              style={{
                color: eventDate === "today" ? "#00401C" : "#ADADAB",
                background:
                  eventDate === "today"
                    ? "#ebf5f0"
                    : "rgba(195, 202, 198, 0.3)",
              }}
              onClick={handleClick}
              data-value="today"
            >
              Today
            </button>
            <button
              className={styles.dateWrapper_contentbutton}
              style={{
                color: eventDate === "last7days" ? "#00401C" : "#ADADAB",
                background:
                  eventDate === "last7days"
                    ? "#ebf5f0"
                    : "rgba(195, 202, 198, 0.3)",
              }}
              onClick={handleClick}
              data-value="last7days"
            >
              Last 7 days
            </button>
            <button
              className={styles.dateWrapper_contentbutton}
              style={{
                color: eventDate === "last30days" ? "#00401C" : "#ADADAB",
                background:
                  eventDate === "last30days"
                    ? "#ebf5f0"
                    : "rgba(195, 202, 198, 0.3)",
              }}
              onClick={handleClick}
              data-value="last30days"
            >
              30 days
            </button>
            <button
              className={styles.dateWrapper_contentbutton}
              style={{
                color: eventDate === "oneyear" ? "#00401C" : "#ADADAB",
                background:
                  eventDate === "oneyear"
                    ? "#ebf5f0"
                    : "rgba(195, 202, 198, 0.3)",
              }}
              onClick={handleClick}
              data-value="oneyear"
            >
              1 year
            </button>
          </div>
        </div>

        <div
          style={{
            margin: "27px 0px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
              style={{
                marginLeft: "0px",
              }}
            >
              <MobileDatePicker
                label="Start date"
                inputFormat="MM/DD/YYYY"
                disableFuture
                value={fromDate}
                onChange={fromDateHandler}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </div>

            <div
              style={{
                marginLeft: "16px",
              }}
            >
              <MobileDatePicker
                label="End date"
                inputFormat="MM/DD/YYYY"
                disableFuture
                value={toDate}
                onChange={toDateHandler}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </div>
        <div
          style={{
            margin: "27px 0px",
          }}
        >
          {filteredArray?.map(
            ({ name, value, selective, setValue, selectHelper }, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "27px",
                }}
              >
                {!selective || selective?.length <= 0 ? (
                  <TextField
                    name={name}
                    variant="outlined"
                    margin="normal"
                    type="text"
                    size="small"
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    fullWidth
                  />
                ) : (
                  <div className={styles.select}>
                    <select
                      onChange={(e: any) => setValue(e.target.value)}
                      className={styles.select_text}
                      required
                    >
                      <option key={i} value="">
                        **Select**
                      </option>
                      {selective?.map(
                        (
                          { name, value }: { name: any; value: any },
                          i: any
                        ) => (
                          <option key={i} value={selectHelper ? name : value}>
                            {name}
                          </option>
                        )
                      )}
                    </select>
                    <span className={styles.select_highlight}></span>
                    <span className={styles.select_bar}></span>
                    <label className={styles.select_label}>{name}</label>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <div className={styles.buttonwrapper}>
          <button
            onClick={clearHandler}
            className={styles.Downloadbutton_faint}
          >
            <span className={styles.Downloadbutton_span}>
              <img src={Times} alt="" />
            </span>
            Clear filter
          </button>

          <button onClick={applyHandler} className={styles.Downloadbutton}>
            <span className={styles.Downloadbutton_span}>
              <img src={Mark} alt="" />
            </span>
            Apply filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

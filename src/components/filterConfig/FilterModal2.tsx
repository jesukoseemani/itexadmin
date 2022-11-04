import { Backdrop, Button, Modal } from "@mui/material";
import styles from './FilterModal.module.scss';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { makeStyles } from "@material-ui/styles";
import { Dispatch, SetStateAction } from "react";

const useModalBtnStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem 1.5rem 1.5rem',
    gap: '1.25rem',
    '& .MuiButton-root': {
      fontFamily: `'Roboto', sans-serif`,
      fontWeight: '500',
      fontSize: '.875rem',
      color: 'black',
      background: '#E0E0E0',
      borderRadius: '3px',
      textTransform: 'none',
      padding: '.35rem .85rem'
    },
    '& .MuiButton-root:nth-child(2)': {
      color: 'white',
      background: '#27AE60'
    }
  },
  selected: {
    border: '1px solid #27ae60 !important',
    color: '#27ae60 !important'
  }
})

interface FilterInterface {
  fromdate: string;
  todate: string;
  email: string;
  paymentmethod: string;
  responsecode: string;
}

interface FilterModalProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: FilterInterface;
  setFilters: Dispatch<SetStateAction<FilterInterface>>;
  setFiltersApplied: Dispatch<SetStateAction<boolean>>;
  fixedToDate: string;
  dateInterval: string|undefined;
  setDateInterval: Dispatch<SetStateAction<string|undefined>>;
}

const FilterModal2 = ({ isOpen, handleClose, filters, setFilters, setFiltersApplied, fixedToDate, dateInterval, setDateInterval }: FilterModalProps) => {
  const classes = useModalBtnStyles();

  const { email, responsecode, paymentmethod, fromdate, todate } = filters;

  const applyFilters = () => {
    setFiltersApplied(prev => !prev);
    handleClose();
  }

  const clearFilters = () => {
    setFilters({ email: '', fromdate: '', todate: '', responsecode: '', paymentmethod: '' });
    applyFilters();
  };

  const setFromDate = (val: string) => {
    setFilters(prev => ({ ...prev, fromdate: val }));
    setDateInterval(undefined);
  };

  const setToDate = (val: string) => {
    setFilters(prev => ({ ...prev, todate: val }));
    setDateInterval(undefined);
  };

  return (
    <Modal
      open={isOpen} onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
    <div className={styles.filterModalContainer}>
      <p>Filters</p>
      <hr />
      <div className={styles.modalContent}>
        <div>
          <p>Due date</p>
          <div>
            <p onClick={() => setDateInterval('1')} className={dateInterval === '1' ? classes.selected : undefined}>
              Today
            </p>
            <p onClick={() => setDateInterval('7')} className={dateInterval === '7' ? classes.selected : undefined}>
              Last 7 days
            </p>
            <p onClick={() => setDateInterval('30')} className={dateInterval === '30' ? classes.selected : undefined}>
              30 days
             </p>
            <p onClick={() => setDateInterval('year')} className={dateInterval === 'year' ? classes.selected : undefined}>
              1 year
            </p>
          </div>
        </div>
        <div>
          <p>Custom date range</p>
          <div>
            <input type='date' value={fromdate} onChange={e => setFromDate(e.target.value)} />
            <ArrowRightAltIcon />
            <input type='date' value={todate} onChange={e => setToDate(e.target.value)} />
          </div>
        </div>
        <div>
          <p>Customer email</p>
          <input 
            placeholder='e.g test@mail.com'
            value={email} 
            onChange={e => setFilters(prev => ({...prev, email: e.target.value}))}
          />
        </div>
        <div>
          <p>Status</p>
          <select 
            name='status' id='status'
            value={responsecode} onChange={e => setFilters(prev => ({...prev, responsecode: e.target.value}))}
          >
            <option value="" disabled hidden>Choose status</option>
            <option value='00'>Successful</option>
            <option value='09'>Failed</option>
            {/* <option value='01'>Pending</option> */}
          </select>
        </div>
        <div>
          <p>Payment type</p>
          <select 
            name='status' id='status'
            value={paymentmethod} onChange={e => setFilters(prev => ({...prev, paymentmethod: e.target.value}))}
          >
            <option value="" disabled hidden>Select payment type</option>
            <option value='card'>Card</option>
            <option value='ussd'>USSD</option>
          </select>
        </div>
      </div>
      <hr />
      <div className={classes.root}>
        <Button onClick={clearFilters}>Clear filter</Button>
        <Button onClick={applyFilters}>Apply filter</Button>
      </div>
    </div>
  </Modal>
  )
}

export default FilterModal2
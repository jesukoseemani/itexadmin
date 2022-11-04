import { Backdrop, Box, Button, Fade, IconButton, Modal } from '@mui/material';
import { makeStyles } from "@material-ui/styles";
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLoader, openLoader } from "../../redux/actions/loader/loaderActions";
import axios from "axios";
import { openToastAndSetContent } from "../../redux/actions/toast/toastActions";
interface SingleRefundModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setRefundLogged: Dispatch<SetStateAction<boolean>>;
}

const SingleRefundModal = ({ isOpen, handleClose, setRefundLogged }: SingleRefundModalProps) => {
  const useModalStyles = makeStyles({
    root: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '100%',
      backgroundColor: 'white',
      boxShadow: '-4px 4px 14px rgba(224, 224, 224, 0.69)',
      borderRadius: '6px',
      padding: '1rem 0 2rem',
      '& > div:nth-child(1)': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0rem 2rem',
        '& .MuiIconButton-root': {
          padding: '6px'
        },
      },
      '& hr': {
        background: '#E0E0E0'
      },
      '& > div:nth-child(3)': {
        display: 'grid',
        gridGap: '1rem',
        padding: '0rem 2rem',
      },
      '& > div:nth-child(4)': {
        padding: '0rem 2rem',
        marginTop: '1.5rem'
      }
    },
    formBox: {
      display: 'grid',
      '& label': {
        color: '#333',
        fontWeight: '400',
        fontSize: '.875rem'
      },
      '& input, & textarea': {
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginTop: '.2rem',
        padding: '.75rem',
        fontSize: '.875rem',
        resize: 'none',
        '&::placeholder': {
          color: '#B9B9B9'
        }
      }
    },
    formBtn: {
      color: 'white',
      fontWeight: 700,
      fontSize: '1rem',
      backgroundColor: '#27AE60',
      padding: '.5rem',
      borderRadius: '.25rem',
      textTransform: 'none',
      '&:hover': {
        opacity: '.75',
        backgroundColor: '#27AE60'
      },
      '&:disabled': {
        opacity: '.75'
      }
    }
  });

  const classes = useModalStyles();
  const dispatch = useDispatch();

  const [amt, setAmt] = useState<number | undefined>(undefined);
  const [ref, setRef] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const postRefund = async() => {
    dispatch(openLoader());
    setLoading(true);
    try {
      const res = await axios({
        method: 'POST',
        url: '/transaction/refund',
        data: {
          transaction: {
            merchantreference: ref  
            // merchantreference: "tx-YvD4Yr2mebQdn2pvsClRJGFiJ"
          },
          order: {
            amount: `${amt}`,
            description: desc,
            currency: "NGN" 
          }
        }
      })
      dispatch(
        openToastAndSetContent({
          toastContent: "Refund logged",
          toastStyles: {
            backgroundColor: "green",
          },
        })
      );
      handleClose();
      dispatch(closeLoader());
      setRefundLogged(prev => !prev)
      setLoading(false);
      setAmt(undefined);
      setRef('');
      setDesc('');
    } catch (err) {
      console.log(err);
      dispatch(closeLoader());
      setLoading(false);
      dispatch(
        openToastAndSetContent({
          toastContent: "Failed to log refund",
          toastStyles: {
            backgroundColor: "red"
          },
        })
      );
    }
  }

  return (
    <Modal
      open={isOpen} onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box className={classes.root}>
          <div>
            <p>Log a refund</p>
            <IconButton aria-label='close single refund modal' onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <hr />
          <div>
            <div className={classes.formBox}>
              <label htmlFor='amount'>Amount</label>
              <input 
                placeholder='100.00' value={amt} type='number'
                onChange={(e) => setAmt(Number(e.target.value))}
              />
            </div>
            <div className={classes.formBox}>
              <label htmlFor='amount'>Transaction reference</label>
              <input placeholder='12345678' value={ref} onChange={(e) => setRef(e.target.value)} />
            </div>
            <div className={classes.formBox}>
              <label htmlFor='amount'>Refund destination</label>
              <input value='Payment source - 5 to 15 days' disabled />
            </div>
            <div className={classes.formBox}>
              <label htmlFor='amount'>Reason for refund</label>
              <textarea placeholder='Items out of stock' rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <div>
            <Button 
              fullWidth className={classes.formBtn}
              disabled={!amt || !desc || !ref || loading}
              onClick={postRefund}
            >
              Continue
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default SingleRefundModal
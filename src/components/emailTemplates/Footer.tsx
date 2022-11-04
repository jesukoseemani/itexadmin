import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Divider } from "@material-ui/core";
import styles from "./EmailTemplates.module.scss";
import FooterLogo from "../../assets/images/FooterLogo.svg";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.textdiv}>
        <div className={styles.imgDiv}>
          <div className={styles.img}>
            <TwitterIcon />
          </div>
          <div className={styles.img}>
            <FacebookIcon />
          </div>
          <div className={styles.img}>
            <InstagramIcon />
          </div>
        </div>
        <Divider />
        <div className={styles.address}>
          1725 Slough Avenue #200, Scranton, PA, 18540
        </div>
        <div className={styles.text}>
          You are receiving this message because you signed up on ITEXPay. If
          you would like to stop receiving these emails, you can opt out of
          receiving future emails by clicking{" "}
          <span className={styles.unsubscribe}> unsubscribe.</span> For more
          information about how we process data, please see our Privacy Policy.
        </div>
        <div className={styles.footerLogo}>
          <img src={FooterLogo} alt='Logo' />
        </div>
      </div>
    </div>
  );
};

export default Footer;

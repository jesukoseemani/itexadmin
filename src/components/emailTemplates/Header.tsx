import React from "react";
import styles from "./EmailTemplates.module.scss";
import Logo from "../../assets/images/NavLogo.svg";
import { Divider } from "@material-ui/core";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
        <Divider />
      </div>
    </div>
  );
};

export default Header;

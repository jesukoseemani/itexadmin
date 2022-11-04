import React, { useState, useEffect } from "react";
import SearchIcon from "../../assets/images/search.svg";
import styles from "./Navbar.module.scss";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from '@material-ui/core/TextField';
import NotificationMenu from "../NotificationMenu/NotificationMenu";
import ProfileButton from "../profilebutton/ProfileButton";
import Input from "../../components/apaceinput/Input";
import { Box, InputAdornment } from "@mui/material";
import { Divider } from "@mui/material";

type NavProps = {
  name: string;
};

const option = [
  {
    id: 1,
    title: "Wallet Balance",
  },
];

const options = ["", "", "Search", "Profile"];
const ITEM_HEIGHT = 48;

const NavBar = ({ name }: NavProps) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 900);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 900);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = useState();

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {isDesktop ? (
        <div className={styles.navbarContent}>
          <Box sx={{ "& > :not(style)": { width: "500px" } }}>
            <TextField
              style={{ marginTop: "0rem", padding: "0.4rem", display: 'none' }}
              id="input-with-icon-textfield"
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} alt="search-icon" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
              variant="outlined"
              margin="normal"
              size="small"
            />

            {/* <textarea
              style={{
                height: "24px",
                resize: "none",
                margin: "12px",
                padding: "5px",
                color: "#B9B9B9",
                border: "1px solid #DDDDDD",
                borderRadius: "4px",
                fontSize: "12px",
                alignItems: "center",
              }}
            >
              Search
            </textarea> */}
          </Box>
          {/* <div className={styles.name}>{name}</div> */}

          <div className={styles.walletInfo}>
            <div>
              <NotificationMenu />
            </div>

            <ProfileButton />
          </div>
        </div>
      ) : (
        <div className={styles.navbarContent}>
          <Box sx={{ "& > :not(style)": { width: "250px" } }}>
            <TextField
              style={{ marginTop: "0rem", padding: "0.4rem", display: 'none' }}
              id="input-with-icon-textfield"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={SearchIcon} alt="search-icon" />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
              variant="outlined"
              margin="normal"
              size="small"
            />
          </Box>
          <div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}
            >
              {/* {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))} */}
              {/* <MenuItem onClick={handleClose}> */}
              <MenuItem onClick={handleClose} className={styles.menuItems}>
                {/* <div className={styles.walletMenu}>Wallet Balance:</div>
								<div className={styles.walletMenu}>N200000</div> */}
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                style={{
                  border: "1px solid #002841",
                  backgroundColor: " #EBEBEB",
                  borderRadius: "4px",
                }}
              >
                <img src={SearchIcon} alt="" />
                <div className={styles.walleticons}>
                  <Input
                    style={{
                      background: "#EBEBEB",
                      borderRadius: "8px",
                      borderStyle: "none",
                      color: "#002841",
                      padding: "8px",
                    }}
                    name="Search"
                    value={search}
                    onChange={(e: any) => setSearch(e.target.value)}
                  />
                </div>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NotificationMenu />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ProfileButton />
              </MenuItem>

              {/* </MenuItem> */}
            </Menu>
          </div>
        </div>
      )}
      <Divider />
    </div>
  );
};

export default NavBar;

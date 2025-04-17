import React from "react";
import logoimg from "../../asserts/Logo.svg";
import MenuButton from "../../asserts/MenuButton.svg";
import notification from "../../asserts/notification.svg";
import Profile from "../../asserts/Profile.svg";
import "../Navbar/NavbarBanner.css";
import { Box, Grid, IconButton, styled } from "@mui/material";

import icon1 from "../../asserts/icon1.svg";
import icon2 from "../../asserts/icon2.svg";
import icon3 from "../../asserts/icon11.svg";
import icon4 from "../../asserts/icon4.svg";
import icon5 from "../../asserts/icon5.svg";
import icon6 from "../../asserts/icon6.svg";
import icon7 from "../../asserts/icon7.svg";
import icon8 from "../../asserts/icon8.svg";
import icon9 from "../../asserts/icon9.svg";

import AddStation from "../AddStation/AddStation";

const ActiveIconBox = styled(Box)(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(0, 167, 157, 0.2) 0%, rgba(110, 194, 130, 0.2) 100%)",

  padding: 8,
  borderRadius: 12,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
}));
const AnotherPages = () => {
  const icons = [
    icon1,
    icon2,
    icon3, 
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
    icon9,
    icon1,
    icon2,
  
  ];

  const activeIndex = 2; // third icon is active

  return (
    <>
      <Grid
        className="contentBox"
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={MenuButton} alt="logo" height={80} width={100} />

        <img
          src={logoimg}
          alt="logo"
          // height={40}
          // width={50}
          style={{ borderRadius: "10px" }}
        />

        <Grid
          style={{
            display: "flex",
            alignItems: "center",
          }}
          spacing={5}
        >
          <Grid style={{ marginRight: "40px" }}>
            <img src={notification} alt="logo" />
          </Grid>
          <img src={Profile} alt="logo" />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Grid item style={{width:"6%"}}>
          <Box
            sx={{
              width: 72,
              height: "100vh",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
              gap: 2,
            }}
          >
            {/* Icons List */}
            {icons.map((icon, index) => (
              <Box key={index}>
                {index === activeIndex ? (
                  <ActiveIconBox>
                    <img src={icon} alt={`icon-${index}`} width={42} />
                  </ActiveIconBox>
                ) : (
                  <IconButton>
                    <img src={icon} alt={`icon-${index}`} width={42} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item style={{width:"94%"}}>
          <AddStation/>
          
        
        </Grid>
      </Grid>
    </>
  );
};

export default AnotherPages;

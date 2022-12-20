import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import Logo from "../../../assets/Images/Logo.svg";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Header = (props: any) => {
  const { headerData} = props;
  console.log(headerData,'headerData')
  return (
    <>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Item>
                <img src={Logo} alt="icon" />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                <h1
                  style={{
                    color: "#014D76",
                    fontWeight: "400",
                    opacity: "0.9",
                  }}
                >
                  Mid-Year Performance Appraisal
                </h1>
              </Item>
            </Grid>
            <Grid item xs>
              <Item>
                <p>{headerData?.data.employee_code} </p>
                <p
                  style={{
                    color: "#014D76",
                  }}
                >
                  Appraisal period: ********
                </p>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ backgroundColor: "#f2f9fa" }}>
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <Item sx={{ backgroundColor: "#f2f9fa" }}>
                <AccountCircle
                  style={{ verticalAlign: "middle", height: "92px" }}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{ backgroundColor: "#f2f9fa", textAlign: "left" }}>
                <p>{headerData?.data.legal_full_name}</p>
                <p>
                  {headerData?.data.section} * {headerData?.data.position_long_description}
                </p>
              </Item>
            </Grid>
            <Grid item xs={5}>
              <Item sx={{ backgroundColor: "#f2f9fa", textAlign: "right" }}>
                <h2>Final Rating</h2>
              </Item>
            </Grid>
            <Grid item xs={2}>
              <Item sx={{ backgroundColor: "#f2f9fa" }}>
                <div style={{ borderLeft: "3px solid #e4ebef" }}>
                  <h2>{headerData?.data.normalizer.normalizer_rating}</h2>
                  <p>Exceeding</p>
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </>
    </>
  );
};

export default Header;

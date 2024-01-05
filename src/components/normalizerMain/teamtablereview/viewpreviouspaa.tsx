import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Cancel from "@mui/icons-material/Cancel";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";

import { Scrollbar } from "react-scrollbars-custom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Rightarow from "../Reviewericons/Rightarow.svg";
import { styled } from "@mui/system";
import Teamreview from "./teamreview";
import Teamreviewcopy2 from "../../homepage/MyTeamDashboardComponents/MyTeamTable/Normalizer/TeamTableUINormalizer";

const Heading = styled("div")({
  fontSize: "16px",
  color: "#3e8cb5",
  fontFamily: "Arial",
  // paddingTop: "25px",
  // marginLeft: "20px",
});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ViewPreviouspaa(props: any) {
  return (
    <>
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          backgroundColor: "#fff",
          marginTop: "50px",
          marginLeft:"25px",
          marginRight:"25px",
          padding:"25px"
        }}
      >
        <Grid container spacing={2} style={{ paddingTop: "15px" }}>
          <Grid item xs={2.5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              paddingBottom="10px"
            >
              <Link to={"/normalizer"}>
                <Heading>
                  <u> Overall Dashboard</u>
                  <label style={{paddingLeft:"10px"}}>
                    <img src={Rightarow} alt="" />
                  </label>
                </Heading>
              </Link>
              <Typography
                sx={{
                  color: "#3e8cb5",
                  fontSize: "16px",
                  fontFamily: "Arial",
                  // paddingLeft: "50px",
                }}
              >
                Previous PA
              </Typography>
            </Stack>
            <Paper
            elevation={3}
              sx={{
                // width: 230,
                height: "calc(100vh - 220px)",
                // boxShadow: "0px 0px 4px 2px #8080802e",
              }}
            >
              <Stack direction="column" padding="15px" spacing={3}>
                <Typography
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial",
                    color: "#333333",
                  }}
                >
                  Select Calendar
                </Typography>

                <FormControl
                  // sx={{
                  //   width: "calc(100vh - 380px)",
                  //   marginBottom: "10px",
                  //   maxHeight: "110px",
                  // }}
                  sx={{ minWidth: 180 }}
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select Year
                  </InputLabel>

                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        // color: "rgb(62 140 181 / 28%)",
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    label=" Select Year"
                    size="medium"
                  />
                </FormControl>

                <FormControl
                  // sx={{
                  //   width: "calc(100vh - 380px)",
                  //   marginBottom: "10px",
                  //   maxHeight: "110px",
                  // }}
                  sx={{ minWidth: 180 }}
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Select Team
                  </InputLabel>

                  <Select
                    sx={{
                      "& .MuiInputBase-input": {
                        // color: "rgb(62 140 181 / 28%)",
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    label=" Select Team"
                    size="medium"
                  />
                </FormControl>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                  }}
                  variant="outlined"
                >
                  Apply
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid  style={{paddingTop:"55px"}}item xs={9.5}>
            <Teamreviewcopy2/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

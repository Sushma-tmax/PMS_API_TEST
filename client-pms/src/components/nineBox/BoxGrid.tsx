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
  Stack,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PAMaster from "../UI/PAMaster";
import { AlertDialog } from "..";
import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import {
  BOX_GRID,
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetNineboxQuery } from "../../service/ninebox/ninebox";

import { styled } from "@mui/system";
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
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
        <Box >
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

export default function BoxGrid(props: any) {
  const [value, setValue] = React.useState<any>(0);
  const location: any = useLocation();
  const fromBoxEdit = location.state?.name;
  const setState = location.state?.from;
  // const {from,name} = location.state;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data } = useGetNineboxQuery("");

  const [potentialDefinitionHigh, setPotentialDefinitionHigh] = useState("");
  const [potentialDefinitionModerate, setPotentialDefinitionModerate] =
    useState("");
  const [potentialDefinitionLow, setPotentialDefinitionLow] = useState("");

  const [performanceDefinitionHigh, setPerformanceDefinitionHigh] =
    useState("");
  const [performanceDefinitionMedium, setPerformanceDefinitionMedium] =
    useState("");
  const [performanceDefinitionLow, setPerformanceDefinitionLow] = useState("");
  const [performanceDefinitionHighRange, setPerformanceDefinitionHighRange] = useState("");
  const [performanceDefinitionMediumRange, setPerformanceDefinitionMediumRange] = useState("");
  const [performanceDefinitionLowRange, setPerformanceDefinitionLowRange] = useState("");

  const [performanceDefinitionHighFrom, setPerformanceDefinitionHighFrom] = useState("");
  const [performanceDefinitionMediumFrom, setPerformanceDefinitionMediumFrom] = useState("");
  const [performanceDefinitionLowFrom, setPerformanceDefinitionLowFrom] = useState("");

  const [performanceDefinitionHighTo, setPerformanceDefinitionHighTo] = useState("");
  const [performanceDefinitionMediumTo, setPerformanceDefinitionMediumTo] = useState("");
  const [performanceDefinitionLowTo, setPerformanceDefinitionLowTo] = useState("");

  useEffect(() => {
    if (data) {
      setPotentialDefinitionHigh(data.data[0].potential_definitions.high);
      setPotentialDefinitionModerate(
        data.data[0].potential_definitions.moderate
      );
      setPotentialDefinitionLow(data.data[0].potential_definitions.low);

      setPerformanceDefinitionHigh(data.data[0].performance_definitions.high);
      setPerformanceDefinitionMedium(
        data.data[0].performance_definitions.medium
      );
      setPerformanceDefinitionLow(data.data[0].performance_definitions.low);
      setPerformanceDefinitionHighRange(data.data[0].performance_definitions.high_range);
      setPerformanceDefinitionMediumRange(data.data[0].performance_definitions.medium_range);      
      setPerformanceDefinitionLowRange(data.data[0].performance_definitions.low_range);

      setPerformanceDefinitionHighFrom(data.data[0].performance_definitions.high_from);
      setPerformanceDefinitionMediumFrom(data.data[0].performance_definitions.medium_from);
      setPerformanceDefinitionLowFrom(data.data[0].performance_definitions.low_from);

      setPerformanceDefinitionHighTo(data.data[0].performance_definitions.high_to);
      setPerformanceDefinitionMediumTo(data.data[0].performance_definitions.medium_to);
      setPerformanceDefinitionLowTo(data.data[0].performance_definitions.low_to);
    }
  }, [data]);

  useEffect(() => {
    if (fromBoxEdit == 0) {
      setValue(0)
    } else if (fromBoxEdit == 1) {
      setValue(1)
    } else if (fromBoxEdit == 2) {
      setValue(2)
    }
  }, [fromBoxEdit])

  return (
    <>
      <PAMaster name={"9 Box Grid"} />
      <Container
        sx={{
          maxWidth: "95% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          padding: "20px",
          //boxShadow:'2px 4px 6px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ borderBottom: 1, borderColor: "divider", left: 20 }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                style={{
                  textTransform: "capitalize",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                label=" Potential Definitions"
                {...a11yProps(0)}
              />
              <Tab
                style={{
                  textTransform: "capitalize",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                label="Performance Definitions"
                {...a11yProps(1)}
              />
              <Tab
                style={{
                  textTransform: "capitalize",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontFamily: "Arial",
                  fontWeight: "600",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                }}
                label="9 Box Definitions"
                {...a11yProps(1)}
              />
            </Tabs>

            <div>
              <Link
                to={`${BOX_GRID}/${data?.data[0]?._id}`} state={{ value1: { value } }}
                style={{ float: "right" }}
              >
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    height:"35px",
                    width:"70px"
                  }}
                  variant="outlined"
                >
                  Edit
                </Button>
              </Link>
            </div>
          </Stack>
        </Box>
        <TabPanel value={value} index={0}>
          <TableContainer sx={{ width: "100%", paddingTop: "20px" }}>
            <Scroll>
            <Scrollbar style={{ height: "calc(100vh - 335px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "100px",
                      }}
                      align="center"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "100px",
                      }}
                      align="center"
                    >
                      Description
                    </TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                     sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "#lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      width="10%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                       
                      }}
                      align="left"
                    >
                      High
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                      {potentialDefinitionHigh}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {potentialDefinitionHigh}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    placeholder={potentialDefinitionHigh}
                                                    // onChange={(e) => setPotentialDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                  </TableRow>

                  <TableRow
                     sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "#lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    >
                      Moderate
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                         {potentialDefinitionModerate}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                      
                        <CardContent>
                          {" "}
                          {potentialDefinitionModerate}
                        </CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={potentialDefinitionModerate}
                                                    onChange={(e) => setPotentialDefinitionModerate(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "#lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    >
                      Low
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                      {potentialDefinitionLow}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {potentialDefinitionLow}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={potentialDefinitionLow}
                                                    onChange={(e) => setPotentialDefinitionLow(e.target.value)}

                                                ></TextField> */}
                    </TableCell>
                  </TableRow>
                 
                </TableBody>
              </Table>
            </Scrollbar>
            </Scroll>
          </TableContainer>{" "}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableContainer style={{ paddingTop: "20px" }}>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 335px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    <TableCell
                    
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "100px",
                      }}
                      align="center"
                    >
                      Category
                    </TableCell>
                    <TableCell
                    
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "100px",
                      }}
                      align="center"
                    >
                      Description
                    </TableCell>
                    {/* <TableCell
                 
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "100px",
                      }}
                      align="left"
                    >
                     Performance Range
                    </TableCell> */}
                     <TableCell
                 
                 sx={{
                   fontFamily: "Arial",
                   color: "#3E8CB5",
                   fontSize: "14px",
                   fontWeight: "600",
                   width: "100px",
                 }}
                 align="center"
               >
               From
               </TableCell>
               <TableCell
                 
                 sx={{
                   fontFamily: "Arial",
                   color: "#3E8CB5",
                   fontSize: "14px",
                   fontWeight: "600",
                   width: "100px",
                 }}
                 align="center"
               >
                To
               </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "#lightgrey",
                      },
                    }}
                  >
                    <TableCell
                     width= "10%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    >
                      High
                    </TableCell>
                    <TableCell
                     width= "50%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                      {performanceDefinitionHigh}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {performanceDefinitionHigh}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    
                   {/* <TableCell
                     width= "20%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    > */}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {performanceDefinitionHighRange}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    {/* </TableCell>  */}
                    <TableCell
                     width= "20%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionHighFrom}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {performanceDefinitionHighFrom}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    <TableCell
                     width= "20%"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionHighTo}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        
                        <CardContent> {performanceDefinitionHighTo}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderColor: "#lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    >
                      Moderate
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                        {performanceDefinitionMedium}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>
                          {" "}
                          {performanceDefinitionMedium}
                        </CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionMedium}
                                                    onChange={(e) => setPerformanceDefinitionMedium(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    > */}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionMediumRange}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    {/* </TableCell> */}
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionMediumFrom}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionMediumFrom}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionMediumTo}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionMediumTo}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                  </TableRow>

                  <TableRow
                   sx={{
                    "&:last-child td, &:last-child th": {
                      borderColor: "#lightgrey",
                    },
                  }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    >
                      Low
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordBreak:"break-word"
                      }}
                      align="left"
                    >
                       {performanceDefinitionLow}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent> {performanceDefinitionLow}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    value={performanceDefinitionLow}
                                                // onChange={(e) => setPerformanceDefinitionLow(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    {/* <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="left"
                    > */}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionLowRange}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    {/* </TableCell> */}
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionLowFrom}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionLowFrom}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      }}
                      align="center"
                    >
                      {performanceDefinitionLowTo}
                      {/* <Card
                        variant="outlined"
                        sx={{
                          height: "5.5vw",
                          fontFamily: "Arial",
                          fontSize: "14px",
                          color: "#333333",
                        }}
                      >
                        <CardContent>{performanceDefinitionLowTo}</CardContent>
                      </Card> */}
                      {/* <TextField fullWidth multiline rows={2}
                                                    value={performanceDefinitionHigh}
                                                    onChange={(e) => setPerformanceDefinitionHigh(e.target.value)}
                                                ></TextField> */}
                    </TableCell>
                  </TableRow>
                
                </TableBody>
              </Table>
            </Scrollbar>
            </Scroll>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TableContainer style={{ paddingTop: "20px" }}>
          <Scroll>
            <Scrollbar style={{ width: "100%", height: "calc(100vh - 335px)" }}>
              <Table size="small" aria-label="simple table">
                <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                  <TableRow sx={{ bgcolor: "#eaeced" }}>
                    <TableCell
                    
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        width: "20%",
                      }}
                      align="center"
                    >
                     9 Box Title
                    </TableCell>
                    <TableCell
                    width="55%"
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        // width: "100px",
                      }}
                      align="center"
                    >
                     Description
                    </TableCell>                   
                    <TableCell
                    
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        //  width: "10%",
                      }}
                      align="center"
                    >
                       Potential Level
                     
                    </TableCell>                   
                    <TableCell
                    
                      sx={{
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        // width: "10%",
                      }}
                      align="center"
                    >
                     Performance Level
                    </TableCell>                
                                      
                  </TableRow>
                </TableHead>
                <TableBody>
              
                  {data?.data?.map((i:any, index:any) => 
                    i.box_9_definitions.map((j:any) => {
                      return (
                        <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            borderColor: "#lightgrey",
                          },
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                           {j.title}
                          {/* <Card
                            variant="outlined"
                            sx={{
                              height: "5.5vw",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            <CardContent> {j.title}</CardContent>
                          </Card> */}
                         
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          {j.definition}
                          {/* <Card
                            variant="outlined"
                            sx={{
                              height: "5.5vw",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            <CardContent> {j.definition}</CardContent>
                          </Card> */}
                         
                        </TableCell>
                        
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          {j.potential_level}
                          {/* <Card
                            variant="outlined"
                            sx={{
                              height: "5.5vw",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            <CardContent>{j.potential_level}</CardContent>
                          </Card> */}
                                              
                        </TableCell>     
                        <TableCell
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                          align="left"
                        >
                          {j.performance_level}
                          {/* <Card
                            variant="outlined"
                            sx={{
                              height: "5.5vw",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              color: "#333333",
                            }}
                          >
                            <CardContent> {j.performance_level}</CardContent>
                          </Card> */}
                         
                        </TableCell>             
                      </TableRow>    
                      )
                    })    
                   
                  )}            
                </TableBody>
              </Table>
            </Scrollbar>
            </Scroll>
          </TableContainer>
        </TabPanel>
      </Container>
    </>
  );
}

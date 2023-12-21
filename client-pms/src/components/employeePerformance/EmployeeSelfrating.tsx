import {
    Box,
    Button,
    Container,
    Drawer,
    Grid,
    Stack,
    styled,
    Tab,
    TableContainer,
    Tabs,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import Avatar from "@mui/material/Avatar";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import { Scrollbar } from "react-scrollbars-custom";
  import useMediaQuery from '@mui/material/useMediaQuery';
  import { useTheme } from '@mui/material/styles';
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import DialogContentText from '@mui/material/DialogContentText';
  import DialogTitle from '@mui/material/DialogTitle';
  import Radio from '@mui/material/Radio';
  import RadioGroup from '@mui/material/RadioGroup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import FormControl from '@mui/material/FormControl';
  import FormLabel from '@mui/material/FormLabel';
  import { Link } from "react-router-dom";
  import { EMPLOYEE_DOWNLOAD } from "../../constants/routes/Routing";

  const Item1 = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  const Contain = styled("div")({
    "& .MuiButtonBase-root": {
      color: "#333333",
      backgroundColor: "#FFFFFF",
      height: "34px",
      width: "34px",
      boxShadow: "0px 0px 1px 1px #D4D4D4",
    },
  
    "& .MuiButton-root": {
      border: ` 1px solid `,
      borderColor: "#D4D4D4",
      minWidth: "0px",
      borderRadius: "50px",
      "&:focus": {
        // borderColor: '#3C8BB5',
      },
    },
  });
  const Item2 = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "450px",
    margin: "1rem",
    paddingTop: "1px",
  }));

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
          <Box sx={{ p: 3 }}>
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
  
  
  
  export default function EmployeeSelfrating() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const [open1, setOpen1] = React.useState(false);
    const theme1 = useTheme();
    const fullScreen1 = useMediaQuery(theme.breakpoints.down('md'));
    
  
    const handleClickOpen1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };
    const [open3, setOpen3] = React.useState(false);
    const theme3 = useTheme();
    const fullScreen3 = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen3 = () => {
      setOpen3(true);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = () => {
        setIsDrawerOpen(true);
      };
      const closeDrawer = () => {
        setIsDrawerOpen(true);
      };
      const openDrawerHandler = () => {
        openDrawer();
      };

    return (
        <><Drawer
            anchor={"right"}
            open={isDrawerOpen}

        >
            <p
                style={{
                    paddingLeft: "33px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    backgroundColor: "#ebf2f4",
                    color: "#005477",
                    fontSize: "18px",
                }}
            >
                Employee Rejection
            </p>

            {/*@ts-ignore*/}

            <>
                <Item2 sx={{ width: "fitContent" }}>
                    <p style={{ textAlign: "left", paddingLeft: "10px" }}>Your Rating</p>

                    <>
                        <Stack style={{paddingLeft: "10px"}} direction="row" spacing={1.7}>

                            <Item1
                                sx={{
                                    marginLeft: "2px",
                                    padding: "0px",
                                    justifyContent: "center",
                                }}
                            >
                                <Contain>
                                    <Button

                                        style={{
                                            //@ts-ignore
                                            borderColor: "#3C8BB5",
                                        }}
                                        size="small"
                                    >
                                        3
                                    </Button>


                                    <p style={{ color: "#3C8BB5", fontSize: "10px" }}>
                                        rating
                                    </p>

                                </Contain>

                                {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}
                            </Item1>

                        </Stack>
                        <p style={{ textAlign: "left", paddingLeft: "10px" }}>Appraiser Rating</p>
                    </>
                </Item2>
                <p style={{ paddingLeft: "33px" }}>Comments</p>

                <TextField
                    style={{ paddingLeft: "33px", width: "75%" }} />
                <p style={{ paddingLeft: "33px" }}>Attachments</p>
                <div style={{ paddingLeft: "33px" }}>
                    <Button
                        style={{
                            textTransform: "none",
                            borderColor: "#014D76",
                            fontFamily: "sans-serif",
                            maxWidth: "115px",
                            backgroundColor: "transparent",
                            color: "#9cc4da",
                        }}
                        variant="contained"
                    >
                        {" "}
                        Upload File{" "}
                    </Button>
                </div>
                <Stack
                    alignItems="left"
                    direction="row"
                    paddingLeft="33px"
                    paddingTop="20px"
                >
                    <Button
                        style={{
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "sans-serif",
                            padding: "2px 9px",
              
                            borderColor: "#004C75",
                            color: "#004C75",
                          }}
                          variant="outlined"
                    >
                        {" "}
                        Reject Request
                    </Button>
                    <Button
                        style={{
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "sans-serif",
                            padding: "2px 9px",
              
                            borderColor: "#004C75",
                            color: "#004C75",
                          }}
                          variant="outlined"
                        onClick={closeDrawer}
                    >
                        {" "}
                        Cancel{" "}
                    </Button>
                </Stack>
            </>

        </Drawer>
        <div style={{ backgroundColor: "#F1F1F1", height: "1350px" }}>
                <Container
                    sx={{
                        maxWidth: "96.5% !important",
                        backgroundColor: "#ebf1f5",
                    }}
                ></Container>
                <Container
                    sx={{
                        maxWidth: "96.5% !important",
                        height: "1308px",
                        background: "#fff",
                        marginTop: "20px",
                    }}
                >
                    <Box>
                        <h2
                            style={{
                                color: "#004c75",
                                fontWeight: "400",
                                opacity: "0.9",
                                paddingTop: "30px",
                            }}
                        >
                            Welcome to Performance Appraisal
                        </h2>
                        <Box sx={{ backgroundColor: "#f3fbff" }}>
                            <Grid container spacing={0}>
                                <Grid item xs={0.5}>
                                    <p>
                                        <Avatar>A</Avatar>
                                    </p>
                                </Grid>
                                <Grid item xs={10.5}>
                                    <p>
                                        <Stack direction="column">
                                            <span
                                                style={{
                                                    color: "#004c75",
                                                }}
                                            >
                                                Employee Name
                                            </span>
                                            <span
                                                style={{
                                                    color: "#b8b8b8",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                IT Support Engineer{" "}
                                                <span
                                                    style={{
                                                        borderRadius: "50%",
                                                        marginRight: "10px",
                                                        verticalAlign: "middle",
                                                        width: "4px",
                                                        height: "4px",
                                                        display: "inline-block",
                                                        background: "#b8b8b8",
                                                    }} />{" "}
                                                Corp Support - IT
                                            </span>
                                            <span
                                                style={{
                                                    color: "#b8b8b8",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                2314
                                            </span>
                                        </Stack>
                                    </p>
                                </Grid>
                                <Grid item xs={1}>
                                    <p>
                                        <Link to={EMPLOYEE_DOWNLOAD}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                style={{
                                                    textTransform: "none",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                Download
                                            </Button>
                                        </Link>
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Grid container spacing={0}>
                                <Grid item xs={6}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <p>
                                            <span style={{ fontSize: "18px", color: "#004c75" }}>
                                                Performance Appraisal Period
                                            </span>
                                            <p
                                                style={{
                                                    color: "#a9a4a4",
                                                }}
                                            >
                                                Mid year 2022
                                            </p>
                                        </p>
                                        <p style={{ paddingTop: "10px" }}>Final Rating</p>
                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <p style={{ paddingLeft: "30px" }}>
                                        <Stack direction="column" spacing={1}>
                                            <span
                                                style={{
                                                    paddingLeft: "22px",
                                                    fontSize: "16px",
                                                    color: "#a9a4a4",
                                                }}
                                            >
                                                4.5
                                            </span>
                                            <span style={{ fontSize: "16px", color: "#a9a4a4" }}>
                                                Exceeding
                                            </span>
                                        </Stack>
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                        <p style={{ fontSize: "18px", color: "#004c75" }}>
                            Performance Appraisal Period
                        </p>

                        <p style={{ fontSize: "16px" }}>Employee Comment(s)</p>
                        <p>
                            <TextField fullWidth disabled size="small" />
                        </p>
                        <Box>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab
                                        style={{ textTransform: "capitalize", fontSize: "18px" }}
                                        label="Ratings"
                                        {...a11yProps(0)} />
                                    {/* <Tab
                                        style={{ textTransform: "capitalize", fontSize: "18px" }}
                                        label="Recommendations"
                                        {...a11yProps(1)} /> */}
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <TableContainer sx={{ width: "100%" }}>
                                    <Table size="small" aria-label="simple table">
                                        <TableHead>
                                            <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                    Objective Group
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                    Objective Description
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                   Ratings
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                    Comments
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                    Employee Self Rating
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontFamily: "regular",
                                                        borderColor: "#F7F9FB",
                                                        color: "#004C75",
                                                        fontSize: "14px",
                                                    }}
                                                    align="left"
                                                >
                                                    Employee Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                    rowSpan={3}
                                                >
                                                    Knowledge of the job
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        // fontFamily: "regular"
                                                    }}
                                                    align="left"
                                                >
                                                    Quality of Work
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    <h3>4.5</h3>
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Exceeding
                                                    </p>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    Dummy text for 2 linesDummy text for 2 linesDummy text
                                                    for 2 linesDummy text for 2 linesDummy text for 2 lines
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    
                                                </TableCell>
                                            </TableRow>

                                            <TableRow
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        // fontFamily: "regular"
                                                    }}
                                                    align="left"
                                                >
                                                    Time Management
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    <h3>4.5</h3>
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Exceeding
                                                    </p>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    Dummy text for 2 linesDummy text for 2 linesDummy text
                                                    for 2 linesDummy text for 2 linesDummy text for 2
                                                    linesDummy text for 2 lines
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    4
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    
                                                </TableCell>
                                            </TableRow>

                                            <TableRow
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        // fontFamily: "regular"
                                                    }}
                                                    align="left"
                                                >
                                                    Communication Skills
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    <h3>4.5</h3>
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        Exceeding
                                                    </p>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    Dummy text for 2 linesDummy text for 2 linesDummy text
                                                    for 2 linesDummy text for 2 linesDummy text for 2
                                                    linesDummy text for 2 linesDummy text for 2 lines
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        fontSize: "14px",
                                                        color: "#33333",
                                                        opacity: "80%",
                                                        fontFamily: "regular",
                                                    }}
                                                    align="left"
                                                >
                                                    
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Stack direction="row" spacing={2}
                                    style={{
                                        fontFamily: " Arial, Helvetica, sans-serif",
                                        margin: "50px",
                                        // paddingLeft: "600px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        // paddingTop: "33px",
                                        // marginLeft: "auto",
                                    }}
                                >
                                    <Button
                                        style={{
                                            borderRadius: "4px",
                                            textTransform: "none",
                                            backgroundColor: "#004D77",
                                            fontSize: "15px",
                                            fontFamily: "sans-serif",
                                            padding: "3px 12px",
                                        }}
                                        variant="contained"
                                        onClick={handleClickOpen}
                                    >
                                        Submit
                                    </Button>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"

                                    >
                                        <DialogContent>
                                            <DialogContentText>
                                                Did you review the Appraiser recommendations??
                                            </DialogContentText>
                                        </DialogContent>
                                        <div style={{ alignItems: "center" }}>
                                            <DialogActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Button style={{
                                                    textTransform: "none",
                                                    backgroundColor: "#FFA801",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    padding: "2px 10px",
                                                    marginRight: "10px",
                                                }}
                                                    variant="contained" autoFocus onClick={handleClickOpen1}>
                                                    Yes
                                                </Button>
                                                <Dialog
                                                    fullScreen={fullScreen1}
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    aria-labelledby="responsive-dialog-title"

                                                >
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Are you in acceptance with the Ratings?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <div style={{ alignItems: "center" }}>
                                                        <DialogActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Button style={{
                                                                textTransform: "none",
                                                                backgroundColor: "#FFA801",
                                                                fontSize: "12px",
                                                                fontFamily: "sans-serif",
                                                                padding: "2px 10px",
                                                                marginRight: "10px",
                                                            }}
                                                                variant="contained" autoFocus onClick={handleClose1}>
                                                                Yes
                                                            </Button>

                                                            <Button style={{
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                fontFamily: "sans-serif",
                                                                marginRight: "10px",
                                                                color: "#010101"
                                                            }}
                                                                onClick={handleClose1} autoFocus>
                                                                No
                                                            </Button>
                                                        </DialogActions>
                                                    </div>
                                                </Dialog>

                                                <Button style={{
                                                    textTransform: "none",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    marginRight: "10px",
                                                    color: "#010101"
                                                }}
                                                    onClick={handleClose} autoFocus>
                                                    No
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                    <Button
                                        style={{
                                            borderRadius: "4px",
                                            textTransform: "none",
                                            fontSize: "15px",
                                            fontFamily: "sans-serif",
                                            padding: "2px 9px",

                                            borderColor: "#004C75",
                                            color: "#004C75",
                                        }}
                                        variant="outlined"
                                    >
                                        Save
                                    </Button>

                                </Stack>
                            </TabPanel>
                            {/* <TabPanel value={value} index={1}>
                                <p>Area(s) of Improvement</p>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#F7F9FB" }}>
                                        <TableRow style={{ backgroundColor: "#F7F9FB" }}>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Area(s) of Improvement
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Specific Action(s)
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Employee Comments
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            style={{
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                padding: "5px",
                                                textAlign: "left",
                                                color: "#707070",
                                                opacity: 0.8,
                                                lineHeight: "30px",
                                            }}
                                        >
                                            <TableCell>
                                                Dummy text for 2 lines Dummy text for 2 lines Dummy text
                                                for 2 lines Dummy text for 2 lines Dummy text for 2 lines
                                            </TableCell>
                                            <TableCell>
                                                <p>1. Dummy text for 2 lines</p>
                                                <p>2. Dummy text for 2 lines</p>
                                                <p>3. Dummy text for 2 lines</p>
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "right",
                                    }}
                                >
                                    <Button
                                        size="small"
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "right",
                                            textTransform: "none",
                                            height: "20px",
                                            minWidth: "2px",
                                            textDecoration: "underline",
                                            color: "#93DCFA",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <p>Training Recommendation(s)</p>
                                <Table>
                                    <TableHead style={{ backgroundColor: "#F7F9FB" }}>
                                        <TableRow style={{ backgroundColor: "#F7F9FB" }}>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Training Category
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Training Name
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Justification
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    fontWeight: "400",
                                                    fontSize: "13px",
                                                    color: "#004C75",
                                                }}
                                            >
                                                Employee Comments
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>


                                        <TableRow
                                            style={{
                                                fontWeight: "400",
                                                fontSize: "12px",
                                                padding: "5px",
                                                textAlign: "left",
                                                color: "#707070",
                                                opacity: 0.8,
                                                lineHeight: "30px",
                                            }}
                                        >
                                            <TableCell>Functional</TableCell>
                                            <TableCell>Training on Life Skills</TableCell>
                                            <TableCell>
                                                Dummy text for 2 lines Dummy text for 2 lines Dummy text
                                                for 2 lines Dummy text for 2 lines Dummy text for 2 lines
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "right",
                                        alignItems: "right",
                                    }}
                                >
                                    <Button
                                        size="small"
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "right",
                                            textTransform: "none",
                                            height: "20px",
                                            minWidth: "2px",
                                            textDecoration: "underline",
                                            color: "#93DCFA",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Add
                                    </Button>
                                </div>
                                <Stack direction="row" spacing={2}
                                    style={{
                                        fontFamily: " Arial, Helvetica, sans-serif",
                                        margin: "50px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Button
                                        style={{
                                            borderRadius: "4px",
                                            textTransform: "none",
                                            backgroundColor: "#004D77",
                                            fontSize: "15px",
                                            fontFamily: "sans-serif",
                                            padding: "3px 12px",
                                        }}
                                        variant="contained"
                                        onClick={handleClickOpen}
                                    >
                                        Submit
                                    </Button>
                                    <Dialog
                                        fullScreen={fullScreen}
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="responsive-dialog-title"
                                    >
                                        <DialogContent>
                                            <DialogContentText>
                                                Did you have One-on-One meeting with the Appraiser?
                                            </DialogContentText>
                                        </DialogContent>
                                        <div style={{ alignItems: "center" }}>
                                            <DialogActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Button style={{
                                                    textTransform: "none",
                                                    backgroundColor: "#FFA801",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    padding: "2px 10px",
                                                    marginRight: "10px",
                                                }}
                                                    variant="contained" autoFocus onClick={handleClickOpen1}>
                                                    Yes
                                                </Button>
                                                <Dialog
                                                    fullScreen={fullScreen1}
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    aria-labelledby="responsive-dialog-title"

                                                >
                                                    <DialogContent>
                                                        <DialogContentText>
                                                            Are you in acceptance with the Recommendations?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <div style={{ alignItems: "center" }}>
                                                        <DialogActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Button style={{
                                                                textTransform: "none",
                                                                backgroundColor: "#FFA801",
                                                                fontSize: "12px",
                                                                fontFamily: "sans-serif",
                                                                padding: "2px 10px",
                                                                marginRight: "10px",
                                                            }}
                                                                variant="contained" autoFocus onClick={handleClose1}>
                                                                Yes
                                                            </Button>

                                                            <Button style={{
                                                                textTransform: "none",
                                                                fontSize: "12px",
                                                                fontFamily: "sans-serif",
                                                                marginRight: "10px",
                                                                color: "#010101"
                                                            }}
                                                                onClick={handleClose1} autoFocus>
                                                                No
                                                            </Button>
                                                        </DialogActions>
                                                    </div>
                                                </Dialog>
                                                <Button style={{
                                                    textTransform: "none",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    marginRight: "10px",
                                                    color: "#010101"
                                                }}
                                                    onClick={handleClose} autoFocus>
                                                    No
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                    <Button
                                        style={{
                                            borderRadius: "4px",
                                            textTransform: "none",
                                            fontSize: "15px",
                                            fontFamily: "sans-serif",
                                            padding: "2px 9px",

                                            borderColor: "#004C75",
                                            color: "#004C75",
                                        }}
                                        variant="outlined"
                                    >
                                        Save
                                    </Button>
                                    <Dialog
                                        fullScreen={fullScreen3}
                                        open={open3}
                                        onClose={handleClose3}
                                        aria-labelledby="responsive-dialog-title"

                                    >
                                        <DialogContent>
                                            <DialogContentText>
                                                <FormControl>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="Agree" control={<Radio />} label="We met the Appraiser and agrred on the rating/s to be changed" />
                                                        <FormControlLabel value="Disagree" control={<Radio />} label="We met the Appraiser and disagrred on the rating/s" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </DialogContentText>
                                        </DialogContent>
                                        <div style={{ alignItems: "center" }}>
                                            <DialogActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Button style={{
                                                    textTransform: "none",
                                                    backgroundColor: "#FFA801",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    padding: "2px 10px",
                                                    marginRight: "10px",
                                                }}
                                                    variant="contained" autoFocus onClick={handleClose3}>
                                                    Yes
                                                </Button>

                                                <Button style={{
                                                    textTransform: "none",
                                                    fontSize: "12px",
                                                    fontFamily: "sans-serif",
                                                    marginRight: "10px",
                                                    color: "#010101"
                                                }}
                                                    onClick={handleClose3} autoFocus>
                                                    No
                                                </Button>
                                            </DialogActions>
                                        </div>
                                    </Dialog>
                                </Stack>
                            </TabPanel> */}
                        </Box>
                    </Box>
                </Container>
            </div></>
    );
  }
  
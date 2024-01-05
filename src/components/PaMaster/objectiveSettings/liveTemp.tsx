import * as React from "react";

import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
    Avatar,
    Box,
    Container,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogTitle,
    Grid,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Popover,
    Menu,
    OutlinedInput,
    Stack,
    Tabs,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../../assets/Images/Edit.svg";
import Leftarrow from "../../../assets/Images/Leftarrow.svg";
import white_edit from "../../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
    CREATE_CALENDER,
    CREATE_MAPPING,
    LEVELS_VIEW_ALL_EDIT,
    LINK_CALENDAR,
    MASTER_NAV,
    OBJECTIVE,
    OBJECTIVE_VIEW_BUTTON,
    VIEW_TEMPLATE,
} from "../../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Plus from "../../../assets/Images/Plus.svg";
import Close from "../../../assets/Images/Close.svg";
import {
    useCreateObjectiveDescriptionMutation,
    useCreateObjectiveGroupMutation,
    useCreateObjectiveTypeMutation, useGetObjectiveDescriptionQuery,
    useGetObjectiveGroupQuery, useGetObjectiveTypeQuery
} from "../../../service";



const Levelsviewall = (props: any) => {
    const {

        loading
    } = props;


    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen = () => {
        setOpen1(true);
    };

    const handleClose4 = () => {
        setOpen1(false);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [state, setState] = useState(false);
    const [hide, setHide] = useState(true);

    const addObjectiveHandler = () => {
        console.log("run");
        setState(true);
        setHide(false);
    };

    const navigate = useNavigate();

    const [name, setName] = useState("");


    const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
    const [auth, setAuth] = React.useState(true);

    const [
        objectiveGroupMutation,
        { data, isLoading, isError: objectiveGroupError1 },
    ] = useCreateObjectiveGroupMutation();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    const [auth2, setAuth2] = React.useState(true);



    const [description, setDescription] = React.useState("");


    const [objectiveGroup, setObjectiveGroup] = useState("");
    const [objectiveTypeName, setObjectiveTypeName] = useState("");
    const [objectiveTypeSelect, setObjectiveTypeSelect] = React.useState("");

    const [objectiveTitle, setObjectiveTitle] = useState("");


    const {
        data: ObjectiveGroupData,
        isLoading: ObjectiveGroupLoading,
        error: ObjectiveGroupError,
        refetch,
    } = useGetObjectiveGroupQuery("");


    const {
        data: objectiveDescriptionData,
        refetch: ObjectiveDescriptionRefetch,
        isLoading: objectiveDescriptionLoading,
    } = useGetObjectiveDescriptionQuery("");

    const {
        data: objectiveType,
        isLoading: ObjectiveTypeLoading,
        refetch: ObjectiveTypeRefetch,
    } = useGetObjectiveTypeQuery("");


    const [
        createObjectiveType,
        {
            data: objectiveGroupData,
            isLoading: objectiveGroupLoading,
            isError: errorObjectiveType1,
        },
    ] = useCreateObjectiveTypeMutation();

    const [createObjectiveDescription, { isSuccess, isError }] =
        useCreateObjectiveDescriptionMutation();


    const findObjectiveGroupById = (id:any) => {
        if(ObjectiveGroupData){
            return ObjectiveGroupData.find((objectiveGroup: { _id: any; }) => objectiveGroup._id === id);
        }

    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        setObjectiveGroup(event.target.value as string);
    };


    const handleMenu2 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
    const [auth3, setAuth3] = React.useState(true);

    const handleMenu3 = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl3(event.currentTarget);
    };

    const handleClose3 = () => {
        setAnchorEl3(null);
    };


    function createData(
        number: number,
        ObjectiveGroup: any,
        ObjectiveType: any,

        ObjectiveTitle: any,

        Levels: any
    ) {
        return {
            number,
            ObjectiveGroup,
            ObjectiveType,
            ObjectiveTitle,
            Levels,
        };
    }

    const [activeLevel, setActiveLevel] = React.useState(0);

    const tabValue = ["Level1", "Level2", "Level3", "Level4"];
    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setActiveLevel(newValue);
    };

    function TabPanel(props: any) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
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
// const checkHighestArrayLength = (arrays: any) => {
//     // let highest = 0;
//     // array.forEach((item: any) => {
//     //     if (item.length > highest) {
//     //     highest = item.length;
//     //     }
//     // });
//     // return highest;
//
// }

    const checkHighestArrayLength = (arrays: any) => {
        let highest = 0;
        let longestArray: any = [];
        arrays.forEach((item: any) => {
            if (item.length > highest) {
                highest = item.length;
                longestArray = item;
            }
        });
        return longestArray;
    }
    const rows = [
        createData(
            1,
            "Job Competencies",
            "Job Competencies",
            "Knowledge of the job",

            <>
                <p style={{ margin: "0px" }}>Level : Level Definition</p>
                <List>
                    <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px", '& .MuiTypography-root': { fontSize: "0.875rem" }, '& .MuiList-padding': { paddingTop: "0px", paddingBottom: "0px" }, '& .MuiList-root': { paddingTop: "0px", paddingBottom: "0px" } }}>
            <span
                style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    verticalAlign: "middle",
                    width: "5px",
                    height: "5px",
                    display: "inline-block",
                    background: "#939393",
                }}
            />

                        <ListItemText primary="Levels" />
                    </ListItem>
                </List>
            </>
        ),
        createData(
            2,
            "Job competency",
            "Individual",
            "Skills",

            <>
                <p style={{ margin: "0px" }}>Level : Level Definition</p>
                <List>
                    <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px", '& .MuiTypography-root': { fontSize: "0.875rem" }, '& .MuiList-padding': { paddingTop: "0px", paddingBottom: "0px" }, '& .MuiList-root': { paddingTop: "0px", paddingBottom: "0px" } }}>
            <span
                style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    verticalAlign: "middle",
                    width: "5px",
                    height: "5px",
                    display: "inline-block",
                    background: "#939393",
                }}
            />

                        <ListItemText primary="Levels" />
                    </ListItem>
                </List>
            </>
        ),

        createData(
            3,
            "Job competency",
            "Individual",
            "Skills",

            <>
                <p style={{ margin: "0px" }}>Level : Level Definition</p>
                <List>
                    <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px", '& .MuiTypography-root': { fontSize: "0.875rem" }, '& .MuiList-padding': { paddingTop: "0px", paddingBottom: "0px" }, '& .MuiList-root': { paddingTop: "0px", paddingBottom: "0px" } }}>
            <span
                style={{
                    borderRadius: "50%",
                    marginRight: "10px",
                    verticalAlign: "middle",
                    width: "5px",
                    height: "5px",
                    display: "inline-block",
                    background: "#939393",
                }}
            />

                        <ListItemText primary="Levels" />
                    </ListItem>
                </List>
            </>
        ),
    ];
    console.log(rows, 'row')


    if(ObjectiveTypeLoading && ObjectiveGroupLoading && objectiveDescriptionLoading  ) {
        return <div>Loading...</div>
    }
    return (
        <>
            {" "}
            <div id="Performance Appraisal View all">
                <Box sx={{ flexGrow: 1 }}>
                    <Toolbar>
                        <Typography
                            style={{
                                color: "#004C75",
                                fontSize: "24px",
                                fontFamily: "regular",
                            }}
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
              <span style={{ marginRight: "4px" }}>
                <IconButton>
                  <Link to={MASTER_NAV}>
                    <img src={Leftarrow} alt="button" />
                  </Link>
                </IconButton>
              </span>

                            <label> Performance Appraisal View all</label>
                        </Typography>
                        <Button
                            style={{
                                textTransform: "none",
                                color: "#004C75",
                                fontSize: "16px",
                                marginRight: "30px",
                                fontWeight: "400",
                            }}
                        >
                            <Link to="/"> Master</Link>
                        </Button>
                        <Button
                            style={{
                                textTransform: "none",
                                color: "#004C75",
                                fontSize: "16px",
                                marginRight: "30px",
                                fontWeight: "400",
                            }}
                            id="basic-button"
                            color="inherit"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            Template
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link
                                    style={{ color: "GrayText", fontSize: "14px" }}
                                    to="/template/create-template-1"
                                >
                                    Create Template
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    style={{ color: "GrayText", fontSize: "14px" }}
                                    to={VIEW_TEMPLATE}
                                >
                                    View Template
                                </Link>
                            </MenuItem>
                            {/* <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to="template/edit-template"
                >
                  Edit Template
                </Link>
              </MenuItem> */}
                            <MenuItem onClick={handleClose}>
                                <Link
                                    style={{ color: "GrayText", fontSize: "14px" }}
                                    to={CREATE_MAPPING}
                                >
                                    Create Employee Mapping
                                </Link>
                            </MenuItem>
                            {/* <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={LINK_CALENDAR}
                >
                 Calendar Mapping
                </Link>
              </MenuItem> */}
                        </Menu>
                        <Link to={CREATE_CALENDER}>
                            <Button
                                style={{
                                    textTransform: "none",
                                    color: "#004C75",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                Appraisal Calendar
                            </Button>
                        </Link>
                    </Toolbar>
                </Box>
            </div>
            <Container
                sx={{
                    maxWidth: "96% !important",
                    width: "100%",
                    height: "calc(100vh - 150px)",
                    backgroundColor: "#fff",
                    marginTop: "6px",
                }}
            >

                <Stack direction="row" justifyContent="space-between" alignItems="center">

                    <h3
                        style={{
                            color: "#004C75",
                            fontWeight: "400",
                            opacity: "0.9",
                        }}
                    >
                        Objective Setting Lists
                    </h3>


                    <Link to={`${LEVELS_VIEW_ALL_EDIT}`}>
                        <Button
                            style={{
                                textTransform: "none",
                                backgroundColor: "#014D76",
                                fontSize: "14px",
                                fontFamily: "sans-serif",
                                height: "40px",
                                width: "200px",
                                color: "#ffffff",
                            }}
                            variant="contained"
                        >
                            <img
                                src={white_edit}
                                alt="icon"
                                style={{
                                    color: "#ffffff",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle",
                                    paddingRight: "10px",
                                }}
                            />
                            Edit Objective Master
                        </Button>
                    </Link>

                </Stack>
                <TableContainer sx={{ marginTop: 2, height: "calc(100vh - 300px)" }}>

                    <Table size="small">
                        <TableHead >
                            <TableRow sx={{ bgcolor: "#ebf2f4" }}>
                                <TableCell
                                    sx={{
                                        border: 1,
                                        borderColor: "lightgrey",
                                        color: "#005477",
                                        fontSize: "13px",
                                    }}
                                >
                                    #
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        border: 1,
                                        borderColor: "lightgrey",
                                        color: "#005477",
                                        fontSize: "13px",
                                    }}
                                >
                                    {" "}
                                    <Stack direction="row" justifyContent="space-between">
                                        <p>Objective Group </p>
                                        {auth2 && (
                                            <div>
                                                <IconButton
                                                    size="large"
                                                    aria-label="account of current user"
                                                    aria-controls="menu-appbar"
                                                    aria-haspopup="true"
                                                    onClick={handleMenu2}
                                                    color="inherit"
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                <Popover
                                                    id="menu-appbar"
                                                    anchorEl={anchorEl2}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorEl2)}
                                                    onClose={handleClose}
                                                    sx={{ padding: "5px", "& .MuiPopover-paper": { padding: "10px  " } }}
                                                >
                                                    <Stack direction="column">
                                                        <p style={{ display: "flex", paddingLeft: "15px" }}>
                                                            Enter Objective Group Name
                                                        </p>

                                                        <TextField
                                                            autoComplete="off"
                                                            id="outlined-size-small"
                                                            variant="outlined"
                                                            size="small"
                                                            style={{ width: "calc(100vh - 480px)", paddingLeft: "15px" }}
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}


                                                        />
                                                    </Stack><br />
                                                    <Stack direction="row" sx={{ paddingLeft: "15px" }}>
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
                                                            onClick={() => {
                                                                objectiveGroupMutation({name})
                                                                setName("")
                                                                handleClose2()
                                                            }}
                                                        >
                                                            Save
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
                                                            onClick={handleClose2}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Stack>
                                                </Popover>
                                            </div>
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        border: 1,
                                        borderColor: "lightgrey",
                                        color: "#005477",
                                        fontSize: "13px",
                                    }}
                                >
                                    {" "}
                                    <Stack direction="row" justifyContent="space-between">
                                        <p>Objective Type </p>
                                        {auth && (
                                            <div>
                                                <IconButton
                                                    size="large"
                                                    aria-label="account of current user"
                                                    aria-controls="menu-appbar"
                                                    aria-haspopup="true"
                                                    onClick={handleMenu}
                                                    color="inherit"
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                <Menu
                                                    id="menu-appbar"
                                                    anchorEl={anchorEl1}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorEl1)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={handleClose}>
                                                        <Stack direction="column"><p style={{ display: "flex", paddingLeft: "15px" }}>
                                                            Enter Objective Type Name
                                                        </p>

                                                            <TextField
                                                                autoComplete="off"
                                                                id="outlined-size-small"
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ width: "90%" }}
                                                                value={objectiveTypeName}
                                                                onChange={(e) => setObjectiveTypeName(e.target.value)}

                                                            />
                                                        </Stack></MenuItem>
                                                    <MenuItem >
                                                        <Stack>
                                                            <p style={{ display: "flex", paddingLeft: "15px" }}>
                                                                Select Objective Group
                                                            </p>
                                                            <FormControl
                                                                sx={{
                                                                    width: "90%",
                                                                    marginBottom: "10px",
                                                                    maxHeight: "110px",
                                                                }}
                                                            >
                                                                <InputLabel
                                                                    style={{ marginTop: "-7px", fontSize: "15px" }}
                                                                    id="demo-simple-select-label"
                                                                    variant="outlined"
                                                                >
                                                                    Select
                                                                </InputLabel>

                                                                <Select
                                                                    label="Select"
                                                                    size="small"
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    // style={{maxHeight:"110px"}}
                                                                    value={objectiveGroup}
                                                                    // error={!objectiveGroup && textfeildError}
                                                                    onChange={handleSelectChange}
                                                                    // onScroll={loadMoreItems}
                                                                    // style={{
                                                                    //   maxHeight:"50px",
                                                                    //   overflowY:'scroll'
                                                                    // }}
                                                                    // MenuProps={{autoFocus: false}}
                                                                    MenuProps={{
                                                                        PaperProps: {
                                                                            onScroll: (event: any) => {
                                                                                console.log("we scroll");
                                                                                // console.log(event);
                                                                                // if (event.target.scrollTop === event.target.scrollHeight) {
                                                                                //   setCategoryNamePagination(categoryNamePagination + 1);
                                                                                // }
                                                                            },
                                                                        },
                                                                        style: { maxHeight: 100 },
                                                                        id: "id-menu",
                                                                        anchorOrigin: {
                                                                            vertical: "center",
                                                                            horizontal: "center",
                                                                        },
                                                                        // getContentAnchorEl: null
                                                                    }}
                                                                >
                                                                    {ObjectiveGroupData.data.map(
                                                                        (objectiveGroup: any) => {
                                                                            return [
                                                                                <MenuItem
                                                                                    style={{
                                                                                        fontSize: "13px",
                                                                                        paddingLeft: "15px",
                                                                                    }}
                                                                                    value={objectiveGroup._id}
                                                                                >
                                                                                    {objectiveGroup.name}
                                                                                </MenuItem>,
                                                                            ];
                                                                        }
                                                                    )}
                                                                </Select>
                                                                {/* <p style={helper} >*Required</p> */}
                                                            </FormControl>
                                                        </Stack>
                                                    </MenuItem>
                                                    <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
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
                                                            onClick={() => {
                                                                createObjectiveType({
                                                                    name: objectiveTypeName,
                                                                    objective_group:   objectiveGroup
                                                                })
                                                                handleClose1()
                                                                setObjectiveTypeName("")
                                                                setObjectiveGroup("")
                                                            }}
                                                        >
                                                            Save
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
                                                            onClick={handleClose1}
                                                        >
                                                            Cancel
                                                        </Button>

                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        border: 1,
                                        borderColor: "lightgrey",
                                        color: "#005477",
                                        fontSize: "13px",
                                    }}
                                >
                                    {" "}
                                    <Stack direction="row" justifyContent="space-between">
                                        <p>Objective Title </p>
                                        {auth && (
                                            <div>
                                                <IconButton
                                                    size="large"
                                                    aria-label="account of current user"
                                                    aria-controls="menu-appbar"
                                                    aria-haspopup="true"
                                                    onClick={handleMenu3}
                                                    color="inherit"
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                                <Menu
                                                    id="menu-appbar"
                                                    anchorEl={anchorEl3}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',
                                                    }}
                                                    open={Boolean(anchorEl3)}
                                                    onClose={handleClose3}
                                                >
                                                    <MenuItem >
                                                        <Stack direction="column"><p style={{ display: "flex", paddingLeft: "15px" }}>
                                                            Add Objective Title
                                                        </p>

                                                            <TextField
                                                                autoComplete="off"
                                                                id="outlined-size-small"
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ width: "calc(100vh - 480px)" }}
                                                                value={objectiveTitle}
                                                                onChange={(e) => setObjectiveTitle(e.target.value)}


                                                            />
                                                        </Stack></MenuItem>
                                                    <MenuItem >
                                                        <Stack direction="column"><p style={{ display: "flex", paddingLeft: "15px" }}>
                                                            Add Objective Description
                                                        </p>

                                                            <TextField
                                                                autoComplete="off"
                                                                id="outlined-size-small"
                                                                variant="outlined"
                                                                size="small"
                                                                style={{ width: "calc(100vh - 480px)" }}
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}

                                                            />
                                                        </Stack></MenuItem>
                                                    <MenuItem >
                                                        <Stack>
                                                            <p style={{ display: "flex", paddingLeft: "15px" }}>
                                                                Select Objective Type
                                                            </p>
                                                            <FormControl sx={{ m: 1, width: 200 }}>
                                                                <TextField
                                                                    select
                                                                    label={objectiveType === "" ? "Select" : ""}
                                                                    id="outlined-select-select"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    style={{ marginTop: "25px" }}
                                                                    value={objectiveTypeSelect}
                                                                    // error={!objectiveType && textfeildError}
                                                                    // helperText={
                                                                    //     !objectiveType && textfeildError
                                                                    //         ? "*Objective type required."
                                                                    //         : " "
                                                                    // }
                                                                    // onChange={handleSelectChange}
                                                                    onChange={(e: { target: { value: any } }) => {
                                                                        setObjectiveTypeSelect(e.target.value);
                                                                    }}
                                                                >
                                                                    {objectiveType &&
                                                                        objectiveType.data.map((objectiveTypes: any) => {
                                                                            return [
                                                                                <MenuItem
                                                                                    style={{ fontSize: "14px" }}
                                                                                    value={objectiveTypes._id}
                                                                                >
                                                                                    {objectiveTypes.name}
                                                                                </MenuItem>,
                                                                            ];
                                                                        })}
                                                                </TextField>
                                                            </FormControl>
                                                        </Stack>
                                                    </MenuItem>
                                                    <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
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
                                                            onClick={() => {
                                                                createObjectiveDescription({
                                                                    description: description,
                                                                    objective_type: objectiveTypeSelect,
                                                                    objectiveTitle: objectiveTitle

                                                                })
                                                                handleClose3()
                                                            }}

                                                        >
                                                            Save
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
                                                            onClick={handleClose3}
                                                        >
                                                            Cancel
                                                        </Button>

                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        border: 1,
                                        borderColor: "lightgrey",
                                        color: "#005477",
                                        fontSize: "13px",
                                    }}
                                >
                                    <Stack direction="row" justifyContent="space-between">
                                        <p>Levels </p>

                                        <Button
                                        >
                                            <AddIcon onClick={handleClickOpen} />
                                        </Button>
                                        <Dialog
                                            style={{
                                                marginTop: "110px",
                                                height: "calc(100vh - 50px)",
                                            }}
                                            maxWidth="xl"
                                            open={open1}
                                            onClose={handleClose4}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle
                                                style={{
                                                    fontFamily: "regular",
                                                    backgroundColor: "#EBF1F5",
                                                    color: "#004C75",
                                                    fontSize: "18px",
                                                    padding: "0px 20px",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                Add Levels
                                                <p
                                                    style={{
                                                        display: "flex",
                                                        float: "right",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <img width={18} height={18} src={Closeicon} />
                                                </p>
                                            </DialogTitle>

                                            <DialogContentText
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#004C75",
                                                    fontFamily: "regular",
                                                    width: "920px",
                                                }}
                                            >
                                                <p style={{ paddingLeft: "20px" }}>Objective Title</p>
                                                <TextField
                                                    select
                                                    value="Knowledge of the job"
                                                    sx={{ width: "50%" }}
                                                    id="demo-simple-select-label"
                                                    variant="outlined"
                                                    size="small"
                                                    style={{ paddingLeft: "20px" }}
                                                />
                                            </DialogContentText>
                                            <DialogContentText>
                                                <div>
                                                    <Grid>
                                                        <Grid
                                                            container
                                                            style={{ paddingTop: "20px", paddingLeft: "20px" }}
                                                        >
                                                            <Grid
                                                                style={{
                                                                    // borderRight: "1px solid lightgrey",
                                                                    border: "1px solid lightgrey",
                                                                    // height: "300px",
                                                                    paddingTop: "20px",
                                                                }}
                                                                item
                                                                xs={2}
                                                            >
                                                                <Tabs
                                                                    orientation="vertical"
                                                                    variant="scrollable"
                                                                    value={activeLevel}
                                                                    onChange={handleChangeTabs}
                                                                    TabIndicatorProps={{
                                                                        style: {
                                                                            left: 0,
                                                                            borderColor: "divider",
                                                                        },
                                                                    }}
                                                                >
                                                                </Tabs>
                                                            </Grid>

                                                            <Grid
                                                                style={{
                                                                    border: "1px solid lightgrey",
                                                                    borderLeft: "none",
                                                                }}
                                                                item
                                                                xs={9.8}
                                                            >
                                                                <TabPanel value={activeLevel} index={0}>
                                                                    <div
                                                                        style={{
                                                                            paddingLeft: "30px",
                                                                        }}
                                                                    >
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Level Definition
                                                                        </p>
                                                                        <TextField
                                                                            style={{ width: "90%" }}
                                                                            size="small"
                                                                        />
                                                                    </div>

                                                                    <div
                                                                        style={{
                                                                            paddingLeft: "30px",
                                                                            paddingBottom: "6px",
                                                                        }}
                                                                    >
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Behavioral Objective
                                                                        </p>

                                                                        <TextField
                                                                            placeholder="Enter Behavioral Objective"
                                                                            style={{
                                                                                width: "90%",
                                                                                paddingBottom: "6px",
                                                                            }}
                                                                            size="small"
                                                                            multiline
                                                                        />


                                                                        <Tooltip title="Add">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Plus} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                        <Tooltip title="Delete">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Close} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>




                                                                    </div>
                                                                </TabPanel>

                                                                <TabPanel value={activeLevel} index={1}>
                                                                    <div
                                                                        style={{
                                                                            paddingLeft: "30px",
                                                                            paddingBottom: "10px",
                                                                        }}
                                                                    >
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Level definition
                                                                        </p>
                                                                        <TextField
                                                                            style={{ width: "95%" }}
                                                                            size="small"
                                                                        />
                                                                    </div>

                                                                    <div style={{ paddingLeft: "30px" }}>
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Behaviuoral Objective
                                                                        </p>

                                                                        <TextField
                                                                            placeholder="Enter Behavioral Objective"
                                                                            style={{ width: "94%" }}
                                                                            size="small"
                                                                            multiline

                                                                        />

                                                                        <Tooltip title="Add">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Plus} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                        <Tooltip title="Delete">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Close} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                    </div>
                                                                </TabPanel>

                                                                <TabPanel value={activeLevel} index={2}>
                                                                    <div
                                                                        style={{
                                                                            paddingLeft: "30px",
                                                                            paddingBottom: "10px",
                                                                        }}
                                                                    >
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Level definition
                                                                        </p>
                                                                        <TextField
                                                                            style={{ width: "95%" }}
                                                                            size="small"
                                                                        />
                                                                    </div>

                                                                    <div style={{ paddingLeft: "30px" }}>
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Behavioral Objective
                                                                        </p>


                                                                        <TextField
                                                                            placeholder="Enter Behavioral Objective"
                                                                            style={{ width: "94%" }}
                                                                            size="small"
                                                                            multiline

                                                                        />

                                                                        <Tooltip title="Add">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Plus} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                        <Tooltip title="Delete">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Close} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>


                                                                    </div>
                                                                </TabPanel>

                                                                <TabPanel value={activeLevel} index={3}>
                                                                    Item Four
                                                                    <div
                                                                        style={{
                                                                            paddingLeft: "30px",
                                                                            paddingBottom: "10px",
                                                                        }}
                                                                    >
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Level definition
                                                                        </p>
                                                                        <TextField
                                                                            style={{ width: "95%" }}
                                                                            size="small"

                                                                        />
                                                                    </div>
                                                                    <div style={{ paddingLeft: "30px" }}>
                                                                        <p style={{ color: "#004C75" }}>
                                                                            Behavioral Objective
                                                                        </p>


                                                                        <TextField
                                                                            placeholder="Enter Behavioral Objective"
                                                                            style={{ width: "94%" }}
                                                                            size="small"
                                                                            multiline

                                                                        />

                                                                        <Tooltip title="Add">
                                                                            <IconButton
                                                                            >
                                                                                <img src={Plus} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                        <Tooltip title="Delete">
                                                                            <IconButton

                                                                            >
                                                                                <img src={Close} alt="icon" />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                    </div>
                                                                </TabPanel>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </DialogContentText>
                                            <DialogActions
                                                style={{ display: "flex", justifyContent: "center" }}
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
                                                    onClick={handleClose4}
                                                    autoFocus
                                                >
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {ObjectiveGroupData && objectiveType &&  objectiveDescriptionData && checkHighestArrayLength([ObjectiveGroupData.data,objectiveType.data,objectiveDescriptionData.data]).map((row:any,index:number) => (
                                <TableRow
                                    key={row.number}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 1,
                                            borderColor: "lightgrey",
                                        },
                                    }}
                                >
                                    <TableCell
                                        scope="row"
                                        sx={{ border: 1, borderColor: "lightgrey" }}
                                    >
                                        {row.number}{" "}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ border: 1, borderColor: "lightgrey" }}
                                    >
                                        {ObjectiveGroupData && objectiveType &&   ObjectiveGroupData.data.filter((j:any) => j._id ===  objectiveType.data[index]?.objective_group?._id)[0]?.name }
                                        {ObjectiveGroupData && objectiveType &&   ObjectiveGroupData.data.filter((j:any) => j._id !==  objectiveType.data[index]?.objective_group?._id)[0]?.name }
                                        {/*{ObjectiveGroupData &&  ObjectiveGroupData.data[index]?.name }*/}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ border: 1, borderColor: "lightgrey" }}
                                    >
                                        {objectiveType &&  objectiveType.data[index]?.name }
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ border: 1, borderColor: "lightgrey" }}
                                    >
                                        {objectiveDescriptionData &&  objectiveDescriptionData.data[index]?.objective_title?.objective_title}
                                        {/*{objectiveDescriptionData &&  objectiveDescriptionData.data[index]?.objectiveTitle}*/}
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        sx={{ border: 1, borderColor: "lightgrey" }}
                                    >
                                        {row.Levels}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};


export default Levelsviewall;

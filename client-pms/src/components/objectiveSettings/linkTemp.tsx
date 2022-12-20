import * as React from "react";

import {useEffect, useState} from "react";


import {
    Box,
    Container,
    Paper,

    Grid,

    Menu,

    Toolbar,

    Typography,
    TextField,
    Stack,
} from "@mui/material";
import {Link} from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
    CREATE_CALENDER,
    CREATE_MAPPING,
    ADD_LEVEL,
    LEVELS_VIEW_ALL_EDIT,
    MASTER_NAV,
    OBJECTIVE,
    OBJECTIVE_VIEW_BUTTON,
    VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import {useNavigate} from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";

import Tab from "@mui/material/Tab";
import {useGetCalenderQuery, useGetTemplateQuery,useAddCalendarMutation} from "../../service";

const LinkCalendar = (props: any) => {
    const {loading} = props;


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [state, setState] = useState(false);
    const [template, setTemplate] = useState<any>([]);
    const [year, setYear] = React.useState("");


    const navigate = useNavigate();

    const {data, isLoading} = useGetTemplateQuery('');
    const {data: calenderData} = useGetCalenderQuery('')
    const [addCalendar]= useAddCalendarMutation()

    useEffect(() => {

        setTemplate(data?.templates)
    },[data,isLoading])



    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleOnCheck = (e: any) => {
        const { name, checked } = e.target;

        if (name === "allSelect") {
            const tempUser = template.map((other: any) => {
                return { ...other, isChecked: checked };
            });
            setTemplate(tempUser);
        } else {
            console.log(template, 'isLoading')
            const tempUser = template.map((other: any) => {
                return other._id === name ? { ...other, isChecked: checked } : other;
            });
            setTemplate(tempUser);
            console.log(tempUser, "temp");
        }
    };

    const checkboxIdHandler = (res: any[]) => {
        if (res) {
            return res.map((i: any) => i._id)

        }
    };

    const checkboxHandler = (checkbox: any) => {
        if (checkbox) {
            const res = checkbox.filter((i: any) => {
                return i.isChecked === true;
            });
            return res;
        }
    };



    return (
        <>
            {" "}
            <div id="Calendar Mapping">
                <Box sx={{flexGrow: 1}}>
                    <Toolbar>
                        <Typography
                            style={{
                                color: "#004C75",
                                fontSize: "24px",
                                fontFamily: "regular",
                            }}
                            component="div"
                            sx={{flexGrow: 1}}
                        >
              <span style={{marginRight: "4px"}}>
                <IconButton>
                  <Link to={OBJECTIVE}>
                    <img src={Leftarrow} alt="button"/>
                  </Link>
                </IconButton>
              </span>

                            <label> Calendar Mapping</label>
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
                                    style={{color: "GrayText", fontSize: "14px"}}
                                    to="/template/create-template"
                                >
                                    Create Template
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    style={{color: "GrayText", fontSize: "14px"}}
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
                                    style={{color: "GrayText", fontSize: "14px"}}
                                    to={CREATE_MAPPING}
                                >
                                   Create Employee Mapping
                                </Link>
                            </MenuItem>
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
                    height: "calc(100vh - 180px)",
                    backgroundColor: "#fff",
                    marginTop: "2px",
                }}
            >
                <h2 style={{
                    paddingTop: "30px",
                    fontWeight: "400",

                    color: "#004C75"
                }}>Templates</h2>
                <Grid container spacing={2}>

                    <Grid item xs={2}>
                        <Paper sx={{height: "calc(100vh - 280px)"}}>
                            <div style={{paddingTop: "20px", paddingLeft: "20px"}}>
                                {template?.map((j: any) => {
                                    return <> <input
                                        name={j._id}
                                        checked={j?.isChecked || false}
                                        onChange={handleOnCheck}
                                        type="checkbox"
                                        style={{
                                            height: "17px",
                                            width: "17px",
                                            borderColor: "#D5D5D5",
                                        }} />
                                        <div>
                                            <label>{j.name}</label>
                                        </div> </>
                                })}

                            </div>

                        </Paper>

                    </Grid>
                    <Grid item xs={10}>
                        <Box style={{paddingTop: "20px"}}>
                            <Stack direction="row"
                                   spacing={2}><Button
                                size="small"
                                variant="outlined"
                                style={{
                                    backgroundColor: "#f0f4f7",
                                    borderRadius: "12px",
                                    paddingLeft: "8px",
                                    padding: "5px 20px",
                                    color: "#004C75",
                                    textTransform: "none",

                                }}
                            >
                                Manager
                            </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    style={{
                                        backgroundColor: "#f0f4f7",
                                        borderRadius: "12px",
                                        paddingLeft: "8px",
                                        padding: "5px 20px",
                                        color: "#004C75",
                                        textTransform: "none",

                                    }}
                                >
                                    Developer
                                </Button></Stack></Box>
                        <div>
                            <h3 style={{
                                paddingTop: "30px",
                                fontWeight: "400",

                                color: "#004C75"
                            }}>Link to Calendar</h3>

                            <TextField
                                select
                                sx={{width: "64%"}}
                                label="Select text"
                                id="demo-simple-select-label"
                                variant="outlined"
                                size="small"
                                value={year}

                                onChange={(e: { target: { value: any } }) => {
                                    setYear(e.target.value);
                                    // setShowCalendarError(false)
                                }}
                                // error={!year && textfeildError}
                                // helperText={!year && textfeildError ? "*Name required." : " "}
                            >
                                {calenderData &&
                                    calenderData.data.map((i: any) => {
                                        return (
                                            <MenuItem sx={{height: "16px"}} value={i._id}>
                                                <div>{i.name}</div>
                                            </MenuItem>
                                        );
                                    })}
                            </TextField>
                        </div>
                        <div style={{
                            paddingTop: "30px"
                        }}>
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
                                onClick={() => addCalendar({
                                    template: checkboxIdHandler(checkboxHandler(template)),
                                    calendar: year
                                })}
                            >
                                Save as Draft
                            </Button>
                        </div>

                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

export default LinkCalendar;

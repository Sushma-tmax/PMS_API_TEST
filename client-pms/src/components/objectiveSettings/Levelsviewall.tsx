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
import { Alert, fabClasses, FormHelperText } from "@mui/material";
import * as XLSX from "xlsx";

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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Newexcel from "../../assets/Images/Newexcel.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import AddIcon from "@mui/icons-material/Add";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  LEVELS_VIEW_ALL_EDIT,
  LINK_CALENDAR,
  LINK_CALENDAR_OPEN,
  MASTER_NAV,
  OBJECTIVE,
  OBJECTIVE_VIEW_BUTTON,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import Close from "../../assets/Images/Close.svg";
// import { makeStyles } from '@mui/material/styles';
import { styled } from "@mui/material/styles";
import {
  useCreateObjectiveDescriptionMutation,
  useCreateObjectiveGroupMutation,
  useCreateObjectiveTypeMutation,
  useGetObjectiveDescriptionQuery,
  useGetObjectiveGroupQuery,
  useGetObjectiveTypeQuery,
  useUpdateObjectiveDescriptionMutation,
} from "../../service";
import Tab from "@mui/material/Tab";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import PAMaster from "../UI/PAMaster";

//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
//prompt -------functions

// const useStyles = makeStyles(() => ({
//   formControlLabel: {
//     fontSize: "12px",
//     "& label": { fontSize: "13px", fontFamily: "sans-serif" },
//   },
// }));

const FormControlLabelStyled = styled("div")({
  fontSize: "12px",
  "& label": { fontSize: "13px", fontFamily: "sans-serif" },
});

const Levelsviewall = (props: any) => {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const { loading } = props;

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen1(true);
  };

  const handleClose4 = () => {
    setOpen1(false);
    CancelError();
  };
  // const classes = useStyles();
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

  const navigate = useNavigate();

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [auth, setAuth] = React.useState(true);

  const [level_1, setLevel_1] = useState<any>([{ behavioral_objective: "" }]);
  const [level_3, setLevel_3] = useState<any>([{ behavioral_objective: "" }]);
  const [level_2, setLevel_2] = useState<any>([{ behavioral_objective: "" }]);
  const [level_4, setLevel_4] = useState<any>([{ behavioral_objective: "" }]);

  const [level_1_definition, setLevel_1_definition] = useState<any>("");
  const [level_2_definition, setLevel_2_definition] = useState<any>("");
  const [level_3_definition, setLevel_3_definition] = useState<any>("");
  const [level_4_definition, setLevel_4_definition] = useState<any>("");

  console.log(level_1_definition, "level_1_definition");
  console.log(level_2_definition, "level_2_definition");
  console.log(level_3_definition, "level_3_definition");
  console.log(level_4_definition, "level_4_definition");

  const [
    objectiveGroupMutation,
    {
      data,
      isLoading,
      isError: objectiveGroupError1,
      error: objectiveGroupErrorAll,
    },
  ] = useCreateObjectiveGroupMutation();

  console.log(objectiveGroupErrorAll, "objectiveGroupErrorAll");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [auth2, setAuth2] = React.useState(true);

  const [name, setName] = useState("");

  const [description, setDescription] = React.useState("");

  const [objectiveGroup, setObjectiveGroup] = useState("");
  const [objectiveTypeName, setObjectiveTypeName] = useState("");

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

  const [
    createObjectiveDescription,
    { isSuccess, isError: errorObjectiveTitle1 },
  ] = useCreateObjectiveDescriptionMutation();
  console.log(errorObjectiveTitle1, "titlllllll");
  const [addLevelsToObjectiveDescription] =
    useUpdateObjectiveDescriptionMutation();

  //validation-starts
  const [textfeildError, settextfeildError] = useState(false);
  const [textfeildError1, settextfeildError1] = useState(false);
  const [textfeildError2, settextfeildError2] = useState(false);
  const [textfeildError3, settextfeildError3] = useState(false);
  const [textfeildErrorLevel1, settextfeildErrorLevel1] = useState(false);
  const [objectiveTitleSelect, setObjectiveTitleSelect] = useState("");
  const [objectiveDefinition, setObjectiveDefinition] = useState("");
  const [objectiveTypeSelect, setObjectiveTypeSelect] = useState("");
  const [levelObjectiveTitleSelect, setLevelObjectiveTitleSelect] =
    useState("");
  const [duplicateGroupError1, setDuplicateGroupError1] =
    useState<any>(objectiveGroupError1);
  const [duplicateTypeError1, setDuplicateTypeError1] =
    useState<any>(errorObjectiveType1);
  const [duplicateTitleError1, setDuplicateTitleError1] =
    useState<any>(errorObjectiveTitle1);

  const objectiveGroupHandler = (name: string) => {
    if (name === "") {
      return settextfeildError(true);
    } else if (duplicateGroupError1 === true) {
      settextfeildError(false);
      // setAnchorEl2(true);
    } else {
      const removeSpace = name.trim();
      return (
        settextfeildError(false),
        objectiveGroupMutation({ name }),
        setName(""),
        handleClose2(),
        setnavPrompt(false)
      );
    }
  };

  const objectiveTypeHandler = () => {
    if (objectiveTypeName !== "" && objectiveGroup !== "") {
      return (
        settextfeildError1(false),
        createObjectiveType({
          name: objectiveTypeName.trim(),
          objective_group: objectiveGroup,
        }),
        handleClose1(),
        setObjectiveTypeName(""),
        setObjectiveGroup(""),
        setnavPrompt(false)
      );
    } else {
      return settextfeildError1(true);
    }
  };

  const objectiveTitleHandler = () => {
    if (
      objectiveTitleSelect !== "" &&
      objectiveDefinition !== "" &&
      objectiveTypeSelect !== ""
    ) {
      if (checkboxSelect === true) {
        navigate(`${ADD_LEVEL}`);
      }
      return (
        settextfeildError2(false),
        createObjectiveDescription({
          description: objectiveDefinition,
          objective_type: objectiveTypeSelect,
          objectiveTitle: objectiveTitleSelect.trim(),
          isTitleChecked: checkboxSelect,
        }),
        handleClose3(),
        setObjectiveTitleSelect(""),
        setObjectiveDefinition(""),
        setObjectiveTypeSelect("")
      );
    } else {
      return settextfeildError2(true);
    }
  };

  const levelobjectiveTitleHandler = () => {
    if (levelObjectiveTitleSelect !== "") {
      return (
        settextfeildError3(false),
        settextfeildErrorLevel1(false),
        addLevelsToObjectiveDescription({
          level_1: {
            level_definition: level_1_definition,
            behavioral_objective: getBehavioralObjectiveFromLevel(level_1),
          },
          level_2: {
            level_definition: level_2_definition,
            behavioral_objective: getBehavioralObjectiveFromLevel(level_2),
          },
          level_3: {
            level_definition: level_3_definition,
            behavioral_objective: getBehavioralObjectiveFromLevel(level_3),
          },
          level_4: {
            level_definition: level_4_definition,
            behavioral_objective: getBehavioralObjectiveFromLevel(level_4),
          },
          id: objectiveTitleSelect,
        }),
        handleClose4(),
        setLevelObjectiveTitleSelect(""),
        setnavPrompt(false)
      );
    } else {
      return settextfeildError3(true), settextfeildErrorLevel1(true);
    }
  };

  useEffect(() => {
    if (textfeildError && textfeildError === true) {
      setDuplicateGroupError1(false);
    }
  }, [textfeildError]);

  useEffect(() => {
    if (objectiveGroupError1 === false) {
      setDuplicateGroupError1(false);
    } else if (objectiveGroupError1 === true) {
      setDuplicateGroupError1(true);
      setTimeout(() => {
        setDuplicateGroupError1(false);
      }, 3000);
    }
  }, [objectiveGroupError1]);

  useEffect(() => {
    if (errorObjectiveType1 === false) {
      setDuplicateTypeError1(false);
    } else if (errorObjectiveType1 === true) {
      setDuplicateTypeError1(true);
      setTimeout(() => {
        setDuplicateTypeError1(false);
      }, 3000);
    }
  }, [errorObjectiveType1]);

  useEffect(() => {
    if (errorObjectiveTitle1 === false) {
      setDuplicateTitleError1(false);
    } else if (errorObjectiveTitle1 === true) {
      setDuplicateTitleError1(true);
      setTimeout(() => {
        setDuplicateTitleError1(false);
      }, 3000);
    }
  }, [errorObjectiveTitle1]);

  const CancelError = () => {
    setDuplicateGroupError1(false);
    setDuplicateTypeError1(false);
    setDuplicateTitleError1(false);
    settextfeildError(false);
    settextfeildError1(false);
    settextfeildError2(false);
    settextfeildError3(false);
    settextfeildErrorLevel1(false);
  };
  //const textFieldForPasswordRef = React.useRef(null);
  const buttonForSaveRef = React.useRef(null);

  //validation-ends

  const findObjectiveGroupById = (id: any) => {
    if (ObjectiveGroupData) {
      return ObjectiveGroupData.find(
        (objectiveGroup: { _id: any }) => objectiveGroup._id === id
      );
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setnavPrompt(true);
    setObjectiveGroup(event.target.value as string);
  };

  // const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  // const [auth2, setAuth2] = React.useState(true);

  const handleMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const [filData, setfilData] = React.useState<any>([]);

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

  const getBehavioralObjectiveFromLevel = (level: any) => {
    return level.map((item: any) => item.behavioral_objective);
  };

  const tabValue = ["Level1", "Level2", "Level3", "Level4"];
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveLevel(newValue);
  };

  const handleLevelAdd1 = () => {
    setLevel_1([...level_1, { behavioral_objective: "" }]);
  };

  const handleLevelRemove1 = (index: any) => {
    const newleLevel1 = [...level_1];
    console.log(index, "index");
    newleLevel1.splice(index, 1);
    setLevel_1(newleLevel1);
  };

  const handleChangeLevel1 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel1 = [...level_1];
    // @ts-ignore
    newleLevel1[index].behavioral_objective = value;
    setLevel_1(newleLevel1);
  };

  const handleLevelAdd2 = () => {
    setLevel_2([...level_2, { behavioral_objective: "" }]);
  };

  const handleLevelRemove2 = (index: any) => {
    const newleLevel2 = [...level_2];
    console.log(index, "index");
    newleLevel2.splice(index, 1);
    setLevel_2(newleLevel2);
  };

  const handleChangeLevel2 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel2 = [...level_2];
    // @ts-ignore
    newleLevel2[index].behavioral_objective = value;
    setLevel_2(newleLevel2);
  };

  const handleLevelAdd3 = () => {
    setLevel_3([...level_3, { behavioral_objective: "" }]);
  };

  const handleLevelRemove3 = (index: any) => {
    const newleLevel3 = [...level_3];
    console.log(index, "index");
    newleLevel3.splice(index, 1);
    setLevel_3(newleLevel3);
  };

  const handleChangeLevel3 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel3 = [...level_3];
    // @ts-ignore
    newleLevel3[index].behavioral_objective = value;
    setLevel_3(newleLevel3);
  };

  const handleLevelAdd4 = () => {
    setLevel_4([...level_4, { behavioral_objective: "" }]);
  };

  const handleLevelRemove4 = (index: any) => {
    const newleLevel4 = [...level_4];
    console.log(index, "index");
    newleLevel4.splice(index, 1);
    setLevel_4(newleLevel4);
  };

  const handleChangeLevel4 = (e: any, index: number) => {
    const { name, value } = e.target;
    const newleLevel4 = [...level_4];
    // @ts-ignore
    newleLevel4[index].behavioral_objective = value;
    setLevel_4(newleLevel4);
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

  const mapObjectiveGroupData = () => {
    let Objectivegrouparray: any = [];
    ObjectiveGroupData.data.forEach((objectiveGroup: any) => {
      //Items which have Objective Title created
      let data = objectiveDescriptionData.data.filter(
        (item: any) => item.objective_type.objective_group == objectiveGroup._id
      );
      data.forEach((objItem: any) => {
        Objectivegrouparray.push({
          ObjectiveGroup: objectiveGroup.name,
          ObjectiveGroupID: objectiveGroup._id,
          ObjectiveTitleId: objItem._id,
          ObjectiveType: objItem.objective_type.name,
          ObjectiveTitle: objItem.objectiveTitle,
          ObjectiveDescription: objItem.description,
          TitleActive: objItem.isTitleActive,
          Levels: [
            {
              0: objItem.level_1,
            },
            {
              1: objItem.level_2,
            },
            {
              2: objItem.level_3,
            },
            {
              3: objItem.level_4,
            },
          ],
          updatedAt: objItem.updatedAt,
        });
      });

      //Items for which Objective Title has not been mapped
      let objTypData = objectiveType.data.filter((item: any) =>
        item.objective_group != null
          ? item.objective_group._id == objectiveGroup._id
          : false
      );
      objTypData.forEach((item: any) => {
        // let alreadyMapped: any = objectiveDescriptionData.data.filter((item: any) => item.objective_type._id == item._id)
        let alreadyMapped = objectiveDescriptionData.data
          .map((item: any) => item.objective_type._id)
          .includes(item._id);
        if (!alreadyMapped) {
          Objectivegrouparray.push({
            ObjectiveGroup: objectiveGroup.name,
            ObjectiveGroupID: objectiveGroup._id,
            ObjectiveType: item.name,
            ObjectiveTitle: "",
            updatedAt: item.updatedAt,
          });
        }
      });
      //Items for which Objective Type has not been mapped
      if (objTypData.length == 0) {
        Objectivegrouparray.push({
          ObjectiveGroup: objectiveGroup.name,
          ObjectiveGroupID: objectiveGroup._id,
          ObjectiveType: "",
          ObjectiveTitle: "",
          updatedAt: objectiveGroup.updatedAt,
        });
      }
    });
    Objectivegrouparray.sort((a: any, b: any) => a.updatedAt - b.updatedAt);
    // Objectivegrouparray.reverse();
    return Objectivegrouparray;
  };

  const [checkboxSelect, setcheckboxSelect] = useState(false);
  console.log(checkboxSelect, "checkbox");
  const handlecheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnavPrompt(true);
    setcheckboxSelect(event.target.checked);
  };
  useEffect(() => {
    const mapped = ObjectiveGroupData &&
      objectiveType &&
      objectiveDescriptionData &&
      mapObjectiveGroupData()
        .filter((i: any) => {
          return i.TitleActive === true;
        })
        .map((row: any, index: number) => {
          console.log(row, "new")
         
          let objLevel = "";
          row.Levels && row.Levels.forEach((level: any, index: any) => {
            if(level[index].level_definition && level[index].level_definition != "")
            objLevel += `L${index+1} :${level[index].level_definition}\n`;
            })

          return {

            Objectiveroup: row?.ObjectiveGroup,

            ObjectiveType: row?.ObjectiveType,

            objectiveTitle: row?.ObjectiveTitle,

            objectiveLevel: row.ObjectiveDescription,

            objectiveLevel1: row.Levels && objLevel



          }

          })
         console.log(mapped,"mapped")
         setfilData(mapped)
        }, [objectiveDescriptionData, ObjectiveGroupData])
    //  {/* L{index + 1}: {level[index].level_definition} */}
    const handleExport = () => {
      // console.log(users, "excel");
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(filData);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "MyExcel.xlsx");
    };
    return (
      <>
        <PAMaster name={"Objectives Mapping"}
          nav={`${OBJECTIVE}`}
          secondName={"Objectives Setting"}
        />
        {" "}

        <Container
          sx={{
            maxWidth: "95% !important",
            width: "100%",
            height: "calc(100vh - 150px)",
            backgroundColor: "#fff",
            // marginTop: "6px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingTop="20px"
          >
            <h3
              style={{
                color: "#3E8CB5",
                fontWeight: "400",
                opacity: "0.9",
              }}
            >
              {/*Objective Setting Lists*/}
            </h3>
            <img
              src={Newexcel}
              alt="icon"
              style={{ marginLeft: "88%", marginTop: "5px", cursor: "pointer" }}
              onClick={handleExport}
            />
            <Link to={`${LEVELS_VIEW_ALL_EDIT}`}>

              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent"
                }}
                variant="outlined"
              >
                {/* <img
                  src={white_edit}
                  alt="icon"
                  style={{
                    color: "#ffffff",
                    width: "16px",
                    height: "16px",
                    verticalAlign: "middle",
                    paddingRight: "10px",
                  }}
                /> */}
                Edit
              </Button>

            </Link>
          </Stack>
          <TableContainer sx={{ marginTop: 2, height: "calc(100vh - 251px)" }}>
            {duplicateGroupError1 && (
              <Alert severity="error">Objective Group already exists!</Alert>
            )}
            {duplicateTypeError1 && (
              <Alert severity="error">Objective Type already exists!</Alert>
            )}
            {duplicateTitleError1 && (
              <Alert severity="error">Objective Title already exists!</Alert>
            )}
            <Table size="small" aria-label="simple table" stickyHeader>
              <TableHead
                sx={{
                  bgcolor: "#eaeced",
                }}
              >
                <TableRow
                  sx={{
                    "& td, & th": {
                      border: "1px solid #e0e0e0",
                      bgcolor: "#eaeced",
                    },
                  }}
                >
                  <TableCell
                    width="23%"
                    align="left"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      bgcolor: "#eaeced",
                      textAlign: "center"
                    }}
                  >
                    Objective Group
                  </TableCell>
                  <TableCell
                    align="left"
                    width="23%"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      bgcolor: "#eaeced",
                      textAlign: "center"
                    }}
                  >
                    Objective Type
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      bgcolor: "#eaeced",
                      textAlign: "center"
                    }}
                  >
                    Objective Title
                  </TableCell>
                  <TableCell
                    align="left"
                    width="25%"
                    sx={{
                      fontFamily: "Arial",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      bgcolor: "#eaeced",
                      textAlign: "center"
                    }}
                  >
                    Objective Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ObjectiveGroupData &&
                  objectiveType &&
                  objectiveDescriptionData &&
                  mapObjectiveGroupData()
                    .filter((i: any) => {
                      return i.TitleActive === true;
                    })
                    .map((row: any, index: number) => (
                      <TableRow
                        sx={{
                          "& td, & th": {
                            border: "1px solid #e0e0e0",
                            // whiteSpace: "nowrap",
                          },
                        }}
                        key={row.number}
                      >
                        {/* <TableCell
                    scope="row"
                    sx={{ border: 1, borderColor: "lightgrey" }}
                  >
                    {row.number}{" "}
                  </TableCell> */}
                        <TableCell
                          align="left"
                          width="100px"
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                          }}
                        >
                          {/* {ObjectiveGroupData && objectiveType &&   ObjectiveGroupData.data.filter((j:any) => j._id ===  objectiveType.data[index]?.objective_group?._id)[0]?.name } */}
                          {row.ObjectiveGroup}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                          }}
                        >
                          {/*{objectiveType &&  objectiveType.data[index]?.name }*/}
                          {/*{ObjectiveGroupData && objectiveType &&   objectiveType.data.filter((j:any) => j._id ===  objectiveDescriptionData.data[index]?.objective_type?._id)[0]?.name }*/}
                          {row.ObjectiveType}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {/* {objectiveDescriptionData &&  objectiveDescriptionData.data[index]?.objectiveTitle} */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {/* <span
                          style={{
                            borderRadius: "50%",
                            marginRight: "10px",
                            verticalAlign: "middle",
                            width: "6px",
                            height: "6px",
                            display: "inline-block",
                            background: "#939393",
                          }}
                        /> */}
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // padding:"10px",
                                wordBreak: "break-word",
                                width: "100%",
                                // background:"red"
                              }}
                            >
                              {/* <FormGroup>
                            <FormControlLabel
                              control={<Checkbox checked={objtitleSelect}
                                onChange={handlecheckbox} />}
                              key={index}
                              label={i.objectiveTitle}
                              value={i.objectiveTitle}
                              name={i.objectiveTitle}
                            />
                          </FormGroup> */}
                              {/* <div key={index}>
                            <input value={i.objectiveTitle} type="checkbox" />
                            <span>{i.objectiveTitle}</span>
                          </div> */}
                              {/* <input type='checkbox' name={i.objectiveTitle} value={i.objectiveTitle} ></input>
                          {i.objectiveTitle} */}
                              {row.ObjectiveTitle}
                              <div
                                style={{
                                  marginTop: "5px",
                                  fontSize: "12px",
                                  color: "#333333",
                                  opacity: "80%"
                                }}
                              >
                                {row.ObjectiveDescription}
                              </div>
                            </p>
                          </div>

                          {console.log(row, "row")}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {row.Levels &&
                            row.Levels.map((level: any, index: any) => {
                              return (
                                <>
                                  {level[index] && level[index].level_definition && (
                                    <p
                                      style={{
                                        marginTop: "1px",
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "#005477",
                                          fontSize: "12px",
                                          fontFamily: "Arial"
                                        }}
                                      >
                                        L{index + 1}
                                      </span>{" "}
                                      : {level[index].level_definition}
                                    </p>
                                  )}

                                  {/* {
                          (level[index] != undefined && level[index].behavioral_objective != "" && level[index].behavioral_objective.length > 0) &&
                          level[index].behavioral_objective.map((item: any) => {
                            return <List sx={{ "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" }, '& .ul.MuiList-root': { paddingTop: "0px", paddingBottom: "0px" } }}>
                              <ListItem sx={{ paddingTop: "0px", paddingBottom: "0px", '& .MuiTypography-root': { fontSize: "0.775rem" }, '& .MuiList-padding': { paddingTop: "0px", paddingBottom: "0px" }, '& .MuiList-root': { paddingTop: "0px", paddingBottom: "0px" } }}>
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
                                <ListItemText primary={item} />
                              </ListItem>
                            </List>
                          })

                        } */}
                                </>
                              );
                            })}
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

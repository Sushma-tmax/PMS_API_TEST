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
import { AlertDialog } from "..";
import PAMaster from "../UI/PAMaster";
import AlertDialogSuccess from "../UI/DialogSuccess";

import {
  Avatar,
  Alert,
  Box,
  BoxProps,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  OutlinedInput,
  Popover,
  Stack,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  FormHelperText,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, Navigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Edit from "../../assets/Images/Edit.svg";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import { useNavigate } from "react-router-dom";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  ADD_LEVEL,
  EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT,
  // EDIT_LEVELS_OBJECTIVE_DESCRIPTION,
  LEVELS_VIEW_ALL,
  LINK_CALENDAR,
  LINK_CALENDAR_OPEN,
  MASTER_NAV,
  OBJECTIVE,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import InputAdornment from "@mui/material/InputAdornment";
import Close from "../../assets/Images/Close.svg";
import white_edit from "../../assets/Images/white_edit.svg";
import Closeicon from "../../assets/Images/Closeicon.svg";
import Plus from "../../assets/Images/Plus.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import {
  useDeleteObjectiveDescriptionMutation,
  useDeleteObjectiveGroupMutation,
  useDeleteObjectiveTitleMutation,
  useDeleteObjectiveTypeMutation,
  useGetObjectiveDescriptionQuery,
  useGetObjectiveGroupQuery,
  useGetObjectiveTypeQuery,
  useUpdateObjectiveDescriptionMutation,
  useUpdateObjectiveGroupMutation,
  useUpdateObjectiveTitleMutation,
  useUpdateObjectiveTypeMutation,
} from "../../service";
// import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";


//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  React.useEffect(() => {
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
//   formControlLabel: { fontSize: "12px",
//  "& label": { fontSize: "13px" , fontFamily: "sans-serif"} }
// }));
const FormControlLabelStyled = styled("div")({
  color: "#333333",
  opacity:"80%",
  fontSize:"12px",
  fontFamily:"Arial"
  // "& label": { fontSize: "13px", fontFamily: "sans-serif" },
});

const Levelsviewalledit = (props: any) => {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  // const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectGroup, setSelectGroup] = useState<any>("");
  const [selectObjectiveGroupId, setSelectObjectiveGroupId] = useState<any>("");
  const [selectObjectiveTypeId, setSelectObjectiveTypeId] = useState<any>("");
  const [selectObjectiveDescriptionId, setSelectObjectiveDescriptionId] =
    useState<any>("");
  const [selectGroupInType, setSelectGroupInType] = useState<any>("");
  const [selectType, setSelectType] = useState<any>("");
  const [objectiveTypeText, setObjectiveTypeText] = useState<any>("");
  const [objectiveTitleText, setObjectiveTitleText] = useState<any>("");
  const [objectiveDescText, setObjectiveDescText] = useState<any>("");
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [auth, setAuth] = React.useState(true);

  const handleMenu = (row: any, event: React.MouseEvent<HTMLElement>) => {
    console.log(row, "row");
    setAnchorEl1(event.currentTarget);
    setSelectObjectiveTypeId(row.ObjectiveTypeId);
    setObjectiveTypeText(row.ObjectiveType);
    setSelectGroupInType(row.ObjectiveGroupID);
    console.log(objectiveTypeText, "text");
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const [anchorEl3, setAnchorEl3] = React.useState<null | HTMLElement>(null);
  const [auth3, setAuth3] = React.useState(true);
  const [objdescriptionnavId, setobjdescriptionnavId] = useState<any>("");
  const handleMenu3 = (row: any, event: React.MouseEvent<HTMLElement>) => {
    console.log(row, "rowrow");
    setAnchorEl3(event.currentTarget);
    setSelectObjectiveDescriptionId(row.ObjectiveDescriptionId);
    setObjectiveTitleText(row.ObjectiveTitle);
    setObjectiveDescText(row.ObjectiveDescription);
    setSelectType(row.ObjectiveTypeId);
    setobjdescriptionnavId(row.ObjectiveDescriptionId)
    let temp = row?.Levels?.filter((i:any) => {
      console.log(i[0]?.level_definition, i[1]?.level_definition, i[2]?.level_definition,i[3]?.level_definition,'working1')
     return (i[0]?.level_definition != undefined ||
      i[1]?.level_definition != undefined ||
      i[2]?.level_definition != undefined ||
      i[3]?.level_definition != undefined)
    })
   if (temp.length > 0) {
    setcheckboxSelect(true)
   } else {
    setcheckboxSelect(false)
   }
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [newId, setNewId] = useState("");

  const handleClickOpen = (row: any) => {
    setOpen2(true);
    setNewId(row);
  };

  const handleClose4 = () => {
    setOpen1(false);
  };

  const handleClickClose = () => {
    setOpen2(false);
  };

  function createData(
    number: number,
    ObjectiveGroup: any,
    ObjectiveType: any,
    ObjectiveTitle: any,
    Levels: any,
    Action: any
  ) {
    return {
      number,
      ObjectiveGroup,
      ObjectiveType,
      ObjectiveTitle,
      Levels,
      Action,
    };
  }

  function Item1(props: BoxProps) {
    const { sx, ...other } = props;

    return (
      <Box
        sx={{
          width: "250px",
          height: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "-20px",
          ...sx,
        }}
        {...other}
      />
    );
  }

  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const [auth2, setAuth2] = React.useState(true);

  const handleMenu2 = (row: any, event: React.MouseEvent<HTMLElement>) => {
    console.log(row, "rowww");
    setAnchorEl2(event.currentTarget);
    setSelectObjectiveGroupId(row.ObjectiveGroupID);
    setSelectGroup(row.ObjectiveGroup);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [activeLevel, setActiveLevel] = React.useState(0);

  const tabValue = ["Level1", "Level2", "Level3", "Level4"];
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveLevel(newValue);
  };

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

  console.log(objectiveType, "objtype");
  console.log(selectObjectiveDescriptionId,selectObjectiveTypeId, "objSelect");
  const [updateObjectiveGroup, { isError: objectiveGroupError1 }] =
    useUpdateObjectiveGroupMutation();
  const [updateObjectiveType, { isError: errorObjectiveType1 }] =
    useUpdateObjectiveTypeMutation();
  const [updateObjectiveDescription, { isError: errorObjectiveTitle1 }] =
    useUpdateObjectiveDescriptionMutation();

  const [deleteGroup, { error: groupError }] =
    useDeleteObjectiveGroupMutation();
  const [deleteType, { error: typeError }] = useDeleteObjectiveTypeMutation();
  const [deleteTitle] = useDeleteObjectiveTitleMutation();
  const [deleteDescription, { error: descriptionError }] =
    useDeleteObjectiveDescriptionMutation();

  console.log(objectiveGroupError1, "error1");
  console.log(errorObjectiveType1, "error2");
  console.log(errorObjectiveTitle1, "error3");
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
        let objTypeItem = objectiveType.data.find(
          (item: any) => item._id == objItem.objective_type._id
        );

        Objectivegrouparray.push({
          ObjectiveDescriptionId: objItem._id,
          ObjectiveGroup: objectiveGroup.name,
          ObjectiveGroupID: objectiveGroup._id,
          ObjectiveTitleId: objItem._id,
          ObjectiveType: objTypeItem
            ? objTypeItem.name
            : objItem.objective_type.name,
          ObjectiveTypeId: objItem.objective_type._id,
          ObjectiveTitle: objItem.objectiveTitle,
          ObjectiveDescription: objItem.description,
          TitleActive:objItem.isTitleActive,
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
        });
      });
      //Items for which Objective Title has not been mapped

      let objTypData = objectiveType.data.filter((item: any) =>
        item.objective_group != null
          ? item.objective_group._id == objectiveGroup._id
          : false
      );
      objTypData.forEach((item: any) => {
        let alreadyMapped = objectiveDescriptionData.data
          .map((item: any) => item.objective_type._id)
          .includes(item._id);
        if (!alreadyMapped) {
          Objectivegrouparray.push({
            ObjectiveGroup: objectiveGroup.name,
            ObjectiveGroupID: objectiveGroup._id,
            ObjectiveType: item.name,
            ObjectiveTypeId: item._id,
            ObjectiveTitle: "",
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
        });
      }
    });
    // Objectivegrouparray.reverse();
    return Objectivegrouparray;
  };

  // useEffect(()=> {
  //   if (selectObjectiveTypeId) {
  // console.log(selectObjectiveTypeId,'sssssss')
  // console.log(objectiveType,'sssssss')
  //     const compareType = objectiveDescriptionData.data.filter((i:any) => {
  //       return (
  //         i.objective_type._id === selectObjectiveTypeId
  //       )
  //     })
  //     if (compareType.length === 1) {
  //       alert("can delete")
  //     } else {
  //       alert("can't delete")
  //     }
  //     console.log(compareType.length ,'sssss')
  //   }

  // },[selectObjectiveTypeId])

  const deleteRow = (row: any) => {
    if (row.ObjectiveTitle != "" && row.ObjectiveTitle != undefined) {
      let checkdeleteType = false;
      let checkdeleteGroup = false;
      if (row.ObjectiveType != "") {
        const compareType = objectiveDescriptionData.data.filter((i: any) => {
          return i.objective_type._id === row.ObjectiveTypeId;
        });
        if (compareType.length === 1) {
          checkdeleteType = true;
        }
      }
      if (row.ObjectiveGroup != "") {
        const compareGroup = objectiveType.data.filter((i: any) => {
          return i.objective_group._id === row.ObjectiveGroupID;
        });
        if (compareGroup.length === 1) {
          checkdeleteGroup = true;
        }
      }
      deleteDescription(row.ObjectiveDescriptionId).then((data: any) => {
        if (checkdeleteType) {
          deleteType(row.ObjectiveTypeId).then((data2: any) => {
            if (checkdeleteGroup) {
              deleteGroup({ id: row.ObjectiveGroupID });
            }
          });
        }
        // alert("Item deleted")
      });
    } else if (row.ObjectiveType != "") {
      let checkdeleteGroup = false;
      if (row.ObjectiveGroup != "") {
        const compareGroup = objectiveType.data.filter((i: any) => {
          return i.objective_group._id === row.ObjectiveGroupID;
        });
        if (compareGroup.length === 1) {
          checkdeleteGroup = true;
        }
        deleteType(row.ObjectiveTypeId).then((data2: any) => {
          if (checkdeleteGroup) {
            deleteGroup({ id: row.ObjectiveGroupID });
          }
          // alert("Item deleted")
        });
      }
    } else if (row.ObjectiveGroup != "") {
      deleteGroup({ id: row.ObjectiveGroupID });
      // .then(
      //   success => alert("Item deleted")
      // )
    }
  };

  const handleClickIdClose = () => {
    if (newId) {
      deleteRow(newId);
      setOpen2(false);
      console.log(newId);
      setOpen3(true);
      // setHideAlert(true);
      // hideAlertHandler();
    }
  };

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
  const [hideAlert, setHideAlert] = useState(false);
  const [hideAlert1, setHideAlert1] = useState(false);
  const [hideAlert2, setHideAlert2] = useState(false);

  //success Alert
  const [objGroupSuccess, setobjGroupSuccess] = useState(false);
  const handleobjGroupSuccess = () => {
    setobjGroupSuccess(false);
  };
  const [objTypeSuccess, setobjTypeSuccess] = useState(false);
  const handleobjTypeSuccess = () => {
    setobjTypeSuccess(false);
  };
  const [objTitleSuccess, setobjTitleSuccess] = useState(false);
  const handleobjTitleSuccess = () => {
    setobjTitleSuccess(false);
  };
 //success Alert
  const objectiveGroupHandler = () => {
    if (selectGroup === "") {
      return settextfeildError(true);
    } else if (duplicateGroupError1 === true) {
      settextfeildError(false);
    } else {
      return (
        settextfeildError(false),
        updateObjectiveGroup({
          name: selectGroup.trim(),
          id: selectObjectiveGroupId,
        }).then((res: any) => {
          res.error ? <> </> :
          setobjGroupSuccess(true)
      }),
        setAnchorEl2(null)
      );
    }
  };

  const objectiveTypeHandler = () => {
    if (objectiveTypeText !== "" && selectGroupInType !== "") {
      return (
        settextfeildError1(false),
        updateObjectiveType({
          name: objectiveTypeText.trim(),
          objective_group: selectGroupInType,
          id: selectObjectiveTypeId,
        }).then((res: any) => {
          res.error ? <> </> :
          setobjTypeSuccess(true)
      }),
        handleClose1()
      );
    } else {
      return settextfeildError1(true);
    }
  };

  const objectiveTitleHandler = () => {
    if (
      objectiveTitleText !== "" &&
      objectiveDescText !== "" &&
      selectType !== ""
    ) {
      if (checkboxSelect === true) {
        // navigate(`${ADD_LEVEL}`);
        // navigate(
        //   `${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${objdescriptionnavId}`
        // )
        setnavTriggerEdit(true)
      }
      return (
        settextfeildError2(false),
        updateObjectiveDescription({
          objectiveTitle: objectiveTitleText.trim(),
          description: objectiveDescText,
          objective_type: selectType,
          id: selectObjectiveDescriptionId,
          isTitleChecked: checkboxSelect,
        }).then((res: any) => {
          res.error ? <> </> :
          setobjTitleSuccess(true)
      }),
        handleClose3()
        
      );
    } else {
      return settextfeildError2(true);
    }
  };

  const [navTriggerEdit, setnavTriggerEdit] = useState(false);
  useEffect(() => {
    if (navPrompt === false && navTriggerEdit === true) {
      navigate(
        `${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${objdescriptionnavId}`
      )
      setobjdescriptionnavId("");
    }
  }, [navTriggerEdit]);
  //nav prompt

  useEffect(() => {
    if (objectiveGroupError1 === false) {
      setDuplicateGroupError1(false);
    } else if (objectiveGroupError1 === true) {
      setDuplicateGroupError1(true);
      // setTimeout(() => {
      //   setDuplicateGroupError1(false);
      // }, 3000);
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

  //validation-ends

  // const rows = [
  //   createData(
  //     1,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end" onClick={handleMenu2}>
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //             <Popover
  //               id="menu-appbar"
  //               anchorEl={anchorEl2}
  //               anchorOrigin={{
  //                 vertical: "bottom",
  //                 horizontal: "right",
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               open={Boolean(anchorEl2)}
  //               onClose={handleClose2}
  //               sx={{
  //                 padding: "5px",
  //                 "& .MuiPopover-paper": { padding: "10px  " },
  //               }}
  //             >
  //               <Stack direction="column">
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Select Objective Group
  //                 </p>
  //                 <div style={{ paddingLeft: "15px" }}>
  //                   <Select
  //                     size="small"
  //                     labelId="demo-simple-select-label"
  //                     id="demo-simple-select"
  //                     sx={{ width: "calc(100vh - 480px)", paddingLeft: "15px" }}
  //                   ></Select>
  //                 </div>
  //               </Stack>

  //               <br />
  //               <Stack direction="row" sx={{ paddingLeft: "15px" }}>
  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     backgroundColor: "#014D76",
  //                     fontSize: "12px",
  //                     fontFamily: "sans-serif",
  //                     padding: "4px 5px",
  //                   }}
  //                   variant="contained"
  //                 >
  //                   Update
  //                 </Button>

  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                     fontFamily: "sans-serif",
  //                   }}
  //                   variant="text"
  //                   onClick={handleClose2}
  //                 >
  //                   Cancel
  //                 </Button>
  //               </Stack>
  //             </Popover>
  //           </InputAdornment>
  //         }
  //         placeholder="Job Objectives"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end" onClick={handleMenu}>
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //             <Popover
  //               id="menu-appbar"
  //               anchorEl={anchorEl1}
  //               anchorOrigin={{
  //                 vertical: "bottom",
  //                 horizontal: "right",
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               open={Boolean(anchorEl1)}
  //               onClose={handleClose}
  //               sx={{
  //                 padding: "5px",
  //                 "& .MuiPopover-paper": { padding: "10px  " },
  //               }}
  //             >
  //               <Stack direction="column">
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Enter Objective Type Name
  //                 </p>

  //                 <TextField
  //                   placeholder="Enter text"
  //                   autoComplete="off"
  //                   id="outlined-size-small"
  //                   variant="outlined"
  //                   size="small"
  //                   style={{
  //                     width: "calc(100vh - 480px)",
  //                     paddingLeft: "15px",
  //                   }}
  //                 />
  //               </Stack>
  //               <br />
  //               <Stack>
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Select Objective Group
  //                 </p>
  //                 <FormControl
  //                   sx={{
  //                     width: "90%",
  //                     marginBottom: "10px",
  //                     maxHeight: "110px",
  //                     paddingLeft: "15px",
  //                   }}
  //                 >
  //                   <Select
  //                     size="small"
  //                     labelId="demo-simple-select-label"
  //                     id="demo-simple-select"
  //                     sx={{ width: "calc(100vh - 480px)" }}
  //                   ></Select>
  //                 </FormControl>
  //               </Stack>
  //               <br />
  //               <Stack direction="row" sx={{ paddingLeft: "15px" }}>
  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     backgroundColor: "#014D76",
  //                     fontSize: "12px",
  //                     fontFamily: "sans-serif",
  //                     padding: "4px 5px",
  //                   }}
  //                   variant="contained"
  //                 >
  //                   Update
  //                 </Button>

  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                     fontFamily: "sans-serif",
  //                   }}
  //                   variant="text"
  //                   onClick={handleClose1}
  //                 >
  //                   Cancel
  //                 </Button>
  //               </Stack>
  //             </Popover>
  //           </InputAdornment>
  //         }
  //         placeholder="Individual"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end" onClick={handleMenu3}>
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //             <Popover
  //               id="menu-appbar"
  //               anchorEl={anchorEl3}
  //               anchorOrigin={{
  //                 vertical: "bottom",
  //                 horizontal: "right",
  //               }}
  //               keepMounted
  //               transformOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               open={Boolean(anchorEl3)}
  //               onClose={handleClose3}
  //               sx={{
  //                 padding: "5px",
  //                 "& .MuiPopover-paper": { padding: "10px  " },
  //               }}
  //             >
  //               <Stack direction="column">
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Add Objective Title
  //                 </p>

  //                 <TextField
  //                   placeholder="Enter text"
  //                   autoComplete="off"
  //                   id="outlined-size-small"
  //                   variant="outlined"
  //                   size="small"
  //                   style={{
  //                     width: "calc(100vh - 480px)",
  //                     paddingLeft: "15px",
  //                   }}
  //                 />
  //               </Stack>
  //               <br />
  //               <Stack direction="column">
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Add Objective Description
  //                 </p>

  //                 <TextField
  //                   placeholder="Enter text"
  //                   autoComplete="off"
  //                   id="outlined-size-small"
  //                   variant="outlined"
  //                   size="small"
  //                   style={{
  //                     width: "calc(100vh - 480px)",
  //                     paddingLeft: "15px",
  //                   }}
  //                 />
  //               </Stack>
  //               <br />
  //               <Stack>
  //                 <p
  //                   style={{
  //                     display: "flex",
  //                     paddingLeft: "15px",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                   }}
  //                 >
  //                   Select Objective Type
  //                 </p>
  //                 <FormControl
  //                   sx={{
  //                     width: "90%",
  //                     marginBottom: "10px",
  //                     maxHeight: "110px",
  //                     paddingLeft: "15px",
  //                   }}
  //                 >
  //                   <Select
  //                     size="small"
  //                     labelId="demo-simple-select-label"
  //                     id="demo-simple-select"
  //                     sx={{ width: "calc(100vh - 480px)" }}
  //                   ></Select>
  //                 </FormControl>
  //               </Stack>
  //               <br />
  //               <Stack direction="row" sx={{ paddingLeft: "15px" }}>
  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     backgroundColor: "#014D76",
  //                     fontSize: "12px",
  //                     fontFamily: "sans-serif",
  //                     padding: "4px 5px",
  //                   }}
  //                   variant="contained"
  //                 >
  //                   Update
  //                 </Button>

  //                 <Button
  //                   style={{
  //                     textTransform: "none",
  //                     fontSize: "13px",
  //                     color: "#757272",
  //                     fontFamily: "sans-serif",
  //                   }}
  //                   variant="text"
  //                   onClick={handleClose3}
  //                 >
  //                   Cancel
  //                 </Button>
  //               </Stack>
  //             </Popover>
  //           </InputAdornment>
  //         }
  //         placeholder="Knowledge of the job"
  //       />
  //     </FormControl>,

  //     <>
  //       <p>Level : Level Definition</p>
  //       <Item1>
  //         <List>
  //           <ListItem
  //             sx={{
  //               paddingTop: "0px",
  //               paddingBottom: "0px",
  //               "& .MuiTypography-root": { fontSize: "0.875rem" },
  //               "& .MuiList-padding": {
  //                 paddingTop: "0px",
  //                 paddingBottom: "0px",
  //               },
  //               "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" },
  //             }}
  //           >
  //             <span
  //               style={{
  //                 borderRadius: "50%",
  //                 marginRight: "10px",
  //                 verticalAlign: "middle",
  //                 width: "5px",
  //                 height: "5px",
  //                 display: "inline-block",
  //                 background: "#939393",
  //               }}
  //             />

  //             <ListItemText primary="Levels" />
  //           </ListItem>
  //         </List>
  //         <Tooltip title="Edit">
  //           <IconButton edge="end" onClick={handleClickOpen}>
  //             <img
  //               src={Edit}
  //               style={{
  //                 color: "#ffffff",
  //                 width: "16px",
  //                 height: "16px",
  //                 verticalAlign: "middle",
  //               }}
  //             />
  //           </IconButton>
  //         </Tooltip>
  //         <Dialog
  //           style={{
  //             marginTop: "70px",
  //             height: "calc(100vh - 50px)",
  //           }}
  //           maxWidth="xl"
  //           open={open1}
  //           onClose={handleClose4}
  //           aria-labelledby="alert-dialog-title"
  //           aria-describedby="alert-dialog-description"
  //         >
  //           <DialogTitle
  //             style={{
  //               fontFamily: "regular",
  //               backgroundColor: "#EBF1F5",
  //               color: "#004C75",
  //               fontSize: "18px",
  //               padding: "0px 20px",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               display: "flex",
  //             }}
  //           >
  //             Add Levels
  //             <p
  //               style={{
  //                 display: "flex",
  //                 float: "right",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Button onClick={handleClose4}><img width={18} height={18} src={Closeicon} /></Button>
  //             </p>
  //           </DialogTitle>

  //           <DialogContentText
  //             style={{
  //               fontSize: "14px",
  //               color: "#004C75",
  //               fontFamily: "regular",
  //               width: "920px",
  //             }}
  //           >
  //             <p style={{ paddingLeft: "20px" }}>Objective Title</p>
  //             <TextField
  //               select
  //               value="Knowledge of the job"
  //               sx={{ width: "50%" }}
  //               id="demo-simple-select-label"
  //               variant="outlined"
  //               size="small"
  //               style={{ paddingLeft: "20px" }}
  //             />
  //           </DialogContentText>
  //           <DialogContentText>
  //             <div>
  //               <Grid>
  //                 <Grid
  //                   container
  //                   style={{
  //                     paddingTop: "20px",
  //                     paddingLeft: "20px",
  //                   }}
  //                 >
  //                   <Grid
  //                     style={{
  //                       // borderRight: "1px solid lightgrey",
  //                       border: "1px solid lightgrey",
  //                       // height: "300px",
  //                       paddingTop: "20px",
  //                     }}
  //                     item
  //                     xs={2}
  //                   >
  //                     <Tabs
  //                       orientation="vertical"
  //                       variant="scrollable"
  //                       value={activeLevel}
  //                       onChange={handleChangeTabs}
  //                       TabIndicatorProps={{
  //                         style: {
  //                           left: 0,
  //                           borderColor: "divider",
  //                         },
  //                       }}
  //                     >
  //                       <Button >Level 1</Button><br />
  //                       <Button >Level 2</Button><br />
  //                       <Button >Level 3</Button><br />
  //                       <Button >Level 4</Button>
  //                     </Tabs>
  //                   </Grid>

  //                   <Grid
  //                     style={{
  //                       border: "1px solid lightgrey",
  //                       borderLeft: "none",
  //                     }}
  //                     item
  //                     xs={9.8}
  //                   >
  //                     <TabPanel value={activeLevel} index={0}>
  //                       <div
  //                         style={{
  //                           paddingLeft: "30px",
  //                         }}
  //                       >
  //                         <p style={{ color: "#004C75" }}>
  //                           Level Definition
  //                         </p>
  //                         <TextField
  //                           style={{ width: "90%" }}
  //                           size="small"
  //                         />
  //                       </div>

  //                       <div
  //                         style={{
  //                           paddingLeft: "30px",
  //                           paddingBottom: "6px",
  //                         }}
  //                       >
  //                         <p style={{ color: "#004C75" }}>
  //                           Behavioral Objective
  //                         </p>

  //                         <TextField
  //                           placeholder="Enter Behavioral Objective"
  //                           style={{
  //                             width: "90%",
  //                             paddingBottom: "6px",
  //                           }}
  //                           size="small"
  //                           multiline
  //                         />

  //                         <Tooltip title="Delete">
  //                           <IconButton>
  //                             <img src={Closeiconred} alt="icon" />
  //                           </IconButton>
  //                         </Tooltip>
  //                       </div>
  //                       <div
  //                         style={{
  //                           paddingLeft: "30px",
  //                           paddingBottom: "6px",
  //                         }}
  //                       >

  //                         <TextField
  //                           placeholder="Enter Behavioral Objective"
  //                           style={{
  //                             width: "90%",
  //                             paddingBottom: "6px",
  //                           }}
  //                           size="small"
  //                           multiline
  //                         />

  //                         <Tooltip title="Add">
  //                           <IconButton>
  //                             <img src={Plus} alt="icon" />
  //                           </IconButton>
  //                         </Tooltip>

  //                       </div>
  //                     </TabPanel>
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //             </div>
  //           </DialogContentText>
  //           <DialogActions
  //             style={{ display: "flex", justifyContent: "center" }}
  //           >
  //             <Button
  //               style={{
  //                 borderRadius: "4px",
  //                 textTransform: "none",
  //                 backgroundColor: "#004D77",
  //                 fontSize: "16px",
  //                 fontFamily: "sans-serif",
  //                 padding: "4px 28px",
  //               }}
  //               variant="contained"
  //               onClick={handleClose4}
  //               autoFocus
  //             >
  //               Save
  //             </Button>
  //           </DialogActions>
  //         </Dialog>
  //       </Item1>
  //     </>,
  //     <Tooltip title="Delete">
  //       <IconButton>
  //         <img
  //           src={Close}
  //           alt="icon"
  //           style={{ width: "20px", height: "20px" }}
  //         />
  //       </IconButton>
  //     </Tooltip>
  //   ),
  //   createData(
  //     2,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Job Competency"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Individual"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Knowledge of the job"
  //       />
  //     </FormControl>,

  //     <>
  //       <p>Level : Level Definition</p>
  //       <Item1>
  //         <List sx={{
  //           paddingTop: "0px",
  //           paddingBottom: "0px",
  //           "& .MuiTypography-root": { fontSize: "0.875rem" },
  //           "& .MuiList-padding": {
  //             paddingTop: "0px",
  //             paddingBottom: "0px",
  //           },
  //           "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" },
  //         }} >
  //           <ListItem
  //             sx={{
  //               paddingTop: "0px",
  //               paddingBottom: "0px",
  //               "& .MuiTypography-root": { fontSize: "0.875rem" },
  //               "& .MuiList-padding": {
  //                 paddingTop: "0px",
  //                 paddingBottom: "0px",
  //               },
  //               "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" },
  //             }}
  //           >
  //             <span
  //               style={{
  //                 borderRadius: "50%",
  //                 marginRight: "10px",
  //                 verticalAlign: "middle",
  //                 width: "5px",
  //                 height: "5px",
  //                 display: "inline-block",
  //                 background: "#939393",
  //               }}
  //             />

  //             <ListItemText primary="Levels" />
  //           </ListItem>
  //         </List>
  //         <Tooltip title="Edit">
  //           <IconButton edge="end">
  //             <img
  //               src={Edit}
  //               style={{
  //                 color: "#ffffff",
  //                 width: "16px",
  //                 height: "16px",
  //                 verticalAlign: "middle",
  //               }}
  //             />
  //           </IconButton>
  //         </Tooltip>
  //       </Item1>
  //     </>,
  //     <Tooltip title="Delete">
  //       <IconButton>
  //         <img
  //           src={Close}
  //           alt="icon"
  //           style={{ width: "20px", height: "20px" }}
  //         />
  //       </IconButton>
  //     </Tooltip>
  //   ),

  //   createData(
  //     3,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Job Competency"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Individual"
  //       />
  //     </FormControl>,
  //     <FormControl sx={{ m: 1 }} variant="outlined">
  //       <OutlinedInput
  //         sx={{ width: "calc(100vh - 500px)", height: "40px" }}
  //         endAdornment={
  //           <InputAdornment position="end">
  //             <IconButton edge="end">
  //               <img
  //                 src={Edit}
  //                 alt="icon"
  //                 style={{
  //                   color: "#ffffff",
  //                   width: "16px",
  //                   height: "16px",
  //                   verticalAlign: "middle",
  //                   paddingRight: "10px",
  //                 }}
  //               />
  //             </IconButton>
  //           </InputAdornment>
  //         }
  //         placeholder="Skills"
  //       />
  //     </FormControl>,

  //     <>
  //       <p>Level : Level Definition</p>
  //       <Item1>
  //         <List>
  //           <ListItem
  //             sx={{
  //               paddingTop: "0px",
  //               paddingBottom: "0px",
  //               "& .MuiTypography-root": { fontSize: "0.875rem" },
  //               "& .MuiList-padding": {
  //                 paddingTop: "0px",
  //                 paddingBottom: "0px",
  //               },
  //               "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" },
  //             }}
  //           >
  //             <span
  //               style={{
  //                 borderRadius: "50%",
  //                 marginRight: "10px",
  //                 verticalAlign: "middle",
  //                 width: "5px",
  //                 height: "5px",
  //                 display: "inline-block",
  //                 background: "#939393",
  //               }}
  //             />

  //             <ListItemText primary="Levels" />
  //           </ListItem>
  //         </List>
  //         <Tooltip title="Edit">
  //           <IconButton edge="end">
  //             <img
  //               src={Edit}
  //               style={{
  //                 color: "#ffffff",
  //                 width: "16px",
  //                 height: "16px",
  //                 verticalAlign: "middle",
  //               }}
  //             />
  //           </IconButton>
  //         </Tooltip>
  //       </Item1>
  //     </>,
  //     <Tooltip title="Delete">
  //       <IconButton>
  //         <img
  //           src={Close}
  //           alt="icon"
  //           style={{ width: "20px", height: "20px" }}
  //         />
  //       </IconButton>
  //     </Tooltip>
  //   ),
  // ];
  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };
  const hideAlertHandler1 = () => {
    setTimeout(() => {
      setHideAlert1(false);
    }, 3000);
  };
  const hideAlertHandler2 = () => {
    setTimeout(() => {
      setHideAlert2(false);
    }, 3000);
  };

  useEffect(() => {
    if (groupError) {
      setHideAlert(true);
      // hideAlertHandler();
    }
  }, [groupError]);

  useEffect(() => {
    if (typeError) {
      setHideAlert1(true);
      // hideAlertHandler1();
    }
  }, [typeError]);

  useEffect(() => {
    if (descriptionError) {
      setHideAlert2(true);
      // hideAlertHandler2();
    }
  }, [descriptionError]);

  //checkbox
  const [checkboxSelect, setcheckboxSelect] = useState(false);
  console.log(checkboxSelect, "checkbox");
  const handlecheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setnavPrompt(true);
    setcheckboxSelect(event.target.checked);
  };
  //checkbox

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
        fontSize:"14px !important",
        fontFamily:"arial",
        color:"#333333"
      },
    },
  };
  const [open3, setOpen3] = React.useState(false);

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose5 = () => {
    setOpen3(false);
  };
  // alert to dialogue

  return (
    <>
      {" "}
      <PAMaster name={"Edit Objectives Mapping"} 
      nav={`${LEVELS_VIEW_ALL}`} 
      secondName={"Objectives Mapping"}
      //thirdName={"Objectives Setting"}
      />
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

          {/* <Link to={`${LEVELS_VIEW_ALL}`}>
            <Button
              style={{
                textTransform: "none",
                backgroundColor: "#014D76",
                fontSize: "14px",
                fontFamily: "sans-serif",
                padding: "6px 12px",
                color: "#ffffff",
              }}
              variant="contained"
              onClick={(e) =>{setnavPrompt(false)}}
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
              Cancel
            </Button>
          </Link> */}
        </Stack>
        <div style={{ width: "50%", }}>
          <Dialog
        open={open3}
        // onClose={handleClose2}
        //BackdropProps={{ style: { background: "#000000", opacity: "3%" } }}
        BackdropProps={{ style: { background: "#333333 !important",opacity:"1%" } }}
      PaperProps={{
        style: {
          // borderColor:'blue',
          //border:'1px solid',
          boxShadow: "none",
          borderRadius: "6px",
          //marginTop: "155px",
          maxWidth: "0px",
          minWidth: "26%",
          margin:"0px",
          padding:"30px",
          // maxHeight:"30%"
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // textAlign: "center",
        },
      }}
      >
        <DialogContent>
          <DialogContentText
          style={{
            color: "#333333",
            fontSize: "14px",
            fontFamily:"Arial",
            // paddingBottom: "12px",
            // paddingRight: "10px",
            // paddingLeft: "10px",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            wordBreak: "break-word",
            // height: "100px",
            alignItems: "center",
            overflowY:"hidden",
          }}
          >
          {duplicateGroupError1 && (
            <div >Objective Group already exists!</div>
          )}
          {duplicateTypeError1 && (
            <div >Objective Type already exists!</div>
          )}
          {duplicateTitleError1 && (
            <div>Objective Title already exists!</div>
          )}

          {hideAlert && groupError && (
            <div>
              Objective Group is used in Objective Type!
            </div>
          )}
          {hideAlert1 && typeError && (
            <div >
              Objective Type is used in Objective Title!
            </div>
          )}
          {hideAlert2 && descriptionError && (
            <div >
              Objective Title is used in Appraisal!
            </div>
          )}
            <DialogActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    // marginRight: "10px",
                    color:"#3e8cb5",
                    width:"70px",
                    height:"35px",
                    background:"transparent"
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={handleClose5}
                >
                  Ok
                </Button>
              </DialogActions>
            </DialogContentText></DialogContent>
            </Dialog>
            </div>


        <TableContainer sx={{ marginTop: 2, height: "calc(100vh - 230px)" }}>
          {/* {duplicateGroupError1 && (
            <Alert severity="error">Objective Group already exists!</Alert>
          )}
          {duplicateTypeError1 && (
            <Alert severity="error">Objective Type already exists!</Alert>
          )}
          {duplicateTitleError1 && (
            <Alert severity="error">Objective Title already exists!</Alert>
          )}

          {hideAlert && groupError && (
            <Alert severity="error">
              Objective Group is used in Objective Type!
            </Alert>
          )}
          {hideAlert1 && typeError && (
            <Alert severity="error">
              Objective Type is used in Objective Title!
            </Alert>
          )}
          {hideAlert2 && descriptionError && (
            <Alert severity="error">
              Objective Title is used in Appraisal!
            </Alert>
          )} */}

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
                  align="center"
                 width="23%"
                  sx={{
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    bgcolor: "#eaeced",
                  }}
                >
                  Objective Group
                </TableCell>
                <TableCell
                  align="center"
                  width="23%"
                  sx={{
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    bgcolor: "#eaeced",
                  }}
                >
                  Objective Type
                </TableCell>
                <TableCell
                //  width="25%"
                  align="center"
                  sx={{
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    bgcolor: "#eaeced",
                  }}
                >
                  Objective Title
                </TableCell>
                <TableCell
                 width="25%"
                  align="center"
                  sx={{
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    bgcolor: "#eaeced",
                  }}
                >
                  Objective Level
                </TableCell>
                {/* <TableCell
                width="5%"
                  align="center"
                  sx={{
                    fontFamily: "Arial",
                    color: "#3E8CB5",
                    fontSize: "14px",
                    fontWeight: "600",
                    bgcolor: "#eaeced",
                  }}
                >
                  Action
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {ObjectiveGroupData &&
                objectiveType &&
                objectiveDescriptionData &&
                mapObjectiveGroupData()
                .filter((i:any) => {
                  return i.TitleActive === true;
                })
                .map((row: any, index: number) => {
                  return (
                    <TableRow
                      // key={row.number}
                      sx={{
                        "& td, & th": {
                          border: "1px solid #e0e0e0",
                        },
                      }}
                    >
                      {/* <TableCell
                      component="th"
                      scope="row"
                      sx={{ border: 1, borderColor: "lightgrey" }}
                    >
                      {index + 1}
                    </TableCell> */}
                      <TableCell
                      
                      align="left">
                        {/* {ObjectiveGroupData && objectiveType && objectiveDescriptionData && mapObjectiveGroupData().map((row: any, index: number) => {
                    return ( */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          // spacing={2}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              // marginLeft: "15px",
                            }}
                          >
                            {/* <span
                            style={{
                              borderRadius: "50%",
                              marginRight: "10px",
                              verticalAlign: "middle",
                              width: "5px",
                              height: "5px",
                              display: "inline-block",
                              background: "#939393",
                            }}
                          /> */}
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                // wordWrap: "break-word",
                                wordBreak:"break-word",
                                width: "100%",
                              }}
                            >
                              {row.ObjectiveGroup}
                            </p>
                          </div>

                          <div>
                            <Tooltip title="Edit">
                              <IconButton
                                edge="end"
                                onClick={(event) => handleMenu2(row, event)}
                              >
                                <img
                                  src={Edit}
                                  alt="icon"
                                  style={{
                                    color: "#ffffff",
                                    width: "16px",
                                    height: "16px",
                                    verticalAlign: "middle",
                                    paddingRight: "10px",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                            <Popover
                              id="menu-appbar"
                              anchorEl={anchorEl2}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                              }}
                              keepMounted
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "center",
                              }}
                              open={Boolean(anchorEl2)}
                              onClose={handleClose2}
                              sx={{
                                padding: "5px",
                                "& .MuiPopover-paper": {
                                  padding: "10px  ",
                                  border: "1px solid #3e8cb5",
                                  backgroundColor: "#fffff",
                                  boxShadow:
                                    "0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 1px rgb(0 0 0 / 0%)",
                                },
                              }}
                            >
                              <Stack direction="column">
                                <p
                                  style={{
                                    display: "flex",
                                    // paddingLeft: "15px",
                                    fontSize: "12px",
                                    color: "#333333",
                                    opacity: "80%",
                                    fontFamily:"arial"
                                  }}
                                >
                                  Objective Group
                                </p>
                                <div >
                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        // color: "rgb(62 140 181 / 28%)",
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                      },
                                    }}
                                    multiline
                                    placeholder="Add"
                                    autoComplete="off"
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ maxLength: 256 }}
                                    style={{
                                      width: "calc(100vh - 380px)",
                                      // paddingLeft: "2px",
                                    }}
                                    value={selectGroup}
                                    onChange={(e) => {
                                      setSelectGroup(e.target.value);
                                      setnavPrompt(true);
                                    }}
                                    error={!selectGroup && textfeildError}
                                    helperText={
                                      !selectGroup && textfeildError
                                        ? "*Name required."
                                        : " "
                                    }
                                    onKeyPress={(event: any) => {
                                      var key = event.keyCode || event.which;
                                      if (key === 13) {
                                        objectiveGroupHandler();
                                        console.log(
                                          "Enter Button has been clicked"
                                        );
                                      }
                                    }}

                                    // {/* {ObjectiveGroupData && ObjectiveGroupData.data.map((i: any) => {
                                    //   return (
                                    //     <MenuItem value={i._id}> {i.name}</MenuItem>
                                    //   )
                                    // })} */}
                                  />
                                </div>
                              </Stack>

                              <Stack
                                direction="row"
                              
                                spacing={2}
                              >
                                <Button
                                  style={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontSize: "12px",
                                    fontFamily: "arial",
                                    padding: "2px 9px",
background:"transparent",
                                    borderColor: "#3e8cb5",
                                    color: "#333333",
                                  }}
                                  variant="outlined"
                                  onClick={() => {
                                    objectiveGroupHandler();
                                    setnavPrompt(false);
                                  }}
                                >
                                  Update
                                </Button>

                                <Button
                                  style={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontSize: "12px",
                                    fontFamily: "arial",
                                    padding: "2px 9px",
                                    background:"transparent",
                                    borderColor: "#3e8cb5",
                                    color: "#333333",
                                  }}
                                  variant="outlined"
                                  onClick={() => {
                                    handleClose2();
                                    setSelectObjectiveGroupId("");
                                    CancelError();
                                  }}
                                >
                                  Cancel
                                </Button>
                              </Stack>
                            </Popover>
                          </div>
                        </Stack>

                        {/* )
                  })} */}
                      </TableCell>
                      <TableCell
                      
                      align="left">
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          // spacing={2}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              // marginLeft: "15px",
                            }}
                          >
                            {/* <span
                            style={{
                              borderRadius: "50%",
                              marginRight: "10px",
                              verticalAlign: "middle",
                              width: "5px",
                              height: "5px",
                              display: "inline-block",
                              background: "#939393",
                            }}
                          /> */}
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak:"break-word",
                                width: "100%",
                              }}
                            >
                              {row.ObjectiveType}
                            </p>
                          </div>
                          {/* {ObjectiveGroupData && objectiveType && objectiveDescriptionData && mapObjectiveGroupData().map((row: any, index: number) => {
                    return ( */}
                          {row.ObjectiveType && (
                            <div>
                              <Tooltip title="Edit">
                                <IconButton
                                  edge="end"
                                  onClick={(event) => handleMenu(row, event)}
                                >
                                  <img
                                    src={Edit}
                                    alt="icon"
                                    style={{
                                      color: "#ffffff",
                                      width: "16px",
                                      height: "16px",
                                      verticalAlign: "middle",
                                      paddingRight: "10px",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>

                              <Popover
                                id="menu-appbar"
                                anchorEl={anchorEl1}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                open={Boolean(anchorEl1)}
                                onClose={handleClose}
                                sx={{
                                  padding: "5px",
                                  "& .MuiPopover-paper": {
                                    padding: "10px  ",
                                    border: "1px solid #3e8cb5",
                                    backgroundColor: "#ffffff",
                                    boxShadow:
                                      "0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 1px rgb(0 0 0 / 0%)",
                                  },
                                }}
                              >
                                <Stack direction="row">
                                  <Stack direction="column">
                                    <p
                                      style={{
                                        display: "flex",
                                        paddingLeft: "15px",
                                        fontSize: "12px",
                                        color: "#333333",
                                        opacity: "80%",
                                        fontFamily:"arial"
                                      }}
                                    >
                                      Objective Type Name
                                    </p>

                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          // color: "rgb(62 140 181 / 28%)",
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      inputProps={{ maxLength: 256 }}
                                      multiline
                                      placeholder="Add"
                                      autoComplete="off"
                                      id="outlined-size-small"
                                      variant="outlined"
                                      size="small"
                                      style={{
                                        width: "calc(100vh - 380px)",
                                        paddingLeft: "15px",
                                      }}
                                      value={objectiveTypeText}
                                      error={
                                        !objectiveTypeText && textfeildError1
                                      }
                                      helperText={
                                        !objectiveTypeText && textfeildError1
                                          ? "*Name required."
                                          : " "
                                      }
                                      onChange={(e) => {
                                        setObjectiveTypeText(e.target.value);
                                        setnavPrompt(true);
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          objectiveTypeHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}
                                    />
                                  </Stack>
                                  <Stack>
                                    <p
                                      style={{
                                        display: "flex",
                                        paddingLeft: "15px",
                                        fontSize: "12px",
                                        color: "#333333",
                                        opacity: "80%",
                                        fontFamily:"arial",

                                      }}
                                    >
                                      Objective Group
                                    </p>
                                    <FormControl
                                      sx={{
                                        width: "90%",
                                        marginBottom: "10px",
                                        maxHeight: "110px",
                                        paddingLeft: "15px",
                                      }}
                                    >
                                      <Select
                                        sx={{
                                          "& .MuiInputBase-input": {
                                            // color: "rgb(62 140 181 / 28%)",
                                            fontSize: "14px",
                                            textTransform: "none",
                                            fontFamily: "Arial",
                                            color: "#333333",
                                            width: "calc(100vh - 380px)",
                                          },
                                        }}
                                        MenuProps={MenuProps}
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // sx={{ width: "calc(100vh - 380px)" }}
                                        value={selectGroupInType}
                                        displayEmpty
                                        renderValue={
                                          selectGroupInType !== ""
                                            ? undefined
                                            : () => (
                                                <div style={{ color: "#aaa" }}>
                                                  Select
                                                </div>
                                              )
                                        }
                                        error={
                                          !selectGroupInType && textfeildError1
                                        }
                                        onChange={(e) => {
                                          setSelectGroupInType(e.target.value);
                                          setnavPrompt(true);
                                        }}
                                        onKeyPress={(event: any) => {
                                          var key =
                                            event.keyCode || event.which;
                                          if (key === 13) {
                                            objectiveTypeHandler();
                                            console.log(
                                              "Enter Button has been clicked"
                                            );
                                          }
                                        }}
                                      >
                                        {ObjectiveGroupData &&
                                          ObjectiveGroupData.data.map(
                                            (i: any) => {
                                              return (
                                                <MenuItem
                                                style={{
                                                  fontSize: "14px",
                                                  fontFamily: "Arial",
                                                  color: "#333333",
                                                  paddingLeft: "15px",
                                                
                                                }}
                                                  key={i._id}
                                                  value={i._id}
                                                >
                                                  {" "}
                                                  {i.name}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                      </Select>
                                      <FormHelperText
                                        error={
                                          !selectGroupInType && textfeildError1
                                        }
                                      >
                                        {!selectGroupInType && textfeildError1
                                          ? "*Objective group required"
                                          : ""}
                                      </FormHelperText>
                                    </FormControl>
                                  </Stack>
                                </Stack>
                                {/* {!selectGroupInType && textfeildError1 &&
                              <div style={{ width: '100%', margin: '0px', padding: '0px' }} >
                                <p style={{ fontSize: '0.75rem', color: '#d32f2f', margin: '0', marginLeft: '27px', marginTop: '-22px' }} >
                                </p>
                              </div>} */}
                               
                                <Stack
                                  direction="row"
                                  sx={{ paddingLeft: "15px" }}
                                  spacing={2}
                                >
                                  <Button
                                    style={{
                                      borderRadius: "4px",
                                      textTransform: "none",
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "2px 9px",
background:"transparent",
                                      borderColor: "#3e8cb5",
                                      color: "#333333",
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                      objectiveTypeHandler();
                                      setnavPrompt(false);
                                    }}
                                  >
                                    Update
                                  </Button>

                                  <Button
                                    style={{
                                      borderRadius: "4px",
                                      textTransform: "none",
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "2px 9px",
                                      background:"transparent",
                                      borderColor: "#3e8cb5",
                                      color: "#333333",
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                      handleClose1();
                                      setSelectObjectiveTypeId("");
                                      CancelError();
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </Stack>
                              </Popover>
                            </div>
                          )}
                        </Stack>

                        {/* )
                  })} */}
                      </TableCell>
                      <TableCell
                          align="left"
                        sx={{ border: 1, padding: 1, borderColor: "lightgrey" }}
                      >
                        {/* {ObjectiveGroupData && objectiveType && objectiveDescriptionData && mapObjectiveGroupData().map((row: any, index: number) => {
                    return ( */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          // spacing={2}
                        >
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
                                wordWrap: "break-word",
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
                                  fontFamily: "Arial",
                                  opacity: "80%",
                                  fontSize: "12px",
                                  color: "#333333",
                                }}
                              >
                                {row.ObjectiveDescription}
                              </div>
                            </p>
                          </div>

                          {row.ObjectiveTitle && (
                            <div>
                              <Tooltip title="Edit">
                                <IconButton
                                  edge="end"
                                  onClick={(event) => handleMenu3(row, event)}
                                >
                                  <img
                                    src={Edit}
                                    alt="icon"
                                    style={{
                                      color: "#ffffff",
                                      width: "16px",
                                      height: "16px",
                                      verticalAlign: "middle",
                                      paddingRight: "10px",
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                              <Popover
                                id="menu-appbar"
                                anchorEl={anchorEl3}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                                open={Boolean(anchorEl3)}
                                onClose={handleClose3}
                                sx={{
                                  padding: "5px",
                                  width: "calc(100vh - 50px)",
                                  "& .MuiPopover-paper": {
                                    padding: "10px  ",
                                    border: "1px solid #3e8cb5",
                                    backgroundColor: "#ffffff",
                                    boxShadow:
                                      "0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 1px rgb(0 0 0 / 0%)",
                                  },
                                }}
                              >
                                <Stack direction="row">
                                <div style={{width:"50%"}}>
                                  <Stack direction="column">
                                    <p
                                      style={{
                                        display: "flex",
                                        // paddingLeft: "15px",
                                        fontSize: "12px",
                                        color: "#333333",
                                        opacity: "80%",
                                        fontFamily:"arial"
                                      }}
                                    >
                                      Objective Title
                                    </p>

                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input": {
                                          // color: "rgb(62 140 181 / 28%)",
                                          fontSize: "14px",
                                          textTransform: "none",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                        },
                                      }}
                                      inputProps={{ maxLength: 256 }}
                                      multiline
                                      placeholder="Add"
                                      autoComplete="off"
                                      id="outlined-size-small"
                                      variant="outlined"
                                      size="small"
                                      style={{
                                        // width: "calc(100vh - 400px)",
                                        // paddingLeft: "15px",
                                      }}
                                      onKeyPress={(event: any) => {
                                        var key = event.keyCode || event.which;
                                        if (key === 13) {
                                          objectiveTitleHandler();
                                          console.log(
                                            "Enter Button has been clicked"
                                          );
                                        }
                                      }}
                                      value={objectiveTitleText}
                                      error={
                                        !objectiveTitleText && textfeildError2
                                      }
                                      helperText={
                                        !objectiveTitleText && textfeildError2
                                          ? "*Title required."
                                          : " "
                                      }
                                      onChange={(e) => {
                                        setObjectiveTitleText(e.target.value);
                                        setnavPrompt(true);
                                      }}
                                    />
                                    {/* <p>{objectiveDefinition}</p> */}
                                  </Stack>
                                  </div>
                                  <div style={{width:"50%"}}>
                                  <Stack>
                                    <p
                                      style={{
                                        display: "flex",
                                        paddingLeft: "15px",
                                        fontSize: "12px",
                                        color: "#333333",
                                        opacity: "80%",
                                        fontFamily:"Arial"
                                      }}
                                    >
                                      Objective Type
                                    </p>
                                    <FormControl
                                      sx={{
                                        // width: "90%",
                                        // marginBottom: "10px",
                                        // maxHeight: "110px",
                                        paddingLeft: "15px",
                                      }}
                                    >
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
                                          MenuProps={MenuProps}
                                        size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // style={{ width: "calc(100vh - 400px)" }}
                                        value={selectType}
                                        displayEmpty
                                        renderValue={
                                          selectType !== ""
                                            ? undefined
                                            : () => (
                                                <div style={{ color: "#aaa" }}>
                                                  Select
                                                </div>
                                              )
                                        }
                                        onKeyPress={(event: any) => {
                                          var key =
                                            event.keyCode || event.which;
                                          if (key === 13) {
                                            objectiveTitleHandler();
                                            console.log(
                                              "Enter Button has been clicked"
                                            );
                                          }
                                        }}
                                        error={!selectType && textfeildError2}
                                        // MenuProps={{
                                        //   sx: { maxHeight: "30%" },
                                        // }}
                                        // helperText={
                                        //   !selectType && textfeildError2
                                        //     ? "*Objective type required."
                                        //     : " "
                                        // }
                                        onChange={(e) => {
                                          setSelectType(e.target.value);
                                          setnavPrompt(true);
                                        }}
                                      >
                                        {objectiveType &&
                                          objectiveType.data.map((i: any) => {
                                            return (
                                              <MenuItem
                                              style={{
                                                fontSize: "14px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                paddingLeft: "15px",
                                              
                                              }}
                                                key={i._id}
                                                value={i._id}
                                              >
                                                {" "}
                                                {i.name}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                      <FormHelperText
                                        error={!selectType && textfeildError2}
                                      >
                                        {!selectType && textfeildError2
                                          ? "*Objective type required."
                                          : " "}
                                      </FormHelperText>
                                    </FormControl>
                                  </Stack>
                                  </div>
                                </Stack>
                                {/* <div style={{ marginLeft: '15px' }} >
                                  <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={checkboxSelect} onChange={handlecheckbox} />} label="Add Levels" />
                                  </FormGroup>
                                </div> */}
  <div style={{width:"100%"}}>
                                <Stack direction="column">
                                  <p
                                    style={{
                                      display: "flex",
                                      // paddingLeft: "15px",
                                      fontSize: "12px",
                                      color: "#333333",
                                      opacity: "80%",
                                      fontFamily:"arial"
                                    }}
                                  >
                                    Objective Description
                                  </p>

                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        // color: "rgb(62 140 181 / 28%)",
                                        fontSize: "14px",
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        minHeight: "50px",
                                      },
                                    }}
                                    multiline
                                    // rows={3}
                                    inputProps={{ maxLength: 512 }}
                                    placeholder="Add"
                                    autoComplete="off"
                                    id="outlined-size-small"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                      width: "calc(100vh - 100px)",
                                      // paddingLeft: "15px",
                                    }}
                                    onKeyPress={(event: any) => {
                                      var key = event.keyCode || event.which;
                                      if (key === 13) {
                                        objectiveTitleHandler();
                                        console.log(
                                          "Enter Button has been clicked"
                                        );
                                      }
                                    }}
                                    value={objectiveDescText}
                                    error={
                                      !objectiveDescText && textfeildError2
                                    }
                                    helperText={
                                      !objectiveDescText && textfeildError2
                                        ? "*Objective description required."
                                        : " "
                                    }
                                    onChange={(e) => {
                                      setObjectiveDescText(e.target.value);
                                      setnavPrompt(true);
                                    }}
                                  />
                                </Stack>
                                </div>
                                <div >
                                  <FormGroup>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          size="small"
                                          checked={checkboxSelect}
                                          onChange={handlecheckbox}
                                        />
                                      }
                                      label={
                                        <Typography
                                        // className={classes.formControlLabel}
                                        >
                                          <FormControlLabelStyled>
                                            Add Levels
                                          </FormControlLabelStyled>
                                        </Typography>
                                      }
                                    />
                                  </FormGroup>
                                </div>

                                <Stack
                                  direction="row"
                                 
                                  spacing={2}
                                >
                                  <Button
                                    style={{
                                      borderRadius: "4px",
                                      textTransform: "none",
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "2px 9px",
background:"transparent",
                                      borderColor: "#3e8cb5",
                                      color: "#333333",
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                      objectiveTitleHandler();
                                      setnavPrompt(false);
                                    }}
                                  >
                                    Update
                                  </Button>

                                  <Button
                                    style={{
                                      borderRadius: "4px",
                                      textTransform: "none",
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "2px 9px",
                                      background:"transparent",
                                      borderColor: "#3e8cb5",
                                      color: "#333333",
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                      handleClose3();
                                      setSelectObjectiveDescriptionId("");
                                      CancelError();
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </Stack>
                              </Popover>
                            </div>
                          )}
                        </Stack>

                        {/* )
                  })} */}
                      </TableCell>
                      <TableCell
                         align="left"
                        sx={{
                          fontSize: "14px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <div>
                            {row.Levels &&
                              row.Levels.map((level: any, index: any) => {
                                return (
                                  <>
                                    {level[index] &&
                                      level[index].level_definition && (
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: "#005477",
                                              fontSize: "12px",
                                              fontFamily: "Arial",
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
                              return (
                                <List>
                                  <ListItem
                                    sx={{
                                      paddingTop: "0px",
                                      paddingBottom: "0px",
                                      "& .MuiTypography-root": { fontSize: "0.875rem" },
                                      "& .MuiList-padding": {
                                        paddingTop: "0px",
                                        paddingBottom: "0px",
                                      },
                                      "& .MuiList-root": { paddingTop: "0px", paddingBottom: "0px" },
                                    }}
                                  >
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
                              )
                            })} */}
                                  </>
                                );
                              })}
                          </div>
                          {row.Levels &&
                            (row.Levels[0][0].level_definition ||
                              row.Levels[1][1].level_definition ||
                              row.Levels[2][2].level_definition ||
                              row.Levels[3][3].level_definition) && (
                              <div>
                                <Tooltip title="Edit">
                                  <IconButton
                                    edge="end"
                                    onClick={() =>
                                      navigate(
                                        `${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/${row.ObjectiveDescriptionId}`
                                      )
                                    }
                                  >
                                    <img
                                      src={Edit}
                                      style={{
                                        color: "#ffffff",
                                        width: "16px",
                                        height: "16px",
                                        verticalAlign: "middle",
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            )}
                        </Stack>

                        <Item1>
                          {/* {
                        (level[index] != undefined && level[index].behavioral_objective!="" && level[index].behavioral_objective.length>0) &&
                        level[index].behavioral_objective.map((item:any)=>{ */}

                          {/* })
                        
                        } */}

                          <Dialog
                            style={{
                              marginTop: "70px",
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
                                fontFamily: "arial",
                                backgroundColor: "#EBF1F5",
                                color: "#3e8cb5",
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
                                <Button onClick={handleClose4}>
                                  <img width={18} height={18} src={Closeicon} />
                                </Button>
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
                              <p style={{ paddingLeft: "20px" }}>
                                Objective Title
                              </p>
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
                                    style={{
                                      paddingTop: "20px",
                                      paddingLeft: "20px",
                                    }}
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
                                        <Button>L1</Button>
                                        <br />
                                        <Button>L2</Button>
                                        <br />
                                        <Button>L3</Button>
                                        <br />
                                        <Button>L4</Button>
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

                                          <Tooltip title="Delete">
                                            <IconButton>
                                              <img
                                                src={Closeiconred}
                                                alt="icon"
                                              />
                                            </IconButton>
                                          </Tooltip>
                                        </div>
                                        <div
                                          style={{
                                            paddingLeft: "30px",
                                            paddingBottom: "6px",
                                          }}
                                        >
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
                                            <IconButton>
                                              <img src={Plus} alt="icon" />
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
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
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
                        </Item1>
                      </TableCell>
                      {/* <TableCell
                        align="left"
                        sx={{ border: 1, padding: 1, borderColor: "lightgrey" }}
                      >
                        <Tooltip title="Delete">
                          <IconButton>
                            <img
                              src={Close}
                              alt="icon"
                              style={{ width: "20px", height: "20px" }}
                              onClick={() => {
                                // deleteRow(row)
                                handleClickOpen(row);
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        <AlertDialog
                          isAlertOpen={open2}
                          handleAlertOpen={() => handleClickOpen(row)}
                          handleAlertClose={handleClickClose}
                          handleAlertIdClose={handleClickIdClose}
                          rowAlert={row}
                        >
                          Are you sure you wish to delete this item?
                        </AlertDialog>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <AlertDialogSuccess
          isAlertOpen={objGroupSuccess}
          handleAlertClose={ handleobjGroupSuccess}
        >
          Changes have been saved.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={objTypeSuccess}
          handleAlertClose={handleobjTypeSuccess}
        >
          Changes have been saved.
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={objTitleSuccess}
          handleAlertClose={handleobjTitleSuccess}
        >
          Changes have been saved.
        </AlertDialogSuccess>
      </Container>
    </>
  );
};

export default Levelsviewalledit;

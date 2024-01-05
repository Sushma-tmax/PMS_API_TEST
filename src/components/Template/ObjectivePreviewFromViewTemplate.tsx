import {
  Box,
  Container,
  Grid,
  TableContainer,
  Typography,
  styled,
  Button,
  Stack,
  Breadcrumbs, 
  Snackbar,
  Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useAddWeightageMutation,
  useEditTemplateMutation,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useGetSingleTemplateQuery,
} from "../../service";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Link, useNavigate,useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Infoicon from "./icons/Infoicon.svg";
import Popover from "@mui/material/Popover";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CREATE_TEMPLATE_1, EDIT_TEMPLATE_1, MASTER_NAV,VIEW_TEMPLATE } from "../../constants/routes/Routing";
import AlertDialogSuccess from "../UI/DialogSuccess";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import PAMaster from "../UI/PAMaster";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },
}));
 

const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  marginLeft: "5px",
  // paddingBottom: "6px"
  // opacity: 0.84,
  // marginLeft: "5px",
});
const Labelsrec = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "2px",
});
const Labelstrain = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "2px",
});


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
export default function ObjectivePreviewFromViewTemplate() {
  const classes = useStyles();
  const { id } = useParams();
  const location: any = useLocation();
  const fromTemplate = location.state?.name;
  console.log(location,'fromTemplate')
  const { data } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: templateData } = useGetSingleTemplateQuery(id);
  const [addWeightage, { isError, isSuccess }] = useAddWeightageMutation();
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
   const [navPrompt, setnavPrompt] = useState(true);
 
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty
  );
  const [objectiveGroup, setObjectiveGroup] = useState<any>([]);
  const [objectiveType, setObjectiveType] = useState<any>([]);
  const [popoverIndexs, setPopoverIndexs] = useState<any>("");
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  const [saveChangesAlert , setSaveChangesAlert] = useState<any>(false)
  const [message ,setMessage] = useState("")
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);
  const openInfo102 = Boolean(anchorEl02);
  const id101 = openInfo101 ? "simple-popover" : undefined;
  const id102 = openInfo102 ? "simple-popover" : undefined;

  //  function to find objective title name by id
  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  // function to find objective type name by id
  const findObjectiveTypeById = (id: any) => {
    if (data) {
      console.log(data, "objectiveTitleData");
      return data?.data?.find((item: any) => item?._id === id);
    }
  };

  //  useEffect to set Objective Description
  useEffect(() => {
    setnavPrompt(false);
    if (data && templateData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return templateData?.template?.weightage?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });
      setObjectiveGroup(() => {
        return templateData?.template?.weightage?.objective_group;
      });
      setObjectiveType(() => {
        return templateData?.template?.weightage?.objective_type;
      });
    }
  }, [templateData, objectiveTitleData, data]);

  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
  };

  const handleClose101 = () => {
    setAnchorEl01(null);
  };

  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };

  const handleClose102 = () => {
    setAnchorEl02(null);
  };

  const handleDragEnd = (results: any) => {
    if (!results.destination) return;
    let tempObjective = [...objectiveDescription];
    let [selectedRow] = tempObjective.splice(results.source.index, 1);
    tempObjective.splice(results.destination.index, 0, selectedRow);
    setObjectiveDescription(tempObjective);
  };

  console.log(objectiveDescription, "objectiveDescription");

  const saveHandler = () => {
    setSaveChangesAlert(true);
    setMessage("Changes were successfully saved.");
    setnavPrompt(false);
    addWeightage({
      weightage: {
        objective_group: objectiveGroup,
        objective_type: objectiveType,
        objective_description: objectiveDescription,
      },
      id,
    });
  };

  const handleSaveAlertClose = () => {
    setSaveChangesAlert(false);
    setMessage("");
  }

  const OtherRecommedation =templateData &&
  templateData?.template?.other_recommendation
  console.log(OtherRecommedation,"OtherRecommedation")
  const TrainingRecommendation =templateData &&
    templateData?.template?.training_recommendation
  return (
    <div
      id="pdf"
      style={{
        backgroundColor: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
      <PAMaster 
        name={"Preview"} 
        nav={`${VIEW_TEMPLATE}`}
        secondName={"View Template"}
        />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        // minHeight="50px"
        marginLeft="25px"
      >
        {/* <IconButton
            onClick={() => { navigate(`/reviewer`) }}
          >
            <img src={Headleft} alt="icon" />
          </IconButton> */}
          {/* VIEW_TEMPLATE */}
        {/* <Link to={`/dashboardreview`}></Link> */}
        {/* <Breadcrumbs aria-label="breadcrumb"> */}
        
          {/* <Link          
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
            to={`${MASTER_NAV}`}
          >
            Master
          </Link> */}
         {/* {fromTemplate == "Edit" &&  ( 
         <Link  to={`${EDIT_TEMPLATE_1}/${id}`}
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
          >
            Edit Template
          </Link>
          )}
         {fromTemplate == "Create" && ( 
         <Link  to={`${CREATE_TEMPLATE_1}/${id}`}
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
          >
            Create Template
          </Link>
          )} */}
          {/* <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Preview
          </Typography> */}
        {/* </Breadcrumbs> */}
      </Stack>
      <Box
        sx={{
          // maxWidth: "95% !important",
          // height: "1425px",
          background: "#fff",
          padding:"20px",
          marginLeft:"25px",
          marginRight:"25px",

          minHeight: "100px",
          overflow: "hidden",
          marginBottom:"25px"
        }}
      >
        <Box
          style={{
            padding: "20px",
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography
            style={{ fontSize: "20px", color: "#3E8CB5", fontFamily: "Arial" }}
          >
            Preview - {templateData?.template?.name}
          </Typography>

          {/* <Button
          style={{
            textTransform: "none",
            fontSize: "15px",
            fontFamily: "Arial",
            borderColor: "#3E8CB5",
            color: "#3E8CB5",
            background: "transparent",
            width: "70px",
            height: "35px",
          }}
          variant="outlined"
            onClick={() => {
              saveHandler();
            }}
          >
            {" "}
            Save
          </Button> */}
          </Stack>
          <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
            {/* <DragDropContext onDragEnd={(results) => handleDragEnd(results)}> */}
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      "& td, & th": {
                        border: "1px solid #e0e0e0",
                        bgcolor: "#eaeced",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="left"
                    >
                      Objective Type
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="left"
                    >
                      Objective Title
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      Objective  Level
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <Droppable droppableId="tbody">
                  {(provided) => ( */}
                    <TableBody
                      // ref={provided.innerRef}
                      // {...provided.droppableProps}
                    >
                      {templateData &&
                        objectiveTitleData &&
                        data &&
                        objectiveDescription?.map((j: any, index: any) => {
                          return (
                            <>
                              {/* <Draggable
                                draggableId={j?.name?.objectiveTitle}
                                index={index}
                                key={j?.name?.objectiveTitle}
                              >
                                {(provided) => ( */}
                                  <TableRow
                                    // ref={provided.innerRef}
                                    // {...provided.draggableProps}
                                    sx={{
                                      "& td, & th": {
                                        border: "1px solid #e0e0e0",
                                      },
                                    }}
                                  >
                                    <TableCell
                                      width="150px"
                                      // {...provided.dragHandleProps}
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                      align="left"
                                    >
                                      {j?.objective_type && j?.objective_type?.name}
                                      {/* Knowledge of the job */}
                                    </TableCell>
                                    <TableCell
                                      width="150px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak:"break-word"
                                      }}
                                      align="left"
                                    >
                                             <Stack direction="row" alignItems="center" >
                       
                                      <IconButton
                                       style={{ padding:"4px" }}
                                        aria-describedby={id101}
                                        onClick={(e: any) => {
                                          setActiveObjectiveId(j._id);
                                          handleClickInfo11(e);
                                          setPopoverIndexs(index);
                                        }}
                                      >
                                        <img
                                          style={{ width: "12px" }}
                                          src={Infoicon}
                                          alt="icon"
                                        />
                                      </IconButton>
                                      <Typography 
                                style={{
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  textAlign: "left",
                                  wordBreak: "break-word",
                                }}
                                >
                                  {j?.name?.objectiveTitle}
                                  </Typography>
                                  </Stack>
                                      <Popover
                                        id={"id101"}
                                        open={
                                          popoverIndexs === index && openInfo101
                                        }
                                        anchorEl={anchorEl01}
                                        onClose={handleClose101}
                                        anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center",
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center",
                                        }}
                                        PaperProps={{
                                          style: {
                                            backgroundColor: "FEFCF8",
                                            boxShadow: "none",
                                            maxWidth: "400px",
                                            borderRadius: "5px",
                                          },
                                        }}
                                        sx={{
                                          // width: "60%",
                                          "& .MuiPopover-paper": {
                                            border: "1px solid #3e8cb5",
                                            backgroundColor: "#ffffff",
                                            // width:"30%"
                                          },
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            fontSize: "12px",
                                            fontFamily: "arial",
                                            padding: "5px",
                                          }}
                                        >
                                          {openInfo101 &&
                                            activeObjectiveId &&
                                            j._id === activeObjectiveId &&
                                            j?.name?.description}
                                        </Typography>
                                      </Popover>
                                    </TableCell>
                                    <TableCell
                                      width="50px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                      align="center"
                                    >
                                      <Stack direction="row" alignItems="center" justifyContent="center">
                                       {(j.level_1_isChecked ||
                                        j.level_2_isChecked ||
                                        j.level_3_isChecked ||
                                        j.level_4_isChecked) && (
                                          <IconButton
                                          style={{ padding:"4px" }}
                                            aria-describedby={id102}
                                            onClick={(e: any) => {
                                              setActiveObjectiveId2(j._id);
                                              handleClickInfo12(e);
                                              setPopoverIndexs(index);
                                            }}
                                          >
                                            <img
                                              style={{ width: "12px" }}
                                              src={Infoicon}
                                              alt="icon"
                                            />
                                          </IconButton>
                                        )}
                                      {j.level_1_isChecked && (
                                        <>
                                          {" "}
                                          <span>L1 </span>{" "}
                                        </>
                                      )}
                                      {j.level_2_isChecked && (
                                        <>
                                          {" "}
                                          <span>L2 </span>{" "}
                                        </>
                                      )}
                                      {j.level_3_isChecked && (
                                        <>
                                          {" "}
                                          <span>L3 </span>{" "}
                                        </>
                                      )}
                                      {j.level_4_isChecked && (
                                        <>
                                          {" "}
                                          <span>L4 </span>{" "}
                                        </>
                                      )}
                                     </Stack>
                                      <Popover
                                        id={"id102"}
                                        open={
                                          popoverIndexs === index && openInfo102
                                        }
                                        anchorEl={anchorEl02}
                                        onClose={handleClose102}
                                        anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center",
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center",
                                        }}
                                        PaperProps={{
                                          style: {
                                            backgroundColor: "FEFCF8",
                                            boxShadow: "none",
                                            maxWidth: "400px",
                                            borderRadius: "5px",
                                          },
                                        }}
                                        sx={{
                                          // width: "60%",
                                          "& .MuiPopover-paper": {
                                            border: "1px solid #3e8cb5",
                                            backgroundColor: "#ffffff",
                                            // width:"30%"
                                          },
                                        }}
                                      >
                                        <Typography
                                          style={{
                                            fontSize: "12px",
                                            fontFamily: "arial",
                                            padding: "5px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "arial",
                                              lineHeight: "20px",
                                            }}
                                          >
                                            {openInfo102 &&
                                              j._id === activeObjectiveId2 && (
                                                <>
                                                  {j.level_1_isChecked && (
                                                    <>
                                                      <span>L1:</span>
                                                      <span> <b>
                                                          {
                                                            j?.name?.level_1
                                                              ?.level_definition
                                                          }
                                                        </b>
                                                      </span>
                                                       
                                                      <br />
                                                      <ul
                                                        style={{
                                                          marginTop: "0px",
                                                          marginBottom: "0px",
                                                        }}
                                                      >
                                                        {j?.name?.level_1?.behavioral_objective.map(
                                                          (item: any) => {
                                                            return (
                                                              <li>{item}</li>
                                                            );
                                                          }
                                                        )}
                                                      </ul>
                                                    </>
                                                  )}
                                                  {j.level_2_isChecked && (
                                                    <>
                                                      <span>L2:</span>
                                                      <span>
                                                        <b>{
                                                            j?.name?.level_2
                                                              ?.level_definition
                                                          }
                                                        </b>
                                                      </span>
                                                          
                                                      <br />
                                                      <ul
                                                        style={{
                                                          marginTop: "0px",
                                                          marginBottom: "0px",
                                                        }}
                                                      >
                                                        {j?.name?.level_2?.behavioral_objective.map(
                                                          (item: any) => {
                                                            return (
                                                              <li>{item}</li>
                                                            );
                                                          }
                                                        )}
                                                      </ul>
                                                    </>
                                                  )}
                                                  {j.level_3_isChecked && (
                                                    <>
                                                      <span>L3:</span>
                                                      <span>
                                                        <b>{
                                                            j?.name?.level_3
                                                              ?.level_definition
                                                          }
                                                        </b>
                                                      </span>
                                                          
                                                      <br />
                                                      <ul
                                                        style={{
                                                          marginTop: "0px",
                                                          marginBottom: "0px",
                                                        }}
                                                      >
                                                        {j?.name?.level_3?.behavioral_objective.map(
                                                          (item: any) => {
                                                            return (
                                                              <li>{item}</li>
                                                            );
                                                          }
                                                        )}
                                                      </ul>
                                                    </>
                                                  )}
                                                  {j.level_4_isChecked && (
                                                    <>
                                                      <span>L4:</span>
                                                      <span>
                                                        <b>{
                                                            j?.name?.level_4
                                                              ?.level_definition
                                                          }
                                                        </b>
                                                      </span>
                                                          
                                                      <br />
                                                      <ul
                                                        style={{
                                                          marginTop: "0px",
                                                          marginBottom: "0px",
                                                        }}
                                                      >
                                                        {j?.name?.level_4?.behavioral_objective.map(
                                                          (item: any) => {
                                                            return (
                                                              <li>{item}</li>
                                                            );
                                                          }
                                                        )}
                                                      </ul>
                                                    </>
                                                  )}
                                                </>
                                              )}
                                          </div>
                                        </Typography>
                                      </Popover>
                                    </TableCell>
                                  </TableRow>
                                {/* )} */}
                              {/* </Draggable> */}
                            </>
                          );
                        })}
                    </TableBody>
                  {/* )} */}
                {/* </Droppable> */}
              </Table>
            {/* </DragDropContext> */}
          </TableContainer>

        {/* <AlertDialogSuccess
        isAlertOpen = {saveChangesAlert}
        handleAlertClose = {handleSaveAlertClose}>
          {message}
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={saveChangesAlert}
        autoHideDuration={3000}
        onClose={handleSaveAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleSaveAlertClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 

          <Typography
            style={{
              color: "#3e8cb5",
              fontSize: "16px",
              fontFamily: "Arial",
              paddingTop: "20px",
            }}
          >
            <b>Overall Feedback</b>
          </Typography>

          <Typography
            style={{
              fontSize: "16px",
              color: "#3e8cb5",
              paddingTop: "20px",
              fontFamily: "arial",
              wordBreak: "break-word",
            }}
          >
            <b>Feedback Questionnaire </b>
          </Typography>
          <Typography >
            {/* <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}

            {templateData &&
              templateData?.template?.feedback_questionnaire?.map((j: any) => {
                return (
                  <>
                    <div style={{ paddingTop: "15px" }}>
                    <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3}>
                      <input type="checkbox" checked/>
                        <Labels>

                          {j?.name?.name} 

                        </Labels>
                      </Grid>
                    </div>
                  </>
                );
              })}
            {/* </Grid> */}
          </Typography>
              {OtherRecommedation?.length !=0 &&
              <>
          <Typography
            style={{
              fontSize: "16px",
              color: "#3e8cb5",
              paddingBottom: "10px",
              paddingTop: "20px",
              fontFamily: "arial",
              wordBreak: "break-word",
            }}
          >
            <b>Further Recommendations </b>
          </Typography>
          <Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {templateData &&
                templateData?.template?.other_recommendation?.map((j: any) => {
                  return (
                    <>
                      <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3}>
                      <input type="checkbox" checked/>
                        <Labelsrec>{j?.name?.name}</Labelsrec>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </Typography>
          </>
          }
          {TrainingRecommendation?.length !=0 && 
          <>
          <Typography
            style={{
              fontSize: "16px",
              color: "#3e8cb5",
              paddingBottom: "10px",
              paddingTop: "20px",
              fontFamily: "arial",
              wordBreak: "break-word",
            }}
          >
            <b>Training Recommendations </b>
          </Typography>
          <Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {templateData &&
                templateData?.template?.training_recommendation?.map(
                  (j: any) => {
                    return (
                      <>
                        <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3}>
                          <input type="checkbox" checked/>
                          <Labelstrain>{j?.name?.title}</Labelstrain>
                        </Grid>
                      </>
                    );
                  }
                )}
            </Grid>
          </Typography>
          </>
          }
          <Typography
            style={{
              fontSize: "16px",
              color: "#3e8cb5",
              paddingBottom: "10px",
              paddingTop: "20px",
              fontFamily: "arial",
              wordBreak: "break-word",
            }}
          >
            <b>Potential Level </b>
          </Typography>
          <Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <>
                <Grid display="flex" item xs={2} sm={4} md={3}>
                  <Labels>
                    {templateData?.template?.potential == true ? "Yes" : "No"}
                  </Labels>
                </Grid>
              </>
            </Grid>
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

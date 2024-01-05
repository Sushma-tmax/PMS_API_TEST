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
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Infoicon from "./icons/Infoicon.svg";
import Popover from "@mui/material/Popover";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CREATE_TEMPLATE_1,
  EDIT_TEMPLATE_1,
  MASTER_NAV,
} from "../../constants/routes/Routing";
import AlertDialogSuccess from "../UI/DialogSuccess";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Left from "../../assets/Reviewericons/Left.svg";
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // paddingBottom: "6px",
  marginLeft: "5px",
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
export default function ObjectivePreviewTemplate() {
  const { id } = useParams();
  const location: any = useLocation();
  const fromTemplate = location.state?.name;
  console.log(location, "fromTemplate");
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
  formIsDirty);
  const [objectiveGroup, setObjectiveGroup] = useState<any>([]);
  const [objectiveType, setObjectiveType] = useState<any>([]);
  const [popoverIndexs, setPopoverIndexs] = useState<any>("");
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  const [saveChangesAlert, setSaveChangesAlert] = useState<any>(false);
  const [message, setMessage] = useState("");
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

  return (
    <div
      id="pdf"
      style={{
        backgroundColor: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        minHeight="50px"
        marginLeft="25px"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Master
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            Preview
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Box
        sx={{
          background: "#fff",
          padding: "35px",
          marginLeft: "25px",
          marginRight: "25px",
          minHeight: "100px",
          overflow: "hidden",
          marginBottom:"25px"
        }}
      >
        <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
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
                <TableCell width="350px" colSpan={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                    >
                      Objective Group
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                      }}
                    >
                      Weightage
                    </div>
                  </Stack>
                </TableCell>
                <TableCell  width="350px" colSpan={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                    >
                      Objective Group
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                      }}
                    >
                      Weightage
                    </div>
                  </Stack>
                </TableCell>
                <TableCell  width="350px" colSpan={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "left",
                      }}
                    >
                      Objective Group
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "right",
                      }}
                    >
                      Weightage
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell style={{ background: "#fdfdfd" }} rowSpan={7}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#3e8cb5",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Management Competencies
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell rowSpan={2}>
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Management
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell style={{ lineHeight: "40px" }}>
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Business Acumen
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Business Partnership
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell rowSpan={2}>
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Core Competencies
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell style={{ lineHeight: "40px" }}>
                  {" "}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Customer Focus
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Team Work
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Drive for Result
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "left",
                        wordBreak:"break-word"
                      }}
                    >
                      Fostering Innovation
                    </div>

                    <div
                      style={{
                        fontFamily: "Arial",
                        color: "#333333",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      20
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                    bgcolor: "#eaeced",
                  },
                }}
              >
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Objective Group
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "right",
                    }}
                  >
                    Weightage
                  </div>
                  </Stack>
                </TableCell>
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Objective Type
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "right",
                    }}
                  >
                    Weightage
                  </div>
                  </Stack>
                </TableCell>
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Objective Title
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      borderColor: "#F7F9FB",
                      color: "#3E8CB5",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "right",
                    }}
                  >
                    Weightage
                  </div>
                  </Stack>
                </TableCell>
               
                
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                sx={{
                  "& td, & th": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#3e8cb5",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                   Management Competencies
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#333333",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    20
                  </div>
                  </Stack>
                </TableCell>
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#333333",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                   Job Competencies
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#333333",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    15
                  </div>
                  </Stack>
                  
                </TableCell>
                <TableCell colSpan={2}>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">   
                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#333333",
                      fontSize: "14px",
                      textAlign: "left",
                    }}
                  >
                   Individual Objectives
                  </div>

                  <div
                    style={{
                      fontFamily: "Arial",
                      color: "#333333",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    20
                  </div>
                  </Stack>
                </TableCell>
                
                
                
               
              </TableRow>
            </TableBody>
          </Table> */}
        </TableContainer>

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
        <Typography style={{ paddingTop: "10px" }}>
          {/* <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}

          {templateData &&
            templateData?.template?.feedback_questionnaire?.map((j: any) => {
              return (
                <>
                  <div>
                  <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3}>
                      <input type="checkbox" checked />
                      <Labels>{j?.name?.name}</Labels>
                    </Grid>
                  </div>
                </>
              );
            })}
          {/* </Grid> */}
        </Typography>

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
                    <Grid
                      display="flex"
                      alignItems="center"
                      item
                      xs={2}
                      sm={4}
                      md={3}
                    >
                      <input type="checkbox" checked />
                      <Labelsrec>{j?.name?.name}</Labelsrec>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Typography>

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
              templateData?.template?.training_recommendation?.map((j: any) => {
                return (
                  <>
                     <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3}>
                      <input type="checkbox" checked />
                      <Labelstrain>{j?.name?.title}</Labelstrain>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Typography>

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
    </div>
  );
}

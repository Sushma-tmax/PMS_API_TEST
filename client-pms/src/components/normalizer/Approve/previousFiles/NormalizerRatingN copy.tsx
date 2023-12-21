import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  ArrowBackIosRounded,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormControlLabel, IconButton, Popover, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, Tabs, Tab, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
// import Infoicon from "../Icons/Infoicon.svg";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppraiserRejectsReviewerContext } from "../../../../context/AppraiserRejectsReviewer";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { useEffect, useState, useRef } from "react";
import { useAttachmentsNormalizerMutation, useCreateEmployeeAppraisalMutation, useGetObjectiveTitleQuery, useGetRatingScaleQuery, useNormalizerRejectionMutation } from "../../../../service";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import Infoicon from "../../manager/NormalizerRejection/Icons/Infoicon.svg"
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmployeeAppraisalQuery } from "../../../../service";

const Root = styled("div")(
  ({ theme }) => `
table {
  // font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  border-collapse: collapse;
  width: 231%;
  
}
td,
th {
  border: 1px solid #e0e0e0;
  text-align: left;
  // padding: 6px;
 
}
th {
  background-color: #f2f9fa;
}
`
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value1: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value1, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value1 !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value1 === index && (
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
export default function NormalizerRatingN(props: any) {
  // const NormalizerRatingN = (props:any) => {
  // const { empData: employeeData, employee_id, acceptButton, setacceptButton, rejectButton, setrejectButton } = useAppraiserRejectsNormalizerContext()
  const { setnavPrompt, navPrompt, value1, setValue1, handleChange } = props;
  const { employee_id } = useParams();
  const { data: employeeData } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");
  // const { empData: employeeData, employee_id } = useNormalizerContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);

  const [RejectionReason, setRejectionReason] = useState<any>("")
  const [upDateNormalizer] = useNormalizerRejectionMutation()
  console.log(isDrawerOpen)

  // console.log(employeeData, 'my test')
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const { data: ratingsData } = useGetRatingScaleQuery('')
  const [normalizerAttachments] = useAttachmentsNormalizerMutation();
  const [activeObjectiveDescription, setActiveObjectiveDescription] = useState('')
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState("");
  const [rating, setRating] = useState<any>("");
  const [updateMutation] = useCreateEmployeeAppraisalMutation()
  const [comments, setComments] = useState("");
  const [accept, setAccept] = useState("");
  const [objective, setObjective] = useState<any>("")
  const [ratingRed, setRatingRed] = useState<any>(false)
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState<string>('');
  const [fileSelected, setFileSelected] = useState<any>('');

  const [sendItem] = useCreateAzureBlobMutation();
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  console.log(ratingAppraiser, 'ratingAppraiser')
  const [anchorElReviewer, setanchorElReviewer] = React.useState<HTMLButtonElement | null>(null);
  const [attachmentsNormalizer] = useNormalizerRejectionMutation()
  const [anchorElNormaliser, setanchorElNormaliser] = React.useState<HTMLButtonElement | null>(null);
  const [ratingComments, setRatingComments] = useState<any>("");
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const inputRef = useRef<any>(null);
  const [normalizerAttachmentss, setnormalizerAttachmentss] = useState<any>("");
  const handleCloseNormaliser = () => {
    setanchorElNormaliser(null);
    setRatingComments1(null)
  };
  const openNormaliserDetails = Boolean(anchorElNormaliser);
  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null)
  };
  const openReviewerDetails = Boolean(anchorElReviewer);
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
        return employeeData.data.reviewer.objective_type.find(
            (item: any) => item.name._id === id
        );
    }
  };


  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
        console.log(id, "objectiveTitleData");
        return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  const getNormalizerAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.normalizer,'objectiveDescriptionobjectiveDescription')
      const data =  employeeData?.data?.normalizer?.attachments?.filter(
          (item: any) => item?.objective_description === id
      ).map((j:any) => {
        return {
          name: j.name,
          url: j.url
        }
      })
  return data
    }
  };
  const handleClickNormaliserDetails = (event: any, j: any) => {
    console.log(j,'jjjjr')
    setRatingComments1(employeeData && employeeData.data.normalizer.objective_description
      .filter(
        (i: any) => i.name._id === j.name._id
      )
      .map((k: any) => k.comments)[0])
      setnormalizerAttachmentss(
        employeeData &&
        employeeData?.data?.normalizer?.attachments
          .filter((i: any) => i?.objective_description === j.name._id)
          .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
      );
      setanchorElNormaliser(event.currentTarget);
  };
  const getReviewerAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.reviewer,'objectiveDescriptionobjectiveDescription')
      const data =  employeeData?.data?.reviewer?.attachments?.filter(
          (item: any) => item?.objective_description === id
      ).map((j:any) => {
        return {
          name: j.name,
          url: j.url

        }
      })

      return data

      // if(data) return data
      // else return  null
    }
  };
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
        setObjectiveDescription(() => {
            return employeeData.data.normalizer.objective_description.map(
                (i: any) => {
                    return {
                        ...i,
                        objective_title: findObjectiveTitleById(i.name.objective_title),
                        normalizer_attachment_url: getNormalizerAttachments(i.name._id),
                        reviewer_attachment_url: getReviewerAttachments(i.name._id),
                        objective_type: findObjectiveTypeById(i.name.objective_type)

                    };
                }
            );
        });
    }
  }, [employeeData, objectiveTitleData]);



  const openDrawer = () => {
    setIsDrawerOpen(true)
  }
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    // setnavPrompt(true)
    setRatingAppraiser('')
  }
  const ratingSubmitHandler = () => {
    //setnavPrompt(true)
    if (ratingAppraiser === ratingparams) {
      setrejectAlert(true);
      // setnavPrompt(true);
    } else {
      closeDrawer()

      // upDateNormalizer({
      //     objective_description: activeObjectiveDescription,
      //     objective_description_name: activeObjectiveDescriptionName,
      //     ratings: rating,
      //     comments: comments,
      //     rating_rejected: true,
      //     employee_id,
      // });
      // setRating("");
    }
  };
  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    //setnavPrompt(true);
    openDrawer();
    // setActiveObjectiveDescriptionName(objective.name._id);
    // setActiveObjectiveDescription(objective._id);
    // setComments(objective.comments);
    // setRating(objective.ratings._id);
    // let temp = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i._id === activeObjectiveDescription)
    //     .map((k: any) => k.reason_for_rejection)[0];
    // setRejectionReason(temp);
    // let reviewerRatingValue = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i.name._id === objective.name._id)
    //     .map((k: any) => {
    //         if (k.ratings) return k.ratings.rating;
    //     })[0];
    // setRatingAppraiser(reviewerRatingValue);
  };
  const acceptHandler = () => {
    // let temp = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i._id === activeObjectiveDescription)
    //     .map((k: any) => k.ratings._id)[0];


    // updateMutation({
    //     objective_description: activeObjectiveDescription,
    //     objective_description_name: activeObjectiveDescriptionName,
    //     rating_rejected: false,
    //     ratings: temp,
    //     comments: comments,
    //     id: employee_id,
    // })
    closeDrawer();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };


  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setRatingAppraiser('')
  };

  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);
  const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };

  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setreviewerAttachments(
        employeeData &&
        employeeData?.data?.reviewer?.attachments
          .filter((i: any) => i?.objective_description === j.name._id)
          .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
      );
  };

  const handleClose6 = () => {
    setAnchorEl6(null);

    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
);
const open7 = Boolean(anchorEl7);
const handleClickOpen7 = (event: React.MouseEvent<HTMLButtonElement>, j:any) => {
    // setOpen2true);
    setAnchorEl7(event.currentTarget);
    setnormalizerAttachmentss(
        employeeData &&
        employeeData?.data?.normalizer?.attachments
          .filter((i: any) => i?.objective_description === j.name._id)
          .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
      );
}; 

const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
};


  return (
    <React.Fragment>
      <Drawer
        anchor={'right'}

        open={isDrawerOpen}

      // sx={maxWidth: 300px}
      // onClose={toggleDrawer(anchor, false)}
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
          Normalizer Action
        </p>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText
              style={{
                color: "#333333",
                fontSize: "18px",
                fontFamily: "Arial",
              }}
            >
              You cannot put the same rating as the Reviewer. Please change
              the Rating.
            </DialogContentText>
          </DialogContent>
          <div style={{ alignItems: "center" }}>
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
                  color: "#3E8CB5",
                  marginRight: "10px",
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogClose}
              // onClick={() => {
              //   handleClickOpen1();
              //   handleClose();
              // }}
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        {accept === "Accept" && (
          <>
            <p style={{ paddingLeft: "33px" }}>Comments</p>

            <TextField
              multiline
              style={{ paddingLeft: "33px", width: "75%" }}
              value={comments}
              inputProps={{ maxLength: 512 }}

              onChange={(e) => {
                setComments(e.target.value);
                // setnavPrompt(true);
              }}
            // fullWidth
            />
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="33px"
              paddingTop="20px"
              spacing={2}
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
                onClick={() => acceptHandler()}
              >
                {" "}
                Accept
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
        )}


      </Drawer>
      <div style={{ backgroundColor: "#F1F1F1",height: "auto"  }}>

        <Container
          sx={{
            maxWidth: "96.5% !important",
            // height: "1408px",
            marginTop: "25px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
          }}
        >

          <h2
            style={{
              color: "#004c75",
              fontWeight: "400",
              opacity: "0.9",
              paddingTop: "30px",
            }}
          >
            Welcome To Performance Appraisal
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
                      {/* fullname */}
                      {employeeData?.data?.legal_full_name}
                    </span>
                    <span
                      style={{
                        color: "#b8b8b8",
                        fontSize: "12px",
                      }}
                    >
                      {/* jobtitle */}
                      {employeeData?.data?.job_title}{" "}
                      <span
                        style={{
                          borderRadius: "50%",
                          marginRight: "10px",
                          verticalAlign: "middle",
                          width: "4px",
                          height: "4px",
                          display: "inline-block",
                          background: "#b8b8b8",
                        }}
                      />
                      {/* division */}
                      {employeeData?.data?.division}
                    </span>
                    <span
                      style={{
                        color: "#b8b8b8",
                        fontSize: "12px",
                      }}
                    >
                      {/* employeecode */}
                      {employeeData?.data?.employee_code}
                    </span>
                  </Stack>
                </p>
              </Grid>
              <Grid item xs={1}>
                <p>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  //   onClick={createPDF}
                  >
                    Download
                  </Button>
                </p>
              </Grid>
            </Grid>
          </Box>
          <Typography
            style={{
              color: "#008E97",
              fontSize: "16px",
              fontFamily: "Arial",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                paddingLeft: "0px",
              }}
            >
              <Tabs
                value={value1}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#3e8cb5",
                  },
                }}
              >
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#3e8cb5",
                    },

                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    padding: "0px",
                    paddingRight: "5px",
                    fontWeight: "700",
                  }}
                  label="Ratings"
                  icon={
                    <IconButton
                      sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                      aria-describedby={id2}
                      onClick={handleClickInfo}
                    >
                      <img src={Infoicon} alt="icon" />
                    </IconButton>
                  }
                  iconPosition="end"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#3e8cb5",
                    },

                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    padding: "0px",
                    fontWeight: "700",
                  }}
                  label="Recommendations"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <Popover
              id={id2}
              open={openInfo}
              anchorEl={anchorEls}
              onClose={handleCloseInfo}
              PaperProps={{
                style: { width: "22%", height: "41%",marginTop: "55px" },
              }}
            >
              <TableContainer>
                {/* <Scrollbar style={{ width: "100%", height: "calc(100vh - 292px)" }}> */}
                <Table
                  sx={{ minWidth: 200 }}
                  size="small"
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#eaeced" }}>
                      {/* <TableCell
                      align="left"
                      sx={{
                        borderColor: "#F7F9FB",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "40px",
                      }}
                    >
                      {" "}
                      #
                    </TableCell> */}
                      <TableCell
                        align="left"
                        sx={{
                          width: "30px",
                        }}
                      >
                        <form>
                          <div
                            style={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Rating
                            {/* <option value="Training Title">Rating</option> */}
                          </div>
                        </form>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          width: "130px",
                        }}
                      >
                        <form>
                          <div
                            style={{
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Rating Title
                            {/* <option>Rating Scale Title</option> */}
                          </div>
                        </form>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ratingsData &&
                      ratingsData.data
                        .slice()
                        .sort(function (a: any, b: any) {
                          return a.rating - b.rating;
                        })
                        .map((row: any, index: any) => {
                          return (
                            <TableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th":
                                {
                                  borderColor: "lightgrey",
                                },
                              }}
                            >

                              <TableCell
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >
                                {/* <div style={{ width:'100px', wordWrap:'break-word'}} >{row.rating.toFixed(1)}</div> */}
                                <div
                                  style={{
                                    width: "70px",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {row.rating}
                                </div>
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >
                                <div
                                  style={{
                                    width: "200px",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {row.rating_scale}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Popover>
          </Typography>
          {value1 === 0 &&
            <Root sx={{ width: "43.3%" }}>
              <table>
                <thead
                  style={{
                    color: "#004C75",
                    fontSize: "15px",
                    fontWeight: "400",
                    opacity: "0.9",
                    height: "50px",
                  }}
                >


                  {/* <div style={{ backgroundColor: "#F1F1F1", }}>
            <Container
                sx={{
                    maxWidth: "96.5% !important",
                    // height: "1408px",
                    // height: "calc(100vh - 165px)",
                    background: "#fff",
                }} */}
                  <tr
                  >
                    <th
                      style={{
                        color: "#004C75",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "18%",
                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        // align="center"
                        >
                          <option value="Training Title">Objective Type</option>
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        color: "#004C75",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "18%",
                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontWeight: "100",
                            fontFamily: "regular",
                            fontSize: "14px",
                            color: "#004C75",
                            border: "none",
                            background: "none",
                            // margin:"-5px"
                          }}
                        >
                          <option value="Training Title">
                            Objective Description
                          </option>
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        color: "#004C75",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontWeight: "100",
                            fontFamily: "regular",
                            fontSize: "14px",
                            color: "#004C75",
                            border: "none",
                            background: "none",
                            // margin:"-5px"
                          }}
                        >
                          <option value="Training Title"> Reviewer Rating</option>
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        color: "#004C75",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontWeight: "100",
                            fontFamily: "regular",
                            fontSize: "14px",
                            color: "#004C75",
                            border: "none",
                            background: "none",
                            // margin:"-5px"
                          }}
                        >
                          <option value="Training Title">
                            Normalizer Rating
                          </option>
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        color: "#004C75",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "22%",

                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontWeight: "100",
                            fontFamily: "regular",
                            fontSize: "14px",
                            color: "#004C75",
                            border: "none",
                            background: "none",
                            // margin:"-5px"
                          }}
                        >
                          <option value="Training Title">
                            Normalizer Action
                          </option>
                        </text>
                      </form>
                    </th>
                  </tr>
                </thead>
                <tbody
                                style={{
                                    fontSize: "14px",
                                }}
                            >
                                {employeeData &&
                                    objectiveTitleData &&
                                    objectiveDescription.map((j: any, index: number) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td
                                                        // rowSpan={3}
                                                        style={{
                                                            color: "#004C75",
                                                            paddingLeft: "20px",
                                                            fontFamily: "regular",
                                                            fontSize: "15px",
                                                        }}
                                                    >
                                                        {j.objective_type.name.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: "20px",
                                                            opacity: "0.8",
                                                            fontSize: "14px",
                                                            fontFamily: "regular",
                                                        }}
                                                    >
                                                        {j?.name?.objectiveTitle}
                                                    </td>
                                                    <td>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <p>
                                                                <h3
                                                                    style={{

                                                                        opacity: "0.7",
                                                                        fontSize: "14px",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {employeeData &&
                                                                        employeeData.data.reviewer.objective_description
                                                                            .filter(
                                                                                (i: any) => i.name._id === j.name._id
                                                                            )
                                                                            .map((k: any) => {
                                                                                if (k.ratings) return k.ratings.rating
                                                                            })[0]
                                                                    }
                                                                </h3>
                                                                <p
                                                                    style={{
                                                                        fontSize: "12px",

                                                                        opacity: "0.7",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {/*Exceeding*/}
                                                                </p>
                                                            </p>

                                                            <h3
                                style={{
                                  fontSize: "12px",
                                  textDecoration: "underline",
                                  color: "#93DCFA",
                                  fontWeight: "200",
                                }}
                                aria-describedby={"ReviewerComments"}
                                // onClick={(e: any) => { handleClickReviewerDetails(e, j) }}

                              >
                                Details
                              </h3>

                              <Popover
                                id={"ReviewerComments"}
                                open={openReviewerDetails}
                                anchorEl={anchorElReviewer}
                                onClose={handleCloseReviewer}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                                PaperProps={{
                                    style: {
                                      backgroundColor: "transparent",
                                      boxShadow: "none",
                                      borderRadius: 0,
                                    },
                                  }}
                                  sx={{
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #FFCF7A",
                                      backgroundColor: "#f8f8ff",
                                    },
                                  }}
                              >
                                <Typography sx={{ p: 2, backgroundColor: "#f8f8ff" }}>
                                    Comments : {ratingComments}<br/>
                                    Attachments: {reviewerAttachments}
                                </Typography>
                              </Popover>

                                                            <AttachFileIcon
                                                                style={{ color: "#93DCFA" }}
                                                                aria-describedby={"id"}
                                                                onClick={(e: any) => handleClickOpen6(e,j)}
                                                            />

                                                            <Popover
                                                                id={"id"}
                                                                open={open6}
                                                                anchorEl={anchorEl6}
                                                                onClose={handleClose6}
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
                                                                        backgroundColor: "transparent",
                                                                        boxShadow: "none",
                                                                        borderRadius: 0,
                                                                    },
                                                                }}
                                                                sx={{
                                                                    "& .MuiPopover-paper": {
                                                                        border: "1px solid #FFCF7A",
                                                                        backgroundColor: "#f8f8ff",

                                                                    },
                                                                }}
                                                            > 

                                                                <Typography
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: "#f8f8ff",
                                                                    }}
                                                                >
                                                                     Attachments: {reviewerAttachments}
                                                                    {/* {employeeData?.data?.reviewer?.attachments
                                                                        // .filter((i: any) => {

                                                                        //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                                                        //   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                                                        // })
                                                                        .map((k: any) => {
                                                                            return <a href={k.url}> {k.name} </a>;
                                                                        })} */}
                                             {/* {j.reviewer_attachment_url.map((k:any) => <a href={k.url}> {k.name} </a>)} */}

                                                                </Typography>
                                                            </Popover>

                                                        </Stack>
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <p>
                                                                <h3
                                                                    style={{

                                                                        opacity: "0.7",
                                                                        fontSize: "14px",
                                                                        fontFamily: "regular",
                                                                        // @ts-ignore
                                                                        color: j.rating_rejected === true && "#FF0000"
                                                                    }}
                                                                >
                                                                    {j.ratings && j.ratings.rating}
                                                                </h3>
                                                                <p
                                                                    style={{
                                                                        fontSize: "12px",

                                                                        opacity: "0.7",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {/*Exceeding*/}
                                                                </p>
                                                            </p>

                                                            <h3
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textDecoration: "underline",
                                                                    color: "#93DCFA",
                                                                    fontWeight: "200",
                                                                }}
                                                                aria-describedby={"NormaliserComments"}
                                                                onClick={(e: any) => {
                                                                    handleClickNormaliserDetails(e, j)
                                                                }}
                                                            >
                                                                Details
                                                            </h3>
                                                            <Popover
                                                                id={"NormaliserComments"}
                                                                open={openNormaliserDetails}
                                                                anchorEl={anchorElNormaliser}
                                                                onClose={handleCloseNormaliser}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'center',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'center',
                                                                }}
                                                                PaperProps={{
                                                                    style: {
                                                                      backgroundColor: "transparent",
                                                                      boxShadow: "none",
                                                                      borderRadius: 0,
                                                                    },
                                                                  }}
                                                                  sx={{
                                                                    "& .MuiPopover-paper": {
                                                                      border: "1px solid #FFCF7A",
                                                                      backgroundColor: "#f8f8ff",
                                                                    },
                                                                  }}
                                                            >
                                                                <Typography sx={{ p: 2, backgroundColor: "#f8f8ff" }}>
                                                                    Comments: {ratingComments1}<br/>
                                                                    {/* Attachments:{normalizerAttachmentss} */}
                                                                   
                                                                    </Typography>

                                                            </Popover>
                                                            <AttachFileIcon
                                                                style={{ color: "#93DCFA" }}
                                                                aria-describedby={"id"}
                                                                onClick={(e: any) => handleClickOpen7(e,j)}
                                                            />

                                                            <Popover
                                                                id={"id"}
                                                                open={open7}
                                                                anchorEl={anchorEl7}
                                                                onClose={handleClose7}
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
                                                                        backgroundColor: "transparent",
                                                                        boxShadow: "none",
                                                                        borderRadius: 0,
                                                                    },
                                                                }}
                                                                sx={{
                                                                    "& .MuiPopover-paper": {
                                                                        border: "1px solid #FFCF7A",
                                                                        backgroundColor: "#f8f8ff",

                                                                    },
                                                                }}
                                                            > 

                                                                <Typography
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: "#f8f8ff",
                                                                    }}
                                                                >
                                                                     Attachments:{normalizerAttachmentss}
                                                                    {/* {employeeData?.data?.normalizer?.attachments
                                                                        // .filter((i: any) => {

                                                                        //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                                                        //   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                                                        // })
                                                                        .map((k: any) => {
                                                                            return <a href={k.url}> {k.name} </a>;
                                                                        })} */}
                                            {/* {j.normalizer_attachment_url.map((k:any) => <a href={k.url}> {k.name} </a>)} */}

                                                                </Typography>
                                                            </Popover>
                                                        </Stack>
                                                    </td>
                                                    <td style={{ paddingLeft: "20px", }}>
                                                        <>
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                            >

                                                                <span>
                                                                    <Stack direction="row"
                                                                        spacing={2}>
                                                                        <Button
                                                                            size="small"
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
                                                                            // onClick={() => openDrawerHandler(j)}
                                                                        >
                                                                            Accept
                                                                        </Button>
                                                                        <Button
                                                                            size="small"
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
                                                                            // onClick={() => openDrawerHandlerreject(j)}
                                                                        >
                                                                            Reject
                                                                        </Button>
                                                                    </Stack>
                                                                </span>

                                                            </Stack>

                                                          
                                                        </>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                            </tbody>

              </table>

            </Root>
          }



        </Container>

      </div>



    </React.Fragment>
  )
}
// export default NormalizerRatingN
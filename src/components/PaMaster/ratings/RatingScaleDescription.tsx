/* eslint-disable */
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Container, Snackbar, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Grid } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MASTER_NAV,
  RATING_SCALE_DESCRIPTION_VIEW_PAGE,
} from "../../../constants/routes/Routing";
import PAMaster from "../../UI/PAMaster";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Addmore from "../../../assets/Images/Addmore.svg";
import Minus from "../../../assets/appraiser/Reviewericons/Minus.svg";
import Edit from "../../../assets/Images/Edit.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { Scrollbar } from "react-scrollbars-custom";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { DriveEta, FormatListBulleted } from "@mui/icons-material";
import { styled } from "@mui/system";
import Dialog from '@mui/material/Dialog';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg"
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { makeStyles } from '@mui/styles';
import {useGetActiveCalenderQuery} from "../../../service";
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

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

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

export default function RatingScaleDescription(props: any) {
  const {
    onSubmit,
    ratingsData,
    defaultValue,
    element,
    value,
    error1,
    error2,
    errorShow,
    showEditError,
    open,
    handleClickClose,
    setnavPrompt,
    navPrompt,
    from,
    savingData
  } = props;
  //to check live calendar
  const { data: ActiveCData } = useGetActiveCalenderQuery('');
  console.log(ActiveCData, "ActiveCData")
  let activeCal = ActiveCData?.data?.filter((i: any) => {
    return i?.status === "Live"
  })
  console.log(activeCal?.length,"ActiveCData")
   //to check live calendar
  const classes = useStyles();
  console.log(error1, "errorrrr");
  console.log(navPrompt, "new")
  console.log(errorShow, "error2")
  const [rating, setRating] = React.useState<any>("");
  const [ratingScale, setRatingScale] = React.useState("");
  const [definition, setDefinition] = React.useState("");
  const [maxValue, setMaxValue] = useState<any>(100);
  const [minValue, setMinValue] = useState<any>(1);
  const [error, setError] = React.useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [charRatingScale, setCharRatingScale] = React.useState<any>("");
  const [charDesc, setCharDesc] = React.useState<any>("");
  const [newerror, setNewerror] = React.useState<any>("");
  const [charRating, setCharRating] = React.useState<any>("");
  const [duplicateError1, setDuplicateError1] = useState<any>(error1);
  const [duplicateError2, setDuplicateError2] = useState<any>(error2);
  const [showError1, setShowError1] = useState<any>(false)
  const [addDisable, setaddDisable] = useState<any>(false);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [formValues, setFormValues] = React.useState<any>([
    {
      rating: "",
      rating_scale: "",
      definition: "",
    },
  ]);

  console.log(formValues, "formValuesformValues");

  console.log(formValues, "formValuesformValues");

  const [textfeildErrorRating, settextfeildErrorRating] = useState<any>("");
  const [textfeildErrorScale, settextfeildErrorScale] = useState<any>("");
  const [textfeildErrorDesc, settextfeildErrorDesc] = useState("");
  const [ratingIndex, setRatingIndex] = useState<any>("");

  //prompt ----functions
  // const [navPrompt, setnavPrompt] = useState(false);
  // const [promptRating, setpromptRating] = useState<any>("");
  // const [promptScale, setpromptScale] = useState<any>("");
  // const [promptDefenition, setpromptDefenition] = useState<any>("");
  // useEffect(() => {
  //   if (promptRating !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [promptRating, promptScale,promptDefenition]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions

  //console.log(setName);
  // const errorHandler = () => {

  //   if (element === "") {
  //     return settextfeildError(true);
  //   } else {
  //     return settextfeildError(false);
  //   }
  // };

  console.log(showEditError, 'showEditError')

  //   useEffect(() => {
  // if (errorShow) {
  //   setShowError1(true)
  // }
  //   })
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
  };

  useEffect(() => {
    if (defaultValue) {
      setShowAdd(true);
    } else {
      setShowAdd(false);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (error1 === true) {
      if (textfeildErrorRating != "" || textfeildErrorDesc != "") {
        setDuplicateError1(false);

      } else {
        setDuplicateError1(true);
        setOpen2(true);

      }
    } else if (error1 === false) {
      setDuplicateError1(false);
      // setOpen2(false);
    }
    console.log("DuplicateError1", duplicateError1, error1);
  }, [error1]);

  useEffect(() => {
    if (error2 === true) {
      if (textfeildErrorRating != "" || textfeildErrorDesc != "") {
        setDuplicateError2(false);
      } else {
        setDuplicateError2(true);
        setOpen2(true);

      }
    } else if (error2 === false) {
      setDuplicateError2(false);
    }
    console.log("DuplicateError2", duplicateError2, error2);
  }, [error2]);

  const scrollEnd = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView();
  }, [formValues]);

  const handleRatingChange = (i: any, e: any) => {
    const newFormValues = [...formValues];
    //@ts-ignore
    //  else{
    // setNewerror(false);
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);

    // }

    //   const validatingRatingScale = newFormValues.map((j:any, ix:any)=> {
    //   if (!j.rating_scale.match(/^[a-zA-Z\s]+$/)) {
    //   return {
    //     ...j,
    //     rating_Scale_Error:true
    //   }
    // }
    //   return j

    // })
  };

  useEffect(() => {
    if (formValues !== undefined) {
      const F = formValues
        .filter((j: any) => {
          console.log(j.rating, j.rating_scale, "ratingScaleeeee");
          return j.rating === "" || j.rating_scale === "";
        })
        .map((i: any) => {
          return i;
        });
      console.log(F, "ratingScaleeeeeeeeee");
      if (F.length === 0) {
        setaddDisable(false);
      } else {
        setaddDisable(true);
      }

      console.log(addDisable, "ratingScaleeee");
    }
  }, [formValues]);

  const addFormFields = () => {
    const res = formValues.map((i: any) => {
      console.log(i, "iiii")
      console.log(
        formValues.filter((j: any) => {
          return j.rating_scale.length > 0 && j.rating.length > 0;
        }),
        "filtered"
      );
      console.log(i, "rating length");
      if (i.rating === "" || i.rating_scale === "") {
        if (i.rating === "") {
          settextfeildErrorRating("Enter the Rating text field");
        } else if (i.rating_scale === "") {
          settextfeildErrorScale("Enter Rating Scale text field");
        }
      }
      else if (
        formValues.filter((j: any) => {
          return j.rating_scale.length > 0 && j.rating.length > 0;
        }).length === formValues.length
      ) {
        console.log(i.rating.length, "rating length");

        console.log(i, "rating length");
        settextfeildErrorRating("");
        settextfeildErrorScale("");
        setFormValues([
          ...formValues,
          { rating: "", rating_scale: "", definition: "" },
        ]);
      }
      // else if (addDisable === false) {
      //   setShowAddAlert(false);
      //   settextfeildErrorScale("");
      //   setFormValues([
      //     ...formValues,
      //     { rating: "", rating_scale: "", definition: "" },
      //   ]);
      // } else if (addDisable === true) {
      //   setShowAddAlert(true);
      //   // if (rating === "" || ratingScale === "" || rating > 100) {
      //   //   settextfeildErrorRating("Rating text field is empty");
      //   //   settextfeildErrorScale("Rating Scale text field is empty");
  
      //   // }
      // }
    });

  
    // if (rating === "" || ratingScale === "" || rating > 100) {
    //   settextfeildErrorRating("Rating text field is empty");
    //   settextfeildErrorScale("Rating Scale text field is empty");
    // } else {
    //   settextfeildErrorScale("");
    //   setFormValues([
    //     ...formValues,
    //     { rating: "", rating_scale: "", definition: "" },
    //   ]);
    // }
  };

  useEffect(() => {
    if (rating !== "" && ratingScale !== "") {
      setShowAddAlert(false);
    }
  }, [rating, ratingScale]);

  const removeFormFields = (i: any) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  // console.log(defaultValue, "defaultValue");
  useEffect(() => {
    if (defaultValue) {
      setFormValues([
        {
          rating: defaultValue.data.rating,
          rating_scale: defaultValue.data.rating_scale,
          definition: defaultValue.data.definition,
        },
      ]);
    }
  }, [defaultValue]);
  console.log(formValues, "defaultValue");

  // useEffect(()=>{
  //   if(formValues){
  //     if(formValues[0]?.rating == formValues[1]?.rating ){
  //       setDuplicateError1(true);
  //       setOpen2(true);
  //     }else{
  //       setOpen2(false);
  //     }
  //   }
  // },[formValues])
  // useEffect(() => {
  //   if (defaultValue) {
  //     setFormValues(defaultValue);

  //   }
  // }, [defaultValue]);
  // console.log(rating, "ratings getttt");

  // const handlevalidaterating = (v:any) =>{
  //  // console.log(v,'ioo9o9o')
  //   if (v.match(/[0-9]/)) {
  //     setError("");
  //   } else {
  //     setError("Only numbers are allowed");
  //   }

  // }

  // useEffect(()=> {

  //   if ((rating === "")||(rating > 0 && rating.match(/^(\d+(\.\d+)?)$/))) {

  //     setCharRating("");
  //     settextfeildErrorRating("")
  //   }
  //   else {
  //     setCharRating("Numbers must be greater than 0 .")
  //   }
  // },[rating])

  useEffect(() => {
    if (rating === "" || (rating && rating > 0)) {
      setCharRating("");
      settextfeildErrorRating("");
      if (rating > 100) {
        setCharRating("Rating must be less than 100 .");
      }
    } else {
      setCharRating("Rating must be a number and should be greater than 0 .");
    }
  }, [rating]);

  // useEffect(()=> {

  //   if ((ratingScale === "")||(ratingScale.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/))) {

  //     setCharRatingScale("");
  //     settextfeildErrorScale("")
  //   }
  //   else {
  //     setCharRatingScale("Only characters are allowed")
  //   }
  // },[ratingScale])

  // useEffect(()=> {

  //   if ((definition === "")||(definition.match(/^[-_,\|\\.!@"'?#$%^&*=+`\[~}{:;/><()a-zA-Z\s\]]+$/))) {

  //     setCharDesc("");
  //     settextfeildErrorDesc("")
  //   }
  //   else {
  //     setCharDesc("Only characters are allowed")
  //   }
  // },[definition])

  // const handleRatingEmpty = () => {
  //   if (rating && rating === "") {
  //     settextfeildErrorRating("Enter the text field")
  //   }
  //   else if (rating != "") {
  //     settextfeildErrorRating("")
  //   }
  // }

  // const handlevalidateratingscale = (r: any, i: any) => {
  //   //console.log(r,'yyuii')
  //   setRatingScale(r);
  //   if (r.match(/^[-,;':&/.!()/a-zA-Z\s]+$/)) {
  //     setError1("");
  //   } else {
  //     setError1("Only characters are allowed");
  //   }
  // };

  // const handlev = (w: any) => {
  //   //  console.log(w,'klllll')
  //   if (w.match(/^[-,";:&'/.!()/a-zA-Z\s]+$/)) {
  //     setError2("");
  //   } else {
  //     setError2("Only characters are allowed");
  //   }
  // };
  console.log(formValues, "fffffffffffffffffff");

  function findDuplicates(arr: any) {
    return arr.filter((currentValue: any, currentIndex: any) =>
      arr.indexOf(currentValue) !== currentIndex);
  }
  const errorHandler = () => {

    const res = formValues.map((i: any) => {
      console.log(i, "iiii")
      console.log(
        formValues.filter((j: any) => {
          return j.rating_scale.length > 0 && j.rating.length > 0;
        }),
        "filtered"
      );
      console.log(i, "rating length");
      if (i.rating === "" || i.rating_scale === "") {
        if (i.rating === "") {
          settextfeildErrorRating("Enter the Rating text field");
        } 
        if (i.rating_scale === "") {
          settextfeildErrorScale("Enter Rating Scale text field");
        }
      }
      else if (
        formValues.filter((j: any) => {
          return j.rating_scale.length > 0 && j.rating.length > 0;
        }).length === formValues.length
      ) {
        console.log(i.rating.length, "rating length");

        console.log(i, "rating length");
        settextfeildErrorRating("");
        settextfeildErrorScale("");
      }
    });
    let ratings = formValues.map((item: any) => item.rating)
    if (findDuplicates(ratings).length > 0) {
      setOpen2(true);
      setNewerror(true)
    } else if (
      formValues.filter((j: any) => {
        return j.rating_scale.length > 0 && j.rating.length > 0;
      }).length === formValues.length
    ) {
      setNewerror(false)
      const intFormValues = formValues.map((j: any) => {
        return {
          rating: j.rating.trim(),
          rating_scale: j.rating_scale.trim(),
          definition: j.definition,
        };
      });
      if (intFormValues.some((j: any) => j.rating_scale === "")) {
        // Handle empty rating_scale, e.g. show an error message
      } else {
        onSubmit(intFormValues);
        setnavPrompt(false);
      }
    
    }
  };

  // const errorHandler1 = () => {

  //   if (rating || ratingScale) {
  //     if (rating === "") {
  //       settextfeildErrorRating("Enter the text field");

  //     }
  //     else if (ratingScale === "") {
  //       settextfeildErrorScale('Enter text field');

  //     }
  //     else {
  //       settextfeildErrorRating("");
  //       settextfeildErrorScale("");
  //       const intFormValues = formValues.map((j: any) => {

  //         return {
  //           rating: j.rating,
  //           rating_scale: j.rating_scale,
  //           definition: j.definition
  //         }
  //       }
  //       )
  //       onSubmit(intFormValues)
  //     }
  //   }
  // }

  useEffect(() => {
    if (ratingIndex) {
    }
  }, [ratingIndex]);

  // useEffect(()=> {
  //   if (textfeildErrorRating === true || textfeildErrorScale === true) {
  //     setDuplicateError1(false);
  //     setDuplicateError2(false)
  //   }
  // },[textfeildErrorRating,textfeildErrorScale,duplicateError1,duplicateError2]

  const errHandler = (obj: any) => {
    console.log("running");

    if (defaultValue) {
      if (
        defaultValue.data.rating === "" ||
        defaultValue.data.rating_scale === ""
      ) {
        if (defaultValue.data.rating === "") {
          settextfeildErrorRating("Enter Rating text field");
        } 
        if (defaultValue.data.rating_scale === "") {
          settextfeildErrorScale("Enter RatingScale text field");
        }
      } else {
        // settextfeildErrorRating("");
        // settextfeildErrorScale("");
        const intFormValues = formValues.map((j: any) => {
          return {
            rating: j.rating,
            rating_scale: j.rating_scale.trim(),
            definition: j.definition,
          };
        });

        if (intFormValues.some((j: any) => j.rating_scale === "")) {
          // Handle empty rating_scale, e.g. show an error message
        } else {
          onSubmit(intFormValues);
        }
      }
      // }
    }
  };

  // const intFormValues = formValues.map((j: any) => {

  //   return {
  //     rating: j.rating,
  //     rating_scale: j.rating_scale,
  //     definition: j.definition
  //   }
  // })
  // onSubmit(intFormValues);

  // useEffect(() => {
  //   if (rating !== "") {
  //     settextfeildErrorRating("")
  //   }
  //   if (ratingScale !== "") {
  //     settextfeildErrorScale('')
  //   }
  // }, [rating, ratingScale])

  // useEffect(()=> {
  //     if (textfeildErrorRating !=  "" ) {
  //       setDuplicateError1(false),
  //       setDuplicateError2(false)
  //     }
  //   },[textfeildErrorRating,textfeildErrorScale,textfeildErrorDesc])

  return (
    <>
      <PAMaster
        name={from + " Rating Scale"}
        nav={`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`}
        secondName={"Rating Scale"}
      />
      <Box
        sx={{
          // maxWidth: "95% !important",
          // width: "100%",
          height: "calc(100vh - 180px)",
          background: "#fff",
          position: "relative",
          padding: "20px",
          marginLeft: "25px",
          marginRight: "25px"
          //boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          //marginTop: "15px",
        }}
      >
        <Grid item xs={12}>
          <Stack spacing={1}>
            {/* <div
              style={{
                paddingTop: "20px",
                position: "absolute",
                width: "96.5%",
              }}
            >
             {error ? (
                <Alert severity="error">
                  You must type all Text Field values — check it out!
                </Alert>
              ) : (
                ""
              )} 
               {duplicateError1 ? (
                <Alert style={{
                  fontFamily:"Arial",
                }}  severity="error">{errorShow?.data?.message}!</Alert>
              ) : (
                ""
              )}
              {duplicateError2 ? (
                <Alert style={{
                  fontFamily:"Arial",
                }}  severity="error">{showEditError?.data?.message}!</Alert>
              ) : (
                ""
              )}

              {showAddAlert && (
                <Alert  style={{
                  fontFamily:"Arial",
                }} severity="error">
                  Rating and Rating Scale is mandatory!
                </Alert>
              )} 
            </div> */}

            <Dialog
              open={open2}
              //  onClose={handleClose2} 
              // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
              PaperProps={{
                style: {
                  // borderColor:'blue',
                  //border:'1px solid',
                  boxShadow: "none",
                  borderRadius: "6px",
                  //marginTop: "155px",
                  maxWidth: "0px",
                  minWidth: "26%",
                  margin: "0px",
                  padding: "30px",
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
              // aria-labelledby="alert-dialog-title"
              // aria-describedby="alert-dialog-description"
            >
              {/* <DialogTitle
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                        id="alert-dialog-title"
                      >
                        <IconButton onClick={handleClose3}  >
                          <img src={Closeicon} alt="icon" />
                        </IconButton>
                      </DialogTitle> */}
              <Stack>
                <DialogContent><DialogContentText
                  id="alert-dialog-description"
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    //  paddingBottom: "12px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    wordBreak: "break-word",
                    //height: "100px",
                    //  width :"300px",
                    alignItems: "center",
                    overflowY: "hidden",
                  }}
                >
                  <div >
                    {duplicateError1 ? (
                      <div style={{
                        fontFamily: "Arial",
                      }}  >
                        {/* {errorShow?.data?.message}. */}

                        {
                          (errorShow?.data?.message) ? <div>{errorShow?.data?.message}.</div> :
                            <div>
                              {"This Rating has been already added."}
                            </div>
                        }
                      </div>
                    ) : (
                      ""
                    )}
                    {duplicateError2 ? (
                      <div style={{
                        fontFamily: "Arial",
                      }}  >{showEditError?.data?.message}.</div>
                    ) : (
                      ""
                    )}
                    {newerror && (
                      <div style={{
                        fontFamily: "Arial",
                      }}>
                        Rating values have to be unique.
                      </div>
                    )}
                    {showAddAlert && (
                      <div style={{
                        fontFamily: "Arial",
                      }}>
                        Rating and Rating Scale is mandatory.
                      </div>
                    )}
                  </div>
                </DialogContentText></DialogContent>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <Button
                    style={{

                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3e8cb5",
                      // marginRight: "10px",
                      background: "transparent",
                      width: "70px",
                      height: "35px",
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleClose3}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Stack>
            </Dialog>

            {/* <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={0}
              paddingTop="70px"
            >
              <Typography
                style={{
                  color: "#3E8CB5",
                  fontSize: "18px",
                  fontFamily: "Arial",
                  // marginRight: "71%",
                }}
              >
                Add Rating Scale Description
              </Typography>

              <div>
                <Link to={`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`}>
                  <Button
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
                  >
                    View
                  </Button>
                </Link>
              </div>
            </Stack> */}

            {/* <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            > */}
            {/* <p style={{ marginTop: "-20px" }}>
                <RatingScaleDropDown />
              </p>
              <p>
                <TextField
                  id="outlined-basic"
                  label="Rating Scale"
                  placeholder="e.g. delivering"
                  value={ratingScale}
                  variant="outlined"
                  style={{ width: 540, height: 70 }}
                  onChange={(e) => setRatingScale(e.target.value)}
                />
              </p>
              <p>
                <TextField
                  id="outlined-basic"
                  label="Definition"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: 540 }}
                />
              </p> */}

            {/* <p> </p>
              <h2
                style={{
                  color: "#014D76",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginRight: "80%",
                  paddingBottom: "10px",
                }}
              >
                Add Rating Scale Description
              </h2> */}


            <Scroll>
              <Scrollbar
                style={{ width: "100%", height: "calc(100vh - 240px)" }}
              >
                <Table size="small" stickyHeader aria-label="simple table">
                  <TableHead sx={{ bgcolor: "#eaeced" }}>
                    <TableRow
                      sx={{
                        "& td, & th": {
                          border: "1px solid #e0e0e0",
                          bgcolor: "#eaeced",
                          //   whiteSpace:"nowrap"
                        },
                      }}
                    >
                      {/* <TableCell
                          sx={{
                            fontFamily: "regular",
                           
                            color: "#004C75",
                            fontSize: "12px",
                          }}
                        >
                          #
                        </TableCell> */}
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          bgcolor: "#eaeced",
                        }}
                      >
                        Rating
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          bgcolor: "#eaeced",
                        }}
                      >
                        Rating Scale Title
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          bgcolor: "#eaeced",
                        }}
                      >
                        Definition
                      </TableCell>

                      {showAdd || (
                        <TableCell
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
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formValues.map((element: any, index: any) => {
                      // setpromptRating(element.rating );
                      // setpromptDefenition(element.definition);
                      // setpromptScale(element.rating_scale);
                      return (
                        <TableRow
                        //   sx={{
                        //     "& td, & th": {
                        //         border: "1px solid #e0e0e0",

                        //     },
                        // }}
                        >
                          {/* <TableCell
                              component="th"
                              scope="row"
                              width="2%"
                              sx={{
                                border: 1,
                                borderColor: "lightgrey",
                                fontFamily: "regular",
                                color: "#33333",
                                opacity: "80%",
                              }}
                            >
                              {index + 1}
                            </TableCell> */}
                          <TableCell
                            align="left"
                            width="25%"

                            sx={{
                              // padding: 2,
                              fontFamily: "Arial",
                              color: "#333333",
                              fontSize: "14px",
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            {/* <Box style={{ minHeight: "100px" }}> */}
                            <TextField
                              sx={{
                                "& .MuiInputBase-input": {
                                  textTransform: "none",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  backgroundColor: "#f8f8f8",
                                  padding: "8px",
                                  borderRadius: "5px",
                                },
                              }}
                              id="outlined-basic"
                              placeholder="Enter Rating"
                              size="small"
                              multiline
                              disabled={from == "Edit" && activeCal?.length > 0}
                              name="rating"
                              value={
                                defaultValue
                                  ? element.rating
                                  : element.rating.replace(/[^0-9.]/gi, "")
                              }
                              // value={element.rating}
                              //  value={rating}
                              // type="number"
                              inputProps={{ maxLength: 3 }}
                              autoComplete="off"
                              style={{ width: "100%" }}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                              onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                  errHandler(formValues);
                                  errorHandler();
                                  event.preventDefault()
                                  console.log(
                                    "Enter Button has been clicked"
                                  );
                                }
                                // return /[0-9a-zA-Z]/i.test(event.key)
                              }}
                              onChange={(e) => {
                                handleRatingChange(index, e);
                                // handleRatingEmpty(element.rating)
                                // handlevalidateRating(element.rating);
                                setRating(element.rating);
                                setRatingIndex(index);
                                setDuplicateError1(false);
                                setDuplicateError2(false);
                                setnavPrompt(true);
                                // if (element.rating === "") {
                                //   setRating(e.target.value);
                                //   return;
                                // }
                                // const rating = e.target.value;
                                // if (rating > maxValue) {
                                //   setRating(maxValue);
                                // } else if (rating < minValue) {
                                //   setRating(minValue);
                                // } else {
                                //   setRating(rating);
                                // }
                              }}
                              onPaste={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onCopy={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              // onKeyDown ={(e) => {
                              //   ((e.keyCode > 64 && e.keyCode < 95)
                              //   //  || (e.which > 96 && e.which < 126)
                              //   // e.keyCode === 69 ||
                              //   //   e.keyCode === 187 ||
                              //   //   e.keyCode === 189
                              //     ) &&
                              //   e.preventDefault()
                              // }}
                              helperText={
                                (element.rating === "" &&
                                  textfeildErrorRating) ||
                                (element.rating === rating && charRating)
                              }
                              error={
                                (element.rating === "" &&
                                  textfeildErrorRating) ||
                                (element.rating === rating && charRating)
                              }
                            />
                            {/* </Box> */}
                          </TableCell>
                          <TableCell
                            align="left"
                            width="25%"
                            sx={{
                              // padding: 1,
                              fontFamily: "Arial",
                              color: "#333333",
                              fontSize: "14px",
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            {/* <Box style={{ minHeight: "100px" }}> */}
                            <TextField
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  textTransform: "none",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  backgroundColor: "#f8f8f8",
                                  padding: "8px",
                                  borderRadius: "5px",
                                },
                              }}
                              placeholder="Enter Rating Scale Title"
                              inputProps={{ maxLength: 256 }}
                              autoComplete="off"
                              multiline
                              size="small"
                              id="outlined-basic"
                              name="rating_scale"
                              value={element.rating_scale}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                              // style={{  }}
                              onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                  errHandler(formValues);
                                  errorHandler();
                                  event.preventDefault()
                                  console.log(
                                    "Enter Button has been clicked"
                                  );
                                }
                              }}
                              onChange={(e) => {
                                handleRatingChange(index, e);
                                // handlevalidateratingscale(
                                //   element.rating_scale, index
                                // );
                                setRatingScale(element.rating_scale);
                                setRatingIndex(index);
                                // setOpen2(true);
                                setDuplicateError1(false);
                                setDuplicateError2(false);
                                setnavPrompt(true);
                              }}
                              helperText={
                                element.rating_scale === "" &&
                                textfeildErrorScale
                              }
                              error={
                                element.rating_scale === "" &&
                                textfeildErrorScale
                              }
                            />
                            {/* </Box> */}
                          </TableCell>
                          <TableCell
                            align="left"
                            width="35%"
                            sx={{
                              // padding: 1,
                              fontFamily: "Arial",
                              color: "#333333",
                              fontSize: "14px",
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            {/* <Box style={{ minHeight: "100px" }}> */}
                            <TextField
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  textTransform: "none",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  backgroundColor: "#f8f8f8",
                                  padding: "8px",
                                  borderRadius: "5px",
                                },
                              }}
                              placeholder="Enter Definition"
                              inputProps={{ maxLength: 512 }}
                              autoComplete="off"
                              size="small"
                              id="outlined-basic"
                              name="definition"
                              multiline
                              value={element.definition}
                              helperText={
                                definition === element.definition && charDesc
                              }
                              error={
                                definition === element.definition && charDesc
                              }
                              onKeyPress={(event) => {
                                var key = event.keyCode || event.which;
                                if (key === 13) {
                                  errHandler(formValues);
                                  errorHandler();
                                  event.preventDefault()
                                  console.log(
                                    "Enter Button has been clicked"
                                  );
                                }
                              }}
                              onChange={(e) => {
                                handleRatingChange(index, e);
                                // handlev(element.definition);
                                setDefinition(element.definition);
                                setnavPrompt(true);
                              }}
                              variant="standard"
                              InputProps={{
                                disableUnderline: true, // <== added this
                              }}
                            />
                            {/* </Box> */}
                          </TableCell>
                          {showAdd || (
                            <TableCell
                              align="center"
                              width="10%"
                              sx={{
                                border: "1px solid #e0e0e0",
                              }}
                            >
                              <>
                                {formValues.length - 1 === index &&
                                  formValues.length < 6 && (
                                    <Tooltip title="Add">
                                      <IconButton
                                        disabled={rating > 100}
                                        onClick={() => addFormFields()}
                                      >
                                        <img style={{ maxWidth: "22px" }} src={Addmore} alt="icon" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                {formValues.length !== 1 && (
                                  <Tooltip title="Remove">
                                    <IconButton
                                      onClick={() => removeFormFields(index)}
                                    >
                                      <img style={{ maxWidth: "22px" }} src={Minus} alt="icon" />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                    <div ref={scrollEnd}></div>
                  </TableBody>
                </Table>
                <Stack

                  alignItems="center"
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  paddingTop="30px"
                >
                  <Button
                    disabled={charRating || open || savingData}
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
                      errHandler(formValues);
                      errorHandler();
                    }}
                  >
                    Save
                  </Button>
                  <Link to={`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`}>
                    <Button
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
                    >
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              </Scrollbar>
            </Scroll>




            {/* </Stack> */}
          </Stack>
        </Grid>

        {/* <AlertDialogSuccess
          isAlertOpen={open}
          handleAlertClose={handleClickClose}
        >
         Changes were successfully saved.
        </AlertDialogSuccess> */}
        <Snackbar
        className={classes.customSnackbar}
        open={open}
        autoHideDuration={3000}
        onClose={handleClickClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleClickClose}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b> Changes were successfully saved.</b>
        </Alert>
      </Snackbar> 
      </Box>
    </>
  );
}

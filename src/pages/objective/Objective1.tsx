import React, { useEffect, useState } from "react";
import {
  useCreateObjectiveTypeMutation,
  useGetObjectiveGroupQuery,
  useCreateObjectiveGroupMutation,
  useDeleteObjectiveGroupMutation,
  useGetObjectiveTypeQuery,
  useGetObjectiveDescriptionQuery,
  useDeleteObjectiveDescriptionMutation,
  useDeleteObjectiveTypeMutation,
  useUpdateObjectiveGroupMutation,
  useUpdateObjectiveTypeMutation,
  useCreateObjectiveTitleMutation,
  useGetObjectiveTitleQuery,
  useUpdateObjectiveTitleMutation,
  useDeleteObjectiveTitleMutation,
  useUpdateObjectiveDescriptionMutation,
  useCreateObjectiveDescriptionMutation,
} from "../../service/";
import Grid from "@mui/material/Grid";
// import {
//     ObjectiveTitle,
//     ObjectiveGroup1,
//     ObjectiveType1,
// } from '../../components/objective1';

import ObjectiveTitle from "../../components/PaMaster/objectiveSettings/ObjectiveTitle";
import ObjectiveGroup1 from "../../components/PaMaster/objectiveSettings/ObjectiveGroup1";
import ObjectiveType1 from "../../components/PaMaster/objectiveSettings/ObjectiveType1";
import Objectiveviewbutton from "../../components/PaMaster/objectiveSettings/Objectiveviewbutton";

import { Alert, Box, Button, Container, Stack } from "@mui/material";
import PAMaster from "../../components/UI/PAMaster";
import { Link, useParams } from "react-router-dom";
import { LEVELS_VIEW_ALL } from "../../constants/routes/Routing";
import NewObjectiveDescription from "../../components/PaMaster/objectiveSettings/ObjectiveLevels";
import ObjectiveLevels from "../../components/PaMaster/objectiveSettings/ObjectiveLevels";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"

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

const Objectives = () => {
  //prompt ------functions
  const [navPrompt, setnavPrompt] = useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    // "Please save the changes before you leave the page.",
       "Any changes you have made will not be saved if you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const { id } = useParams();

  const [
    objectiveGroupMutation,
    { data, isLoading, isError: objectiveGroupError1 },
  ] = useCreateObjectiveGroupMutation();
  const [objectiveGroupDelete, { isError: delGroupError }] =
    useDeleteObjectiveGroupMutation();
  const [updateObjectiveDescription, { isError: errorObjectiveTitle1 }] =
    useUpdateObjectiveDescriptionMutation();
  const [
    createObjectiveDescription,
    { isSuccess, isError: errorObjectiveDescription1 },
  ] = useCreateObjectiveDescriptionMutation();
  const {
    data: objectiveType,
    isLoading: ObjectiveTypeLoading,
    refetch: ObjectiveTypeRefetch,
  } = useGetObjectiveTypeQuery("");

  const {
    data: ObjectiveGroupData,
    isLoading: ObjectiveGroupLoading,
    error: ObjectiveGroupError,
    refetch,
  } = useGetObjectiveGroupQuery("");

  console.log(objectiveType, "dta");

  const [
    createObjectiveType,
    {
      data: objectiveGroupData,
      isLoading: objectiveGroupLoading,
      isError: errorObjectiveType1,
    },
  ] = useCreateObjectiveTypeMutation();

  const [editObjectiveGroup, { isError: objectiveGroupError2 }] =
    useUpdateObjectiveGroupMutation();

  // const [objectiveDescriptionDelete] = useDeleteObjectiveDescriptionMutation();
  const {
    data: objectiveDescriptionData,
    refetch: ObjectiveDescriptionRefetch,
  } = useGetObjectiveDescriptionQuery("");
  const [objectiveTypeDelete, { isError: delTypeError }] =
    useDeleteObjectiveTypeMutation();
  const [objectivetypeEdit, { isError: errorObjectiveType2 }] =
    useUpdateObjectiveTypeMutation();

    //For success alert dialog 
const [openobjGroup, setOpenobjGroup] = useState(false);
const handleClickobjGroupClose = () => {
  setOpenobjGroup(false);
};
const [openobjType, setOpenobjType] = useState(false);
const handleClickobjTypeClose = () => {
  setOpenobjType(false);
  setnavPrompt(false)
};
const [openobjTitle, setOpenobjTitle] = useState(false);
const handleClickobjTitleClose = () => {
  setOpenobjTitle(false);
};
 //For delete success alert dialog 
 const [openobjGroupdel, setOpenobjGroupdel] = useState(false);
const handleClickobjGroupdelClose = () => {
  setOpenobjGroupdel(false);
};
const [openobjTypedel, setOpenobjTypedel] = useState(false);
const handleClickobjTypedelClose = () => {
  setOpenobjTypedel(false);
};
const [openobjTitledel, setOpenobjTitledel] = useState(false);
const handleClickobjTitledelClose = () => {
  setOpenobjTitledel(false);
}
  const objectiveGroupClickHandler = (name: string) => {
    objectiveGroupMutation({
      name,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjGroup(true)
    })
    refetch();
    console.log("objectiveGroupClickHandler");
  };
  const objectiveGroupDeleteHandler = (id: string) => {
    console.log("objectiveGroupDeleteHandler", id);
    const result = objectiveGroupDelete({
      id,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjGroupdel(true)
    });

    console.log(result);
    refetch();
  };

  const objectiveTypeClickHandler = (name: string, objective_group: string) => {
    createObjectiveType({
      name,
      objective_group,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjType(true)
    })
    ObjectiveTypeRefetch();
  };

  const objectiveTypeDeleteHandler = (id: string) => {
    console.log("objectiveTypeDeleteHandler", id);
    const result = objectiveTypeDelete(id).then((res: any) => {
      res.error ? <> </> :
      setOpenobjTypedel(true)
    });

    console.log(result);
  };

  const objectiveGroupEditHandler = (group: any) => {
    let name = group.name;
    let id = group.id;

    editObjectiveGroup({
      name,
      id,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjGroup(true)
    });
  };

  const objectiveTypeEditHandler = (type: any) => {
    let name = type.name;
    let objective_group = type.objective_group;
    let id = type.id;

    objectivetypeEdit({
      name,
      objective_group,
      id,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjType(true)
    });
  };

  const objectiveTitleEditHandler = (
    objectiveTitle: any,
    description: any,
    objective_type: any,
    objectiveTitleId: any,
    isTitleChecked: any,
    isTitleActive: any,
  ) => {
    console.log(isTitleChecked, "isTitleChecked");
    updateObjectiveDescription({
      objectiveTitle: objectiveTitle.trim(),
      description: description,
      objective_type: objective_type,
      isTitleChecked: isTitleChecked,
      isTitleActive: isTitleActive,
      id: objectiveTitleId,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjTitle(true)
    });
  };
  const objectiveTitleActiveHandler = (



    objectiveTitleId: any,

    activeOuterCheckbox: any,
  ) => {
    //console.log(isTitleChecked, "isTitleChecked");
    updateObjectiveDescription({


      isTitleActive: activeOuterCheckbox,
      id: objectiveTitleId,
    });
  };
  const objectiveTitleCreateHandler = (objectivTitleItem: any) => {
    console.log(objectivTitleItem, "objectivTitleItem");
    createObjectiveDescription({
      description: objectivTitleItem.description,
      objective_type: objectivTitleItem.objective_type,
      objectiveTitle: objectivTitleItem.objectiveTitle,
      isTitleChecked: objectivTitleItem.isTitleChecked,
      isTitleActive: objectivTitleItem.isTitleActive,
    }).then((res: any) => {
      res.error ? <> </> :
      setOpenobjTitle(true)
    })
  };

  const [deleteDescTitle, { isError: delTitleError , error: displayTitleError}] =
    useDeleteObjectiveDescriptionMutation();

  const deleteDescriptionTitleHandler = (id: string) => {
    deleteDescTitle(id).then((res: any) => {
      res.error ? <> </> :
      setOpenobjTitledel(true)
    });
  };

  const [deleteLevels] = useUpdateObjectiveDescriptionMutation();
  const deleteLevelsHandler = (levels: any) => {
    let level_1 = levels.level_1;
    let level_2 = levels.level_2;
    let level_3 = levels.level_3;
    let level_4 = levels.level_4;
    let id = levels.newId;
    //  deleteLevels ({
    //   level_1: levels.level_1,
    //   level_2: levels.level_2,
    //   level_3: levels.level_3,
    //   level_4: levels.level_4,
    //   id: levels._id
    // });
    deleteLevels({
      level_1,
      level_2,
      level_3,
      level_4,
      id,
    });
  };

  const { data: objectiveDescription } = useGetObjectiveDescriptionQuery("");

  const { data: objectiveTitle } = useGetObjectiveTitleQuery("");
  //validation
  const [duplicateError1, setDuplicateError1] =
    useState<any>(objectiveGroupError1);
  const [duplicateError2, setDuplicateError2] = useState(objectiveGroupError2);
  const [delGroup, setDelGroup] = useState(delGroupError);
  const [duplicateError3, setDuplicateError3] =
    useState<any>(errorObjectiveType1);
  const [duplicateError4, setDuplicateError4] = useState(errorObjectiveType2);
  const [delType, setDelType] = useState(delTypeError);
  const [duplicateError5, setDuplicateError5] =
    useState<any>(errorObjectiveTitle1);
  const [duplicateError6, setDuplicateError6] = useState(
    errorObjectiveDescription1
  );
  const [delTitle, setDelTitle] = useState(delTitleError);
  console.log(
    duplicateError6,
    errorObjectiveDescription1,
    "errorObjectiveDescription1"
  );
  console.log(
    objectiveGroupError1,
    objectiveGroupError2,
    "objectiveGroupError1"
  );
  //validation
  const [open2, setOpen2] = React.useState(false);
  const [message, setMessage] = useState<any>("")



  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
    setDuplicateError1(false);
    setDuplicateError2(false);
    setDelGroup(false);
    setDuplicateError3(false);
    setDuplicateError4(false);
    setDelType(false);
    setDuplicateError5(false);
    setDuplicateError6(false);
    setDelTitle(false);

  };
  // dialoguebox  


  return (
    <>
      <div style={{ background: "#F1F1F1", 
minHeight: "100px",
          overflow: "hidden",
           height: "auto", }}>
        <PAMaster name={"Objectives Setting"} />

        <Box
          sx={{
            // maxWidth: "95% !important",
            // width: "100%",
            // height: "35rem",
            background: "#FFF",
            padding: "20px",
            marginLeft:"25px",
          marginRight:"25px",
          marginBottom:"25px"
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              paddingTop: "10px",
              padding: "0px",
              marginTop: "10px",
              height: "33px",
            }}
          >
            <span
              style={{
                color: "#3E8CB5",
                fontSize: "18px",
                fontFamily: "Arial"
              }}
            >
              Objectives List
            </span>
            <div>
              <Dialog
                open={open2}
                // onClose={handleClose2}
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
                          margin:"0px",
                          padding:"30px",
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
                <DialogContent>
                  <DialogContentText
                  id="alert-dialog-description"
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


                  {ObjectiveGroupData?.data?.length === 0 ? (
                    <div>
                      There is no Objective Group added.
                    </div>) : (""
                  )}
                  {objectiveType?.data?.length === 0 ? (
                    <div>
                      There is no Objective Type added.
                    </div>) : (""
                  )}
                  {objectiveDescriptionData?.data?.length === 0 ? (
                    <div>
                      There is no Objective Title added.
                    </div>) : (""
                  )}
                  {duplicateError1 && (
                    <div>
                      Entered Objective Group already exists.
                    </div>
                  )}
                  {duplicateError2 && (
                    <div>
                      Entered Objective Group already exists.
                    </div>
                  )}
                  {delGroup && (
                    <div>
                      
                      The objective group is mapped to the objective type and cannot be deleted.
                    </div>
                  )}

                  {duplicateError3 && (
                    <div>
                      Entered Objective Type already exists.
                    </div>
                  )}
                  {duplicateError4 && (
                    <div>
                      Entered Objective Type already exists.
                    </div>
                  )}
                  {delType && (
                    <div>
                      {" "}
                      The objective type is mapped to the objective title and cannot be deleted.
                    </div>
                  )}

                  {duplicateError5 && (
                    <div>
                      {" "}
                      Entered Objective Title already exists.
                    </div>
                  )}

                  {duplicateError6 && (
                    <div>
                      {" "}
                      Entered Objective Title already exists.
                    </div>
                  )}
                  {delTitle && (
                    <div >
                      {" "}
                    {/* @ts-ignore */}
                     {displayTitleError?.data?.error}
                    </div>
                  )}
                </DialogContentText></DialogContent>
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
                      color:"#3E8CB5",
                      background:"transparent",
                      width:"70px",
                      height:"35px"
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleClose3}
                  >
                    Ok
                  </Button>
                </DialogActions>

              </Dialog>
            </div>

            {/* {ObjectiveGroupData?.data?.length === 0 ? (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                There is no Objective Group added!
              </Alert> ) : ( ""
            )}
            {objectiveType?.data?.length === 0 ? (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                There is no Objective Type added!
              </Alert> ) : ( ""
            )}
            {objectiveDescriptionData?.data?.length === 0 ? (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                There is no Objective Title added!
              </Alert> ) : ( ""
            )}
            {duplicateError1 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                Entered Objective Group already exists!
              </Alert>
            )}
            {duplicateError2 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                Entered Objective Group already exists!
              </Alert>
            )}
            {delGroup && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                {" "}
                The Objective Group is linked to Objective Type, cannot be
                deleted!!{" "}
              </Alert>
            )}

            {duplicateError3 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                Entered Objective Type already exists!
              </Alert>
            )}
            {duplicateError4 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                Entered Objective Type already exists!
              </Alert>
            )}
            {delType && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                {" "}
                The Objective Type is linked to Objective Title, cannot be
                deleted!!{" "}
              </Alert>
            )}

            {duplicateError5 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                {" "}
                Entered Objective Title already exists{" "}
              </Alert>
            )}

            {duplicateError6 && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                {" "}
                Entered Objective Title already exists{" "}
              </Alert>
            )}
            {delTitle && (
              <Alert
                sx={{
                  padding: "0px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                severity="error"
              >
                {" "}
                The Objective Title is linked to Appraisal, cannot be deleted!!{" "}
              </Alert>
            )} */}
            <Link to={`${LEVELS_VIEW_ALL}`}>
              <Button
                style={{
                  color: "#3E8CB5",
                  borderColor: "#3E8CB5",
                  fontSize: "15px",
                  textTransform: "none",
                  fontFamily: "Arial",
                }}
                variant="outlined"
              >
                View Objectives Mapping
              </Button>
            </Link>
          </Stack>
          {/* <Grid>
            <Grid container>
              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <ObjectiveGroup1
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveGroupLoading}
                  onSubmit={objectiveGroupClickHandler}
                  onDelete={objectiveGroupDeleteHandler}
                  onEdit={objectiveGroupEditHandler}
                  errorGroup1={objectiveGroupError1}
                  errorGroup2={objectiveGroupError2}
                />
              </Grid>
              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <ObjectiveType1
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveTypeLoading}
                  objectiveTypeData={objectiveType}
                  onSubmit={objectiveTypeClickHandler}
                  onDelete={objectiveTypeDeleteHandler}
                  onEdit={objectiveTypeEditHandler}
                  errorType1={errorObjectiveType1}
                  errorType2={errorObjectiveType2}
                />
              </Grid>
              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <ObjectiveTitle
                  objectiveTitleCreate={objectiveTitleCreate}
                  objectiveTitleData={objectiveTitle}
                  objectiveTypeData={objectiveType}
                  onDelete={objectiveTitleDeleteHandler}
                  onEdit={objectiveTitleEditHandler}
                  titleError1={titleError1}
                  titleError2={titleError2}
                />
              </Grid>

              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <NewObjectiveDescription
                  objectiveTitleCreate={objectiveTitleCreate}
                  objectiveTitleData={objectiveTitle}
                  objectiveDescriptionData = {objectiveDescriptionData}
                  onDelete={objectiveTitleDeleteHandler}
                  onEdit={objectiveTitleEditHandler}
                  titleError1={titleError1}
                  titleError2={titleError2}
                />
              </Grid>

              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <Objectiveviewbutton />
              </Grid>
            </Grid>
          </Grid> */}
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} paddingLeft="0px" paddingRight="10px">
                <ObjectiveGroup1
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveGroupLoading}
                  onSubmit={objectiveGroupClickHandler}
                  onDelete={objectiveGroupDeleteHandler}
                  onEdit={objectiveGroupEditHandler}
                  errorGroup1={objectiveGroupError1}
                  errorGroup2={objectiveGroupError2}
                  delGroupError={delGroupError}
                  duplicateError1={duplicateError1}
                  setDuplicateError1={setDuplicateError1}
                  duplicateError2={duplicateError2}
                  setDuplicateError2={setDuplicateError2}
                  delGroup={delGroup}
                  setDelGroup={setDelGroup}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  open2={open2}
                  setOpen2={setOpen2}
                  openobjGroup={openobjGroup}
                  handleClickobjGroupClose={handleClickobjGroupClose}
                  openobjGroupdel={openobjGroupdel}
                  handleClickobjGroupdelClose={handleClickobjGroupdelClose}
                />
              </Grid>
              <Grid item xs={12} md={4} paddingLeft="10px" paddingRight="10px">
                <ObjectiveType1
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveTypeLoading}
                  objectiveTypeData={objectiveType}
                  onSubmit={objectiveTypeClickHandler}
                  onDelete={objectiveTypeDeleteHandler}
                  onEdit={objectiveTypeEditHandler}
                  errorType1={errorObjectiveType1}
                  errorType2={errorObjectiveType2}
                  delTypeError={delTypeError}
                  duplicateError1={duplicateError3}
                  setDuplicateError1={setDuplicateError3}
                  duplicateError2={duplicateError4}
                  setDuplicateError2={setDuplicateError4}
                  delType={delType}
                  setDelType={setDelType}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  open2={open2}
                  setOpen2={setOpen2}
                  openobjType={openobjType}
                  handleClickobjTypeClose={handleClickobjTypeClose}
                  openobjTypedel={openobjTypedel}
                  handleClickobjTypedelClose={handleClickobjTypedelClose}
                />
              </Grid>
              <Grid item xs={12} md={4} paddingLeft="10px" paddingRight="0px">
                <ObjectiveTitle
                  objectiveDescriptionData={objectiveDescriptionData}
                  objectiveTypeData={objectiveType}
                  onDelete={deleteDescriptionTitleHandler}
                  onEdit={objectiveTitleEditHandler}
                  onEditActive={objectiveTitleActiveHandler}
                  onSubmit={objectiveTitleCreateHandler}
                  titleError1={errorObjectiveTitle1}
                  titleError2={errorObjectiveDescription1}
                  delTitleError={delTitleError}
                  displayTitleError = {displayTitleError}
                  duplicateError1={duplicateError5}
                  setDuplicateError1={setDuplicateError5}
                  duplicateError2={duplicateError6}
                  setDuplicateError2={setDuplicateError6}
                  delTitle={delTitle}
                  setDelTitle={setDelTitle}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  open2={open2}
                  setOpen2={setOpen2}
                  openobjTitle={openobjTitle}
                  handleClickobjTitleClose={handleClickobjTitleClose}
                  openobjTitledel={openobjTitledel}
                  handleClickobjTitledelClose={handleClickobjTitledelClose}
                />
              </Grid>

              {/* <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <NewObjectiveDescription
                  objectiveTitleData={objectiveTitle}
                  objectiveDescriptionData={objectiveDescriptionData}
                  onDelete={deleteLevelsHandler}            
                  titleError1={errorObjectiveTitle1}
                  titleError2={errorObjectiveTitle1}
                  objectiveTypeData={objectiveType}
                
                />
              </Grid> */}

              <Grid item xs={3} paddingLeft="10px" paddingRight="10px">
                <Objectiveviewbutton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Objectives;

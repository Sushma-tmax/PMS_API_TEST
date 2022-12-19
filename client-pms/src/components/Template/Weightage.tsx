// import * as React from "react";
// import Box, { BoxProps } from "@mui/material/Box";
// import { IconButton, TextField } from "@mui/material";
// import { styled } from "@mui/system";
// import { useState } from "react";
// import { spawn } from "child_process";
// import { useEffect } from "react";
// import { Button } from "@mui/material";
// import { Scrollbar } from "react-scrollbars-custom";
// import Leftarrownew from "../../assets/Images/Leftarrownew.svg";
// const Text = styled("div")({
//   "& .MuiOutlinedInput-root": {
//     height: "30px",
//     width: "56px !important",
//     marginRight: "8px",
//   },
// });
// function Item(props: BoxProps) {
//   const { sx, ...other } = props;
//   return (
//       <Box
//           sx={{
//             border: "1px solid #e0e0e0",
//             minWidth: "150px",
//             maxWidth: "auto",
//             padding: "8px",
//             textAlign: "center",
//             display: "flex",
//             justifyContent: "space-between",
//             ...sx,
//           }}
//           {...other}
//       />
//   );
// }
// export default function GridAutoFlow(props: any) {
//   // const { data } = props;
//   const { data, singleTemplateData, tab, setTabs, saveDraft } = props;
//
//   const [ConStyle, setConStyle] = useState(false);
//   const [arrow, setArrow] = useState(true);
//   const [arrow1, setArrow1] = useState(true);
//
//
//   const [activeFocus, setActiveFocus] = useState<any>(0);
//
//   const [activeFocus1, setActiveFocus1] = useState<any>(0);
//   const [activeFocus2, setActiveFocus2] = useState<any>(0);
//   const [objectiveGroup, setObjectiveGroup] = React.useState<any>([]);
//   const [activeObjectiveType, setActiveObjectiveType] = React.useState("");
//   const [activeObjectiveGroup, setActiveObjectiveGroup] = React.useState("");
//   const [objectiveType, setObjectiveType] = React.useState<any>([]);
//   const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
//       []
//   );
//   //
//   // for ( let i = 0; i < objectiveType.length; i++) {
//   //     console.log(objectiveType && objectiveType[i].objective_description, 'wholaaaaaaaaaaaa')
//   // }
//   console.log(tab, "objectiveGroup");
//   console.log(objectiveType, "objectiveType");
//   console.log(objectiveDescription, "objectiveDescription");
//   const spn = 8;
//   console.log(objectiveDescription, "objective");
//   const ObjectiveGroupRow = styled("div")({
//
//     display: "grid",
//     paddingLeft:"10px"
//
//     display: "grid"
//
//     // gridTemplateColumns: "repeat(7, 1fr)",
//   });
//   const ObjectiveTypeRow = styled("div")({
//
//     display: "grid",
//     paddingLeft:"10px"
//
//     display: "grid", paddingLeft:"10px"
//
//
//     // gridTemplateColumns: "repeat(7, 1fr)",
//   });
//   const ObjectiveDescriptionRow = styled("div")({
//
//     display: "grid",
//     paddingLeft:"10px"
//
//     display: "grid",paddingLeft:"10px"
//
//     // gridTemplateColumns: "repeat(7, 1fr)",
//   });
//   const Container = styled("div")({
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//   });
//   const ObjectiveGroupContainer = styled("div")({
//     height: "100%",
//     width: "150px",
//   });
//   const ObjectiveGroupContainer1 = styled("div")({
//     width: "150px",
//     gridRow: `3 span/ ${spn}`,
//   });
//   const filterObjectiveType = (data: any) => {
//     if (data && activeObjectiveGroup) {
//       const res = data.filter((i: any) => {
//         // console.log(i.objective_type._id , 'id', valueData);
//         return i.name.objective_group === activeObjectiveGroup;
//       });
//       // console.log(res, 'descriptions')
//       return res;
//     }
//   };
//   const filterObjectiveDescription = (data: any) => {
//     if (data && activeObjectiveType) {
//       console.log(data, "data");
//       const res = data.filter((i: any) => {
//         // console.log(i.objective_type._id , 'id', valueData);
//         return i.name.objective_type === activeObjectiveType;
//       });
//       // console.log(res, 'descriptions')
//       return res;
//     }
//   };
//   const find = (arr: any) => {
//     if (arr && objectiveType) {
//       console.log(arr, "arr");
//       return objectiveType.map((i: any) => {
//         return arr === i._id ? i.value : null;
//       });
//       // arr.findIndex()
//     }
//   };
//   const getObjectiveTypeIndex = (id: string, objective: any) => {
//     const f = objective.findIndex((i: any) => {
//       console.log(i, "value");
//       const j = i._id === id;
//       console.log(j, "j`````````````");
//       return j;
//     });
//     console.log(f, "f");
//     return f;
//   };
//   useEffect(() => {
//     if (singleTemplateData) {
//       setObjectiveGroup(singleTemplateData.template.weightage.objective_group);
//       setObjectiveType(singleTemplateData.template.weightage.objective_type);
//       setObjectiveDescription(
//           singleTemplateData.template.weightage.objective_description
//       );
//     }
//   }, [singleTemplateData]);
//   const colorHandler = (id: any) => {
//     setConStyle(true);
//   };
//
//
//
//   console.log(objectiveGroup, "ggtrht");
//
//   const arrowHandler = (id: any) => {
//
//     // if (objectiveGroup && objectiveGroup === id) {
//     //    setArrow(false)
//     // }
//
//     setArrow(false)
//
//   }
//   const arrowHandler1 = (id: any) => {
//
//     // if (objectiveGroup && objectiveGroup === id) {
//     //    setArrow(false)
//
//     // function changeBackground(e:any) {
//     //   e.target.style.background = 'red';
//
//     // }
//
//     setArrow1(false)
//
//   }
//   console.log(objectiveGroup, 'ggtrht')
//
//
//
//   // hoverhandler = () => {
//
//   // }
//
//
//   return (
//       <>
//       {/*<div style={{ backgroundColor: "#F2F6F8", color: "#014D76" }}>
//
//         <Item style={{ alignItems: "center", maxHeight: "20px" }}>
//           <p>Objective Group</p>
//           <p style={{paddingLeft:"80px"}} > Weightage</p>
//
//           <p style={{paddingRight:"90px"}}> Objective Type</p>
//           <p> Weightage</p>
//
//           <p  style={{paddingRight:"60px"}}>Objective Description</p>
//           <p> Weightage</p>
//         </Item>
//   </div>*/}
//
//
//       <Item style={{ alignItems: "center", maxHeight: "20px" }}>
//         <p>Objective Group</p>
//         <p style={{paddingLeft:"80px"}} > Weightage</p>
//         <p style={{paddingRight:"90px"}}> Objective Type</p>
//         <p> Weightage</p>
//         <p  style={{paddingRight:"60px"}}>Objective Description</p>
//         <p> Weightage</p>
//       </Item>
//       </div>*/}
//
//   <Container>
//     {/* <Button onClick={() => setTabs(tab + 1)} >Save </Button> */}
//     <ObjectiveGroupRow>
//       {/*<Item>Job Competencies</Item>*/}
//       {/*<ObjectiveGroupContainer1>*/}
//       {/*    <Item>Core Competencies</Item>*/}
//       {/*</ObjectiveGroupContainer1>*/}
//       <div>
//         <div style={{ color: "#004C75", fontSize: "13px" }}>
//           <Item style={{ alignItems: "center", maxHeight: "20px" }}>
//             <p>Objective Group</p>
//
//             <p> Weightage</p>
//           </Item>
//         </div>
//         {objectiveGroup &&
//             objectiveGroup.map((j: any, mapIndex: any) => {
//               console.log(j._id, "j");
//               return (
//                   <>
//                     <div>
//
//                       <Item
//                           style={{
//                             alignItems: "center",
//                             //@ts-ignore
//                             background:
//                                 ConStyle &&
//                                 activeObjectiveGroup === j.name._id &&
//                                 "#F5F8FA",
//                           }}
//                       >
//                         {/* @ts-ignore */}
//                         <p
//                             style={{
//                               alignItems: "center",
//
//                               textAlign:"left",
//
//
//                               // @ts-ignore
//                               color:
//                                   ConStyle &&
//                                   activeObjectiveGroup === j.name._id &&
//                                   "#004C75",
//                               fontSize: "16px",
//                               minWidth: "150px",
//
//                             }}
//                             onClick={() => {
//                               setActiveObjectiveGroup(j.name._id);
//                               setActiveObjectiveType("");
//                               colorHandler(j.name._id);
//                               // arrowHandler(j.name._id);
//                             }}
//                         >
//                           {j.name.name}
//                         </p>
//                         <Text>
//                           <TextField
//                               key={j._id}
//                               variant="outlined"
//                               size="small"
//                               style={{
//                                 paddingLeft: "10px",
//                               }}
//                               //@ts-ignore
//
//
//
//
//
//
//                               autoFocus={mapIndex ===
//                               // objectiveGroup.length - 2
//                               activeFocus
//                                   ? true : false}
//                               //autoFocus = {ConStyle && objectiveGroup === j.name._id && true}
//                               value={objectiveGroup[mapIndex].value}
//
//
//
//
//
//                               inputProps={{ color:"red", pattern: "[0-9]" }}
//
//                               onChange={(e) => {
//                                 setObjectiveGroup(
//                                     objectiveGroup.map((i: any, ix: any) =>
//                                         ix === mapIndex
//                                             ? {
//                                               ...i,
//                                               value: e.target.value,
//                                             }
//                                             : i
//                                     )
//                                 );
//                                 setActiveFocus(mapIndex);
//
//
//
//
//                               )
//                                 setActiveFocus(mapIndex)
//
//
//                               }}
//                           />
//                         </Text>
//                         <div
//                             // style={{
//                             //   position: "absolute",
//                             //   top: "42%",
//                             //   left: "34%",
//                             //   transform: "translate(-50%, -50%)",
//                             // }}
//                         >
//
//                           {/* <img
//                             src={Leftarrownew}
//                             alt=""
//                             onClick={() => {
//                               setActiveObjectiveGroup(j.name._id);
//                               setActiveObjectiveType("");
//                             }}
//                           /> */}
//
//
//                           {/* @ts-ignore */}
//
//                           <img src={arrow? Leftarrownew : undefined}
//
//                                onClick={() => {
//                                  setActiveObjectiveGroup(j.name._id);
//                                  arrowHandler(j.name._id);
//
//                                }}
//                           />
//
//
//
//
//
//                         </div>
//                       </Item>
//                     </div>
//                   </>
//               );
//             })}
//       </div>
//     </ObjectiveGroupRow>
//     <ObjectiveTypeRow>
//       <div>
//         {objectiveType && objectiveGroup && activeObjectiveGroup && (
//             <div style={{ color: "#004C75", fontSize: "13px" }}>
//               <Item style={{ alignItems: "center", maxHeight: "20px" }}>
//                 <p>Objective Type</p>
//
//                 <p> Weightage</p>
//               </Item>
//             </div>
//         )}
//
//         {objectiveType &&
//             objectiveGroup &&
//             activeObjectiveGroup &&
//             filterObjectiveType(objectiveType).map(
//                 (j: any, mapIndex: any) => {
//                   return (
//                       <>
//                         <div>
//                           <Item
//                               style={{
//                                 alignItems: "center",
//
//
//                                 //@ts-ignore
//
//                                 background:
//                                     ConStyle &&
//                                     activeObjectiveType === j.name._id &&
//                                     "#F5F8FA",
//                               }}
//                           >
//                             {/* @ts-ignore */}
//                             <p
//                                 style={{
//                                   alignItems: "center",
//                                   textAlign:"left",
//                                   // @ts-ignore
//                                   color:
//                                       ConStyle &&
//                                       activeObjectiveType === j.name._id &&
//                                       "#004C75",
//                                   fontSize: "16px",
//                                   minWidth: "150px",
//                                 }}
//                                 onClick={() => {
//                                   setActiveObjectiveType(j.name._id);
//                                   colorHandler(j.name._id);
//                                   arrowHandler(j.name._id);
//                                 }}
//                             >
//                               {j.name.name}
//                             </p>
//                             <Text>
//                               <TextField
//                                   variant="outlined"
//                                   size="small"
//                                   style={{
//                                     paddingLeft: "10px",
//                                   }}
//                                   value={
//                                     objectiveType[
//                                         getObjectiveTypeIndex(j._id, objectiveType)
//                                         ].value
//                                   }
//
//                                   autoFocus={
//                                     mapIndex ===
//                                     // objectiveGroup.length - 2
//                                     activeFocus1
//                                         ? true
//                                         : false
//                                   }
//
//
//                                   onChange={(e) => {
//                                     setObjectiveType(
//                                         objectiveType.map((i: any, ix: any) => {
//                                           console.log(i, " `````````````");
//                                           return i._id === j._id
//                                               ? {
//                                                 ...i,
//                                                 value: e.target.value,
//                                               }
//                                               : i;
//                                         })
//                                     );
//                                     setActiveFocus1(mapIndex);
//                                   }}
//                               />
//                             </Text>
//                             <div
//                                 // style={{
//                                 //   position: "absolute",
//                                 //   top: "42%",
//                                 //   left: "66%",
//                                 //   transform: "translate(-50%, -50%)",
//                                 // }}
//                             >
//
//                               {/* <img
//                               src={Leftarrownew}
//                               alt=""
//                               onClick={() => {
//                                 setActiveObjectiveType(j.name._id);
//                               }}
//                             /> */}
//
//
//                               {/* @ts-ignore */}
//
//                               <img src={arrow1? Leftarrownew : undefined}
//
//                                    onClick={() => {
//                                      setActiveObjectiveType(j.name._id);
//                                      arrowHandler1(j.name._id);
//
//                                    }}
//                               />
//
//                             </div>
//                           </Item>
//                         </div>
//                       </>
//                   );
//                 }
//             )}
//       </div>
//     </ObjectiveTypeRow>
//     <ObjectiveDescriptionRow>
//       <div>
//         {objectiveDescription && activeObjectiveType && (
//             <div style={{ color: "#004C75", fontSize: "13px" }}>
//               <Item style={{ alignItems: "center", maxHeight: "20px" }}>
//                 <p>Objective Description</p>
//
//                 <p> Weightage</p>
//               </Item>
//             </div>
//         )}
//
//         {objectiveDescription &&
//             activeObjectiveType &&
//             filterObjectiveDescription(objectiveDescription).map(
//                 (j: any, index: number) => {
//                   console.log(j, "jjjjjjjjjj");
//
//                   return (
//                       <div>
//                         <Item style={{ alignItems: "center", display: "flex",textAlign:"left" }}>
//                           {/* @ts-ignore
//                                                  <p style={{alignItems: "center", border: ConStyle &&
//                                                  filterObjectiveDescription === j.name._id && '1px solid red',
//                                                     minWidth: "150px"
//                                                 }}
//                                                     onClick={() =>  colorHandler(j.name._id) } >
//                                                     */}{" "}
//                           {j.name.description}
//                           {/* </p> */}
//                           <Text>
//                             <TextField
//                                 variant="outlined"
//                                 size="small"
//                                 type="tel"
//                                 style={{
//                                   paddingLeft: "10px",
//                                   paddingBottom: "11px",
//                                   alignItems: "center",
//                                   paddingTop: "15px",
//                                 }}
//
//                                 autoFocus={
//                                   index ===
//
//
//
//                                   // objectiveGroup.length - 2
//                                   activeFocus2
//                                       ? true
//                                       : false
//                                 }
//                                 value={
//                                   objectiveDescription[
//                                       getObjectiveTypeIndex(
//                                           j._id,
//                                           objectiveDescription
//                                       )
//                                       ].value
//                                 }
//                                 onChange={(e) => {
//                                   setObjectiveDescription(
//                                       objectiveDescription.map((i: any, ix: any) => {
//                                         console.log(i, " `````````````");
//                                         return i._id === j._id
//                                             ? {
//                                               ...i,
//                                               value: e.target.value,
//                                             }
//                                             : i;
//                                       })
//                                   );
//                                   setActiveFocus2(index);
//                                 }}
//                             />
//                           </Text>
//                         </Item>
//                       </div>
//                   );
//                 }
//             )}
//       </div>
//     </ObjectiveDescriptionRow>
//
//
//     {/*<div>
//           <Button
//             style={{
//               textTransform: "none",
//               backgroundColor: "#014D76",
//               fontSize: "16px",
//               fontFamily: "sans-serif",
//               padding: "4px 19px",
//               marginTop: "180px",
//
//             }}
//             variant="contained"
//           >
//             Save
//           </Button>
//           </div>*/}
//   </Container>
//

//           {/*<div>

// <Button
// style={{
//   textTransform: "none",
//   backgroundColor: "#014D76",
//   fontSize: "16px",
//   fontFamily: "sans-serif",
//   padding: "4px 19px",
//   marginTop: "180px",
// }}
// variant="contained"
// >
// Save
// </Button>
// </div>*/}
// </Container>
//
//   <div
//       style={{
//         position: "absolute",
//         marginTop: "100px",
//         display: "flex",
//         justifyContent: "left",
//       }}
//   >
//     <Button
//         style={{
//           textTransform: "none",
//           backgroundColor: "#014D76",
//           fontSize: "16px",
//           fontFamily: "sans-serif",
//           padding: "4px 19px",
//         }}
//         variant="contained"
//         onClick={() => {
//           setTabs(tab + 1);
//           saveDraft({
//             weightage: {
//               objective_group: objectiveGroup,
//               objective_type: objectiveType,
//               objective_description: objectiveDescription,
//             },
//           });
//         }}
//     >
//       Save as Draft
//     </Button>
//   </div>
// </>
// );
// }

import React, { useEffect, useRef, useState } from 'react';
import Box, { BoxProps } from "@mui/material/Box";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { styled } from "@mui/system";
import Alert from "@mui/material/Alert";
import _ from "lodash";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Closeicon from "../../assets/Images/Closeicon.svg";
import {
  useGetObjectiveTitleQuery,
  useGetTemplateQuery,
  useGetSingleTemplateQuery,
  useAddWeightageMutation,
} from "../../service";
import { useCreateAppraisalCalenderMutation } from "../../service/appraisalCalender/AppraisalCalender";
import { Scrollbar } from "react-scrollbars-custom";
import { useParams, useNavigate } from "react-router-dom";
import { FEEDBACK } from "../../constants/routes/Routing";

const Text = styled("div")({
  "& .MuiOutlinedInput-root": {
    height: "30px",
    width: "70px !important",
    marginRight: "8px",
    // background:'red'
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
});
const New = styled("div")({
  "& .MuiPaper-elevation8": {
    marginLeft: "50%",
  },
});
function Item(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        minWidth: "150px",
        maxWidth: "auto",
        padding: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    />
  );
}

function Item1(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        // width: "400px",
        padding: "8px",
        // height: "150px",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        ...sx,
      }}
      {...other}
    />
  );
}

function Serial(props: BoxProps) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        borderRight: "1px solid #e0e0e0",
        marginTop: "-8px",
        marginBottom: "-8px",
        // border: "1px solid #e0e0e0",
        padding: "8px",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between",
        ...sx,
      }}
      {...other}
    />
  );
}
// interface IControlledTextArea {
//   value: string
//   onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined    [x: string]: any
// }
export default function GridAutoFlow(props: any) {
  // const { data } = props;
  const { data, isLoading } = useGetTemplateQuery("");
  const { id } = useParams();
  //const id = '62b2eaa250b50c443ef9759a'
  const { data: singleTemplateData } = useGetSingleTemplateQuery(id);
  console.log(id, "id");
  const [addWeightage, { isError, isSuccess }] = useAddWeightageMutation();
  const createWeightage = (data: any) => {
    console.log(data, "data");
    addWeightage({
      weightage: data.weightage,
      id,
    });
  };
  const [idAlert, setidAlert] = useState(false);
  useEffect(() => {
    if (id === undefined) {
      setidAlert(true);
      setOpen2(true);
    } else {
      setidAlert(false);
    }
  }, []);
  const saveDraft = createWeightage;
  const weightageError = { isError };
  const isSuccessWeightage = { isSuccess };
  const {
    // data,
    // singleTemplateData,
    tab,
    setTabs,
    // saveDraft,
    // weightageError,
    // isSuccessWeightage,
    navPrompt,
    setnavPrompt,
    settriggerTheNav1
  } = props;
  console.log(navPrompt, "navPrompt");
  console.log(isSuccessWeightage, "isSuccessMapping");
  console.log(data, "mapping");
  const navigate = useNavigate();
  const [ConStyle, setConStyle] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [arrow1, setArrow1] = useState(true);
  const [error, setError] = React.useState(false);
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [sumError, setSumError] = useState(false);

  const [sumError1, setSumError1] = useState(false);
  const [sumError2, setSumError2] = useState(false);

  const [activeFocus, setActiveFocus] = useState<any>(0);
  const [activeFocus1, setActiveFocus1] = useState<any>(0);
  const [activeFocus2, setActiveFocus2] = useState<any>(0);
  const [objectiveGroup, setObjectiveGroup] = React.useState<any>([]);
  const [activeObjectiveType, setActiveObjectiveType] = React.useState<any>("");
  const [activeObjectiveGroup, setActiveObjectiveGroup] = React.useState("");
  const [objectiveType, setObjectiveType] = React.useState<any>([]);
  let [objectiveDescription, setObjectiveDescription] = React.useState<any>([]);
  const [textfeildError, settextfeildError] = useState<any>("");
  const [textfeildError1, settextfeildError1] = useState<any>("");
  const [textfeildError2, settextfeildError2] = useState<any>("");
  const [save, setSave] = useState<any>(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [groupName, setGroupName] = useState<any>("")
  const [typeName, setTypeName] = useState<any>("")
  const [titleName, setTitleName] = useState<any>("")
  const [open2, setOpen2] = React.useState(false);
  const [message, seterrorMessage] = useState<any>("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  console.log(error2, "sumError2");

  const [textObjGroup, settextObjGroup] = useState<any>('');
  console.log(textObjGroup,'textObjGroup')
  // useEffect(() => {
  //   if(sumError && error){
  //     seterrorMessage( "The sum in the Objective Group should be equal to 100%!");
  //   }else if(sumError1 && error1){
  //     seterrorMessage(" The sum in the Objective Type should be equal to Objective Group!")
  //   }else if(sumError2 && error2){
  //     seterrorMessage(" The sum in the Objective Title for groupName should be equal to 100%!")
  //   }else if(textfeildError1 && textfeildError1){
  //     seterrorMessage(" The weightage value should be entered in Objective Type!")
  //   }else if(textfeildError2 && textfeildError2){
  //     seterrorMessage("  The weightage value should be entered in Objective Title!")
  //   }else if(textfeildError && textfeildError){
  //     seterrorMessage(" The weightage value should be entered in Objective Group!")
  //   }else if(isSuccessWeightage && hideAlert){
  //     seterrorMessage("Weightage details added")
  //   }
  // },[open2])

//textfeild error

// const [cursor, setCursor] = useState(null);
// const ref = useRef(null);
// useEffect(() => {
//   const input = ref.current;
//   if (input) input.setSelectionRange(cursor, cursor);
// }, [ref, cursor]);

  useEffect(() => {

    if (idAlert) {
      seterrorMessage(" Select Objective Type for the template.")
    }
    else if (textfeildError && textfeildError) {
      seterrorMessage(" The weighatge value should be entered in Objective Group to be able to save the template.")
    } else if (sumError && error) {
      seterrorMessage("The sum of the Objective Group should be equal to 100%.");
    }
    else if (textfeildError1 && textfeildError1) {
      seterrorMessage("The weighatge value should be entered in Objective Type to be able to save the template.")
    } else if (sumError1 && error1) {
      seterrorMessage(" The sum of the Objective Type should be equal to Objective Group.")
    }
    else if (textfeildError2 && textfeildError2) {
      seterrorMessage("  The weighatge value should be entered in Objective Title to be able to save the template.")
    } else if (sumError2 && error2) {
      seterrorMessage(`The sum of the Objective Title in the ${groupName} should be equal to a 100%.`)
    } else if (isSuccessWeightage && hideAlert) {
      seterrorMessage("Changes have been saved.")
    }

  }, [open2])

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  //
  // for ( let i  = 0; i < objectiveType.length; i++) {
  //     console.log(objectiveType && objectiveType[i].objective_description, 'wholaaaaaaaaaaaa')
  // }

  console.log(tab, "objectiveGroup");
  console.log(objectiveType, "objectiveType");
  console.log(objectiveDescription, "objectiveDescription");

  console.log(error, error1, error2, "sumError");

  const spn = 8;

  console.log(objectiveDescription, "objective");


  const [open3, setOpen3] = React.useState(false);



  const handleClose4 = () => {
    setOpen3(false);
  };

  const ObjectiveGroupRow = styled("div")({
    display: "grid",
    // gridTemplateColumns: "repeat(7, 1fr)",
  });
  const ObjectiveTypeRow = styled("div")({
    display: "grid",
    paddingLeft: "10px",

    // gridTemplateColumns: "repeat(7, 1fr)",
  });
  const ObjectiveDescriptionRow = styled("div")({
    display: "grid",
    paddingLeft: "10px",

    // gridTemplateColumns: "repeat(7, 1fr)",
  });

  const Container = styled("div")({
    display: "grid",

    gridTemplateColumns: "repeat(3, 1fr)",
  });

  const ObjectiveGroupContainer = styled("div")({
    height: "100%",
    width: "150px",
  });

  const ObjectiveGroupContainer1 = styled("div")({
    width: "150px",

    gridRow: `3 span/ ${spn}`,
  });

  const filterObjectiveType = (data: any) => {
    if (data && activeObjectiveGroup) {
      const res = data.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        return i.name.objective_group === activeObjectiveGroup;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };

  const filterObjectiveDescription = (data: any) => {
    console.log(activeObjectiveType, "activeObjectiveType")
    if (data && activeObjectiveType) {
      const res = data.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        return i.name.objective_type === activeObjectiveType;
      });
      // console.log(res, 'descriptions')
      return res;
    }else return [];
  };

  const find = (arr: any) => {
    if (arr && objectiveType) {
      return objectiveType.map((i: any) => {
        return arr === i._id ? i.value : null;
      });
      // arr.findIndex()
    }
  };

  const getObjectiveTypeIndex = (id: string, objective: any) => {
    const f = objective.findIndex((i: any) => {
      const j = i._id === id;
      return j;
    });
    return f;
  };

  const getObjectiveType = (id: string) => {
    const t = objectiveType.find((item: any) => {
      if (item.name) {
        return item.name.objective_group == id;
      }
    });
    if (t) return t.name._id;
    else return "";
  };
  useEffect(() => {
    if (singleTemplateData) {
      setObjectiveGroup(singleTemplateData.template.weightage.objective_group);
      setObjectiveType(singleTemplateData.template.weightage.objective_type);
      setObjectiveDescription(() => {
        return singleTemplateData.template.weightage.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
            };
          }
        );
      });

    }
  }, [singleTemplateData, objectiveTitleData]);

  useEffect(() => {
    if (objectiveType) {
      if (singleTemplateData?.template?.weightage?.objective_group?.length > 0) {
        let o = singleTemplateData.template.weightage.objective_group[0];
        setActiveObjectiveGroup(o.name._id);
        colorHandler(o.name._id);
        let type = getObjectiveType(o.name._id);
        setActiveObjectiveType(type);
        colorHandler(type);
        setActiveFocus2(0);
      }
    }
  }, [singleTemplateData,objectiveType])

  const colorHandler = (id: any) => {
    setConStyle(true);
  };

  // function changeBackground(e:any) {
  //   e.target.style.background = 'red';
  // }

  // hoverhandler = () => {

  // }

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };

  const validateObjectiveTitle = () => {
    // setOpen2(true);

    const grouped = _.groupBy(objectiveDescription, "name.objective_type");
    const entry = Object.entries(grouped);
    const res = entry.map((i: any) => {
      console.log(i, 'grouped');
      const j = i[1].map((k: any) => {
        // setTypeName(k.name.objective_type);
        let temp1 = objectiveType?.find((i: any) => i.name._id === k.name.objective_type)
        let temp2 = objectiveGroup?.find((i: any) => i.name._id === temp1?.name?.objective_group)
        // setGroupName(temp2?.name?.name)
        console.log(k, "entry");
        return {
          value: k.value,
          name: temp2?.name?.name
        };
      });
      return j;
    });


    const filterCheck = objectiveType.map((i: any) => {
      return objectiveDescription.filter((j: any) => {
        // console.log(i.name._id,j.name.objective_type,'filterCheck')
        return j.name.objective_type === i.name._id;
      });
    });

    const filterCheck1 = filterCheck.map((i: any, index: number) => {
      const res2 = i
        .map((j: any) => {
          let temp1 = objectiveType?.find((k: any) => k.name._id === j.name.objective_type)
          let temp2 = objectiveGroup?.find((k: any) => k.name._id === temp1?.name?.objective_group)
          // return j.value;
          console.log(temp2, 'temp2')
          return {
            value: j.value,
            name: temp2?.name?.name
          };
        })
        .reduce((prev: any, cur: any) => {
          // return parseFloat(prev) + parseFloat(cur);          
          return { name: cur.name, value: parseFloat(prev.value) + parseFloat(cur.value) };
        });

      console.log(res2, "res2");
      return res2;
    });

    console.log(filterCheck1, "filterCheck1");

    const checkResult = filterCheck1.map((j: any) => {
      console.log(j, "final");
      if (parseFloat(j.value) !== 100) {
        setGroupName(j.name)
      }
      return parseFloat(j.value) !== 100;
    });
    checkResult.includes(true) ? setError2(true) : setError2(false);
    if (!checkResult.includes(true)) SaveTemplate();
    else { setOpen2(true); }
    return checkResult.includes(true)

  };

  useEffect(() => {
    const sum = () => {
      var r = objectiveGroup.reduce(function (a: any, c: any) {
        console.log(a, c.value, "calc");
        return a + parseFloat(c.value);
      }, 0);
      console.log(r, isNaN(r), "calcr");
      // console.log(r, 'llllrrrr');
      if (r === 100) {
        setError(false);
        //  console.log('no error')
      } else {
        setError(true);
        // console.log('error')
      }
    };
    sum();

    const sumtotal = () => {
      var r =
        objectiveType &&
        objectiveGroup &&
        activeObjectiveGroup &&
        filterObjectiveType(objectiveType)
          .map((j: any) => j.value)
          .reduce((prev: any, cur: any) => prev + parseFloat(cur), 0);
      console.log(r, "uukuk");
      var v = r;
      console.log(v, "i8i8i8");
      // var t = objectiveGroup.map((j: any) => {
      //  console.log(j.value,'jjiii')

      // })
      //   let ID:any
      //   const er = (id:any) => {
      //     console.log(id,'ujujiukj8ikikikik')
      //  ID = id

      // }
      var Value: any;

      var w = objectiveGroup
        .filter((p: any) => p.name._id === activeObjectiveGroup)
        .map((fp: any) => {
          // console.log(fp.value,'u7i78i8')
          Value = fp.value;
          console.log(Value, "ujukiki");
        });
      //console.log(w,'ujju')
      if (Value == v) {
        //console.log('no err')
        setError1(false);
      } else {
        //console.log('err')
        setError1(true);
      }
    };
    sumtotal();

    const sumDescription = () => {
      const grouped = _.groupBy(objectiveDescription, "name.objective_type");
      const entry = Object.entries(grouped);
      const res = entry.map((i: any) => {
        console.log(i, 'grouped');
        const j = i[1].map((k: any) => {
          // setTypeName(k.name.objective_type);
          let temp1 = objectiveType?.find((i: any) => i.name._id === k.name.objective_type)
          let temp2 = objectiveGroup?.find((i: any) => i.name._id === temp1?.name?.objective_group)
          // setGroupName(temp2?.name?.name)
          console.log(k, "entry");
          return {
            value: k.value,
            name: temp2?.name?.name
          };
        });
        return j;
      });

      const filterCheck = objectiveType.map((i: any) => {
        return objectiveDescription.filter((j: any) => {
          // console.log(i.name._id,j.name.objective_type,'filterCheck')
          return j.name.objective_type === i.name._id;
        });
      });

      const filterCheck1 = filterCheck.map((i: any, index: number) => {
        const res2 = i
          .map((j: any) => {
            let temp1 = objectiveType?.find((k: any) => k.name._id === j.name.objective_type)
            let temp2 = objectiveGroup?.find((k: any) => k.name._id === temp1?.name?.objective_group)
            // return j.value;
            console.log(temp2, 'temp2')
            return {
              value: j.value,
              name: temp2?.name?.name
            };
          })
          .reduce((prev: any, cur: any) => {
            // return parseFloat(prev) + parseFloat(cur);          
            return { name: cur.name, value: parseFloat(prev.value) + parseFloat(cur.value) };
          });

        console.log(res2, "res2");
        return res2;
      });

      console.log(filterCheck1, "filterCheck1");
      let activeGroup = objectiveGroup
        .find((p: any) => p.name._id === activeObjectiveGroup)
      const checkResult = filterCheck1.filter((i: any) => {
        return i.name == activeGroup?.name?.name
      }).map((j: any) => {
        console.log(j, "final");
        if (parseFloat(j.value) !== 100) {
          setGroupName(j.name)
        }
        return parseFloat(j.value) !== 100;
      });
      return checkResult.includes(true) ? setError2(true) : setError2(false);
      // const sumGroup = Object.values(grouped).map((i: any) => {
      //     console.log(i);
      //     const sum = i.map((j: any) => j.value).reduce((a: any, b: any) => {
      //         const res = parseInt(a) + parseInt(b)
      //         console.log(res, 'res iiii')
      //         return res === 100 ? setError2(false) : setError2(true)
      //
      //         // return res
      //     }, 0);
      //
      //     console.log(sum, "sum");
      //     //
      //     // if (sum === 100) {
      //     //     setError2(false);
      //     //     //  console.log('no error')
      //     // } else {
      //     //     setError2(true);
      //     //     // console.log('error')
      //     // }
      // });
      //
      //
      // console.log(grouped, "grouped");
      // console.log(sumGroup, "sumGroup");
      // var y =
      //     objectiveDescription &&
      //     activeObjectiveType &&
      //     filterObjectiveDescription(objectiveDescription)
      //         .map((j: any) => j.value)
      //         .reduce((prev: any, cur: any) => prev + parseInt(cur), 0);
      //
      // console.log(y, "iuyyyy");
      //
      // if (y === 100) {
      //     // console.log('no err')
      //     setError2(false);
      // } else {
      //     // console.log('err')
      //     setError2(true);
      // }

      // var d = objectiveType.filter((p:any) => p.name._id === activeObjectiveType).map((fp:any)=>{
      //   console.log(fp.value ,'wertyyu')
      // })

      // console.log(objectiveType,'kkkkk')
    };
    sumDescription();
  }, [
    objectiveGroup,
    objectiveType,
    activeObjectiveGroup,
    activeObjectiveType,
    objectiveDescription,
  ]);

  console.log(objectiveGroup, "ggtrht");
  const setErrorHandler = () => {
    setSumError(true);
    // setOpen2(true);
  };
  const setErrorHandler1 = () => {
    setSumError1(true);
    // setOpen2(true);
  };
  const setErrorHandler2 = () => {
    setSumError2(true);
    // setOpen2(true);
  };

  const arrowHandler = (id: any) => {
    // if (objectiveGroup && objectiveGroup === id) {
    //    setArrow(false)
    // }

    setArrow(false);
  };
  const arrowHandler1 = (id: any) => {
    // if (objectiveGroup && objectiveGroup === id) {
    //    setArrow(false)
    // }

    setArrow1(false);
  };
  console.log(objectiveGroup, "ggtrht");

  //   const weightageHandler = (mapindex:any) => {
  //     console.log(objectiveGroup[mapindex].value,'objectiveGroup[mapindex].valueobjectiveGroup[mapindex].value')
  //  const filterData =     mapindex.filter((j:any) => {

  //     })

  //     filterData.length ===0

  const weightageHandler = (objectives: any) => {
    const emptyField = objectives.map((i: any) => {
      return i.value ? true : false;
    });

    function checkBoolean(obj: any) {
      console.log(obj, "objeeeeeeeeeeeeeeeeee");
      return obj === false;
    }

    const result = emptyField.some(checkBoolean);
    return result;
  };

  const groupNameHandler = (j: any) => {
    if (objectiveGroup) {
      let temp = objectiveGroup.map((i: any) => {
        if (i.name._id === j.name._id) {
          setGroupName(i.name.name)
        }
      })
    }
  }
  const typeNameHandler = (j: any) => {
    if (objectiveType) {
      let temp = objectiveType.map((i: any) => {
        if (i.name._id === j.name._id) {
          setTypeName(i.name.name)
        }
      })
    }
  }
  const titleNameHandler = (j: any) => {

    if (activeObjectiveGroup && objectiveGroup && objectiveDescription && objectiveType) {

      let obType = objectiveType.find((tp: any) => j.name.objective_type === tp.name._id)

      // if (obType) {
      //   let obGroup = objectiveGroup.find((gp: any) => obType.name.objective_group === gp.name._id)
      //   console.log(obGroup.name.name, 'tempId')
      //   setGroupName(obGroup.name.name)
      // }
      if (obType) {
        let obGroup = objectiveGroup.find((gp: any) => gp.name._id === activeObjectiveGroup)
        console.log(activeObjectiveGroup, 'tempId')
        setGroupName(obGroup?.name?.name)
      }
    }
  }



  useEffect(() => {
    // if (objectiveGroup && objectiveType && objectiveDescription) {
    //   settextfeildError(() => {
    //     return weightageHandler(objectiveGroup)
    //   });
    //   settextfeildError1(() => {
    //     return weightageHandler(objectiveType)
    //   });
    //   settextfeildError2(() => {
    //     return weightageHandler(objectiveDescription)
    //   })
    // }
  }, [objectiveGroup, objectiveType, objectiveDescription]);

  console.log(textfeildError, "textfeildErrortextfeildError");

  const saveHandler = () => {
    if (objectiveGroup && objectiveType && objectiveDescription) {

      settextfeildError(() => {
        return weightageHandler(objectiveGroup);
      });
      settextfeildError1(() => {
        return weightageHandler(objectiveType);
      });
      settextfeildError2(() => {
        return weightageHandler(objectiveDescription);
      });


      console.log(
        textfeildError,
        textfeildError1,
        textfeildError2,
        sumError,
        sumError1,
        sumError2,
        "textfeildErrortextfeildError"
      );
      // if (textfeildError && textfeildError === false &&
      //   textfeildError1 && textfeildError1 === false &&
      //   textfeildError2 && textfeildError2 === false)
      if (
        !textfeildError &&
        !textfeildError1 &&
        !textfeildError2
        //  &&
        // !error &&
        // !error1 &&
        // !error2
      ) {

        validateObjectiveTitle();
        // .then((res: any) => {
        //     res.error ? <> </> : navigate(`${FEEDBACK}`)
        // })
      } else if (
        textfeildError &&
        textfeildError === true &&
        textfeildError1 &&
        textfeildError1 === true &&
        textfeildError2 &&
        textfeildError2 === true
      ) {

        // setEmptyError(true);
        setSave(false);
        setOpen2(true);
        // setOpen2(true);
      } else {
        setOpen2(true)
      }
    }
  };
  const SaveTemplate = () => {

    setSave(true);
    setHideAlert(true);
    setOpen2(true)
    // hideAlertHandler();
    // setTabs(tab + 1)

    saveDraft({
      weightage: {
        objective_group: objectiveGroup,
        objective_type: objectiveType,
        objective_description: objectiveDescription,
      },
    });
  }
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );

  // const handleClick = (event: any) => {
  //   return setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const setActiveItems = (j: any) => {
    setActiveObjectiveGroup(j.name._id);
    let type = getObjectiveType(j.name._id);
    setActiveObjectiveType(type);
    colorHandler(type);
    colorHandler(j.name._id);
  }
  // alert to diaolgue


  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
  };

  return (
    <>
      <div style={{ paddingLeft: "20px" }}>
        <div
          style={{
            // position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "20px",
            // paddingLeft: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            {" "}
            Weightage{" "}
          </div>
          {(id &&
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color: "#3E8CB5",
                background: "transparent",
              }}
              variant="outlined"
              onClick={() => {
                // setTabs(tab + 1);
                // validateObjectiveTitle()
                saveHandler()
                setnavPrompt(false);
                settriggerTheNav1(false);
                // saveDraft({
                //   weightage: {
                //     objective_group: objectiveGroup,
                //     objective_type: objectiveType,
                //     objective_description: objectiveDescription,
                //   },
                // })
              }}
            >
              Save as Draft
            </Button>
          )}

        </div>
        {/*<div style={{ backgroundColor: "#F2F6F8", color: "#014D76" }}>
        <Item style={{ alignItems: "center", maxHeight: "20px" }}>
          <p>Objective Group</p>
          <p style={{paddingLeft:"80px"}} > Weightage</p>
          <p style={{paddingRight:"90px"}}> Objective Type</p>
          <p> Weightage</p>
          <p  style={{paddingRight:"60px"}}>Objective Description</p>
          <p> Weightage</p>
        </Item>
  </div>*/}
        {/* {idAlert && (
          <div style={{ paddingLeft: "20px" }}>
            <Alert severity="error">
              Select Objective Type for the template!
            </Alert>
          </div>
        )} */}
        {/* {sumError && (
          <>
            {error ? (
              <Alert severity="error">
                The sum in the Objective Group should be equal to 100%!
               
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {sumError1 && (
          <>
            {error1 ? (
              <Alert severity="error">
                The sum in the Objective Type should be equal to Objective Group!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {sumError2 && (
          <>
            {error2 ? (
              <Alert severity="error">
                The sum in the Objective Title for {groupName} should be equal to 100%!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {textfeildError && (
          <>
            {textfeildError ? (
              <Alert severity="error">
                The weightage value should be entered in Objective Group!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {textfeildError1 && (
        <>
          {textfeildError1 ? (
            <Alert severity="error">
              Select Objective Type for the template!
            </Alert>
          </div>
        )} */}
        {/* {sumError && (
          <>
            {error ? (
              <Alert severity="error">
                The sum in the Objective Group should be equal to 100%!
              </Alert>
            ) : (
              " "
            )}
          </>
        )}
        {sumError1 && (
          <>
            {error1 ? (
              <Alert severity="error">
                The sum in the Objective Type should be equal to ObjectiveGroup!
              </Alert>
            ) : (
              " "
            )}
          </>
        )}
        {sumError2 && (
          <>
            {error2 ? (
              <Alert severity="error">
                The sum in the Objective Title should be equal to 100%!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {textfeildError && (
          <>
            {textfeildError ? (
              <Alert severity="error">
                The weightage value should be entered in Objective Group!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}
        {/* {textfeildError1 && (
          <>
            {textfeildError1 ? (
              <Alert severity="error">
                The weightage value should be entered in Objective Type!
              </Alert>
            ) : (
              " "
            )}
          </>
        )}
        {textfeildError2 && (
          <>
            {textfeildError2 ? (
              <Alert severity="error">
                The weightage value should be entered in Objective Title!
              </Alert>
            ) : (
              " "
            )}
          </>
        )} */}

        {/* {isSuccessWeightage && hideAlert && (
          <Alert severity="info">Weightage details added</Alert>
        )} */}
        {/* {emptyError && (
          <Alert severity="error">Add all the weightage values!</Alert>
        )} */}
        <div style={{ width: "50%", }}>
          <Dialog
            open={open2}
            onClose={handleClose3}
            BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
            style={{
              marginTop: "80px",
              height: "calc(100vh - 50px)",
            }}
            PaperProps={{
              style: {
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin:"0px",
                padding:"30px",
              },
            }}
          >
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton  >
                <img src={Closeicon} alt="icon"
                onClick ={handleClose3}/>
              </IconButton>

            </DialogTitle> */}
            <DialogContent><DialogContentText
              id="alert-dialog-description"
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                //paddingBottom: "12px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                //height: "100px",
                // width: "300px",
                alignItems: "center",
                overflowY:"hidden",
              }}
            >
              {/* {idAlert && (
          <div >
            <div >
              Select Objective Type for the template!
            </div>
          </div>
        )}
        {sumError && (
          <>
            {error ? (
              <div >
                The sum in the Objective Group should be equal to 100%!
              </div>
            ) : (
              " "
            )}
          </>
        )}
        {sumError1 && (
          <>
            {error1 ? (
              <div >
                The sum in the Objective Type should be equal to Objective Group!
              </div>
            ) : (
              " "
            )}
          </>
       )} 
        {sumError2 && (
          <>
            {error2 ? (
              <div >
                The sum in the Objective Title for {groupName} should be equal to 100%!
              </div>
            ) : (
              " "
            )}
          </>
        )}
        {isSuccessWeightage && hideAlert && (
          <div >Weightage details added</div>
        )}
        {textfeildError1 && (
          <>
            {textfeildError1 ? (
              <div >
                The weightage value should be entered in Objective Type!
              </div>
            ) : (
              " "
            )}
          </>
        )}
        {textfeildError2 && (
          <>
            {textfeildError2 ? (
              <div >
                The weightage value should be entered in Objective Title!
              </div>
            ) : (
              " "
            )}
          </>
        )}

  	{textfeildError && (
          <>
            {textfeildError ? (
              <div >
                The weightage value should be entered in Objective Group!
              </div>
            ) : (
              " "
            )}
          </>
        )} */}
              {message}
            </DialogContentText></DialogContent>
            {/* {emptyError && (
          <div >Add all the weightage values!</div>
        )} */}
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
               // paddingBottom: "20px"
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
                  width: "70px",
                  height: "35px",
                  background: "transparent",
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
        <Dialog
          open={open3}
          onClose={handleClose4}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
          style={{
            marginTop: "80px",
            height: "calc(100vh - 50px)",
          }}
          PaperProps={{
            style: {
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "30%",
              margin:"0px",
            },
          }}
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            id="alert-dialog-title"
          >
            <IconButton  >
              <img src={Closeicon} alt="icon"
                onClick ={handleClose4} />
            </IconButton>

          </DialogTitle>
          <DialogContent><DialogContentText
            id="alert-dialog-description"
            style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "Arial",
             // paddingBottom: "12px",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              wordBreak: "break-word",
              //height: "100px",
              // width: "300px",
              alignItems: "center",
            }}
          >
            {textfeildError1 && (
              <>
                {textfeildError1 ? (
                  <div >
                    The weightage value should be entered in Objective Type.
                  </div>
                ) : (
                  " "
                )}
              </>
            )}
            {textfeildError2 && (
              <>
                {textfeildError2 ? (
                  <div >
                    The weightage value should be entered in Objective Title.
                  </div>
                ) : (
                  " "
                )}
              </>
            )}

            {textfeildError && (
              <>
                {textfeildError ? (
                  <div >
                    The weightage value should be entered in Objective Group.
                  </div>
                ) : (
                  " "
                )}
              </>
            )}
          </DialogContentText></DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "20px"
            }}
          >
            <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                color:"#3e8cb5",
                width: "70px",
                height: "35px",
                background: "transparent",
              }}
              variant="outlined"
              autoFocus
              onClick={handleClose4}
            >
              Ok
            </Button>
          </DialogActions>

        </Dialog>

        {!idAlert && (
          <Scrollbar style={{ height: "350px" }}>
            <Container>
              {/* <Button onClick={() => setTabs(tab + 1)} >Save </Button> */}

              <ObjectiveGroupRow>
                {/*<Item>Job Competencies</Item>*/}
                {/*<ObjectiveGroupContainer1>*/}
                {/*    <Item>Core Competencies</Item>*/}
                {/*</ObjectiveGroupContainer1>*/}
                <div>
                  <div>
                    <Item
                      style={{
                        alignItems: "center",
                        maxHeight: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {/* <div>
                  <Serial style={{ alignItems: "center", maxHeight: "20px" }}>
                    <p>#</p>
                  </Serial>
                </div> */}
                      <Typography
                        style={{
                          paddingRight: "82px",
                          color: "#3e8cb5",
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "Arial",
                        }}
                      >
                        Objective Group
                      </Typography>

                      <Typography
                        style={{
                          paddingRight: "15px",
                          color: "#3e8cb5",
                          fontSize: "14px",
                          fontWeight: "600",
                          fontFamily: "Arial",
                        }}
                      >
                        {" "}
                        Weightage
                      </Typography>
                    </Item>
                  </div>

                  {objectiveGroup &&
                    objectiveGroup.map((j: any, mapIndex: any) => {
                      console.log(j._id, "jjjjj");
                      return (
                        <>
                          <div>
                            <Item
                              style={{
                                alignItems: "center",
                                position: "relative",
                                //@ts-ignore
                                background:
                                  ConStyle &&
                                  activeObjectiveGroup === j.name._id &&
                                  "#F5F8FA",
                              }}
                            // onMouseEnter={() => setArrow(true)}
                            // onMouseLeave={() => setArrow(false)}
                            >
                              {/* <div
                        // style={{
                        //   borderRight: "1px solid #e0e0e0",
                        //   marginTop: "-8px",
                        //   marginBottom: "-8px",
                        // }}
                        >
                          <Serial
                            style={{ alignItems: "center", maxHeight: "80px" }}
                          >
                            <p>{mapIndex + 1}</p>
                          </Serial>
                        </div> */}
                              {/* @ts-ignore */}
                              <p
                                style={{
                                  alignItems: "center",
                                  textAlign: "left",
                                  // @ts-ignore
                                  color:
                                    ConStyle &&
                                    activeObjectiveGroup === j.name._id &&
                                    "#3e8cb5",
                                  fontSize: "14px",
                                  minWidth: "150px",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word"

                                  // paddingRight: "16px",
                                }}
                                onClick={() => {
                                  setActiveItems(j)
                                  // setActiveObjectiveGroup(j.name._id);
                                  // setActiveObjectiveType("");
                                  // colorHandler(j.name._id);
                                  // arrowHandler(j.name._id);
                                }}
                              >
                                {j.name.name}
                              </p>
                              <Text>
                                <TextField
                                  key={j._id}
                                  // multiline
                                  inputProps={{ maxLength: 3 }}
                                  variant="outlined"
                                  // type={`number`}
                                  type="number"
                                  size="small"
                                  style={{
                                    paddingLeft: "10px",
                                  }}
                                  //ref={ref}
                                  //@ts-ignore
                                  autoFocus={
                                    mapIndex ===
                                      // objectiveGroup.length - 2
                                      activeFocus
                                      ? true
                                      : false
                                  }
                                  //autoFocus = {ConStyle && objectiveGroup === j.name._id && true}
                                  // inputProps={{ maxLength: 3 }}
                                  value={objectiveGroup[mapIndex].value}
                                  // helperText={error ? <Alert severity="error">This is an error alert — check it out!</Alert> : " "}
                                  error={sumError && error}
                                  //inputProps={{ color:"red", pattern: "[0-9]" }}
                                  // helperText={
                                  //   !objectiveGroup[mapIndex].value && textfeildError? "*value required.":" "
                                  // }
                                  onChange={(e) => {
                                    // setOpen2(true)
                                    //@ts-ignore
                                    // setCursor(e.target.selectionEnd);
                                    setObjectiveGroup(
                                      objectiveGroup.map((i: any, ix: any) =>
                                        ix === mapIndex
                                          ? {
                                            ...i,
                                            value: e.target.value,
                                          }
                                          : i
                                      )
                                    );
                                    console.log(objectiveGroup);
                                    setActiveFocus(mapIndex);
                                    setActiveFocus1("");
                                    setActiveFocus2("");
                                    setErrorHandler();
                                    weightageHandler(objectiveGroup);
                                    setnavPrompt(true);
                                    settriggerTheNav1(true);
                                    // typeNameHandler(j)
                                  }}
                                />
                              </Text>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "54%",
                                  left: "100%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              // style={{
                              //   position:"relative",
                              //   top: "50%",
                              //   left: "18%",
                              //   transform: "translate(-50%, -50%)",

                              // }}
                              >
                                {/* {arrow && activeObjectiveGroup != j.name._id && (
                                                        <img
                                                            src={Leftarrownew}
                                                            onClick={() => {
                                                                setActiveObjectiveGroup(j.name._id);
                                                                setActiveObjectiveType("");
                                                                // er(j.name._id)
                                                            }}
                                                        />
                                                    )} */}
                              </div>
                            </Item>
                          </div>
                        </>
                      );
                    })}
                </div>
              </ObjectiveGroupRow>
              <ObjectiveTypeRow>
                <div>
                  {objectiveGroup && (
                    <div>
                      <Item
                        style={{
                          alignItems: "center",
                          maxHeight: "20px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* <div>
                    <Serial style={{ alignItems: "center", maxHeight: "20px" }}>
                      <p>#</p>
                    </Serial>
                  </div> */}
                        <Typography
                          style={{
                            paddingRight: "100px",
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                          }}
                        >
                          Objective Type
                        </Typography>

                        <Typography
                          style={{
                            paddingRight: "15px",
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                          }}
                        >
                          {" "}
                          Weightage
                        </Typography>
                      </Item>
                    </div>
                  )}
                  {objectiveType &&
                    objectiveGroup &&
                    activeObjectiveGroup &&
                    filterObjectiveType(objectiveType).map(
                      (j: any, mapIndex: any) => {
                        return (
                          <>
                            <div>
                              <Item
                                onMouseOver={() => setArrow(true)}
                                onMouseLeave={() => setArrow(false)}
                                style={{
                                  alignItems: "center",
                                  position: "relative",
                                  //@ts-ignore
                                  background:
                                    ConStyle &&
                                    activeObjectiveType === j.name._id &&
                                    "#F5F8FA",
                                }}
                              >
                                {/* <div>
                            <Serial
                              style={{
                                alignItems: "center",
                                maxHeight: "80px",
                              }}
                            >
                              <p>{mapIndex + 1}</p>
                            </Serial>
                          </div> */}

                                {/* @ts-ignore */}
                                <p
                                  style={{
                                    alignItems: "center",
                                    textAlign: "left",
                                    // @ts-ignore
                                    color:
                                      ConStyle &&
                                      activeObjectiveType === j.name._id &&
                                      "#3e8cb5",
                                    fontSize: "14px",
                                    minWidth: "150px",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word"
                                    // paddingRight: "26px",
                                  }}
                                  onClick={() => {
                                    setActiveObjectiveType(j.name._id);
                                    colorHandler(j.name._id);
                                  }}
                                >
                                  {j.name.name}
                                </p>
                                <Text>
                                  <TextField
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                      paddingLeft: "10px",
                                    }}
                                    // multiline
                                    inputProps={{ maxLength: 3 }}
                                    value={
                                      objectiveType[
                                        getObjectiveTypeIndex(
                                          j._id,
                                          objectiveType
                                        )
                                      ].value
                                    }
                                    // helperText={error1 ? "Sum should be equal" : " "}
                                    error={sumError1 && error1}
                                    autoFocus={
                                      mapIndex ===
                                        // objectiveGroup.length - 2
                                        activeFocus1
                                        ? true
                                        : false
                                    }
                                    onChange={(e: any) => {
                                      setObjectiveType(
                                        objectiveType.map((i: any, ix: any) => {
                                          console.log(i, " `````````````");
                                          return i._id === j._id
                                            ? {
                                              ...i,
                                              value: e.target.value,
                                            }
                                            : i;
                                        })
                                      );
                                      setActiveFocus1(mapIndex);
                                      setActiveFocus("");
                                      setActiveFocus2("");
                                      setErrorHandler1();
                                      weightageHandler(objectiveType);
                                      setnavPrompt(true);
                                      settriggerTheNav1(true);
                                    }}
                                  />
                                </Text>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "54%",
                                    left: "100%",
                                    transform: "translate(-50%, -50%)",
                                  }}
                                >
                                  {/* {arrow && activeObjectiveType != j.name._id && (
                                                            <img
                                                                src={Leftarrownew}
                                                                onClick={() =>
                                                                    setActiveObjectiveType(j.name._id)
                                                                }
                                                            />
                                                        )} */}
                                </div>
                              </Item>
                            </div>
                          </>
                        );
                      }
                    )}
                </div>
              </ObjectiveTypeRow>
              <ObjectiveDescriptionRow>
                <div>
                  {objectiveDescription && 
                  // activeObjectiveType &&
                   (
                    <div >
                      <Item1 style={{ alignItems: "center", maxHeight: "20px", whiteSpace: "nowrap" }}>
                        {/* <div>
                    <Serial style={{ alignItems: "center", maxHeight: "20px" }}>
                      <p>#</p>
                    </Serial>
                  </div> */}
                        <Typography
                          style={{
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                          }}
                        >
                          Objective Title
                        </Typography>

                        <Typography
                          style={{
                            paddingRight: "20px",
                            color: "#3e8cb5",
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily: "Arial",
                          }}
                        >
                          {" "}
                          Weightage
                        </Typography>
                      </Item1>
                    </div>
                  )}
                  {objectiveDescription && objectiveType &&
                    activeObjectiveGroup &&
                    filterObjectiveDescription(objectiveDescription).map(
                      (j: any, index: number) => {
                        return (
                          <div>
                            <Item>
                              {/* <Scrollbar 
                              style={{ width: "100%", height: "44px" }}
                            >*/}
                              {/* <Stack direction="row"> */}
                              {/* <div
                              // style={{
                              //   textAlign: "left",
                              //   paddingLeft: "10px",
                              //   width: "100%",
                              // }}
                            > */}
                              <p

                                style={{
                                  alignItems: "center",
                                  textAlign: "left",
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                  wordBreak: "break-all",
                                  minWidth: "150px",
                                  //  width:'200px'
                                  // justifyContent: "left",
                                }}
                              >
                                {j?.name?.objectiveTitle}
                              </p>

                              {/* <div>
                                  

                                    {j.level_1_isChecked && (
                                      <Typography
                                        style={
                                          {
                                            // borderBottom: "1px solid lightgrey",
                                            // marginLeft: "5px",
                                            // marginRight: "5px",
                                            // width: "240px",
                                          }
                                        }
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            Level 1
                                          </span>
                                        </div>

                                        <p
                                          style={{
                                            paddingLeft: "13px",
                                            fontSize: "12px",
                                            opacity: "75%",
                                          }}
                                        >
                                          {j.name.level_1.level_definition}
                                        </p>                                     
                                      </Typography>
                                    )}
                                  </div> */}
                              {/* <div>
                                    {j.level_2_isChecked && (
                                      <Typography
                                        style={
                                          {
                                            // borderBottom: "1px solid lightgrey",
                                            // marginLeft: "5px",
                                            // marginRight: "5px",
                                          }
                                        }
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            Level 2
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            paddingLeft: "13px",
                                            fontSize: "12px",
                                            opacity: "75%",
                                          }}
                                        >
                                          {j.name.level_2.level_definition}
                                        </p>

                                     
                                      </Typography>
                                    )}
                                  </div> */}

                              {/* <div>
                                    {j.level_3_isChecked && (
                                      <Typography
                                        
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            Level 3
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            paddingLeft: "13px",
                                            fontSize: "12px",
                                            opacity: "75%",
                                          }}
                                        >
                                          {j.name.level_3.level_definition}
                                        </p>

                                      
                                      </Typography>
                                    )}
                                  </div> */}

                              {/* <div>
                                    {j.level_4_isChecked && (
                                      <Typography
                                       
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            paddingLeft: "5px",
                                            paddingTop: "20px",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingLeft: "7px",
                                              fontSize: "14px",
                                            }}
                                          >
                                            Level 4
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            paddingLeft: "13px",
                                            fontSize: "12px",
                                            opacity: "75%",
                                          }}
                                        >
                                          {j.name.level_4.level_definition}
                                        </p>

                                       
                                      </Typography>
                                    )}
                                  </div> */}
                              {/*</Menu>*/}

                              {/* </div> */}
                              <Text>
                                {console.log(
                                  activeObjectiveType,
                                  objectiveDescription.name,
                                  "ooooooooo"
                                )}
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  type="number"
                                  // multiline
                                  //type="tel"
                                  style={{
                                    paddingLeft: "10px",
                                    justifyContent: "end",
                                    alignItems: "center",
                                    // paddingTop: "8px",
                                    // paddingBottom: "265px",
                                  }}
                                  // helperText={error2 ? "Sum should be equal to 100" : " "}
                                  inputProps={{ maxLength: 3 }}
                                  error={
                                    sumError2 && error2 && activeObjectiveType
                                  }
                                  autoFocus={
                                    index ===
                                      // objectiveGroup.length - 2
                                      activeFocus2
                                      ? true
                                      : false
                                  }
                                  value={
                                    objectiveDescription[
                                      getObjectiveTypeIndex(
                                        j._id,
                                        objectiveDescription
                                      )
                                    ].value
                                  }
                                  onChange={(e) => {
                                    setObjectiveDescription(
                                      objectiveDescription.map(
                                        (i: any, ix: any) => {
                                          console.log(i, " `````````````");
                                          return i._id === j._id
                                            ? {
                                              ...i,
                                              value: e.target.value,
                                            }
                                            : i;
                                        }
                                      )
                                    );
                                    setActiveFocus2(index);
                                    setActiveFocus("");
                                    setActiveFocus1("");
                                    setErrorHandler2();
                                    weightageHandler(objectiveDescription);
                                    setnavPrompt(true);
                                    settriggerTheNav1(true);
                                    // titleNameHandler(j)
                                  }}
                                />
                                {console.log(objectiveGroup, objectiveType, objectiveDescription, 'tttttttt')}
                              </Text>
                              {/* </Stack> */}
                              {/* </Scrollbar> */}
                            </Item>
                          </div>
                        );
                      }
                    )}
                </div>
              </ObjectiveDescriptionRow>

            </Container>
          </Scrollbar>
        )}
      </div>
    </>
  );
}

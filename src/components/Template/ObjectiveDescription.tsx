import * as React from "react";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import _ from "lodash";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Scrollbar } from "react-scrollbars-custom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg";

const New = styled("div")({
  "& .MuiPaper-elevation8": {
    marginLeft: "50%",
  },
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  "& .ScrollbarsCustom-TrackY": {
   width:"6px !important"
   },
  
});
export default function ObjectiveDescription(props: any) {
  const {
    templateDescriptionData,
    getIds,
    valueData,
    descriptionData,
    setDescriptionData,
    setObjectiveType,
    navPrompt,
    setnavPrompt,
    uncheckLevel,
    setUncheckLevel,
    settriggerTheNav1
  } = props;
  // console.log(valueData)

  // const [descriptionData, setDescriptionData] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>([]);
  const [selectLevelAlert, setSelectLevelAlert] = useState<any>(false)
  const [level1Checked, setLevel1Checked] = useState<any>(false)

  const HandleLevelAlertClose = () => {
    setSelectLevelAlert(false)
  }

  const filteredDescription = (descriptions: any) => {
    if (descriptions && valueData) {
      console.log(descriptions, "descriptions");
      const res = descriptions.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        const filter = i.objective_type === valueData;
        // setFilteredData(filter);
        return filter;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };
  // console.log(descriptionData);

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  const checkboxIdHandler = (res: any[]) => {
    if (res) {
      const check = res.map((i: any) => {
        return {
          name: i._id,
        };
      });
      return check;
    }
  };

  // useEffect(() => {
  //   if (templateDescriptionData) {
  //     setDescriptionData(templateDescriptionData.data);
  //   }
  // }, []);

  // useEffect(() => {
  //   //@ts-ignore
  //   getIds(checkboxHandler(descriptionData));
  // }, [descriptionData]);

  // const handleChange = (e: any) => {
  //     const {name, checked} = e.target;
  //     // console.log(name);
  //     if (name === "allselect") {
  //
  //
  //         const tempDesc = filteredDescription(descriptionData).map((desc: any) => {
  //             return { ...desc, isChecked: checked };
  //         });
  //         setDescriptionData(tempDesc);
  //
  //         const tempDescc = filteredDescription([...descriptionData]).map((desc: any) => {
  //
  //             setDescriptionData((prevState: any) => {
  //                 return {...prevState, isChecked: checked};
  //             });
  //             return {...desc, isChecked: checked};
  //         });
  //
  //
  //      // console.log(filteredDescription(descriptionData).map((desc: any) => {
  //      //
  //      //        return {...desc, isChecked: checked};
  //      //
  //      //    }));
  //     } else {
  //
  //         const tempDesc = descriptionData.map((desc: any) =>
  //             desc._id === name ? {...desc, isChecked: checked} : desc
  //         );
  //         // // console.log(tempDesc, "run");
  //         setDescriptionData(tempDesc);
  //     }
  // };

  const objectiveTypeUpdater = () => {
    setObjectiveType((prevState: any) => {
      const fil = prevState
        .filter((descc: any) => {
          return descc._id === valueData;
        })
        .map((descc: any) => {
          console.log(descc, 'check')
          return { ...descc, isChecked: true };
        });


      console.log(
        prevState.filter((descc: any) => {
          return descc._id === valueData;
        }),
        "prevState"
      );
      const newArr = [...prevState, ...fil];

      let uniqueObjArray = [
        // @ts-ignore
        ...new Map(newArr.map((item) => [item["_id"], item])).values(),
      ];
      console.log(uniqueObjArray, "new");
      return uniqueObjArray;
    });

  };

  const handleCheckboxLevel1 = (e: any, id: any) => {
    console.log(id, "newid");

    // setUncheckLevel(!uncheckLevel)

    const { name, checked } = e.target;
    setnavPrompt(true);
    //settriggerTheNav1(true);
    console.log(checked, 'checkedLevel1')
    setDescriptionData((prevState: any) => {
      return descriptionData.map((desc: any) => {
        // console.log(desc._id,desc._id === name , name,checked, 'checked');
        if (desc._id === name) {
          setLevel1Checked(checked)
        }
        return desc._id === name
          ? {
            ...desc,
            level_1_isChecked: checked,
            isChecked: checked,
            level_2_isChecked: false,
            level_3_isChecked: false,
            level_4_isChecked: false,
          }
          : desc;
      });
    });

    objectiveTypeUpdater();

    // const tempDesc = descriptionData.map((desc: any) =>
    //     desc._id === name ? { ...desc, isChecked: checked } : desc
    // );
    // // // console.log(tempDesc, "run");
    // setDescriptionData(tempDesc);
  };

  const handleCheckboxLevel2 = (e: any) => {
    const { name, checked } = e.target;
    settriggerTheNav1(true);
    setnavPrompt(true);
    setDescriptionData((prevState: any) => {
      return descriptionData.map((desc: any) => {
        return desc._id === name
          ? {
            ...desc,
            level_2_isChecked: checked,
            isChecked: checked,
            level_1_isChecked: false,
            level_3_isChecked: false,
            level_4_isChecked: false,
          }
          : desc;
      });
    });

    objectiveTypeUpdater();
  };

  const handleCheckboxLevel3 = (e: any) => {
    const { name, checked } = e.target;
    settriggerTheNav1(true);
    setnavPrompt(true);
    setDescriptionData((prevState: any) => {
      return descriptionData.map((desc: any) => {
        return desc._id === name
          ? {
            ...desc,
            level_3_isChecked: checked,
            isChecked: checked,
            level_1_isChecked: false,
            level_2_isChecked: false,
            level_4_isChecked: false,
          }
          : desc;
      });
    });

    objectiveTypeUpdater();
  };

  const handleCheckboxLevel4 = (e: any) => {
    const { name, checked } = e.target;
    settriggerTheNav1(true);
    setnavPrompt(true);
    setDescriptionData((prevState: any) => {
      return descriptionData.map((desc: any) => {
        return desc._id === name
          ? {
            ...desc,
            level_4_isChecked: checked,
            isChecked: checked,
            level_2_isChecked: false,
            level_3_isChecked: false,
            level_1_isChecked: false,
          }
          : desc;
      });
    });

    objectiveTypeUpdater();
  };
  const [checkLevel, setcheckLevel] = useState<any>(false)
  const handleChange = (e: any) => { 
    setnavPrompt(true);
    settriggerTheNav1(true);    
    const { name, checked } = e.target;
    // console.log(name);
    if (name === "allselect") {
      const tempDesc = descriptionData.map((desc: any) => {
        // return { ...desc, isChecked: checked };
        return { ...desc };
      });
      // setDescriptionData(tempDesc);
      setDescriptionData((prevState: any) => {
        console.log(prevState, "prevState");
        const fil = filteredDescription(prevState).map((descc: any) => {
          return { ...descc, isChecked: checked };
        });

        const newArr = [...tempDesc, ...fil];

        let uniqueObjArray = [
          // @ts-ignore
          ...new Map(newArr.map((item) => [item["_id"], item])).values(),
        ];
        console.log(uniqueObjArray, "new");
        return uniqueObjArray;
      });
    }

    else {
      //   if (level1Checked === true) {
      //     setSelectLevelAlert(false)
      //   } else {
      //     setSelectLevelAlert(true)
      //   }  
      
        const tempDesc = descriptionData.map((desc: any) => {
 if (desc._id === name && desc.isTitleChecked === false  ) {
   return {
    ...desc,
    isChecked: checked,
    level_1_isChecked: false,
    level_2_isChecked: false,
    level_3_isChecked: false,
    level_4_isChecked: false,
 }
 }else{
  return (desc._id === name && (desc.level_1.level_definition === undefined &&
    desc.level_2.level_definition === undefined &&
    desc.level_3.level_definition === undefined &&
    desc.level_4.level_definition === undefined))
    ? {
      ...desc,
      isChecked: checked,
      level_1_isChecked: false,
      level_2_isChecked: false,
      level_3_isChecked: false,
      level_4_isChecked: false,
    }
    : desc
 }
          // return (desc._id === name && (desc.level_1.level_definition === undefined &&
          //   desc.level_2.level_definition === undefined &&
          //   desc.level_3.level_definition === undefined &&
          //   desc.level_4.level_definition === undefined))
          //   ? {
          //     ...desc,
          //     isChecked: checked,
          //     level_1_isChecked: false,
          //     level_2_isChecked: false,
          //     level_3_isChecked: false,
          //     level_4_isChecked: false,
          //   }
          //   : desc
        }
        );
        // // console.log(tempDesc, "run");      
      
        setDescriptionData(tempDesc);
     
      // else if (checked === false) {
      //   const tempDesc = descriptionData.map((desc: any) => {
      //     console.log(desc, 'desccccc')
      //     return desc._id === name
      //       ? {
      //         ...desc,
      //         isChecked: false,
      //         level_1_isChecked: false,
      //         level_2_isChecked: false,
      //         level_3_isChecked: false,
      //         level_4_isChecked: false,
      //       }
      //       : desc
      //   }
      //   );
      //   // // console.log(tempDesc, "run");
      //   setDescriptionData(tempDesc);
      // }


    }

    setObjectiveType((prevState: any) => {
      const fil = prevState
        .filter((descc: any) => {
          return descc._id === valueData;
        })
        .map((descc: any) => {
          return { ...descc, isChecked: true };
        });

      console.log(
        prevState.filter((descc: any) => {
          return descc._id === valueData;
        }),
        "prevState"
      );
      const newArr = [...prevState, ...fil];

      let uniqueObjArray = [
        // @ts-ignore
        ...new Map(newArr.map((item) => [item["_id"], item])).values(),
      ];
      console.log(uniqueObjArray, "new");
      return uniqueObjArray;
    });
  };

  useEffect(() => { }, [handleChange]);

  useEffect(() => {
    console.log(checkboxHandler(filteredDescription(descriptionData)), "useEffect");
    if (checkboxHandler(descriptionData).length === 0 || checkboxHandler(filteredDescription(descriptionData)).length === 0) {
      console.log("zeroo");
      return setObjectiveType((prevState: any) => {
        const fil = prevState
          .filter((descc: any) => {
            return descc._id === valueData;
          })
          .map((descc: any) => {
            return { ...descc, isChecked: false };
          });
        const newArr = [...prevState, ...fil];
        let uniqueObjArray = [
          // @ts-ignore

          ...new Map(newArr.map((item) => [item["_id"], item])).values(),
        ];
        return uniqueObjArray;
      });
    }
  }, [descriptionData, level1Checked]);

  // const onSubmit = (e: any) => {
  //   e.preventDefault()
  // //   console.log(checkboxHandler(descriptionData), 'filtered data ')
  // }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    return setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [state, setState] = useState(false);
  const [hide, setHide] = useState(true);
  const [showAddObjectiveDescription, setShowAddObjectiveDescription] =
    useState(false);

  const addObjectiveHandler = () => {
    console.log("run");
    setState(true);
    setHide(false);
  };

  console.log(uncheckLevel, "uncheckLevel");
  console.log(filteredDescription(descriptionData),'filteredDesc')
  return (
    <Box
      /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
      height="calc(100vh - 210px)"
      border={1}
      borderColor="#e0e0e0"
    // width={380}
    // marginLeft="-50px"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
          height: "50px",
        }}
      >
        <Typography
          style={{
            color: "#3E8CB5",
            fontSize: "18px",
            fontFamily: "Arial",
            // marginTop: "5px",
            // margin: "25px",
            padding: "10px",
          }}
        >
          {/* Objective Description */}
          Objective Title
        </Typography>
      </div>
      <Scroll>
      <Scrollbar style={{ height: "calc(100vh - 260px)" }}>
        <div style={{ margin: "25px" }}>
          <form>
            <div>
              {/* {descriptionData &&filteredDescription(descriptionData).level_1?.level_definition == "" &&
                        descriptionData &&filteredDescription(descriptionData).level_2?.level_definition == "" &&
                        descriptionData &&filteredDescription(descriptionData).level_3?.level_definition == "" &&
                        descriptionData &&filteredDescription(descriptionData).level_4?.level_definition == "" && */}
              {filteredDescription(descriptionData)
                .filter((active:any) => {
                  return active.isTitleActive === true
                }).length !== 0 &&
                // .filter((item: any) => item.isTitleActive == true).length == 0 &&
                 filteredDescription(descriptionData)
                .filter((item: any) => item.isTitleChecked == true).length == 0 &&
                 (
                  <div
                    style={{
                      paddingBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <input
                      style={{
                        height: "12px",
                        width: "12px",
                      }}
                      type="checkbox"
                      name="allselect"
                      checked={
                        descriptionData &&
                        filteredDescription(descriptionData).filter(
                          (desc: any) => desc.isChecked !== true
                        ).length < 1
                      }
                      onChange={handleChange}
                    />
                    <label
                      style={{
                        color: "#333333",
                        fontFamily: "Arial",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      All
                    </label>
                  </div>
                )}
            </div>

            {descriptionData &&
              filteredDescription(descriptionData).filter((active:any) => {
                return active.isTitleActive === true
              }).map((desc: any) => {
                console.log(desc,'desc')
                return (
                  <>
                    <div
                      style={{
                        //   paddingBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                      }}
                      key={desc._id}
                    >
                      <div>
                        <input
                          type="checkbox"
                          style={{
                            height: "12px",
                            width: "12px",
                          }}
                          name={desc._id}
                          checked={
                            (desc.isChecked || false) &&
                            checkboxHandler(
                              filteredDescription(descriptionData)
                            )
                          }
                          onChange={handleChange}
                        // onClick={onSubmit}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            color: "#333333",
                            fontFamily: "Arial",
                            fontSize: "14px",
                            wordBreak:"break-word"
                          }}
                        >
                          {desc.objectiveTitle}
                        </label>
                      </div>
                    </div>
                    <div style={{ paddingLeft: "15px" }}>
                      {/* <Button
                                                style={{
                                                    textTransform: "none",
                                                    fontWeight: "400",
                                                    fontSize: "14px",
                                                    textDecoration: "underline",
                                                    color: "skyblue",
                                                }}
                                                id="basic-button"
                                                color="inherit"
                                                aria-controls={open ? "basic-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? "true" : undefined}
                                                onClick={handleClick}
                                            >
                                                Levels:1.2.3
                                            </Button> */}
                      {/*<Menu*/}
                      {/*  style={{ width: "50%" }}*/}
                      {/*  id="basic-menu"*/}
                      {/*  anchorEl={anchorEl}*/}
                      {/*  open={open}*/}
                      {/*  onClose={handleClose}*/}
                      {/*  MenuListProps={{*/}
                      {/*    "aria-labelledby": "basic-button",*/}
                      {/*  }}*/}
                      {/*>*/}
                      <Stack direction="row" style={{ paddingBottom: "10px" }}>
                        
                        {desc?.isTitleChecked === true &&
                          <div >
                          {desc.level_1?.level_definition != "" &&
                            desc.level_1?.level_definition != undefined && (
                              <Typography
                                style={{
                                  // borderBottom: "1px solid lightgrey",
                                  marginLeft: "5px",
                                  marginRight: "5px",

                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={desc._id}
                                    onChange={(e: any) => {
                                      setUncheckLevel(!uncheckLevel);
                                      handleCheckboxLevel1(e, desc._id);
                                      settriggerTheNav1(true);                                      
                                    }}
                                    checked={desc.level_1_isChecked || false}
                                    // checked={((uncheckLevel === true) ? false : desc.level_1_isChecked)  || false}


                                    style={{
                                      height: "12px",
                                      width: "12px",
                                    }}
                                  />
                                  <span
                                    style={{
                                      paddingLeft: "7px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      whiteSpace: "nowrap"

                                    }}
                                  >
                                    L1
                                  </span>
                                </div>
                                {/* <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_1.level_definition}
                                                        </p> */}
                                {/* {desc.level_1.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })} */}
                              </Typography>
                            )}
                        </div>}
                        {desc?.isTitleChecked === true &&
                        <div >
                          {desc.level_2.level_definition != "" &&
                            desc.level_2.level_definition != undefined && (
                              <Typography
                                style={{
                                  // borderBottom: "1px solid lightgrey",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={desc._id}
                                    onChange={handleCheckboxLevel2}
                                    checked={desc.level_2_isChecked || false}
                                    style={{
                                      height: "12px",
                                      width: "12px",
                                    }}
                                  />
                                  <span
                                    style={{
                                      paddingLeft: "7px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      whiteSpace: "nowrap"

                                    }}
                                  >
                                    L2
                                  </span>
                                </div>
                                {/* <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_2.level_definition}
                                                        </p> */}
                                {/* {desc.level_2.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })} */}
                              </Typography>
                            )}
                        </div>}
                        {desc?.isTitleChecked === true &&
                        <div >
                          {desc.level_3?.level_definition != "" &&
                            desc.level_3?.level_definition != undefined && (
                              <Typography
                                style={{
                                  //   borderBottom: "1px solid lightgrey",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={desc.level_3_isChecked || false}
                                    onChange={handleCheckboxLevel3}
                                    style={{
                                      height: "12px",
                                      width: "12px",
                                    }}
                                    name={desc._id}
                                  />
                                  <span
                                    style={{
                                      paddingLeft: "7px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      whiteSpace: "nowrap"

                                    }}
                                  >
                                    L3
                                  </span>
                                </div>
                                {/* <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_3.level_definition}
                                                        </p> */}
                                {/* {desc.level_3.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })} */}
                              </Typography>
                            )}
                        </div>}
                        {desc?.isTitleChecked === true &&
                        <div >
                          {desc.level_4?.level_definition != "" &&
                            desc.level_4?.level_definition != undefined && (
                              <Typography
                                style={{
                                  //   borderBottom: "1px solid lightgrey",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "5px",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    name={desc._id}
                                    checked={desc.level_4_isChecked || false}
                                    onChange={handleCheckboxLevel4}
                                    style={{
                                      height: "12px",
                                      width: "12px",
                                    }}
                                  />
                                  <span
                                    style={{
                                      paddingLeft: "7px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      whiteSpace: "nowrap"

                                    }}
                                  >
                                    L4
                                  </span>
                                </div>
                                {/* <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {desc.level_4.level_definition}
                                                        </p> */}
                                {/* {desc.level_4.behavioral_objective.map((i: any) => {
                                                            return (
                                                                <p
                                                                    style={{
                                                                        paddingLeft: "37px",
                                                                        fontSize: "12px",
                                                                        opacity: "75%",
                                                                    }}
                                                                >
                                                                    {i}
                                                                </p>
                                                            )
                                                        })} */}
                              </Typography>
                            )}
                        </div>}
                      </Stack>
                      {/*</Menu>*/}
                    </div>
                  </>
                );
              })}

            {/*{descriptionData &&*/}
            {/*    descriptionData.map((desc: any) => {*/}
            {/*        return (*/}
            {/*            <div key={desc._id}>*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    name={desc._id}*/}
            {/*                    checked={desc.isChecked || false}*/}
            {/*                    onChange={handleChange}*/}
            {/*                    // onClick={onSubmit}*/}
            {/*                />*/}
            {/*                <label> {desc.description}</label>*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}
          </form>

          <Dialog
            style={{
              marginTop: "80px",
              height: "calc(100vh - 50px)",
            }}
            
            // fullWidth
            maxWidth="xl"
            open={selectLevelAlert}
            onClose={HandleLevelAlertClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              style={{
                backgroundColor: "#EBF1F5",
                color: "#004C75",
                fontFamily: "regular",
                fontSize: "18px",
                padding: "0px 20px",
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
              }}
              id="alert-dialog-title"
            >
              {"Template Title"}
              <p
                style={{
                  display: "flex",
                  float: "right",
                  alignItems: "center",
                }}
              >
                <img
                  width={18}
                  height={18}
                  src={Closeicon}
                  onClick={HandleLevelAlertClose}
                />
              </p>
            </DialogTitle>
            <DialogContent
              style={{ height: "185px", padding: "1px 226px" }}
            >

              <DialogContentText
                style={{
                  marginTop: "60px",
                  // marginLeft: "330px",
                  fontSize: "14px",
                  color: "#333333",
                  fontFamily: "regular",
                }}
                id="alert-dialog-description"
              >

                <div>
                  Select one of the levels !
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                paddingBottom: "112px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                // marginRight: "10px",
                width: "70px",
                height: "35px",
                background: "transparent",
                }}
                variant="outlined"
                onClick={() => {
                  HandleLevelAlertClose()
                }}
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Scrollbar>
      </Scroll>
    </Box>
  );
}

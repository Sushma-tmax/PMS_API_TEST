/* eslint-disable */
import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ObjectiveDescription from "../Template/ObjectiveDescriptionEdit";
import ObjectiveTemplate from "../Template/ObjectiveTemplate";
import Container from "@mui/material/Container";
import PAMaster from "../UI/PAMaster";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AlertDialog } from "..";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import { Scrollbar } from "react-scrollbars-custom";
import _ from "lodash";
import { CREATE_MAPPING, VIEW_TEMPLATE } from "../../constants/routes/Routing";
import { useGetObjectiveTitleQuery } from "../../service";

const Col1 = styled("div")({
  color: "green",
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//console.log(` outer height  is ${showHeight}`);

export default function EditTemplate(props: any) {
  const [ConStyle, setConStyle] = useState(false);
  const [active, setActive] = useState<any>(" ");
  // const [active, setActive] = useState("ObjectiveDescription");
  const [activeId, setActiveId] = useState("");
  const [activeDesc, setActiveDesc] = useState<any>([]);
  const [objectiveType, setObjectiveType] = useState<any>([]);
  const [temp, setTemp] = useState<any>([]);
  const [objectiveGroup, setObjectiveGroup] = useState<any>();
  const [activeObjectiveType, setActiveObjectiveType] = useState([]);
  const [title, setTitle] = useState("");
  const [disableCheck, setDisableCheck] = useState(true);
  const [textfeildError, settextfeildError] = useState(false);
  const [hide, setHide] = useState(false);
  const [hide2, setHide2] = useState(false);

  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");

  const {
    typeData,
    descriptionData,
    onSubmit,
    singleTemplate,
    calenderData,
    templateData,
    loadTemplate,
    all,
  } = props;

  console.log(props, "props");

  console.log(typeData, "objectiveType from desc");

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  //You have to check weather activeObjectiveType Containts the selected row._id

  // console.log(objectiveType.map((t:any) => {
  //     return t.filter((i:any) => {
  //         return  i.objective_group._id === "61fe1f3bb2fa7bad1aaa81c4"
  //     })
  // }), 'map')

  useEffect(() => {
    if (typeData) {
      setObjectiveType(() => {
        return typeData.map((t: any) => {
          return {
            ...t,
            // objective_group: t.objective_group.name,
            objective_group: t.objective_group.name,
            isChecked: t.isChecked,
            isDisabled: true,
          };
        });
      });
    }
  }, [typeData]);

  useEffect(() => {
    if (descriptionData) {
      setActiveDesc(descriptionData);
      
    }
  }, [descriptionData]);
console.log(singleTemplate,'aaaaa')
  console.log(activeDesc, 'aaaaaaaaaa')
  
  const getIdHandler = (id: any) => {
    if (id) {
      const res = id.map((item: any) => {
        return {
          ...item,
        };
      });

      setActiveDesc(res);
      return res;
    }
  };

  const objectiveTypeHandler = (id: string) => {
    setConStyle(true);
    setActive("ObjectiveDescription");
    setActiveId(id);
    setActiveObjectiveType((prevState: any) => {
      // if (prevState.includes(id)) {
      //     return prevState.filter((item: any) => item !== id);
      // } else {
      //     return [...prevState, id];
      // }

      const filtered = objectiveType.filter((item: any) => {
        return item.isChecked === true;
      });
      return filtered;
    });
  };

  // const objectiveGroupIdHandler = () => {
  //     const mapped = activeDesc.map((item: any) => {
  //         console.log(item, "item");
  //         return item.objective_type.objective_group;
  //     });
  //
  //     // @ts-ignore
  //     const id = _.uniq(mapped, "name");
  //     const idWithName = id.map((item: any) => {
  //         return {
  //             name: item,
  //         };
  //     });
  //
  //
  //     // @ts-ignore
  //     setObjectiveGroup(idWithName);
  // };

  const objectiveGroupIdHandler = (arr: any) => {
    const filt = arr
      .filter((i: any) => {
        return i.isChecked === true;
      })
      .map((item: any) => {
        console.log(item, "item");
        return {
          name: item.objective_group._id,
        };
      });

    // @ts-ignore
    const id = _.uniqBy(filt, "name");
    console.log(id, "id");
    return id;
    // @ts-ignore
    // setObjectiveGroup(idWithName);
  };

  const toar = (): any => {
    if (activeDesc) {
      const fiar = _.groupBy(activeDesc, "objective_type._id");
      return fiar;
      // console.log( _.groupBy(activeDesc, 'objective_type._id'), 'group by type to desc')
    }
  };

  // console.log(activeDesc.map((i: any) => i), 'active desc')

  const tomap = Object.entries(toar());

  const ob = () => {
    return tomap.map((k: any) => {
      return {
        objective_description: k[1].map((i: any) => {
          return {
            name: i._id,
          };
        }),
        name: k[0],
      };
    });
  };

  const addNametoId = (arr: any) => {
    return arr
      .filter((i: any) => {
        return i.isChecked === true;
      })
      .map((item: any) => {
        return {
          name: item._id,
          isChecked: item.isChecked,
        };
      });
  };

  const addNametoIdDesc = (arr: any) => {
    return arr
      .filter((i: any) => {
        return i.isChecked === true;
      })
      .map((item: any) => {
        return {
          name: item._id,
          isChecked: item.isChecked,
          level_1_isChecked: item.level_1_isChecked,
          level_2_isChecked: item.level_2_isChecked,
          level_3_isChecked: item.level_3_isChecked,
          level_4_isChecked: item.level_4_isChecked,
          
        };
      });
  };

  useEffect(() => {
    // objectiveGroupIdHandler(objectiveType)
    setTemp(ob());
  }, [activeDesc, activeId, objectiveType]);

  // console.log(Object.entries(toar()), 'object entries')

  // console.log(toar()!['61fe1fc78a20e5c4eaa48d65'].map((h: any) => {
  //     return {
  //         name: h._id
  //     }
  // }), 'group by id')

  // const g =
  const handleChange = (event: any) => {
    console.log("rnning");
    const { name, checked } = event.target;
    if (checked === true) {
      console.log(checked, "checkkedd");
      const objectiveTypee = objectiveType.map((desc: any) => {
        return desc._id === name ? { ...desc, isChecked: checked } : desc;
      });
      console.log(objectiveTypee, "objective  type type");
      setObjectiveType(objectiveTypee);
    }

    if (checked === false) {
      console.log(checked, "checkkedd");
      const objectiveTypee = objectiveType.map((desc: any) => {
        return desc._id === name ? { ...desc, isChecked: checked } : desc;
      });
      console.log(objectiveTypee, "objective  type type");
      setObjectiveType(objectiveTypee);

      const tempDesc = activeDesc.map((desc: any) => {
        // return { ...desc, isChecked: checked };
        return { ...desc };
      });

      setActiveDesc((prevState: any) => {
        console.log(prevState, "prevState");
        const fil = filteredDescription(prevState).map((descc: any) => {
          return { ...descc, isChecked: false };
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
  };

  useEffect(() => {
    if (activeDesc) {
      const res = activeDesc.filter((i: any) => {
        return i.isChecked === true;
      });
      if (res.length > 0) {
        setHide2(true);
      } else if (res.length === 0) {
        setHide2(false);
      }
      console.log(res, "res");
      return res;
    }
  }, [activeDesc, activeId]);

  const navigate = useNavigate();
  const createHandler = (e: any) => {
    if (title === "") {
      return settextfeildError(true);
    } else {
      return (
        settextfeildError(false),
        setIsOpen(false),
        e.preventDefault(),
        onSubmit({
          name: title,
          weightage: {
            objective_group: objectiveGroupIdHandler(objectiveType),
            objective_type: addNametoId(objectiveType),
            objective_description: addNametoIdDesc(activeDesc),
          },
        }),
        // .then(() =>{
        // navigate(`${CREATE_MAPPING}`)
        // )
        setHide(true)
      );
    }
  };

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleDialogNo = () => {
    setOpen(false);
    setIsOpen(true);
  };
  const filteredDescription = (descriptions: any) => {
    if (descriptions && activeId) {
      console.log(descriptions, "descriptions checkbox");
      const res = descriptions.filter((i: any) => {
        // console.log(i.objective_type._id , 'id', valueData);
        const filter = i.objective_type === activeId;
        // setFilteredData(filter);
        return filter;
      });
      // console.log(res, 'descriptions')
      return res;
    }
  };

  useEffect(() => {
    if (activeId && activeDesc && objectiveType) {
      setObjectiveType((prevState: any) => {
        return prevState.map((item: any) => {
          if (
            item._id === activeId &&
            checkboxHandler(filteredDescription(activeDesc)).length > 0
          ) {
            console.log(item._id === activeId, "disable running");
            return { ...item, isDisabled: false };
          } else if (
            checkboxHandler(filteredDescription(activeDesc)).length === 0
          ) {
            console.log(item._id === activeId, " disable running 2");
            return { ...item, isDisabled: true };
          }

          return item._id === activeId &&
            checkboxHandler(filteredDescription(activeDesc)).length > 0
            ? {
                ...item,
                isDisabled: true,
              }
            : item;
        });
      });
      if (
        activeId &&
        activeDesc &&
        objectiveType &&
        checkboxHandler(filteredDescription(activeDesc)).length === 0
      ) {
        return setDisableCheck(true);
      }
      if (checkboxHandler(filteredDescription(activeDesc)).length > 0) {
        return setDisableCheck(false);
      }
    }
  }, [activeDesc, activeId]);

  useEffect(() => {
   
    if (singleTemplate) {
      console.log(singleTemplate,'ssssssssss')
      setTitle(singleTemplate.template.name);    
     
    }
  }, [singleTemplate]);

  return (
    <>                          
      <PAMaster name={`Edit ${title}`}/>
      <Container
        sx={{
          maxWidth: "96% !important",
          width: "100%",
          height: "calc(100vh - 145px)",
          backgroundColor: "#fff",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <React.Fragment>
            <Grid container spacing={1}>
              <Grid container item spacing={22}>
                <Grid item xs={4}>
                  <Box
                    bgcolor="#fff"
                    /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
                    minHeight="calc(100vh - 180px)"
                    border={1}
                    borderColor="#e0e0e0"
                    width={400}
                    marginTop={2}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <p
                        style={{
                          color: "#004C75",
                          fontSize: "22px",
                          fontFamily: "regular",
                          marginTop: "5px",
                          margin: "25px",
                        }}
                      >
                        Objective Type
                      </p>
                    </div>

                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Scrollbar
                        style={{ width: 380, height: "calc(100vh - 265px)" }}
                      >
                        {objectiveType &&
                          objectiveType.map((i: any, index: number) => {
                            return (
                              <Grid
                                key={i._id}
                                borderColor="#004C75"
                                display="flex"
                                alignItems="flex-start"
                                flexDirection="column"
                                //boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.1)"
                                boxShadow="1px 1px 10px 1px rgba(0, 0, 0, 0.1)"
                                width={350}
                                height={70}
                                marginTop={2}
                                onClick={() => {
                                  objectiveTypeHandler(i._id);
                                }}
                              >
                                <div
                                  style={{
                                    // @ts-ignore
                                    border:
                                      ConStyle &&
                                      // @ts-ignore
                                      activeObjectiveType.includes(i._id) &&
                                      "1px solid blue",
                                    minWidth: "350px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      minWidth: "300px",
                                      alignItems: "center",
                                      zIndex: 200,
                                    }}
                                  >
                                    <div>
                                      <p
                                        style={{
                                          // color : "green",
                                          color: "#434545",
                                          fontFamily: "regular",
                                          fontSize: "14px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        {i.name}
                                      </p>
                                      <p
                                        style={{
                                          color: "#333333",
                                          opacity: "50%",
                                          fontFamily: " regular",
                                          fontSize: "13px",
                                          marginLeft: "20px",
                                          marginTop: "-8px",
                                        }}
                                      >
                                        {i.objective_group.name}
                                      </p>
                                    </div>
                                    <input
                                      type="checkbox"
                                      onChange={handleChange}
                                      name={i._id}
                                      disabled={i.isDisabled}
                                      // disabled={true}
                                      checked={i.isChecked || false}
                                      style={{
                                        height: "20px",
                                        width: "19px",
                                        position: "absolute",
                                        left: "300px",
                                      }}

                                      // onClick={onSubmit}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          })}
                      </Scrollbar>
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  {active === "ObjectiveDescription" && singleTemplate && (
                    <ObjectiveDescription
                      templateDescriptionData={descriptionData}
                      getIds={getIdHandler}
                      valueData={activeId}
                      setObjectiveType={setObjectiveType}
                      descriptionData={activeDesc}
                      setDescriptionData={setActiveDesc}
                      all={all}
                      singleTemplate = {singleTemplate}
                    />
                  )} 
                </Grid>
                {hide && <ObjectiveTemplate templateData={templateData} />}
                {hide
                  ? ""
                  : active === "ObjectiveDescription" &&
                    hide2 && (
                      //   <Grid item xs={4}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontFamily: "regular",
                          // margin: "30px",
                          // paddingLeft: "60px",
                          paddingTop: "190px",
                          paddingLeft: "270px",
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
                          onClick={handleDialogOpen}
                        >
                          Save
                        </Button>

                        <Dialog
                          style={{
                            marginTop: "80px",
                            height: "calc(100vh - 50px)",
                          }}
                          // fullWidth
                          maxWidth="xl"
                          open={open}
                          onClose={handleDialogClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle
                            style={{
                              fontFamily: "regular",
                              backgroundColor: "#EBF1F5",
                              color: "#004C75",
                              fontSize: "18px",
                              padding: "0px 20px",
                              justifyContent: "space-between",
                              alignItems: "center",
                              display: "flex",
                            }}
                            id="alert-dialog-title"
                          >
                            {/* {"Add more objective type"} */}
                            
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
                                onClick={handleDialogClose}
                              />
                            </p>
                          </DialogTitle>
                          <DialogContent
                            style={{ height: "140px", padding: "10px 200px" }}
                          >
                            <DialogContentText
                              style={{
                                marginTop: "100px",
                                // marginLeft: "270px",
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "regular",
                              }}
                              id="alert-dialog-description"
                            >
                              Do you wish to add more objective type?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions
                            style={{
                              paddingBottom: "140px",
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
                              onClick={handleDialogClose}
                              autoFocus
                            >
                              Yes
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
                              onClick={handleDialogNo}
                            >
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <Dialog
                          style={{
                            marginTop: "80px",
                            height: "calc(100vh - 50px)",
                          }}
                          // fullWidth
                          maxWidth="xl"
                          open={isOpen}
                          onClose={handleDialogClose}
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
                            {"Create Template Title"}
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
                                onClick={handleDialogClose}
                              />
                            </p>
                          </DialogTitle>
                          <DialogContent
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "2px 226px",
                            }}
                          >
                            <DialogContentText
                              style={{
                                marginTop: "80px",
                                marginLeft: "330",
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "regular",
                              }}
                              id="alert-dialog-description"
                            >
                              Enter a template title
                              <div>
                                <TextField
                                  style={{
                                    marginTop: "25px",
                                    width: "350px",
                                    marginLeft: "-60px",
                                  }}
                                  autoFocus
                                  margin="dense"
                                  id="name"
                                  multiline
                                  rows={1}
                                  type="text"
                                  size="small"
                                  variant="outlined"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  error={!title && textfeildError}
                                  helperText={
                                    !title && textfeildError
                                      ? "*Title required."
                                      : " "
                                  }
                                />
                              </div>
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions
                            style={{
                              paddingBottom: "100px",
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
                              onClick={createHandler}
                              autoFocus
                            >
                              Save
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
                              onClick={handleDialogClose}
                            >
                              Cancel
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Link to={VIEW_TEMPLATE}>
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
                          >
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    )}
              </Grid>
            </Grid>
            {/* </Grid> */}
          </React.Fragment>
        </Stack>
      </Container>
    </>
  );
}

import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ObjectiveDescription from "./ObjectiveDescription";
import ObjectiveTemplate from "./ObjectiveTemplate";
import Container from "@mui/material/Container";
import PAMaster from "../../components/UI/PAMaster";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import Closeicon from "../../assets/Images/Closeicon.svg";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Scrollbar } from "react-scrollbars-custom";
import AlertDialogSuccess from "../UI/DialogSuccess";
import _ from "lodash";
import {
  CREATE_MAPPING,
  CREATE_TEMPLATE_1,
  EDIT_TEMPLATE_1,
  EDIT_VIEW_TEMPLATE,
  MASTER_NAV,
} from "../../constants/routes/Routing";
import {
  useAddWeightageMutation,
  useCreateTemplateMutation,
  useEditTemplateMutation,
  useGetFeedBackQuery,
  useGetObjectiveDescriptionQuery,
  useGetObjectiveGroupQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useGetOtherRecommendationQuery,
  useGetSingleTemplateQuery,
  useGetTemplateQuery,
  useGetTrainingRecommendationQuery,
} from "../../service";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

//import { CREATE_MAPPING } from "../../constants/routes/Routing";

const Col1 = styled("div")({
  color: "green",
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});

const Tf3 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",
    textTransform: "none",
  },
});

//console.log(` outer height  is ${showHeight}`);

export default function TemplateObjectives(props: any) {
  const [ConStyle, setConStyle] = useState(false);
  const [uncheckLevel, setUncheckLevel] = useState(false);
  const [active, setActive] = useState(" ");
  const [activeId, setActiveId] = useState("");
  const [activeDesc, setActiveDesc] = useState<any>([]);
  const [objectiveType, setObjectiveType] = useState<any>([]);
  const [objectiveTypeWithTitle, setObjectiveTypeWithTitle] = useState<any>([]);
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  const [temp, setTemp] = useState<any>([]);
  const [objectiveGroup, setObjectiveGroup] = useState<any>([]);
  const [activeObjectiveType, setActiveObjectiveType] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [save, setSave] = useState(false);
  const [nextAlert, setNextAlert] = useState(false);
  const [nextAlertMessage, setNextAlertMessage] = useState(false);
  const [disableCheck, setDisableCheck] = useState(true);
  const [hideAlert, setHideAlert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [message, setMessage] = useState<any>("")
  const {
    calenderData,
    templateData,
    isLoading,
    tab,
    setTabs,
    navPrompt,
    setnavPrompt,
    saveEdit,
    setSaveEdit,
    settriggerTheNav1
  } = props;

  const [objectiveLengthAlert, setObjectiveLengthAlert] = useState<any>(false);
  const [name, setName] = useState<any>("");
  const [checked, setChecked] = useState<any>();
  const [alertUncheckType, setAlertUncheckType] = useState(false);
  const [createAlert, setCreateAlert] = useState<any>(false);
  const [editAlert, setEditAlert] = useState<any>(false);
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [objChecked, setObjChecked] = useState(false)
  const [textfeildError, settextfeildError] = useState(false);
  const [createTemplate, { error, isError, data: loadingTemp }] =
    useCreateTemplateMutation();
  const [editTemplate, { isError: isErrorEdit }] = useEditTemplateMutation();

  const { data: tempData, isLoading: loadTemp } = useGetTemplateQuery("");
  const { data: descriptionData } = useGetObjectiveDescriptionQuery("");
  const { data: objectiveTypeData } = useGetObjectiveTypeQuery("");
  const { data: objectiveGroupData } = useGetObjectiveGroupQuery("");

  const [error1, setError1] = useState<any>(isError);
  const [error2, setError2] = useState<any>(isErrorEdit);
  const [duplicateError, setDuplicateError] = useState<any>(error);
  console.log(loadingTemp, "loadingTemp");
  console.log(duplicateError, isError, "error");
  const { id } = useParams();
  const { data: singleTemplate, isLoading: load } =
    useGetSingleTemplateQuery(id);

  const [selectedLength, setSelectedLength] = useState(0);

  const handleDialogCloseAlert = () => {
    setIsOpenAlert(false)
  }

  const checkboxHandler = (checkbox: any) => {
    if (checkbox) {
      const res = checkbox.filter((i: any) => {
        return i.isChecked === true;
      });
      return res;
    }
  };

  console.log(objectiveType, "objectiveType....");

  //You have to check weather activeObjectiveType Containts the selected row._id

  // console.log(objectiveType.map((t:any) => {
  //     return t.filter((i:any) => {
  //         return  i.objective_group._id === "61fe1f3bb2fa7bad1aaa81c4"
  //     })
  // }), 'map')

  // useEffect(() => {
  //   if (typeData) {
  //     setObjectiveType(() => {
  //       return typeData.data.map((t: any) => {
  //         return {
  //           ...t,
  //           objective_group: t.objective_group,
  //           isChecked: t.isChecked,
  //           isDisabled: true,
  //         };
  //       });
  //     });
  //   }
  // }, [typeData]);

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (isError === true) {
      setError1(true);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    } else {
      setError1(false);
    }
  }, [isError]);

  useEffect(() => {
    if (isErrorEdit === true) {
      setError2(true);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    } else {
      setError2(false);
    }
  }, [isErrorEdit]);

  useEffect(() => {
    if (objectiveGroupData) {
      setObjectiveGroup(objectiveGroupData.data);
    }
  }, [objectiveGroupData]);

  useEffect(() => {
    if (objectiveDescription) {
      console.log(objectiveDescription, "objectiveDescription");
      setActiveDesc(objectiveDescription);
    }
  }, [objectiveDescription]);

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
        console.log(item.isChecked, "isChecked");
        return item.isChecked === true;
      });
      console.log(filtered, "filtered");
      return filtered;
    });
  };

  const objectiveGroupIdHandler = (arr: any) => {
    const filt = arr
      .filter((i: any) => {
        return i.isChecked === true && i?.objective_group?.name;
      })
      .map((item: any) => {
        return {
          name: item.objective_group?.name._id,
          value: item.objective_group?.value
        };
      });

    // @ts-ignore
    const id = _.uniqBy(filt, "name");
    console.log(id, "id");
    return id;
    // const idWithName = id.map((item: any) => {
    //     return {
    //         name: item,
    //     };
    // });
    //
    // // @ts-ignore
    // setObjectiveGroup(idWithName);
  };

  // console.log(activeDesc.map((i: any) => i), 'active desc')

  const addNametoId = (arr: any) => {
    return arr
      .filter((i: any) => {
        return i.isChecked === true;
      })
      .map((item: any) => {
        console.log(item,'itemmmmmm')
        return {
          name: item._id,
         value:item.value,
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
          value:item.value,
          isChecked: item.isChecked,
          level_1_isChecked: item.level_1_isChecked,
          level_2_isChecked: item.level_2_isChecked,
          level_3_isChecked: item.level_3_isChecked,
          level_4_isChecked: item.level_4_isChecked,
        };
      });
  };

  const getObjectiveGroup = (id: any) => {
    console.log("find");
    if (id && singleTemplate) {
      return singleTemplate.template.weightage.objective_group.find(
        (item: any) => {
          console.log(item, "find");
          return item.name._id === id;
        }
      );
    }
  };

  const getObjectiveGroupName = (id: any) => {
    return objectiveGroup.find((item: any) => {
      return item._id === id;
    });
  };

  const findObjectiveTitleById = (id: any) => {
    if (descriptionData) {
      console.log(id, "objectiveTitleData");
      return descriptionData.data.find((item: any) => item._id === id);
    }
  };

  useEffect(() => {
    if (descriptionData && objectiveGroup && objectiveTypeData) {
      let oldobj: any[] = [];
      if (singleTemplate) {
        oldobj = singleTemplate.template.weightage.objective_description.map(
          (i: any) => {
            return {
              ...i.name,
              value:i.value,
              isChecked: i.isChecked,
              level_1_isChecked: i.level_1_isChecked,
              level_2_isChecked: i.level_2_isChecked,
              level_3_isChecked: i.level_3_isChecked,
              level_4_isChecked: i.level_4_isChecked,
              // objectiveTitle: findObjectiveTitleById(i.name.objectiveTitle),
              isDisabled: false,
            };
          }
        );
      }

      const newobj = descriptionData.data.map((i: any) => {
        return {
          ...i,
          objective_type: i.objective_type._id,
          isChecked: i.isChecked,
          // objective_title: findObjectiveTitleById(i.name.objective_title),
          isDisabled: false,
        };
      });

      // setObjectiveType(singleTemplate.template.weightage.objective_type)
      setObjectiveType(() => {
        const newObjType = objectiveTypeData.data.map((i: any) => {
          return {
            ...i,
            objective_group: {
              name: getObjectiveGroupName(i.objective_group._id),
            },
            isDisabled: true,
          };
        });
        let oldType: any[] = [];
        if (singleTemplate) {
          oldType = singleTemplate.template.weightage.objective_type.map(
            (i: any) => {
              return {
                ...i.name,
                value:i.value,
                objective_group: getObjectiveGroup(i.name.objective_group),
                isChecked: i.isChecked,
                isDisabled: true,
              };
            }
          );
        }
        console.log(oldType, "oldType");
        const newArr = [...newObjType, ...oldType];
        console.log(newArr, "newArr");
        let uniqueObjArray = [
          ...new Map(newArr.map((item) => [item["_id"], item])).values(),
        ];
        console.log(uniqueObjArray, "new");
        return uniqueObjArray;
      });
      setObjectiveDescription(() => {
        if (descriptionData) {
          const newArr = [...newobj, ...oldobj];
          // const newArr = [...newobj]         // @ts-ignore
          let uniqueObjArray = [
            ...new Map(newArr.map((item) => [item["_id"], item])).values(),
          ];
          return uniqueObjArray;
        }
      });
    }
  }, [singleTemplate, descriptionData, objectiveGroup, objectiveTypeData]);

  useEffect(() => {
    console.log(
      objectiveGroupIdHandler(objectiveType),
      "objectiveGroupIdHandler"
    );
  }, [activeDesc, activeId, objectiveType]);

  // useEffect(() => {
  //     setActiveObjectiveType(() => {
  //         // if (prevState.includes(id)) {
  //         //     return prevState.filter((item: any) => item !== id);
  //         // } else {
  //         //     return [...prevState, id];
  //         // }

  //         return objectiveTypeWithTitle.filter((item: any) => {
  //             return item.isChecked === true
  //         })
  //     });

  // },[objectiveTypeWithTitle])

  const handleChange = (event: any) => {
    console.log("rnning");
    const { name, checked } = event.target;
    setName(name);
    setChecked(checked);
    if (checked === true) {
      console.log(checked, "checkkedd");
      const objectiveTypee = objectiveType.map((desc: any) => {
        return desc._id === name ? { ...desc, isChecked: checked } : desc;
      });
      console.log(objectiveTypee, "objective  type type");
      setObjectiveType(objectiveTypee);
    }

    if (checked === false) {
      setAlertUncheckType(true);

      // const objectiveTypee = objectiveType.map((desc: any) => {
      //   return desc._id === name ? { ...desc, isChecked: checked } : desc;
      // });
      // console.log(objectiveTypee, "objective  type type");
      // setObjectiveType(objectiveTypee);

      // const tempDesc = activeDesc.map((desc: any) => {
      //   // return { ...desc, isChecked: checked };
      //   return { ...desc };
      // });

      // setActiveDesc((prevState: any) => {
      //   console.log(prevState, "prevState");
      //   const fil = filteredDescription(prevState).map((descc: any) => {
      //     return { ...descc, isChecked: false };
      //   });
      //   const newArr = [...tempDesc, ...fil];
      //   // @ts-ignore
      //   let uniqueObjArray = [
      //     // @ts-ignore
      //     ...new Map(newArr.map((item) => [item["_id"], item])).values(),
      //   ];
      //   console.log(uniqueObjArray, "new");
      //   return uniqueObjArray;
      // });
    }
  };

  const UncheckHandler = () => {
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
      // @ts-ignore
      let uniqueObjArray = [
        // @ts-ignore
        ...new Map(newArr.map((item) => [item["_id"], item])).values(),
      ];
      console.log(uniqueObjArray, "new");
      return uniqueObjArray;
    });
  };

  useEffect(() => {
    setSelectedLength(
      objectiveDescription?.filter((j: any) => j?.isChecked === true)?.length
    );
  }, [objectiveDescription]);
  // console.log(selectedLength,objectiveDescription?.filter((j:any) => j?.isChecked === true),'selectedLength')

  useEffect(() => {
    const res = activeDesc.filter((i: any) => {
      return i.isChecked === true;
    });
    // console.log(res.length,selectedLength,'selectedLength')
    if (activeDesc) {
      if (res.length > selectedLength) {
        console.log("run 1");
        setHide1(true);
      } else if (res.length === 0 || res.length === selectedLength) {
        setHide1(false);
        console.log("run 2");
      } else if (selectedLength >= res.length) {
        setHide1(true);
        console.log("run 3");
      }
    }

    console.log(res, selectedLength, hide1, "selectedLength");
  }, [activeDesc, activeId]);

  // const test = () => {
  //     const objec = objectiveType.map((desc: any) => {
  //        // const  newDesc =  desc.isChecked === false && activeDesc.map((item: any) => {
  //        const   newDesc =  filteredDescription(activeDesc).map((item: any) => {
  //             // if (item.objective_type._id === activeId) {
  //                 return {
  //                     ...desc,
  //                     isChecked: false,
  //                 };
  //             // }
  //
  //         });
  //         console.log(newDesc, 'new desc   ')
  //     })
  //     return objec
  // };
  //
  //
  // const test = () => {
  //     const objec = objectiveType.map((desc: any) => {
  //         // const  newDesc =  desc.isChecked === false && activeDesc.map((item: any) => {
  //         const newDesc = filteredDescription(activeDesc).map((item: any) => {
  //             // if (item.objective_type._id === activeId) {
  //             return {
  //                 ...desc,
  //                 isChecked: false,
  //             };
  //             // }
  //         });
  //         console.log(newDesc, 'new desc   ')
  //     })
  //     return objec
  // };

  // console.log(Object.entries(toar()), 'object entries')

  // console.log(toar()!['61fe1fc78a20e5c4eaa48d65'].map((h: any) => {
  //     return {
  //         name: h._id
  //     }
  // }), 'group by id')

  // const g =
  const creatTemplateHandler = (values: any) => {
    return createTemplate(values);
    console.log(values);
  };
  const editTemplateHandler = (values: any) => {
    return editTemplate(values);
    console.log(values);
  };

  // sushma 7/7 : for getting all checked values
  const { data: otherData } = useGetOtherRecommendationQuery("");
  const { data: feedbackData } = useGetFeedBackQuery("");
  const { data: trainingData } = useGetTrainingRecommendationQuery("");

  const addOtherRecommendation = () => {
    let map1 = [];
    if (otherData) {
      map1 = otherData.data.map((item: any) => {
        return {
          name: item._id,
          isChecked: true,
        };
      });
    }
    return map1;
  };

  const addFeedbackHandler = () => {
    let map1 = [];
    if (feedbackData) {
      map1 = feedbackData.data.map((item: any) => {
        return {
          name: item._id,
          isChecked: true,
        };
      });
    }
    return map1;
  };

  const addTrainingHandler = () => {
    let map1 = [];
    if (trainingData) {
      map1 = trainingData.data.map((item: any) => {
        return {
          name: item._id,
          isChecked: true,
        };
      });
    }
    return map1;
  };

  const SaveEditTitle = (e: any) => {
    setnavPrompt(false);
    if (title === "") {
      return settextfeildError(true);
      // setIsOpen(true)
    }
    if (id) {
      return (
        settextfeildError(false),
        editTemplateHandler({
          name: title,
          id: id,
        }).then((res: any) => {
          if (!res.error) {
            setIsOpenEdit(false);
            setEditAlert(true);
            setTimeout(() => {
              setEditAlert(false);
            }, 3000);
            setSaveEdit(false);
          } else if (res.error === true) {
            setIsOpenEdit(true);
          }
        })
      );
    }
  };

  const navigate = useNavigate();
  const createHandler = (e: any) => {
    e.preventDefault();
    setnavPrompt(false);
    settriggerTheNav1(false);
    if (title === "") {
      return settextfeildError(true);
      // setIsOpen(true)
    }
    if (id) {
      return (
        settextfeildError(false),
        editTemplateHandler({
          name: title,
          id: id,
          weightage: {
            objective_group: objectiveGroupIdHandler(objectiveType),
            objective_type: addNametoId(objectiveType),
            objective_description: addNametoIdDesc(activeDesc),
          },
        }).then((res: any) => {
          if (!res.error) {
            setIsOpen(false);
            setEditAlert(true);
            setCreateAlert(false);
            setHideAlert(true);
            setOpen2(true);
            // hideAlertHandler();
            // setTabs(tab + 1)
            console.log(res);
          } else if (res.error === true) {
            setIsOpen(true);
            setCreateAlert(false);
          }
        })
      );
    } else {
      return (
        settextfeildError(false),
        // setIsOpen(false),
        setNextAlert(true),
        creatTemplateHandler({
          name: title,
          weightage: {
            objective_group: objectiveGroupIdHandler(objectiveType),
            objective_type: addNametoId(objectiveType),
            objective_description: addNametoIdDesc(activeDesc),
          },
          feedback_questionnaire: addFeedbackHandler(),
          other_recommendation: addOtherRecommendation(),
          training_recommendation: addTrainingHandler(),
          status_template: "In progress",
        })
          //  .then((res:any) => !isError && navigate(`${EDIT_VIEW_TEMPLATE}`) ),
          .then((res: any) => {
            if (!res.error) {
              setIsOpen(false);
              console.log(res);
              navigate(`${CREATE_TEMPLATE_1}/${res.data.template._id}`);
              setCreateAlert(true);
              setEditAlert(false);
              setHideAlert(true);
              setOpen2(true);
              // hideAlertHandler();
              // setTabs(tab + 1)
            } else if (res.error === true) {
              setIsOpen(true);
            }
          })
      );

      setHide(true);
    }
  };

  const createHandlerAlert = (e: any) => {
    e.preventDefault();
    setIsOpenAlert(false);
    setOpen2(false);
    setnavPrompt(false);
    settriggerTheNav1(false);
    return (
      settextfeildError(false),
      editTemplateHandler({
        name: title,
        id: id,
        weightage: {
          objective_group: objectiveGroupIdHandler(objectiveType),
          objective_type: addNametoId(objectiveType),
          objective_description: addNametoIdDesc(activeDesc),
        },
      }).then((res: any) => {
        res.error ? <> </> : 
        setcannotLaunch(true);
        
    })
    // .then((res: any) => {
    //     if (!res.error) {
        
    //     } else if (res.error === true) {
    //       setcannotLaunch(true);
    //     }
    //   })

      // .then((res: any) => {
      //   if (!res.error) {
      //     setIsOpen(false);
      //     setEditAlert(true);
      //     setCreateAlert(false);
      //     setHideAlert(true);
      //     setOpen2(true);
      //     // hideAlertHandler();
      //     // setTabs(tab + 1)
      //     console.log(res);
      //   } else if (res.error === true) {
      //     setIsOpen(true);
      //     setCreateAlert(false);
      //   }
      // })
    );

  };

  // const errorHandler = () => {
  //   console.log(error1,'er11')
  //   setError1(!isError)
  // if (error1 === true) {
  //   setIsOpen(true)
  // }
  // else if (error1 === false) {
  //   setIsOpen(false)
  // }
  // }

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    const res = activeDesc.filter((i: any) => {
      return i.isChecked === true;
    });
    // console.log(res.length,selectedLength,'selectedLength')
    if (activeDesc) {
      if (res.length > 0) {
        console.log("run 1");
        // setOpen(true);
        setOpen2(false);
        setObjChecked(false);
        if (id) {
          setIsOpenAlert(true);
          setMessage("Objective weightage will be changed. Would you like to save the changes?")
        } else {
          setIsOpenAlert(false)
          setOpen(true);
        }
      }
      else {
        setOpen2(true);
        setObjChecked(true);
        // setOpen(true)
      }
    }
    // if (id) {
    //   setIsOpenAlert(true);
    //   setMessage("Weightage values will get reset. Still you wish to save the changes?")
    // } else {
    //   setIsOpenAlert(false)
    //   setOpen(true);
    // }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleDialogUncheckType = () => {
    setAlertUncheckType(false);
  };

  const handleDialogNo = () => {
    setOpen(false);
    setIsOpen(true);
  };

  const nextHandler = () => {
    if (nextAlert === true) {
      setTabs(tab + 1);
    } else if (id) {
      setTabs(tab + 1);
    } else {
      setNextAlertMessage(true);
      setHideAlert(true);
      setOpen2(true);
      // hideAlertHandler();
    }
  };

  const filteredDescription = (descriptions: any) => {
    if (descriptions && activeId) {
      console.log(descriptions, "descriptions");
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
    if (filteredDescription(activeDesc)) {
      if (filteredDescription(activeDesc).length === 0) {
        setObjectiveLengthAlert(true);
      } else if (filteredDescription(activeDesc).length != 0) {
        setObjectiveLengthAlert(false);
      }
    }
  });

  //Sushma 27/06
  //Filter objective type which has only objective title
  useEffect(() => {
    if (objectiveType && descriptionData) {
      const typeId = objectiveType.map((i: any) => {
        return i._id;
      });
      // console.log(descriptionData,'uuu')
      const descId = descriptionData.data.map((j: any) => {
        if (j.objectiveTitle !== "") {
          return j.objective_type._id;
        }
      });
      const FilteredObjectiveType = objectiveType.filter((item: any) => {
        return descId.includes(item._id);
      });

      setObjectiveTypeWithTitle(FilteredObjectiveType);
    }
  }, [objectiveType, descriptionData]);

  const disableCheckbox = () => {
    if (activeId && activeDesc && objectiveType) {
      return checkboxHandler(filteredDescription(activeDesc)).length === 0;
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
            return { ...item, isDisabled: false };
          } else if (
            checkboxHandler(filteredDescription(activeDesc)).length === 0
          ) {
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
  }, [activeDesc, activeObjectiveType]);

  useEffect(() => {
    if (singleTemplate) {
      console.log(
        singleTemplate.template.weightage.objective_type,
        "ssssssssss"
      );
      setTitle(singleTemplate.template.name);
    }
  }, [singleTemplate]);

  useEffect(() => {
    if (saveEdit === true) {
      setIsOpenEdit(true);
    } else {
      setIsOpenEdit(false);
    }
  }, [saveEdit]);

  const handleDialogCloseEdit = () => {
    setIsOpenEdit(false);
    setSaveEdit(false);
  };

  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
    setOpen2(false);
    setMessage("");
    setObjectiveLengthAlert(false);
    setNextAlertMessage(false);
    setCreateAlert(false);
    setEditAlert(false);
    setError1(false);
    setError2(false);
    setObjChecked(false)
  };
 //dialog
 const [cannotLaunch, setcannotLaunch] = useState(false);
 
  const handleClickLaunchClose = () => {
    setcannotLaunch(false);
  
   };
  //dialog

  return (
    <>
      <Container
        sx={{
          maxWidth: "96% !important",
          width: "100%",
          height: "calc(100vh - 220px)",
          backgroundColor: "#fff",
        }}
      >
        {/* {objectiveLengthAlert && (
                    <Alert severity="error">
                        There is no Objective Title for the selected Objective Type!!{" "}
                    </Alert>
                )}
                {hideAlert && nextAlertMessage === true && (
                    <Alert severity="error">There is no Template created!! </Alert>
                )}

                {hideAlert && createAlert === true && (
                    <Alert severity="info">{title} is created!! </Alert>
                )}

                {hideAlert && editAlert === true && (
                    <Alert severity="info">{title} is saved!! </Alert>
                )} */}

        <React.Fragment>
          <Grid container spacing={1} width="105.6%">
            <Grid item xs={4.5}>
              <Box
                bgcolor="#fff"
                /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
                minHeight="calc(100vh - 210px)"
                border={1}
                borderColor="#e0e0e0"
              // width={400}
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
                    Objective Type
                  </Typography>
                </div>

                {/* <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                > */}
                <Scroll>
                  <Scrollbar
                    style={{
                      // width: "auto",
                      height: "calc(100vh - 300px)",
                    }}
                  >
                    {objectiveType &&
                      objectiveTypeWithTitle &&
                      activeDesc &&
                      objectiveTypeWithTitle.map((i: any, index: number) => {
                        return (
                          <Box
                            key={i._id}
                            borderColor="#3e8cb5"
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            //boxShadow=" 0px 0px 2px 1px rgba(0, 0, 0, 0.1)"
                            boxShadow="1px 1px 10px 1px rgba(0, 0, 0, 0.1)"
                            width={330}
                            // height={70}
                            // marginTop={2.5}
                            // marginLeft={1}
                            margin="20px"
                            onClick={() => {
                              objectiveTypeHandler(i._id);
                            }}
                            style={{
                              // @ts-ignore
                              border:
                                ConStyle &&
                                activeId === i._id &&
                                "1px solid #3e8cb5",
                              // minWidth: "330px",
                            }}
                          >
                            {/* @ts-ignore */}

                            <Stack
                              display="flex"
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              minWidth="325px"
                            // height="70px"
                            // style={{
                            //   display: "flex",
                            //   justifyContent: "space-between",
                            //   alignItems: "center",
                            //   zIndex: 200,
                            // }}
                            >
                              <div
                                style={{
                                  // color : "green",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  // marginLeft: "5px",
                                  // width: "75%",
                                  wordBreak: "break-word",
                                  padding: "15px",
                                  maxWidth: "260px",
                                }}
                              >
                                {i.name}
                              </div>
                              {/* {i.objective_group.name &&
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
                                      {i.objective_group.name.name}
                                    </p>
                                  } */}
                              <div style={{paddingRight:"10px"}}>
                                <input
                                  type="checkbox"
                                  onChange={handleChange}
                                  name={i._id}
                                  disabled={i.isDisabled}
                                  //disabled={false}
                                  checked={i.isChecked || false}
                                  style={{
                                    height: "18px",
                                    width: "18px",
                                    // position: "absolute",
                                    // left: "300px",
                                  }}

                                // onClick={onSubmit}
                                />
                              </div>
                            </Stack>
                          </Box>
                        );
                      })}
                  </Scrollbar>
                </Scroll>
                {/* </Stack> */}
              </Box>
            </Grid>



            <Dialog
              open={isOpenAlert}
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
              onClose={handleDialogCloseAlert}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
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
                    onClick={handleDialogCloseAlert} />
                </IconButton>

              </DialogTitle> */}
              <DialogContent
              >
                <DialogContentText
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
                  }}
                >
                  {message}

                </DialogContentText>
              </DialogContent>
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
                    marginRight: "10px",
                    width: "70px",
                    height: "35px",
                    background: "transparent",
                    color:"#3e8cb5",
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={(e) => {
                    createHandlerAlert(e);
                    // errorHandler()
                  }}
                >
                  Yes
                </Button>

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
                  onClick={handleDialogCloseAlert}
                >
                  No
                </Button>
              </DialogActions>
            </Dialog>



            <Grid item xs={4.5}>
              {active === "ObjectiveDescription" && (
                <ObjectiveDescription
                  setObjectiveType={setObjectiveType}
                  descriptionData={activeDesc}
                  setDescriptionData={setActiveDesc}
                  getIds={getIdHandler}
                  valueData={activeId}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  uncheckLevel={uncheckLevel}
                  setUncheckLevel={setUncheckLevel}
                  settriggerTheNav1={settriggerTheNav1}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              {hide
                ? ""
                : active === "ObjectiveDescription" &&
                // hide1 &&
                (
                  <Stack direction="row" justifyContent="right">
                    <div>
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
                        onClick={handleDialogOpen}
                      >
                        Save as Draft
                      </Button>
                      <div>
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
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
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
                                onClick={handleClose3} />
                            </IconButton>

                          </DialogTitle> */}
                          <DialogContent>
                            <DialogContentText
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
                              {objectiveLengthAlert && (
                                <div>
                                  There is no Objective Title for the selected
                                  Objective Type.{" "}
                                </div>
                              )}
                              {hideAlert && nextAlertMessage === true && (
                                <div>There is no Template created. </div>
                              )}

                              {hideAlert && createAlert === true && (
                                <div>{title} is created. </div>
                              )}

                              {hideAlert && editAlert === true && (
                                <div>{title} is saved. </div>
                              )}
                              {hideAlert && error1 === true && (
                                <div>The Template already exists. </div>
                              )}
                              {hideAlert && error2 === true && (
                                <div>The Template already exists. </div>
                              )}
                              {objChecked === true && (
                                <div>Please select any one of the Objective Title.</div>
                              )}
                            </DialogContentText>
                          </DialogContent>
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
                        open={open}
                        onClose={handleDialogClose}
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
                            margin:'0px',
                            padding:"30px"
                          },
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        {/* <DialogTitle
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          id="alert-dialog-title"
                        >
                          <IconButton>
                            <img                             
                              src={Closeicon}
                              onClick={handleDialogClose}
                            />
                          </IconButton>

                        </DialogTitle> */}
                        <DialogContent
                        >
                          <DialogContentText
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
                            }}
                          >
                            Do you wish to add more objective type?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            //paddingBottom: "20px"
                          }}
                        >
                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color:"#3e8cb5",
                              marginRight: "10px",
                              width: "70px",
                              height: "35px",
                              background: "transparent",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleDialogClose}
                          >
                            Yes
                          </Button>
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
                            onClick={handleDialogNo}
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog

                        open={isOpen}
                        onClose={handleDialogClose}
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
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        {/* <DialogTitle
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          id="alert-dialog-title"
                        >
                          <IconButton>
                            <img                             
                              src={Closeicon}
                              onClick={handleDialogClose}
                            />
                          </IconButton>

                        </DialogTitle> */}
                        <DialogContent
                          // sx={{padding:'0px'}}
                        >
                          {/* {duplicateError && (
                          <Alert severity="error">
                            {duplicateError.data.message}
                          </Alert>
                        )} */}
                          {/* {hideAlert && error1 === true && (
                                                        <Alert severity="error">
                                                            The Template already exists{" "}
                                                        </Alert>
                                                    )}
                                                    {hideAlert && error2 === true && (
                                                        <Alert severity="error">
                                                            The Template already exists{" "}
                                                        </Alert>
                                                    )} */}
                          <DialogContentText
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
                            }}
                          >
                            <Tf3>
                              <TextField
                                style={{
                                  //marginTop: "25px",
                                  width: "340px",
                                  // marginLeft: "-15px",
                                }}
                                placeholder="Enter a Template Title"
                                margin="dense"
                                id="name"
                                multiline
                                inputProps={{ maxLength: "200" }}
                                // maxRows={3}
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
                                onKeyPress={(event: any) => {
                                  var key = event.keyCode || event.which;
                                  if (key === 13) {
                                    createHandler(event);
                                    console.log(
                                      "Enter Button has been clicked"
                                    );
                                  }
                                }}
                              />
                            </Tf3>

                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            //paddingBottom: "30px"
                          }}
                        >
                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              marginRight: "10px",
                              color:"#3e8cb5",
                              width: "70px",
                              height: "35px",
                              background: "transparent",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={(e) => {
                              createHandler(e);
                              // errorHandler()
                            }}

                          >
                            Save
                          </Button>

                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color:"#3e8cb5",
                              // marginRight: "10px",
                              width: "70px",
                              height: "35px",
                              background: "transparent",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleDialogClose}
                          >
                            Cancel
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Stack>
                )}
              {/* <Link to={MASTER_NAV}> */}

              {/* <div>
                    <Button


                      style={{
                        textTransform: "none",
                        backgroundColor: "#014D76",
                        fontSize: "14px",
                        fontFamily: "regular",
                        //padding: "6px 30px",
                      }}
                      variant="contained"
                      onClick={nextHandler}
                    >
                      Next
                    </Button> 
                    </div> */}
            </Grid>
          </Grid>
        </React.Fragment>
        <AlertDialogSuccess
           isAlertOpen={cannotLaunch}
           handleAlertClose={handleClickLaunchClose}
        >
         The changes have been saved.
        </AlertDialogSuccess>
      </Container>
    </>
  );
}

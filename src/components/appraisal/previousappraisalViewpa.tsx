import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TableContainer,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import taqeeflogo from "../../assets/Images/taqeeflogo.png"
import Removeattnew from "../../assets/Images/Removeattnew.svg"
import Uploadatt from "../../assets/Images/Uploadatt.svg";

import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useAttachmentsEmployeeDeleteMutation,
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsNormalizerDeleteMutation,
  useAttachmentsReviewerDeleteMutation
} from "../../service";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { EMPLOYEE_REJECTS } from "../../constants/routes/Routing";
import IconButton from "@mui/material/IconButton";

//   import Infoicon from "./icons/Infoicon.svg";
import Infoicon from "../../assets/Images/Infoicon.svg";
import Popover from "@mui/material/Popover";
import { Scrollbar } from "react-scrollbars-custom";
import Downloadss from "../../assets/Images/Downloadss.svg";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useReviewerContext } from "../../context/reviewerContextContext";
import { url } from "inspector";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useGetPreviousAppraisalEmployeeByFilterQuery, useGetpastAppraisalDetailsofEmployeeQuery } from "../../service/employee/previousAppraisal";
const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});

const Tf1 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    padding: "8px",
    textAlign: "left"
  },
});

const Text = styled("div")({
  "& .MuiButton-root": {
    color: "#858585",
    // opacity: 0.6,
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
  paddingTop: "0px",
  color: "#858585",
  marginLeft: "-3px",
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "2px",
});
export default function PreviousapraisalViewpa(props: any) {
  const { appraisalData } = props;
  const pdfExportComponent = React.useRef<PDFExport>(null);
  const { data: ratingScaleData } = useGetRatingScaleQuery("");

  const { employee_id } = useParams();
  //@ts-ignore
  // const {overallFeed, setOverallFeed } = useReviewerContext();
  // console.log(overallFeed,"overallFeed")
  // console.log(employee_id ,'employee_id ')
  const { data } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: objectiveDescData, isLoading: isLoadingDescription } =
    useGetObjectiveDescriptionQuery("");
  const { data: employeeData, isLoading } =
    useGetpastAppraisalDetailsofEmployeeQuery(employee_id);
  console.log(employeeData, "employeeData");
  const { data: ratingData } = useGetRatingScaleQuery("");
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  const CustomScrollbar = Scrollbar as any;

  const [showTrainingRecommendation, setShowTrainingRecommendation] = useState(false)
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  const [deleteNormalizerMutation, { isLoading: delete2, data: deleted2 }] =
    useAttachmentsReviewerDeleteMutation();
  const [deleteReviewerMutation, { isLoading: delete3, data: deleted3 }] =
    useAttachmentsReviewerDeleteMutation();
  const [reviewerRating, setReviewerRating] = React.useState<any>([]);
  const [normalizerRating, setNormalizerRating] = React.useState<any>([]);

  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  // console.log(objectiveDescData, "objectiveDescData");
  // console.log(objectiveTitleData, "objectiveTitleData");
  // console.log(filterData, "filterData");
  const [showRating, setShowRating] = useState("false");
  const [show, setShow] = useState("false");
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
  const [appraiserAreaofImprovement, setAppraiserAreaofImprovement] =
    useState<any>([]);
  const [description, setDescription] =
    useState<any>([]);
    console.log(description,"description")
  const [objectivettype, setobjectivettype] =
    useState<any>([]);
  const [employeeAreaofImprovement, setEmployeeAreaofImprovment] =
    useState<any>([]);
  const [
    appraiserTrainingRecommendations,
    setAppraiserTrainingRecommendations,
  ] = useState<any>([]);
  const [employeeTrainingRecommendations, setEmployeeTrainingRecommendations] =
    useState<any>([]);
  const [employeeRating, setEmployeeRating] = useState<any>(false);
  const [popoverIndex, setPopoverIndex] = useState<any>("")
  const [popoverIndexs, setPopoverIndexs] = useState<any>("")
  // previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;

  const [popoverIndex1, setPopoverIndex1] = useState<any>("")
  const [popoverIndex2, setPopoverIndex2] = useState<any>("")
  const [popoverIndex3, setPopoverIndex3] = useState<any>("")
  const [popoverIndex5, setPopoverIndex5] = useState<any>("");
  const [showRenormalizedData, setShowRenormalizedData] = useState<any>(true)
  const [appraiserChecked, setAppraiserChecked] = useState(false);
  const [reviewerChecked, setReviewerChecked] = useState(false);
  const [employeeChecked, setEmployeeChecked] = useState(false);
  const [showAreaofImprovement, setShowAreaofImprovement] =
    useState<any>(false);
  const [showTrainingRecommendations, setShowTrainingRecommendations] =
    useState<any>(false);


  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };


  useEffect(() => {
    if (employeeData  && objectiveDescData) {
      setObjectiveDescription(() => {
        return employeeData?.employee?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              // objective_title: findObjectiveTitleById(i?.objective_title),
              objective_type: findObjectiveTypeById(i?.objective_type),
            };
          }
        );
      });
      // setDescription(() => {
      //   let findObjectiveTypeByName: any = (ObjectiveTitleName: any) => {
      //     return employeeData?.employee?.find((item: any) => item?.objective_description?.objectiveTitle === ObjectiveTitleName)
      //   }

      //   return employeeData?.employee?.objective_description?.map(
      //     (i: any, index1: any) => {
      //       return {
      //         ...i,
      //         objective_title: i.objectiveTitle,
      //         objective_type: findObjectiveTypeByName(i.objectiveTitle),
      //       };
      //     }
      //   );
      // });
           setDescription(() => {
            let findObjectiveTypeByName: any = (ObjectiveTitleName: any) => {
              return employeeData?.employee?.objective_type?.find((item: any) => item?._id === ObjectiveTitleName)?.objective_type
            }

        return employeeData?.employee?.objective_description?.map(
          (i: any, index1: any) => {
            return {
              ...i,
              objective_title: i.objectiveTitle,
              objective_type: findObjectiveTypeByName(i.objective_type),
            };
          }
        );
      });
      // const augmentedObjectiveDescriptions = employeeData?.employee?.objective_description?.map((i: any) => ({
      //   ...i,
      //   objective_title: i.objectiveTitle,
      // }));
      // const augmentedObjectiveType = employeeData?.employee?.objective_type?.map((item: any) => item?.objective_type);
      // const updatedObjectiveDescriptions = augmentedObjectiveDescriptions?.map((i: any, index: any) => ({
      //   ...i,
      //   objective_type: augmentedObjectiveType[index],
      // }));

      // setDescription(() => updatedObjectiveDescriptions);


      let objectiveType: any = employeeData?.employee?.objective_type?.map((item: any, index: number) => {
        return {
          Number :item?.index,
          objective_type: item?.objective_type,
          color: Colors[index]
        }
      })
      console.log(objectiveType, "objectiveType")
      setColorarray(objectiveType)


      setAppraiserAreaofImprovement(
        employeeData?.employee?.area_of_improvement
      );
      setEmployeeAreaofImprovment(
        employeeData?.employee?.area_of_improvement
      );
      setAppraiserTrainingRecommendations(
        employeeData?.employee?.training_recommendation
      );
      setEmployeeComments(employeeData?.employee?.employee?.comments);
      setEmployeeTrainingRecommendations(
        employeeData?.employee?.employee?.training_recommendation
      );
      setEmployeeRatingComments(
        employeeData?.employee?.employee?.objective_description?.comments
      );
      setEmployeeRatingScale(
        employeeData?.employee?.employee?.objective_description?.ratings
      );
      // setOverallFeed(
      //   employeeData?.employee?.appraisal?.feedback_questions
      // );
      setAppraiserChecked(
        employeeData?.employee?.normalizer?.isAppraiserChecked
      );
      setReviewerChecked(
        employeeData?.employee?.normalizer?.isReviewerChecked
      );
      setEmployeeChecked(
        employeeData?.employee?.normalizer?.isEmployeeChecked
      );
    }
  }, [employeeData, objectiveDescData]);
  // console.log(overallFeed,"overallFeed")
  //console.log(employeeData, "datatest");



  const employeeAreaCommentsChangeHandler1 = (i: any, e: any) => {
    let temp = employeeAreaofImprovement;
    temp = temp.map((item: any) => {
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setEmployeeAreaofImprovment(temp);
  };
  useEffect(() => {
    if (employeeData && employeeData?.employee) {
      const employeeAreaofImprovement =
        employeeData?.employee?.area_of_improvement;
      const group = _.groupBy(employeeAreaofImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
    }
  }, [employeeAreaofImprovement]);
  const employeeTrainingCommentsChangeHandler1 = (i: any, e: any) => {
    let temp = employeeTrainingRecommendations;
    temp = temp.map((item: any) => {
      return i._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setEmployeeTrainingRecommendations(temp);
  };

  const [Training1, setTraining1] = React.useState<any>([]);
  const [otherRecommendation, setOtherRecommendation] = React.useState<any>([]);
  const findTrainingName = (id: any) => {
    if (employeeData) {
      return employeeData?.employee?.appraisal_template?.training_recommendation.find((i: any) =>
        i.name._id == id);
    }
  }
  //console.log(Training1, "Trainingstate1");
  useEffect(() => {
    if (employeeData) {
      let tempTraining = employeeData?.employee?.training_recommendation?.filter((item: any) => {
        return item?.name?.title !== "" || item?.name?.title !== undefined
      })
      if (tempTraining && tempTraining?.length > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }
      setTraining1(() => {
        return employeeData?.employee?.training_recommendation?.map(
          (i: any) => {
            //console.log(i, "Training1");
            return {
              ...i,
              name: findTrainingName(i.name),
              justification: i?.justification,
              trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);
  useEffect(() => {
    if (employeeData) {
      setOtherRecommendation(() => {
        return employeeData?.employee?.other_recommendation?.map(
          (i: any) => {
            //console.log(i, "Training1");
            return {
              ...i,
              name: i?.name,
              // trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const employeeAreaCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserAreaofImprovement;
    temp = temp.map((item: any) => {
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setAppraiserAreaofImprovement(temp);
  };

  // Function to update employee comments in appraiser training recommendations
  const employeeTrainingCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserTrainingRecommendations;
    temp = temp.map((item: any) => {
      return i._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setAppraiserTrainingRecommendations(temp);
  };

  useEffect(() => {
    if (employeeData && employeeData?.employee) {
      const appraiserAreaOfImprovement =
        employeeData?.employee?.area_of_improvement;
      const group = _.groupBy(appraiserAreaOfImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);
  //mapping area of recommendation
  //mapping training recommendations
  const [Training, setTraining] = React.useState<any>([]);
  //console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData) {
      setTraining(() => {
        return employeeData?.employee?.training_recommendation?.map(
          (i: any) => {
            // console.log(i, "Training");
            return {
              ...i,
              justification: i?.justification,
              trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const getObjectiveTypeName = (id: any) => {
    //console.log(id, " type");
    if (data) {
      return data.data.find((item: any) => {
        return id === item._id;
      });
    }
  };
  // const findObjectiveTitleById = (id: any) => {
  //   if (objectiveTitleData) {
  //     //console.log(id, "objectiveTitleData");
  //     return objectiveTitleData.data.find((item: any) => item._id === id);
  //   }
  // };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.employee?.objective_type?.find(
        (item: any) => item?.name?._id === id
      );
    }
  };
  const [colorarray, setColorarray] = useState<any>("");

  const Colors = [
    "#B6E9EE",
    "#C9FBEA",
    "#B1EDEE",
    "#B9E9D0",
    "#BDE3E2",
    "#B1F3F2",
    "#B7E6F7",
    "#B8EFEF",
    "#BFFBE7",
    "#B7E6F7",
    "#B1F1F0",
    "#BEECF5",
  ]
  useEffect(() => {
    if (employeeData) {
      setObjectiveDescription(() => {
        return employeeData?.employee?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              // objective_title: findObjectiveTitleById(i?.objective_title),
              objective_type: findObjectiveTypeById(i?.objective_type),
            };
          }
        );
      });
      let objectiveType = employeeData?.objective_type?.map((item: any, index: number) => {
        return {
          objective_type: item?.name?.name,
          color: Colors[index]
        }
      })
      console.log(objectiveType, "objectiveType")
      setColorarray(objectiveType)
    }
  }, [employeeData]);
  useEffect(() => {
    if (employeeData ) {
      setReviewerRating(() => {
        return employeeData?.employee?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              // objective_title: findObjectiveTitleById(i?.objective_title),
              objective_type: findObjectiveTypeById(i?.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);
  useEffect(() => {
    if (employeeData ) {
      setNormalizerRating(() => {
        return employeeData?.employee?.normalizer?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              // objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const [filterData1, setFilterData1] = useState([]);
  const [showArea, setShowArea] = useState(false)
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo6 = Boolean(anchorEl9);

  const id6 = openInfo6 ? "simple-popover" : undefined;
  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEl9(null);
  };
  const [anchorE15, setAnchorE15] = React.useState<HTMLButtonElement | null>(null);
  const handleClose15 = () => {
    setAnchorE15(null);
  };
  const handleClick15 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE15(event.currentTarget);
  };

  const open15 = Boolean(anchorE15);
  const id15 = open15 ? "simple-popover" : undefined;
  const [anchorEl11, setAnchorEl11] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open11 = Boolean(anchorEl11);

  const handleClickOpen11 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl11(event.currentTarget);
  };

  const handleClose11 = () => {
    setAnchorEl11(null);
    // setOpen2(false);
  };

  //console.group(filterData1, "filterData1");
  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area: any) => {
        return area[0] !== "" && area[0] !== undefined
      })
      if (tempArea && tempArea?.length > 0) {
        setShowArea(true);
        setFilterData1(name);
      } else {
        setShowArea(false);
      }

    }
  };

  const [filterData2, setFilterData2] = useState([]);
  //console.group(filterData2, "filterData2");
  const groupNAmeHandler2 = (name: any) => {
    if (name) {
      setFilterData2(name);
    }
  };
  useEffect(() => {
    if (employeeData && employeeData?.employee) {
      const employeeAreaOfImprovement =
        employeeData?.employee?.area_of_improvement;
      const group = _.groupBy(employeeAreaOfImprovement, "value");
      const groupName = groupNAmeHandler2(Object.entries(group));
    }
  }, [employeeAreaofImprovement]);

  const [filterData3, setFilterData3] = useState([]);
  //console.group(filterData3, "filterData3");
  const groupNAmeHandler3 = (name: any) => {
    if (name) {
      setFilterData3(name);
    }
  };
  useEffect(() => {
    if (employeeData && employeeData.employee) {
      const employeeTrainingRecommendations =
        employeeData?.employee?.training_recommendation;
      const group = _.groupBy(employeeTrainingRecommendations, "value");
      const groupName = groupNAmeHandler3(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);
  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();
  const [anchorE22, setAnchorE22] = React.useState<HTMLButtonElement | null>(null);
  const handleClose22 = () => {
    setAnchorE22(null);
  };
  const handleClick22 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE22(event.currentTarget);
  };

  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;
  React.useEffect(() => {
    const Overall_rating = employeeData?.employee?.appraisal?.pa_rating;
    const RatinGscale = ratingScaleData?.data?.map((j: any) => ({
      rating: j?.rating,
      definition: j?.definition,
      rating_titile: j?.rating_scale,
    }));

    const FilteredRatingScale = RatinGscale?.filter((item: any) => {
      const rating = item.rating;
      if (
        (rating >= 1 && rating <= 1.99 && Overall_rating >= 1 && Overall_rating <= 1.99) ||
        (rating >= 2 && rating <= 2.49 && Overall_rating >= 2 && Overall_rating <= 2.49) ||
        (rating >= 2.5 && rating <= 2.99 && Overall_rating >= 2.5 && Overall_rating <= 2.99) ||
        (rating >= 3 && rating <= 3.49 && Overall_rating >= 3 && Overall_rating <= 3.49) ||
        (rating >= 3.5 && rating <= 3.99 && Overall_rating >= 3.5 && Overall_rating <= 3.99) ||
        (rating >= 4 && rating <= 4.49 && Overall_rating >= 4 && Overall_rating <= 4.49) ||
        (rating >= 4.5 && rating <= 4.99 && Overall_rating >= 4.5 && Overall_rating <= 4.99) ||
        (rating >= 5.0 && Overall_rating >= 5.0)
      )
      // if (
      //   (rating >= 3 && rating <= 3.49 && Overall_rating >= 3 && Overall_rating <= 3.49)
      // )
      {
        console.log("Matched item:", item);
        return {
          ratingScale: item.rating_titile,
          definition: item.definition,
        };
      }
      // console.log("Did not match item:", item);
    });

    if (FilteredRatingScale && FilteredRatingScale.length > 0) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile);
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
      // console.log("Did not match item:" );
    }

    console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, Overall_rating, "Overall_ratingg");
  }, [ratingScaleData, employeeData]);
  // React.useEffect(() => {
  //   const Overall_rating = employeeData?.data?.appraisal?.pa_rating;
  //   const RatinGscale = ratingScaleData?.data?.map((j: any) => ({
  //     rating: j?.rating,
  //     definition: j?.definition,
  //     rating_titile: j?.rating_scale,
  //   }));

  //   // Define the filterRatingScale function before using it
  //   const filterRatingScale = (item: any, minRating: any, maxRating: any) => {
  //     return (item?.rating >= minRating && item?.rating <= maxRating) && (Overall_rating >= minRating && Overall_rating <= maxRating);
  //   };

  //   const FilteredRatingScale = RatinGscale?.filter((item: any) => {
  //     if (filterRatingScale(item, 1, 1.99) ||
  //         filterRatingScale(item, 2, 2.49) ||
  //         filterRatingScale(item, 2.5, 2.99) ||
  //         filterRatingScale(item, 3, 3.49) ||
  //         filterRatingScale(item, 3.5, 3.99) ||
  //         filterRatingScale(item, 4, 4.49) ||
  //         filterRatingScale(item, 4.5, 4.99) ||
  //         filterRatingScale(item, 5.0, 5.0)) {
  //       console.log("Matched item:", item);
  //       return {
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       };
  //     }
  //     console.log("Did not match item:", item);
  //   });

  //   if (FilteredRatingScale && FilteredRatingScale.length > 0) {
  //     setratingdefenition(FilteredRatingScale[0]?.definition);
  //     setratingscaledef(FilteredRatingScale[0]?.rating_titile);
  //   } else {
  //     // Handle the case when FilteredRatingScale is empty
  //     // setratingdefenition("No rating definition found");
  //   }
  //   console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg");
  // }, [ratingScaleData, employeeData]);
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingData?.data?.find(
      (item: any) => item?.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const groupNameHandler = (name: any) => {
    if (name) {
      setFilterData(name);
    }
  };

  useEffect(() => {
    const group = _.groupBy(objectiveDescription, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [objectiveDescription]);
  useEffect(() => {
    const group = _.groupBy(reviewerRating, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [reviewerRating]);
  useEffect(() => {
    const group = _.groupBy(normalizerRating, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [normalizerRating]);

  const [specificAction, setspecificAction] = useState(false);
  // useEffect(() => {
  //   if (employeeData?.employee?.area_of_improvement[0]) {
  //     const specific =
  //       employeeData?.employee?.area_of_improvement[0]?.specific_actions?.map((item: any) => {
  //         console.log(item, "iiiiii");
  //         // setspecificAction(item);
  //         return item?.value;

  //       }
  //       );
  //     console.log(specific.length, "spec");
  //     // setspecificAction(specific);
  //     if (specific == "" || specific == undefined || specific == null) {
  //       setspecificAction(false);
  //     } else {
  //       setspecificAction(true);
  //     }
  //   }

  // }, [employeeData]);
  const [specificAction1, setspecificAction1] = useState<any>(false);
  const [specificAction2, setspecificAction2] = React.useState(false);
  const [specificAction3, setspecificAction3] = React.useState(false);
  const [overallFeed, setOverallFeed] = useState<any>([])
  useEffect(() => {
    setOverallFeed(
      employeeData?.employee?.feedback_questions
    )

  }, [employeeData])

  const [overallFeedback, setOverallFeedback] = useState<any>([]);
  const pre = (arr: any) => {
    return arr?.map((i: any) => {
      return {
        name: i?.name?._id,
        value: i?.value,
      };
    });
  };
  // useEffect(()=>{
  //   setOverallFeed(pre);
  // },[employeeData])
  console.log(overallFeed, "overallFeed")
  // useEffect(() => {
  //   setOverallFeed(pre(overallFeedback));
  // }, [overallFeedback]);
  // useEffect(()=>{
  //   setOverallFeedback(employeeData)
  // })
  console.log(overallFeedback, "overallFeedback")

  useEffect(() => {
    if (employeeData?.employee?.area_of_improvement) {

      if (employeeData?.employee?.area_of_improvement == '' || employeeData?.employee?.area_of_improvement == undefined) {
        setspecificAction1(false);
      } else {
        setspecificAction1(true);
      }
      console.log(employeeData?.employee?.area_of_improvement, "areaofimprovement")
    }
  }, [employeeData])
  useEffect(() => {

    if (employeeData?.employee?.training_recommendation) {

      if (employeeData?.employee?.training_recommendation == '' || employeeData?.employee?.training_recommendation == undefined) {
        setspecificAction2(false);
      } else {
        setspecificAction2(true);
      }

    }

  }, [employeeData])
  console.log(employeeData?.employee?.training_recommendation, "trainingrecommendation")



  //mapping functionalities

  const [value, setValue] = React.useState(0);
  const [employeeComments, setEmployeeComments] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open1, setOpen1] = React.useState(false);
  const theme1 = useTheme();
  const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const theme3 = useTheme();
  const fullScreen3 = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    updateEmployee({
      "employee.objective_description":
        employeeData.employee.normalizer.objective_description,
      "appraisal.status": "rejected",
      id: employee_id,
    });
    // setnavPrompt(false)
    navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
  };

  const handleRejectRadioChange = (event: any) => {
    // setAccept(event.target.value as string);
    // navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const createPDF = async () => {
    // window.scrollTo(0, 0)
    const pdf = new jsPDF("portrait", "pt", "a4");

    // const data = await html2canvas(
    //   // useCORS = true,
    //   document.getElementById("pdf") as HTMLElement

    // )

    const element = document.getElementById("pdf")!;
    const data = await html2canvas(element, {
      backgroundColor: "none",
      logging: true,
      useCORS: true //to enable cross origin perms
    });

    const element1 = document.getElementById("overallfeedback")!;
    const data1 = await html2canvas(element1, {
      backgroundColor: "none",
      logging: true,
      useCORS: true //to enable cross origin perms
    });

    const base64image = data.toDataURL("image/png")
    const img = data.toDataURL("image/png");


    const imgProperties = pdf.getImageProperties(base64image);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    var imgWidth = 595;
    var pageHeight = 840;
    var imgHeight = data.height * imgWidth / data.width;
    var heightLeft = imgHeight;
    var position = 0;
    pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
    // pdf.addImage(img1, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
    //   pdf.setPage(i)
    //   pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
    // }
    while (heightLeft >= 0) {
      // position = heightLeft - pdfHeight;

      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      // pdf.addImage(img1, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Employee_Appraisal.pdf");
  };
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo1 = Boolean(anchorEl1);
  const id3 = openInfo1 ? "simple-popover" : undefined;
  const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseInfo1 = () => {
    setAnchorEl1(null);
  };
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);

  const id02 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };

  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const id101 = openInfo101 ? "simple-popover" : undefined;

  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo102 = Boolean(anchorEl02);

  const id102 = openInfo102 ? "simple-popover" : undefined;

  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };
  const handleClose102 = () => {
    setAnchorEl02(null);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open2 = Boolean(anchorEl);
  const id2 = open2 ? "simple-popover" : undefined;

  //console.log(ratingScaleData, "ratingScaleData");
  const [filterData4, setFilterData4] = useState([]);
  //console.group(filterData4, "filterData4");

  const groupNAmeHandler4 = (name: any) => {
    if (name) {
      setFilterData4(name);
    }
  };
  const [employeeRatingScale, setEmployeeRatingScale] = useState<any>(false);
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  useEffect(() => {
    if (employeeData && employeeData?.employee) {
      const employeeRatingScale =
        employeeData?.employee?.objective_description?.rating;
      const group = _.groupBy(employeeRatingScale, "value");
      const groupName = groupNAmeHandler4(Object?.entries(group));
    }
  }, [employeeRatingScale]);
  const [filterData5, setFilterData5] = useState([]);
  //console.group(filterData5, "filterData5");

  const groupNAmeHandler5 = (name: any) => {
    if (name) {
      setFilterData5(name);
    }
  };
  const [employeeRatingComments, setEmployeeRatingComments] =
    useState<any>(false);


  // to display only re-normalized rating and comments (after mediation and renormalization)
  useEffect(() => {
    if (employeeData) {
      if (employeeData?.employee?.normalizer?.normalizer_status == "re-normalized") {
        setShowRenormalizedData(false)
      } else {
        setShowRenormalizedData(true)
      }
    }
  }, [employeeData])


  useEffect(() => {
    if (employeeData && employeeData?.employee) {
      const employeeRatingComments = employeeData?.employee?.employee?.comments;
      const group = _.groupBy(employeeRatingComments, "value");
      const groupName = groupNAmeHandler5(Object.entries(group));
    }
  }, [employeeRatingComments]);

  const Type = objectivettype?.map((k: any) => {
    return (
      <>
        {k?.objective_type}
      </>
    )
  })
  console.log(Type, "Type")
  const [status, setStatus] = useState([]);
  useEffect(() => {
    if (employeeData && status) {
      // after mediation or after renormalization
      if (employeeData?.employee?.appraisal?.status == "completed" &&
        employeeData?.employee?.normalizer?.normalizer_status == "re-normalized") {
        setStatus(employeeData?.employee?.normalizer?.normalizer_rating);
      }
      // after appraiser rejected or accepted employee
      else if ((employeeData?.employee?.appraisal?.appraiser_status == "appraiser-rejected-employee") ||
        (employeeData?.employee?.appraisal?.appraiser_status == "appraiser-accepted-employee")) {
        setStatus(employeeData?.employee?.employee?.appraiser_rating);
      }
      // after employee rejects 
      else if (employeeData?.employee?.appraisal?.status == "rejected") {
        setStatus(employeeData?.employee?.employee?.employee_rating);
      }
      // after employee acknowledgement
      else if (employeeData?.employee?.appraisal?.status == "completed") {
        setStatus(employeeData?.employee?.employee?.employee_rating);
      }
      // after normalizer rejects
      else if (employeeData?.employee?.normalizer?.normalizer_status == "rejected") {
        setStatus(employeeData?.employee?.normalizer?.normalizer_rating);
      }
    }
  }, [status, employeeData]);
  const [appraiser, setAppraiser] = useState<any>(true);
  const [reviewer, setReviewer] = useState<any>(true);
  const [normalizer, setNormlaizer] = useState<any>(true);
  const [employee, setEmployee] = useState<any>(true);

  useEffect(() => {
    if (employeeData && status) {
      if (employeeData?.employee?.appraisal?.appraiser_status == "completed") {
        // setNormlaizer(true);
        // setAppraiser(false);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.employee?.appraisal?.appraiser_status == "employee-rejected"
      ) {
        // setAppraiser(true);
        // setNormlaizer(false);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.employee?.normalizer?.normalizer_status == "accepted"
      ) {
        // setAppraiser(false);
        // setNormlaizer(true);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.employee?.normalizer?.normalizer_status == "rejected"
      ) {
        if (employeeData?.employee?.reviewer?.reviewer_status == "rejected") {
          // setAppraiser(true);
          // setNormlaizer(false);
          // setReviewer(true);
          // setEmployee(false);
        } else {
          // setAppraiser(true);
          // setNormlaizer(false);
          // setReviewer(false);
          // setEmployee(false);
        }
      } else if (employeeData?.employee?.reviewer?.reviewer_status == "accepted") {
        // setAppraiser(false);
        // setNormlaizer(false);
        // setReviewer(true);
        // setEmployee(false);
      } else {
        // setAppraiser(true);
        // setNormlaizer(false);
        // setReviewer(false);
        // setEmployee(false);
      }
    } else if (employeeData?.employee?.appraisal?.appraiser_status == "rejected") {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.appraisal?.appraiser_status == "reviewer-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.appraisal?.appraiser_status == "normalizer-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.appraisal?.appraiser_status == "after-mediation"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.appraisal?.appraiser_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.appraisal?.appraiser_status == "employee-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.reviewer?.reviewer_status == "appraiser-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.reviewer?.reviewer_status == "appraiser-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (employeeData?.employee?.reviewer?.reviewer_status == "normalized") {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.normalizer?.normalizer_status == "reviewer-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.normalizer?.normalizer_status == "appraiser-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.employee?.normalizer?.normalizer_status == "re-normalized"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.normalizer?.normalizer_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.normalizer?.normalizer_status ==
      "employee-acknowledged"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.reviewer?.reviewer_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.employee?.reviewer?.reviewer_status == "employee-accepeted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    }
  }, [employeeData]);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorReject, setAnchorReject] = React.useState<HTMLButtonElement | null>(
    null
  );

  // Attachments
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [reviewerAttachments, setReviewerAttachments] = useState<any>("");
  const [normalizerAttachments, setNormalizerAttachments] = useState<any>("");
  const [employeeAttachments, setEmployeeAttachments] = useState<any>("");
  const [ratingoverall, setratingoverall] = useState<any>("");

  const [openReviewerAttachment, setOpenReviewerAttachment] = useState<any>(false)
  const [openNormalizerAttachment, setOpenNormalizerAttachment] = useState<any>(false)
  const [openEmployeeAttachment, setOpenEmployeeAttachment] = useState<any>(false)
  const [employeecode, setemployeecode] = useState<any>([])
  useEffect(() => {
    setemployeecode(employeeData?.employee?.employee_code)

  }, [employeeData])


  const open6 = Boolean(anchorEl6);
  const openReject = Boolean(anchorReject);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setappraisalAttachments(
      employeeData &&
      employeeData?.employee?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
  };

  const handleClickOpen8 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {

    setAnchorReject(event.currentTarget);
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };

  const handleClose8 = () => {
    setAnchorReject(null);
    // setOpen2(false);
  };
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );

  //  open and close reviewer attachments
  const handleOpenReviewerAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setReviewerAttachments(
      employeeData &&
      employeeData?.employee?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    // setOpen2(true);
    setAnchorEl8(event.currentTarget);
    setOpenReviewerAttachment(!openReviewerAttachment)
  };

  const handleCloseReviewerAttachment = () => {
    setAnchorEl8(null);
    setOpenReviewerAttachment(false)
  };

  //  open and close Normalizer attachments
  const handleOpenNormalizerAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setNormalizerAttachments(
      employeeData &&
      employeeData?.employee?.normalizer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    // setOpen2(true);
    // setAnchorEl6(event.currentTarget);
    setOpenNormalizerAttachment(!openNormalizerAttachment)
  };

  const handleCloseNormalizerAttachment = () => {
    // setAnchorEl6(null);
    // setOpen2(false);
    setOpenNormalizerAttachment(false)
  };

  //  open and close Employee attachments
  const handleOpenEmployeeAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setEmployeeAttachments(
      employeeData &&
      employeeData?.employee?.employee?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    // setOpen2(true);
    // setAnchorEl6(event.currentTarget);
    setOpenEmployeeAttachment(!openEmployeeAttachment)
  };


  const handleCloseEmployeeAttachment = () => {
    setOpenEmployeeAttachment(false)
    // setAnchorEl6(null);
    // setOpen2(false);
  };
  const [employeeAttachments1, setemployeeAttachments1] = useState<any>("");

  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
    setemployeeAttachments1(
      employeeData &&
      employeeData?.employee?.employee?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    setAnchorEl7(event.currentTarget);
  };
  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };
  const [show1, setShow1] = useState<any>("");
  const [show4, setShow4] = useState<any>("");
  const New4 =
    employeeData &&
    // objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.employee?.employee?.objective_description
          ?.filter((i: any) => i?.name?._id === j?.name?._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  // console?.log(New4, "New4");

  useEffect(() => {
    // if (New4 == 0 ) {
    if (employeeData?.employee?.appraisal?.status == "rejected" || (employeeData?.employee?.appraisal?.status == "completed")) {
      setShow4(true);
    } else {
      setShow4(false);
    }
  }, [New4]);

  const New =
    employeeData &&
    // objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.employee?.appraisal?.objective_description
          ?.filter((i: any) => i?.name?._id === j?.name?._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  console.log(New, "New");

  useEffect(() => {
    if (New == 0) {
      setShow1(false);
    } else {
      setShow1(true);
    }
  }, [New]);
  console.log(show, 'disappear')
  const [show2, setShow2] = useState<any>("");
  const New2 =
    employeeData &&
    // objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.employee?.reviewer?.objective_description
          ?.filter((i: any) => i.name._id === j.name._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  useEffect(() => {
    if (New2 == 0) {
      setShow2(false);
    } else {
      setShow2(true);
    }
  }, [New2]);

  console.log(show2, reviewer, 'newwwwwwwwww')
  const [appraisal, setAppraisal] = useState<any>("");
  const [reviewers, setReviewers] = useState<any>("");
  const [employees, setEmployees] = useState<any>("");


  useEffect(() => {
    if (employeeData?.employee?.appraisal?.appraisal_status == "not-started") {
      navigate(`/APPRAISAL_NOT_STARTED`);
    }
    else if (employeeData?.employee?.employee?.employee_status == "accepted" || employeeData?.employee?.employee?.employee_status == "rejected") {
      setAppraisal(true)
      setReviewers(true)
      setEmployees(true)
    } else if (employeeData?.employee?.reviewer?.reviewer_status == "rejected") {
      setAppraisal(true)
      setReviewers(true)
      setEmployees(false)
    } else {
      setAppraisal(true)
      setReviewers(false)
      setEmployees(false)
    }
  }, [employeeData])


  const [show3, setShow3] = useState<any>("");
  const [trainingRecom, setTrainingRecom] = useState<any>(false);
  const [trainingRecom1, setTrainingRecom1] = useState<any>("");

  const [area, setArea] = useState<any>("");
  const [area1, setArea1] = useState<any>("");

  const New3 =
    employeeData &&
    // objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.employee?.normalizer?.objective_description
          .filter((i: any) => i?.name?._id === j?.name?._id)
          .map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  useEffect(() => {
    if (New3 == 0) {
      setShow3(false);
    } else {
      setShow3(true);
    }
  }, [New3]);

  const [data1, setData1] = useState<any>("");
  const [data2, setData2] = useState<any>("");
  const [data3, setData3] = useState<any>("");
  const [data4, setData4] = useState<any>("");



  useEffect(() => {
    if (New !== 0) {
      setData1(true)
    } else if (New2 !== 0) {
      setData2(true)
    } else if (New3 !== 0) {
      setData3(true)
    } else if (New4 !== 0) {
      setData4(true)
    }
  }, [New, New2, New3, New4])
  const getAttachments = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.employee?.appraisal?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };


  const getAppraiserRejectionAttachments = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.employee?.appraisal?.rejection_attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };


  const getAttachments1 = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.employee?.employee?.attachments
      ?.filter((i: any) => i?.objective_description == id)
      ?.map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k?.url}> {k?.name} </a> <br />
            </div>
          ),
          remove: k?.name,
        };
        // return k.name
      });
  };
  const getAttachments2 = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.employee?.reviewer?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };
  const getAttachments3 = (id: any) => {
    // console.log(id, "id for attachmetns ");
    // console.log(employeeData,"employeedata")

    return employeeData?.employee?.employee?.normalizer?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };
  useEffect(() => {

    const Name = employeeData &&
      // objectiveTitleData &&
      Training?.map((j: any) => {
        //console.log(j,"trainingname")
        if (j == undefined || j == null) {
          setTrainingRecom(false)
        }
        // return(
        //   <>
        //   {j.training_name}

        //   </>
        // )
      })
    //console.log(Name,"nameee")
  }, [employeeData])


  useEffect(() => {
    const Newdata = employeeData &&
      // objectiveTitleData &&
      Training1?.map((j: any) => {
        if (j == undefined || j == null) {
          setTrainingRecom1(false)
        }
        // return(
        //   <>
        //   {j?.training_name}
        //   </>
        // )
      })
    //console.log(Newdata,"newdata")

  }, [employeeData])

  useEffect(() => {
    const Areaof = filterData2 &&
      filterData2.map((i: any, index: any) => {
        //console.log(i, "567");
        if (i == undefined || i == null) {
          setArea(false)
        }
        // return (
        //   <>
        //   {i[0]}
        //   </>
        // )
      })
    console.log(Areaof, "Areaof")
  }, [employeeData])
  useEffect(() => {
    const Areaof1 = filterData1 &&
      filterData1.map((i: any, index: any) => {
        //console.log(i, "567");
        // if (i == undefined || i == null) {
        //   setArea1(false)
        // }
        return (
          <>
            {i[0]}
          </>
        )
      })
    console.log(Areaof1, "Areaof1")
  }, [employeeData])

  // console.log(employeeData?.employee?.appraisal?.area_of_improvement[0], "Appraiser");

  const [positionHide, setpositionHide] = useState<any>(true);
  const [trigger, setTrigger] = useState<any>(false);

  const hideAlertHandler = () => {
    setTimeout(() => {
      // createPDF()
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
    }, 2000);
    setTimeout(() => {
      setpositionHide(true)
    }, 3000);
  };
  const handleHide = () => {
    setpositionHide(false)
    hideAlertHandler()
  }
  // useEffect(()=>{
  //   if(trigger){
  //     setpositionHide(false)
  //   }
  // },[trigger])

  const getOverallRating = (rating: any) => {
    if (rating?.normalizer?.normalizer_rating !== 0) {
      //setData3(true)
      return rating?.normalizer?.normalizer_rating;
    } else if (rating?.reviewer?.reviewer_rating !== 0) {
      //setData2(true)
      return rating?.reviewer?.reviewer_rating
    } else if (rating?.appraisal?.appraiser_rating !== 0) {
      //setData1(true)
      return rating?.appraisal?.appraiser_rating
    } else {
      return rating?.appraisal?.appraiser_rating
    }
  }
console.log(employeeData?.data?.appraisal?.appraiser_overall_feedback,"feedback")
  return (
    <PDFExport
      paperSize="A4"
      scale={0.48}
      keepTogether="p"
      forcePageBreak=".page-break" ref={pdfExportComponent}
      fileName={`PA_${employeecode}.pdf`}>
      <div
        // id="pdf"
        style={{
          backgroundColor: "#F1F1F1",
          minHeight: "100px",
          overflow: "hidden",
          height: "auto"
        }}

      >
        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1425px",
            background: "#fff",
            marginTop: "35px",
            minHeight: "100px",
            overflow: "hidden",
            marginLeft: "25px",
            marginRight: "25px",
            marginBottom: "25px"
          }}
        >
          <Box
            id="pdf"
            // display={"flex"}
            style={{
              padding: "35px",
              // display:"flex",

            }}
          >
            {/* <h2
              style={{
                color: "#3E8CB5",
                fontWeight: "400",
                fontSize: "28px",
                fontFamily: "Arial",
              }}
            >
            </h2> */}
            <div id="rating">
              <>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingBottom="10px"
                >
                  <div>
                    <img height={55} width={125} alt="logo" src={taqeeflogo} />
                  </div>

                  <span >
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Typography
                          style={{
                            color: "#3E8CB5",
                            fontSize: "17px",
                            fontFamily: "Arial",
                          }}
                        >
                          PA Status:
                        </Typography>
                        <div
                          style={{
                            color: "#717171",
                            // fontWeight: "400",
                            fontSize: "17px",
                            fontFamily: "Arial",
                          }}
                        >
                          {(employeeData?.employee?.appraisal?.status == "completed" ? <span>Completed</span> :
                            employeeData?.employee?.appraisal?.status == "not-started" ? <span>Not started</span> :
                              employeeData?.employee?.appraisal?.status == "in-progress" ? <span>In progress</span> :
                                employeeData?.employee?.appraisal?.status)}
                        </div>
                      </Stack>

                      {positionHide && (
                        <Button
                        variant="outlined"
                        size="small"
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          // marginRight: "63px",
                        }}
                      >
                          <label 
                          onClick={() => {
                            //   setHide()
                            //  createPDF()
                            handleHide()
                            // if (pdfExportComponent.current) {
                            //   pdfExportComponent.current.save();
                            // }
                          }}
                          >
                            <img 
                            style={{ 
                              width:"15px",
                              height:"15px",
                              cursor: "pointer",
                            }} 
                            src={Downloadss} alt="Download" />
                            </label>
                          
                        </Button>
                      )}
                      {positionHide === false && <span
                        style={{
                          color: "#3e8cb5",
                          padding: "8px",
                          height: "18px",
                          border: "1px solid#3e8cb5",
                          fontSize: "14px",
                          fontFamily: "Arial",
                          borderRadius: "4px"
                        }}
                      >{`${dayjs().format("DD-MMM-YYYY")}`}</span>}
                    </Stack>
                  </span>

                </Stack>
                <Box sx={{ backgroundColor: "#f3fbff", padding: "10px" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                          style={{ paddingTop: "10px", paddingBottom: "10px" }}
                        >
                          {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                          {employeeData?.employee?.profile_image_url != undefined ? (

                            <img id="img1" style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.employee?.profile_image_url} />
                            // <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={Downloadss} />
                          ) : (
                            <Avatar style={{ width: "55px", height: "55px" }}>
                              {appraisalData &&
                                appraisalData.employee.first_name.substring(0, 1)}
                            </Avatar>
                          )}
                        </Typography>
                        <Stack direction="column" spacing={1}>
                          <span
                            style={{
                              fontSize: "17px",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                            }}
                          >
                            {employeeData?.employee?.legal_full_name}
                          </span>
                          <span
                            style={{
                              color: "#333333",
                              opacity: "50%",
                              fontSize: "12px",
                              fontFamily: "Arial",
                              marginTop: "5px",
                            }}
                          >
                            {employeeData?.employee?.position_long_description}{" "}
                          </span>
                          <span
                            style={{
                              color: "#333333",
                              opacity: "50%",
                              fontSize: "12px",
                              fontFamily: "Arial",
                              marginTop: "5px",
                            }}
                          >
                            Grade {employeeData?.employee?.grade}{" "}
                          </span>
                          <span
                            style={{
                              opacity: "50%",
                              fontSize: "12px",
                              fontFamily: "Arial",
                              marginTop: "5px",
                            }}
                          >
                            {employeeData?.employee?.employee_code}
                          </span>
                        </Stack>
                      </Stack>
                    </div>
                    <div>
                      <Stack
                        direction="column"
                        display="flex"
                        alignItems="center"
                        // gap="8px"
                        paddingRight="10px"
                        paddingBottom="15px"
                      >
                        <Typography
                          style={{
                            fontSize: "17px",
                            color: "#3e8cb5",
                            fontFamily: "Arial",
                          }}
                        >
                          Overall Rating

                          <Popover
                            id={id22}
                            open={open22}
                            anchorEl={anchorE22}
                            onClose={handleClose22}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{
                              style: {
                                backgroundColor: "FEFCF8",
                                boxShadow: "none",
                                maxWidth: "450px",
                                borderRadius: "5px",
                              },
                            }}
                            sx={{
                              "& .MuiPopover-paper": {
                                border: "1px solid #3e8cb5",
                                backgroundColor: "#ffffff",
                                // left:"800px !important"
                                // width: "30%",
                              },
                            }}
                          >
                            <div
                            style={{
                              padding: "10px",
                              fontSize: "14px",
                              lineHeight: "20px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                          ><b>{ratingscaledef}</b>:
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >

                                {ratingdefenition}

                              </span>
                            </div>
                          </Popover>
                          {/* </Stack> */}

                        </Typography>
                        <div
                          style={{
                            // paddingLeft: "22px",
                            fontSize: "16px",
                            color: "#333333",
                            fontFamily: "arial"

                          }}
                        >
                           {ratingdefenition?.length>0 &&
                    <IconButton  sx={{padding:"4px"}}onClick={handleClick22} >
                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  </IconButton>
                    }<b>
                      {/* {employeeData?.employee?.overall_rating?.toFixed(2)} */}
                      {parseFloat(employeeData?.employee?.overall_rating)?.toFixed(2)}
                      </b>

                        </div>

                      </Stack>
                    </div>


                  </Stack>
                </Box>
                <Box sx={{ paddingTop: "20px" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    paddingBottom="20px"
                  >
                    <Grid item xs={4}>

                      <span
                        style={{
                          fontSize: "20px",
                          color: "#3E8CB5",
                          fontFamily: "Arial",
                        }}
                      >
                        Performance Appraisal Period
                      </span>

                      <Typography
                        style={{
                          color: "#717171",
                          marginTop: "8px",
                          fontSize: "16px",
                          fontFamily: "Arial",
                        }}
                      >

                        {employeeData?.employee?.calendar?.name}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}

                    >

                    </Grid>

                    <Grid item xs={4}>
                      <Stack direction="row" gap="12px">

                        <Stack direction="column" paddingRight="10px" alignItems="flex-end">
                          {(employeeData?.employee?.appraisal?.potential !== "" &&
                            employeeData?.employee?.appraisal?.potential !== undefined) && (
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span
                                  style={{
                                    fontSize: "17px",
                                    color: "#3E8CB5",
                                    fontFamily: "Arial",
                                  }}
                                ><IconButton  sx={{padding:"4px"}} onClick={handleClick15} >
                                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                  </IconButton>
                                  Potential Level

                                  <Popover
                                    id={id15}
                                    open={open15}
                                    anchorEl={anchorE15}
                                    onClose={handleClose15}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "right",
                                    }}
                                    PaperProps={{
                                      style: {
                                        backgroundColor: "FEFCF8",
                                        boxShadow: "none",
                                        maxWidth: "450px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    sx={{
                                      "& .MuiPopover-paper": {
                                        border: "1px solid #3e8cb5",
                                        backgroundColor: "#ffffff",
                                        // width: "30%",
                                      },
                                    }}
                                  >
                                    <div
                                      style={{
                                        padding: "10px",
                                        fontSize: "14px",
                                        lineHeight: "20px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      {employeeData?.employee?.appraisal?.potential === "High" && (
                                        <Typography
                                          style={{
                                            fontSize: "14px",
                                            // color: "#3e8cb5",
                                            fontFamily: "Arial",
                                            // paddingBottom: "5px",
                                            //borderBottom: "1px solid #d9d9d9",
                                          }}
                                        >
                                          <b>High:</b>
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            {employeeData?.employee?.high}
                                          </span>
                                        </Typography>
                                      )}

                                      {employeeData?.employee?.appraisal?.potential == "Moderate" && (
                                        <Typography
                                          style={{
                                            fontSize: "14px",
                                            // color: "#3e8cb5",
                                            fontFamily: "Arial",
                                            // paddingBottom: "5px",
                                            // paddingTop: "5px",
                                            // borderBottom: "1px solid #d9d9d9",
                                          }}
                                        >
                                          <b>Moderate:</b>
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            {employeeData?.employee?.moderate}
                                          </span>
                                        </Typography>)}
                                      {employeeData?.employee?.appraisal?.potential == "Low" && (
                                        <Typography
                                          style={{
                                            fontSize: "14px",
                                            //color: "#3e8cb5",
                                            fontFamily: "Arial",
                                            // paddingTop: "5px",
                                          }}
                                        >
                                          <b>Low:</b>
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >{employeeData?.employee?.low}
                                          </span>
                                        </Typography>)}


                                    </div>
                                  </Popover>
                                </span>
                                <Typography
                                  style={{
                                    color: "#717171",
                                    marginTop: "8px",
                                    fontSize: "16px",
                                    fontFamily: "Arial",
                                  }}
                                >

                                  {employeeData?.employee?.appraisal?.potential}

                                </Typography>
                              </div>
                            )}


                        </Stack>
                        {/* )} */}
                      </Stack>
                    </Grid>
                  </Stack>
                  {/* </Grid> */}
                  {/* </Grid> */}
                </Box>
                <Typography
                  style={{ fontSize: "20px", color: "#3E8CB5", fontFamily: "Arial", paddingBottom: "20px" }}
                >
                  Performance Appraisal Summary
                </Typography>

                {show4 && employee && (
                  <>

                  </>
                )}
                <Stack direction="row" alignItems="center">
                <IconButton  sx={{padding:"4px 4px 4px 0px"}} aria-describedby={id2} onClick={handleClick}>
                    <img width="12px" src={Infoicon} alt="icon" />
                  </IconButton>
                <Typography
                  style={{ color: "#3e8cb5", fontSize: "16px", fontFamily: "Arial" }}
                >
                  
                  <b> Ratings   </b>
                  </Typography>
                  </Stack>
                  <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    PaperProps={{
                      style: { width: "260px", marginTop: "55px" },
                    }}
                  >
                    <TableContainer>
                      <Scroll>
                        <CustomScrollbar style={{ width: "100%", height: "225px" }}>
                          <Table
                            sx={{ minWidth: 200,
                              '& th, & td': {
                                borderBottom: 'none', // Remove the bottom border for th and td
                              },
                           }}
                            size="small"
                            aria-label="simple table"
                          >
                            <TableHead
                              style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                            >
                              <TableRow sx={{ bgcolor: "#eaeced" }}>

                                <TableCell
                                align="center"
                                sx={{
                                  maxWidth: "30%",
                                  fontFamily: "Arial",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                  fontWeight: "600", // Adjust the maxWidth as needed
                                }}
                                >
                                      Rating
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{
                                    maxWidth: "70%",
                                    fontFamily: "Arial",
                                    color: "#3E8CB5",
                                    fontSize: "14px",
                                    fontWeight: "600",  // Adjust the maxWidth as needed
                                  }}
                                >
                                      Rating Title
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {employeeData &&
                                employeeData?.employee?.rating_scale
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a.rating - b.rating;
                                  })
                                  ?.map((row: any, index: any) => {
                                    return (
                                      <TableRow
                                        key={row._id}
                                        sx={{
                                          "&:last-child td, &:last-child th": {
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
                                          <div
                                            style={{
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
                                              width: "147px",
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
                        </CustomScrollbar>
                      </Scroll>
                    </TableContainer>
                  </Popover>
                <TableContainer sx={{ width: "100%", }}>
                  <Table sx={{
                    borderCollapse: 'separate',
                    borderSpacing: '0px 15px'
                  }} size="small" aria-label="simple table">
                    <TableHead >
                      <TableRow
                        sx={{
                          "& td, & th": {
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
                          align="center"
                        >
                          Objective <br></br> Type
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
                          Objective <br></br> Title
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
                          Objective <br></br> Level
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
                          Appraiser<br></br>  Rating
                        </TableCell>

                        {employeeData?.employee?.objective_description?.filter((item: any) =>
                          item.comments !== "" && item.comments !== undefined)?.length > 0 && (
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
                              Appraiser<br></br>  Comments
                            </TableCell>
                          )}
                        {/* <TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Appraiser<br></br>  Rejection Reason
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
                              Reviewer<br></br>  Rating
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
                              Reviewer<br></br>  Rejection Reason
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
                              Employee <br></br> Rating
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
                              Employee<br></br>  Rejection Reason
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
                                Re-normalized<br /> Rating
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
                                     Normalizer<br /> Comments
                                  </TableCell>
                                */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeData &&
                        objectiveTitleData &&
                        description?.map((j: any, index: any) => {
                          console?.log(j, "newwwwww");
                          return (
                            <>
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #80808014 ",
                                    boxShadow: "1px 0px 0px 1px #80808014",
                                    borderBottom: "none",
                                    borderLeft: "0px",
                                    borderTop: "0px"
                                  },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    backgroundColor: colorarray?.find((item: any) => item?.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray?.find((item: any) => item?.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                  }}
                                  align="left"
                                >
                                  {j?.objective_type}
                                  {/* {Type} */}

                                </TableCell>

                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    background: "#ffffff",
                                  }}
                                  align="left"
                                >
                                  {/* {j?.objectiveTitle} */}

                                  <Stack direction="row" alignItems="center" >

                                    <IconButton
                                    sx={{padding:"4px"}}
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
                                      {j?.objective_title}
                                    </Typography>
                                  </Stack>
                                  <Popover
                                    id={"id101"}
                                    open={popoverIndexs === index && openInfo101}
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
                                      {/* {
                                        j?.description} */}
                                      {/* {openInfo101 &&
                                        activeObjectiveId &&
                                        j._id === activeObjectiveId &&
                                        j?.description} */}
                                      {j.description}
                                    </Typography>
                                  </Popover>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#fbfbfb",
                                  }}
                                  align="center"
                                >
                                  <Stack direction="row" alignItems="center" justifyContent="center" >
                                  {(j.level_1_isChecked ||
                                    j.level_2_isChecked ||
                                    j.level_3_isChecked ||
                                    j.level_4_isChecked) && (
                                      <IconButton
                                      sx={{padding:"4px"}}
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
                                      <span>L1</span>
                                      <span>
                                        {/* {j?.name?.level_1?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_2_isChecked && (
                                    <>
                                      <span>L2 </span>
                                      <span>
                                        {/* {j?.name?.level_2?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_3_isChecked && (
                                    <>
                                      <span>L3 </span>
                                      <span>
                                        {/* {j?.name?.level_3?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_4_isChecked && (
                                    <>
                                      <span>L4 </span>
                                      <span>
                                        {/* {j?.name?.level_4?.level_definition} */}
                                      </span>
                                    </>
                                  )}
</Stack>
                                  <Popover
                                    id={"id102"}
                                    // open={openInfo102}
                                    open={popoverIndexs === index && openInfo102}
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
                                                  <span>
                                                    <b>{
                                                      j?.level_1?.level_definition

                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_1?.behavioral_objective.map(
                                                      (item: any) => {
                                                        return <li>{item}</li>;
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
                                                      j?.level_2?.level_definition

                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_2?.behavioral_objective.map(
                                                      (item: any) => {
                                                        return <li>{item}</li>;
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
                                                      j?.level_3?.level_definition

                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_3?.behavioral_objective.map(
                                                      (item: any) => {
                                                        return <li>{item}</li>;
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
                                                      j?.level_4?.level_definition

                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
                                                    {j?.level_4?.behavioral_objective.map(
                                                      (item: any) => {
                                                        return <li>{item}</li>;
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
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#fbfbfb",
                                  }}
                                  align="center"
                                >
                                  {j.rating}
                                  {/* {employeeData?.employee?.overall_rating} */}
                                </TableCell>

                                {employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.comments !== "" && item.comments !== undefined)?.length > 0 && (
                                  <TableCell
                                  width="300px"
                                    sx={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      background: "#fbfbfb",
                                    }}
                                    align="left"
                                  >
                                    {j?.comments}
                                  </TableCell>)}
                                {/* {(
                                  <TableCell
                                    width="250px"
                                    sx={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      background: "#fbfbfb",
                                    }}
                                    align="left"
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <span
                                        style={{
  
                                          wordBreak: "break-word",
                                          fontSize: "14px",
                                          color: "#333333",
                                          fontFamily: "Arial",
  
  
                                        }}
                                      >  
                                      {(j?.comments == "" || j?.comments == undefined) ? "" : j?.comments}</span>
                                      {employeeData && getAttachments(j?.name?._id)?.length > 0 &&
  
                                        <AttachFileIcon
                                          sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) => {
                                            handleClickOpen6(e, j)
                                            setPopoverIndex1(index)
                                          }}
                                        />
                                      }
                                      <Popover
                                        id={"id"}
                                        open={(popoverIndex1 === index) && open6}
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
                                            backgroundColor: "FEFCF8",
                                            boxShadow: "none",
                                            maxWidth: "400px",
                                            borderRadius: "5px",
                                          },
                                        }}
                                        sx={{
                                          "& .MuiPopover-paper": {
                                            border: "1px solid #3e8cb5",
                                            backgroundColor: "#ffffff",
                                          },
                                        }}
                                      >
                                        <div
                                         
                                          style={{
                                            padding: "5px",
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "Arial",
                                              color: "#333333",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "170px"
                                            }}>
                                            {employeeData && getAttachments(j?.name?._id)?.map((k: any, index1: any) => {
                                              return (
                                                <>
                                                  <Stack
                                                    spacing={1}
                                                    direction="row"
                                                    alignItems="center"
                                                  >
  
                                                    <Typography
                                                      style={{
                                                        fontSize: "12px",
                                                        fontFamily: "Arial",
                                                        color: "#333333",
  
                                                      }}
                                                    >
                                                      {index1 + 1}.
                                                    </Typography>
                                                    <Typography
                                                      style={{
                                                        fontSize: "12px",
                                                        fontFamily: "Arial",
                                                        color: "#333333",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        width: "170px"
                                                      }}
                                                    >
                                                      {k?.resp}
                                                    </Typography>
                                                    <Stack direction="row">
                                                    </Stack>
  
                                                  </Stack>
                                                </>
                                              )
                                            })}
                                          </Typography>
                                         
                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>
                                )}
                                {showRenormalizedData && employeeData?.employee?.objective_description?.filter((item: any) =>
                                  (item.rating_rejected == true || item.rating_resubmitted)).length > 0 && (
                                    <TableCell
                                      width="250px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#fbfbfb",
                                      }}
                                      align="left"
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                      >
                                        <span
                                          style={{
  
                                            wordBreak: "break-word",
                                            fontSize: "14px",
                                            color: "#333333",
                                            fontFamily: "Arial",
  
  
                                          }}
                                        >  {(j?.rating_rejected == true || j.rating_resubmitted) ? j?.rejection_reason : ""}</span>
  
                                        {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 && (j.rating_rejected || j.rating_resubmitted) &&
  
                                          <AttachFileIcon
                                            sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleClickOpen8(e, j)
                                              setPopoverIndex1(index)
                                            }}
                                          />
                                        }
                                        <Popover
                                          id={"id"}
                                          open={(popoverIndex1 === index) && openReject}
                                          anchorEl={anchorReject}
                                          onClose={handleClose8}
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
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #3e8cb5",
                                              backgroundColor: "#ffffff",
                                             
                                            },
                                          }}
                                        >
                                          <div
                                           
                                            style={{
                                              padding: "5px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px"
                                              }}>
                                              {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.map((k: any, index1: any) => {
                                                return (
                                                  <>
                                                    <Stack
                                                      spacing={1}
                                                      direction="row"
                                                      alignItems="center"
                                                    >
  
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",
  
                                                          // maxWidth:"215px",
                                                          // wordBreak:"break-all"
                                                        }}
                                                      >
                                                        {index1 + 1}.
                                                      </Typography>
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow: "ellipsis",
                                                          width: "170px"
                                                        }}
                                                      >
                                                        {k?.resp}
                                                      </Typography>
                                                      <Stack direction="row">
                                                      
                                                      </Stack>
  
                                                    </Stack>
                                                  </>
                                                )
                                              })}
                                            </Typography>
                         
                                          </div>
                                        </Popover>
                                      </Stack>
                                    </TableCell>
                                  )}
   */}
                                {/* {show2 && reviewer && ( */}
                                {employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      sx={{
                                        fontSize: "14px",
                                        background: "#ffffff",
                                        fontFamily: "Arial",
                                        textAlign: "center",
                                      }}
                                      align="center"
                                    >
                                      <div style={{ display: "inline-flex" }}>
                                        {employeeData &&
                                          employeeData?.employee?.reviewer.objective_description
                                            .filter(
                                              (i: any) => i.name._id === j.name._id
                                            )
                                            .map((k: any) => {
                                              if (k.rating_rejected) return <RatingBackground style={{ color: "white", background: "#D2122E", }} >{k?.ratings?.rating}</RatingBackground>
                                            })[0]}

                                      </div>
                                    </TableCell>
                                  )}
                                {/* {show2 && reviewer && ( */}
                                {employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#fbfbfb",
                                      }}
                                      align="left"
                                    >
                                      <Stack
                                        direction="row"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={2}
                                      >
                                        <span
                                          style={{

                                            wordBreak: "break-word",
                                            fontSize: "14px",
                                            color: "#333333",
                                            fontFamily: "Arial",


                                          }}
                                        >  {employeeData &&
                                          employeeData?.employee?.reviewer.objective_description
                                            .filter(
                                              (i: any) => i.name._id === j.name._id
                                            )
                                            .map((k: any) => k.rejection_reason)[0]}</span>

                                        {employeeData && getAttachments2(j?.name?._id)?.length > 0 &&
                                          (employeeData?.employee?.reviewer.objective_description
                                            .filter(
                                              (i: any) => i.name._id === j.name._id
                                            )
                                            .map((k: any) => k.rating_rejected)[0]) &&
                                          <AttachFileIcon
                                            sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleOpenReviewerAttachment(e, j)
                                              setPopoverIndex2(index)
                                            }}
                                          />
                                        }

                                        <Popover
                                          id={"id"}
                                          open={(popoverIndex2 === index) && openReviewerAttachment}
                                          anchorEl={anchorEl8}
                                          onClose={handleCloseReviewerAttachment}
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
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #3e8cb5",
                                              backgroundColor: "#ffffff",
                                              // width: "30%",
                                            },
                                          }}
                                        >
                                          <div
                                            // sx={{
                                            //   p: 2,
                                            //   backgroundColor: "#f8f8ff",
                                            // }}
                                            style={{
                                              padding: "5px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px"
                                              }}>
                                              {/* Attachments: {reviewerAttachments} */}
                                              {employeeData && getAttachments2(j?.name?._id)?.map((k: any, index1: any) => {
                                                return (
                                                  <>
                                                    <Stack
                                                      spacing={1}
                                                      direction="row"
                                                      alignItems="center"
                                                    >

                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",

                                                          // maxWidth:"215px",
                                                          // wordBreak:"break-all"
                                                        }}
                                                      >
                                                        {index1 + 1}.
                                                      </Typography>
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow: "ellipsis",
                                                          width: "170px"
                                                        }}
                                                      >
                                                        {k.resp}
                                                      </Typography>
                                                      <Stack direction="row">
                                                        {/* <IconButton>
                                                <img src={Downloadatt} />
                                              </IconButton> */}
                                                        {/* <IconButton> */}

                                                        {/* <img
                                                   style={{cursor:"pointer"}}
                                                    src={Removeattnew}
                                                    onClick={() => deleteReviewerMutation({
                                                      employee_id: employee_id,
                                                      name: k.remove
                                                    })}
                                                  /> */}
                                                        {/* </IconButton> */}
                                                      </Stack>

                                                    </Stack>
                                                  </>
                                                )
                                              })}
                                            </Typography>

                                          </div>
                                        </Popover>

                                      </Stack>
                                    </TableCell>
                                  )}
                                {/* {show3 && normalizer && (
                              <TableCell
                              width="50px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                align="center"
                              >
                                <span>
                                  {employeeData &&
                                    employeeData.data.normalizer.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.ratings) return k.ratings.rating;
                                      })[0]}
                              
                                </span>
                              </TableCell>
                            )} */}

                                {/* {show3 && normalizer && (
                              <TableCell
                              width="170px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                align="left"
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <span 
                                  style={{
                                    width:"350px",
                                    wordBreak:"break-word",
                                    fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
  
  
                                  }}>  {employeeData &&
                                    employeeData.data.normalizer.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => k.comments)[0]}</span>
                                
                                  {employeeData && getAttachments3(j?.name?._id)?.length > 0 &&
     
                                  <AttachFileIcon
                                    sx={{ color: "#93DCFA", height: "18px", transform: "rotate(30deg)", }}
                                    aria-describedby={"id"}
                                    onClick={(e: any) => {handleOpenNormalizerAttachment(e, j)
                                    setPopoverIndex3(index)}}
                                  />
                                  }
                                  <Popover
                                    id={"id"}
                                    open={(popoverIndex3 === index) && openNormalizerAttachment}
                                    
                                    onClose={handleCloseNormalizerAttachment}
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
                                      "& .MuiPopover-paper": {
                                        border: "1px solid #3e8cb5",
                                        backgroundColor: "#ffffff",
                                       
                                      },
                                    }}
                                  >
                                     <div
                                             
                                              style={{
                                                padding: "5px",
                                                fontSize: "12px",
                                                lineHeight: "20px",
                                                color: "#333333",
                                                fontFamily: "Arial",
                                              }}
                                            >
                                              <Typography 
                                              style={{
                                          fontSize: "12px",
                                          fontFamily: "Arial",
                                          color: "#333333",
                                          whiteSpace:"nowrap",
                                          overflow:"hidden",
                                          textOverflow:"ellipsis",
                                          width:"170px"
                                        }}>
                                    
                                      {employeeData && getAttachments3(j?.name?._id)?.map((k: any, index1: any) => {
                                      return (
                                        <>
                                          <Stack
                                            spacing={1}
                                            direction="row"
                                            alignItems="center"
                                          >
  
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
  
                                              
                                              }}
                                            >
                                              {index1 + 1}.
                                            </Typography>
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px"
                                              }}
                                            >
                                              {k.resp}
                                            </Typography>
                                            <Stack direction="row">
                                             
                                                
                                                <img
                                                 style={{cursor:"pointer"}}
                                                 src={Removeattnew}
                                                  onClick={() => deleteNormalizerMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })}
                                                   />
                                             
                                            </Stack>
  
                                          </Stack>
                                        </>
                                      )
                                    })}
                                      </Typography>
                                     
                                    </div>
                                  </Popover>
  
                                </Stack>
  
                              </TableCell>
                            )} */}
                                {/* {show4 && employee && ( */}
                                {showRenormalizedData && employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.rating_rejected == true).length > 0 && (

                                    <TableCell
                                      sx={{
                                        fontSize: "14px",
                                        background: "#ffffff",
                                        fontFamily: "Arial",
                                      }}
                                      align="center"
                                    >
                                      <div
                                        style={{ display: "inline-flex" }}
                                      >
                                        {employeeData &&
                                          employeeData?.employee?.objective_description
                                            ?.filter(
                                              (i: any) => i?.name?._id === j?.name?._id
                                            )
                                            ?.map((k: any) => {
                                              if (k?.rating_rejected) return <RatingBackground style={{ color: "white", background: "#D2122E", }} >{k?.ratings?.rating}</RatingBackground>
                                            })[0]}
                                      </div>
                                    </TableCell>
                                  )}
                                {/* {employee && ( */}
                                {showRenormalizedData && employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#fbfbfb",
                                      }}
                                      align="left"
                                    >
                                      <Stack
                                        direction="row"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        spacing={2}
                                      >
                                        <span
                                          style={{

                                            wordBreak: "break-word",
                                            fontSize: "14px",
                                            color: "#333333",
                                            fontFamily: "Arial",


                                          }}

                                        >
                                          {employeeData &&
                                            employeeData?.employee?.objective_description
                                              ?.filter(
                                                (i: any) => i?.name?._id === j?.name?._id
                                              )
                                              ?.map((k: any) => k?.rating_rejected)[0]}
                                        </span>
                                        {employeeData && getAttachments1(j?.name?._id)?.length > 0 &&
                                          (employeeData?.employee?.objective_description
                                            ?.filter(
                                              (i: any) => i?.name?._id === j?.name?._id
                                            )
                                            ?.map((k: any) => k?.rating_rejected)[0]) &&
                                          <AttachFileIcon
                                            sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleClickOpen7(e, j)
                                              setPopoverIndex(index)
                                            }}
                                          />
                                        }
                                        <Popover
                                          id={"id"}
                                          open={(popoverIndex === index) && open7}
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
                                              backgroundColor: "FEFCF8",
                                              boxShadow: "none",
                                              maxWidth: "400px",
                                              borderRadius: "5px",
                                            },
                                          }}
                                          sx={{
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #3e8cb5",
                                              backgroundColor: "#ffffff",
                                              // width: "30%",
                                            },
                                          }}
                                        >
                                          <div
                                            // sx={{
                                            //   p: 2,
                                            //   backgroundColor: "#f8f8ff",
                                            // }}
                                            style={{
                                              padding: "5px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px"
                                              }}>
                                              {/* Attachments: {employeeAttachments} */}

                                              {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
                                                return (
                                                  <>
                                                    <Stack
                                                      spacing={1}
                                                      direction="row"
                                                      alignItems="center"
                                                    >

                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",

                                                          // maxWidth:"215px",
                                                          // wordBreak:"break-all"
                                                        }}
                                                      >
                                                        {index1 + 1}.
                                                      </Typography>
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow: "ellipsis",
                                                          width: "170px"
                                                        }}
                                                      >
                                                        {k.resp}
                                                      </Typography>
                                                      <Stack direction="row">

                                                      </Stack>

                                                    </Stack>
                                                  </>
                                                )
                                              })}
                                            </Typography>

                                          </div>
                                        </Popover>
                                      </Stack>
                                    </TableCell>
                                  )}

                                {employeeData?.employee?.appraisal?.status == "completed" &&
                                  employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && (
                                    <>
                                      <TableCell
                                        sx={{
                                          fontSize: "14px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          background: "#ffffff",
                                        }}
                                        align="center"
                                      >
                                        <div style={{
                                          display: "inline-flex"
                                          // color: "#3e8cb5"
                                          // color:
                                          //   j.rating_rejected == true ? "#3e8cb5" : "#333333",
                                        }}>
                                          {employeeData &&
                                            employeeData?.employee?.normalizer?.objective_description
                                              .filter(
                                                (i: any) => i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any) => {
                                                if (k?.ratings) return <RatingBackground style={{ color: "white", background: "grey", }} >{k?.ratings?.rating}</RatingBackground>;
                                              })[0]}

                                        </div>
                                      </TableCell>

                                      {employeeData?.employee?.normalizer?.objective_description?.filter((item: any) =>
                                        item.rating_resubmitted == true).length > 0 && (
                                          <TableCell
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              background: "#fbfbfb",
                                            }}
                                            align="left"
                                          >
                                            <Stack
                                              direction="row"
                                              justifyContent="space-between"
                                              alignItems="center"
                                              spacing={2}
                                            >
                                              <span
                                                style={{
                                                  width: "350px",
                                                  wordBreak: "break-word",
                                                  fontSize: "14px",
                                                  color: "#333333",
                                                  fontFamily: "Arial",


                                                }}>  {employeeData &&
                                                  employeeData?.employee?.normalizer.objective_description
                                                    ?.filter(
                                                      (i: any) => i?.name?._id === j?.name?._id
                                                    )
                                                    ?.map((k: any) => k?.rejection_reason)[0]}</span>

                                              {employeeData && getAttachments3(j?.name?._id)?.length > 0 &&
                                                (employeeData?.employee?.normalizer.objective_description
                                                  .filter(
                                                    (i: any) => i?.name?._id === j?.name?._id
                                                  )
                                                  .map((k: any) => k?.rating_resubmitted)[0]) &&
                                                <AttachFileIcon
                                                  sx={{ color: "#93DCFA", height: "18px", transform: "rotate(30deg)", }}
                                                  aria-describedby={"id"}
                                                  onClick={(e: any) => {
                                                    handleOpenNormalizerAttachment(e, j)
                                                    setPopoverIndex3(index)
                                                  }}
                                                />
                                              }
                                              <Popover
                                                id={"id"}
                                                open={(popoverIndex3 === index) && openNormalizerAttachment}

                                                onClose={handleCloseNormalizerAttachment}
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
                                                  "& .MuiPopover-paper": {
                                                    border: "1px solid #3e8cb5",
                                                    backgroundColor: "#ffffff",

                                                  },
                                                }}
                                              >
                                                <div

                                                  style={{
                                                    padding: "5px",
                                                    fontSize: "12px",
                                                    lineHeight: "20px",
                                                    color: "#333333",
                                                    fontFamily: "Arial",
                                                  }}
                                                >
                                                  <Typography
                                                    style={{
                                                      fontSize: "12px",
                                                      fontFamily: "Arial",
                                                      color: "#333333",
                                                      whiteSpace: "nowrap",
                                                      overflow: "hidden",
                                                      textOverflow: "ellipsis",
                                                      width: "170px"
                                                    }}>

                                                    {employeeData && getAttachments3(j?.name?._id)?.map((k: any, index1: any) => {
                                                      return (
                                                        <>
                                                          <Stack
                                                            spacing={1}
                                                            direction="row"
                                                            alignItems="center"
                                                          >

                                                            <Typography
                                                              style={{
                                                                fontSize: "12px",
                                                                fontFamily: "Arial",
                                                                color: "#333333",


                                                              }}
                                                            >
                                                              {index1 + 1}.
                                                            </Typography>
                                                            <Typography
                                                              style={{
                                                                fontSize: "12px",
                                                                fontFamily: "Arial",
                                                                color: "#333333",
                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                                width: "170px"
                                                              }}
                                                            >
                                                              {k?.resp}
                                                            </Typography>
                                                            <Stack direction="row">
                                                            </Stack>

                                                          </Stack>
                                                        </>
                                                      )
                                                    })}
                                                  </Typography>

                                                </div>
                                              </Popover>

                                            </Stack>

                                          </TableCell>
                                        )}

                                    </>
                                  )}
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            </div>
            <div className="page-break">
              <Typography
                style={{ color: "#3e8cb5", fontSize: "16px", fontFamily: "Arial", paddingTop: "20px", marginBottom: "20px" }}
              >

                <b>Overall Feedback</b>

              </Typography>

              {overallFeed && overallFeed?.map((j: any, mapIndex: any) => {
                console.log(j, 'checkjjjj')
                return (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                      >
                        <b>{j.name}</b>
                      </Typography>

                      <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                        <div style={{
                          color: "#333333",
                          fontSize: "14px",
                          fontFamily: "arial",
                          fontWeight: "400",
                          textTransform: "none",
                          // padding: "8px",
                          textAlign: "left",
                          lineHeight: "23px"
                        }}>
                          {j?.value}
                        </div>

                      </Box>
                    </div>
                    {/* <TextField
                      fullWidth
                      multiline
                      InputProps={{ readOnly: true }}
                      inputProps={{ maxLength: 256 }}
                      size='small'
                      key={j._id}
                      value={j.value}
                    /> */}
                    {/* </Tf1> */}
                  </>
                );
              })}
              {/* {specificAction && ( */}
              {showArea && (
                <div style={{ marginBottom: "20px" }}>
                  <Typography
                    style={{
                      marginBottom: "10px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b>Areas for Improvement (Appraiser)</b>
                  </Typography>
                  <Table size="small" >
                    <TableHead style={{ backgroundColor: "#F7F9FB" }}>
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
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Specific Areas
                        </TableCell>
                        <TableCell

                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Specific Actions
                        </TableCell>

                        {/* {show4 && employee && (<TableCell
                      align="center"
                      style={{
                        border: "1px solid #e0e0e0",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Employee Comments
                    </TableCell>)} */}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {appraiserAreaofImprovement &&
                        appraiserAreaofImprovement?.map((i: any, index: any) => {
                          //console.log(i, "123");
                          return (
                            <>
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",

                                  },
                                }}
                              >
                                <TableCell
                                  width="17%"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {i?.specific_area}
                                  {/* {i[0]} */}
                                </TableCell>
                                <TableCell
                                  width="50%"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {i?.specific_actions}
                                  {/* {filterData1 &&
                                    filterData1?.map((i: any, ix: any) => {
                                      return i[1]?.map((j: any, jx: any) => {
                                        return j?.specific_actions?.map(
                                          (k: any, ix1: any) => {
                                            if (index === ix && k?.value)
                                              return (
                                                <Typography
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "#333333",
                                                    fontFamily: "Arial",
                                                    whiteSpace: "pre-line",
                                                    wordBreak: "break-word",
                                                    lineHeight: "23px"
                                                  }}
                                                >
                                                  {k?.value}
                                                  <br />
                                                </Typography>
                                              );
                                          }
                                        );
                                      });
                                    })} */}
                                </TableCell>


                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              )
              }

              {/* {specificAction1 && (
                <>
                  <Typography
                    style={{
                      paddingTop: "20px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b>Areas for Improvement (Employee)</b>
                  </Typography>
  
                  <Table size="small" style={{ marginTop: "10px" }}>
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
                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Specific Areas
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Specific Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
  
                    <TableBody>
                      {filterData2 &&
                        filterData2?.map((i: any, index: any) => {
                          return (
                            <>
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",
  
                                  },
                                }}
                              >
                                <TableCell
                                  align="left"
                                  width="17%"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {i[0]}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  width="50%"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                > */}
              {/* {filterData2 &&
                                    filterData2?.map((i: any, ix: any) => {
                                      return i[1]?.map((j: any, jx: any) => {
                                        return j?.specific_actions?.map(
                                          (k: any, ix1: any) => {
                                            if (index === ix && k?.value)
                                              return (
                                                <p>
                                                  {k?.value}
                                                  <br />
                                                </p>
                                              );
                                          }
                                        );
                                      });
                                    })} */}
              {/* </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </>
              )} */}
              {showTrainingRecommendation && (
                <div style={{ marginBottom: "20px" }}>
                  <Typography
                    style={{
                      marginBottom: "10px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b>Training Recommendations (Appraiser)</b>
                  </Typography>
                  <Table size="small">
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
                          align="center"

                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Training Category
                        </TableCell>
                        <TableCell
                          align="center"

                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Training Name
                        </TableCell>
                        <TableCell
                          align="center"

                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Justification
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeData &&
                        // objectiveTitleData &&
                        Training?.map((j: any, index: any) => {
                          console.log(j, "jjjj")
                          return (
                            <>
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",
                                  },
                                }}
                              >
                                <TableCell
                                  width="145px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px",

                                  }}
                                >
                                  <IconButton
                                    onClick={(e: any) => {
                                      handleClickInfo6(e)
                                      setPopoverIndex5(index);
                                    }}
                                  >
                                    <img width="12px" src={Infoicon} alt="icon" />
                                  </IconButton>
                                  <Popover
                                    id={id6}
                                    open={(popoverIndex5 === index) && openInfo6}
                                    anchorEl={anchorEl9}
                                    onClose={handleCloseInfo6}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
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

                                      {j?.definition}


                                    </Typography>
                                  </Popover>
                                  {j?.title}
                                  
                                </TableCell>
                                <TableCell
                                  width="160px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {j?.training_name}
                                </TableCell>
                                <TableCell
                                  width="300px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {j?.justification}
                                </TableCell>

                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              )}
              {/* )}  */}
              {/* {trainingRecom1 && ( */}
              {/* {specificAction2 && (
                <div>
                  <Typography
                    style={{
                      paddingTop: "20px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b>Training Recommendations (Employee)</b>
                  </Typography>
                  <Table size="small" style={{ marginTop: "10px" }}>
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
                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Training Category
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Training Name
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid #e0e0e0",
                            fontFamily: "Arial",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Justification
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeData &&
                        objectiveTitleData &&
                        Training1?.map((j: any, index: any) => {
                          console.log(j, "jjjj")
                          return (
                            <>
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",
                                  },
                                }}
                              >
                                <TableCell
                                  width="145px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {j?.name?.name?.title}
                                  <IconButton
                                    // aria-describedby={id2}
                                    onClick={(e: any) => {
                                      handleClickInfo1(e)
                                      setPopoverIndex(index);
                                    }}
  
                                  // style={{marginRight:"5px"}}
                                  >
                                    <img width="12px" src={Infoicon} alt="icon" />
                                  </IconButton>
                                  <Popover
                                    id={id3}
                                    open={(popoverIndex === index) && openInfo1}
                                    anchorEl={anchorEl1}
                                    onClose={handleCloseInfo1}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
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
                                  
  
                                      {j?.name?.name?.definition}
                                    </Typography>
                                  </Popover>
                                </TableCell>
                                <TableCell
                                  width="160px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {j?.training_name}
                                </TableCell>
                                <TableCell
                                  width="300px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {j?.justification}
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </div>
              )}
              */}

              {employeeData?.employee?.other_recommendation?.length > 0 && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                    >
                      <b>Further Recommendations </b>
                    </Typography>

                    <Typography>
                      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                        {employeeData?.employee?.other_recommendation?.map((j: any) => {
                          console.log(j, "otherRecommendation")
                          return (
                            <>
                              <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3} >
                                <input type="checkbox" checked />
                                <Labels>
                                  {j?.name}
                                </Labels>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                    </Typography>
                  </div>
                </>
              )}
              {
                employeeData?.employee?.appraisal?.appraiser_overall_feedback !== "" &&
                <div style={{ marginBottom: "20px" }}>
                  <Typography
                    style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                  >
                    <b>Appraiser Message for Employee</b>
                  </Typography>
                  <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                    <div style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontFamily: "arial",
                      fontWeight: "400",
                      textTransform: "none",
                      // padding: "8px",
                      textAlign: "left",
                      lineHeight: "23px"
                    }}>
                      {employeeData?.employee?.appraisal?.appraiser_overall_feedback}
                    </div>

                  </Box>

                </div>
              }
              {/* {employeeData?.employee?.normalizer?.reason_for_rejection != "" &&
                employeeData?.employee?.normalizer?.reason_for_rejection != undefined &&
                employeeData?.employee?.normalizer?.normalizer_status != "rejected" && (
                  <>
                   <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{ fontSize: "16px", color: "#717171", marginBottom: "10px",  fontFamily: "arial", wordBreak: "break-word" }}
                    >
                      <b>Normalizer Comments</b>
                    </Typography>
  
                   
                    <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
  
                      <div style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "arial",
                        fontWeight: "400",
                        textTransform: "none",
                        // padding: "8px",
                        textAlign: "left",
                        lineHeight: "23px"
                      }}>
                        {employeeData?.employee?.normalizer?.reason_for_rejection}
                      </div>
  
                    </Box>
                     </div>
                  </>
                )}
              
              {employeeData?.employee?.appraisal?.show_employee !== true &&
                employeeData?.employee?.employee?.comments !== undefined &&
                employeeData?.employee?.employee?.comments !== ""
                && (
                  <>
                  <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{ fontSize: "16px", color: "#717171", fontFamily: "arial", marginBottom: "10px", }}
                    >
                      <b>Employee Comments</b>
                    </Typography>
                    <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
  
                      <div style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "arial",
                        fontWeight: "400",
                        textTransform: "none",
                        padding: "8px",
                        height: "20px",
                        textAlign: "left",
                        lineHeight: "23px"
                      }}>
                        {employeeData?.employee?.employee?.comments}
                      </div>
  
                    </Box>
                     </div>
  
                  </>
                )}
              {employeeData?.employee?.appraisal?.show_employee == true &&
                employeeData?.employee?.employee?.rejection_reason !== "" &&
                employeeData?.employee?.employee?.rejection_reason !== undefined && (
                  <>
                  <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{ fontSize: "16px", color: "#717171", fontFamily: "arial", marginBottom: "10px", }}
                    >
                      <b>Employee Comments</b>
                    </Typography>
  
                    <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
  
                      <div style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "arial",
                        fontWeight: "400",
                        textTransform: "none",
                        padding: "8px",
                        height: "20px",
                        textAlign: "left",
                        lineHeight: "23px"
                      }}>
                        {employeeData?.employee?.employee?.rejection_reason}
                      </div>
  
  
                    </Box>
                     </div>
  
                  </>
                )}
   */}
              {/* {employeeData?.employee?.appraisal?.status == "completed" &&
                employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && (
                  <>
                  <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        marginBottom: "10px",
                        fontFamily: "Arial"
                      }}
                    >
                      <b>Normalizer discussed and agreed on the rating with</b>
                       </Typography>
                      <FormGroup>
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox sx={{
        "& .MuiSvgIcon-root": {
        fontSize: "14px !important",
            },
      }} checked={appraiserChecked} name="Appraiser" readOnly />
                          }
                          label="Appraiser"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox sx={{
        "& .MuiSvgIcon-root": {
        fontSize: "14px !important",
            },
      }} checked={reviewerChecked} name="Reviewer" readOnly />
                          }
                          label="Reviewer"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          control={
                            <Checkbox sx={{
        "& .MuiSvgIcon-root": {
        fontSize: "14px !important",
            },
      }} checked={employeeChecked} name="Employee" readOnly />
                          }
                          label="Employee"
                        />
  
                      </FormGroup>
                   
                    </div>
                  </>
                )}
  
              {employeeData?.employee?.appraisal?.status == "completed" &&
                employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && (
                  <>
                   <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                    >
                      <b>Normalizer Meeting Notes</b>
                    </Typography>
  
                   
                    <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
  
                      <div style={{
                        color: "#333333",
                        fontSize: "14px",
                        fontFamily: "arial",
                        fontWeight: "400",
                        textTransform: "none",
                        // padding: "8px",
                        textAlign: "left",
                        lineHeight: "23px"
                      }}>
                        {employeeData?.employee?.normalizer?.normalizer_meeting_notes}
                      </div>
  
                    </Box>
   </div>
  <div style={{marginBottom:"20px"}}>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        fontFamily: "arial",
                        marginBottom: "10px",
                      }}
                    >
                      <b>Normalizer Attachment</b>
                    </Typography>
  
                    <AttachFileIcon
                      sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                      aria-describedby={"id"}
                      onClick={(e: any) => {
                        handleClickOpen11(e)
                      }}
                    />
  </div>
                    <Popover
                      id={"id"}
                      open={open11}
                      anchorEl={anchorEl11}
                      onClose={handleClose11}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
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
                        "& .MuiPopover-paper": {
                          border: "1px solid #3e8cb5",
                          backgroundColor: "#ffffff",
                          // width: "30%",
                        },
                      }}
                    >
                      <div
                        style={{
                          padding: "5px",
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                      >
                        {employeeData && employeeData?.employee?.normalizer?.meetingNotesAttachments?.map((k: any, index1: any) => {
                          return (
                            <>
                              <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                              >
  
                                <Typography
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                  }}
                                >
                                  {index1 + 1}.
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "170px"
                                  }}
                                >
                                  <a href={k?.url}>{k?.name}</a> <br />
                                </Typography>
                                <Stack direction="row">
                                  <IconButton>
                                   
                                  </IconButton>
                                </Stack>
  
                              </Stack>
                            </>
                          )
                        })}
                      </div>
                    </Popover>
                  </>
                )}
   */}





            </div>

          </Box>
        </Box>
      </div>
    </PDFExport>
  );
}

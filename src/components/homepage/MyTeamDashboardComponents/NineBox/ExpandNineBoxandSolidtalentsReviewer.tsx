import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container, Box, Breadcrumbs, Drawer, FormControlLabel, FormGroup } from "@mui/material";
// import NBoxGrids from "./chartscomponents/nboxgrids";
//import ChartTabs from "./chartscomponents/charttabs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";
import Newexcel from "../../../../assets/Images/Newexcel.svg";
import Expand from "../../../../assets/Images/Expand.svg";
import Topperformers from "../../TopPerformers";
import SolidTalents from "../SolidTalents";
import NineBox from "../../NineBox";
import ExpandNineBox from "./ExpandNineBox";
//import NBoxGrids from "./chartscomponents/nboxgrids";
import { useLoggedInUser } from "../../../../hooks/useLoggedInUser";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import { useGetActiveCalenderQuery, useGetEmployeeByFilterQuery } from "../../../../service";
import Potentialtalents from "../../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../../assets/Images/Solidtalents.svg";
import Star from "../../../../assets/Images/Star.svg";
import Inconsistent from "../../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../../assets/Images/Highperformers.svg";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import Leftarrow from "../../../../assets/Images/Leftarrow.svg";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";
// import Newexcel from "../../assets/Images/Newexcel.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Checkbox from "@mui/material/Checkbox";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
export default function ExpandNineBoxandSolidtalentsReviewer(props: any) {

  const { data: user } = useLoggedInUser();
  const location = useLocation();
  console.log(location, "select")
  const { data: userData } = useGetEmployeeByFilterQuery(`?select=employee_code&employee_code=${user?.appraiser}`)
  // const { NineBoxValues, topPerformerEmployees } = props;
  const { data: RangeValue } = useGetNineboxQuery("");
  const navigate = useNavigate();
  console.log(RangeValue, "RangeValue")
  const CustomScrollbar = Scrollbar as any;
    // @ts-ignore
  const low3Value = location?.state?.low3Value;
  // @ts-ignore
  const low4Value = location?.state?.low4Value;
  // @ts-ignore
  const low5Value = location?.state?.low5Value;
  // @ts-ignore
  const moderate3Value = location?.state?.moderate3Value;
  // @ts-ignore
  const moderate4Value = location?.state?.moderate4Value;
  // @ts-ignore
  const moderate5Value = location?.state?.moderate5Value;
  // @ts-ignore
  const high3Value = location?.state?.high3Value;
  // @ts-ignore
  const high4Value = location?.state?.high4Value;
  // @ts-ignore
  const high5Value = location?.state?.high5Value;

  console.log(high3Value, high4Value, high5Value, low3Value, low4Value, low5Value, moderate3Value, moderate4Value, moderate5Value, "low33Value")

  const [indexValue, setindexValue] = React.useState<any>(null);
  //function for nine box
  const [Range, setRange] = React.useState<any>([]);
  const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
  const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
  const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
  const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
  const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
  const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
  React.useEffect(() => {
    if (RangeValue?.data[0]?.performance_definitions !== undefined) {
      setRange(RangeValue?.data[0]?.performance_definitions)
      setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from)
      setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to)
      setRangeMediumFrom(RangeValue?.data[0]?.performance_definitions?.medium_from)
      setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to)
      setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from)
      setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to)
    }

  }, [RangeValue])
  const { data: activecalendardata, isLoading: isTitleLoading } = useGetActiveCalenderQuery('')
  const [appCalId, setappCalId] = React.useState<any>(`636cb1a7960b1548b80ff785`);

  React.useEffect(() => {
    if (activecalendardata?.data[0]?._id != undefined) {
      setappCalId(activecalendardata?.data[0]?._id)
    }
  }, [activecalendardata])
  console.log(appCalId,"appCalId")
  const { data: low_3 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );

  //console.log(low_3, 'useLoggedInUser')
  const { data: moderate_3 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );
  const { data: high_3 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeLowFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeLowTo}`
  );
  {
    console.log(high_3, "high");
  }

  const { data: low_4 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );
  const { data: moderate_4 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );
  const { data: high_4 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeMediumTo}`
  );

  const { data: low_5 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&appraisal.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  const { data: moderate_5 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&reviewer.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  const { data: high_5 } = useGetEmployeeByFilterQuery(
    `?select=normalizer.normalizer_rating,employee.employee_status,appraisal.appraiser_PA_accepted,reviewer.reviewer_rating,talent_category,appraisal.potential,appraiser_name,normalizer_name,reviewer_name,employee_code,manager_name,manager_position,work_location,manager_code,legal_full_name,grade,section,sub section,division,position_long_description,reviewer.status&reviewer_code=${user?.employee_code}&calendar=${appCalId}&reviewer.status=completed&normalizer.normalizer_rating[gte]=${RangeHighFrom}&appraisal.potential=High&normalizer.normalizer_rating[lte]=${RangeHighTo}`
  );
  {
    console.log(high_4, "high_4");
  }
  const [indexBasedValue, setindexBasedValue] = React.useState<any>([]);
  const [indexBasedTitle, setindexBasedTitle] = React.useState<any>('');
  const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tablecount, settablecount] = React.useState<any>(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [filData, setfilData] = React.useState<any>([]);

  //drawer functions
  const [heading1, setheading1] = React.useState(true);
  const [heading2, setheading2] = React.useState(true);
  const [heading3, setheading3] = React.useState(true);
  const [heading4, setheading4] = React.useState(true);

  const [columnHeaders, setcolumnHeaders] = useState<any>({

    Ecode: true,
    Ename: true,
    Eposition: true,
    EGrade: true,
    Rating: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    WorkLocation: true,
    AppraiserName: true,
    Reviewername: true,
    Normalizername: true,
    Potentiallevel: true,
    TalentCategory: true,
    overallRating: true,
    PreviousRating: true,
  })
  const [columnHeadersDisplay, setcolumnHeadersDisplay] = useState<any>({
    Ecode: true,
    Ename: true,
    Eposition: true,
    EGrade: true,
    Rating: true,
    division: true,
    Section: true,
    SubSection: true,
    ManagerCode: true,
    ManagerName: true,
    ManagerPosition: true,
    WorkLocation: true,
    AppraiserName: true,
    Reviewername: true,
    Normalizername: true,
    Potentiallevel: true,
    TalentCategory: true,
    overallRating: true,
    PreviousRating: true,
  })

  const [headingecode, setheadingecode] = React.useState(true);

  const handleheadingEcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingecode(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  const handleheading1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading1(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  const handleheading2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading2(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  const handleheading3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading3(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  const handleheading4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading4(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
    //FiiteredExport1();
  };
  const [headingAppraiser, setheadingAppraiser] = React.useState(true);
  const handleheadingAppraiser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingAppraiser(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingReviewer, setheadingReviewer] = React.useState(true);
  const handleheadingReviewer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingReviewer(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingNormalizer, setheadingNormalizer] = React.useState(true);
  const handleheadingNormalizer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingNormalizer(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [overall, setoverAll] = React.useState(true);
  const handleoverAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setoverAll(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [talentcategory, setTalentcategory] = React.useState(true);
  const handletalentcategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTalentcategory(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingPotential, setheadingPotential] = React.useState(true);
  const handleheadingPotential = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPotential(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [headingPrevious, setheadingPrevious] = React.useState(true);
  const handleheadingPrevious = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheadingPrevious(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [divisionVal, setdivisionVal] = React.useState(true);
  const handledivisionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdivisionVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [sectionVal, setsectionVal] = React.useState(true);
  const handlesectionVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsectionVal(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading10, setheading10] = React.useState(true);
  const handleheading10 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading10(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading11, setheading11] = React.useState(true);
  const handleheading11 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading11(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading12, setheading12] = React.useState(true);
  const handleheading12 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading12(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading13, setheading13] = React.useState(true);
  const handleheading13 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading13(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  const [heading14, setheading14] = React.useState(true);
  const handleheading14 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setheading14(event.target.checked);
    let columnHeadersTemp = columnHeaders
    columnHeadersTemp[event.target.name] = event.target.checked;
    setcolumnHeaders(columnHeadersTemp)
  };
  //drawer functions

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    // setPageNumber(pageNumber + 1)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const emp = moderate_3?.data?.map((i: any) => {
    return i?.legal_full_name
  })
  console.log(indexBasedTitle, "indexBasedTitle")
  //console.log(moderate_3?.data[0]?.legal_full_name,moderate_4,moderate_5,"moderate_4")
  const NineBoxValues = [
    {
      title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
      count: high3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Potentialtalents} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[1]?.definition,
      count: high4Value?.count,
      color: "linear-gradient(to left, #71E1F6, #28B7D3)",
      icon: <img src={Solidtalents} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[2]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[2]?.definition,
      count: high5Value?.count,
      color: "linear-gradient(to left, #71E1F6, #28B7D3)",
      icon: <img src={Star} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[3]?.definition,
      count: moderate3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Inconsistent} alt="image" />,

    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[4]?.definition,
      count: moderate4Value?.count,
      color: "linear-gradient(to left, #33CDB4, #079B82)",
      icon: <img src={Solidperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[5]?.definition,
      count: moderate5Value?.count,
      color: "linear-gradient(to left, #33CDB4, #079B82)",
      icon: <img src={HighPerformerstop} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[6]?.definition,
      count: low3Value?.count,
      color: "linear-gradient(to left, #F89994, #F7665E)",
      icon: <img src={Lowperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[7]?.definition,
      count: low4Value?.count,
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)",
      icon: <img src={Solidperformer} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[8]?.definition,
      count: low5Value?.count,
      color: "linear-gradient(to left, #F9C5A1, #F99B5B)",
      icon: <img src={Highperformers} alt="image" />,
    },
  ];
  // useEffect(() => {
  //   if (high_3 != undefined && high_4 != undefined && high_5 != undefined && low_3 != undefined && low_4 != undefined && low_5 != undefined && moderate_3 != undefined && moderate_4 != undefined && moderate_5 != undefined) {
  //     let DataforInitial: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)
  //     setindexBasedValue(DataforInitial)
  //   }
  // }, [high_3, high_4, high_5, moderate_3, moderate_4, moderate_5, low_3, low_4, low_5])

  useEffect(() => {
    if (indexValue == 0) {
      setindexBasedValue(high3Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[0]?.title)
    } else if (indexValue == 1) {
      setindexBasedValue(high4Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[1]?.title)
    } else if (indexValue == 2) {
      setindexBasedValue(high5Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[2]?.title)
    } else if (indexValue == 3) {
      setindexBasedValue(moderate3Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[3]?.title)
    } else if (indexValue == 4) {
      setindexBasedValue(moderate4Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[4]?.title)
    } else if (indexValue == 5) {
      setindexBasedValue(moderate5Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[5]?.title)
    } else if (indexValue == 6) {
      setindexBasedValue(low3Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[6]?.title)
    } else if (indexValue == 7) {
      setindexBasedValue(low4Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[7]?.title)
    } else if (indexValue == 8) {
      setindexBasedValue(low5Value?.data)
      setindexBasedTitle(RangeValue?.data[0]?.box_9_definitions[8]?.title)
    }

  }, [indexValue])
  console.log(moderate_3, "low_3")
  const ExcelData9Box: any[] = [

    high_3?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    high_4?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    high_5?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    moderate_3?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    moderate_4?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),
    moderate_5?.data?.map((j: any) => {
      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    low_3?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    low_4?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),

    low_5?.data?.map((j: any) => {

      return {
        Name: j?.legal_full_name,
        Position: j?.position_long_description,
        Grade: j?.grade,
        Division: j?.division,
        Section: j?.section,
        Subsection: j["sub section"],
        Overallrating: j?.reviewer?.reviewer_rating,
        Potential: j?.appraisal.potential,
      }
    }),
  ].flat()
  const handleExport = () => {
    if (high_3 != undefined && high_4 != undefined && high_5 != undefined && low_3 != undefined && low_4 != undefined && low_5 != undefined && moderate_3 != undefined && moderate_4 != undefined && moderate_5 != undefined) {
      let Datainitial: any[] = high_3?.data.concat(high_4?.data, high_5?.data, moderate_3?.data, moderate_4?.data, moderate_5?.data, low_3?.data, low_4?.data, low_5?.data)


      const mapped = Datainitial?.map((j: any) => {
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = j?.employee_code
        if (columnHeaders["Ename"] == true) exportData["EmployeeName"] = j?.legal_full_name
        if (columnHeaders["Eposition"] == true) exportData["Position"] = j?.position_long_description
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = j?.grade
        // if(columnHeaders["Rating"] == true)exportData["Rating"] = j?.appraisal?.appraiser_rating
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = j?.appraiser_name
        if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = j?.reviewer_name
        if (columnHeaders["Normalizername"] == true) exportData["Normalizer Name"] = j?.normalizer_name
        if (columnHeaders["Potentiallevel"] == true) exportData["Potential Level"] = j?.appraisal?.potential
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = j?.previous_rating
        if (columnHeaders["division"] == true) exportData["division"] = j?.division
        if (columnHeaders["Section"] == true) exportData["Section"] = j?.section
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = j?.sub_section
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = j?.manager_code
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = j?.manager_name
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = j?.manager_position
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = j?.work_location
        if (columnHeaders["overallRating"] == true) exportData["Overall Rating"] = j?.normalizer.normalizer_rating
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = j?.talent_category
        return exportData
      });
      const a = [1]
      const Emptymapped = a.map((j: any) => {
        let exportData: any = {}
        if (columnHeaders["Ecode"] == true) exportData["Ecode"] = ""
        if (columnHeaders["Ename"] == true) exportData["EmployeeName"] = ""
        if (columnHeaders["Eposition"] == true) exportData["Position"] = ""
        if (columnHeaders["EGrade"] == true) exportData["Grade"] = ""
        if (columnHeaders["AppraiserName"] == true) exportData["Appraiser Name"] = ""
        if (columnHeaders["Reviewername"] == true) exportData["Reviewer Name"] = ""
        if (columnHeaders["Normalizername"] == true) exportData["Normalizer Name"] = ""
        if (columnHeaders["Potentiallevel"] == true) exportData["Potential Level"] = ""
        if (columnHeaders["PreviousRating"] == true) exportData["Previous Period Rating"] = ""
        if (columnHeaders["division"] == true) exportData["Division"] = ""
        if (columnHeaders["Section"] == true) exportData["Section"] = ""
        if (columnHeaders["SubSection"] == true) exportData["Sub-section"] = ""
        if (columnHeaders["ManagerCode"] == true) exportData["Manager Code"] = ""
        if (columnHeaders["ManagerName"] == true) exportData["Manager Name"] = ""
        if (columnHeaders["ManagerPosition"] == true) exportData["Manager Position"] = ""
        if (columnHeaders["WorkLocation"] == true) exportData["Work Location"] = ""
        if (columnHeaders["overallRating"] == true) exportData["Overall Rating"] = ""
        if (columnHeaders["TalentCategory"] == true) exportData["Talent Category"] = ""
        return exportData
      });
      console.log(mapped, "mapped")
      var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(mapped == null  ? Emptymapped :mapped);

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "MyExcel.xlsx");
    }
  };
  //console.log(indexBasedValue,"indexBasedValue")

  //Functions for apply and cancel buttons
  const handleExportFunction = () => {
    setisDrawerOpen(true);
    //FiiteredExport1();

  };
  const handleheadingSortAccept = () => {

    // let temp = { ...columnHeaders }
    // setcolumnHeadersDisplay(temp);
    setisDrawerOpen(false);
    handleExport();
  };
  const handleCloseGrade = () => {

    setisDrawerOpen(false);

  };
  console.log(indexBasedValue,"indexBasedValue")
  //For the new employee table of ninebox
  const handleNavigationForNineBoxEmployee = (name: any) => {
    navigate("/filteredTableofReviewerExpNineBox", { state: { indexBasedValue:indexBasedValue } })
  }
  return (
    <>
    <div
        style={{
          background: "#f1f1f1",
          minHeight: "100px",
          overflow: "hidden",
           height: "auto",
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
          <Link
            style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
            color="inherit"
            to={"/reviewer"}
            state={{
              from: "toMyTeamDashboard",
             }}
          >
            My Team Dashboard
          </Link>
          <Typography
            style={{
              fontSize: "18px",
              color: "#333333",
              fontFamily: "Arial",
            }}
            color="text.primary"
          >
            9-Box Grid
          </Typography>
        </Breadcrumbs>
      </Stack>
      
        {/* <Stack direction="row" alignItems="center" minHeight="50px" marginLeft="15px">
        <IconButton
        onClick={() => {
          navigate(-1)
        }}
        >
          <img src={Leftarrow} alt="button" />
        </IconButton>
        <Typography
        sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
        >9-Box Grid</Typography>
        </Stack> */}
        {/* <div >
          <Timelinerevview />
        </div> */}
        <div >
          <Box
            style={{
              marginLeft: "25px",
              marginRight: "25px",
              background: "#ffffff",
              padding: "20px",
              height: "auto",
              marginBottom:"25px",
              paddingBottom:"50px"

            }}
          >
            <Grid container spacing={2}>
              <Grid sx={{ paddingRight: "16px" }} item xs={12} md={12} lg={8}>
                {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              paddingBottom="20px"
            >
              <Typography
                sx={{ fontSize: "20px", fontFamily: "Arial", color: "#3e8cb5" }}
              >
                9-Box Grid
              </Typography>
              <div>
                <img src={Newexcel} style={{ paddingRight: "15px" }} />

                <img src={Expand} />
              </div>
            </Stack> */}
                {/* <img
                  src={Newexcel}
                  // style={{float:"right"}}
                  alt="icon"
                  style={{ marginLeft: "80%", marginTop: "5px", float: "right", cursor: "pointer" }}
                  onClick={handleExportFunction}
                /> */}
                <ExpandNineBox nineboxValues={NineBoxValues} BaseStateValue={location.state} setindexValue={setindexValue} />
              </Grid>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => {
                  setisDrawerOpen(false);
                }}
              >
                <Box sx={{ paddingLeft: "10px" }}>
                  <Typography
                    style={{
                      fontSize: "16px",
                      color: "#333333",
                      fontFamily: "Arial",
                    }}
                    variant="subtitle1"
                    align="center"
                  >
                    Choose Fields
                  </Typography>
                  <Stack direction="column" width="250px">
                    <Scroll>
                      <CustomScrollbar
                        style={{
                          height: "calc(100vh - 100px)",
                          // "& .ScrollbarsCustom-Track": {
                          //     width:"5px"
                          //   },
                        }}>
                        <div>
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
                                <Checkbox checked={headingecode} name="Ecode" onChange={handleheadingEcode} />
                              }
                              label="Ecode"
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
                                <Checkbox
                                  checked={columnHeaders.Ename}
                                  name="Ename"
                                  onChange={handleheading1} />
                              }
                              label="Employee Name"
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
                                <Checkbox
                                  checked={columnHeaders.Eposition}
                                  name="Eposition"
                                  onChange={handleheading2} />
                              }
                              label="Position"
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
                                <Checkbox
                                  checked={columnHeaders.EGrade}
                                  name="EGrade"
                                  onChange={handleheading3}
                                />
                              }
                              label="Grade"
                            />

                            {/* <FormControlLabel
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              },
                            }}
                            control={
                              <Checkbox 
                              checked={columnHeaders.Rating} 
                              name="Rating" 
                              onChange={handleheading4} />
                            }
                            label="Rating"
                          /> */}
                            <FormControlLabel
                              sx={{
                                "& .MuiFormControlLabel-label": {
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                },
                              }}
                              control={
                                <Checkbox
                                  checked={headingAppraiser}
                                  name="AppraiserName"
                                  onChange={handleheadingAppraiser}
                                />
                              }
                              label="Appraiser Name"
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
                                <Checkbox
                                  checked={headingReviewer}
                                  name="Reviewername"
                                  onChange={handleheadingReviewer}
                                />
                              }
                              label="Reviewer Name"
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
                                <Checkbox
                                  checked={headingNormalizer}
                                  name="Normalizername"
                                  onChange={handleheadingNormalizer}
                                />
                              }
                              label="HR Normalizer Name"
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
                                <Checkbox
                                  checked={headingPrevious}
                                  name="PreviousRating"
                                  onChange={handleheadingPrevious}
                                />
                              }
                              label="Previous Period Rating"
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
                                <Checkbox
                                  checked={headingPotential}
                                  name="Potentiallevel"
                                  onChange={handleheadingPotential}
                                />
                              }
                              label="Potential Level"
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
                                <Checkbox name="division" checked={divisionVal} onChange={handledivisionVal} />
                              }
                              label="Division"
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
                                <Checkbox name="Section" checked={sectionVal} onChange={handlesectionVal} />
                              }
                              label="Section"
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
                                <Checkbox
                                  checked={heading10}
                                  name="SubSection"
                                  onChange={handleheading10}
                                />
                              }
                              label="Sub-section"
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
                                <Checkbox
                                  checked={heading11}
                                  name="ManagerCode"
                                  onChange={handleheading11}
                                />
                              }
                              label="Manager Code"
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
                                <Checkbox
                                  checked={heading12}
                                  name="ManagerName"
                                  onChange={handleheading12}
                                />
                              }
                              label="Manager Name"
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
                                <Checkbox
                                  checked={heading13}
                                  name="ManagerPosition"
                                  onChange={handleheading13}
                                />
                              }
                              label="Manager Position"
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
                                <Checkbox
                                  checked={heading14}
                                  name="WorkLocation"
                                  onChange={handleheading14}
                                />
                              }
                              label="Work Location"
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
                                <Checkbox
                                  checked={overall}
                                  name="overallRating"
                                  onChange={handleoverAll}
                                />
                              }
                              label="Overall Rating"
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
                                <Checkbox
                                  checked={talentcategory}
                                  name="TalentCategory"
                                  onChange={handletalentcategory}
                                />
                              }
                              label=" Talent Category"
                            />
                          </FormGroup>
                        </div>
                      </CustomScrollbar>
                    </Scroll>
                    <Stack
                      direction="row"
                      spacing={2}
                      paddingBottom="10px"
                      paddingTop="20px"
                      justifyContent="center"
                    >
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
                        onClick={() => {
                          handleheadingSortAccept();
                        }}
                      >
                        Apply
                      </Button>
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
                        onClick={() => {
                          handleCloseGrade();
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Drawer>
              {/* <Grid
                sx={{
                  borderRight: "1px solid gainsboro",
                  // marginTop: "44px",
                  marginBottom: "25px",
                }}
                item
                xs={0.5}
              >
                <div></div>
              </Grid> */}
              <Grid
                sx={{
                  borderLeft: "1px solid #EEEEEE",
                  '@media (max-width: 1024px)': {
                    borderLeft: "none",
                    marginTop:"20px"
                  }
                }}
                item md={12} xs={12} lg={4}>
                {/* <div style={{ display:"flex" ,justifyContent:"flex-end" }} > <img style={{ cursor: "pointer" }} src={Expand} onClick={handleNavigationForNineBoxEmployee} /> */}
                {/* </div> */}
                <SolidTalents
                  setindexBasedValue={setindexBasedValue}
                  indexBasedValue={indexBasedValue}
                  BaseStateValue={location.state}
                  indexValue={indexValue}
                  setindexBasedTitle={setindexBasedTitle}
                  indexBasedTitle={indexBasedTitle}
                  handleNavigationForNineBoxEmployee={handleNavigationForNineBoxEmployee}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}

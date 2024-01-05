import React from 'react'
import { useState, useEffect, useMemo, useRef } from 'react';

import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import AppraiserDashboardContext from '../../../components/reviewer/Dashboard/AppraiserDashboardContext';
import Timelinerevview from '../../../components/reviewer/Dashboard/Timelinerevview';
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import {
    useGetlineManagerEmployeeQuery,
    useGetlineManagerPlusOneEmployeeQuery
} from "../../../service";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import Potentialtalents from "../../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../../assets/Images/Solidtalents.svg";
import Star from "../../../assets/Images/Star.svg";
import Inconsistent from "../../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../../assets/Images/Solidperformer.svg";
import Highperformers from "../../../assets/Images/Highperformers.svg";
import CalendarFilters from '../../../components/homepage/MyTeamDashboardComponents/calnderfilter';
import LineManagersTeamTable from '../../../components/homepage/OverallDashboardComponents/MyTeamTable/LineManagersTeamTable';
import PerformanceRatingandEmpRejectionofOverallDashboard from '../../../components/homepage/OverallDashboardComponents/PerformanceRatingandEmpRejectionofOverallDashboard';
import NineboxandTopPerformanceofOverallDashboard from '../../../components/homepage/PreviousDashboardComponents/NineboxandTopPerformanceofOverallDashboard';
import { useDashboardContext } from "../../../components/reviewer/Dashboard/AppraiserDashboardContext";
import FilteredtablemainofOverallDashboard from '../../../components/homepage/OverallDashboardComponents/GlobeChart/GlobeChartforNormalizerOverallDashboard';
import TopPerformersExpandofAppOverallDashboard from '../../../components/homepage/OverallDashboardComponents/Topperformers/TopPerformersExpandofAppOverallDashboard';
import OverallDashboardExpandViewofTable from '../../../components/homepage/OverallDashboardComponents/MyTeamTable/OverallDashboardExpandViewofTable';
import ExpandNineBoxandSolidtalentsofOverallDashboard from '../../../components/homepage/OverallDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsofOverallDashboard';
import FilteredTableofExpNineboxOD from '../../../components/homepage/OverallDashboardComponents/NineBox/FilteredTableofExpNineboxOD';
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const OverallDashboardForAppraiser = (props: any) => {
    const {
        valueofTab,
        setTabsActive
    } = props;
    const { data: user } = useLoggedInUser();
    const myRef = useRef(null);
    //console.log(user, "idss")
    const navigate = useNavigate();

    //Query for lineManager Employee 
    const { data: lineManagerEmployee } = useGetlineManagerEmployeeQuery(user?.employee_code);
    const { data: lineManagerPlusOneEmployee } = useGetlineManagerPlusOneEmployeeQuery(user?.employee_code);
console.log(lineManagerPlusOneEmployee,"lineManagerPlusOneEmployee")    
//console.log(lineManagerEmployee, "lineManager", lineManagerPlusOneEmployee)
    //Query for lineManager Employee
    const [lineManagerEmployeeData, setlineManagerEmployeeData] = React.useState<any>([]);
    const [lineManagerPlusOneEmployeeData, setlineManagerPlusOneEmployeeData] = React.useState<any>([]);
    const [DRandDRplus1, setDRandDRplus1] = React.useState<any>([]);
    //setting DR data
    useEffect(() => {
        setlineManagerEmployeeData(lineManagerPlusOneEmployee?.lineManager)
        setlineManagerPlusOneEmployeeData(lineManagerPlusOneEmployee?.lineManagerPlusOne)
        if (lineManagerEmployeeData?.length > 0) {
            let firstArray = lineManagerEmployeeData;
            let secondArray = lineManagerPlusOneEmployeeData;
            let combinedArray = [...firstArray, ...secondArray];
            setDRandDRplus1(combinedArray)
            //console.log(combinedArray,"lineManagerConcated")
        }
    }, [lineManagerPlusOneEmployee])
    console.log(lineManagerEmployeeData, "lineManager", lineManagerPlusOneEmployeeData, "Total", DRandDRplus1)
    //setting DR data
    //@ts-ignore
    const { FilteredEmployeeData, setFilteredEmployeeData, statusofUnknown } = useDashboardContext();
    console.log(FilteredEmployeeData, statusofUnknown, "FilteredEmployeeData")
    //DashboardContext
    //For Identifiction
    let navigationFrom = "Appraiser";
    //For Identifiction

    const { data: RangeValue } = useGetNineboxQuery("");
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

    //For changing my actions's tab
    const [valueOfCard, setvalueOfCard] = React.useState<any>("");
    // console.log(valueOfCard, "ooooooooo")
    //For changing my actions's tab

    //States for mulitiselect
    const [SectionFilter, setSectionFilter] = React.useState<string[]>([]);
    const [subSectionFilter, setSubSectionFilter] = React.useState<string[]>([]);
    const [talentCategoreyFilter, settalentCategoreyFilter] = React.useState<string[]>([]);
    const [talentCategoreyData, settalentCategoreyData] = React.useState<any>([]);
    console.log(talentCategoreyData, "talentCategoreyData")
    console.log(talentCategoreyFilter, "talentCategoreyData")

    //States for active components
    const [RatingsExpandActive, setRatingsExpandActive] = React.useState<any>(false);
    const [NineboxExpand, setNineboxExpand] = React.useState<any>(false);
    const [TopperformersExpandActive, setTopperformersExpandActive] = React.useState<any>(false);
    const [selectedRatingRange, setselectedRatingRange] = React.useState<any>("");
    const [TeamtableExpandActive, setTeamtableExpandActive] = React.useState<any>(false);
    const [solidperformersExpandActive, setSolidperformersExpandActive] = React.useState<any>(false);
    //states for ninebox
    // const [nineBoxTitleforExpand, setnineBoxTitleforExpand] = React.useState<any>("");
    // const [nineBoxValuesforExpand, setnineBoxValuesforExpand] = React.useState<any>("");
    const [indexValue, setindexValue] = React.useState<any>('');
  const [indexBasedValue, setindexBasedValue] = React.useState<any>([]);
  const [indexBasedTitle, setindexBasedTitle] = React.useState<any>('');
  console.log(indexBasedValue,indexBasedTitle,"ibasedValues")
    //States for ninebox data
    const [low3Value, setLow3Value] = React.useState<any>([]);
    const [low4Value, setLow4Value] = React.useState<any>([]);
    const [low5Value, setLow5Value] = React.useState<any>([]);
    const [moderate3Value, setmoderate3Value] = React.useState<any>([]);
    const [moderate4Value, setmoderate4Value] = React.useState<any>([]);
    const [moderate5Value, setmoderate5Value] = React.useState<any>([]);
    const [high3Value, sethigh3Value] = React.useState<any>([]);
    const [high4Value, sethigh4Value] = React.useState<any>([]);
    const [high5Value, sethigh5Value] = React.useState<any>([]);
    console.log(low3Value,low4Value,low5Value,
        moderate4Value,moderate4Value,moderate4Value,
        high3Value,high4Value,high5Value, "NineboxtalentCategoreyData")

    //Nine box filtered data 
    //pass data as params
    const Low3 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeLowFrom && i?.normalizer.normalizer_rating <= RangeLowTo &&
                i?.appraisal?.potential == 'Low'
        });
        setLow3Value(temp)
        return temp;
    };
    //console.log(Low3, "NineboxtalentCategoreyData")
    const moderate3 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeLowFrom && i?.normalizer.normalizer_rating <= RangeLowTo &&
                i?.appraisal?.potential == 'Moderate'
        });
        setmoderate3Value(temp)
        return temp;
    };
    //console.log(moderate3, "NineboxtalentCategoreyData")
    const high3 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
            i?.normalizer.normalizer_rating >= RangeLowFrom && i?.normalizer.normalizer_rating <= RangeLowTo &&
            i?.appraisal?.potential == 'High'
        });
        sethigh3Value(temp)
        return temp;
    };
    const Low4 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeMediumFrom && i?.normalizer.normalizer_rating <= RangeMediumTo &&
                i?.appraisal?.potential == 'Low'
        });
        setLow4Value(temp)
        return temp;
    };
     ///console.log(Low4, "NineboxtalentCategoreyData")
    const moderate4 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeMediumFrom && i?.normalizer.normalizer_rating <= RangeMediumTo &&
                i?.appraisal?.potential == 'Moderate'
        });
        setmoderate4Value(temp)
        return temp;
    };
    //console.log(moderate4, "NineboxtalentCategoreyData")
    const high4 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeMediumFrom && i?.normalizer.normalizer_rating <= RangeMediumTo &&
                i?.appraisal?.potential == 'High'
        });
        sethigh4Value(temp)
        return temp;
    };
    //console.log(high4, "NineboxtalentCategoreyData")
    const Low5 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeHighFrom && i?.normalizer.normalizer_rating <= RangeHighTo &&
                i?.appraisal?.potential == 'Low'
        });
        setLow5Value(temp)
        return temp;
    };
    //console.log(Low5, "NineboxtalentCategoreyData")
    const moderate5 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeHighFrom && i?.normalizer.normalizer_rating <= RangeHighTo &&
                i?.appraisal?.potential == 'Moderate'
        });
        setmoderate5Value(temp)
        return temp;
    };
    //console.log(moderate5, "NineboxtalentCategoreyData")
    const high5 = (data: any) => {
        let temp = data?.filter((i: any) => {
            return i?.appraisal?.status == "completed" &&
                i?.normalizer.normalizer_rating >= RangeHighFrom && i?.normalizer.normalizer_rating <= RangeHighTo &&
                i?.appraisal?.potential == 'High'
        });
        sethigh5Value(temp)
        return temp;
    };
    //console.log(high5, "NineboxtalentCategoreyData")
    //Nine box filter Function

    //Main data use effect
    // useEffect(() => {
    //     //@ts-ignore

    //     if (
    //      //@ts-ignore
    //      (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
    //      //@ts-ignore
    //      (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0)
    //      //&& (talentCategoreyFilter === "")
    //    ) {
    //     //check the talent category condition1 and the again condition 2 and both
    //     //concat two data
    //      settalentCategoreyData(lineManagerEmployee?.getEmployee)


    //      //@ts-ignore
    //    }else{
    //      const Temp = lineManagerEmployee?.getEmployee?.filter((item1: any) => {
    //        if (SectionFilter.length === 0) {
    //          return item1
    //        } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
    //      }).filter((item1: any) => {
    //        if (subSectionFilter.length === 0) {
    //          return item1
    //        } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
    //      });
    //      settalentCategoreyData(Temp)
    //    }

    // // if(talentCategoreyFilter){
    // //   settalentCategoreyData(lineManagerEmployee?.getEmployee)
    // // }else if(talentCategoreyFilter){
    // //   settalentCategoreyData()
    // // }
    //  }, [ SectionFilter,subSectionFilter,lineManagerEmployee])
    // useEffect(() => {
    //     settalentCategoreyData(lineManagerEmployeeData)
    // }, [lineManagerPlusOneEmployee])

    //chat gpt
    // const processedData = useMemo(() => {
    //     // Perform some expensive calculation here
    //      settalentCategoreyData(lineManagerEmployee?.getEmployee)
    //   }, [lineManagerPlusOneEmployee]);
  
console.log(SectionFilter?.length,subSectionFilter?.length,talentCategoreyFilter?.length,"filtervaluesss")
    const processedData = useMemo(() => {
        let firstArray = lineManagerEmployeeData;
        let secondArray = lineManagerPlusOneEmployeeData;
        let combinedArray = firstArray?.concat(secondArray);
        setDRandDRplus1(combinedArray)
        //@ts-ignore
        // if(SectionFilter.length === 0 && talentCategoreyFilter.length === 0 && subSectionFilter.length === 0){
        //     settalentCategoreyData(combinedArray)
        //     Low3(combinedArray)
        //     moderate3(combinedArray)
        //     high3(combinedArray)
        //     Low4(combinedArray)
        //     moderate4(combinedArray)
        //     high4(combinedArray)
        //     Low5(combinedArray)
        //     moderate5(combinedArray)
        //     high5(combinedArray)
        // }
        if (
            //@ts-ignore
            (SectionFilter === "" || SectionFilter.includes("None") || SectionFilter.length === 0) &&
            //@ts-ignore
            (subSectionFilter === "" || subSectionFilter.includes("None") || subSectionFilter.length === 0)
        ) {
            console.log("level-1")
            //settalentCategoreyData(lineManagerEmployee?.getEmployee)
            //settalentCategoreyData(lineManagerEmployeeData)
            //@ts-ignore
            if (talentCategoreyFilter === "" || talentCategoreyFilter.length === 0 || talentCategoreyFilter.length === 2) {
                settalentCategoreyData(combinedArray)
                Low3(combinedArray)
                moderate3(combinedArray)
                high3(combinedArray)
                Low4(combinedArray)
                moderate4(combinedArray)
                high4(combinedArray)
                Low5(combinedArray)
                moderate5(combinedArray)
                high5(combinedArray)
                console.log("level-1.1")
                console.log(
                    Low3(combinedArray),
                    moderate3(combinedArray),
                    high3(combinedArray),
                    Low4(combinedArray),
                    moderate4(combinedArray),
                    high4(combinedArray),
                    Low5(combinedArray),
                    moderate5(combinedArray),
                    high5(combinedArray)
                    ,"NineboxtalentCategoreyData"
                )
                //@ts-ignore               
            } else if (talentCategoreyFilter.includes("Level 1")) {
                settalentCategoreyData(lineManagerEmployeeData)
                Low3(lineManagerEmployeeData)
                moderate3(lineManagerEmployeeData)
                high3(lineManagerEmployeeData)
                Low4(lineManagerEmployeeData)
                moderate4(lineManagerEmployeeData)
                high4(lineManagerEmployeeData)
                Low5(lineManagerEmployeeData)
                moderate5(lineManagerEmployeeData)
                high5(lineManagerEmployeeData)
                console.log("level-1.2")
                console.log(
                    Low3(lineManagerEmployeeData),
                    moderate3(lineManagerEmployeeData),
                    high3(lineManagerEmployeeData),
                    Low4(lineManagerEmployeeData),
                    moderate4(lineManagerEmployeeData),
                    high4(lineManagerEmployeeData),
                    Low5(lineManagerEmployeeData),
                    moderate5(lineManagerEmployeeData),
                    high5(lineManagerEmployeeData)
                    ,"NineboxtalentCategoreyData"
                )
                //@ts-ignore
            } else if (talentCategoreyFilter.includes("Level 2")) {
                settalentCategoreyData(lineManagerPlusOneEmployeeData)
                Low3(lineManagerPlusOneEmployeeData)
                moderate3(lineManagerPlusOneEmployeeData)
                high3(lineManagerPlusOneEmployeeData)
                Low4(lineManagerPlusOneEmployeeData)
                moderate4(lineManagerPlusOneEmployeeData)
                high4(lineManagerPlusOneEmployeeData)
                Low5(lineManagerPlusOneEmployeeData)
                moderate5(lineManagerPlusOneEmployeeData)
                high5(lineManagerPlusOneEmployeeData)
                console.log("level-1.3")
                console.log(
                    Low3(lineManagerPlusOneEmployeeData),
                    moderate3(lineManagerPlusOneEmployeeData),
                    high3(lineManagerPlusOneEmployeeData),
                    Low4(lineManagerPlusOneEmployeeData),
                    moderate4(lineManagerPlusOneEmployeeData),
                    high4(lineManagerPlusOneEmployeeData),
                    Low5(lineManagerPlusOneEmployeeData),
                    moderate5(lineManagerPlusOneEmployeeData),
                    high5(lineManagerPlusOneEmployeeData)
                    ,"NineboxtalentCategoreyData"
                )
            }
            //@ts-ignore
        } else {
            console.log("level-2")
            // const Temp = lineManagerEmployeeData?.filter((item1: any) => {
            //     if (SectionFilter.length === 0) {
            //         return item1
            //     } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
            // }).filter((item1: any) => {
            //     if (subSectionFilter.length === 0) {
            //         return item1
            //     } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
            // });
            // settalentCategoreyData(Temp)
            //@ts-ignore
            if (talentCategoreyFilter === "" || talentCategoreyFilter.length === 0 || talentCategoreyFilter.length === 2) {
                //settalentCategoreyData(DRandDRplus1)
                console.log("level-2.1")
                const Temp = combinedArray?.filter((item1: any) => {
                    if (SectionFilter.length === 0) {
                        return item1
                    } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
                }).filter((item1: any) => {
                    if (subSectionFilter.length === 0) {
                        return item1
                    } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
                });
                settalentCategoreyData(Temp)
                Low3(Temp)
                moderate3(Temp)
                high3(Temp)
                Low4(Temp)
                moderate4(Temp)
                high4(Temp)
                Low5(Temp)
                moderate5(Temp)
                high5(Temp)
                console.log(
                    Low3(Temp),
                    moderate3(Temp),
                    high3(Temp),
                    Low4(Temp),
                    moderate4(Temp),
                    high4(Temp),
                    Low5(Temp),
                    moderate5(Temp),
                    high5(Temp)
                    ,"NineboxtalentCategoreyData"
                )
                //@ts-ignore               
            } else if (talentCategoreyFilter.length === "Level 1") {
                //settalentCategoreyData(lineManagerEmployeeData)
                console.log("level-2.2")
                const Temp = lineManagerEmployeeData?.filter((item1: any) => {
                    if (SectionFilter.length === 0) {
                        return item1
                    } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
                }).filter((item1: any) => {
                    if (subSectionFilter.length === 0) {
                        return item1
                    } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
                });
                settalentCategoreyData(Temp)
                Low3(Temp)
                moderate3(Temp)
                high3(Temp)
                Low4(Temp)
                moderate4(Temp)
                high4(Temp)
                Low5(Temp)
                moderate5(Temp)
                high5(Temp)
                console.log(
                    Low3(Temp),
                    moderate3(Temp),
                    high3(Temp),
                    Low4(Temp),
                    moderate4(Temp),
                    high4(Temp),
                    Low5(Temp),
                    moderate5(Temp),
                    high5(Temp)
                    ,"NineboxtalentCategoreyData"
                )
                //@ts-ignore
            } else if (talentCategoreyFilter.length === "Level 2") {
                //settalentCategoreyData(lineManagerPlusOneEmployeeData)
                console.log("level-2.3")
                const Temp = lineManagerPlusOneEmployeeData?.filter((item1: any) => {
                    if (SectionFilter.length === 0) {
                        return item1
                    } else { return !!SectionFilter?.find(item2 => item1.section === item2) }
                }).filter((item1: any) => {
                    if (subSectionFilter.length === 0) {
                        return item1
                    } else { return !!subSectionFilter?.find(item2 => item1.sub_section === item2) }
                });
                settalentCategoreyData(Temp)
                Low3(Temp)
                moderate3(Temp)
                high3(Temp)
                Low4(Temp)
                moderate4(Temp)
                high4(Temp)
                Low5(Temp)
                moderate5(Temp)
                high5(Temp)
                console.log(
                    Low3(Temp),
                    moderate3(Temp),
                    high3(Temp),
                    Low4(Temp),
                    moderate4(Temp),
                    high4(Temp),
                    Low5(Temp),
                    moderate5(Temp),
                    high5(Temp)
                    ,"NineboxtalentCategoreyData"
                )
            }

        }
    }, [SectionFilter, subSectionFilter, talentCategoreyFilter,lineManagerEmployeeData, lineManagerPlusOneEmployee])
    //Hiding Main data use effect
    const dataforContext = useMemo(() => {
        if(RatingsExpandActive === false && TopperformersExpandActive === false 
            && TeamtableExpandActive === false && NineboxExpand === false && solidperformersExpandActive === false
            ){
            setTabsActive(false)
        }else{
            setTabsActive(true)
        }
       
    }, [RatingsExpandActive,TopperformersExpandActive,TeamtableExpandActive,NineboxExpand,solidperformersExpandActive])
//

    //Data for expand pages
    // useEffect(() => {
    //     setFilteredEmployeeData(talentCategoreyData)
    // }, [talentCategoreyData])
    //Data for expand pages

    //Data for Ninebox
    const NineBoxValues = [
        {
            title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
            count: high3Value?.length,
            category:high3Value,
            color: "linear-gradient(to left, #F89994, #F7665E)",
            icon: <img src={Potentialtalents} alt="image" />,

        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[1]?.definition,
            count: high4Value?.length,
             category:high4Value,
            color: "linear-gradient(to left, #71E1F6, #28B7D3)",
            icon: <img src={Solidtalents} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[2]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[2]?.definition,
            count: high5Value?.length,
             category:high5Value,
            color: "linear-gradient(to left, #71E1F6, #28B7D3)",
            icon: <img src={Star} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[3]?.definition,
            count: moderate3Value?.length,
            category:moderate3Value,
            color: "linear-gradient(to left, #F89994, #F7665E)",
            icon: <img src={Inconsistent} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[4]?.definition,
            count: moderate4Value?.length,
            category:moderate4Value,
            color: "linear-gradient(to left, #33CDB4, #079B82)",
            icon: <img src={Solidperformers} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[5]?.definition,
            count: moderate5Value?.length,
            category:moderate5Value,
            color: "linear-gradient(to left, #71E1F6, #28B7D3)",
            icon: <img src={HighPerformerstop} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[6]?.definition,
            count: low3Value?.length,
            category:low3Value,
            color: "linear-gradient(to left, #F89994, #F7665E)",
            icon: <img src={Lowperformers} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[7]?.definition,
            count: low4Value?.length,
            category:low4Value,
            color: "linear-gradient(to left, #33CDB4, #079B82)",
            icon: <img src={Solidperformer} alt="image" />,
        },
        {
            title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
            defenition: RangeValue?.data[0]?.box_9_definitions[8]?.definition,
            count: low5Value?.length,
            category:low5Value,
            color: "linear-gradient(to left, #33CDB4, #079B82)",
            icon: <img src={Highperformers} alt="image" />,
        },
    ];
    console.log(NineBoxValues, "NineBoxValuesofOD")
    //Data for Ninebox

    //Ninebox excel data
    //    let ExcelData: string | any[] = []
    //   if (moderate_3?.count > 0) {
    //     let data = moderate3Value?.map((j: any) => {
    //       return {
    //         Name: j?.legal_full_name,
    //         Grade: j?.grade,
    //       }
    //     })


    //   }
      const ExcelData9Box: any[] = [
        low3Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        low4Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        low5Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        moderate3Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        moderate4Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        moderate5Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        high3Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        high4Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
        high5Value?.map((j: any) => {
          return {
            Ecode:j?.employee_code,
            EName: j?.legal_full_name,
            Position: j?.position_long_description,
            Grade: j?.grade,
            Division: j?.division,
            Section: j?.section,
            SubSection: j["sub section"],
            Overallrating: j?.appraisal?.appraiser_rating,
            PotentialLevel: j?.appraisal.potential,
          }
        }),
      ].flat()
    //console.log(ExcelData9Box, "ExcelData9Box")
    //console.log(ExcelData, "ExcelData")
    //Ninebox excel data

    //Overall dashboard
    //For changing my actions's tab
    const [valueOfCardMyteam, setvalueOfCardMyteam] = React.useState<any>("");
    const handleOnClickCardMyteam = (e: any, title: any) => {
        setvalueOfCardMyteam(title)
          //@ts-ignore
          myRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    //For changing my actions's tab


    //functions for emp rej pie chart

    const checkAppraisalStatusInProgressMyteam = (status: string) => {
        return talentCategoreyData?.filter((item: any) => {
            return item?.employee?.employee_agree == true && item?.appraisal?.status === status;
        }).length;
    };
    const checkAppraisalStatusCompletedMyteam = (status: string) => {
        return talentCategoreyData?.filter((item: any) => {
            return item?.appraisal?.status === status &&
                (
                    // item?.employee?.employee_status === 'employee-rejected'
                    // || 
                    item?.employee?.employee_rejection === true);
        })?.length;
    };
    const checkAppraisalinmediationStatusMyteam = (status: string) => {
        return talentCategoreyData?.filter((item: any) => {
            // return item?.appraisal?.status === status;
        return  item?.employee?.employee_agree == false && item?.appraisal?.status === status;
        })?.length;
    };

    //functions for emp rej pie chart
    //function for doughnut chart
    const [range1Myteam, setrange1Myteam] = React.useState<any>(0);
    const [range2Myteam, setrange2Myteam] = React.useState<any>(0);
    const [range3Myteam, setrange3Myteam] = React.useState<any>(0);
    const [range4Myteam, setrange4Myteam] = React.useState<any>(0);
    const checklengthinRangeMyteam = (min: number, max: number) => {
        return (
            (talentCategoreyData?.filter((item: any) => {
                // console.log(item?.appraisal?.appraiser_rating, "appraisal_rating3");
                return (
                    item?.normalizer?.normalizer_rating >= min &&
                    item?.normalizer?.normalizer_rating <= max
                    && item?.appraisal?.status == "completed"
                );
            })?.length)
            // *
            //   100) /
            // data1?.data?.length
        );
    };
    useEffect(() => {
        setrange1Myteam(Math.round(checklengthinRangeMyteam(1, 2.49)))
        setrange2Myteam(Math.round(checklengthinRangeMyteam(2.5, 2.99)))
        setrange3Myteam(Math.round(checklengthinRangeMyteam(3, 3.99)))
        setrange4Myteam(Math.round(checklengthinRangeMyteam(4, 5)))

    }, [talentCategoreyData])
    //function for doughnut chart

    //function for status cards
    const checkAppraisalStatusforCardsMyteam = (status: string) => {
        // console.log(employeeData?.data?.filter((item: any) => {

        //   return item?.appraisal?.status === status;
        // })?.length, "countfuncton")
        if (talentCategoreyData)
            return talentCategoreyData?.filter((item: any) => {
                return item?.appraisal?.status === status;
            })?.length;
        else return 0;
    };

    const calculatePercentageforCardsMyteam = (num: number) => {
        if (talentCategoreyData && talentCategoreyData?.length != 0)
            return (num * 100) / talentCategoreyData?.length;
        else {
            return 0
        }
    };
    let CompletedEmpMyteam = checkAppraisalStatusforCardsMyteam("completed");
    let TotalEmpMyteam = checkAppraisalStatusforCardsMyteam("not-started") + checkAppraisalStatusforCardsMyteam("in-progress") +
        checkAppraisalStatusforCardsMyteam("normalized") + checkAppraisalStatusforCardsMyteam("rejected") + checkAppraisalStatusforCardsMyteam("completed")
    // console.log(TotalEmp,CompletedEmp,"TotalEmp");  
    const StatusValuesMyteam = [
        {
            title: "Not-Started",
            percentage: calculatePercentageforCardsMyteam(
                checkAppraisalStatusforCardsMyteam("not-started")
            ).toFixed(2),
            count: checkAppraisalStatusforCardsMyteam("not-started"),

            color: "linear-gradient(79deg, rgba(255,55,55,1) 39%, rgba(255,96,96,0.9136029411764706) 96%)"
        },
        {
            title: "In Progress",
            percentage: calculatePercentageforCardsMyteam(
                checkAppraisalStatusforCardsMyteam("in-progress")+checkAppraisalStatusforCardsMyteam("normalized")
            ).toFixed(2),
            count: checkAppraisalStatusforCardsMyteam("in-progress")+checkAppraisalStatusforCardsMyteam("normalized"),
            // color:"linear-gradient(90deg, rgba(246,191,113,0.958420868347339) 27%, rgba(246,191,113,1) 100%, rgba(255,255,255,1) 100%)"
            color: "linear-gradient(to left, #F9C5A1, #F99B5B)"
          },
          // {
          //   title: "Normalized",
          //   percentage: calculatePercentageforCards(
          //     checkAppraisalStatusforCards("normalized")
          //   ).toFixed(2),
          //   count: checkAppraisalStatusforCards("normalized"),
          //   // color:"linear-gradient(0deg, rgba(37,173,200,1) 98%, rgba(126,221,240,0.9948354341736695) 100%, rgba(251,254,255,1) 100%)"
          //   color: "linear-gradient(to left, #3BD7F6, #26B4D0)"
          // },
        {
            title: "Rejected",
            percentage: calculatePercentageforCardsMyteam(
                checkAppraisalStatusforCardsMyteam("rejected")
            ).toFixed(2),
            count: checkAppraisalStatusforCardsMyteam("rejected"),

            color: "linear-gradient(to left, #BECFD9, #89949A)"
        },
        {
            title: "Completed",
            percentage: calculatePercentageforCardsMyteam(
                checkAppraisalStatusforCardsMyteam("completed")
            ).toFixed(2),
            count: checkAppraisalStatusforCardsMyteam("completed"),

            color: "linear-gradient(to left, #35CFB6, #079B82)"
        },
    ];

    //function for status cards

    const TopPerformersOfAppraiserMyteam = talentCategoreyData?.slice()?.filter((f: any) => f?.appraisal?.appraiser_rating >= 4 && f?.appraisal?.status == "completed")
        ?.sort((a: any, b: any) => b?.appraisal?.appraiser_rating - a?.appraisal?.appraiser_rating)?.slice(0, 5)

    //For OverAll dashboard
    return (
        <>
            <div
                style={{
                    background: "#F1F1F1",
                    height: "auto",
                }}
            >


                {/* <TabPanel value={value} index={2}> */}
                <AppraiserDashboardContext>
                   {(RatingsExpandActive === false && TopperformersExpandActive === false && 
                    TeamtableExpandActive === false && NineboxExpand === false && solidperformersExpandActive === false) &&<div>
                    <div>
                        <CalendarFilters
                            SectionFilter={SectionFilter}
                            setSectionFilter={setSectionFilter}
                            subSectionFilter={subSectionFilter}
                            setSubSectionFilter={setSubSectionFilter}
                            navigationFrom={navigationFrom}
                            talentCategoreyFilter={talentCategoreyFilter}
                            settalentCategoreyFilter={settalentCategoreyFilter}
                            valueofTab={valueofTab}
                        />
                        <Timelinerevview />
                    </div>
                    <div>
                        <PerformanceRatingandEmpRejectionofOverallDashboard
                            completedCount={checkAppraisalStatusCompletedMyteam("completed")}
                            inprogressCount={checkAppraisalStatusInProgressMyteam("in-progress")}
                            inMediaton={checkAppraisalinmediationStatusMyteam("rejected")}
                            range1={range1Myteam}
                            range2={range2Myteam}
                            range3={range3Myteam}
                            range4={range4Myteam}
                            TotalEmp={TotalEmpMyteam}
                            CompletedEmp={CompletedEmpMyteam}
                            navigationFrom={navigationFrom}
                            handleOnClickCard={handleOnClickCardMyteam}
                            StatusValues={StatusValuesMyteam}
                            setselectedRatingRange={setselectedRatingRange}
                            setRatingsExpandActive={setRatingsExpandActive}
                        />
                    </div>
                    <div  ref={myRef} style={{ marginTop: "25px" }}>
                        <LineManagersTeamTable
                            navigationFrom={navigationFrom}
                            SectionFilter={SectionFilter}
                            setSectionFilter={setSectionFilter}
                            subSectionFilter={subSectionFilter}
                            setSubSectionFilter={setSubSectionFilter}
                            employeeData1={talentCategoreyData}
                            valueOfCard={valueOfCardMyteam}
                            setTeamtableExpandActive={setTeamtableExpandActive}
                        />

                    </div>
                    <div style={{ marginTop: "25px" }}>
                        <NineboxandTopPerformanceofOverallDashboard
                            NineBoxValues={NineBoxValues}
                            NineBoxData={NineBoxValues}
                            topPerformerEmployees={TopPerformersOfAppraiserMyteam}
                            ExcelData9Box={ExcelData9Box}
                            navigationFrom={navigationFrom}
                            setTopperformersExpandActive={setTopperformersExpandActive}
                            setNineboxExpand={setNineboxExpand}
                            indexBasedValue={indexBasedValue}
                            setindexBasedValue={setindexBasedValue}
                            indexBasedTitle={indexBasedTitle}
                            setindexBasedTitle={setindexBasedTitle}
                        />
                        
  
                    </div>
                    </div>}
                   {RatingsExpandActive && <div>
                        <FilteredtablemainofOverallDashboard
                            FinalData={talentCategoreyData}
                            selectedRatingRange={selectedRatingRange}
                            setselectedRatingRange={setselectedRatingRange}
                            setRatingsExpandActive={setRatingsExpandActive}
                        />
                    </div>}
                   {TopperformersExpandActive && <div>
                    <TopPerformersExpandofAppOverallDashboard
                     FinalData={talentCategoreyData}
                     setTopperformersExpandActive={setTopperformersExpandActive}
                    />
                    </div>}
                   {TeamtableExpandActive && <div>
                      <OverallDashboardExpandViewofTable
                        employeeData1={talentCategoreyData}
                        setTeamtableExpandActive={setTeamtableExpandActive}
                      />
                    </div>}
                   {NineboxExpand && <div>
                    <ExpandNineBoxandSolidtalentsofOverallDashboard
                    setNineboxExpand={setNineboxExpand}
                    setSolidperformersExpandActive={setSolidperformersExpandActive}
                    NineBoxData={NineBoxValues}
                    indexBasedTitle={indexBasedTitle}
                    setindexBasedTitle={setindexBasedTitle}
                    indexBasedValue={indexBasedValue}
                    setindexBasedValue={setindexBasedValue}
                    />
                    </div>}
                {solidperformersExpandActive && <div>
                        <FilteredTableofExpNineboxOD
                        indexBasedTitle={indexBasedTitle}
                        indexBasedValue={indexBasedValue}
                        NineBoxData={NineBoxValues}
                        employeeData1={talentCategoreyData}
                        />
                    </div>}
                </AppraiserDashboardContext>
                {/* </TabPanel> */}

            </div>
        </>
    )
}

export default OverallDashboardForAppraiser
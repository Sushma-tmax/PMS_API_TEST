import * as React from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import NineBoxCardEnlarge from "./UI/NineBoxCardEnlarge";
import Grid from "@mui/material/Grid";
import Potentialtalents from "../../assets/Images/Potentialtalents.svg";
import Solidtalents from "../../assets/Images/Solidtalents.svg";
import Star from "../../assets/Images/Star.svg";
import Inconsistent from "../../assets/Images/Inconsistent.svg";
import Solidperformers from "../../assets/Images/Solidperformers.svg";
import HighPerformerstop from "../../assets/Images/HighPerformerstop.svg";
import Lowperformers from "../../assets/Images/Lowperformers.svg";
import Solidperformer from "../../assets/Images/Solidperformer.svg";
import Highperformers from "../../assets/Images/Highperformers.svg";
import { useGetEmployeeByFilterQuery } from "../../service";
import { useGetNineboxQuery } from "../../service/ninebox/ninebox";
import {useLoggedInUser} from "../../hooks/useLoggedInUser";
function EnlargedNineBox(props:any) {
    const {data} = props
    console.log(props,"nineboxValues")

    const { data:RangeValue } = useGetNineboxQuery("");
    const { data: user } = useLoggedInUser();

    const [Range, setRange] = React.useState<any>([]);
    const [RangeHighFrom, setRangeHighFrom] = React.useState<any>(4);
    const [RangeHighTo, setRangeHighTo] = React.useState<any>(5);
    const [RangeMediumFrom, setRangeMediumFrom] = React.useState<any>(3);
    const [RangeMediumTo, setRangeMediumTo] = React.useState<any>(3.9);
    const [RangeLowFrom, setRangeLowFrom] = React.useState<any>(1);
    const [RangeLowTo, setRangeLowTo] = React.useState<any>(2.9);
    React.useEffect(() => {
      if(RangeValue?.data[0]?.performance_definitions !== undefined){
        setRange(RangeValue?.data[0]?.performance_definitions)
        setRangeHighFrom(RangeValue?.data[0]?.performance_definitions?.high_from)
        setRangeHighTo(RangeValue?.data[0]?.performance_definitions?.high_to)
        setRangeMediumFrom(RangeValue?.data[0]?.performance_definitions?.medium_from)
        setRangeMediumTo(RangeValue?.data[0]?.performance_definitions?.medium_to)
        setRangeLowFrom(RangeValue?.data[0]?.performance_definitions?.low_from)
        setRangeLowTo(RangeValue?.data[0]?.performance_definitions?.low_to)
      }
      
    }, [RangeValue])
  
    console.log(RangeValue,"nineboxValuesss")
    const { data: low_3 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeLowTo}`
    );
    const { data: moderate_3 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeLowTo}`
    );
    const { data: high_3 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeLowFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeLowTo}`
    );
    const { data: low_4 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
    );
    const { data: moderate_4 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
    );
    const { data: high_4 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeMediumFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeMediumTo}`
    );
  
    const { data: low_5 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Low&appraisal.appraiser_rating[lte]=${RangeHighTo}`
    );
    const { data: moderate_5 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=Moderate&appraisal.appraiser_rating[lte]=${RangeHighTo}`
    );
    const { data: high_5 } = useGetEmployeeByFilterQuery(
      `?select=appraisal.appraiser_rating,appraisal.potential,manager_code&manager_code=${user?.employee_code}&appraisal.appraiser_rating[gte]=${RangeHighFrom}&appraisal.potential=High&appraisal.appraiser_rating[lte]=${RangeHighTo}`
    );
// definition
  const NineBoxValues = [
    {
      title: RangeValue?.data[0]?.box_9_definitions[0]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[0]?.definition,
      count: high_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Potentialtalents} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[1]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[1]?.definition,
      count:  high_4?.count,
      color: "linear-gradient(to right, #71E1F6, #28B7D3)",
      icon: <img src={Solidtalents} alt="image" />,
    },
    {
      title:RangeValue?.data[0]?.box_9_definitions[2]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[2]?.definition,
      count: high_5?.count,
      color: "#71E1F6",
      icon: <img src={Star} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[3]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[3]?.definition,
      count: moderate_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Inconsistent} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[4]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[4]?.definition,
      count: moderate_4?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[5]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[5]?.definition,
      count: moderate_5?.count,
      color: "#71E1F6",
      icon: <img src={HighPerformerstop} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[6]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[6]?.definition,
      count: low_3?.count,
      color: "linear-gradient(to right, #F89994, #F7665E)",
      icon: <img src={Lowperformers} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[7]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[7]?.definition,
      count: low_4?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Solidperformer} alt="image" />,
    },
    {
      title: RangeValue?.data[0]?.box_9_definitions[8]?.title,
      defenition: RangeValue?.data[0]?.box_9_definitions[8]?.definition,
      count: low_5?.count,
      color: "linear-gradient(to right, #33CDB4, #079B82)",
      icon: <img src={Highperformers} alt="image" />,
    },
  ];
  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div
              style={{
                marginLeft: "40px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "545px",
                  background: "#eeeeee",
                  position: "relative",
                }}
              >
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "13px solid #EEEEEE",
                  position: "absolute",
                  //   top: " -12px",
                  left: "3px",
                  //top: "928px",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <span
                style={{
                  position: "absolute",
                  left: "-23px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "70px",
                }}
              >
                High
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "-37px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "250px",
                }}
              >
                Moderate
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "-23px",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "420px",
                }}
              >
                Low
              </span>
            </div>
            <div
              style={{
                transform: "rotateZ(270deg)",
                position: "absolute",
                left: "10px",
                top: "1186px",
                fontSize: "12px",
              }}
            >
              Potential
            </div>
            </div>
          </Grid>
          <Grid item xs={11}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                columnGap: "15px",
                rowGap: "15px",
                //   paddingTop: "60px",
                //   padding: "40px",
                //   paddingRight: "0px",
                // paddingLeft: "40px",
                paddingBottom: "40px",
                // height: "calc(100vh - 225px)"
              }}
            >
              {NineBoxValues?.map((value: any) => {
                const { title, count, color, icon,defenition } = value;
                return (
                  <>
                    <NineBoxCardEnlarge
                      title={title}
                      count={count}
                      color={color}
                      icon={icon}
                      defenition={defenition}
                    />
                  </>
                );
              })}
              
            </Box>
            <div>
            <div
                style={{
                  height: "5px",
                  background: "#eeeeee",
                  width: "100%",
                  marginTop: "20px",
                  position: "relative",
                }}
              >
               <div
                style={{
                  width: "0",
                  height: "0",
                  borderTop: "10px solid transparent",
                  borderLeft: "10px solid transparent",
                  borderBottom: "10px solid #EEEEEE",
                  position: "absolute",
                  top: " -10px",
                  left: "99%",
                  //top: "1361px",
                  transform: "rotate(316deg)",
                }}
              ></div>
              <span
                style={{
                  position: "absolute",
                  left: "14%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                Low
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "48%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                Moderate
              </span>
              <span
                style={{
                  position: "absolute",
                  left: "83%",
                  border: "1px solid #EEEEEE",
                  background: " #ffffff",
                  fontSize: "12px",
                  color: "#3E8CB5",
                  padding: "0px 12px",
                  borderRadius: "19px",
                  zIndex: "1",
                  top: "-7px",
                }}
              >
                High
              </span>
              </div>
              <div
              style={{
                position: "absolute",
                left: "52.5%",
                fontSize: "12px",
                marginTop:"25px"
              }}
              >

                Performance
              </div>
              </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EnlargedNineBox;

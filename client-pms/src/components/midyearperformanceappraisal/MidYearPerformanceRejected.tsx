import * as React from "react";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {RemoveRedEyeOutlined} from "@mui/icons-material";
import {Button, Container} from "@mui/material";
import {grey} from "@mui/material/colors";
import {border, width, color, textAlign} from "@mui/system";
import {table} from "console";
import {th} from "date-fns/locale";
import {text} from "express";
import {size} from "lodash";
import {Link} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import {
    MIDYEAR_CHECKBOX,
    MIDYEAR_PA_REPORT,
    MIDYEAR_REJECT_RATING,
} from "../../constants/routes/Routing";
import {
    useGetObjectiveDescriptionQuery,
    useGetObjectiveTitleQuery,
    useGetObjectiveTypeQuery,
    useUpdateEmployeeAppraisalMutation
} from "../../service";
import _ from "lodash";

const Item = styled("div")(({theme}) => ({
    backgroundColor: "#f2f9fa",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Root = styled("div")(
    ({theme}) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 231%;
  }

  td,
  th {
    border: 1px solid #e0e0e0;
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: #f2f9fa;
  }
  `
);

const MidyearPerformanceRejected = (props: any) => {
    const {employeeData, onSubmit,ratingScaleData} = props;
    const {employee_id} = useParams()
    const {data} = useGetObjectiveTypeQuery("");
    const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
        []
    );
    const [objectiveDescriptionEmployee, setObjectiveDescriptionEmployee] = React.useState<any>(
        []
    );
    const [filterData, setFilterData] = useState([]);
    const [filterDataEmployee, setFilterDataEmployee] = useState<any>([]);
    console.log(employeeData, "employeeData");
    console.log(data, "objectiveType");

    const {data: objectiveTitleData, isLoading} = useGetObjectiveTitleQuery("");
    const {data: objectiveDescData, isLoading: isLoadingDescription} = useGetObjectiveDescriptionQuery("");
    const [updateEmployee] = useUpdateEmployeeAppraisalMutation()


    // const findObjectiveTitleById = (id: any) => {
    //     if (objectiveDescData) {
    //         console.log(objectiveDescData, id, "ppppppppp");
    //         return objectiveTitleData.data.find((item: any) => item._id === id);
    //     }
    // };

    const getObjectiveTypeName = (id: any) => {
        console.log(id, " type");
        if (data) {
            return data.data.find((item: any) => {
                return id === item._id;
            });
        }
    };

    useEffect(() => {
        if (employeeData && data && objectiveTitleData) {

            setObjectiveDescription(() => {
                const newObjType =
                    employeeData.data.normalizer.objective_description.map((i: any) => {

                        return {
                            ...i.name,
                            comments: i.comments,
                            rating: i.ratings,
                            objective_type: getObjectiveTypeName(i.name.objective_type),
                            // objectiveTitle: findObjectiveTitleById(i.name.objectiveTitle),
                            objectiveTitle: i.name.objectiveTitle,
                        };
                    });

                return newObjType;
            });
            setObjectiveDescriptionEmployee(() => {
                let newObjType =
                    employeeData.data.employee.objective_description.map((i: any) => {

                        return {
                            ...i.name,
                            comments: i.comments,
                            rating: i.ratings,
                            objective_type: getObjectiveTypeName(i.name.objective_type),
                            // objectiveTitle: findObjectiveTitleById(i.name.objectiveTitle),
                            objectiveTitle: i.name.objectiveTitle,
                        };
                    });

                return newObjType;
            });
        }
    }, [employeeData, data, objectiveDescData]);

    const groupNameHandler = (name: any) => {
        if (name) {
            setFilterData(name);
        }
    };
    const groupNameHandlerEmp = (name: any) => {
        if (name) {
            setFilterDataEmployee(name);
        }
    };

    useEffect(() => {
        const group = _.groupBy(objectiveDescription, "objective_type.name");

        const groupEmployee = _.groupBy(objectiveDescriptionEmployee, "objective_type.name");
        // console.log(Object.entries(group), 'group')

        const groupName = groupNameHandler(Object.entries(group));
        const groupNameEmp = groupNameHandlerEmp(Object.entries(groupEmployee));

        console.log(
            Object.entries(group).map((i: any) => {
                console.log(i);
                console.log(i[0]);
                console.log(
                    i[1].map((j: any) => {
                        console.log(j.description, j.comments, j.rating, "group");
                    }),
                    "group"
                );
            }),
            "objective description"
        );
    }, [objectiveDescription]);

    const [Checked, setChecked] = useState(true);

    const handleChange = (e: any) => {
        let isChecked = e.target.checked;
        console.log(isChecked, "handleChange");
        if (isChecked == false) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    };
    const getRatingDescription =( rating:any)=>{
        let ratingValue = Math.round(rating);
        let ratingDataValue = ratingScaleData.data.find((item:any)=>item.rating == ratingValue);
        if(ratingDataValue)
        return ratingDataValue.rating_scale
        else
        return ""
    }
    return (
        <React.Fragment>

            <div style={{backgroundColor: "#F1F1F1", height: "1500px"}}>
                <Container
                    sx={{
                        maxWidth: "96.5% !important",
                        backgroundColor: "#ebf1f5",
                    }}
                >
                    <h1
                        style={{
                            color: "#004c75",
                            fontWeight: "400",
                            opacity: "0.9",
                            fontSize: "24px"
                        }}
                    >
                        {" "}
                        Mid-Year Performance Appraisal
                    </h1>

                </Container>
                <Container
                    sx={{
                        maxWidth: "96.5% !important",
                        height: "1408px",
                        background: "#fff",
                    }}
                >
                    <Box sx={{flexGrow: 1}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Item>
                                    <h2
                                        style={{
                                            color: "#014D76",
                                            fontWeight: "400",
                                            opacity: "0.9",
                                        }}
                                    >
                                        Final Rating
                                    </h2>
                                    {employeeData &&
                                        <h2>{employeeData?.data?.normalizer?.normalizer_rating}</h2>}
                                    <p
                                        style={{
                                            fontSize: "13px",
                                        }}
                                    >
                                       {getRatingDescription(employeeData?.data?.normalizer?.normalizer_rating)}
                                    </p>
                                    <h4 style={{fontWeight: "400", opacity: "0.9"}}>
                                        <Link to={`${MIDYEAR_PA_REPORT}/${employee_id}`}>
                                            <RemoveRedEyeOutlined
                                                style={{verticalAlign: "middle"}}
                                            />{" "}
                                            View PA Report
                                        </Link>
                                    </h4>
                                </Item>
                            </Grid>
                            {/* <Grid item xs={6}>
                                <Item>
                                    <h2
                                        style={{
                                            color: "#014D76",
                                            fontWeight: "400",
                                            opacity: "0.9",
                                        }}
                                    >
                                        Previous Final Rating
                                    </h2>
                                    <h2>2.5</h2>
                                    <p
                                        style={{
                                            fontSize: "13px",
                                        }}
                                    >
                                        Needed Improvement
                                    </p>
                                    <h4 style={{verticalAlign: "middle"}}>
                                        <RemoveRedEyeOutlined style={{verticalAlign: "middle"}}/>{" "}
                                        View Previous PA Report
                                    </h4>
                                </Item>
                            </Grid> */}
                        </Grid>
                    </Box>

                    <h2 style={{fontWeight: "400", opacity: "0.9"}}>Summary</h2>
                    <Root sx={{width: "43.3%"}}>
                        <table>
                            <thead
                                style={{
                                    color: "#014D76",
                                    fontSize: "15px",
                                }}
                            >
                            <tr
                                style={{
                                    height: "70px",
                                    textAlign: "center",
                                    alignContent: "center",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontWeight: "400",
                                    opacity: "0.9",
                                }}
                            >
                                <th>Objective Type</th>
                                <th>Objective Title</th>
                                <th>Rating</th>
                                <th>Self Rating</th>
                                <th>Comments</th>
                            </tr>
                            </thead>
                            {filterData &&
                                filterData.map((i: any, index1:any) => {

                                    return (
                                        <>
                                            <tbody
                                                style={{
                                                    fontSize: "12px",
                                                }}
                                            >
                                            <tr
                                                style={{
                                                    backgroundColor: "#f2f9fa",
                                                }}
                                            >
                                                <td
                                                    rowSpan={5}
                                                    style={{
                                                        color: "#014D76",
                                                    }}
                                                >
                                                    {i[0]}
                                                </td>
                                            </tr>
                                            {i[1].map((j: any,index2:any) => {
                                               
                                                return (
                                                    <tr>
                                                        <td>  {j?.objectiveTitle}</td>

                                                        <td>
                                                            <h3>{j?.rating?.rating}</h3>
                                                            <p
                                                                style={{
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                               {j?.rating?.rating_scale}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <h3>{filterDataEmployee[index1]&& filterDataEmployee[index1][1][index2].rating?.rating}</h3>
                                                            <p
                                                                style={{
                                                                    fontSize: "12px",
                                                                }}
                                                            >
                                                               {filterDataEmployee[index1]&& filterDataEmployee[index1][1][index2].rating?.rating_scale}
                                                            </p>
                                                        </td>
                                                        <td> {j.comments} </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </>
                                    );
                                })}
                        </table>
                    </Root>
                    {/* <div style={{marginTop: "10px", paddingBottom: "20px"}}>
                        <input
                            type="checkbox"
                            style={{
                                height: "20px",
                                width: "19px",
                                verticalAlign: "middle",
                            }}
                            onChange={handleChange}
                        />
                        <label>
                            I met and discussed the performance rating with my Line Manager
                        </label>
                    </div> */}

                    <div
                        style={{
                            fontSize: "22px",
                            fontFamily: " Arial, Helvetica, sans-serif",
                            // margin: "30px",
                            // paddingLeft: "600px",
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#FFFBF2",
                            justifyContent: "center",
                            // paddingTop: "33px",
                            height: "125px",
                            width: "100%",
                            // marginLeft: "auto",
                        }}
                    >
                        {/* <Link to={`${MIDYEAR_PA_REPORT}/employee/:employee_id`}> */}
                        {/* <Button
                            style={{
                                textTransform: "none",
                                backgroundColor: "#FFA801",
                                fontSize: "14px",
                                fontFamily: "sans-serif",
                                padding: "6px 30px",
                                marginRight: "10px",
                            }}
                            variant="contained"
                            disabled={Checked}
                            onClick={() => {
                                onSubmit();
                                alert("Approve Successfully!");
                            }}
                        >
                            ACCEPT
                        </Button> */}
                        {/* </Link> */}
                        {/* <Link to={`${MIDYEAR_REJECT_RATING}/employee/${employee_id}`}>
                            <Button
                                style={{
                                    textTransform: "none",
                                    fontSize: "15px",
                                    color: "#FFA801",

                                    fontFamily: "sans-serif",
                                    borderColor: "#FFA801",
                                }}
                                variant="outlined"
                                onClick={() => {
                                    updateEmployee({
                                            "employee.objective_description": employeeData.data.normalizer.objective_description,
                                            id: employee_id
                                        },
                                    )
                                }}
                            >
                                REJECT
                            </Button>
                        </Link> */}
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MidyearPerformanceRejected;

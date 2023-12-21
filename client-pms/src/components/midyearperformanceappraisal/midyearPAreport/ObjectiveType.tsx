import React, { useState, useEffect } from 'react'
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useGetObjectiveTitleQuery, useGetObjectiveTypeQuery } from '../../../service';
import _ from "lodash";

const Root = styled("div")(
    ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #e0e0e0;
    text-align: left;
    padding: 6px;
  }

  th {
   
  }
  `
);

const ObjectiveType = (props: any) => {

    const { objDescData } = props
    const [ObjectiveType, setObjectiveType] = useState<any>([])
    const [objectiveDescription, setObjectiveDescription] = React.useState<any>([]);
    const [filterData, setFilterData] = useState([])
    const { data } = useGetObjectiveTypeQuery('')
    console.log(data, 'query:objective type data')
    console.log(objectiveDescription, 'obbb')
    console.log(objectiveDescription, 'objectiveDescription')

    const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");


    const findObjectiveTitleById = (id: any) => {
        if (objectiveTitleData) {
            console.log(id, "objectiveTitleData");
            return objectiveTitleData.data.find((item: any) => item._id === id);
        }
    };



    const getObjectiveTypeName = (id: any) => {
        console.log(id, ' type')
        if (data) {
            return data.data.find((item: any) => {
                return id === item._id
            })

        }
    }

    useEffect(() => {

        if (objDescData && data && objectiveTitleData) {
            let latestrating: any;
            if (objDescData?.data?.normalizer !== "" && objDescData?.data?.normalizer?.normalizer_status !== "pending") {
                latestrating = (objDescData.data.normalizer)
            } else if (objDescData?.data?.reviewer !== "" && objDescData?.data?.reviewer?.reviewer_status !== "pending") {
                latestrating = (objDescData.data.reviewer)
            } else if (objDescData?.data?.appraisal !== "" && objDescData?.data?.appraisal?.appraiser_status !== "pending") {
                latestrating = (objDescData.data.appraisal)
            }
            setObjectiveDescription(() => {
                const newObjType = latestrating.objective_description.map((i: any) => {
                    return {
                        ...i.name,
                        comments: i.comments,
                        rating: i.ratings,
                        objective_type: getObjectiveTypeName(i.name.objective_type),
                        // objective_title: findObjectiveTitleById(i.name.objective_title),
                    }

                })
                return newObjType
            })
        }
    }, [objDescData, data, objectiveTitleData])

    const groupNAmeHandler = (name: any) => {
        if (name) {
            setFilterData(name)
        }


    }


    useEffect(() => {

        const group = _.groupBy(objectiveDescription, 'objective_type.objective_group.name')
        // console.log(Object.entries(group), 'group')

        const groupName = groupNAmeHandler(Object.entries(group))

        console.log(Object.entries(group).map((i: any) => {
            console.log(i)
            console.log(i[0])
            console.log(i[1].map((j: any) => {

                console.log(j.description, j.comments, j.rating, 'group')

            }), 'group')
            // console.log(i[index].map((j:any) => {
            //     console.log(j.name, 'j')
            // }), 'j')
            // return {
            //     ...i[0],
            //     description: i[1]
            // }
        }), 'objective description')


    }, [objectiveDescription])

    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <>
            <h2 style={{
                textAlign: "center", color: "#014D76", fontWeight: "400",
                opacity: "0.9"
            }}>
                Summary
            </h2>

            <Root>
                <table>
                    <thead
                        style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            opacity: "0.9",
                            color: "#014D76",
                        }}
                    >
                        <tr
                            style={{
                                height: "40px",
                                textAlign: "center",
                                alignContent: "center",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <th>Objective Type</th>
                            <th>Objective Title</th>
                            <th>Rating</th>                            
                            <th>Comments</th>
                        </tr>
                    </thead>
                    {filterData &&
                        filterData.map((i: any) => {

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
                                                colSpan={4}
                                                style={{
                                                    color: "#014D76",
                                                }}
                                            >
                                                {i[0]}
                                            </td>
                                        </tr>
                                        {i[1].map((j: any) => {

                                            return (
                                                <tr>
                                                    <td>   {j.objective_type?.name}</td>
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

                                                    <td> {j.comments} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </>
                            );
                        })}
                    {/* {i[1].map((j: any) => {
                                    console.log(j, 'jjjjjjjj')
                                    if (j.rating) return (
                                        <tbody
                                            style={{
                                                fontSize: "14px",
                                                padding: "15px"
                                            }}
                                        >

                                            <tr>
                                                <td>
                                                    {j.objective_type?.name}

                                                </td>
                                                <td>
                                                    {j.objectiveTitle}

                                                </td>
                                                <td>
                                                    {" "}
                                                    {j.comments}{" "}
                                                </td>
                                                <td>
                                                    <h3>{j.rating.rating}</h3>
                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        {j.rating.rating_scale}
                                                    </p>
                                                </td>

                                            </tr>

                                        </tbody>
                                    )
                                })} */}
                </table>
            </Root>
        </>
    )

}

export default ObjectiveType

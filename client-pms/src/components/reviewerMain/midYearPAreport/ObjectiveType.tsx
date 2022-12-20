import React, { useState, useEffect } from 'react'
import {AccountCircle} from "@mui/icons-material";
import {Box, Container, Grid, IconButton} from "@mui/material";
import {styled} from "@mui/material/styles";
// @ts-ignore
import _ from "lodash";
import {useGetObjectiveTitleQuery, useGetObjectiveTypeQuery} from '../../../service';

const Root = styled("div")(
  ({theme}) => `
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

const ObjectiveType = (props:any) => {
 
  const { objDescData } = props
  const [ObjectiveType, setObjectiveType] = useState<any>([])
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>([]);
  const [filterData , setFilterData] = useState([])
  const { data } = useGetObjectiveTypeQuery('')
  console.log(data, 'query:objective type data')
  console.log(objectiveDescription, 'obbb')


    const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");


    const findObjectiveTitleById = (id: any) => {
        if (objectiveTitleData) {
            console.log(id, "objectiveTitleData");
            return objectiveTitleData.data.find((item: any) => item._id === id);
        }
    };


    const getObjectiveTypeName = (id: any) => {
    console.log(id,' type')
    if (data) {
        return data.data.find((item: any) => {
            return id === item._id
        })

    }
}

useEffect(() => {

    if (objDescData && data && objectiveTitleData) {

        setObjectiveDescription(() => {
            const newObjType = objDescData.data.appraisal.objective_description.map((i: any) => {
                return {
                    ...i.name,
                    comments: i.comments,
                    rating: i.ratings,
                    objective_type: getObjectiveTypeName(i.name.objective_type),
                    objective_title: findObjectiveTitleById(i.name.objective_title),
                }

            })
            return newObjType
        })
    }
}, [objDescData, data, objectiveTitleData])

const groupNAmeHandler = (name:any) => {
    if (name) {
        setFilterData(name) 
    }
  
  
}


useEffect(() => {

    const group = _.groupBy(objectiveDescription, 'objective_type.name')
    // console.log(Object.entries(group), 'group')

    const groupName = groupNAmeHandler(Object.entries(group))

    console.log(Object.entries(group).map((i:any) => {
        console.log(i)
        console.log(i[0])
        console.log(i[1].map((j:any) => {

            console.log(j.description, j.comments,j.rating, 'group')

        }), 'group')
        // console.log(i[index].map((j:any) => {
        //     console.log(j.name, 'j')
        // }), 'j')
        // return {
        //     ...i[0],
        //     description: i[1]
        // }
    }), 'objective description')


},[objectiveDescription])


  return (

    <>  
      
      
      {filterData && objectiveTitleData && filterData.map((i: any) => {
      return (
        <>
        <h2 style={{
                  textAlign: "center", color: "#014D76", fontWeight: "400",
                  opacity: "0.9"
              }}>  
              {i[0]}
              </h2>             
           
              <Root>
                  <table>
                      <thead
                          style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              opacity: "0.9"
                          }}
                      >
                      <tr
                          style={{
                              height: "70px",
                              textAlign: "center",
                              alignContent: "center",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                      >
                       
                          <th>Objective Title</th>
                          <th>Comments</th>
                          <th>Rating</th>
                      </tr>
                      </thead>
                      { i[1].map((j:any) => {
                          return (
                            <tbody
                            style={{
                                fontSize: "14px",
                            }}
                        >

                            <tr>
                                <td>
                                    {j.objective_title.objective_title}

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
                                        Exceptional
                                    </p>
                                </td>

                            </tr>

                        </tbody>
                          )
                      })}
                  </table>
              </Root>
              </>
      )
      })}
         
        
    </>
  )
}

export default ObjectiveType

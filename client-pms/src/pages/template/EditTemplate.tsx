/* eslint-disable */
import React, {useEffect, useState} from "react";
import ViewTemplate from "../../components/Template/ViewTemplate";
import {
    useEditTemplateMutation,
    useGetObjectiveDescriptionQuery, useGetObjectiveGroupQuery, useGetObjectiveTitleQuery, useGetObjectiveTypeQuery,
    useGetSingleTemplateQuery,
    useGetTemplateQuery
} from "../../service";
import {useParams} from "react-router-dom";
import EditTemplate from "../../components/Template_old/EditTemplate";
import _ from "lodash";


const ViewTemplatePage = () => {
    const {id} = useParams()

    const [objectiveGroup, setObjectiveGroup] = React.useState<any>(null)
    const [objectiveType, setObjectiveType] = React.useState<any>([])
    const [objectiveDescription, setObjectiveDescription] = React.useState<any>([])
    const [templateObjectiveGroup, setTemplateObjectiveGroup] = React.useState<any>([])


    const {data: singleTemplate, isLoading: load} = useGetSingleTemplateQuery(id)
    const {data: tempData, isLoading: loadTemp} = useGetTemplateQuery('')
    const {data: descriptionData} = useGetObjectiveDescriptionQuery('')
    const [editTemplate] = useEditTemplateMutation()
    const {data: objectiveTypeData} = useGetObjectiveTypeQuery('')
    const {data: objectiveGroupData} = useGetObjectiveGroupQuery('')

    const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");




    const editTemplateHandler = (values: any) => {
        console.log(values)
        editTemplate({
                name: values.name,
                weightage: values.weightage,
                id
            }
        )

    }

    const findObjectiveTitleById = (id: any) => {
        if (objectiveTitleData) {
            console.log(id, "objectiveTitleData");
            return objectiveTitleData.data.find((item: any) => item._id === id);
        }
    };



    useEffect(() => {
        if (objectiveGroupData) {
            setObjectiveGroup(objectiveGroupData.data)
        }
    }, [objectiveGroupData])


    useEffect(() => {
        if (singleTemplate) {
            setTemplateObjectiveGroup(singleTemplate.template.weightage.objective_group)
        }
    }, [singleTemplate])


    const getObjectiveGroup = (id: any) => {
        console.log('find')
        if (id && singleTemplate) {
            return singleTemplate.template.weightage.objective_group.find((item: any) => {
                console.log(item, 'find')
                return item.name._id === id
            })
        }
    }

    const getObjectiveGroupName = (id: any) => {
        return objectiveGroup.find((item: any) => {
            return item._id === id
        })
    }


    useEffect(() => {
        if (singleTemplate && descriptionData && objectiveGroup && objectiveTypeData && objectiveTitleData) {


            const newsing = singleTemplate.template.weightage.objective_description.map((i: any) => {
                return {
                    ...i.name,
                    isChecked: i.isChecked,
                    objective_title: findObjectiveTitleById(i.name.objective_title),
                    isDisabled: false
                }
            })

            const newobj = descriptionData.data.map((i: any) => {
                return {
                    ...i,
                    objective_type: i.objective_type._id,
                    // objective_title: findObjectiveTitleById(i.name.objective_title),
                    isDisabled: false
                }
            })

            // setObjectiveType(singleTemplate.template.weightage.objective_type)
            setObjectiveType(() => {

                const newObjType = objectiveTypeData.data.map((i: any) => {
                    return {
                        ...i,
                        objective_group: {
                            name: getObjectiveGroupName(i.objective_group._id),
                        }
                    }
                })


                const oldType = singleTemplate.template.weightage.objective_type.map((i: any) => {
                    return {
                        ...i.name,
                        objective_group: getObjectiveGroup(i.name.objective_group),
                        isChecked: i.isChecked,
                    }
                })
                console.log(oldType, 'oldType')


                const newArr = [...newObjType, ...oldType]
                // const newArr = [...oldType, ...newObjType]
                console.log(newArr, 'newArr')
                // @ts-ignore
                // let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()
                let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()];
                // const newA = _.uniqBy(newArr, "name._id");
                console.log(uniqueObjArray, 'new')

                return uniqueObjArray

            })
            setObjectiveDescription(() => {
                if (descriptionData) {
                    const newArr = [...newobj, ...newsing]

                    // @ts-ignore
                    let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()];
                    return uniqueObjArray
                }
            })
        }
    }, [singleTemplate, descriptionData, objectiveGroup, objectiveTypeData,objectiveTitleData])


    if (load) {
        return <div>Loading...</div>
    }


    return (
        <EditTemplate singleTemplate={singleTemplate}
                      typeData={objectiveType}
                      onSubmit={editTemplateHandler}
                      descriptionData={objectiveDescription}
                      templateData={tempData}
                      all={true}
                      loadTemplate={loadTemp}/>
    )
};

export default ViewTemplatePage;

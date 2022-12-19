import {
    useGetObjectiveDescriptionQuery,
    useGetObjectiveGroupQuery,
    useGetObjectiveTypeQuery,
    useGetSingleTemplateQuery,
    useGetTemplateQuery
} from "../../service";
import {useParams, useNavigate} from 'react-router-dom';
import React, {useEffect} from "react";
import EditViewTemplateComponent from "../../components/Template/EditViewTemplate";


const EditViewTemplate = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetTemplateQuery('');
    const {data: singleTemplate, isLoading: load} = useGetSingleTemplateQuery(id)

    const {data: objectiveTypeData} = useGetObjectiveTypeQuery('')
    const {data: objectiveGroupData} = useGetObjectiveGroupQuery('')
    const {data: descriptionData} = useGetObjectiveDescriptionQuery('')




    const [templateObjectiveGroup, setTemplateObjectiveGroup] = React.useState<any>([])
    const [objectiveGroup, setObjectiveGroup] = React.useState<any>(null)
    const [objectiveType, setObjectiveType] = React.useState<any>([])
    const [objectiveDescription, setObjectiveDescription] = React.useState<any>([])


    console.log(singleTemplate, 'sing')
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
        if(id && singleTemplate) {
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
        if (singleTemplate && descriptionData && objectiveGroup && objectiveTypeData) {


            const newsing = singleTemplate.template.weightage.objective_description.map((i: any) => {
                return {
                    ...i.name,
                    isChecked: i.isChecked,
                    isDisabled: true
                }
            })

            const newobj = descriptionData.data.map((i: any) => {
                return {
                    ...i,
                    objective_type: i.objective_type._id,
                    isDisabled: true
                }
            })

            // setObjectiveType(singleTemplate.template.weightage.objective_type)
            setObjectiveType(() => {




                const oldType = singleTemplate.template.weightage.objective_type.map((i: any) => {
                    return {
                        ...i.name,
                        objective_group: getObjectiveGroup(i.name.objective_group),
                        isChecked: i.isChecked,
                    }
                })

                // @ts-ignore
                // let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()


                return oldType

            })
            setObjectiveDescription(() => {
                if (descriptionData) {
                    return newsing
                }
            })
        }
    }, [singleTemplate, descriptionData, objectiveGroup, objectiveTypeData])


    if(isLoading) {
        return <div>Loading.....</div>
    }

    if (load) {
        return <div>Loading...</div>;
    }



    return (
        <div>
            <EditViewTemplateComponent isDisabled={true} typeData={objectiveType} singleTemplate={singleTemplate} templateData={data}    descriptionData={objectiveDescription} all={false}/>
        </div>
    );
};


export default EditViewTemplate;

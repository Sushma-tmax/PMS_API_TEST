import React from "react";
import {
    useUpdateObjectiveDescriptionMutation,
    useGetSingleObjectiveDescriptionQuery
} from "../../service/"
import {useNavigate, useParams} from "react-router-dom";
import AddObjectiveDescription from "../../components/objective_old/AddObjectiveDescription";
import { VIEW_OBJECTIVE_DESCRIPTION } from "../../constants/routes/Routing";


const EditObjectiveDescription = () => {
    const navigate = useNavigate()
    console.log('edit page')


    const {id} = useParams()
    const {data} = useGetSingleObjectiveDescriptionQuery(id)
    const [UpdateObjectiveDescription, {data:objData, isError}] = useUpdateObjectiveDescriptionMutation()
    // console.log(data)


    const objectiveDescriptionEditHandler = (objective_type: string, criteria: string, description: string, detailed_description: string) => {
        console.log('running')
      
        UpdateObjectiveDescription(
            {
            id,
            objective_type,
            criteria,
            description,
            detailed_description
        })
        .then((res: any) => {
            res.error ? <> </> : navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`)
        })

        // if (objData && isError === false) {
        //    navigate("/objective/get-objective-description");  
        // }

    };

    // if (isLoading) {
    //     return <div> Loading....</div>
    // }
    return (
        <AddObjectiveDescription onSubmit={objectiveDescriptionEditHandler}
            defaultValue={data}
            errorObjectiveDescription2 = {isError}
        />
    )

}

export default EditObjectiveDescription;



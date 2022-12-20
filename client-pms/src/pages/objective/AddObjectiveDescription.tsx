import React from "react";
import {
    useCreateObjectiveDescriptionMutation,
    useGetObjectiveDescriptionQuery,
} from "../../service";
import

    AddObjectiveDescriptionCom
    from "../../components/objective_old/AddObjectiveDescription";
import {useNavigate} from "react-router-dom";
import { VIEW_OBJECTIVE_DESCRIPTION } from "../../constants/routes/Routing";

export default function AddObjectiveDescription(props: any) {
    const navigate = useNavigate()

    const [createObjectiveDescription, {isSuccess, data, isError}] =
        useCreateObjectiveDescriptionMutation();

    const submitHandler = (objective_type: string, criteria: string, description: string, detailed_description: string) => {
        // navigate("/objective/get-objective-description");
        createObjectiveDescription({
            objective_type,
            criteria,
            description,
            detailed_description
        })
        .then((res: any) => {
            res.error ? <> </> : navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`)
        })
        // if (data && isError === false) {
        //     navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`);
        // }
    };
    return (
        <AddObjectiveDescriptionCom onSubmit={submitHandler}
                                    errorObjectiveDescription1={isError}
                                    data1={data}
        />
    );
}

import React from "react";
import {
  useDeleteObjectiveDescriptionMutation,
  useGetObjectiveDescriptionQuery,
} from "../../service";
import ViewObjectiveDescription from "../../components/objective_old/ViewObjectiveDescription";
import { useNavigate } from "react-router-dom";
import {EDIT_OBJECTIVE_DESCRIPTION, VIEW_OBJECTIVE_DESCRIPTION} from "../../constants/routes/Routing";

export default function ViewObjectiveDescriptionPage() {
  const navigate= useNavigate()

  
  const { data: objectiveDescriptionData } =
    useGetObjectiveDescriptionQuery("");
  const [objectiveDescriptionDelete] = useDeleteObjectiveDescriptionMutation();

  const objectiveDescriptionDeleteHandler = (id: string) => {
    objectiveDescriptionDelete(id);
  };

  const objectiveDescriptionEditHandler = (id: string) => {
    navigate(`${EDIT_OBJECTIVE_DESCRIPTION}/${id}`);


  };

  return (
    <ViewObjectiveDescription
      onDelete={objectiveDescriptionDeleteHandler}
      data={objectiveDescriptionData}
      onUpdate={objectiveDescriptionEditHandler}
    />
  );
}

import React from "react";
import {
  useCreateObjectiveTypeMutation,
  useGetObjectiveGroupQuery,
  useCreateObjectiveGroupMutation,
  useDeleteObjectiveGroupMutation,
  useGetObjectiveTypeQuery,
  useGetObjectiveDescriptionQuery,
  useDeleteObjectiveDescriptionMutation,
  useDeleteObjectiveTypeMutation,
  useUpdateObjectiveGroupMutation,
  useUpdateObjectiveTypeMutation,
} from "../../service/";
import Grid from "@mui/material/Grid";
import {
  ObjectiveDescription,
  ObjectiveGroup,
  ObjectiveType,
} from "../../components";
import { Container } from "@mui/material";
import PAMaster from "../../components/UI/PAMaster";
import { useParams } from "react-router-dom";

const Objectives = () => {
  const { id } = useParams();

  const [
    objectiveGroupMutation,
    { data, isLoading, isError: objectiveGroupError1 },
  ] = useCreateObjectiveGroupMutation();
  const [objectiveGroupDelete] = useDeleteObjectiveGroupMutation();

  const {
    data: objectiveType,
    isLoading: ObjectiveTypeLoading,
    refetch: ObjectiveTypeRefetch,
  } = useGetObjectiveTypeQuery("");

  const {
    data: ObjectiveGroupData,
    isLoading: ObjectiveGroupLoading,
    error: ObjectiveGroupError,
    refetch,
  } = useGetObjectiveGroupQuery("");

  console.log(objectiveType, "dta");

  const [
    createObjectiveType,
    {
      data: objectiveGroupData,
      isLoading: objectiveGroupLoading,
      isError: errorObjectiveType1,
    },
  ] = useCreateObjectiveTypeMutation();

  const [editObjectiveGroup, { isError: objectiveGroupError2 }] =
    useUpdateObjectiveGroupMutation();

  const [objectiveDescriptionDelete] = useDeleteObjectiveDescriptionMutation();
  const {
    data: objectiveDescriptionData,
    refetch: ObjectiveDescriptionRefetch,
  } = useGetObjectiveDescriptionQuery("");
  const [objectiveTypeDelete] = useDeleteObjectiveTypeMutation();
  const [objectivetypeEdit, { isError: errorObjectiveType2 }] =
    useUpdateObjectiveTypeMutation();

  const objectiveGroupClickHandler = (name: string) => {
    objectiveGroupMutation({
      name,
    });
  };


  const objectiveGroupDeleteHandler = (id: string) => {
    console.log("objectiveGroupDeleteHandler", id);
    const result = objectiveGroupDelete({
      id,
    });

    console.log(result);
    refetch();
  };

  const objectiveTypeClickHandler = (name: string, objective_group: string) => {
    createObjectiveType({
      name,
      objective_group,
    });
    ObjectiveTypeRefetch();
  };

  const objectiveTypeDeleteHandler = (id: string) => {
    console.log("objectiveTypeDeleteHandler", id);
    const result = objectiveTypeDelete(id);

    console.log(result);
  };

  const objectiveGroupEditHandler = (name: string) => {
    editObjectiveGroup({
      name,
      id,
    });
  };

  const objectiveTypeEditHandler = (name: string, objective_group: string) => {
    objectivetypeEdit({
      name,
      objective_group,
      id,
    });
  };

  const objectiveDescriptionDeleteHandler = (id: string) => {
    objectiveDescriptionDelete(id);
  };

  const { data: objectiveDescription } = useGetObjectiveDescriptionQuery("");

  return (
    <>
      <div style={{ background: "#F1F1F1" }}>
        <PAMaster name={"Performance Appraisal"} />
        <Container
          sx={{
            maxWidth: "96.5% !important",
            width: "100%",
            height: "calc(100vh - 90px)",
            background: "#FFF",
            paddingTop: "5px",
          }}
        >
          <Grid>
            <Grid container>
              <Grid item xs={4} paddingLeft="10px" paddingRight="10px">
                <ObjectiveGroup
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveGroupLoading}
                  onSubmit={objectiveGroupClickHandler}
                  onDelete={objectiveGroupDeleteHandler}
                  onEdit={objectiveGroupEditHandler}
                  errorGroup1={objectiveGroupError1}
                  errorGroup2={objectiveGroupError2}
                />
              </Grid>
              <Grid item xs={4} paddingLeft="10px" paddingRight="10px">
                <ObjectiveType
                  ObjectiveGroupData={ObjectiveGroupData}
                  loading={ObjectiveTypeLoading}
                  objectiveTypeData={objectiveType}
                  onSubmit={objectiveTypeClickHandler}
                  onDelete={objectiveTypeDeleteHandler}
                  onEdit={objectiveTypeEditHandler}
                  errorType1={errorObjectiveType1}
                  errorType2={errorObjectiveType2}
                />
              </Grid>
              <Grid item xs={4} paddingLeft="10px" paddingRight="10px">
                <ObjectiveDescription
                  objectiveDescriptionData={objectiveDescription}
                  onDelete={objectiveDescriptionDeleteHandler}
                />
              </Grid>

              
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Objectives;

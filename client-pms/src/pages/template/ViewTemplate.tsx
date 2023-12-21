/* eslint-disable */
import React from "react";
import ViewTemplate from "../../components/Template/ViewTemplate";
import { useGetTemplateQuery } from "../../service";
import { useDeleteTemplateMutation } from "../../service";

const ViewTemplatePage = () => {
  const { data } = useGetTemplateQuery("");
  const [ deleteTemplate,{error,isError} ] = useDeleteTemplateMutation()

 console.log (data)

 const deleteTemplateHandler = (id: string) => {
  console.log('clicked')
  deleteTemplate(
      id
  )
  // .then(() => refetch())
}

  return <ViewTemplate ViewTemplateData = {data} onDelete={deleteTemplateHandler} deleteError = {isError}/>;
};

export default ViewTemplatePage;





/* eslint-disable */
import React, { useState } from 'react';
import ViewTemplate from "../../components/Template/ViewTemplate";
import { useGetTemplateQuery } from "../../service";
import { useDeleteTemplateMutation } from "../../service";
import {  useGetCurrentAppraisalCalenderQuery } from '../../service/appraisalCalender/AppraisalCalender';

const ViewTemplatePage = () => {
  const { data } = useGetTemplateQuery("");
  const [deleteTemplate, { error, isError }] = useDeleteTemplateMutation();
  const { data: appraisalCalendarData, isLoading: isDataLoading } =
    useGetCurrentAppraisalCalenderQuery("");

  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setOpen(false);
  };

  console.log(data,"GetTemplate")

  const deleteTemplateHandler = (id: string) => {
    console.log('clicked')
    deleteTemplate(
      id
    ).then((res: any) => {
      res.error ? <> </> :
        setOpen(true)

    })
    // .then(() => refetch())
  }

  return <ViewTemplate
    ViewTemplateData={data}
    onDelete={deleteTemplateHandler}
    deleteError={isError}
    errorMSG={error}
    successfullyDeletedAlert={open}
    successfullyDeletedAlertClose={handleClickClose}
    appraisalCalendarData={appraisalCalendarData}
    
  />;
};

export default ViewTemplatePage;





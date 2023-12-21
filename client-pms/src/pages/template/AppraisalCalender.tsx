import React from 'react';
import CreateCalender from "../../components/Template/PACalendar";
import {
    useGetAppraisalCalenderQuery,
    useStartAppraisalCalenderMutation,
    useDeleteAppraisalCalenderMutation, useAppraisalCalenderFiltersQuery
} from "../../service";
import {useUpdateAppraisalCalenderMutation} from "../../service/appraisalCalender/AppraisalCalender";



const AppraisalCalenderPage = () => {

    const {data,isLoading} = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')
    const [ deleteAppraisalCalender,{error} ] = useDeleteAppraisalCalenderMutation ()
    const [start ] = useStartAppraisalCalenderMutation()
    const [updateCalender ]  = useUpdateAppraisalCalenderMutation()

    console.log(data)

    const deleteAppraisalCalenderHandler = (id: string) => {
        console.log('clicked')
        deleteAppraisalCalender(
            id
        )
        // .then(() => refetch())
      }

    const pauseAppraisalCalenderHandler = (id: string) => {
        console.log('clicked')
        updateCalender({
            status: 'inactive',
            id
        })
        // .then(() => refetch())
    }
    return (
        <div>

            <CreateCalender data ={data} isLoading={isLoading} onDelete={deleteAppraisalCalenderHandler} start={start} onPause={pauseAppraisalCalenderHandler}/>

        </div>
    );
};


export default AppraisalCalenderPage;
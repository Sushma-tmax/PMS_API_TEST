import MidyearPerformance from '../../components/midyearperformanceappraisal/MidyearPerformance';
import { useAcceptAppraisalEmployeeMutation, useGetEmployeeAppraisalQuery, useGetRatingScaleQuery } from '../../service';
import { useParams, useNavigate } from "react-router-dom";
import { MIDYEAR_PA_REPORT } from '../../constants/routes/Routing';
import MidyearPerformanceRejected from '../../components/midyearperformanceappraisal/MidYearPerformanceRejected';


const PerformancePageRejected = () => {
const { employee_id } = useParams()
const { data, isLoading } =  useGetEmployeeAppraisalQuery(employee_id)
const {data:ratingScaleData} = useGetRatingScaleQuery("")
console.log(employee_id,'employee_id')
const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation()
const navigate = useNavigate()

const acceptAppraisalHandler = (id: string) => {
    if(employee_id) {
        return accept( employee_id )
        .then((res: any) => {
            res.error ? <> </> : navigate(`${MIDYEAR_PA_REPORT}/employee/${employee_id}`)
        })
    }
}
    


if(isLoading) {
    return <p>Loading...</p>
}
return (<div>

    <MidyearPerformanceRejected employeeData = {data} onSubmit={acceptAppraisalHandler} ratingScaleData={ratingScaleData}/>

</div>);
};

export default PerformancePageRejected 
import MidyearPerformance from '../../components/midyearperformanceappraisal/MidyearPerformance';
import { useAcceptAppraisalEmployeeMutation, useGetEmployeeAppraisalQuery, useGetRatingScaleQuery } from '../../service';
import { useParams, useNavigate } from "react-router-dom";
import { MIDYEAR_PA_REPORT, MIDYEAR_PERFORMANCE_REJECTED } from '../../constants/routes/Routing';


const PerformancePage = () => {
const { employee_id } = useParams()
const { data, isLoading } =  useGetEmployeeAppraisalQuery(employee_id)
const {data:RatingsData} = useGetRatingScaleQuery("")

console.log(employee_id,'employee_id')
const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation()
const navigate = useNavigate()

const acceptAppraisalHandler = (id: string) => {
    if(employee_id) {
        return accept( employee_id )
        .then((res: any) => {
            res.error ? <> </> : navigate(`${MIDYEAR_PERFORMANCE_REJECTED}/employee/${employee_id}`)          
        })
    }
}
    


if(isLoading) {
    return <p>Loading...</p>
}
return (<div>

    <MidyearPerformance employeeData = {data} onSubmit={acceptAppraisalHandler} ratingData = {RatingsData}/>

</div>);
};

export default PerformancePage;
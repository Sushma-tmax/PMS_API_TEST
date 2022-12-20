import React from 'react';
import CreateTemplate from '../../components/Template_old/CreateTemplate_Old';
import {
    useCreateTemplateMutation,
    useGetCalenderQuery,
    useGetObjectiveDescriptionQuery,
    useGetObjectiveTypeQuery,
    useGetTemplateQuery
} from '../../service';


const CreateTemplatePage = () => {

    const {data} = useGetObjectiveTypeQuery('')

    const {data: descriptionData} = useGetObjectiveDescriptionQuery('')
    const [createTemplate,{error, isError,data: loadingTemp}] = useCreateTemplateMutation()
    const {data: calenderData} = useGetCalenderQuery('')
    const {data:templateData, isLoading} = useGetTemplateQuery('')


    const creatTemplateHandler = (values: any) => {
        return createTemplate(values)
        console.log(values);
    }
    console.log(descriptionData)

    // if(loadingTemp) {
    //     return <p>Loadingg... </p>
    // }

    if(isLoading) {
        return <div>Loading...</div>
    }

   
    return (<div>
        <CreateTemplate typeData={data} descriptionData={descriptionData}
                        onSubmit={creatTemplateHandler}
                        isLoading={isLoading}
                        calenderData={calenderData}
                        loadingTemp={loadingTemp}
                        templateData ={templateData}
                        duplicateError={error}
                        isError={isError}/>

    </div>);
};

export default CreateTemplatePage;

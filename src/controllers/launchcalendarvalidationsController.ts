import asyncHandler from "../middleware/asyncHandler";
import { Request, Response } from "express";
import launchcalendarvalidations from "../models/launchcalendarvalidations";
import { StatusCodes } from "http-status-codes";
import { Employee } from "../models";
import mongoose from 'mongoose';
import AppraisalCalender from "../models/AppraisalCalender";
import Template from "../models/Template";
import _ from "lodash";
import { TreeItem } from "@mui/lab";
import Calender from "../models/Calender";
import { ObjectId } from 'mongodb';

const validations = asyncHandler(async (req: Request, res: Response) => {
  //console.log(req,"backend")

  let changedvalidations: any;
  changedvalidations = await launchcalendarvalidations.find();

  res.status(StatusCodes.OK).json({
    data: changedvalidations,
  });

  console.log(changedvalidations, "changedvalidations");
});

const getIdFromRating = (arr: any) => {
  return arr.map((item: any) => {
    return {
      name: item._id,
    }
  })
}

const getNameRec = (arr: any) => {
  return arr.map((item: any) => {
    return {
      name: item.name,
      isChecked: false
    }
  })
}

const getEmployeeLaunchAppraisalDetails = (weightage, calendarID,training_recommendation,other_recommendation,feedback_questionnaire) => {

  const appraisal = {
    objective_group: weightage.objective_group,
    objective_type: weightage.objective_type,
    objective_description: weightage.objective_description,
    training_recommendation: getNameRec(training_recommendation),
    other_recommendation: getNameRec(other_recommendation),
    feedback_questionnaire: getNameRec(feedback_questionnaire),
    // potential: potential,
    // rating: getIdFromRating(ratingScale)
  }
  return {
    live_employee_upload_flag: false,
    employee_upload_flag: true,
    appraisal_template: appraisal,
    reviewerIsChecked: false,
    reviewerIsDisabled: true,
    normalizerIsChecked: false,
    normalizerIsDisabled: true,
    appraiserIsDisabled: true,
    appraiserIsChecked: false,
    calendar: new mongoose.Types.ObjectId(calendarID),
    activity_Log: [],
    appraisal: {
      appraiser_status: 'pending',
      status: 'not-started',
      pa_status: 'Pending with Appraiser',
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
      appraiser_rating: 0,
      training_recommendation: [],
      other_recommendation: [],
      other_recommendation_comments: '',
      training_recommendation_comments: '',
      feedback_questions: [],
      area_of_improvement: [],
      attachments: [],
      appraiser_PA_rejected: false,
      appraiser_PA_accepted: false,
      potential: ''
    },
    current_rating: {
      overall_rating: 0,
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
    },
    current_previous_submission: {
      overall_rating: 0,
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
    },
    appraisal_previous_rating: {
      overall_rating: 0,
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
    },
    appraisal_previous_submission: {
    },
    reviewer: {
      status: 'not-started',
      reviewer_status: 'pending',
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
      reviewer_rating: 0,
      reviewer_rejected_value: [],
      training_recommendation: [],
      other_recommendation: [],
      other_recommendation_comments: '',
      training_recommendation_comments: '',
      feedback_questions: [],
      area_of_improvement: [],
      attachments: [],
      reviewer_PA_rejected: false,
      reviewer_PA_accepted: false
    },
    reviewer_previous_submission: {
    },
    normalizer: {
      status: 'not-started',
      objective_group: weightage.objective_group,
      objective_type: weightage.objective_type,
      objective_description: weightage.objective_description,
      normalizer_status: 'pending',
      normalizer_rating: 0,
      normalizer_rejected_value: [],
      training_recommendation: [],
      other_recommendation: [],
      other_recommendation_comments: '',
      training_recommendation_comments: '',
      feedback_questions: [],
      area_of_improvement: [],
      attachments: [],
      normalizer_PA_rejected: false,
      normalizer_PA_accepted: false
    },
    normalizer_previous_submission: {
    },
    employee: {},
    employee_previous_submission: {
    },
    talent_category: "",
  }
}

const confirmEmployeeMasterList = asyncHandler(async (req: Request, res: Response) => {
  const { confirmEmployeeMaster } = req.body;
  const liveemployeeData = await Employee?.find({
    live_employee_upload_flag: true,
    isCEORole: false,
    isExcluded: false,
    isLeavers: false,
  });
  if (liveemployeeData?.length > 0) {
  const activeCalendars = (await AppraisalCalender?.find({
    status: 'active'
  }))?.map(item => String(item.template));
  const completedTemplates = await Template?.find({
    status_template: 'Completed'
  });
  const getLiveCalendar = (await Calender?.findOne({ status: "Live" }));
  const { name: calendarName, _id: calendarID } = getLiveCalendar
 

  const groupDataByTemplateName = _.groupBy(liveemployeeData, 'TemplateName');
  const groupedData: any = Object.entries(groupDataByTemplateName);

  const mappedTemplates: any = groupedData?.map(item => {
    return {
      template: completedTemplates?.find(templateItem => templateItem.name == item[0])?._id,
      position: item[1]?.map((mappedItem: any) => {
        console.log(mappedItem._id, 'checkidd')
        return {
          name: mappedItem._id,
          isChecked: true,

        }
      })
    };
  });

  let templateExistsInAppraisalCalendar = [];
  let templateNotExistInAppraisalCalendar = []

  mappedTemplates?.length > 0 && mappedTemplates?.map((item: any) => {
    if (activeCalendars?.includes((item.template).toString())) {
      templateExistsInAppraisalCalendar?.push(item);
    } else {
      templateNotExistInAppraisalCalendar?.push(item)
    }
  })

  //func start :adding employees to appraisal calendar which already exists
  templateExistsInAppraisalCalendar?.forEach(async (item: any) => {
    console.log(`Processing item with template: ${item.template}`);

    const validateTemplate = await Template.findOne({ _id: item.template });
    const {
      name: templateName,
      other_recommendation,
      training_recommendation,
      // position,
      calendar,
      weightage,
      feedback_questionnaire
    } = validateTemplate;

    let employeesDetails = await getEmployeeLaunchAppraisalDetails(weightage, calendarID,training_recommendation,other_recommendation,feedback_questionnaire)
    item.position.forEach(async (employeeId) => { 
      try {
            const employee = await Employee.updateMany({
              "_id" : employeeId.name,
              "live_employee_upload_flag": true,
              "isLeavers": false,
              "isExcluded": false,
              "isCEORole": false
            },
              {
                $set: employeesDetails
              },
              { multi: true });
            // console.log(`${employeeUpdateResult.modifiedCount} employees updated successfully.`);
          } catch (error) {
            console.error("employees updated  An error occurred while updating employees:", error);
          }
    })
   

       try {
      // Check if the document exists in the AppraisalCalender collection
      const existingDocument = await AppraisalCalender.findOne({ 'template': item.template, 'status': 'active' });

      if (existingDocument) {
        console.log(`Found existing document for template: ${item.template}`);

        // Prepare an array of unique positions to be added
        const uniquePositions = item.position.filter(posItem => {
          return !existingDocument.position.some(pos => pos.name.equals(new ObjectId(posItem.name)));
        });

        // Add unique positions to the existing document
        if (uniquePositions.length > 0) {
          await AppraisalCalender.updateOne(
            { 'template': item.template, 'status': 'active' },
            { $addToSet: { position: { $each: uniquePositions } } }
          );
          console.log(`Positions added to AppraisalCalender with template: ${item.template}`);
        } else {
          console.log(`No new positions to add to AppraisalCalender with template: ${item.template}`);
        }
      } else {
        console.log(`AppraisalCalender with template ${item.template} not found`);
      }
    } catch (error) {
      console.error(`Error updating AppraisalCalender with template ${item.template}:`, error);
    }
  });
  //func end :adding employees to appraisal calendar which already exists



  //func start :adding employees to appraisal calendar which does not exist
  templateNotExistInAppraisalCalendar?.length > 0 &&
    templateNotExistInAppraisalCalendar?.forEach(async (item: any) => {
      const validateTemplate = await Template.findOne({ _id: item.template });
      const {
        name: templateName,
        other_recommendation,
        training_recommendation,
        // position,
        calendar,
        weightage,
        feedback_questionnaire
      } = validateTemplate;

      const name = `${templateName} ${calendarName}`;

      const Acalender = await AppraisalCalender.create({
        name,
        calendar: calendarID,
        template: item.template,
        other_recommendation,
        training_recommendation,
        position: item.position,
        weightage,
        feedback_questionnaire,
        status: "active"
      })

       let employeesDetails = await getEmployeeLaunchAppraisalDetails(weightage, calendarID,training_recommendation,other_recommendation,feedback_questionnaire)
       item.position.forEach(async (employeeId) => { 
        try {
              const employee = await Employee.updateMany({
                "_id" : employeeId.name,
                "live_employee_upload_flag": true,
                "isLeavers": false,
                "isExcluded": false,
                "isCEORole": false
              },
                {
                  $set: employeesDetails
                },
                { multi: true });
              // console.log(`${employeeUpdateResult.modifiedCount} employees updated successfully.`);
            } catch (error) {
              console.error("employees updated  An error occurred while updating employees:", error);
            }
      })

    })
  //func end :adding employees to appraisal calendar which already exists
}




















  /* function start : function to find unmapped employees from the employee master */

  // const unmappedEmployees = await Employee.find({ employee_upload_flag: false, isLeavers: false })

  // if (unmappedEmployees.length > 0) {
  //     return res.status(400).json({
  //         message: `There are ${unmappedEmployees.length} unmapped employees.`,
  //         data: unmappedEmployees
  //     });
  // }

  /* function end : function to find unmapped employees from the employee master */

  /* Function start : to check whether appraiser code , reviewer code and normalizer code exists in the employee master
       and if yes then check whether their respective names matches their respective codes */
  // const employeeData = await Employee.find({
  //   employee_upload_flag: true,
  //   isCEORole: false,
  //   isExcluded: false,
  //   isLeavers: false,
  // });
  // let errorMessage = "";

  // // create a set of unique appraiser, reviewer, and normalizer codes
  // const appraiserCodes = new Set(
  //   employeeData.map((item) => item.appraiser_code)
  // );
  // const reviewerCodes = new Set(employeeData.map((item) => item.reviewer_code));
  // const normalizerCodes = new Set(
  //   employeeData.map((item) => item.normalizer_code)
  // );
  // const managerCodes = new Set(
  //   employeeData.map((item) => item.manager_code)
  // );

  // // retrieve all employees with these codes
  // const employeesWithCodes = await Employee.find({
  //   employee_code: {
  //     $in: [...appraiserCodes, ...reviewerCodes, ...normalizerCodes, ...managerCodes],
  //   },
  // });

  // employeeData.forEach((item: any) => {
  //   const employeeCode = item.employee_code;
  //   const appraiserCode = item.appraiser_code;
  //   const appraiserName = item.appraiser_name;
  //   const reviewerCode = item.reviewer_code;
  //   const reviewerName = item.reviewer_name;
  //   const normalizerCode = item.normalizer_code;
  //   const normalizerName = item.normalizer_name;
  //   const managerCode = item.manager_code;
  //   const managerName = item.manager_name;

  //   /***********No need to check for employee names, just check whether employee codes exist************/

  //   // // find the employee with the corresponding appraiser code
  //   // const employeeWithAppraiserCode = employeesWithCodes.find(
  //   //   (employee) => employee.employee_code === appraiserCode
  //   // );
  //   // if (employeeWithAppraiserCode) {
  //   //   const employeeAppraiserName = employeeWithAppraiserCode.legal_full_name;
  //   //   if (employeeAppraiserName !== appraiserName) {
  //   //     errorMessage += `Appraiser name '${appraiserName}' is not correct for employee code '${employeeCode}'.\n`;
  //   //   }
  //   // } else {
  //   //   errorMessage += `Appraiser code '${appraiserCode}' does not exist for employee code '${employeeCode}'..\n`;
  //   // }

  //   // // find the employee with the corresponding reviewer code
  //   // const employeeWithReviewerCode = employeesWithCodes.find(
  //   //   (employee) => employee.employee_code === reviewerCode
  //   // );
  //   // if (employeeWithReviewerCode) {
  //   //   const employeeReviewerName = employeeWithReviewerCode.legal_full_name;
  //   //   if (employeeReviewerName !== reviewerName) {
  //   //     errorMessage += `Reviewer name '${reviewerName}' is not correct for employee code '${employeeCode}'.\n`;
  //   //   }
  //   // } else {
  //   //   errorMessage += `Reviewer code '${reviewerCode}' does not exist.\n`;
  //   // }

  //   // // find the employee with the corresponding normalizer code
  //   // const employeeWithNormalizerCode = employeesWithCodes.find(
  //   //   (employee) => employee.employee_code === normalizerCode
  //   // );
  //   // if (employeeWithNormalizerCode) {
  //   //   const employeeNormalizerName = employeeWithNormalizerCode.legal_full_name;
  //   //   if (employeeNormalizerName !== normalizerName) {
  //   //     errorMessage += `Normalizer name '${normalizerName}' is not correct for employee code '${employeeCode}'.\n`;
  //   //   }
  //   // } else {
  //   //   errorMessage += `Normalizer code '${normalizerCode}' does not exist.\n`;
  //   // }

  //   // // find the employee with the corresponding manager code
  //   // const employeeWithManagerCode = employeesWithCodes.find(
  //   //   (employee) => employee.employee_code === managerCode
  //   // );
  //   // if (employeeWithManagerCode) {
  //   //   const employeeManagerName = employeeWithManagerCode.legal_full_name;
  //   //   if (employeeManagerName !== managerName) {
  //   //     errorMessage += `Manager name '${managerName}' is not correct for employee code '${employeeCode}'.\n`;
  //   //   }
  //   // } else {
  //   //   errorMessage += `Manager code '${managerCode}' does not exist.\n`;
  //   // }


  //   /**** Check whether employee codes exist *************/
  //   // find the employee with the corresponding appraiser code
  //   const employeeWithAppraiserCode = employeesWithCodes.find(
  //     (employee) => employee.employee_code === appraiserCode
  //   );
  //   if (!employeeWithAppraiserCode) {
  //     errorMessage += `Appraiser code '${appraiserCode}' does not exist for employee code '${employeeCode}'..\n`;
  //   }

  //   // find the employee with the corresponding reviewer code
  //   const employeeWithReviewerCode = employeesWithCodes.find(
  //     (employee) => employee.employee_code === reviewerCode
  //   );
  //   if (!employeeWithReviewerCode) {
  //     errorMessage += `Reviewer code '${reviewerCode}' does not exist.\n`;
  //   }

  //   // find the employee with the corresponding normalizer code
  //   const employeeWithNormalizerCode = employeesWithCodes.find(
  //     (employee) => employee.employee_code === normalizerCode
  //   );
  //   if (!employeeWithNormalizerCode) {
  //     errorMessage += `Normalizer code '${normalizerCode}' does not exist.\n`;
  //   }

  //   // find the employee with the corresponding manager code
  //   const employeeWithManagerCode = employeesWithCodes.find(
  //     (employee) => employee.employee_code === managerCode
  //   );
  //   if (!employeeWithManagerCode) {
  //     errorMessage += `Manager code '${managerCode}' does not exist.\n`;
  //   }
  // });

  // if (errorMessage !== "") {
  //   /* If any of the codes do not exist in the database, throw an error with the error message */
  //   return res.status(400).json({
  //     message: errorMessage,
  //   });
  // }


  //  // Loop through each active calendar
  //  activecalenders.forEach(calendar => {
  //      // Check if the calendar has a corresponding template in templateEmployeeMap
  //      if (templateIds.includes(calendar.template.toString())) {
  //          // Get the template from templateEmployeeMap
  //          const templateEmployees = templateEmployeeMap[calendar.template.toString()];
  //          calendar.position.push(...templateEmployees);
  //      }
  //  });
  //  console.log(activecalenders)
  /* Function end : to check whether appraiser code , reviewer code and normalizer code exists in the employee master*/


  // if (errorMessage == "") {
    const employeeVal = await launchcalendarvalidations.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        $set: {
          confirmEmployeeMaster: confirmEmployeeMaster,
        },
      }
    );
    res.status(StatusCodes.OK).json({    
      data: employeeVal,     
    });
  // }
});



const reminderNotificationStatus = asyncHandler(async (req: Request, res: Response) => {
  //console.log(req,"backend")

  let changedvalidations: any;
  changedvalidations = await launchcalendarvalidations.find();

  res.status(StatusCodes.OK).json({
    data: changedvalidations,
  });

  console.log(changedvalidations, "changedvalidations");
});
const reminderNotificationStatusUpdate = asyncHandler(async (req: Request, res: Response) => {
  // const { confirmEmployeeMaster } = req.body;
  const { reminderStatus, id } = req.body;
  // Log the ID to check if it's correctly received
console.log("ID from body:", id);
console.log("Request Body:", req.body);

if (!id) {
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: "ID is required",
  });
}

// Ensure the ID is a valid ObjectId
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(StatusCodes.BAD_REQUEST).json({
    error: "Invalid ID format",
  });
}

try {
  const employee = await launchcalendarvalidations.updateOne(
    { _id: id },
    { $set: { reminderNotificationStatus: reminderStatus } },
    { upsert: false } // Ensure upsert is false to avoid creating new documents
  );

  if (employee.modifiedCount === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Employee not found or no changes made",
    });
  }

  res.status(StatusCodes.OK).json({
    data: employee,
  });
} catch (error) {
  console.error("Update error:", error);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "An error occurred during the update",
  });
}
  //   const employeeVal = await launchcalendarvalidations.findByIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     {
  //       new: true,
  //       runValidators: true,
  //       $set: {
  //         reminderNotificationStatus: confirmEmployeeMaster,
  //       },
  //     }
  //   );
  //   res.status(StatusCodes.OK).json({
  //     data: employeeVal
  //   });
});

const employeesWithoutEmail = asyncHandler(async (req: Request, res: Response) => {
  const employees = await Employee.find({ "employee_upload_flag" : true, "isGradeException": false , "isLeavers" : false, "isExcluded" : false});
  const filteredEmployeesWithoutEmail = employees.filter((item: any) => item.email == "" || item.email == undefined)
  res.status(StatusCodes.OK).json({
      data: filteredEmployeesWithoutEmail      
  });
})

export { validations, confirmEmployeeMasterList, reminderNotificationStatus, reminderNotificationStatusUpdate, employeesWithoutEmail };

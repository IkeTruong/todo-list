import * as yup from 'yup'

const validationTitleTxt = 'Title is required'
const validationDescTxt = 'Description is required'
const validationPriorityTxt = 'Priority is required'
const validationStatusTxt = 'Completion status is required'

export const validationSchema = yup.object().shape({
  title: yup.string().required(validationTitleTxt),
  description: yup.string().required(validationDescTxt),
  priority: yup.string().required(validationPriorityTxt),
  completionStatus: yup.string().required(validationStatusTxt),
})

import * as yup from 'yup';

export const createSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  dob: yup.date().required('Date of birth is required'),
  workfrom: yup.date().required('Work from is required'),
  workto: yup
    .date()
    .required('Work to is required')
    .min(yup.ref('workfrom'), 'Work to must be after Work from'),
});

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { errorHelper, Loader } from '../../../../utils/tools';

import {
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';

import { changeEmail } from '../../../../store/actions/users';

const EmailStepper = ({ user, closeModal }) => {
    console.log(user, 'EmailStepper')
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        'Enter old email',
        'Enter new email',
        'Are you sure?'
    ];
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {email:'', newEmail:''},
        validationSchema: Yup.object({
            email: Yup.string()
            .required("This is required")
            .email("This is not a valid email")
            .test('match','Please check your email', (email) => {
                return email === user.data.email
            }),
            newEmail: Yup.string()
            .required("This is required")
            .email("This is not a valid email")
            .test('equal','Enter a different email', (newEmail) => {
                return newEmail !== user.data.email
            })
        }),
        onSubmit: (values) => {
            console.log(values, 'onSubmit')
            dispatch(changeEmail(values))
            .unwrap()
            .then( () => {
                closeModal();
            })
        }
    });

    const handleNext = () => {
        setActiveStep( (prevActiveStep) => prevActiveStep + 1)
    }
    const handleBack = () => {
        setActiveStep( (prevActiveStep) => prevActiveStep - 1)
    }

    const backBtn = () => (
        <Button className='mt-3 me-2' variant='contained' color='primary' onClick={handleBack}>
           Back
        </Button>
    )
   
    const nextBtn = () => (
        <Button className='mt-3' variant='contained' color='primary' onClick={handleNext}>
            Next
        </Button>
    )
    
    return (
        <>
            {user.loading
                ? <Loader/>
                : <>
                    <Stepper activeStep={activeStep}>
                        {steps.map (label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>   
                    <form className='mt-3 stepper_form' onSubmit={formik.handleSubmit}>
                        { activeStep === 0
                            ? <div className='form-group'>
                                <TextField
                                    style={{width:'100%'}}
                                    name="email"
                                    label="Enter you current email"
                                    variant='outlined'
                                    {...formik.getFieldProps('email')}
                                    {...errorHelper(formik,'email')}
                                />
                                {formik.values.email && !formik.errors.email
                                    ? nextBtn()
                                    : null
                                }
                            </div>

                            : null
                        }
                        { activeStep === 1
                            ? <div className='form-group'>
                                <TextField
                                    style={{width:'100%'}}
                                    name="newEmail"
                                    label="Enter you new email"
                                    variant='outlined'
                                    {...formik.getFieldProps('newEmail')}
                                    {...errorHelper(formik,'newEmail')}
                                />
                                { backBtn() }
                                {formik.values.newEmail && !formik.errors.newEmail
                                    ? nextBtn()
                                    : null
                                }
                            </div>

                            : null
                        }
                        {activeStep === 2
                            ? <div className='form-group'>
                                <Button className='mt-3 me-2' variant='contained' color="primary" onClick={formik.submitForm}>
                                    Yes, change my email
                                </Button>
                                { backBtn() }
                            </div>
                            : null
                        }
                    </form>            
                </>
            }
        </>
    )
}
export default EmailStepper;
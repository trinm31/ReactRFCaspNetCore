import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notification from '../../layouts/Notification';


import { accountService } from '../../_services';

function ForgotPassword() {
    const initialValues = {
        email: ''
    };

    const [notify, setNotify] = useState({isOpen: false});

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    });

    function onSubmit({ email }, { setSubmitting }) {
        accountService.forgotPassword(email)
            .then(() => 
                setNotify({isOpen: true, message: "Please Check your email"})
            )
            .catch(error => setNotify({isOpen: true, message: `${error}`}))
            .finally(() => setSubmitting(false));
    }

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <h3 className="card-header">Forgot Password</h3>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Submit
                                    </button>
                                    <Link to="login" className="btn btn-link">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>  
            <Notification
            {...{notify,setNotify}}>
            </Notification>
        </>      
    )
}

export { ForgotPassword }; 
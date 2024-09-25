//React import
import React from 'react';

//Styles import
import styles from './login.module.css';

//Components imports
import InvalidFeedback from './InvalidFeedback';
import Button from '../shared/Button';

//Library import
import { useForm } from 'react-hook-form';

const RegisterForm = ({
    handleRegister,
    loading,
    messageError,
    handleViewPassword,
    passwordVisible,
    handleLogin
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <>
            <form className={`d-flex flex-column ${styles['form-custom']}`}
                onSubmit={handleSubmit(handleRegister)}>

                {loading && <div className="d-flex justify-content-center mb-2">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}

                {messageError && <div className="alert alert-danger p-2 d-flex align-items-center"
                    role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <div>{messageError}</div>
                </div>}

                <div className="d-flex flex-row justify-content-between mb-2">
                <div className={`${styles['width-45']}`}>
                    <input className={`form-control border border-0 ${styles['form-control-custom']} ${errors.name && 'is-invalid'}` }
                        type="text"
                        id="name"
                        name="name"
                        {...register(
                            'name',
                            {
                                required: 'You must enter a name.',
                                maxLength: {
                                    value: 255,
                                    message: 'The maximum length is 255 characters.'
                                }
                            })
                        }
                        placeholder="Name"
                        disabled={loading} />
                    {errors.name && <InvalidFeedback message={errors.name.message} />}
                </div>

                    <div className={`${styles['width-45']}`}>
                        <input className={`form-control border border-0 ${styles['form-control-custom']} ${errors.email && 'is-invalid'}`}
                            type="email"
                            id="email"
                            name="email"
                            {...register(
                                'email',
                                {
                                    required: 'You must enter an email.',
                                    maxLength: {
                                        value: 40,
                                        message: 'The maximum length is 40 characters.'
                                    }
                                })
                            }
                            placeholder="Email"
                            disabled={loading} />
                        {errors.email && <InvalidFeedback message={errors.email.message} />}
                    </div>
                </div>

                <div className="input-group mb-4">
                        <input className={`form-control border border-0 ${styles['form-control-custom']} ${errors.password && 'is-invalid'}`}
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            {...register(
                                'password',
                                {
                                    required: 'You must enter a password.',
                                })
                            }
                            placeholder="Password"
                            disabled={loading} />
                        <button className={`btn rounded-end ${styles['button-custom']} ${styles['visible-button']}`}
                            type="button"
                            onClick={handleViewPassword}>
                            <i className={`bi ${passwordVisible ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                        </button>
                        {errors.password && <InvalidFeedback message={errors.password.message} />}
                    </div>

                <Button 
                type="submit" 
                disabled={loading} 
                text="Register Account" 
                customColor="btn-secondary-custom" 
                rounded="rounded-pill"/>

                { !loading &&<p className={`mt-2 ${styles['secondary-text']}`}>Already have an account? <span onClick={handleLogin}>Login</span></p>}
            </form>
        </>
    );
};

export default RegisterForm;
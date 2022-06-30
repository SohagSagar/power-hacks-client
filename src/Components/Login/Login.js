import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../Hooks/firebase.init';
import Loading from '../Hooks/Loading';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useToken from '../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token]=useToken(user);

    //getting form data
    const onSubmit = data => {
        signInWithEmailAndPassword(data?.email, data?.password);
        // reset();
    }

    useEffect(()=>{
        if (token) {
            toast.success('User Logged in Successfully', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            navigate('/');
        }

    },[token,navigate]) 

    

    //handle all errors//
    useEffect(() => {
        if (error) {
            const message = error?.code.split('/')[1];
            setErrorMessage(message)
        } else {
            setErrorMessage('')
        }
    }, [error])


    if (loading) {
        return <Loading />
    }
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold whitespace-nowrap mb-3">Login now!</h1>
                    <h3>New Here? <Link className='font-bold' to={'/registration'}>Register First</Link></h3>

                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* errors alert message */}

                            {
                                errorMessage &&
                                <div className="alert shadow-lg h-10 text-center mt-5">
                                    <div className='flex justify-center mx-auto'>
                                        <small className='text-red-500 text-center uppercase'>{errorMessage}</small>
                                    </div>
                                </div>
                            }

                            {/* Email field */}
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[12px] ">Email</span>
                                </label>
                                <input {...register('email', {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Invalid Email"
                                    }
                                })} type="Email" placeholder="TYPE YOUR EMAIL" className="input input-bordered" />
                                <label className="label">
                                    {
                                        errors?.email?.type === 'required' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.email.message}</span>
                                    }
                                    {
                                        errors?.email?.type === 'pattern' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.email.message}</span>
                                    }

                                </label>
                            </div>

                            {/* password field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-[12px]">Password</span>
                                </label>
                                <input {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Minimum length should be 6.'
                                    }
                                })} type="password" placeholder="TYPE YOUR PASSWORD" className="input input-bordered" />

                                <label className="label">
                                    {
                                        errors?.password?.type === 'required' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.password.message}</span>
                                    }
                                    {
                                        errors?.password?.type === 'minLength' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.password.message}</span>
                                    }

                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <button type='submit' class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../Hooks/firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Hooks/Loading';
import { MdError } from 'react-icons/md';
import useToken from '../Hooks/useToken';

const Registration = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token]=useToken(user)
    const navigate = useNavigate();


    // GET FORM DATA
    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data?.email, data?.password);
        await updateProfile({ displayName: data?.name });

        // fetch('http://localhost:5000/api/registration',{
        //     method:'POST',
        //     headers:{
        //         'content-type':'application/json'
        //     },
        //     body:JSON.stringify(data)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     if(data.insertedId){
        //         toast.success('User Registered Successfully', {
        //             position: toast.POSITION.BOTTOM_CENTER
        //         })
        //         navigate('/login')
        //     }else{
        //         toast.error('Fail to Register.Try Again.', {
        //             position: toast.POSITION.BOTTOM_CENTER
        //         })
        //     }
        // })
    }
    
    if (token) {
        toast.success('User Registered Successfully', {
            position: toast.POSITION.BOTTOM_CENTER
        })
        navigate('/');
    }

    // SET ERROR MESSAGES
    useEffect(() => {
        if (error || updateError) {
            const message = error?.code.split('/')[1] || updateError?.code.split('/')[1];
            setErrorMessage(message)
        } else {
            setErrorMessage('')
        }
    }, [error, updateError]);

    // SHOWING LOADDING STATUS
    if (updating || loading) {
        return <Loading />
    }
    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold whitespace-nowrap mb-3">Register now!</h1>
                    <h3>Already Have an Account? <Link className='font-bold' to={'/login'}>Login First</Link></h3>
                </div>

                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* SHOWING LOGIN ERRORS */}
                            {
                                errorMessage &&
                                <div className="alert  shadow-md">
                                    <span className='mx-auto font-semibold text-[14px] text-red-600'><MdError />{errorMessage}</span>
                                </div>
                            }

                            {/* name field */}
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[12px] ">Name</span>
                                </label>
                                <input {...register('name', {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }

                                })} type="text" placeholder="TYPE YOUR EMAIL" className="input input-bordered" />
                                <label className="label">
                                    {
                                        errors?.name?.type === 'required' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.name.message}</span>
                                    }
                                </label>
                            </div>

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
                                <button type='submit' class="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;   
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Registration = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // GET FORM DATA
    const onSubmit = data => {
        console.log(data);
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
                                        message: 'Password field is required'
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
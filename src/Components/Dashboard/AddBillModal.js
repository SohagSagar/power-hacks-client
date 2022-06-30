import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../Hooks/firebase.init';
import { toast } from 'react-toastify';
import Loading from '../Hooks/Loading';


const AddBillModal = ({ setModalStatus }) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [user, loading, error] = useAuthState(auth);
    if(loading){
        return <Loading/>
    }

    const onSubmit = data => { 
        console.log(data);

         fetch('http://localhost:5000/api/add-billing',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                toast.success('Bill Added Successfully', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
                setModalStatus(false)
            }else{
                toast.error('Fail to add.Try Again.', {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <legend className='text-center'>Billing Info</legend><hr className='mb-5' />
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto font-semibold w-[300px]">
                        <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                        {/* ------customer info ------- */}

                        <fieldset className='mb-4'>



                            {/* CustomerName field */}
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[12px] ">Biller Name</span>
                                </label>
                                <input {...register('billerName')}  type="text" className="input input-bordered input-sm w-full max-w-xs" defaultValue={user?.displayName} value={user?.displayName} />
                            </div>

                            {/* CustomerEmail field */}
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[12px] ">Biller Email</span>
                                </label>
                                <input {...register('billerEmail')}  type="Email" className="input input-bordered input-sm w-full max-w-xs" value={user?.email} />
                            </div>

                            {/* Customer mobile field */}

                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text text-[12px] ">Mobile no</span>
                                </label>
                                <input {...register('mobileNumber', {
                                    required: {
                                        value: true,
                                        message: "Field is required"
                                    },
                                    pattern: {
                                        value: /^(?:\+?88|0088)?01[15-9]\d{8}$/,
                                        message: "Invalid Mobile Number"
                                    }
                                })} type="text" placeholder="TYPE YOUR NUMBER" className="input input-bordered input-sm w-full max-w-xs input-sm w-full max-w-xs" />
                                <label className="label">
                                    {
                                        errors?.mobileNumber?.type === 'required' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.mobileNumber.message}</span>
                                    }
                                    {
                                        errors?.mobileNumber?.type === 'pattern' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.mobileNumber.message}</span>
                                    }

                                </label>
                            </div>


                        </fieldset>

                        {/* product price field */}
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-[12px] ">Paid Amount $</span>
                            </label>
                            <input {...register('paidAmount', {
                                required: {
                                    value: true,
                                    message: "Field is required"
                                }
                            })}
                                type="number" className="input input-bordered input-sm w-full max-w-xs" />

                            <label className="label">
                                {
                                    errors?.mobileNumber?.type === 'required' && <span className="label-text-alt text-red-500 text-[11px]">{errors?.paidAmount?.message}</span>
                                }
                                
                            </label>
                        </div>


                        {/* FORM SUBMIT SECTION */}
                        <div class="form-control mt-6">
                            <button type='submit' class="btn btn-primary">Login</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddBillModal;
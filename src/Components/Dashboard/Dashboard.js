import React, { useState } from 'react';
import AddBillModal from './AddBillModal';

const Dashboard = () => {
    const [modalStatus,setModalStatus]=useState(true);
    return (
        <div className='lg:px-24 mt-4'>
            <div class="navbar bg-base-300 rounded px-12">
                <div class="flex-1">
                    {/* <button for="my-modal-6" class="btn modal-button btn-sm bg-primary border-0 text-black hover:text-white">Add new bill</button> */}
                    <label  for="my-modal-6" class="btn modal-button">Add new bill</label>
                     
                </div>
                <div class="flex-none">
                    <p className='whitespace-nowrap '>Paid Total:0</p>

                </div>
            </div>
            {
                modalStatus && <AddBillModal setModalStatus={setModalStatus}></AddBillModal>
            }

        </div>
    );
};

export default Dashboard;
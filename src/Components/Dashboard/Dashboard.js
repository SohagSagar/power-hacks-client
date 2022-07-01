import MaterialTable from 'material-table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Hooks/Loading';
import AddBillModal from './AddBillModal';
import BillingTable from './BillingTable';

const Dashboard = () => {
    const [modalStatus, setModalStatus] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPaid,setTotalPaid]= useState(0);

    const { data: bills, isLoading, refetch } = useQuery(['billingList', pages, size, currentPage], () => fetch(`http://localhost:5000/api/billing-list?page=${currentPage}&size=${size}`).then(res => res.json()));


    const {data:paidAmount,isLoading:paidLoading,refetch:paidRefetch } = useQuery('paidAmount', ()=>fetch('http://localhost:5000/paid-amount').then(res=>res.json()))

    if(paidLoading){
        return <Loading/>
    }
    let sum=0;
    paidAmount.map((paid,index)=>{
        // console.log(paid.paidAmount);
    
        sum=sum+parseInt(paid.paidAmount);
        paidRefetch();
    })
    console.log(sum);
    // setTotalPaid(sum)


    return (
        <div className='lg:px-24 mt-4'>
            <div class="navbar bg-base-300 rounded px-12">
                <div class="flex-1">
                    {/* <button for="my-modal-6" class="btn modal-button btn-sm bg-primary border-0 text-black hover:text-white">Add new bill</button> */}
                    <label onClick={()=>setModalStatus(true)} for="my-modal-6" class="btn modal-button">Add new bill</label>

                </div>
                <div class="flex-none">
                    <p className='whitespace-nowrap '>Paid Total:{sum}</p>

                </div>
            </div>
            {
                modalStatus && <AddBillModal refetch={refetch} setModalStatus={setModalStatus}></AddBillModal>
            }

            <BillingTable bills={bills} isLoading={isLoading} setPages={setPages} setCurrentPage={setCurrentPage} pages={pages} currentPage={currentPage} size={size} setSize={setSize} refetch={refetch}/>

        </div>
    );
};

export default Dashboard;
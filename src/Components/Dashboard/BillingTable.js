import React from 'react';
import MaterialTable from 'material-table';
import { useQuery } from 'react-query';
import Loading from '../Hooks/Loading';
import BillTableRow from './BillTableRow';
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';

const BillingTable = ({bills,isLoading,setCurrentPage,setPages,pages, currentPage,size,setSize,refetch}) => {

  const [deleteModalStatus, setDeleteModalStatus] = useState(true);

  if (isLoading ) {
    return <Loading />
  }

 


  

  return (
    <div class="overflow-x-auto">

      <table class="table table-compact w-full">
        <thead>
          <tr>
            
            <th>Billing ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Paid Amount ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            [...bills]?.map((bill, index) => <BillTableRow
              index={index + 1}
              bill={bill}
              refetch={refetch}
            ></BillTableRow>)
          }
        </tbody>

      </table>

      {/* {
        deleteModalStatus && <DeleteModal></DeleteModal>
      } */}

      <Pagination setCurrentPage={setCurrentPage} setPages={setPages} pages={pages} currentPage={currentPage} size={size} setSize={setSize}/>
    </div>
  );
};

export default BillingTable;
import React from 'react';
import { toast } from 'react-toastify';

const BillTableRow = ({ bill, index, refetch }) => {
    const { _id, billerName, billerEmail, mobileNumber, paidAmount } = bill;

    const updateBill = _id => {

        console.log(_id);

    }

    const deleteBill = _id => {
        console.log(_id);
        const confirm = window.confirm('Are you sure to delete?')

        if (confirm) {
            fetch(`http://localhost:5000/api/delete-billing/${_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount > 0) {
                        toast.success('User Registered Successfully', {
                            position: toast.POSITION.BOTTOM_CENTER
                        })
                        refetch();
                    }
                    else {
                        toast.error('FAIL TO DELETE')
                    }
                })
        }

    }


    return (
        <tr className='font-semibold'>
            <td>{_id}</td>
            <td>{billerName}</td>
            <td>{billerEmail}</td>
            <td>{mobileNumber}</td>
            <td>{paidAmount}</td>
            <td><>
                <button onClick={() => updateBill(_id)} class="btn btn-ghost pl-0 text-green-500">Update</button>
                <button onClick={() => deleteBill(_id)} class="btn btn-ghost text-red-500">Delete</button>

            </></td>
        </tr>
    );
};

export default BillTableRow;
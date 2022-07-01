import React, { useEffect } from 'react';

const Pagination = ({ setCurrentPage, setPages, currentPage, pages, size,setSize }) => {

    useEffect(() => {
        fetch(`http://localhost:5000/billCount`)
            .then(res => res.json())
            .then(data => {
                setPages(Math.ceil(parseInt(data.count) / size));
            })
    }, [size,setPages])
    return (
        <div class="btn-group text-center">

            {
                [...Array(pages).keys()].map(num => <button
                    onClick={() => setCurrentPage(num)}
                    class={currentPage === num ? "btn btn-active" : "btn"}>{num + 1}</button>)

            }

            <select className='select select-bordered ml-1' onChange={e=> setSize(e.target.value)}>
                <option value={5}>5</option>
                <option selected value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
            </select>

        </div>
    );
};

export default Pagination;
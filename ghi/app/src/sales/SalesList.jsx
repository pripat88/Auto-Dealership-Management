import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([]);


    const getAll = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';
        try{
            const salesResponse = await fetch(salesUrl);
            if (salesResponse.ok){
                const salesData = await salesResponse.json();
                setSales(salesData.sales)
            }else{
                return <div>Cannot get Sales</div>
            }
    } catch(error){
        return <div>Cannot get Sales</div>
    }
    };

    const deleteSale = async (id) => {
        const deleteUrl = `http://localhost:8090/api/sales/${id}`;
        try {
            const deleteResponse = await fetch(deleteUrl, {
                method: 'DELETE',
            });
            if (deleteResponse.ok) {
                getAll();
            } else {
                console.log('Cannot delete Sales');
            }
        } catch (error) {
            console.log('Cannot delete Sales');
        }
    };


    useEffect(() => {
        getAll();
        deleteSale();
    }, []);

    return (
        <div className="container">
           <h1>Sales Records</h1>
              <div className="mb-3">
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Id</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.sales_person.first_name}{sale.sales_person.last_name}</td>
                                    <td>{sale.sales_person.employee_Id}</td>
                                    <td>{sale.customer.first_name}{sale.customer.first_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td><span>$</span>{sale.price}</td>
                                    <td><button onClick={()=> deleteSale(sale.id)} type="button" className='btn btn-danger'>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    );
}
export default SalesList;

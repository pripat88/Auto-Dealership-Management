import React, { useEffect, useState } from 'react';

function SalesList() {
    const [load, setLoad] = useState(false);

    const [salesPersons, setSalesPersons] = useState([]);
    const [sales, setSales] = useState([]);

    const [filter, setFilter]= useState('');
    const handleFilterChange = (event) => setFilter(event.target.value);

    const getAll = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/';

        const salesResponse = await fetch(salesUrl);
        if (salesResponse.ok){
            const salesData = await salesResponse.json();
            setSales(salesData.sales)
        }
        const salesPersonUrl = 'http://localhost:8090/api/sales_persons/';
        const personResponse = await fetch (salesPersonUrl);
        if (personResponse.ok){
            const salesPersonData = await personResponse.json();
            setSalesPersons(salesPersonData.sales_persons);
        }
        if (true){
            setLoad(!load);
        }
    };
    useEffect(() => {
        getAll();
    }, [load]);

    return (
        <div className="container">
           <h1>Sales Records</h1>
              <div className="mb-3">
                <select onChange={handleFilterChange} required type="text" name="sales_persons" id="sales_persons" value={filter} className="form-select">
                <option value="">Choose an sales person</option>
                {salesPersons.map((salesPerson) => {
                  return (
                    <option key={salesPerson.id} value={salesPerson.name}>
                      {salesPerson.name}
                    </option>
                  );
                })}
                </select>
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
                        {sales.filter((sales) => {
                            return filter === '' ? sales : SalesListForm.sales_person.name.includes(filter);
                        }).map(sales => {
                            return (
                                <tr key={sales.id}>
                                    <td>{sales.sales_person.name}</td>
                                    <td>{sales.sales_person.employee_Id}</td>
                                    <td>{sales.sales_person.name}</td>
                                    <td>{sales.customer.name}</td>
                                    <td>{sales.automobile.vin}</td>
                                    <td><span>$</span>{sales.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    );
}
export default SalesList;

import React, { useEffect, useState } from 'react';

function SalesPersonForm() {
    const [firstName, setFirstName] = useState(false);
    const handleFirstNameChange = (event) => setName(event.target.value);

    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => setName(event.target.value);

    const [employee_id, setEmployeeId] = useState('');
    const handleEmployee_IdChange = (event) => setEmployeeId(event.target.value);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.firstName = firstName;
        data.lastName = lastName;
        data.employee_id = employee_id;

        const customerUrl = 'http://localhost:8090/api/sales_persons/'
        const fetchConfig ={
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            setFirstName('');
            setLastName('');
            setEmployeeId('');

          }

        }
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a new sales person</h1>
                  <form onSubmit={handleSubmit} id="create-sales-person-form">
                    <div className="form-floating mb-3">
                      <input onChange={handleFirstNameChange} placeholder="FirstName" required type="text" name="FirstName" id="FirstName" value={FirstName} className="form-control" />
                      <label htmlFor="FirstName">FirstName</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleLastNameChange} placeholder="LastName" required type="text" name="LastName" id="LastName" value={LastName} className="form-control" />
                      <label htmlFor="LastName">LastName</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleEmployee_IdChange} required type="text" name="Employee_Id" id="Employee_Id" value={employee_id} className="form-control"/>
                      <label htmlFor="Employee_Id">Employee_Id</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
          );
        };
    export default SalesPersonForm;

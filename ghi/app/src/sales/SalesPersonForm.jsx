import React, { useEffect, useState } from 'react';

function SalesPerson() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleEmployee_IdChange = (event) => setEmployeeId(event.target.value);
    const handleFirstNameChange = (event) => setFirstName(event.target.value);
    const handleLastNameChange = (event) => setLastName(event.target.value);


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

        const response = await fetch(customerUrl, fetchConfig);
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
                      <input onChange={handleFirstNameChange} placeholder="FirstName" required type="text" name="FirstName" id="FirstName" value={firstName} className="form-control" />
                      <label htmlFor="FirstName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleLastNameChange} placeholder="LastName" required type="text" name="LastName" id="LastName" value={lastName} className="form-control" />
                      <label htmlFor="LastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleEmployee_IdChange} required type="text" name="Employee_Id" id="Employee_Id" value={employee_id} className="form-control"/>
                      <label htmlFor="Employee_Id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
          );
        };
    export default SalesPerson;

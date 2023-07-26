import React, { useState } from 'react';


function TechnicianForm(){
    const[name, setName] = useState('');
    const[employee_id, setId] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmployeeIdChange = (event) => {
        setId(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.employee_id = employee_id;
        data.name = name;

        const techUrl = "http://localhost:8080/api/technician/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            }
        }
        const response = await fetch(techUrl, fetchConfig);
        if(response.ok){
            const newTechnician = await response.json()
            setName('');
            setId('');
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Create a technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" type="text" name="name" id="name" className="form-control" />
                            <label forhtml="name">Technician</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIdChange} value={employee_id} placeholder="Employee_id" required type="text" name="name" id="name" className="form-control" />
                            <label forhtml="employee_id">Employee number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TechnicianForm

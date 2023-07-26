import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


function AutomobileForm () {
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    // Create a bunch of useState hooks and Change functions for the different inputs we need
    const [color, setColor] = useState('');
    const handleColorChange = (event) => setColor(event.target.value);

    const [year, setYear] = useState('');
    const handleYearChange = (event) => setYear(event.target.value);

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => setVin(event.target.value);

    const [model, setModel] = useState('');
    const handleModelChange = (event) => setModel(event.target.value);

    const [models, setModels] = useState([]);


    // Fetch data for Models dropdown select field
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
        if (true) {
            setLoad(!load);
        }
    };

    useEffect(() => {
        fetchData();
    }, [load]);


    // onSubmit Handle event
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const autoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig ={
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(autoUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();

            setColor('');
            setYear('');
            setVin('');
            setModel('');

            navigate("/automobiles/");
        }

    }


    // return Form JSX
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new automobile</h1>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} placeholder="Color" required
                                type="text" name="color" id="color" value={color}
                                className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} placeholder="Year" required
                                type="number" name="year" id="year" value={year} minLength="4" maxLength="4"
                                className="form-control"/>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} placeholder="VIN" required
                                type="text" name="vin" id="vin" value={vin} minLength="17" maxLength="17"
                                className="form-control"/>
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} required name="model" id="model" value={model} className="form-select">
                                <option value="">Choose a model</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;

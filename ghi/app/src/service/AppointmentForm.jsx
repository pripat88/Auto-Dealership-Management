import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AppointmentForm() {
  const navigate = useNavigate();
  const [technicians, setTechnicians] = useState([]);
  const [technician, setTechnician] = useState("");
  const [vin, setVin] = useState("");
  const [customer, setCustomer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const handleVinChange = (event) => {
    setVin(event.target.value);
  };
  const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleTechnicianChange = (event) => {
    setTechnician(event.target.value);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.vin = vin;
    data.customer = customer;
    data.date = date;
    data.time = time;
    data.technician = technician;
    data.reason = reason;
    const appointmentUrl = "http://localhost:8080/api/services";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const newAppointment = await response.json();
      setVin("");
      setCustomer("");
      setDate("");
      setTime("");
      setTechnician("");
      setReason("");

      navigate("/services/");
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8080/api/technician";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technician);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create an Appointment</h1>
            <form onSubmit={handleSubmit} id="create-service-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleVinChange}
                  value={vin}
                  minLength="17"
                  maxLength="17"
                  placeholder="Vin"
                  type="text"
                  name="vin"
                  id="name"
                  className="form-control"
                />
                <label forhtml="vin">Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleCustomerChange}
                  value={customer}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label forhtml="name">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleDateChange}
                  value={date}
                  placeholder="Date"
                  type="date"
                  name="color"
                  id="Date"
                  className="form-control"
                />
                <label forhtml="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleTimeChange}
                  value={time}
                  placeholder="Time"
                  type="time"
                  name="picture"
                  id="time"
                  className="form-control"
                />
                <label forhtml="time">Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={handleTechnicianChange}
                  value={technician}
                  required
                  id="Technician"
                  name="Technician"
                  className="form-select"
                >
                  <option value="">Choose a Technician</option>
                  {technicians.map((tech) => {
                    return (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleReasonChange}
                  value={reason}
                  placeholder="Reason"
                  type="text"
                  name="Reason"
                  id="name"
                  className="form-control"
                />
                <label forhtml="reason">Reason</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;

export default AppointmentForm

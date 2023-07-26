import React, { useEffect, useState } from "react";

function ServiceHistory() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const fetchData = async () => {
    const listUrl = `http://localhost:8080/api/services/`;
    const response = await fetch(listUrl);

    if (response.ok) {
      const data = await response.json();
      setServices(data.appointments);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className=" text-center- mt-4">Service history</h1>
      <div className="form-outline mb-4">
        <input
          onChange={handleSearchChange}
          type="search"
          className="form-control"
          id="datatable-search-input"
          placeholder="Enter Vin"
        />
      </div>
      <div id="datatable"></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Completed</th>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {services
            .filter((appointment) => {
              return search === ""
                ? appointment
                : appointment.vin.includes(search);
            })
            .map((appointment) => {
              if (appointment.completed === true) {
                return (appointment.completed = "Yes");
              }
              return (
                <tr key={appointment.id} value={appointment.id}>
                  <td>{appointment.completed}</td>
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td>
                    {new Date(appointment.time).toLocaleTimeString([], {
                      hour: "2-digit",
                    })}
                  </td>
                  <td>{appointment.technician.name}</td>
                  <td>{appointment.reason}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default ServiceHistory;

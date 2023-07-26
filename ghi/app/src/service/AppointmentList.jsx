import React, { useEffect, useState } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleComplete = async (event) => {
    const appointmentUrl = `http://localhost:8080/api/services/${event.id}/`;
    const fetchOptions = {
      method: "put",
      body: JSON.stringify({ completed: true }),
      headers: {
        "Content-type": "application/json",
      },
    };
    const appointmentResponse = await fetch(appointmentUrl, fetchOptions);
    const data = await appointmentResponse.json();
    if (appointmentResponse.ok) {
      setCompleted(true);
      setAppointments((service) => {
        return appointments.filter(
          (appointment) => appointment.id !== event.id
        );
      });
    }
  };

  const fetchData = async () => {
    const listUrl = `http://localhost:8080/api/services/`;
    const response = await fetch(listUrl);

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  };

  async function deleteAppointment(appointments) {
    const deleteUrl = `http://localhost:8080/api/services/${appointments.id}/`;
    const response = await fetch(deleteUrl, { method: "delete" });
    if (response.ok) {
      setAppointments((appointment) => {
        return appointment.filter(
          (appointment) => appointment.id !== appointments.id
        );
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className=" text-center-mt-4">Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIP</th>
            <th>VIN</th>
            <th>Customer</th>
            <th>Date</th>
            <th>time</th>
            <th>Technician</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments
            .filter((appointment) => {
              return appointment.completed === false;
            })
            .map((appointment) => {
              if (appointment.vip === true) {
                return (appointment.vip = "Yes");
              }
              return (
                <tr key={appointment.id} value={appointment.id}>
                  <td>{appointment.vip}</td>
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
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteAppointment(appointment)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => handleComplete(appointment)}
                    >
                      Finished
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;

import React, { useState } from "react";

function CustomerForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (event) => setPhoneNumber(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.first_name = first_name;
    data.last_name = last_name;
    data.address = address;
    data.phone_number = phoneNumber;

    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(customerUrl, fetchConfig);
      if (response.ok) {
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhoneNumber("");
      } else {
      }
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                placeholder="FirstName"
                required
                type="text"
                name="first_name"
                id="first_name"
                value={first_name}
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                placeholder="LastName"
                required
                type="text"
                name="last_name"
                id="last_name"
                value={last_name}
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                placeholder="address"
                required
                type="text"
                name="address"
                id="address"
                value={address}
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneChange}
                placeholder="123-123-1234"
                required
                type="tel"
                name="phone_number"
                id="phone_number"
                value={phoneNumber}
                className="form-control"
                pattern="[0-9]{3}-[0-9] {3}- [0-9]-{4}"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
        <button className="btn btn-primary">Create</button>
      </div>
    </div>
  );
}
export default CustomerForm;

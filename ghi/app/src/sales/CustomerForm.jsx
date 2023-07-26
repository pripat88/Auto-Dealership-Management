import React, { useState } from "react";

function CustomerForm() {
  const [name, setName] = useState("");
  const handleNameChange = (event) => setName(event.target.value);

  const [address, setAddress] = useState("");
  const handleAddressChange = (event) => setAddress(event.target.value);

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneChange = (event) => setPhoneNumber(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};

    data.name = name;
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

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      setName("");
      setAddress("");
      setPhoneNumber("");
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                name="Name"
                id="Name"
                value={name}
                className="form-control"
              />
              <label htmlFor="name">Name</label>
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
      </div>
    </div>
  );
}
export default CustomerForm;

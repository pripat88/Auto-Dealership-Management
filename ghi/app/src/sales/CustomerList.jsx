import React, { useEffect, useState } from "react";

function CustomerList(props) {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => setFilter(event.target.value);

  const getAll = async () => {
    const customersUrl = "http://localhost:8090/api/customers/";
    const customersResponse = await fetch(customersUrl);

    if (customersResponse.ok) {
      const customersData = await customersResponse.json();
      setCustomers(customersData.customers);
    }
  };
  const deleteCustomer = async (id) => {
    const deleteUrl = "http://localhost:8090/api/customers/${id}";
    const deleteResponse = await fetch(deleteUrl, {
      method: "DELETE",
    });
    if (deleteResponse.ok) {
      getAll();
    }
  };
  useEffect(() => {
    getAll();
    deleteCustomer();
  }, []);

  return (
    <div className="container">
      <h1>Customer List</h1>
      <div className="mb-3">
        <select
          onChange={handleFilterChange}
          required
          type="text"
          name="customers"
          id="customers"
          value={filter}
          className="form-select"
        >
          <option value="">All Customers</option>
          {customers.map((customer) => {
            return (
              <option key={customer.id} value={customer.last_name}>
                {customer.last_name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter((customer) => {
              return filter === "" ? true : customer.last_name.includes(filter);
            })
            .map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      {" "}
                      Delete
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
export default CustomerList;

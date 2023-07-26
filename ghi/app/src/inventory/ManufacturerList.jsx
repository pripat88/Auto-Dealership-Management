import React, { useEffect, useState } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
    if (true) {
      setLoad(!load);
    }
  };
  useEffect(() => {
    fetchData();
  }, [load]);

  return (
    <div className="container">
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ManufacturerList;

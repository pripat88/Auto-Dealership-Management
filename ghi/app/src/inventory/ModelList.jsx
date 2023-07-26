import React, { useEffect, useState } from "react";

function ModelList() {
  const [models, setModels] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
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

  return (
    <div className="container">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img
                    style={{ width: 300, height: 190 }}
                    src={model.picture_url}
                    className="img-thumbnail"
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ModelList;

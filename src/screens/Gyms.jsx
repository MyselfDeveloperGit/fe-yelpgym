import React, { useEffect, useState } from "react";
import axios from "axios";

const Gyms = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    axios.get("/gyms").then((res) => {
      setGyms(res.data.gyms);
    });
  }, []);

  return (
    <>
      <ul>
        <h1>All Gyms</h1>
        {gyms?.length ? (
          gyms.map((gym, idx) => (
            <div className="card mb-3">
              <div className="row">
                <div className="col-md-4">
                  <img src={gym.image} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{gym.title}</h5>
                    <p className="card-text">{gym.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{gym.location}</small>
                    </p>
                    <a href={`/gym/${gym._id}`} className="btn btn-primary">
                      {" "}
                      VIEW
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>No data</h2>
        )}
      </ul>
    </>
  );
};

export default Gyms;

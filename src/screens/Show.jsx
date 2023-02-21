import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const Show = () => {
  const [gym, setGym] = useState();
  const { gymid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/gyms/${gymid}`).then((res) => {
      setGym(res.data.gym);
    });
  }, []);

  const onDeleteClick = () => {
    axios.get(`/gyms/${gymid}/delete`).then((res) => {
      if (res.status == 200) {
        navigate("/gyms");
      }
    });
  };

  return (
    <>
      {gym ? (
        <>
          <div className="row">
            <div className="col-6 offset-3">
              <div className="card mb-3">
                <img src={gym.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{gym.title}</h5>
                  <p className="card-text">{gym.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-muted">{gym.location}</li>
                  <li className="list-group-item">$ {gym.price} / month</li>
                </ul>
                <div className="card-body">
                  <a
                    className="card-link btn btn-info"
                    href={`/gym/${gymid}/edit`}
                  >
                    EDIT
                  </a>
                  <button className="btn btn-danger" onClick={onDeleteClick}>
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>No data</h1>
      )}
    </>
  );
};

export default Show;

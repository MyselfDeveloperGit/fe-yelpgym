import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const Edit = () => {
  const [gym, setGym] = useState(undefined);
  const { gymid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3001/gyms/${gymid}`).then((res) => {
      setGym(res.data.gym);
    });
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const gym = {
      title: e.target[0].value,
      location: e.target[1].value,
      image: e.target[2].value,
      price: e.target[3].value,
      description: e.target[4].value,
    };
    console.log(gym);
    await axios
      .post(`http://localhost:3001/gyms/${gymid}/update`, gym)
      .then((res) => {
        console.log(res.data);
        navigate(`/gym/${res.data}`);
      });
  };

  return (
    <>
      {gym ? (
        <div className="row">
          <h1 className="text-center">Edit gym</h1>
          <div className="col-6 offset-3">
            <form onSubmit={onFormSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={gym.title || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={gym.location || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="image"
                  name="image"
                  defaultValue={gym.image || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    $
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    id="price"
                    name="price"
                    defaultValue={gym.price || ""}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  id="description"
                  name="description"
                  defaultValue={gym.description || ""}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Edit;

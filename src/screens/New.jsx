import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const New = () => {
  const navigate = useNavigate();
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
      .post("/gyms/new", gym)
      .then((res) => {
        if ((res.status = 200)) {
          navigate(`/gym/${res.data}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="row">
        <h1 className="text-center">Add gym</h1>
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
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default New;

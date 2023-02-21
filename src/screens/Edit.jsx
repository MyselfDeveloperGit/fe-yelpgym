import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { useNavigate, useParams } from "react-router";
import * as Validators from "../helpers/validators";
import ValidationDiv from "../components/ValidationDiv";

const Edit = () => {
  const [gym, setGym] = useState(undefined);
  const { gymid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3001/gyms/${gymid}`).then((res) => {
      setGym(res.data.gym);
    });
  }, []);

  const onFormSubmit = async (values) => {
    const gym = { ...values };
    await axios
      .post(`http://localhost:3001/gyms/${gymid}/update`, { gym })
      .then((res) => {
        navigate(`/gym/${res.data}`);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const EditGymForm = () => (
    <Form
      onSubmit={onFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            validate={Validators.required}
            initialValue={gym.title}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  {...input}
                  className={`form-control ${
                    meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""
                  }`}
                  type="text"
                  id="title"
                  name="title"
                />
                <ValidationDiv meta={meta} />
              </div>
            )}
          </Field>
          <Field
            name="location"
            validate={Validators.required}
            initialValue={gym.location}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  {...input}
                  className={`form-control ${
                    meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""
                  }`}
                  type="text"
                  id="location"
                  name="location"
                />
                <ValidationDiv meta={meta} />
              </div>
            )}
          </Field>
          <Field
            name="image"
            validate={Validators.required}
            initialValue={gym.image}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  {...input}
                  className={`form-control ${
                    meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""
                  }`}
                  type="text"
                  id="image"
                  name="image"
                />
                <ValidationDiv meta={meta} />
              </div>
            )}
          </Field>
          <Field
            name="price"
            initialValue={gym.price}
            validate={Validators.composeValidators(
              Validators.required,
              Validators.mustBeANumber,
              Validators.minValue(10)
            )}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label" htmlFor="price">
                  Price
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    $
                  </span>
                  <input
                    {...input}
                    className={`form-control ${
                      meta.touched
                        ? meta.error
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    type="text"
                    id="price"
                    name="price"
                  />
                  <ValidationDiv meta={meta} />
                </div>
              </div>
            )}
          </Field>
          <Field
            name="description"
            validate={Validators.required}
            initialValue={gym.description}
          >
            {({ input, meta }) => (
              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  {...input}
                  className={`form-control ${
                    meta.touched ? (meta.error ? "is-invalid" : "is-valid") : ""
                  }`}
                  type="text"
                  id="description"
                  name="description"
                />
              </div>
            )}
          </Field>
          <div className="mb-3">
            <button className="btn btn-success" disabled={invalid || pristine}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );

  return (
    <>
      {gym ? (
        <div className="row">
          <h1 className="text-center">Edit gym</h1>
          <div className="col-6 offset-3">
            <EditGymForm />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Edit;

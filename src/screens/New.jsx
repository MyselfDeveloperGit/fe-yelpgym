import axios from "axios";
import React from "react";
import { Form, Field } from "react-final-form";
import * as Validators from "../helpers/validators";
import ValidationDiv from "../components/ValidationDiv";
import { useNavigate } from "react-router";

const New = () => {
  const navigate = useNavigate();
  const onFormSubmit = async (values) => {
    const gym = { ...values };
    await axios
      .post("/gyms/new", { gym })
      .then((res) => {
        if ((res.status = 200)) {
          navigate(`/gym/${res.data}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const NewGymFrom = () => (
    <Form
      onSubmit={onFormSubmit}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title" validate={Validators.required}>
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
          <Field name="location" validate={Validators.required}>
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
          <Field name="image" validate={Validators.required}>
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
          <Field name="description" validate={Validators.required}>
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
            <button className="btn btn-success" disabled={invalid}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );
  return (
    <>
      <div className="row">
        <h1 className="text-center">Add gym</h1>
        <div className="col-6 offset-3">
          <NewGymFrom />
        </div>
      </div>
    </>
  );
};

export default New;

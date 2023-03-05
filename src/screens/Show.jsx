import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Form, Field } from "react-final-form";
import axios from "axios";
import * as Validators from "../helpers/validators.js";

const Show = () => {
  const [gym, setGym] = useState();
  const { gymid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGym();
  }, []);

  function getGym() {
    axios.get(`/gyms/${gymid}`).then((res) => {
      setGym(res.data.gym);
    });
  }

  const onDeleteClick = () => {
    axios.get(`/gyms/${gymid}/delete`).then((res) => {
      if (res.status == 200) {
        navigate("/gyms");
      }
    });
  };

  const onReviewSubmit = async (values) => {
    const payload = { review: { ...values } };
    await axios.post(`/gyms/${gymid}/reviews`, payload).then((res) => {
      if (res.status == 200) {
        getGym();
      }
    });
  };

  const onReviewDelete = async (id) => {
    await axios.get(`/gyms/${gymid}/reviews/${id}`).then((res) => {
      if (res.status == 200) {
        getGym();
      }
    });
  };

  const ReviewList = () =>
    gym.reviews.map((review, idx) => {
      return (
        <div className="mb-3 card" key={idx}>
          <div className="card-body">
            <h5 className="card-title">Rating: {review.rating}</h5>
            <p className="card-text">Review: {review.body}</p>
            <button
              onClick={() => onReviewDelete(review._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

  const ReviewFrom = () => {
    return (
      <>
        <h2>Leave a review</h2>
        <Form
          onSubmit={onReviewSubmit}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="mb-3">
              <Field name="rating" defaultValue={3}>
                {({ input, meta }) => (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="rating">
                      Rating
                    </label>
                    <input
                      {...input}
                      className="form-range"
                      type="range"
                      id="rating"
                      name="rating"
                      min="1"
                      max="5"
                    />
                  </div>
                )}
              </Field>
              <Field name="body" validate={Validators.required}>
                {({ input, meta }) => (
                  <div className="mb-3">
                    <label className="form-label" htmlFor="body">
                      Review
                    </label>
                    <textarea
                      {...input}
                      className={`form-control ${
                        meta.touched
                          ? meta.error
                            ? "is-invalid"
                            : "is-valid"
                          : ""
                      }`}
                      type="text"
                      id="body"
                      name="body"
                      cols="30"
                      rows="4"
                    />
                  </div>
                )}
              </Field>
              <div>
                <button className="btn btn-success" disabled={invalid}>
                  Add Review
                </button>
              </div>
            </form>
          )}
        />
      </>
    );
  };

  return (
    <>
      {gym ? (
        <>
          <div className="row">
            <div className="col-6">
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
            <div className="col-6">
              <ReviewFrom />

              <ReviewList />
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

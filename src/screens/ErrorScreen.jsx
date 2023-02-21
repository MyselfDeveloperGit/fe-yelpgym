import React from "react";
import { useNavigate } from "react-router";

const ErrorScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-6 offset-3">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Sorry, something went wrong</h4>
        </div>
        <button className="btn btn-warning" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;

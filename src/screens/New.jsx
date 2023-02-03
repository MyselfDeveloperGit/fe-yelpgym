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
    };
    console.log(gym);
    await axios.post("/gyms/new", gym).then((res) => {
      navigate(`/gym/${res.data}`);
      console.log(res.data);
    });
  };
  return (
    <>
      <h1>Add gym</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" />
        </div>
        <button>Submit</button>
      </form>
      <a href="/gyms">ALL GYMS</a>
    </>
  );
};

export default New;

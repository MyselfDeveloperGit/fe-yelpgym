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
      <h1>Add gym</h1>
      <form onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={gym?.title || ""}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={gym?.location || ""}
          />
        </div>
        <button>Submit</button>
      </form>
      <a href="/gyms">ALL GYMS</a>
    </>
  );
};

export default Edit;

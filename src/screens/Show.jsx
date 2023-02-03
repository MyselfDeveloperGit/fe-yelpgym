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
  });

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
          <h1>{gym.title}</h1>
          <h3>{gym.location}</h3>
        </>
      ) : (
        <h1>No data</h1>
      )}
      <a href={`/gym/${gymid}/edit`}>EDIT THIS GYM</a>
      <br />
      <button onClick={onDeleteClick}>DELETE GYM</button>
      <br />
      <a href="/gyms">All gyms</a>
    </>
  );
};

export default Show;

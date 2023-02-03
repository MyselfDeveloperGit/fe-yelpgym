import React, { useEffect, useState } from "react";
import axios from "axios";

const Gyms = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    axios.get("/gyms").then((res) => {
      setGyms(res.data.gyms);
    });
  }, []);

  return (
    <>
      <h1>All Gyms</h1>
      <a href="/new">ADD NEW GYM!</a>
      <ul>
        {gyms?.length ? (
          gyms.map((gym, idx) => (
            <li key={idx}>
              <a href={`/gym/${gym._id}`}>{gym.title}</a>
            </li>
          ))
        ) : (
          <h2>No data</h2>
        )}
      </ul>
    </>
  );
};

export default Gyms;

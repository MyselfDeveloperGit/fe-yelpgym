import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./screens/LandingPage";
import Gyms from "./screens/Gyms";
import Show from "./screens/Show";
import New from "./screens/New";
import Edit from "./screens/Edit";
import ErrorScreen from "./screens/ErrorScreen";
import Boilerplate from "./partials/Boilerplate";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Boilerplate />}>
          <Route path="/gyms" element={<Gyms />} />
          <Route path="/gym/:gymid" element={<Show />} />
          <Route path="/gym/:gymid/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/error" element={<ErrorScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

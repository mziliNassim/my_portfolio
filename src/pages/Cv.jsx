import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { personalData } from "../utils/data/personal-data";

const Cv = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.location.href = personalData?.resume;
    navigate("/");
  }, [navigate]);

  return null;
};

export default Cv;

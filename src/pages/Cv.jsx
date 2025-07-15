import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cv = ({ personalData, full = true }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (full) window.location.href = personalData?.fullResume;
    else window.location.href = personalData?.resume;
    navigate("/");
  }, [navigate]);

  return null;
};

export default Cv;

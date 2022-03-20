import { useEffect, useState } from "react";

const Alert = ({ alert, setAlert }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(false);
      setAlert({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isActive) {
    return (
      <div
        className={`py-4 px-2 ${alert.type == "caution" && "bg-yellow-100"} ${
          alert.type == "danger" && "bg-red-200"
        } text-slate-900 flex items-center justify-center mb-2 rounded-lg`}
      >
        {alert.message}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Alert;

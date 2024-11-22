import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check your condition here. For now, it's always true.
    if (true) {
      navigate('/signup');
    }
  }, [navigate]); // The dependency array ensures this runs only once after the initial render.

  return (
    <div className="flex items-center justify-center text-xl font-bold">
      Redirecting... hello
    </div>
  );
};

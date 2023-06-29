import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTitle (title) {
  const location = useLocation();
  useEffect(() => {
    document.title = title;
  }, [location, title]);
}

export default usePageTitle;
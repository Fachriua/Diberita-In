import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchNewsByRoute, setQuery } from "../store/reducer/News-Reducer";

function RouteWatcher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Ambil parameter query dari URL
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    if (query) {
      dispatch(setQuery(query)); // Simpan query ke Redux
    }

    // Ambil data berdasarkan rute
    dispatch(fetchNewsByRoute(location.pathname + location.search));
  }, [location.pathname, location.search, dispatch]);

  return null;
}

export default RouteWatcher;

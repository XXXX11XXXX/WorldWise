import { useState, useEffect } from "react";

export function useGeolocation(defaultValue = null){
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultValue);
  const [error, setError] = useState(null);
  function getPosition(){
    if(!navigator.geolocation) return setError("Your browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude});
        setIsLoading(false);
      },
      err => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }
  useEffect(() => {
    getPosition();
  }, []);
  useEffect(() => {
    if(position) return;
    getPosition();
  }, [position, getPosition]);
  return {isLoading, position, error, getPosition};
}
  


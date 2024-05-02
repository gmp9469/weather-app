import React from "react";

//Editable text input for location of weather. Reflects change upon enter
const LocationInput = ({ inputLocation, setInputLocation, setLocation }) => {
  const handleInputChange = (event) => {
    setInputLocation(event.target.value);
  };

  const handleInputSubmit = (event) => {
    if (event.key === "Enter") {
      setLocation(inputLocation);
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter location"
      value={inputLocation}
      onChange={handleInputChange}
      onKeyPress={handleInputSubmit}
    />
  );
};

export default LocationInput;

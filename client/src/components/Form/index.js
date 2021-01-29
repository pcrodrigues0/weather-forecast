import React from "react";

import "./style.scss";

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="location"/>
      <input
        required
        onChange={props.handleInputChange}
        id="location"
        name="location"
        type="text"
        placeholder="Enter a city"
        value={props.inputs.location}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;

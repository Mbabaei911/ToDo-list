import React, { useState } from "react";

const WorkEdit = ({ item,onSubmit }) => {
  const [title, setTitle] = useState(item.work);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("new title", title);
   onSubmit(item.id,title)
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="form-group d-flex  flex-row justify-content-between align-items-center"
    >
      <label>Work</label>
      <input
        className="input form-control mx-2"
        value={title}
        onChange={handleChange}
      />
      <button className="btn btn-primary ">Save</button>
    </form>
  );
};
export default WorkEdit;

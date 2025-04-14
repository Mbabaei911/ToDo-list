import React from "react";
import { useState } from "react";
function WorkEdit({ item, onSubmit, onCancel }) {
  const [editedWork, setEditedWork] = useState(item.work);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(item.id, editedWork);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="input-group">
        <input
          type="text"
          value={editedWork}
          onChange={(e) => setEditedWork(e.target.value)}
          className="form-control"
          autoFocus
        />
        <button type="submit" className="btn btn-success">
          <i className="bi bi-check-circle"></i> Save
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}
        >
          <i className="bi bi-x-circle"></i> Cancel
        </button>
      </div>
    </form>
  );
}
export default WorkEdit;
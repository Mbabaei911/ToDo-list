
import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import WorkEdit from "./workEdit";

const API_BASE_URL = "http://localhost:3005/works";

function App() {
  const [newWork, setNewWork] = useState("");
  const [allWorks, setAllWorks] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAllWorks(response.data);
      if (response.data.length > 0) {
        const maxNumber = Math.max(...response.data.map(item => item.number));
        setNextNumber(maxNumber + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newWork.trim()) return;

    try {
      await axios.post(API_BASE_URL, {
        work: newWork.trim(),
        number: nextNumber,
      });
      setNewWork("");
      setNextNumber(prev => prev + 1);
      fetchData();
    } catch (error) {
      console.error("Error submitting work:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  const handleEdit = async (id, updatedWork) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, { work: updatedWork });
      fetchData();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating work:", error);
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const renderWorkItems = () => {
    return allWorks.map((item) => (
      <div key={item.id} className="col-md-6 mb-3">
        <div className="card shadow-sm">
          <div className="card-body d-flex justify-content-between align-items-center">
            {editingId === item.id ? (
              <WorkEdit 
                item={item} 
                onSubmit={handleEdit} 
                onCancel={cancelEditing}
              />
            ) : (
              <>
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-3 fs-6">{item.number}</span>
                  <h5 className="card-title mb-0">{item.work}</h5>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => startEditing(item.id)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="h4 mb-0 text-center">Todo App</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="What do you want to do?"
                    value={newWork}
                    onChange={(e) => setNewWork(e.target.value)}
                  />
                  <button 
                    className="btn btn-primary btn-lg" 
                    type="submit"
                  >
                    <i className="bi bi-plus-circle"></i> Add Task
                  </button>
                </div>
              </form>
              
              <div className="mt-4">
                <h3 className="h5 mb-3 text-muted border-bottom pb-2">
                  Your Tasks
                </h3>
                <div className="row">
                  {allWorks.length === 0 ? (
                    <div className="col-12 text-center py-4">
                      <div className="alert alert-info">
                        No tasks yet. Add your first task above!
                      </div>
                    </div>
                  ) : (
                    renderWorkItems()
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer text-muted small">
              {allWorks.length} {allWorks.length === 1 ? 'task' : 'tasks'} total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
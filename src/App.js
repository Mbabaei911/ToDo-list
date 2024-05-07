import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WorkEdit from "./workEdit";

function App() {
  ////////////////
  ////////// use states
  const [newWork, setNewWork] = useState("");
  const [allWorks, setAllWorks] = useState([]);
  const [debouncedWork, setDebouncedWorks] = useState("");
  const [number, setNumber] = useState(1);
  // const [submitOrOk, setSubmitOrOk] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  /////////////////////
  ///////use effect for debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedWorks(newWork);
    }, 100);
    return () => {
      clearTimeout(timerId);
    };
  }, [newWork]);

  // console.log(debouncedWork);

  ////////////////
  ///// useEffect for fetching
  useEffect(() => {
    fetchingData();
    // setSubmitOrOk(false);
  }, [debouncedWork]);

  /////////////////////
  //////posting and onclick handler

  const onSubmitClick = (e) => {
    e.preventDefault();

    setTimeout(() => {
      const posting = async () => {
        await axios
          .post("http://localhost:3005/works", {
            work: `${debouncedWork}`,
            number: `${number}`,
          })
          .then((res) => {
            console.log(res);
          });
      };
      setNewWork("");
      setNumber(number + 1);
      posting();
    }, 2000);
  };

  ////////////////////
  /////////fetching data
  const allWorksFunction = (success) => {
    setAllWorks(success);
  };

  const fetchingData = async () => {
    return await axios.get("http://localhost:3005/works").then((res) => {
      allWorksFunction(res.data);
    });
  };

  //////////////////
  ////on delete click
  const onDeleteHandler = async (e) => {
    const id = e.target.id;
    await axios.delete(`http://localhost:3005/works/${id}`);
    return fetchingData();
  };
  /////////////////////
  ///////on edit click
  const onEditClick = (e) => {
    setShowEdit(!showEdit);
  };
  const editWorkById = (id, newWork) => {
    const updatedWorks = allWorks.map((item) => {
      if (item.id === id) {
        return { ...item, work: newWork };
      }
      return item;
    });
    setAllWorks(updatedWorks);
  };

  ///////////////////
  /////////handle submit for work edit
  const handleSubmit = (id, newWork) => {
    setShowEdit(false);
    editWorkById(id, newWork);
  };
  //////////////////////////
  ////rendering and jsx

  const renderingAllWorks = () => {
    return allWorks.map((item) => {
      console.log(item);
      let content = (
        <h3>
          {item.number}-{item.work}
        </h3>
      );
      if (showEdit) {
        content = <WorkEdit item={item} onSubmit={handleSubmit} />;
      }
      return (
        <div key={item.id} className="todoApp">
          <div className="container mx-auto border my-3 large shadow rounded  bg-white">
            <div className="text-left my-4 d-flex flex-row justify-content-between align-items-center">
              <>{content}</>

              <div className="">
                <button
                  id={item.id}
                  className="btn  btn-danger mx-2"
                  onClick={onDeleteHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  let editContent = null;
  if (allWorks.length !== 0) {
    editContent = (
      <button
        type="button"
        className="btn  btn-success mx-2 px-4"
        onClick={onEditClick}
      >
        Edit Works
      </button>
    );
  } else {
    editContent = null;
  }

  return (
    <>
      <div className="container mx-auto border my-4 large shadow rounded bg-white">
        <h1 className="text-center mt-3">Todo App</h1>
        <div className="my-5">
          <form
            className="row aligning my-4  mx-auto  "
            onSubmit={onSubmitClick}
          >
            <div className="col text-center">
              <label className="h5 ">What do you want to do?</label>
            </div>
            <div className="col ">
              <input
                id="input"
                value={newWork}
                type="text"
                className="form-control"
                onChange={(e) => {
                  setNewWork(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary px-5 my-2">
                Submit
              </button>
              {editContent}
            </div>
          </form>
        </div>
      </div>
      {renderingAllWorks()}
    </>
  );
}
export default App;

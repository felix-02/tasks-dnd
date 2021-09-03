import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import { addTodos } from "../../redux/todoReducer";

import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & .field {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #c7c7c7;
  }
  & button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #c7c7c7;
  }
  & button:hover {
    cursor: pointer;
  }
  & button:not(:last-child) {
    margin-right: 10px;
  }
  & > div {
    text-align: right;
  }
`;

const StyledAddIcon = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

const TodaysTask = ({ todos }) => {
  const [task, setTask] = useState({ name: "", description: "", priority: "" });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(
      addTodos({
        name: task.name,
        description: task.description,
        priority: task.priority,
        status: "active",
      })
    );
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        visible: true,
        message: "Task created successfully!",
        background: "#5dbb36",
      },
    });
    setTask({ name: "", description: "", priority: "" });
    setShowModal(false);
  };

  const handleFieldChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      <p>
        Today's Task{" "}
        <StyledAddIcon onClick={() => setShowModal(true)}>
          &#8853;
        </StyledAddIcon>
      </p>

      <div>
        {todos.map((itm, index) => (
          <Card key={index}>
            <p>{itm.name}</p>
            <p>{itm.description}</p>
            <p>{itm.priority}</p>
            <p>{itm.status}</p>
          </Card>
        ))}
      </div>
      {showModal && (
        <Modal
          show={showModal}
          title="Add New Task!"
          close={() => {
            setShowModal(false);
            setTask({ name: "", description: "", priority: "" });
          }}
        >
          <StyledForm onSubmit={handleAddTask}>
            <input
              name="name"
              className="field"
              type="text"
              placeholder="Enter a task..."
              value={task.name}
              onChange={handleFieldChange}
            />
            <textarea
              name="description"
              className="field"
              type="text"
              placeholder="Description"
              value={task.description}
              onChange={handleFieldChange}
            />
            <select
              onChange={handleFieldChange}
              name="priority"
              value={task.priority}
              className="field"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setTask({ name: "", description: "", priority: "" });
                }}
              >
                Cancel
              </button>

              <button type="submit">Submit</button>
            </div>
          </StyledForm>
        </Modal>
      )}
    </div>
  );
};

export default TodaysTask;

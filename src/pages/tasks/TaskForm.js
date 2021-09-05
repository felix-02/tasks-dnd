import React, { useState } from "react";
import styled from "styled-components";

import ApiClient from "../../api";
import { addTask, editTask } from "../../redux/taskReducer";
import { showToast } from "../../redux/toastReducer";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  & textarea {
    resize: none;
  }
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
  & button:first-child:hover {
    cursor: pointer;
  }
  & button:not(:last-child) {
    margin-right: 10px;
  }
  & > div {
    text-align: right;
  }
  & .submit-btn {
    background: ;
  }
`;

const StyledSubmitbutton = styled.button`
  background: ${(props) => (props.disabled ? "#c8c8c8" : "#00C851")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: #fff;
`;

const TaskForm = ({ dispatch, setShowModal, showModal }) => {
  const [task, setTask] = useState({
    name: showModal.data.name || "",
    description: showModal.data.description || "",
    id: showModal.data.id || "",
    status: showModal.data.status || "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let url;
    let method;
    let payload = {
      name: task.name.trim(),
      description: task.description.trim(),
      status: task.status || "Todays Tasks",
    };

    if (task.id) {
      url = `${process.env.REACT_APP_BASE_URL}/tasks/${task.id}.json`;
      method = "PUT";
    } else {
      url = `${process.env.REACT_APP_BASE_URL}/tasks.json`;
      method = "POST";
    }
    try {
      const data = await ApiClient(url, method, payload);
      dispatch(
        task.id
          ? editTask({
              name: task.name.trim(),
              description: task.description.trim(),
              status: task.status,
              id: task.id,
            })
          : addTask({
              name: task.name.trim(),
              description: task.description.trim(),
              status: "Todays Tasks",
              id: data.name,
            })
      );
      dispatch(
        showToast({
          visible: true,
          message: task.id
            ? "Task edited successfully"
            : "Task created successfully!",
          background: "#5dbb36",
        })
      );

      setTask({ name: "", description: "", priority: "" });
      setShowModal({ visible: false, data: {}, type: "" });
    } catch (err) {
      dispatch(
        showToast({
          visible: true,
          message: "Something went wrong!",
          background: "red",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFieldChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <StyledForm onSubmit={handleTask}>
      <input
        name="name"
        className="field"
        type="text"
        placeholder="Enter task"
        value={task.name}
        onChange={handleFieldChange}
        disabled={submitting}
      />
      <textarea
        name="description"
        className="field"
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={handleFieldChange}
        disabled={submitting}
      />

      <div>
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            setTask({ name: "", description: "", priority: "" });
          }}
          disabled={submitting}
        >
          Cancel
        </button>

        <StyledSubmitbutton
          disabled={submitting || task.name === "" || task.description === ""}
          type="submit"
        >
          {submitting ? "Submitting..." : "Submit"}
        </StyledSubmitbutton>
      </div>
    </StyledForm>
  );
};

export default TaskForm;

import React, { useState } from "react";
import styled from "styled-components";

import ApiClient from "../../api";
import { showToast } from "../../redux/toastReducer";

const StyledDeleteTaskWrapper = styled.div`
  p {
    margin-bottom: 40px;
  }
  & .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;

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
  }
`;

const DeleteTaskLayer = ({ setShowModal, dispatch, showModal }) => {
  const [submitting, setSubmitting] = useState(false);
  const deleteTaskHandler = async () => {
    setSubmitting(true);
    try {
      await ApiClient(
        `${process.env.REACT_APP_BASE_URL}/tasks/${showModal.data.id}/.json`,
        "DELETE"
      );
      dispatch({
        type: "DELETE_TASK",
        payload: showModal.data.id,
      });
      dispatch(
        showToast({
          visible: true,
          message: "Task deleted successfully!",
          background: "#5dbb36",
        })
      );
      setShowModal({ visible: false, data: {}, type: "" });
    } catch (err) {
      dispatch(
        showToast({
          visible: true,
          message: "Failed to delete task!",
          background: "red",
        })
      );
    }
  };
  return (
    <StyledDeleteTaskWrapper>
      <p>Are you sure you want to delete?</p>
      <div className="btn-group">
        <button
          disabled={submitting}
          onClick={() => setShowModal({ visible: false, data: {}, type: "" })}
        >
          cancel
        </button>
        <button disabled={submitting} onClick={deleteTaskHandler}>
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </StyledDeleteTaskWrapper>
  );
};

export default DeleteTaskLayer;

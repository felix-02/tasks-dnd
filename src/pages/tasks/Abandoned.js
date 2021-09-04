import React, { useState } from "react";
import Card from "../../components/Card";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Modal from "../../components/Modal";

const StyledBox = styled.div`
  & > div {
    display: flex;
    justify-content: flex-end;
    & button:not(:last-child) {
      margin-right: 5px;
    }
    & button {
      padding: 5px 10px;
    }
  }
`;

const StyledAddIcon = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

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

const Abandoned = ({ todos }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    id: "",
  });
  const [showModal, setShowModal] = useState(false);

  const abandonedTodo = todos.filter((x) => x.status === "abandoned");
  return (
    <div>
      <p>
        Abandoned {""}
        {todos.length > 0 && (
          <StyledAddIcon onClick={() => setShowModal(true)}>
            &#8853;
          </StyledAddIcon>
        )}
      </p>
      <div>
        {abandonedTodo.map((itm, index) => (
          <Card key={index}>
            <StyledBox>
              <p>{itm.name}</p>
              <p>{itm.description}</p>
              <p>{itm.priority}</p>
              <p>{itm.id}</p>

              <div>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setTask(itm);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "DELETE_TASK", payload: itm.id });
                    dispatch({
                      type: "SHOW_TOAST",
                      payload: {
                        visible: true,
                        message: "Task deleted successfully!",
                        background: "#5dbb36",
                      },
                    });
                  }}
                >
                  delete
                </button>
              </div>
            </StyledBox>
          </Card>
        ))}
      </div>
      {showModal && (
        <Modal
          show={showModal}
          title="Abandon Task!"
          close={() => {
            setShowModal(false);
            setTask({ name: "", description: "", priority: "" });
          }}
        >
          <StyledForm onSubmit={() => {}}>
            <select
              onChange={() => {}}
              name="priority"
              value={task.priority}
              className="field"
            >
              <option selected disabled hidden value="">
                Select task to abandon
              </option>
              {todos
                .filter(
                  ({ id: id1 }) =>
                    !abandonedTodo.some(({ id: id2 }) => id2 === id1)
                )
                .map((itm) => (
                  <option value={itm.id}>{itm.name}</option>
                ))}
            </select>
            <div>
              <button
                type="button"
                onClick={() => {
                  setTask((prev) => ({
                    ...prev,
                    name: "",
                    description: "",
                    priority: "",
                  }));
                }}
              >
                Cancel
              </button>

              <button disabled={task.name === ""} type="submit">
                Submit
              </button>
            </div>
          </StyledForm>
        </Modal>
      )}
    </div>
  );
};

export default Abandoned;

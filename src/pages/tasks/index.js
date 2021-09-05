import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { editTask, setTasks } from "../../redux/taskReducer";
import { showToast } from "../../redux/toastReducer";
import ApiClient from "../../api";

import TaskForm from "./TaskForm";
import DeleteTaskLayer from "./DeleteTaskLayer";
import ListColumn from "./ListColumn";
import ListItem from "./ListItem";

const StyledSection = styled.section`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  & .add-task:hover {
    cursor: pointer;
  }
  & .column-container {
    min-width: 20px;
    pad: 0.4rem;
    height: 80vh;
    margin: 0 auto;
    background-color: #adefd1ff;
    border: 1px solid #f8f8f8;
  }
  & .column-head {
    text-align: center;
    padding: 10px;
    font-size: 1.2em;
    background-color: #567572ff;
    color: #fff;
    font-weight: bold;
  }
`;

const columns = [
  "Todays Tasks",
  "Pending",
  "Abandoned",
  "Completed",
  "In Progress",
];

const StyledMain = styled.main`
  & header {
    background: #36454f;
    color: #fff;
    padding: 1rem;
    font-weight: bold;
    height: 10vh;
    display: flex;
    align-items: center;
    & input {
      margin-left: auto;
      padding: 10px;
      border: 1px solid #f8f8f8;
    }
    & span {
      margin-left: 10px;
    }
    & span:hover {
      cursor: pointer;
    }
  }
  & > div {
    height: 90vh;
  }
`;

const StyledCard = styled.div`
  padding: 1rem;
  cursor: grab;

  background-color: #fff;
  border: 1px solid #f8f8f8;
  border-radius: 5px;
  margin: 1rem;
  & > div {
    margin: 1rem 0;
  }
  & p {
    margin-bottom: 0.4rem;
    color: #38384c;
  }

  & .title {
    font-weight: bold;
  }
  & .btn-group {
    display: flex;
    justify-content: flex-end;
  }
  & .btn-group button {
    border: 1px solid transparent;
    background: #fff;

    & i {
      font-size: 18px;
      color: grey;
    }
    & i:hover {
      cursor: pointer;
    }
  }

  & .btn-group button:not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledCardsWrapper = styled.div`
  max-height: 580px;
  overflow: auto;
`;

const StyledLoaderContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
`;

const Tasks = () => {
  const [showModal, setShowModal] = useState({
    visible: false,
    data: {},
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const tasks = useSelector((state) => state.task);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await ApiClient(
          `${process.env.REACT_APP_BASE_URL}/tasks.json`,
          "GET"
        );
        let list = [];
        for (let key in data) {
          list.push({ ...data[key], id: key });
        }
        dispatch(setTasks(list));
      } catch (err) {
        dispatch(
          showToast({
            visible: true,
            message: "Something went wrong!",
            background: "red",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [dispatch]);

  const changeTaskStatus = useCallback(
    async (id, status) => {
      let task = tasks.find((task) => task.id === id);
      const prevTask = { ...task };

      if (task.status === status) {
        return;
      }
      task = { ...task, status };

      dispatch(editTask(task));
      try {
        await ApiClient(
          `https://task-management-13998-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
          "PUT",
          {
            name: task.name,
            description: task.description,
            status: task.status,
          }
        );

        dispatch(
          showToast({
            visible: true,
            message: `Task status changed to ${status} successfully!`,
            background: "#5dbb36",
          })
        );
      } catch (err) {
        dispatch(editTask(prevTask));
        dispatch(
          showToast({
            visible: true,
            message: `Failed to change Task status!`,
            background: "red",
          })
        );
      }
    },
    [dispatch, tasks]
  );

  return (
    <StyledMain>
      <header>
        <h1>Task Management</h1>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search tasks..."
        />
        {searchTerm && (
          <span onClick={() => setSearchTerm("")}>
            <i class="far fa-times-circle"></i>
          </span>
        )}
      </header>
      {loading ? (
        <StyledLoaderContainer>
          <Loader />
        </StyledLoaderContainer>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <StyledSection>
            {columns.map((category) => (
              <ListColumn
                key={category}
                status={category}
                changeTaskStatus={changeTaskStatus}
              >
                <div className="column-container">
                  <div className="column-head">
                    <span
                      className="add-task"
                      onClick={() =>
                        setShowModal({
                          visible: true,
                          data: {},
                          type: "ADD_TASK",
                        })
                      }
                    >
                      {category === "Todays Tasks" && (
                        <i className="fas fa-plus fa-sm"></i>
                      )}{" "}
                    </span>
                    {category} (
                    {
                      tasks
                        .filter((item) => item.status === category)
                        .filter(
                          (itm) =>
                            itm.name.includes(
                              searchTerm.toLowerCase().trim()
                            ) ||
                            itm.description.includes(
                              searchTerm.toLowerCase().trim()
                            )
                        ).length
                    }
                    ){" "}
                  </div>
                  <StyledCardsWrapper>
                    {tasks
                      .filter((item) => item.status === category)
                      .filter(
                        (itm) =>
                          itm.name.includes(searchTerm.toLowerCase().trim()) ||
                          itm.description.includes(
                            searchTerm.toLowerCase().trim()
                          )
                      )
                      .map((item) => (
                        <ListItem key={item.id} id={item.id}>
                          <StyledCard>
                            <div>
                              <p className="title">{item.name}</p>
                              <p className="description">{item.description}</p>
                            </div>

                            <div className="btn-group">
                              <button
                                type="button"
                                className="trash-icon"
                                onClick={() => {
                                  setShowModal({
                                    visible: true,
                                    data: item,
                                    type: "EDIT_TASK",
                                  });
                                }}
                              >
                                <i className="fas fa-pen"></i>
                              </button>

                              <button
                                onClick={() => {
                                  setShowModal({
                                    visible: true,
                                    data: item,
                                    type: "DELETE_TASK",
                                  });
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </StyledCard>
                        </ListItem>
                      ))}
                  </StyledCardsWrapper>
                </div>
              </ListColumn>
            ))}
          </StyledSection>
        </DndProvider>
      )}

      {showModal.visible && (
        <Modal
          show={showModal}
          title={
            showModal.type === "ADD_TASK"
              ? "Add New Task!"
              : showModal.type === "EDIT_TASK"
              ? "Edit Task"
              : "Delete Task"
          }
          close={() => {
            setShowModal({ visible: false, data: {}, type: "" });
          }}
        >
          {showModal.type === "DELETE_TASK" ? (
            <DeleteTaskLayer
              dispatch={dispatch}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ) : (
            <TaskForm
              dispatch={dispatch}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          )}
        </Modal>
      )}
    </StyledMain>
  );
};

export default Tasks;

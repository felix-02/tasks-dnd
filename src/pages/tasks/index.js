import React from "react";
import { useSelector } from "react-redux";

import Abandoned from "./Abandoned";
import Completed from "./Completed";
import Inprogress from "./Inprogress";
import PendingTasks from "./PendingTasks";
import TodaysTask from "./TodaysTask";

import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  & > div {
    flex: 1;
    border: 1px solid #ebc534;
    & > p {
      text-align: center;
      background: #ff0068;
      color: #fff;
      font-weight: bold;
      padding: 10px 0;
    }
    & > div {
      padding: 20px 10px;
      & > div:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
`;

const Tasks = () => {
  const todos = useSelector((state) => state.task);

  return (
    <div>
      <h2>Tasks</h2>
      <StyledWrapper>
        <TodaysTask todos={todos} />
        <PendingTasks />
        <Abandoned />
        <Completed />
        <Inprogress />
      </StyledWrapper>
    </div>
  );
};

export default Tasks;

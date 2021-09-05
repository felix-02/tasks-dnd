import { useRef } from "react";
import { useDrop } from "react-dnd";

const ListColumn = ({ status, changeTaskStatus, children }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "CARD",
    drop(item) {
      changeTaskStatus(item.id, status);
    },
  });
  drop(ref);
  return <div ref={ref}> {children}</div>;
};

export default ListColumn;

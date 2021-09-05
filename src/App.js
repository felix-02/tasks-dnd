import { useSelector } from "react-redux";
import Toast from "./components/Toast";

import Tasks from "./pages/Tasks";

function App() {
  const toast = useSelector((state) => state.toast);
  return (
    <>
      <Tasks />
      {toast.visible && <Toast />}
    </>
  );
}

export default App;

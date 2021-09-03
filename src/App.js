import Tasks from "./pages/tasks";

import { useSelector } from "react-redux";
import Toast from "./components/Toast";

function App() {
  const toast = useSelector((state) => state.toast);
  return (
    <div>
      <Tasks />
      {toast.visible && <Toast />}
    </div>
  );
}

export default App;

import { Controls } from "./components/Controls";
import { MatrixTable } from "./components/MatrixTable";
import { MatrixProvider } from "./context/MatrixProvider";

import "./styles/global.css";

function App() {
  return (
    <MatrixProvider>
      <div className="app">
        <Controls />
        <MatrixTable />
      </div>
    </MatrixProvider>
  );
}

export default App;

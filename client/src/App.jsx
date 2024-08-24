import { useState } from "react";
import AddItemForm from "./AddItemForm";
import Items from "./Items";

function App() {
  const [rerenderList, setRerenderList] = useState(false);

  return (
    <div>
      <AddItemForm handleRerender={setRerenderList} rerender={rerenderList} />
      <Items rerender={rerenderList} />
    </div>
  );
}

export default App;

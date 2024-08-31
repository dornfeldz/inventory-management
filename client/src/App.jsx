import { useState } from "react";
import AddItemForm from "./pages/AddItemForm";
import Items from "./pages/Items";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import UpdateItem from "./pages/UpdateItem";

function App() {
  const [rerenderList, setRerenderList] = useState(false);

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <Items handleRerender={setRerenderList} rerender={rerenderList} />
          ),
        },
        {
          path: "/items",
          element: (
            <Items handleRerender={setRerenderList} rerender={rerenderList} />
          ),
        },
        {
          path: "/addItem",
          element: (
            <AddItemForm
              handleRerender={setRerenderList}
              rerender={rerenderList}
            />
          ),
        },
        {
          path: "/update/:id",
          element: <UpdateItem />,
        },
      ],
    },
  ]);

  return (
    <div className="max-w-[70rem] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

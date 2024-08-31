import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Items({ handleRerender, rerender }) {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://inventory-backend-gules.vercel.app/api/items"
        );
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [rerender]);

  const handleDelete = (id) => {
    axios
      .delete(`https://inventory-backend-gules.vercel.app/api/items/${id}`)
      .then(() => {
        console.log(`${id} deleted!`);
        handleRerender((prev) => !prev);
        displaySuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displaySuccess = () => {
    setSuccessMessage("Item deleted!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <>
      <table className="text-xs lg:text-base border w-[90%] lg:w-[80%] mx-auto">
        <thead>
          <tr className="text-left border-b">
            <th>Inventory ID</th>
            <th>Name</th>
            <th>Model</th>
            <th>Depot</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.inventory_id}</td>
              <td>{item.name}</td>
              <td>{item.model}</td>
              <td>{item.depot}</td>
              <td>{item.price}Ft</td>
              <td>
                <p
                  className="hover:cursor-pointer w-min"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </p>
              </td>
              <td>
                <Link to={`/update/${item._id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-center mt-5">{successMessage}</p>
    </>
  );
}

export default Items;

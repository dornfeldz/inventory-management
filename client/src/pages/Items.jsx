import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Items({ handleRerender, rerender }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/items");
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
      .delete(`http://localhost:3000/api/items/${id}`)
      .then(() => {
        console.log(`${id} deleted!`);
        handleRerender((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <table className="text-xs md:text-md border w-[90%] md:w-[80%] mx-auto">
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
  );
}

export default Items;

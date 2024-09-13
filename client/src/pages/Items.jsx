import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../ui/Loader";

function Items({ handleRerender, rerender }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://inventory-backend-gules.vercel.app/api/items"
        );
        const data = await res.json();
        setItems(data);
      } catch (error) {
        setErrorMessage("Error fetching data.");
      } finally {
        setIsLoading(false);
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
        if (error.response) {
          setErrorMessage(error.response.data.message || "Error deleting item");
        } else {
          setErrorMessage("Network error or server not responding");
        }
      });
  };

  const displaySuccess = () => {
    setSuccessMessage("Item deleted!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <>
      {isLoading && <Loader />}
      <table className="text-xs lg:text-base border w-[90%] lg:w-[80%] mx-auto rounded-md">
        <thead className="bg-[#4A90E2] text-white">
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
            <tr
              key={index}
              className="even:bg-white odd:bg-[#F2F2F2] hover:bg-[#E0F3FF] text-[#333333]"
            >
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
      <p className="mt-5 text-center text-green-500">{successMessage}</p>
      {errorMessage && (
        <p className="mx-auto text-center text-red-500">{errorMessage}</p>
      )}
    </>
  );
}

export default Items;

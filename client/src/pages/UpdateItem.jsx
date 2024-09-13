import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function UpdateItem() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [item, setItem] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://inventory-backend-gules.vercel.app/api/items/${id}`
        );
        const data = await res.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://inventory-backend-gules.vercel.app/api/items/${id}`, item)
      .then((response) => {
        console.log(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const displaySuccess = () => {
    setSuccessMessage("Item updated!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <>
      <h1 className="mx-auto mb-5 text-3xl font-bold text-center">
        Update item
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-[50%] mx-auto">
        <label htmlFor="inventory_id">Inventory ID</label>
        <input
          type="number"
          name="inventory_id"
          id=""
          value={item.inventory_id}
          onChange={handleChange}
          className="border rounded-md"
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id=""
          value={item.name}
          onChange={handleChange}
          className="border rounded-md"
        />
        <label htmlFor="model">Model</label>
        <input
          type="text"
          name="model"
          id=""
          value={item.model}
          onChange={handleChange}
          className="border rounded-md"
        />
        <label htmlFor="depot">Depot</label>
        <select
          name="depot"
          id="depot"
          onChange={handleChange}
          value={item.depot}
          className="border rounded-md"
        >
          <option value=""></option>
          <option value="IT Depot">IT Depot</option>
          <option value="Central Depot">Central Depot</option>
          <option value="NX Depot">NX Depot</option>
        </select>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id=""
          value={item.price}
          onChange={handleChange}
          className="border rounded-md"
        />
        <button
          type="submit"
          className="mt-5 mb-5 hover:bg-[#459fff] bg-[#007BFF] py-2 rounded-md text-white"
        >
          Update Item
        </button>
      </form>
      <p className="mx-auto text-center text-green-500">{successMessage}</p>
      {errorMessage && (
        <p className="mx-auto text-center, text-red-500">{errorMessage}</p>
      )}
    </>
  );
}

export default UpdateItem;

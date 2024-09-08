import { useState } from "react";
import axios from "axios";

function AddItemForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    inventory_id: "",
    name: "",
    model: "",
    depot: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://inventory-backend-gules.vercel.app/api/items", formData)
      .then((response) => {
        console.log(response.data);
        displaySuccess();
        setFormData({
          inventory_id: "",
          name: "",
          model: "",
          depot: "",
          price: "",
        });
        // handleRerender((prev) => !prev);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const displaySuccess = () => {
    setSuccessMessage("Item added!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[50%] mx-auto">
      <label htmlFor="inventory_id">Inventory ID</label>
      <input
        type="number"
        name="inventory_id"
        id=""
        value={formData.inventory_id}
        onChange={handleChange}
        className="border rounded-md"
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id=""
        value={formData.name}
        onChange={handleChange}
        className="border rounded-md"
      />
      <label htmlFor="model">Model</label>
      <input
        type="text"
        name="model"
        id=""
        value={formData.model}
        onChange={handleChange}
        className="border rounded-md"
      />
      <label htmlFor="depot">Depot</label>
      <select
        name="depot"
        id="depot"
        onChange={handleChange}
        value={formData.depot}
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
        value={formData.price}
        onChange={handleChange}
        className="border rounded-md"
      />
      <button
        type="submit"
        className="mt-5 mb-5 hover:bg-[#459fff] bg-[#007BFF] py-2 rounded-md text-white"
      >
        Add Item
      </button>
      <p className="mx-auto">{successMessage}</p>
    </form>
  );
}

export default AddItemForm;

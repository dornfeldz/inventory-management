import { useState } from "react";
import axios from "axios";

function AddItemForm({ handleRerender, rerender }) {
  const [formData, setFormData] = useState({
    inventory_id: "",
    name: "",
    model: "",
    depot: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/items", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    handleRerender((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[50%]">
      <label htmlFor="inventory_id">Inventory ID</label>
      <input
        type="number"
        name="inventory_id"
        id=""
        value={formData.inventory_id}
        onChange={handleChange}
        className="border"
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id=""
        value={formData.name}
        onChange={handleChange}
        className="border"
      />
      <label htmlFor="model">Model</label>
      <input
        type="text"
        name="model"
        id=""
        value={formData.model}
        onChange={handleChange}
        className="border"
      />
      <label htmlFor="depot">Depot</label>
      <input
        type="text"
        name="depot"
        id=""
        value={formData.depot}
        onChange={handleChange}
        className="border"
      />
      <label htmlFor="price">Price</label>
      <input
        type="number"
        name="price"
        id=""
        value={formData.price}
        onChange={handleChange}
        className="border"
      />
      <button type="submit" className="border mb-10">
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;

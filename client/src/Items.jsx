import { useEffect, useState } from "react";

function Items({ rerender }) {
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

  return (
    <table className="border w-[50%]">
      <thead>
        <tr className="text-left border-b">
          <th>Inventory ID</th>
          <th>Name</th>
          <th>Model</th>
          <th>Depot</th>
          <th>Price</th>
          <th>Delete</th>
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
              <p className="hover:cursor-pointer w-min">Delete</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Items;

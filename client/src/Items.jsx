import { useEffect, useState } from "react";

function Items() {
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
  }, []);

  return (
    // <ol>
    //   {items.map((item, index) => (
    //     <li key={index}>
    //       {item.inventory_id} | {item.name} | {item.model} | {item.depot} |{" "}
    //       {item.price}Ft
    //     </li>
    //   ))}
    // </ol>
    <table className="border w-[50%]">
      <thead>
        <tr className="text-left border-b">
          <th>Inventory ID</th>
          <th>Name</th>
          <th>Model</th>
          <th>Depot</th>
          <th>Price</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Items;

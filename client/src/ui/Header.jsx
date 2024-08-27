import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between mx-10 mb-5 items-baseline">
      <h1 className="text-xl font-bold">EcoSTAT 2&#9415;</h1>
      <div className="flex gap-3">
        <Link to="/items">Items</Link>
        <Link to="/addItem">Add Item</Link>
      </div>
    </div>
  );
}

export default Header;

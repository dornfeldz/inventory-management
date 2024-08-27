import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between mx-10 mb-5 mt-2 items-baseline">
      <Link to="/">
        <div className="flex">
          <h1 className="text-xl font-extrabold">EcoSTAT 2</h1>
          <p className="text-sm font-extrabold">&#9415;</p>
        </div>
      </Link>
      <div className="flex gap-3">
        <Link to="/items" className="hover:underline">
          Items
        </Link>
        <Link to="/addItem" className="hover:underline">
          Add Item
        </Link>
      </div>
    </div>
  );
}

export default Header;

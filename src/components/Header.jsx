
import React from "react";
import { useSelector } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Badge } from "@mui/material";

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      <h1 className="text-2xl font-bold text-pink-600">MYNTRA</h1>

      <div className="flex items-center gap-6">
        <span className="cursor-pointer">Profile</span>

        {/* Bag Icon with Badge */}
        <Badge
          badgeContent={totalQuantity}
          color="primary"
          showZero
          overlap="circular"
        >
          <ShoppingBagIcon fontSize="large" className="cursor-pointer" />
        </Badge>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeItem,
  removeItemCompletely,
  updateItemQuantity,
} from "../cart/CartSlice";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartPage = () => {
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Typography variant="h5" className="mb-6 font-semibold">
        Shopping Bag ({totalQuantity} items)
      </Typography>
      {items.length === 0 ? (
        <Typography variant="h6" className="text-center text-gray-500">
          Your cart is empty 🛒
        </Typography>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {/* Left Side - Items */}
          <div className="col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-md rounded-2xl">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    />
                    <div>
                      <Typography variant="subtitle1">{item.title}</Typography>
                      <Typography variant="body2" className="text-gray-600">
                        ₹{item.price} each
                      </Typography>
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2 gap-2">
                        <IconButton
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          <Remove />
                        </IconButton>
                        {/* Editable Quantity Input */}
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              updateItemQuantity({
                                id: item.id,
                                quantity: Number(e.target.value),
                              })
                            )
                          }
                          inputProps={{ min: 1 }}
                          size="small"
                          style={{ width: "60px" }}
                        />
                        <IconButton
                          onClick={() => dispatch(addToCart(item))}
                        >
                          <Add />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Typography
                      variant="subtitle1"
                      className="font-semibold"
                    >
                      ₹{item.price * item.quantity}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() =>
                        dispatch(removeItemCompletely(item.id))
                      }
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Right Side - Summary */}
          <div className="p-4 border rounded-xl shadow-sm h-fit">
            <Typography variant="h6" className="mb-4">
              Price Details
            </Typography>
            <div className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4 rounded-xl"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

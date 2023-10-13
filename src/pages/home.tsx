
import { useEffect, useState } from "react";
import { ADD_PERSISITED_DATA } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    const discount: any = localStorage.getItem("discount");
    const total: any = localStorage.getItem("total");
    if (data) {
      dispatch(
        ADD_PERSISITED_DATA({
          cart: JSON.parse(data),
          total: total,
          discount: discount,
        })
      );
    }
  }, []);



  return <div className='h-5 bg-red-600 text-yellow-500'>asdasdsdasd</div>;
};

export default Home;

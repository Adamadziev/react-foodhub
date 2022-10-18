import React from "react";
import { useSelector } from "react-redux";

import { Footer } from "../../components/Footer";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { OrderItem } from "../../components/OrderItem";

import "./Order.css";

export const Order = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [orderList, setOrderList] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <section className="order-grid">
        <div className="your-order up">
          <h3 onClick={() => setOrderList((prev) => !prev)}>Состав заказа</h3>
          {orderList && (
            <ul>
              {cartItems.map((item, i) => {
                return <OrderItem key={i} {...item} />;
              })}
            </ul>
          )}
        </div>
        <Form />
        <div className="your-order">
          {cartItems.length !== 0 ? (
            <>
              <h3>Состав заказа</h3>
              <ul>
                {cartItems.map((item, i) => {
                  return <OrderItem key={i} {...item} />;
                })}
              </ul>
            </>
          ) : (
            <h3>Вы ничего не добавили в корзину</h3>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Order;

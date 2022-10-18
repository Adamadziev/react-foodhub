import React from "react";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

export const Form = () => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector((state) => state.cart.items);

  const [orderData, setOrderData] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [checkHouse, setCheckHouse] = React.useState(false);
  const [cashPay, setCashPay] = React.useState(true);
  const [onlinePay, setOnlinePay] = React.useState(false);
  const [noChange, setNoChange] = React.useState(false);

  const errorSign = () => {
    return <i style={{ color: "rgb(198,34,34)" }}>*</i>;
  };

  const errorBorder = () => {
    return { borderBottom: "1px solid rgb(215,34,34)" };
  };

  const onClickChekoutOrder = () => {
    if (cartItems.length === 0) {
      alert("Невозможно оформить пустой заказ");
    }
  };

  const onClickCashPay = () => {
    setCashPay(true);
    setOnlinePay(false);
  };

  const onClickOnlinePay = () => {
    setOnlinePay(true);
    setCashPay(false);
  };

  const onClickNoChange = () => {
    setNoChange((prev) => !prev);
  };

  console.log(orderData);

  return (
    <div className="details">
      <h1>Оформление заказа</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setOrderData([data, cartItems]);
          reset();
        })}
      >
        <div className="name-phone">
          <div className="name input-form">
            <span>Имя {errors.name && errorSign()}</span>
            <input
              {...register("name", { required: true })}
              style={errors.name && errorBorder()}
              className="inp"
              type="text"
            />
            {/* <p>{errors.name?.message}</p> */}
          </div>
          <div className="phone input-form">
            <span>Телефон {errors.phone && errorSign()}</span>
            <input
              {...register("phone", {
                required: true,
                minLength: 11,
              })}
              style={errors.phone && errorBorder()}
              className="inp"
              type="tel"
            />
          </div>
        </div>
        <div className="delivery active">
          <h4>Доставка</h4>
          <div className="street input-form">
            <span>Улица {errors.phone && errorSign()}</span>
            <input
              {...register("street", {
                required: true,
              })}
              style={errors.street && errorBorder()}
              className="inp"
              type="text"
            />
          </div>
          <div className="house input-form">
            <span>Дом {errors.house && errorSign()}</span>
            <input
              {...register("house", {
                required: true,
              })}
              style={errors.house && errorBorder()}
              className="inp"
              type="text"
            />
          </div>
          <div className={checkHouse ? "flat none" : "flat input-form"}>
            <span>Квартира {errors.flat && errorSign()}</span>
            <input
              {...register("flat", {
                required: !checkHouse,
              })}
              style={errors.flat && errorBorder()}
              className="inp"
              type="text"
            />
          </div>
          <div className={checkHouse ? "floor none" : "floor input-form"}>
            <span>Этаж {errors.floor && errorSign()}</span>
            <input
              {...register("floor", {
                required: !checkHouse,
              })}
              style={errors.floor && errorBorder()}
              className="inp"
              type="text"
            />
          </div>
          <div className={checkHouse ? "entrance none" : "entrance input-form"}>
            <span>Подъезд {errors.entrance && errorSign()}</span>
            <input
              {...register("entrance", {
                required: !checkHouse,
              })}
              style={errors.entrance && errorBorder()}
              className="inp"
              type="text"
            />
          </div>
          <div className="private-house">
            <input
              type="checkbox"
              id="check-house"
              value={checkHouse}
              onChange={() => setCheckHouse((prev) => !prev)}
            />
            <label htmlFor="check-house"> Частный Дом </label>
          </div>
        </div>
        <div className="comments input-form">
          Комментарий к заказу
          <input {...register("comment")} className="inp" type="text" />
        </div>
        <div className="person input-form">
          Кол-во персон
          <input {...register("countPerson")} type="text" className="inp" />
        </div>
        <div className="way-payment">
          <h4>Способ оплаты</h4>
          <div className="cash">
            <input
              {...register("cashPay")}
              type="radio"
              id="cash"
              name="contact"
              defaultChecked={cashPay}
            />
            <label
              className="cash-label"
              htmlFor="cash"
              value={cashPay}
              onClick={onClickCashPay}
            >
              Наличными курьеру
            </label>
            <div
              className={cashPay ? "change-block active" : "change-block none"}
            >
              <span className={noChange ? "change none" : "change"}>
                <span>Сдача с {errors.change && errorSign()}</span>
                <input
                  {...register("changeFrom", {
                    required: !noChange && cashPay,
                  })}
                  style={errors.change && errorBorder()}
                  type="text"
                  className="inp"
                />
              </span>
              <span className="no-change">
                <input
                  {...register("noChange")}
                  type="checkbox"
                  id="no-change-input"
                  value={noChange}
                  onChange={onClickNoChange}
                />
                <label className="no-change-label" htmlFor="no-change-input">
                  Без сдачи
                </label>
              </span>
            </div>
          </div>
          <div className="card">
            <input
              {...register("onlinePay")}
              type="radio"
              id="card"
              name="contact"
              value={onlinePay}
              onChange={onClickOnlinePay}
            />
            <label className="card-label" htmlFor="card">
              Онлайн перевод курьеру
            </label>
          </div>
        </div>
        <div className="order-price">
          <div className="sum">
            <p>Сумма заказ</p>
            <p className="sum-price">{totalPrice} р</p>
          </div>
          <div className="total">
            <p>Итого к оплате. Скидка 10% </p>
            <p>{totalPrice - totalPrice * 0.1} р</p>
          </div>
          <button disabled={cartItems.length === 0} className="btn-primary">
            Оформить заказ
          </button>
          <p className="personal-data">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, quo
            quisquam! Harum assumenda illo obcaecati soluta libero tempore quasi
            labore fugit voluptatem similique perspiciatis, explicabo itaque
            quam magnam vitae alias?
          </p>
        </div>
      </form>
    </div>
  );
};

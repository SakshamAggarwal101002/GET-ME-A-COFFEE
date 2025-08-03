"use client";
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { initiate, fetchUser, fetchPayments } from '@/actions/useractions';
import { useSession } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = ({ username }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast('Payment has been made', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const getData = async () => {
    let u = await fetchUser(username);
    setCurrentUser(u);
    let dbPayments = await fetchPayments(username);
    setPayments(dbPayments);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentForm);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid,
      amount,
      currency: "INR",
      name: "Get me a coffee",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "+919876543210"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer theme="light" transition={Bounce} />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* Cover */}
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350px]"
          src={currentUser.coverpic}
          alt="cover"
        />
        <div className="absolute -bottom-20 right-1/2 translate-x-1/2 border-white border-2 rounded-full overflow-hidden w-[150px] h-[150px]">
          <img
            className="w-full h-full object-cover"
            src={currentUser.profilepic}
            alt="profile"
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="info flex justify-center items-center my-24 flex-col gap-2 mb-24 px-4 text-center">
        <div className="text-white font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Let's help {username} get a coffee!</div>
        <div className="text-slate-400">
{payments.length} Payments • {currentUser.name} ₹{payments.reduce((a, b) => a + Number(b.amount), 0)} raised.
        </div>

        {/* Payments Section */}
        <div className="payment flex flex-col lg:flex-row gap-4 w-full max-w-6xl mt-11">
          {/* Supporters List */}
          <div className="supporters w-full lg:w-1/2 bg-slate-900 rounded-lg text-white p-6">
            <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && <li>No payments</li>}
              {payments.map((p, i) => (
                <li key={i} className="my-4 flex gap-2 items-start">
                  <img width={33} src="/avatar.gif" alt="avatar" />
                  <span>
                    {p.name} donated <span className="font-bold">₹{p.amount}</span>
                    <br />
                    <span className="italic text-sm">"{p.message}"</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Form */}
          <div className="makePayment w-full lg:w-1/2 bg-slate-900 rounded-lg text-white p-6">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <input
                onChange={handleChange}
                value={paymentForm.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Name"
              />
              <input
                onChange={handleChange}
                name="message"
                value={paymentForm.message}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                name="amount"
                value={paymentForm.amount}
                type="number"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                onClick={() => pay(Number(paymentForm.amount) * 100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"
                disabled={
                  paymentForm.name.length < 3 ||
                  paymentForm.message.length < 4 ||
                  paymentForm.amount.length < 1
                }
              >
                Pay
              </button>
            </div>

            {/* Quick Pay Buttons */}
            <div className="flex flex-wrap gap-2 mt-5">
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
              <button className="bg-slate-800 p-3 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

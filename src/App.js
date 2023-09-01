// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from "react";
export default function App() {
  const [amount, setAmount] = useState(10);
  const [fromCur, setfromCur] = useState("USD");
  const [toCur, settoCur] = useState("EUR");
  const [convertedCur, setConvertedCur] = useState("");
  const [isLoading, setIsloading] = useState(false);
  useEffect(
    function () {
      async function convertCurrency() {
        setIsloading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        console.log(res);
        if (!res.ok) return;
        const data = await res.json();
        console.log(data);
        // use the below logic if the nested  property is not dynamic
        // const {
        //   rates: { EUR: currency }
        // } = data;
        // console.log(currency);
        // setConvertedCur(currency);
        setConvertedCur(data.rates[toCur]);
        // console.log(convertedCur);
        setIsloading(false);
      }

      if (fromCur === toCur) return setConvertedCur(amount);
      convertCurrency();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
          // console.log(amount);
        }}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => {
          setfromCur(e.target.value);
          // console.log(fromCur);
        }}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => {
          settoCur(e.target.value);
          // console.log(toCur);
        }}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {convertedCur} {toCur}
      </p>
    </div>
  );
}

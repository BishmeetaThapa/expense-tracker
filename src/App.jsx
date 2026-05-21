import { useState } from "react";


function App(){
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const[expenses, setexpenses] = useState([]);

  function handleExpenseChange(e){
    setExpense(e.target.value);
   }

   function handleAmountChange(e){
    setAmount(e.target.value);
   }

   function addExpense(){
    if(!expense || !amount)return;
    const newExpense ={
      id: Date.now(),
      expense:expense,
      amount: amount,
    };
    setexpenses([...expenses, newExpense]);
    setExpense("");
    setAmount("")
   }

   
  return(
    <div>
      <h1>Expense Tracker</h1>

    <input
    value={expense}
    onChange={handleExpenseChange}
     placeholder="Expense name"
     /> 


    <input 
    value={amount}
    onChange={handleAmountChange}
    placeholder="Amount"/>


    
    <button onClick={addExpense}>Add Expense</button>

    <div>{expenses.map((item) =>(<div key={item.id}>
      {item.expense}-{item.amount}</div>
      ))}</div>
    </div>

     );
}
export default App;
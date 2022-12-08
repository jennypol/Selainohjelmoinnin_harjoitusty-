import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Lisää uusi tapahtuma</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Auton nimi</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Syötä auto..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Syötä polttoainekustannukset
            (positiivinen tulo)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Syötä summa..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Polttoaine määrä
            (litroina)</label>
          <input type="number" value={polttoaine} onChange={(e) => setAmount(e.target.value)} placeholder="Syötä polttoaine..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Tankillisella ajetut kilometrit</label>
          <input type="number" value={kilometrit} onChange={(e) => setAmount(e.target.value)} placeholder="Syötä kilometrit..." />
        </div>
    

        <button className="btn">Add transaction</button>
      </form>
    
    </>
  )
}
import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listCheques } from './graphql/queries';
import { createCheque as createChequeMutation, deleteCheque as deleteChequeMutation } from './graphql/mutations';

const initialFormState = { chequeNumber: '', payee: '', chequeDate: '' }

function App() {
  const [Cheques, setCheques] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCheques();
  }, []);

  async function fetchCheques() {
    const apiData = await API.graphql({ query: listCheques });
    setCheques(apiData.data.listCheques.items);
  }

  async function createCheque() {
    if (!formData.payee && !formData.chequeNumber) return;
    await API.graphql({ query: createChequeMutation, variables: { input: formData } });
    console.log(formData)
    setCheques([ ...Cheques, formData ]);
    setFormData(initialFormState);
  }

  async function deleteCheque({ id }) {
    const newChequesArray = Cheques.filter(Cheque => Cheque.id !== id);
    setCheques(newChequesArray);
    await API.graphql({ query: deleteChequeMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Cheques App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'chequeNumber': e.target.value})}
        placeholder="Cheque Number"
        value={formData.chequeNumber}
      />
      <input
        onChange={e => setFormData({ ...formData, 'payee': e.target.value})}
        placeholder="Cheque payee"
        value={formData.payee}
      />
      <input
        onChange={e => setFormData({ ...formData, 'chequeDate': e.target.value})}
        placeholder="Cheque Date"
        value={formData.chequeDate}
      />
      <button onClick={createCheque}>Create Cheque</button>
      <div style={{marginBottom: 30}}>
        {
          Cheques.map(Cheque => (
            <div key={Cheque.id || Cheque.payee}>
              <h2>{Cheque.id}</h2>
              <p>{Cheque.chequeNumber}</p>
              <p>{Cheque.payee}</p>
              <p>{Cheque.chequeDate}</p>
              <button onClick={() => deleteCheque(Cheque)}>Delete Cheque</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
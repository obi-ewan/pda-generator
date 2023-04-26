import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';

function PdaGenerator() {
  const [programIdSeed, setProgramIdSeed] = useState('');
  const [accountSeeds, setAccountSeeds] = useState([]);
  const [pda, setPda] = useState(null);

  const addAccountSeedField = () => {
    setAccountSeeds([...accountSeeds, '']);
  };

  const updateAccountSeed = (index, value) => {
    const newAccountSeeds = [...accountSeeds];
    newAccountSeeds[index] = value;
    setAccountSeeds(newAccountSeeds);
  };

  const removeAccountSeedField = (index) => {
    const newAccountSeeds = [...accountSeeds];
    newAccountSeeds.splice(index, 1);
    setAccountSeeds(newAccountSeeds);
  };

  const generatePda = async () => {
    try {
      const programId = new PublicKey(programIdSeed);
      const accountSeedBuffers = accountSeeds.map((seed) => new TextEncoder().encode(seed));
      const [pdaPublicKey, _] = await PublicKey.findProgramAddress(accountSeedBuffers, programId);
      setPda(pdaPublicKey.toBase58());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="programIdSeed">Program ID seed:</label>
        <input type="text" id="programIdSeed" value={programIdSeed} onChange={(e) => setProgramIdSeed(e.target.value)} />
      </div>
      <div>
        <label htmlFor="accountSeeds">Account seeds:</label>
        <button onClick={addAccountSeedField}>Add seed</button>
        {accountSeeds.map((seed, index) => (
          <div key={index}>
            <input type="text" value={seed} onChange={(e) => updateAccountSeed(index, e.target.value)} />
            <button onClick={() => removeAccountSeedField(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={generatePda}>Generate PDA</button>
      {pda && <div>PDA: {pda}</div>}
    </div>
  );
}

export default PdaGenerator;


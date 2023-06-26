
import { ApiPromise, WsProvider } from '@polkadot/api';
const wsProvider = new WsProvider('wss://main-00.goro.network');
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

const api = await ApiPromise.create({ provider: wsProvider });


// check extension
const extensions = await web3Enable('my cool dapp');


// Get accounts
const allAccounts = await web3Accounts();


if (extensions.length === 0) {
  console.log('asd');
}

// bisa ambil dari list account
const sender = 'gr6WHTUzqqB1Awqmydyn24qwbbNYnivMDGnVGKrXxza9eCGJu'
const dest = '5Dynvn7518ZYpGwBpGH9AMUm5Tc4JjyBQ3MwpvSQ8BugBtUU'

const injector = await web3FromAddress(sender);

const doTf = () => {
  return api.tx.balances
  .transfer(dest, BigInt(3_000))
  .signAndSend(sender, { signer: injector.signer }, (result) => { 

    console.log(`Current status is ${result.status}`);

    if (result.status.isInBlock) {
      alert(`Transaction included at blockHash ${result.status.asInBlock}`);
    } else if (result.status.isFinalized) {
      alert(`Transaction finalized at blockHash ${result.status.asFinalized}`);
    }
  });
}




function App() {

  return (
    <>
      <div>{api.genesisHash.toHex()}</div>
      <div>
        <button onClick={() => doTf()}>Transfer</button>
      </div>
    </>
  )
}

export default App

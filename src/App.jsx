import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { useEffect, useState } from 'react';

const sdk = new ThirdwebSDK(process.env.REACT_APP_ETHEREUM_NETWORK);
const bundleDropModule = sdk.getBundleDropModule(
  process.env.REACT_APP_BUNDLE_DROP_ADDRESS
);

const App = () => {
  const { connectWallet, address, provider } = useWeb3();
  console.log('👋 Address:', address);

  const [claimedNFT, setClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const signer = provider ? provider.getSigner() : undefined;

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }
    return bundleDropModule
      .balanceOf(address, '0')
      .then((balance) => {
        if (balance.gt(0)) {
          setClaimedNFT(true);
          console.log('🌟 this user has a membership NFT!');
        } else {
          setClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      })
      .catch((error) => {
        setClaimedNFT(false);
        console.error('failed to get nft balance', error);
      });
  }, [address]);

  const mintNFT = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim('0', 1)
      .then(() => {
        setClaimedNFT(true);
        console.log(
          `🌊 Successfully Minted! Check it our on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      })
      .catch((err) => {
        console.error('failed to claim', err);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to HamsterDAO</h1>
        <button onClick={() => connectWallet('injected')} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNFT()}>
        {isClaiming ? 'Minting...' : 'Mint your nft (FREE)'}
      </button>
    </div>
  );
};

export default App;

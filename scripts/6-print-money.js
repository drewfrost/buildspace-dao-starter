import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';

import dotenv from 'dotenv';
dotenv.config();

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule = sdk.getTokenModule(
  process.env.REACT_APP_ERC20_CONTRACT_ADDRESS
);

(async () => {
  try {
    const amount = 1_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    console.log(
      '✅ There now is',
      ethers.utils.formatUnits(totalSupply, 18),
      'HMSTR in circulation'
    );
  } catch (error) {
    console.error('Failed to print money', error);
  }
})();

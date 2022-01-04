import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: 'HamsterDAO Membership',
      description: 'Animal helpers DAO',
      image: readFileSync('scripts/assets/hamster.jpeg'),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      '✅ Successfully deployed bundleDrop module, address:',
      bundleDropModule.address
    );
    console.log(
      '✅ bundleDrop metadata:',
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log('failed to deploy bundleDrop moduƒle', error);
  }
})();

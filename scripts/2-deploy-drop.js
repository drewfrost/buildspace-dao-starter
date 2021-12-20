import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const app = sdk.getAppModule('0xEC105B9E6Ac3CE951F010357692F71680C78b729');

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

import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const bundleDrop = sdk.getBundleDropModule(process.env.REACT_APP_BUNDLE_DROP_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Hamster DAO Token',
        description: 'This NFT gives you access to Hamster DAO',
        image: readFileSync('scripts/assets/hamster-token.jpeg'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create the new NFT', error);
  }
})();

import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const bundleDrop = sdk.getBundleDropModule(process.env.BUNDLE_DROP_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Hamster DAO Token',
        description: 'THis NFT gives you access to Hamster DAO',
        image: readFileSync('scripts/assets/hamster-token.jpeg'),
      },
    ]);
    console.log('✅ Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error('failed to create NFT with error: ', error);
  }
})()

import sdk from './1-initialize-sdk.js';

const appModule = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "HamsterDAO's Proposal",

      votingTokenAddress: process.env.REACT_APP_ERC20_CONTRACT_ADDRESS,

      proposalStartWaitTimeInSeconds: 0,

      proposalVotingTimeInSeconds: 24 * 60 * 60,

      votingQuorumFraction: 0,

      minimumNumberOfTokensNeededToPropose: '0',
    });

    console.log(
      '✅ Successfully deployed vote module, address:',
      voteModule.address
    );
  } catch (err) {
    console.error('Failed to deploy vote module', err);
  }
})();

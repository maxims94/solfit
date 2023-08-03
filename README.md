# SolFit

A gym with a built-in incentive to actually come and train.

Realized on the Solana blockchain.

Best explanation is [here](https://www.youtube.com/watch?v=PJ1FmzHM_SE)

## Frontend

![Screenshot](/img/screenshot.png)

## Solana program

### What is stored on-chain per user?

```
{
  member_month: 7, // the last month the user paid for, 7 = July 2023
  num_avail: 4 // the number of available rewards for user in this month, range: 0-4, 1 reward = $10
}
```

### What functions does the smart contract have?

* `start_membership`
    * Simulates the user purchasing the membership for another month
    * Increments `member_month`
    * Resets `num_avail` to `4`
    * The user must transfer $120 USDC to a PDA
    * [Sample transaction](https://explorer.solana.com/tx/3CHZDQqF4Y3WC5GCRaxc5EgzD1FLMvmc5m6ts8SLMcpsTiQ6Wtr6QyTZP3BzP53dP2Pojnk6J15E2tjbvJRisXxz)
* `claim_reward`
    * Only valid if `num_avail` is still > 0
    * In that case, it is decremented and $10 are sent back to the user as cashback
* `reset_user`
    * For testing purposes
    * Sets `member_month` and `num_avail` to `0`, essentially cancelling the membership
    * All of the USDC that is stored in the respective PDA is transferred back to them
* [Source code of the Solana Program](https://github.com/maxims94/solfit/tree/main/program)

### Deployment

* On mainnet: 7bd3GWaR7h5X6ZAndStp9vD5NbQY5a7V9Q6UMMCm3tCd

## Links

* [Fun demo video](https://www.youtube.com/watch?v=PJ1FmzHM_SE)
* [Live version](https://solfit.vercel.app/)
* [Slides](https://drive.google.com/file/d/1lyJYxVDKDag30idml863Xg46TMlxzL_3/view)

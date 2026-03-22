// import { Wallet, Provider, utils } from "zksync-ethers";
// const { ethers } = require("ethers");

// /**
//  * ZkSyncEthBridge
//  *
//  * Bridges native ETH between Ethereum (L1) and zkSync Era (L2)
//  * using the official zksync-ethers SDK, signed with a raw private key.
//  *
//  * ETH is the native base token on zkSync Era, so no approve() step is needed.
//  *
//  * ─── Deposit flow (Ethereum → zkSync Era) ────────────────────────────────────
//  *   1. deposit()              — locks ETH in the L1 bridge, mints on L2
//  *                               arrives on L2 in ~1–5 minutes
//  *   2. waitForDeposit()       — (optional) polls until the L2 tx is confirmed
//  *   3. claimFailedDeposit()   — (optional) refunds ETH if the L2 tx failed
//  *
//  * ─── Withdrawal flow (zkSync Era → Ethereum) ─────────────────────────────────
//  *   1. withdraw()             — initiates withdrawal on L2, returns txHash
//  *                               STORE THIS HASH — needed for finalization
//  *   2. finalizeWithdrawal()   — submits proof on L1 to release ETH
//  *                               wait ~24 hours for the proof window to pass
//  *
//  * ─── Utilities ───────────────────────────────────────────────────────────────
//  *   getL1Balance()            — ETH balance on Ethereum
//  *   getL2Balance()            — ETH balance on zkSync Era
//  *   getAddress()              — wallet address derived from the private key
//  *   estimateDepositFee()      — estimate L1 gas cost before depositing
//  *   ZkSyncEthBridge.toWei()   — convert ETH string → wei string
//  *   ZkSyncEthBridge.fromWei() — convert wei string → ETH string
//  */
// export class ZkSyncEthBridge {
//   /**
//    * @param {object} config
//    * @param {string} config.privateKey      - Hex private key (with or without 0x prefix)
//    * @param {string} config.l1RpcUrl        - Ethereum mainnet RPC (e.g. Infura / Alchemy)
//    * @param {string} config.l2RpcUrl        - zkSync Era RPC URL
//    *                                          Mainnet: https://mainnet.era.zksync.io
//    *                                          Testnet: https://sepolia.era.zksync.dev
//    */
//   constructor(config) {
//     this.config = config;
//     this.wallet = null;
//     this.l1Provider = null;
//     this.l2Provider = null;
//     this._initialized = false;
//   }

//   /**
//    * Set up providers and the zkSync Wallet.
//    * Must be called once before any bridge operation.
//    *
//    * @returns {Promise<string>} The wallet address derived from the private key
//    */
//   async init() {
//     if (this._initialized) return this.wallet.address;

//     const privateKey = this.config.privateKey.startsWith("0x")
//       ? this.config.privateKey
//       : `0x${this.config.privateKey}`;

//     // zksync-ethers uses its own Provider (an extension of ethers JsonRpcProvider)
//     // for L2, and a standard ethers provider for L1
//     this.l2Provider = new Provider(this.config.l2RpcUrl);
//     this.l1Provider = new ethers.JsonRpcProvider(this.config.l1RpcUrl);

//     // NOTE: Wallet argument order is (privateKey, l2Provider, l1Provider)
//     // — l2 comes BEFORE l1, unlike what you might expect
//     this.wallet = new Wallet(privateKey, this.l2Provider, this.l1Provider);

//     this._initialized = true;
//     return this.wallet.address;
//   }

//   _assertInitialized() {
//     if (!this._initialized) {
//       throw new Error("Bridge not initialized. Call init() first.");
//     }
//   }

//   // ─── DEPOSIT (Ethereum L1 → zkSync Era L2) ───────────────────────────────

//   /**
//    * Deposit ETH from Ethereum into zkSync Era.
//    *
//    * No approve() needed — ETH is the native base token, sent as msg.value.
//    * ETH typically arrives on L2 within ~1–5 minutes.
//    *
//    * @param {string} amountWei          - Amount in wei (use ZkSyncEthBridge.toWei())
//    * @param {string} [toAddress]        - Recipient on L2 (defaults to own address)
//    * @returns {Promise<{ txHash: string, waitForL2: () => Promise<object> }>}
//    *   txHash     — the L1 transaction hash
//    *   waitForL2  — call this to block until the deposit is confirmed on L2
//    */
//   async deposit(amountWei, toAddress) {
//     this._assertInitialized();

//     const depositTx = await this.wallet.deposit({
//       token: utils.ETH_ADDRESS,
//       amount: amountWei,
//       to: toAddress ?? this.wallet.address,
//       refundRecipient: this.wallet.address,
//     });

//     const receipt = await depositTx.wait();

//     return {
//       txHash: depositTx.hash,
//       // Convenience: let the caller await L2 confirmation without
//       // needing to know the SDK internals
//       waitForL2: () => depositTx.waitL1Commit(),
//     };
//   }

//   /**
//    * Wait for a deposit to be confirmed on L2.
//    * Useful if you need to block until funds are spendable on zkSync Era.
//    *
//    * @param {string} l1TxHash  - txHash returned from deposit()
//    * @returns {Promise<object>} L2 transaction receipt
//    */
//   async waitForDeposit(l1TxHash) {
//     this._assertInitialized();

//     // Reconstruct the priority op response from the L1 hash so we can
//     // call waitL1Commit regardless of where deposit() was invoked
//     const l1Receipt = await this.l1Provider.getTransactionReceipt(l1TxHash);
//     const l2Response = await this.l2Provider.getL2TransactionFromPriorityOp(l1Receipt);
//     return l2Response.wait();
//   }

//   /**
//    * Claim a refund for a deposit whose L2 transaction failed.
//    * The SDK will call claimFailedDeposit on the L1 bridge contract.
//    *
//    * @param {string} l1TxHash  - txHash returned from deposit()
//    * @returns {Promise<object>} L1 transaction receipt
//    */
//   async claimFailedDeposit(l1TxHash) {
//     this._assertInitialized();
//     const tx = await this.wallet.claimFailedDeposit(l1TxHash);
//     return tx.wait();
//   }

//   // ─── WITHDRAWAL (zkSync Era L2 → Ethereum L1) ────────────────────────────

//   /**
//    * Initiate a withdrawal from zkSync Era back to Ethereum.
//    *
//    * Burns ETH on L2 and registers the withdrawal. You MUST store the
//    * returned txHash — it is required to call finalizeWithdrawal() later.
//    *
//    * @param {string} amountWei          - Amount in wei
//    * @param {string} [toAddress]        - Recipient on Ethereum (defaults to own address)
//    * @returns {Promise<{ txHash: string }>}
//    */
//   async withdraw(amountWei, toAddress) {
//     this._assertInitialized();

//     const withdrawTx = await this.wallet.withdraw({
//       token: utils.ETH_ADDRESS,
//       amount: amountWei,
//       to: toAddress ?? this.wallet.address,
//     });

//     await withdrawTx.wait(); // wait for L2 confirmation
//     return { txHash: withdrawTx.hash };
//   }

//   /**
//    * Finalize a withdrawal on Ethereum, releasing the locked ETH.
//    *
//    * The ZK proof must be generated and the challenge window must pass
//    * (~24 hours on mainnet) before this will succeed.
//    *
//    * You can check readiness first with isWithdrawalFinalized().
//    *
//    * @param {string} withdrawTxHash  - L2 txHash returned from withdraw()
//    * @returns {Promise<{ txHash: string, receipt: object }>}
//    */
//   async finalizeWithdrawal(withdrawTxHash) {
//     this._assertInitialized();

//     const tx = await this.wallet.finalizeWithdrawal(withdrawTxHash);
//     const receipt = await tx.wait();
//     return { txHash: tx.hash, receipt };
//   }

//   /**
//    * Check whether a withdrawal is ready to be finalized on L1.
//    * Use this to gate finalizeWithdrawal() calls.
//    *
//    * @param {string} withdrawTxHash  - L2 txHash returned from withdraw()
//    * @returns {Promise<boolean>}
//    */
//   async isWithdrawalFinalized(withdrawTxHash) {
//     this._assertInitialized();
//     return this.wallet.isWithdrawalFinalized(withdrawTxHash);
//   }

//   // ─── UTILITIES ────────────────────────────────────────────────────────────

//   /**
//    * Get ETH balance on Ethereum (L1), in wei.
//    * @returns {Promise<string>}
//    */
//   async getL1Balance() {
//     this._assertInitialized();
//     const balance = await this.wallet.getBalanceL1();
//     return balance.toString();
//   }

//   /**
//    * Get ETH balance on zkSync Era (L2), in wei.
//    * @returns {Promise<string>}
//    */
//   async getL2Balance() {
//     this._assertInitialized();
//     const balance = await this.wallet.getBalance();
//     return balance.toString();
//   }

//   /**
//    * Estimate the L1 gas fee for a deposit before sending it.
//    * Useful for showing the user a cost preview.
//    *
//    * @param {string} amountWei  - Amount you intend to deposit, in wei
//    * @returns {Promise<string>} Estimated fee in wei
//    */
//   async estimateDepositFee(amountWei) {
//     this._assertInitialized();
//     const fee = await this.wallet.getFullRequiredDepositFee({
//       token: utils.ETH_ADDRESS,
//       amount: amountWei,
//     });
//     return fee.l1GasLimit.mul(fee.maxFeePerGas ?? fee.gasPrice).toString();
//   }

//   /**
//    * The wallet address derived from the private key.
//    * @returns {string}
//    */
//   getAddress() {
//     this._assertInitialized();
//     return this.wallet.address;
//   }

//   /**
//    * Convert human-readable ETH to wei string.
//    * e.g. ZkSyncEthBridge.toWei("0.5") → "500000000000000000"
//    * @param {string} ethAmount
//    * @returns {string}
//    */
//   static toWei(ethAmount) {
//     return ethers.parseEther(ethAmount).toString();
//   }

//   /**
//    * Convert wei string to human-readable ETH.
//    * e.g. ZkSyncEthBridge.fromWei("500000000000000000") → "0.5"
//    * @param {string} weiAmount
//    * @returns {string}
//    */
//   static fromWei(weiAmount) {
//     return ethers.formatEther(weiAmount);
//   }
// }
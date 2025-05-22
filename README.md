# 🔍 ENS Name Checker CLI

A simple CLI tool to check the availability of Ethereum Name Service (ENS) `.eth` domains.

---

## 🚀 Features

- Check availability of one or multiple ENS names.
- Uses `ethers.js` to connect to the Ethereum network.
- Accepts custom RPC URLs (e.g. Infura, Alchemy).
- Supports `.env` for secure API key handling.

---

## 📦 Installation

```bash
npm install -g ens-vns
```

## 🛠 Usage

ens-check vitalik.eth mycoolname.eth

You can check multiple ENS names at once. Each name will return:

✅ Available

❌ Taken

## Reverse ENS lookup
Given an Ethereum address, find the associated ENS name:

ens-check --reverse 0x1234567890abcdef1234567890abcdef12345678

## 🌐 RPC Configuration
🔑 Required: Ethereum RPC URL (e.g., Infura)
You must provide a valid Ethereum RPC endpoint for the tool to connect to the blockchain.

### Option 1: Use .env
Create a .env file in the root directory:

RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
### Option 2: Pass via CLI

ens-check vitalik.eth -n https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID

### Option 3: Use public fallback (not recommended for production)
If neither is set, the CLI may fall back to a public RPC, which is rate-limited and less reliable.

## 🔧 CLI Options
ens-check [names...] [options]

## Basic usage with default or .env RPC
ens-check satoshi.eth elon.eth mystartup.eth

## Specify custom RPC URL directly
ens-check myname.eth -n https://mainnet.infura.io/v3/YOUR_INFURA_KEY
🧪 Development
Clone the repo:

git clone https://github.com/nandkk05/ens-vns.git
cd ens-vns
npm install
Link locally:

npm link
ens-check test.eth
🔐 Security Tip
Never commit .env files with your API keys to GitHub. Always include .env in .gitignore.

## 📄 License
MIT © [Nand Kishor]

💬 Feedback / Issues
Feel free to open issues or PRs on GitHub.

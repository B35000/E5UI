const currencies = [
  {
    "id": "acala",
    "symbol": "aca",
    "name": "Acala"
  },
  {
    "id": "algorand",
    "symbol": "algo",
    "name": "Algorand"
  },
  {
    "id": "apecoin",
    "symbol": "ape",
    "name": "ApeCoin"
  },
  {
    "id": "polkadot",
    "symbol": "dot",
    "name": "Polkadot"
  },
  {
    "id": "kusama",
    "symbol": "ksm",
    "name": "Kusama"
  },
  {
    "id": "aptos",
    "symbol": "apt",
    "name": "Aptos"
  },
  {
    "id": "arweave",
    "symbol": "ar",
    "name": "Arweave"
  },
  {
    "id": "astar",
    "symbol": "astr",
    "name": "Astar"
  },
  {
    "id": "avalanche-2",
    "symbol": "avax",
    "name": "Avalanche"
  },
  {
    "id": "berachain-bera",
    "symbol": "bera",
    "name": "Berachain"
  },
  {
    "id": "binancecoin",
    "symbol": "bnb",
    "name": "BNB"
  },
  {
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin"
  },
  {
    "id": "bitcoin-cash",
    "symbol": "bch",
    "name": "Bitcoin Cash"
  },
  {
    "id": "bitrise-token",
    "symbol": "brise",
    "name": "Bitgert"
  },
  {
    "id": "bittorrent",
    "symbol": "btt",
    "name": "BitTorrent"
  },
  {
    "id": "bone-bone",
    "symbol": "bone",
    "name": "Bone"
  },
  {
    "id": "canto",
    "symbol": "canto",
    "name": "CANTO"
  },
  {
    "id": "celestia",
    "symbol": "tia",
    "name": "Celestia"
  },
  {
    "id": "celo",
    "symbol": "celo",
    "name": "Celo"
  },
  {
    "id": "coinex-token",
    "symbol": "cet",
    "name": "CoinEx"
  },
  {
    "id": "conflux-token",
    "symbol": "cfx",
    "name": "Conflux"
  },
  {
    "id": "core-2",
    "symbol": "core",
    "name": "Core"
  },
  {
    "id": "cosmos",
    "symbol": "atom",
    "name": "Cosmos Hub"
  },
  {
    "id": "cronos-zkevm-cro",
    "symbol": "zkcro",
    "name": "Cronos zkEVM CRO"
  },
  {
    "id": "crypto-com-chain",
    "symbol": "cro",
    "name": "Cronos"
  },
  {
    "id": "dash",
    "symbol": "dash",
    "name": "DASH"
  },
  {
    "id": "dogecoin",
    "symbol": "doge",
    "name": "Dogecoin"
  },
  {
    "id": "energi",
    "symbol": "nrg",
    "name": "Energi"
  },
  {
    "id": "energy-web-token",
    "symbol": "ewt",
    "name": "Energy Web"
  },
  {
    "id": "eos",
    "symbol": "eos",
    "name": "EOS"
  },
  {
    "id": "ether-1",
    "symbol": "etho",
    "name": "Etho Protocol"
  },
  {
    "id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum"
  },
  {
    "id": "ethereum-classic",
    "symbol": "etc",
    "name": "Ethereum Classic"
  },
  {
    "id": "evmos",
    "symbol": "evmos",
    "name": "Evmos"
  },
  {
    "id": "fantom",
    "symbol": "ftm",
    "name": "Fantom"
  },
  {
    "id": "filecoin",
    "symbol": "fil",
    "name": "Filecoin"
  },
  {
    "id": "flare-networks",
    "symbol": "flr",
    "name": "Flare"
  },
  {
    "id": "frax",
    "symbol": "frax",
    "name": "Legacy Frax Dollar"
  },
  {
    "id": "fuse-network-token",
    "symbol": "fuse",
    "name": "Fuse"
  },
  {
    "id": "gas",
    "symbol": "gas",
    "name": "Gas"
  },
  {
    "id": "gochain",
    "symbol": "go",
    "name": "GoChain"
  },
  {
    "id": "gopulse",
    "symbol": "go",
    "name": "GoPulse"
  },
  {
    "id": "harmony",
    "symbol": "one",
    "name": "Harmony"
  },
  {
    "id": "hedera-hashgraph",
    "symbol": "hbar",
    "name": "Hedera"
  },
  {
    "id": "hyperliquid",
    "symbol": "hype",
    "name": "Hyperliquid"
  },
  {
    "id": "iota",
    "symbol": "iota",
    "name": "IOTA"
  },
  {
    "id": "iotex",
    "symbol": "iotx",
    "name": "IoTeX"
  },
  {
    "id": "kai",
    "symbol": "kai",
    "name": "KAI"
  },
  {
    "id": "kaia",
    "symbol": "kaia",
    "name": "Kaia"
  },
  {
    "id": "kardiachain",
    "symbol": "kai",
    "name": "KardiaChain"
  },
  {
    "id": "karura",
    "symbol": "kar",
    "name": "Karura"
  },
  {
    "id": "kava",
    "symbol": "kava",
    "name": "Kava"
  },
  {
    "id": "klay-token",
    "symbol": "klay",
    "name": "Klaytn"
  },
  {
    "id": "litecoin",
    "symbol": "ltc",
    "name": "Litecoin"
  },
  {
    "id": "mantle",
    "symbol": "mnt",
    "name": "Mantle"
  },
  {
    "id": "mantra-dao",
    "symbol": "om",
    "name": "MANTRA"
  },
  {
    "id": "metis-token",
    "symbol": "metis",
    "name": "Metis"
  },
  {
    "id": "moonbeam",
    "symbol": "glmr",
    "name": "Moonbeam"
  },
  {
    "id": "moonriver",
    "symbol": "movr",
    "name": "Moonriver"
  },
  {
    "id": "neon",
    "symbol": "neon",
    "name": "Neon"
  },
  {
    "id": "nexion",
    "symbol": "neon",
    "name": "NEXION"
  },
  {
    "id": "oasis-network",
    "symbol": "rose",
    "name": "Oasis"
  },
  {
    "id": "okb",
    "symbol": "okb",
    "name": "OKB"
  },
  {
    "id": "one-ledger",
    "symbol": "olt",
    "name": "OneLedger"
  },
  {
    "id": "plume",
    "symbol": "plume",
    "name": "Plume"
  },
  {
    "id": "polygon-ecosystem-token",
    "symbol": "pol",
    "name": "POL (ex-MATIC)"
  },
  {
    "id": "pulsechain",
    "symbol": "pls",
    "name": "PulseChain"
  },
  {
    "id": "rei-network",
    "symbol": "rei",
    "name": "REI Network"
  },
  {
    "id": "ripple",
    "symbol": "xrp",
    "name": "XRP"
  },
  {
    "id": "ronin",
    "symbol": "ron",
    "name": "Ronin"
  },
  {
    "id": "sei-network",
    "symbol": "sei",
    "name": "Sei"
  },
  {
    "id": "shiden",
    "symbol": "sdn",
    "name": "Shiden Network"
  },
  {
    "id": "solana",
    "symbol": "sol",
    "name": "Solana"
  },
  {
    "id": "songbird",
    "symbol": "sgb",
    "name": "Songbird"
  },
  {
    "id": "sonic-3",
    "symbol": "s",
    "name": "Sonic"
  },
  {
    "id": "blockstack",
    "symbol": "stx",
    "name": "Stacks"
  },
  {
    "id": "stellar",
    "symbol": "xlm",
    "name": "Stellar"
  },
  {
    "id": "step-app-fitfi",
    "symbol": "fitfi",
    "name": "Step App"
  },
  {
    "id": "sui",
    "symbol": "sui",
    "name": "Sui"
  },
  {
    "id": "syscoin",
    "symbol": "sys",
    "name": "Syscoin"
  },
  {
    "id": "telos",
    "symbol": "tlos",
    "name": "Telos"
  },
  {
    "id": "tenet-1b000f7b-59cb-4e06-89ce-d62b32d362b9",
    "symbol": "tenet",
    "name": "TENET"
  },
  {
    "id": "tezos",
    "symbol": "xtz",
    "name": "Tezos"
  },
  {
    "id": "theta-fuel",
    "symbol": "tfuel",
    "name": "Theta Fuel"
  },
  {
    "id": "thunder-token",
    "symbol": "tt",
    "name": "ThunderCore"
  },
  {
    "id": "tomochain",
    "symbol": "vic",
    "name": "Viction"
  },
  {
    "id": "tron",
    "symbol": "trx",
    "name": "TRON"
  },
  {
    "id": "ultron",
    "symbol": "ulx",
    "name": "ULTRON"
  },
  {
    "id": "warpcore",
    "symbol": "core",
    "name": "Warpcore"
  },
  {
    "id": "webchain",
    "symbol": "mintme",
    "name": "MintMe.com Coin"
  },
  {
    "id": "wemix-token",
    "symbol": "wemix",
    "name": "WEMIX"
  },
  {
    "id": "xdai",
    "symbol": "xdai",
    "name": "XDAI"
  },
  {
    "id": "zksync-staked-eth",
    "symbol": "zketh",
    "name": "ZKsync Staked ETH"
  }
]

export default currencies; 
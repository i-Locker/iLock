import abi from "./abi";
import wrapped_abi from "./wrappers.js";
export const getBalance = (balance, decimal) => {
    if (balance.length < decimal+1) {
        for (let i = 0; i < decimal + 3 - balance.length; i++) {
            balance = `0${balance}`;
        }
    }
    let fixed_balance = balance.slice(0, -(decimal - 5));
    let exact_balance = `${fixed_balance.slice(0, -5)}.${fixed_balance.slice(-5)}`;
    return Number(exact_balance);
};
export default {
    // netId: 1,
    wrapped_tokens: [wrapped_abi.WRAPPED_TOKENS_ABI.wrapped.tokens],
    networks: {   
    1: {
            chainId: 1,
            name: "Ethereum Mainnet"
        },
        5: {
            chainId: 5,
            name: "Goerli Test Network"
        },
        137: {
            chainId: 137,
            name: "Matic Network"
        },
        338: {
            chainId: 338,
            name: "Cronos Network (testnet)"
        },
        444: {
            chainId: 444,
            name: "FrenChain Network"
        },
        44444: {
            chainId: 444,
            name: "FrenChain Network (testnet)"
        },
        420420: {
            chainId: 420420,
            name: "KekChain Network"
        },
        420666: {
            chainId: 420666,
            name: "KekChain Network (testnet)"
        },
        56: {
            chainId: 56,
            name: "Binance Smart Chain"
        },
        100: {
            chainId: 100,
            name: "xDai"
        },
        66: {
            chainId: 66,
            name: "OKEx"
        },
        1666600000: {
            chainId: 1666600000,
            name: "Harmony"
        },
        43113: {
            chainId: 43113,
            name: "Avalanche (testnet)"
        },
        43114: {
            chainId: 43114,
            name: "Avalanche"
        },
    },
    updateTime: 35000,
    swapFee: 0.0025,
    Languages: [
        {
            id: "english",
            code: "us",
            name: "English"
        },
        {
            id: "russian",
            code: "ru",
            name: "Русский"
        },
        {
            id: "korean",
            code: "kr",
            name: "한국어"
        },
        {
            id: "japanese",
            code: "jp",
            name: "日本語"
        },
    ],
    base: {
        mint: {
            rate: "0.3"
        },
        reward: {
            address: {
                "USDC-FREN": "",
                "USDT-FREN": "",
                "ETH-FREN": "",
                "WBTC-FREN": "",
                "USDC-KEK": "",
                "USDT-KEK": "",
                "ETH-KEK": "",
                "WBTC-KEK": ""
            },
            abi: {
                reward: {
                    single: abi.reward.single,
                    double: abi.reward.double
                }
            }
        },
        origin: {
            usdc: "0.00",
            usdt: "0.00",
            eth: "0.00",
            bnb: "0.00",
            matic: "0.00",
        }
    },
    erc20: {
        price: 0.00,
        address: "",
        abi: abi.erc20,
        symbol: "",
        img: ""
    },
    tokens: [
        "dai",
        "usdt",
        "usdc",
        "tezos",
        "fantom",
        "bnb",
        "matic",
        "quick",
        "skybit",
        "bitcoin",
        "kekchain",
        "crystaleum",
        "electronero",
        "frenchain",
        "wrapped-bnb",
        "wrapped-eth",
        "wrapped-matic",
        "wrapped-fantom",
        "wrapped-monero",
        "wrapped-bitcoin",
        "wrapped-kekchain",
        "wrapped-frenchain",
        "wrapped-crystaleum",
        "wrapped-electronero",
        "weth"
    ],
    contracts: [
        {
            id: "iStake",
            name: "iVAULT",
            sub_title: "AutoMatic",
            vault_token: {
                name: "iVault",
                address: "",
                abi: abi.erc20
            },
            ap: {
                title: "APR",
                key: ""
            },
            tags: [
                "iLock",
                "iLocks",
                "iVault",
                "iSTAKE",
                "iLocker",
                "iLockers"
            ],
            description: "Rebates",
            fee_description: "Early withdrawals are charged a penalty fee.",
            icons: [
                require("../assets/img/fren.png").default
            ],
            rewards: [
                "WMATIC",
                "WETH",
                "FREN",
                "BNB",
                "KEK",
                "ETNX",
                "ETNXP",
                "CRFI"
            ],
            status: {
                active: false,
                status: "Expired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "CRYPTO",
                name: "CRYPTO",
                address: "",
                abi: abi.erc20
            },
            vault: {
                address: "",
                abi: abi.stake.vault
            },
            rewarder: {
                address: "",
                abi: abi.stake.rewarder
            },
            buy: "",
            buy_tooltip: "Acquire LP tokens",
            filter: "vaults"
        },
    ]
}
import abi from "./abi";
export default {
    netId: 1,
    updateTime: 35000,
    swapFee: 0.0025,
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
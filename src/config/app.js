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
                "AUMI-MATIC": "0x7549bD32cAbA7bdeb4d7bcAF3f7Ff8bed13577Bc",
                "QUICK": "0xf28164A485B0B2C90639E47b0f377b4a438a16B1",
                "MATIC-QUICK": "0xd26E16f5a9dfb9Fe32dB7F6386402B8AAe1a5dd7",
                "MATIC-ETH": "0x3c1f53fed2238176419F8f897aEc8791C499e3c8",
                "WBTC-ETH": "0x2972175e1a35C403B5596354D6459C34Ae6A1070",
                "ETH-QUICK": "0x5BcFcc24Db0A16b1C01BAC1342662eBd104e816c",
                "D-QUICK": "0xf28164A485B0B2C90639E47b0f377b4a438a16B1"
            },
            abi: {
                reward: {
                    aumi: abi.reward.aumi,
                    single: abi.reward.single,
                    double: abi.reward.double
                },
                dquick: abi.dquick
            }
        },
        origin: {
            quick: "0.2408",
            aumi_lock: 200
        }
    },
    aumi: {
        price: 74.11,
        address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
        abi: abi.aumi.lock.self,
        symbol: "AUMI",
        img: "https://app.automatic.network/favicon.png"
    },
    tokens: [
        "automatic-network",
        "matic-network",
        "quick",
        "wrapped-bitcoin",
        "weth"
    ],
    contracts: [
        {
            id: "aumi-stake",
            name: "AUMI VAULT",
            sub_title: "AutoMatic",
            vault_token: {
                name: "AUMI",
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.aumi.lock.self
            },
            ap: {
                title: "APR",
                key: ""
            },
            tags: [
                "AUMI",
                "STAKE",
                "AUMI-STAKE"
            ],
            description: "Redistribution Fees",
            fee_description: "Early withdrawals before 3 months are charged a 50% penalty fee.",
            icons: [
                require("../assets/img/tokens/mati.jpg").default
            ],
            rewards: [
                "WMATIC",
                "AUMI"
            ],
            status: {
                active: false,
                status: "Retired"
            },
            mint: {
                rate: 0.3
            },
            base_token: {
                id: "automatic-network",
                name: "AUMI",
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.erc20
            },
            vault: {
                address: "0x82AeCa6D5fDAC30DEAE7D278aab2E70a7AC05193",
                abi: abi.aumi.stake.vault
            },
            rewarder: {
                address: "0x13F697b4cfae360C56a6695e7F06Ae1260f5b5Ba",
                abi: abi.aumi.stake.rewarder
            },
            aumi: {
                address: "0x3eB177A6693eC81d1E170136f8AD02fffBE172a7",
                abi: abi.aumi.stake.self
            },
            buy: "",
            buy_tooltip: "Acquire LP tokens on QuickSwap",
            filter: "aumi-vaults"
        },
    ]
}

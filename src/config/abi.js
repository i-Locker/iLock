export default {
    quick: {
        vault: require("./abi/vault.json"),
        self: require("./abi/quick.json")
    },
    lp: {
        vault: require("./abi/vault.json"),
        self: require("./abi/lp.json")
    },
    erc20: require("./abi/ERC20.json"),
    reward: {
        vault: require("./abi/vault.json"),
        single: require("./abi/reward-pool-single.json"),
        double: require("./abi/reward-pool-double.json")
    },
    stake: {
        vault: require("./abi/vault.json"),
        rewarder: require("./abi/vault.json")
    }
}
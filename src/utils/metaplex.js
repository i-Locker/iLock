import { PublicKey } from "@solana/web3.js";
import { deserializeUnchecked } from "borsh";
import { BinaryReader, BinaryWriter } from "borsh";
const base58 = require("bs58");
// eslint-disable-next-line
export const METADATA_REPLACE = new RegExp("\u0000", "g");
export const EDITION_MARKER_BIT_SIZE = 248;
export const METADATA_PREFIX = "metadata";
export const EDITION = "edition";
export class LazyAccountInfoProxy {
    constructor() {
        this.executable = false;
        this.owner = "";
        this.lamports = 0;
    }
    get data() {
        return undefined;
    }
}
const PubKeysInternedMap = new Map();
export const toPublicKey = (key) => {
    if (typeof key !== "string") {
        return key;
    }
    let result = PubKeysInternedMap.get(key);
    if (!result) {
        result = new PublicKey(key);
        PubKeysInternedMap.set(key, result);
    }
    return result;
};
export const WRAPPED_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
export const BPF_UPGRADE_LOADER_ID = new PublicKey("BPFLoaderUpgradeab1e11111111111111111111111");
export const MEMO_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
export const METADATA_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
export const VAULT_ID = "vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn";
export const AUCTION_ID = "auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8";
export const METAPLEX_ID = "p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98";
export const SYSTEM = new PublicKey("11111111111111111111111111111111");
export const getStoreID = async (storeOwnerAddress) => {
    if (!storeOwnerAddress) {
        return undefined;
    }
    const programs = await findProgramAddress([
        Buffer.from("metaplex"),
        toPublicKey(METAPLEX_ID).toBuffer(),
        toPublicKey(storeOwnerAddress).toBuffer(),
    ], toPublicKey(METAPLEX_ID));
    const storeAddress = programs[0];
    return storeAddress;
};
export const setProgramIds = async (store) => {
    STORE = store ? toPublicKey(store) : undefined;
};
let STORE;
export const programIds = () => {
    return {
        token: TOKEN_PROGRAM_ID,
        associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
        system: SYSTEM,
        metadata: METADATA_PROGRAM_ID,
        memo: MEMO_ID,
        vault: VAULT_ID,
        auction: AUCTION_ID,
        metaplex: METAPLEX_ID,
        store: STORE,
    };
};
export const findProgramAddress = async (seeds, programId) => {
    const key = "pda-" +
        seeds.reduce((agg, item) => agg + item.toString("hex"), "") +
        programId.toString();
    let cached = localStorage.getItem(key);
    if (cached) {
        const value = JSON.parse(cached);
        return [value.key, parseInt(value.nonce)];
    }
    const result = await PublicKey.findProgramAddress(seeds, programId);
    try {
        localStorage.setItem(key, JSON.stringify({
            key: result[0].toBase58(),
            nonce: result[1],
        }));
    }
    catch {
        // ignore
    }
    return [result[0].toBase58(), result[1]];
};
export var MetadataKey;
(function (MetadataKey) {
    MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
    MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
    MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
    MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
    MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
    MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
})(MetadataKey || (MetadataKey = {}));
export async function getEdition(tokenMint) {
    const PROGRAM_IDS = programIds();
    return (await findProgramAddress([
        Buffer.from(METADATA_PREFIX),
        toPublicKey(PROGRAM_IDS.metadata).toBuffer(),
        toPublicKey(tokenMint).toBuffer(),
        Buffer.from(EDITION),
    ], toPublicKey(PROGRAM_IDS.metadata)))[0];
}
class CreateMetadataArgs {
    constructor(args) {
        this.instruction = 0;
        this.data = args.data;
        this.isMutable = args.isMutable;
    }
}
class UpdateMetadataArgs {
    constructor(args) {
        this.instruction = 1;
        this.data = args.data ? args.data : null;
        this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
        this.primarySaleHappened = args.primarySaleHappened;
    }
}
export class Creator {
    constructor(args) {
        this.address = args.address;
        this.verified = args.verified;
        this.share = args.share;
    }
}
export class Data {
    constructor(args) {
        this.name = args.name;
        this.symbol = args.symbol;
        this.uri = args.uri;
        this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
        this.creators = args.creators;
    }
}
export class Metadata {
    constructor(args) {
        this.key = MetadataKey.MetadataV1;
        this.updateAuthority = args.updateAuthority;
        this.mint = args.mint;
        this.data = args.data;
        this.primarySaleHappened = args.primarySaleHappened;
        this.isMutable = args.isMutable;
        this.editionNonce = args.editionNonce;
    }
    async init() {
        const edition = await getEdition(this.mint);
        this.edition = edition;
        this.masterEdition = edition;
    }
}
export class Edition {
    constructor(args) {
        this.key = MetadataKey.EditionV1;
        this.parent = args.parent;
        this.edition = args.edition;
    }
}
export class MasterEditionV1 {
    constructor(args) {
        this.key = MetadataKey.MasterEditionV1;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
        this.printingMint = args.printingMint;
        this.oneTimePrintingAuthorizationMint =
            args.oneTimePrintingAuthorizationMint;
    }
}
export class MasterEditionV2 {
    constructor(args) {
        this.key = MetadataKey.MasterEditionV2;
        this.supply = args.supply;
        this.maxSupply = args.maxSupply;
    }
}
class CreateMasterEditionArgs {
    constructor(args) {
        this.instruction = 10;
        this.maxSupply = args.maxSupply;
    }
}
class MintPrintingTokensArgs {
    constructor(args) {
        this.instruction = 9;
        this.supply = args.supply;
    }
}
export class EditionMarker {
    constructor(args) {
        this.key = MetadataKey.EditionMarker;
        this.ledger = args.ledger;
    }
    editionTaken(edition) {
        const editionOffset = edition % EDITION_MARKER_BIT_SIZE;
        const indexOffset = Math.floor(editionOffset / 8);
        if (indexOffset > 30) {
            throw Error("bad index for edition");
        }
        const positionInBitsetFromRight = 7 - (editionOffset % 8);
        const mask = Math.pow(2, positionInBitsetFromRight);
        const appliedMask = this.ledger[indexOffset] & mask;
        // eslint-disable-next-line
        return appliedMask != 0;
    }
}
export const METADATA_SCHEMA = new Map([
    [
        CreateMetadataArgs,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["data", Data],
                ["isMutable", "u8"], // bool
            ],
        },
    ],
    [
        UpdateMetadataArgs,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["data", { kind: "option", type: Data }],
                ["updateAuthority", { kind: "option", type: "pubkeyAsString" }],
                ["primarySaleHappened", { kind: "option", type: "u8" }],
            ],
        },
    ],
    [
        CreateMasterEditionArgs,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["maxSupply", { kind: "option", type: "u64" }],
            ],
        },
    ],
    [
        MintPrintingTokensArgs,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["supply", "u64"],
            ],
        },
    ],
    [
        MasterEditionV1,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["supply", "u64"],
                ["maxSupply", { kind: "option", type: "u64" }],
                ["printingMint", "pubkeyAsString"],
                ["oneTimePrintingAuthorizationMint", "pubkeyAsString"],
            ],
        },
    ],
    [
        MasterEditionV2,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["supply", "u64"],
                ["maxSupply", { kind: "option", type: "u64" }],
            ],
        },
    ],
    [
        Edition,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["parent", "pubkeyAsString"],
                ["edition", "u64"],
            ],
        },
    ],
    [
        Data,
        {
            kind: "struct",
            fields: [
                ["name", "string"],
                ["symbol", "string"],
                ["uri", "string"],
                ["sellerFeeBasisPoints", "u16"],
                ["creators", { kind: "option", type: [Creator] }],
            ],
        },
    ],
    [
        Creator,
        {
            kind: "struct",
            fields: [
                ["address", "pubkeyAsString"],
                ["verified", "u8"],
                ["share", "u8"],
            ],
        },
    ],
    [
        Metadata,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["updateAuthority", "pubkeyAsString"],
                ["mint", "pubkeyAsString"],
                ["data", Data],
                ["primarySaleHappened", "u8"],
                ["isMutable", "u8"], // bool
            ],
        },
    ],
    [
        EditionMarker,
        {
            kind: "struct",
            fields: [
                ["key", "u8"],
                ["ledger", [31]],
            ],
        },
    ],
]);
export const extendBorsh = () => {
    BinaryReader.prototype.readPubkey = function () {
        const reader = this;
        const array = reader.readFixedArray(32);
        return new PublicKey(array);
    };
    BinaryWriter.prototype.writePubkey = function (value) {
        const writer = this;
        writer.writeFixedArray(value.toBuffer());
    };
    BinaryReader.prototype.readPubkeyAsString = function () {
        const reader = this;
        const array = reader.readFixedArray(32);
        return base58.encode(array);
    };
    BinaryWriter.prototype.writePubkeyAsString = function (value) {
        const writer = this;
        writer.writeFixedArray(base58.decode(value));
    };
};
extendBorsh();
export const decodeMetadata = (buffer) => {
    const metadata = deserializeUnchecked(METADATA_SCHEMA, Metadata, buffer);
    metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, "");
    metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, "");
    metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, "");
    return metadata;
};
export const getMetadataAddress = async (mintKey) => {
    const seeds = [
        Buffer.from("metadata"),
        new PublicKey(METADATA_PROGRAM_ID).toBuffer(),
        new PublicKey(mintKey).toBuffer(),
    ];
    return PublicKey.findProgramAddress(seeds, new PublicKey(METADATA_PROGRAM_ID));
};

import * as crypto from 'crypto-js';

class Block {
    static index = 0;
    private key = 0;
    public hash: any;
    private timestamp: any;
    private data = "";
    public previousHash = "";

    constructor(private message: string) {
        Block.index++;
        this.timestamp = new Date();
        this.data = 
            Block.index
            + this.timestamp
            + this.message
            + this.previousHash
    }

    createHash = () => {
        return crypto.HmacSHA256(this.message, this.key.toString());
    }
}

class Blockchain {
    public chain: Array<Block> = [];
    static previousHash = "";

    addBlock = (block: Block) => {
        block.previousHash = Blockchain.previousHash;
        block.hash = block.createHash();
        Blockchain.previousHash = block.hash;
        this.chain.push(block);
    }
}

const genesis = new Block("I am Genesis");
const tinyCoin = new Blockchain();

tinyCoin.addBlock(genesis);


// console.log(genesis);
// console.log(genesis.createHash().toString());
console.log(tinyCoin.chain[0].previousHash.toString());
console.log(tinyCoin.chain[0].hash.toString());

const superman = new Block("Superman gave 1- coins to Batman");
tinyCoin.addBlock(superman);

console.log(tinyCoin);
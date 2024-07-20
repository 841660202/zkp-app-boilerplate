const crypto = require('crypto');
const { BigNumber } = require('ethers');

// 生成 1024 位的随机数（128 字节）
const randomBytes = crypto.randomBytes(128); // 1024 位 = 128 字节
const randomHex = '0x' + randomBytes.toString('hex'); // 转换为十六进制字符串
console.log('randomHex', randomHex);
// 转换为 BigInt
const msgToSign = BigNumber.from(randomHex).toBigInt();

// console.log('Random 1024-bit number:', msgToSign);

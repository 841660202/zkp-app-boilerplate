pragma circom 2.0.0;
include "../../node_modules/circomlib/circuits/eddsaposeidon.circom";

template Sample() {
    // public
    signal input M; // 消息，公有输入。
    signal input Ax; // 公钥的 x 坐标，公有输入。
    signal input Ay; // 公钥的 y 坐标，公有输入。
    // private
    signal input S; // 签名的 S 部分，私有输入。
    signal input R8x; // 签名的 R 部分的 x 坐标，私有输入。
    signal input R8y; // 签名的 R 部分的 y 坐标，私有输入。

    component verifier = EdDSAPoseidonVerifier(); // 这行代码实例化了一个 EdDSAPoseidonVerifier 组件，这个组件用于验证 EdDSA 签名

    verifier.enabled <== 1; // 启用验证器。
    verifier.Ax <== Ax; // 将模板的 Ax 信号连接到验证器的 Ax 信号。
    verifier.Ay <== Ay; // 将模板的 Ay 信号连接到验证器的 Ay 信号。
    verifier.S <== S; // 将模板的 S 信号连接到验证器的 S 信号。
    verifier.R8x <== R8x; // 将模板的 R8x 信号连接到验证器的 R8x 信号。
    verifier.R8y <== R8y; // 将模板的 R8y 信号连接到验证器的 R8y 信号。
    verifier.M <== M; // 将模板的 M 信号连接到验证器的 M 信号。
}

component main { public [M, Ax, Ay] } = Sample(); // 这行代码实例化了 Sample 模板作为主电路，并声明了 M、Ax 和 Ay 为公有输入信号。


// 这个 Circom 代码定义了一个用于验证 EdDSA 签名的电路模板 Sample，并在主电路中实例化了该模板。模板中包含了公有输入信号（M、Ax 和 Ay）和私有输入信号（S、R8x 和 R8y）。通过实例化 EdDSAPoseidonVerifier 组件，并将输入信号连接到该组件，电路可以验证给定的 EdDSA 签名是否有效。

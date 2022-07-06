const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

// const verifierRegex = /contract Verifier/
const verifierRegex = /contract ([^\s]+)/


let content = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped = bumped.replace(verifierRegex, 'contract HelloWorldVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", bumped);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment

let paths = [
  "./contracts/Multiplier3Verifier.sol",
  "./contracts/Multiplier3VerifierPlonk.sol",
]

paths.forEach(path => {
  let content = fs.readFileSync(path, { encoding: 'utf-8' })
  let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');

  let name = "contract " + path.split("/").reverse()[0].split(".")[0]
  bumped = bumped.replace(verifierRegex, name);
  
  fs.writeFileSync(path, bumped);
})

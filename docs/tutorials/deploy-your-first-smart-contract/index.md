---
id: first-smart-contract-ov
title: Deploy a smart contract
authors: Tim McMackin
lastUpdated: 14th September 2023
---

This tutorial covers using the Octez command-line client to deploy a smart contract to Tezos.
It covers how to:

- Connect the Octez client to a testnet
- Create a wallet
- Get tokens from a faucet
- Code a contract, including:
  - Defining the storage for the contract
  - Defining entrypoints in the contract
  - Writing code to run when the entrypoints are called
- Deploy (or originate) the contract to Tezos and set its starting storage value
- Look up the current state of the contract
- Call the contract from the command line

This tutorial has different versions for different programming languages.
You can run the tutorial with the version of the language you are most familiar with or want to learn.
You do not need any experience in these languages to run the tutorial.

- To use SmartPy, a language similar to Python, see [Deploy a smart contract with SmartPy](./smartpy)
- To use jsLIGO, a language similar to JavaScript and TypeScript, see [Deploy a smart contract with jsLIGO](./jsligo)
- To use CameLIGO, a language similar to OCaml, see [Deploy a smart contract with CameLIGO](./ligo)
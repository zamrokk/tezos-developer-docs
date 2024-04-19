---
title: "Part 2: Adding minting and burning entrypoints"
authors: Tim McMackin
last_update:
  date: 19 April 2024
---

In this part, you add entrypoints that allow an administrator account to create tokens and allow users to burn their own tokens.

The SmartPy FA2 library provides _mixins_ that add these entrypoints so you don't have to code them yourself.
Mixins are modular classes that add specific pieces of functionality.

## Tutorial contract

TODO link to completed contract

## Adding the admin, mint, and burn entrypoints

To add mint and burn entrypoints to the contract, you need three mixins: the mixins for those two entrypoints and a mixin that enables administrator functionality.
Only the admin account can mint tokens, but anyone can burn their own tokens.

1. In the contract, update the `class` statement to include the new mixins:

   ```smartpy
   # Order of inheritance: [Admin], [<policy>], <base class>, [<other mixins>].
   class MyFungibleContract(
       main.Admin,
       main.Fungible,
       main.MintFungible,
       main.BurnFungible,
       main.OnchainviewBalanceOf,
   ):
   ```

1. Update the `__init__()` function to accept the admin address and initialize the mixins:

   ```smartpy
   def __init__(self, admin_address, contract_metadata, ledger, token_metadata):

       # Initialize on-chain balance view
       main.OnchainviewBalanceOf.__init__(self)

       # Initialize the fungible token-specific entrypoints
       main.BurnFungible.__init__(self)
       main.MintFungible.__init__(self)

       # Initialize fungible token base class
       main.Fungible.__init__(self, contract_metadata, ledger, token_metadata)

       # Initialize administrative permissions
       main.Admin.__init__(self, admin_address)
   ```

   The order that you import and initialize the mixins is significant, so make sure your updates match the code above.

1. In the test scenario, add an administrator test account to the existing Alice and Bob test accounts:

   ```smartpy
   # Define test accounts
   admin = sp.test_account("Admin")
   alice = sp.test_account("Alice")
   bob = sp.test_account("Bob")```

1. Update the command to deploy the contract to include the administrator address:

   ```smartpy
   # Instantiate the FA2 fungible token contract
   contract = my_module.MyFungibleContract(admin.address, sp.big_map(), initial_ledger, [tok0_md, tok1_md])
   ```

1. At the end of the test scenario, add a test to verify that the admin account can mint more of an existing token:

   ```smartpy
   scenario.h2("Mint tokens")

   # Mint more of an existing token
   contract.mint(
       [
           sp.record(to_=alice.address, amount=4, token=sp.variant("existing", 0)),
           sp.record(to_=bob.address, amount=4, token=sp.variant("existing", 1)),
       ],
       _sender=admin,
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=alice.address, token_id=0)) == 10
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=bob.address, token_id=0)) == 4
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=alice.address, token_id=1)) == 3
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=bob.address, token_id=1)) == 11
   )
   scenario.verify(_total_supply(contract, sp.record(token_id=0)) == 14)
   scenario.verify(_total_supply(contract, sp.record(token_id=1)) == 14)
   ```

1. Add a test to verify that other users can't mint tokens:

   ```smartpy
   # Other users can't mint tokens
   contract.mint(
       [
           sp.record(to_=alice.address, amount=4, token=sp.variant("existing", 0)),
       ],
       _sender=alice,
       _valid=False
   )
   ```

1. Add a test to verify that the admin account can create a new token type:

   ```smartpy
   # Create a token type
   tok2_md = fa2.make_metadata(name="Token Two", decimals=0, symbol="Tok2")
   contract.mint(
       [
           sp.record(to_=alice.address, amount=5, token=sp.variant("new", tok2_md)),
       ],
       _sender=admin,
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=alice.address, token_id=2)) == 5
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=bob.address, token_id=2)) == 0
   )
   ```

1. Add a test to verify that users can burn their tokens but not other accounts' tokens:

   ```smartpy
   scenario.h2("Burn tokens")
   # Verify that you can burn your own token
   contract.burn([sp.record(token_id=2, from_=alice.address, amount=1)], _sender=alice)
   scenario.verify(
       _get_balance(contract, sp.record(owner=alice.address, token_id=2)) == 4
   )
   # Verify that you can't burn someone else's token
   contract.burn(
       [sp.record(token_id=2, from_=alice.address, amount=1)],
       _sender=bob,
       _valid=False,
   )
   scenario.verify(
       _get_balance(contract, sp.record(owner=alice.address, token_id=2)) == 4
   )
   scenario.verify(
       _total_supply(contract, sp.record(token_id=2)) == 4
   )
   ```

1. Run the `python fa2_fungible.py` command to compile and test your contract.
If you see any errors, make sure that your code matches the code above or compare with the completed contract here: TODO completed contract.

Note that there are many more output files in the `fa2_lib_fungible` folder.
The SmartPy compiler creates output files for each call to an entrypoint in the test scenario.
You can use these files to verify that the scenario is testing the contract properly.

You can also use these files as precompiled parameters for contract calls, as shown in the next section.

## Calling the contract

TODO how to test mint and burn? We have to set up the admin account, send tez, get the params from an output file, and call the contract.




Now you have an FA2 token contract with minting and burning functionality.
In the next part, you add metadata to provide information about the contract and its tokens to apps such as wallets.
(function (Prism) {

  const instructions = [
    "ABS",
    "ADD",
    "ADDRESS",
    "AMOUNT",
    "AND",
    "APPLY",
    "BALANCE",
    "BLAKE2B",
    "BYTES",
    "CAR",
    "CDR",
    "CHAIN_ID",
    "CHECK_SIGNATURE",
    "COMPARE",
    "CONCAT",
    "CONS",
    "CONTRACT",
    "CREATE_ACCOUNT",
    "CREATE_CONTRACT",
    "DIG",
    "DIP",
    "DIPN",
    "DROP",
    "DROPN",
    "DUG",
    "DUP",
    "DUPN",
    "EDIV",
    "EMIT",
    "EMPTY_BIG_MAP",
    "EMPTY_MAP",
    "EMPTY_SET",
    "EQ",
    "EXEC",
    "FAILWITH",
    "GE",
    "GET",
    "GETN",
    "GET_AND_UPDATE",
    "GT",
    "HASH_KEY",
    "IF",
    "IF_CONS",
    "IF_LEFT",
    "IF_NONE",
    "IMPLICIT_ACCOUNT",
    "INT",
    "ISNAT",
    "ITER",
    "JOIN_TICKETS",
    "KECCAK",
    "LAMBDA",
    "LAMBDA_REC",
    "LE",
    "LEFT",
    "LEVEL",
    "LOOP",
    "LOOP_LEFT",
    "LSL",
    "LSR",
    "LT",
    "MAP",
    "MEM",
    "MIN_BLOCK_TIME",
    "MUL",
    "NAT",
    "NEG",
    "NEQ",
    "NEVER",
    "NIL",
    "NONE",
    "NOOP",
    "NOT",
    "NOW",
    "OPEN_CHEST",
    "OR",
    "PACK",
    "PAIR",
    "PAIRING_CHECK",
    "PAIRN",
    "PUSH",
    "READ_TICKET",
    "RIGHT",
    "SAPLING_EMPTY_STATE",
    "SAPLING_VERIFY_UPDATE",
    "SELF",
    "SELF_ADDRESS",
    "SENDER",
    "SEQ",
    "SET_DELEGATE",
    "SHA256",
    "SHA3",
    "SHA512",
    "SIZE",
    "SLICE",
    "SOME",
    "SOURCE",
    "SPLIT_TICKET",
    "STEPS_TO_QUOTA",
    "SUB",
    "SUB_MUTEZ",
    "SWAP",
    "TICKET",
    "TOTAL_VOTING_POWER",
    "TRANSFER_TOKENS",
    "UNIT",
    "UNPACK",
    "UNPAIR",
    "UNPAIRN",
    "UPDATE",
    "UPDATEN",
    "VIEW",
    "VOTING_POWER",
    "XOR",
  ];

  const initKeywords = [
    "code",
    "parameter",
    "storage",
    "view",
  ];

  const types = [
    "address",
    "big_map",
    "bls12_381_fr",
    "bls12_381_g1",
    "bls12_381_g2",
    "bool",
    "bytes",
    "chain_id",
    "chest",
    "chest_key",
    "contract",
    "int",
    "key",
    "key_hash",
    "lambda",
    "list",
    "map",
    "mutez",
    "nat",
    "never",
    "operation",
    "option",
    "or",
    "pair",
    "Pair",
    "sapling_state",
    "sapling_transaction",
    "set",
    "signature",
    "string",
    "ticket",
    "timestamp",
    "unit"
  ];

  const annotations = [":", "@", "%"];

  const instructionsRegex = new RegExp("\\b(?:" + instructions.join("|") + ")\\b", "g");

  const typesRegex = new RegExp("\\b(?:" + types.join("|") + ")\\b", "g");

  const annotationsRegex = new RegExp("(?:" + annotations.join("|") + ")\\w+\\b", "g");

  // Catch the init keywords both at the beginning of a line
  // and when there is an opening brace and/or whitespace
  const initKeywordsRegex = new RegExp("(?:" +
    initKeywords
      .map((kwd) => ([
        "^" + kwd, // Start of line
        "^{?\\s+?" + kwd, // with brace or whitespace
      ]))
      .flat()
      .join("|") +
    ")\\b", "gm");

  Prism.languages.michelsonb = {
    'type': {
      pattern: typesRegex,
      alias: 'keyword',
    },
    'init-keyword': {
      pattern: initKeywordsRegex,
    },
    'instruction': {
      pattern: instructionsRegex,
    },
    'comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true,
      greedy: true
    },
    'annotation': {
      pattern: annotationsRegex,
    },
  };
}(Prism));

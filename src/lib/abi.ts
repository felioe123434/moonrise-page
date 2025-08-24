export const PRESALE_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "buyer", type: "address" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "phase", type: "uint8" },
    ],
    name: "TokensPurchased",
    type: "event",
  },
];

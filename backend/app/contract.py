from typing import Any

from web3 import Web3

from .config import get_settings
from .chain import get_web3, get_signer

ABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "name_", "type": "string"},
            {"internalType": "string", "name": "symbol_", "type": "string"},
            {"internalType": "string", "name": "baseURI_", "type": "string"},
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
    },
    {
        "inputs": [
            {"internalType": "address", "name": "to", "type": "address"},
            {"internalType": "string", "name": "tokenURI_", "type": "string"},
        ],
        "name": "safeMint",
        "outputs": [
            {"internalType": "uint256", "name": "", "type": "uint256"}
        ],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "string", "name": "newBaseURI", "type": "string"}],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "ownerOf",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "tokenURI",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "anonymous": False,
        "inputs": [
            {"indexed": True, "internalType": "address", "name": "to", "type": "address"},
            {"indexed": True, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
            {"indexed": False, "internalType": "string", "name": "tokenURI", "type": "string"},
        ],
        "name": "Minted",
        "type": "event",
    },
]


def get_contract(w3: Web3):
    settings = get_settings()
    checksum_address = Web3.to_checksum_address(settings.contract_address)
    return w3.eth.contract(address=checksum_address, abi=ABI)


def build_safe_mint_tx(w3: Web3, to: str, token_uri: str) -> Any:
    contract = get_contract(w3)
    signer = get_signer()
    checksum_to = Web3.to_checksum_address(to)
    txn = contract.functions.safeMint(checksum_to, token_uri).build_transaction(
        {
            "from": signer.address,
            "nonce": w3.eth.get_transaction_count(signer.address),
            "gas": 350000,
            "maxFeePerGas": w3.to_wei("30", "gwei"),
            "maxPriorityFeePerGas": w3.to_wei("2", "gwei"),
            "chainId": get_settings().chain_id,
        }
    )
    signed = w3.eth.account.sign_transaction(txn, signer.key)
    return signed

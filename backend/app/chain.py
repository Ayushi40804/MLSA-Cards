from web3 import Web3
from web3.middleware import geth_poa_middleware
from eth_account import Account

from .config import get_settings


def get_web3() -> Web3:
    settings = get_settings()
    w3 = Web3(Web3.HTTPProvider(settings.rpc_url))
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    return w3


def get_signer():
    settings = get_settings()
    return Account.from_key(settings.private_key)

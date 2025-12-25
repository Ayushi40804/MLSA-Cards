import os
from functools import lru_cache
from typing import Optional

from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self) -> None:
        # RPC_URL can point to Sepolia, Polygon Amoy, or mainnets. Kept fallback for prior env key.
        self.rpc_url: str = os.getenv("RPC_URL") or os.getenv("ALCHEMY_SEPOLIA_RPC", "")
        self.private_key: str = os.getenv("PRIVATE_KEY", "")
        self.contract_address: str = os.getenv("CONTRACT_ADDRESS", "")
        self.pinata_jwt: str = os.getenv("PINATA_JWT", "")
        self.jwt_secret: str = os.getenv("JWT_SECRET", "dev-secret")
        self.frontend_origin: str = os.getenv("FRONTEND_ORIGIN", "http://localhost:8000")
        # Default to Sepolia (11155111); set 80002 for Polygon Amoy.
        self.chain_id: int = int(os.getenv("CHAIN_ID", "11155111"))
        self.app_name: str = "GameCollectible"
        
        # Google OAuth
        self.google_client_id: str = os.getenv("GOOGLE_CLIENT_ID", "")
        self.google_client_secret: str = os.getenv("GOOGLE_CLIENT_SECRET", "")

    def validate(self) -> None:
        missing = [
            name for name, value in [
                ("RPC_URL", self.rpc_url),
                ("PRIVATE_KEY", self.private_key),
                ("CONTRACT_ADDRESS", self.contract_address),
                ("PINATA_JWT", self.pinata_jwt),
            ]
            if not value
        ]
        if missing:
            raise ValueError(f"Missing required env vars: {', '.join(missing)}")

@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()

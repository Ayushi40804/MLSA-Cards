import httpx
import uuid
from typing import Dict, Any

from .config import get_settings

PINATA_PIN_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"
PINATA_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"


async def pin_json(metadata: Dict[str, Any]) -> str:
    settings = get_settings()
    
    # Mock mode for local development (when JWT is placeholder)
    if settings.pinata_jwt == "replace-me" or not settings.pinata_jwt or settings.pinata_jwt.startswith("mock"):
        # Generate fake IPFS hash for local testing
        fake_cid = f"QmMock{uuid.uuid4().hex[:50]}"
        return f"ipfs://{fake_cid}"
    
    # Real Pinata mode
    headers = {"Authorization": f"Bearer {settings.pinata_jwt}"}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(PINATA_JSON_URL, headers=headers, json=metadata)
        resp.raise_for_status()
        cid = resp.json().get("IpfsHash")
        return f"ipfs://{cid}"

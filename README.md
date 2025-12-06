# 💡 MLSACard: Puzzle Based Virtual Card Game

**MLSACard** is an innovative, gamified web application from the **MLSA KIIT Chapter** that bridges **technical puzzles and engineering questions** with **blockchain technology**. This application functions as a **Hybrid Decentralized Application (DApp)**. Users earn in-game points by successfully solving gamified challenges. These points can be redeemed for unique virtual collectible cards themed around the chapter, which are secured and owned as **Non-Fungible Tokens (NFTs)** on the blockchain.

## ✨ Features

* **Wallet-Based Authentication:** Secure login using **MetaMask** and wallet signatures.
* **Point Earning:**
    * **🧠 Puzzle/Quiz Rewards:** Earn points by successfully solving chapter-based technical puzzles or answering trivia questions.
* **Virtual Card Shop:** Spend earned points to purchase collectible cards with varying rarity and unique MLSACard metadata.
* **Gasless NFT Minting:** Collectible cards are minted as **ERC-721 NFTs** using **gasless / lazy minting**, giving each player a unique digital card on the blockchain without requiring them to pay upfront gas fees.
* **True Digital Ownership:** Cards are secured on the **Polygon Blockchain**.
* **Secure Trading:** Users can securely trade and exchange their owned NFT cards with other players.

---

## ⚙️ System Architecture (Python Focus)

The system uses a **Three-Tier Architecture**, implemented entirely using Python frameworks and libraries:

| Component | Technology (Python) | Role |
| :--- | :--- | :--- |
| **Web Client** (Frontend) | **Streamlit** (or Django/React) | The user interface for the dashboard, **puzzle interface**, and card shop. |
| **Backend Server** (Logic/API) | **FastAPI** | Handles authentication, point management, **puzzle validation logic**, and secure NFT minting requests. |
| **Database** | **Pymongo** (for MongoDB) | Stores user data, points, levels, the **puzzle/question bank**, and card catalog metadata. |
| **Blockchain** (Smart Contracts) | **web3.py** (Interaction Library) | Manages card ownership and token transfers using Solidity smart contracts deployed on Polygon. |

### ⚖️ DApp Structure & Decentralization

MLSACard operates as a **Hybrid DApp**:

* **Decentralized Core:** The critical asset management (NFT ownership and secure trading) is fully decentralized, running on the **Polygon Blockchain** via **ERC-721 Smart Contracts**.
* **Centralized Middleware:** The **FastAPI Backend** and **MongoDB** handle all off-chain logic, including **puzzle validation**, **point accumulation**, and generating the secure cryptographic signatures required for **gasless (lazy) minting**. This approach ensures performance and maintains the integrity of the game's reward system.



---

## 🚀 Getting Started

These instructions detail the setup for the Python-based MLSACard system.

### Prerequisites

* **Python 3.9+**
* **Node.js** (for supporting contract tools if not fully Python)
* **MongoDB** server running locally or accessible via a connection string.
* **MetaMask** extension installed and connected to the **Polygon Testnet** (or Mainnet).

### Installation

### 1. Backend Server Setup (FastAPI)

1.  Clone the repository and navigate to the backend directory:
    ```bash
    git clone [Your-Repo-URL]
    cd MLSACard/backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install Python dependencies:
    ```bash
    pip install -r requirements.txt
    # Key Libraries: fastapi, uvicorn, pymongo, web3, pycryptodome (for signature validation)
    ```
4.  Create a **`.env`** file and configure settings:
    ```
    MONGODB_URI=mongodb://localhost:27017/mlsacard_db
    POLYGON_RPC_URL=[https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY](https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY)
    MINTER_PRIVATE_KEY=0x... # Minter private key for gasless/lazy minting signature
    NFT_CONTRACT_ADDRESS=0x... # Deployed ERC-721 contract address
    ```
5.  Run the server:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

### 2. Smart Contract Deployment (Solidity & web3.py)

*(Assuming contracts are written in Solidity and compiled with EIP-712 support for lazy minting)*

1.  Ensure your contract is deployed to the **Polygon** network.
2.  Obtain the **ABI** (Application Binary Interface) and the **Contract Address**.
3.  Update the `NFT_CONTRACT_ADDRESS` in the Backend's `.env` file.

### 3. Frontend Web App Setup (Streamlit Prototype)

1.  Navigate to the client directory:
    ```bash
    cd MLSACard/frontend
    ```
2.  Install Streamlit and any other client dependencies:
    ```bash
    pip install streamlit requests
    ```
3.  Run the Streamlit application:
    ```bash
    streamlit run app.py
    ```
    The application will open in your browser, typically at `http://localhost:8501`.

---

## 🛣️ Future Enhancements

* **Social Leaderboards:** Implement global and chapter-specific leaderboards.
* **Dedicated NFT Marketplace:** A platform within the app for users to buy, sell, and auction cards.
* **Advanced Anti-Cheat System:** Enhanced mechanisms to **prevent brute-forcing and rate-limit puzzle attempts**.
* **Achievements and Quests:** Introduce progressive chapter-themed quests for bonus rewards.

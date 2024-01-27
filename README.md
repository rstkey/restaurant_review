# Restaurant Review DApp

Welcome to the **Restaurant Review DApp** project repository! This decentralized application (DApp) leverages blockchain technology to implement an review platform on the Solana network. Participants can add reviews and check reviews given by others.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contracts](#smart-contracts)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Restaurant Review DApp** provides a user-friendly interface to participate in Solana-based reviews. This project ensures transparency and trust in the review process through the use of smart contracts.

## Features

- Add review.
- Browse reviews by other users.

## Getting Started

Follow these steps to set up the project locally and start participating in web3 reviews.

### Prerequisites

1. Node.js: Ensure Node.js is installed. Download it from [nodejs.org](https://nodejs.org/).

2. Get yourself a crypto wallet from [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/). You will need one to add reviews.

3. Since the Solana program is running on devnet. You will need to switch to devnet from the wallet's settings.

4. Grab some SOL tokens from [https://faucet.solana.com](https://faucet.solana.com/).

### Installation

1. Clone the repository:

```bash
  git clone https://github.com/alap-de/restaurant_review.git
```

2. Navigate to the project directory:

```bash
  cd restaurant_review && cd frontend
```

3. Install required npm packages:

```bash
 npm install
```

## Usage

1. Start the development server:

```bash
 npm run dev
```

2. Open your web browser and navigate to `http://localhost:3000` to access the DApp.

3. Connect your Solana wallet (e.g., Phantom) to the DApp.

4. Browse reviews by others, add reviews of restaurants you have been to.

## Smart Contracts

The smart contracts in this project facilitate the review process. They handle adding and updating reviews. These contracts are deployed on the Solana Devnet.

- `lib.rs`: Handles the broad logic of creating transactions, adding and updating reviews.
- `instruction.rs`: Defines the program's instruction data for executing the program.
- `state.rs`: Oversees the basic state of the program and handles some common errors.

## Frontend

The DApp frontend is built using modern web technologies including Next.js. It provides an intuitive and interactive user interface for auction participation.

- **Next.js**: Powers the DApp's user interface.
- **Web3.js**: The Ethereum JavaScript API for smart contract interaction.
- **Phantom/Solflare**: Popular Solana wallet browser extension for secure transactions.

## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make changes and test thoroughly.
4. Commit with clear and concise messages.
5. Push changes to your fork.
6. Submit a pull request describing your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for your interest in the Web3 Restaurant Review DApp project! For questions or suggestions, reach out to us or open an issue on [GitHub](https://github.com/alap-de/restaurant_review.git). Let your opinions be known on the blockchain! 🚀

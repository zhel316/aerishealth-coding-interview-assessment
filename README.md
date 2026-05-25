# Aeris Health Coding Interview Assessment

This repository contains my submission for the Aeris Health coding interview assessment.

## Project Structure

```text
.
├── A/
├── B/
├── C/
├── frontend/
└── README.md
```

## Sections

- `A/`: Solution for part A.
- `B/`: Solution for part B.
- `C/`: Written answers for part C.
- `frontend/`: Frontend implementation, if required by the assessment.

## Local Setup

Clone the repository and enter the project directory:

```bash
git clone <repository-url>
cd aerishealth-coding-interview-assessment
```

This project uses Python 3 and does not require any third-party packages for parts A and B.

Check your Python version:

```bash
python3 --version
```

Optional: create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## Run Part A

Run the Mystic Waves solution with:

```bash
python3 A/mystic_waves.py
```

Then paste input in this format:

```text
4
1 4
2 5
3 6
4 7
```

Press `Ctrl+D` after the final line to finish stdin input. Expected output:

```text
0
2
0
4
```

You can also run the sample directly:

```bash
printf '4\n1 4\n2 5\n3 6\n4 7\n' | python3 A/mystic_waves.py
```

## Run Part B

Run the CargoCraft Fleet solution with:

```bash
python3 B/cargocraft_fleet.py
```

Then paste input in this format:

```text
4
4
7
24
998244353998244352
```

Press `Ctrl+D` after the final line to finish stdin input. Expected output:

```text
1 1
-1
4 6
166374058999707392 249561088499561088
```

You can also run the sample directly:

```bash
printf '4\n4\n7\n24\n998244353998244352\n' | python3 B/cargocraft_fleet.py
```

## Part C

Part C is a written-answer section. The answers are in:

```text
C/xero_api_answers.md
```

You can view it directly in GitHub, VS Code, or any Markdown viewer.

## Run Frontend

The frontend implementation is in:

```text
frontend/
```

Install dependencies:

```bash
cd frontend
npm install
```

Start the local development server:

```bash
npm run dev
```

Then open the local URL printed in the terminal, usually:

```text
http://localhost:5173/
```

Build the frontend for production:

```bash
npm run build
```

The mock API is implemented in `frontend/src/services/productApi.ts`.
The product page calls `getProductDetail()` on load and `addToCart()` when the user clicks Add to cart.
You can verify success, out-of-stock, and failure states directly through the UI by switching variants.

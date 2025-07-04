# Print Capacity Calculator

This is a lightweight web application that estimates the number of printed pages and the time required for printing labels. It now uses **Tailwind CSS** for styling and runs entirely in the browser. A simple Node.js server is included for convenience.

## Usage

1. Build the Docker image:
   ```
   docker build -t print-capacity-calculator .
   ```
2. Run the container:
   ```
   docker run -p 3000:3000 print-capacity-calculator
   ```
3. Open `http://localhost:3000` in your browser.

## GitHub Actions

The repository includes a workflow that builds the Docker image on pushes and pull requests to the `main` branch.

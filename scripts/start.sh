#!/bin/bash

# Get the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Calculate the application directory path (one level up from the script directory)
APP_DIR="$SCRIPT_DIR/.."

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Check if Node.js is installed
if ! command_exists node; then
  echo "Node.js is not installed. Installing Node.js..."

  # Check if npm is installed
  if ! command_exists npm; then
    echo "npm is not installed. Installing npm..."
    # Install npm based on Linux distribution
    sudo apt-get update
    sudo apt-get install -y npm
  fi

  # Install Node.js using npm
  npm install -g n
  n latest

  # Verify Node.js installation
  if ! command_exists node; then
    echo "Node.js installation failed. Please install Node.js manually."
    exit 1
  else
    echo "Node.js installed successfully."
  fi
fi

# Navigate to application directory
cd "$APP_DIR" || exit

# Run npm install to install dependencies
npm install

# Run npm run start to start our app
npm run start

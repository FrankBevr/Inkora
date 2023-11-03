#!/bin/bash

# Check if ipfs is already installed
if command -v ipfs >/dev/null 2>&1; then
    # If ipfs is installed, print a blue message
    echo -e "\033[0;34mIPFS is already installed.\033[0m"
    exit 0
fi

# Copied from https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions , wrote by copilot

# Download the tar file
wget https://dist.ipfs.tech/kubo/v0.23.0/kubo_v0.23.0_linux-amd64.tar.gz

# Check if the download was successful
if [ $? -ne 0 ]; then
  echo "Download failed. Exiting."
  exit 1
fi

# Extract the tar file
tar -xvzf kubo_v0.23.0_linux-amd64.tar.gz

# Check if the extraction was successful
if [ $? -ne 0 ]; then
  echo "Extraction failed. Exiting."
  exit 1
fi

# Change to the extracted directory
cd kubo

# Check if the directory change was successful
if [ $? -ne 0 ]; then
  echo "Directory change failed. Exiting."
  exit 1
fi

# Set the output color to blue
tput setaf 4

# Run the install script
sudo bash install.sh

# Reset the output color
tput sgr0

# Check if the installation was successful
if [ $? -ne 0 ]; then
  echo "Installation failed. Exiting."
  exit 1
fi

# Check the installed version
ipfs --version

# Check if the version check was successful
if [ $? -ne 0 ]; then
  echo "Version check failed. Exiting."
  exit 1
fi

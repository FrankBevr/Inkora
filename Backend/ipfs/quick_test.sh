#!/bin/bash

# Coplilot generated based on ipfs init, ipfs add, ipfs get

# Define color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

while true; do
  echo -e "${GREEN}Please select an option:${NC}"

  select option in "Generate Test File" "Upload Test File to IPFS" "Retrieve and Display File from IPFS" "Launch IPFS Daemon" "Terminate Script"; do
    case $option in
      "Generate Test File")
        echo -e "${GREEN}Please enter some text:${NC}"
        read text
        echo $text > upload_test.txt
        echo -e "${BLUE}Test file created.${NC}"
        break
        ;;
      "Upload Test File to IPFS")
        # Check if IPFS is already initialized
        if [ ! -d ~/.ipfs ]; then
          # Initialize IPFS
          ipfs init

          # Check if the initialization was successful
          if [ $? -ne 0 ]; then
            echo -e "${BLUE}IPFS initialization failed. Exiting.${NC}"
            exit 1
          fi
        else
          echo -e "${BLUE}IPFS is already initialized.${NC}"
        fi

        # Add the file to IPFS
        CID=$(ipfs add upload_test.txt -Q)

        # Check if the file was added successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}File upload failed. Exiting.${NC}"
          exit 1
        fi

        echo -e "${BLUE}File uploaded successfully.${NC}"
        break
        ;;
      "Retrieve and Display File from IPFS")
        # Get the file content from IPFS
        ipfs get $CID -o ./retrieved_file.txt

        # Check if the file was retrieved successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}File retrieval failed. Exiting.${NC}"
          exit 1
        fi

        # Echo the content of the file
        cat ./retrieved_file.txt

        # Check if the file content was echoed successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}File content echo failed. Exiting.${NC}"
          exit 1
        fi

        echo -e "${BLUE}Operation successful.${NC}"
        break
        ;;
      "Launch IPFS Daemon")
        # Start the IPFS daemon and ignore the output
        ipfs daemon > /dev/null 2>&1 &

        # Check if the daemon was started successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}IPFS daemon start failed. Exiting.${NC}"
          exit 1
        fi

        # Provide the URL to download the test file
        echo -e "${BLUE}You can download the test file at: http://localhost:8080/ipfs/$CID${NC}"
        break
        ;;
      "Terminate Script")
        echo -e "${BLUE}Exiting.${NC}"
        exit 0
        ;;
      *)
        echo -e "${BLUE}Invalid option. Please select 1, 2, 3, 4 or 5.${NC}"
        break
        ;;
    esac
  done
done
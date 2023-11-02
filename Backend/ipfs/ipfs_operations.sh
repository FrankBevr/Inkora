#!/bin/bash

# Define color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

while true; do
  echo -e "${GREEN}Please select an operation:${NC}"

  select operation in "Upload 'ThreeDModel' Folder to IPFS" "Start the IPFS Daemon" "Retrieve Hash of 'ThreeDModel' Folder" "Retrieve Hash of 'mushroom.obj' File" "Retrieve Hash of 'mushroom_texture.jpg' File" "View Folder on Localhost" "Terminate the Script"; do
    case $operation in
      "Upload 'ThreeDModel' Folder to IPFS")
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

        # Add the folder to IPFS
        CID=$(ipfs add -r ThreeDModel -Q)

        # Check if the folder was added successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}Folder upload failed. Exiting.${NC}"
          exit 1
        fi

        echo -e "${BLUE}'ThreeDModel' folder uploaded successfully.${NC}"
        break
        ;;
      "Start the IPFS Daemon")
        # Start the IPFS daemon and ignore the output
        ipfs daemon > /dev/null 2>&1 &

        # Check if the daemon was started successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}IPFS daemon start failed. Exiting.${NC}"
          exit 1
        fi

        echo -e "${BLUE}IPFS daemon started successfully.${NC}"
        break
        ;;
      "Retrieve Hash of 'ThreeDModel' Folder")
        # Get the hash of the folder
        CID=$(ipfs add -r -n ThreeDModel -Q)

        # Check if the hash was retrieved successfully
        if [ $? -ne 0 ]; then
          echo -e "${BLUE}Folder hash retrieval failed. Exiting.${NC}"
          exit 1
        fi

        echo -e "${BLUE}Hash of 'ThreeDModel' folder: ${CID}.${NC}"
        break
        ;;
      "View Folder on Localhost")
        # Provide the URL to view the folder on localhost
        echo -e "${BLUE}You can view the folder at: http://localhost:8080/ipfs/${CID}${NC}"
        break
        ;;
      "Terminate the Script")
        echo -e "${BLUE}Exiting.${NC}"
        exit 0
        ;;
      *)
        echo -e "${BLUE}Invalid operation. Please select 1, 2, 3, 4, 5, 6 or 7.${NC}"
        break
        ;;
    esac
  done
done
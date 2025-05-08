// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentVerification {
    struct Document {
        string documentHash;
        address owner;
        uint256 timestamp;
        bool isValid;
        string verificationDetails;
    }
    
    mapping(string => Document) public documents;
    mapping(address => string[]) public userDocuments;
    
    event DocumentVerified(
        string indexed documentHash,
        address indexed owner,
        bool isValid,
        uint256 timestamp
    );
    
    function verifyDocument(
        string memory documentHash,
        bool isValid,
        string memory verificationDetails
    ) public {
        require(bytes(documentHash).length > 0, "Document hash cannot be empty");
        
        documents[documentHash] = Document({
            documentHash: documentHash,
            owner: msg.sender,
            timestamp: block.timestamp,
            isValid: isValid,
            verificationDetails: verificationDetails
        });
        
        userDocuments[msg.sender].push(documentHash);
        
        emit DocumentVerified(
            documentHash,
            msg.sender,
            isValid,
            block.timestamp
        );
    }
    
    function getDocument(string memory documentHash) 
        public 
        view 
        returns (Document memory) 
    {
        return documents[documentHash];
    }
    
    function getUserDocuments(address user) 
        public 
        view 
        returns (string[] memory) 
    {
        return userDocuments[user];
    }
} 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// keeps track of the number of tokens issued
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaintNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    string public description = "NFT's of Mynamezxc";
    bool public mintable = true;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    struct Item {
        uint256 id;
        address creator;
        string uri;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIDs.current();
    }

    mapping(uint256 => Item) public Items;

    // function mint(address recipient, string memory uri)  external onlyOwner() returns (uint256) {
    //     _tokenIDs.increment();
    //     uint256 newItemId = _tokenIDs.current();
    //     _safeMint(recipient, newItemId);

    //     Items[newItemId] = Item(newItemId, msg.sender, uri);
    //     _setTokenUri(newItemId, uri);
    //     return newItemId;
    // }

    function mintItem(address minter, string memory uri) public onlyOwner returns (uint256) {
        _tokenIDs.increment();
        uint256 newItemId = _tokenIDs.current();
        _mint(minter, newItemId);
        _setTokenURI(newItemId, uri);
        Items[newItemId] = Item(newItemId, msg.sender, uri);
        return newItemId;
    }

    function contractURI(uint256 tokenId, uint256 newItemId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return Items[newItemId].uri;
    }

    function tokenURI(uint256 tokenId, uint256 newItemId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return Items[newItemId].uri;
    }

}

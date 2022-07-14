// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

// import "./AllowedList.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol"; 
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Context.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

contract ERC1155Facet is 
    Context,
    ERC1155,
    AccessControl,
    ERC1155Burnable,
    Pausable {
    // JAM Specific Roles
    bytes32 public constant ALLOWED_LIST_ROLE = keccak256("ALLOWED_LIST_ROLE");
    bytes32 public constant HODLR_ROLE = keccak256("HODLR_ROLE");
    bytes32 public constant FREELANCER_ROLE = keccak256("FREELANCER_ROLE");

    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // distinguished token ids, (for now) based on roles
    uint256 public constant HODLR = 1;
    uint256 public constant FREELANCER = 2;

    // Max number of minting allowed per call. Same for now.
    // can be different if wanted to use. Otherwise, as-is.
    enum mintTypes {
        PUB,
        PRIV
    }
    uint256 public constant MAX_MINT_LIMIT_PRIV = 3;
    uint256 public constant MAX_MINT_LIMIT_PUB = 3;

    string public baseURI;
    string public baseExtension = ".json";

    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }
    mapping(uint256 => RoyaltyInfo) internal _royalties;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => address) public tokenOwners;
    mapping(uint256 => uint256) public tokenPrices;
    // uint256[] allowedTokens;

    // Adding a total supply tracker
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds; // to check a new uint256 max_supply_limit with this.

    // event TransferBatch(address operator, address from, address to, uint256[] ids, uint256[] values);

    constructor() ERC1155("") {
        initRoles();
        //setBaseURI(_initBaseURI);
    }

    function initRoles() private {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(URI_SETTER_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
        _grantRole(HODLR_ROLE, _msgSender());
        _grantRole(FREELANCER_ROLE, _msgSender());
    }

    function setTokenRoyalty(
        uint256 tokenId,
        address recipient,
        uint256 value
    ) public onlyRole(MINTER_ROLE) {
        require(value <= 10000, "too high");
        _royalties[tokenId] = RoyaltyInfo(recipient, uint24(value));
    }

    // @inheritdoc IERC2981Royalties
    function royaltyInfo(uint256 tokenId, uint256 value)
        external
        view
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties[tokenId];
        receiver = royalties.recipient;
        royaltyAmount = (value * royalties.amount) / 10000;
    }

    // init map with the deployer account and two tokens
    

    function uri(uint256 id) public view override returns (string memory) {
        return (_tokenURIs[id]);
    }

    function _setTokenURI(uint256 id, string memory tokenURI) private {
        _tokenURIs[id] = tokenURI;
    }

    function getBaseURI()
        internal
        view
        virtual
        onlyRole(URI_SETTER_ROLE)
        returns (string memory)
    {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI)
        public
        onlyRole(URI_SETTER_ROLE)
    {
        baseURI = _newBaseURI;
    }

    // people without ALLOWED_LIST_ROLE,
    // can mint with MAX_MINT_LIMIT_PUB amount.
    function mintOne(
        mintTypes mintType,
        address account,
        uint256 id,
        uint256 amount,
        string memory tokenURI
    ) public payable {
        if (mintType == mintTypes.PUB) {
            require(
                amount <= MAX_MINT_LIMIT_PUB,
                "can't mint that many"
            );
        }
        if (mintType == mintTypes.PRIV) {
            require(
                hasRole(ALLOWED_LIST_ROLE, account),
                "not @allowedList"
            );
            require(
                amount <= MAX_MINT_LIMIT_PRIV,
                "can't mint that many"
            );
        }
        _mint(account, id, amount, "");
        tokenOwners[id] = account;
        _setTokenURI(id, tokenURI);
       // _tokenIds.increment();
    }

    // for now, accounts with only MINTER_ROLE can do this.
    function mintBatch(
        address receiver,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public onlyRole(MINTER_ROLE) whenNotPaused {
        require(
            ids.length == amounts.length,
            "Each token needs an amount"
        );
        _mintBatch(receiver, ids, amounts, "");

        for (uint256 x = 0; x <= ids.length; x++) {
            tokenOwners[ids[x]] = receiver;
        }

        // figure out how many, and increment counter as many tokens as we've just minted.
        // uint256 totalAmountMinted = 0;
        // for (uint256 i = 0; i <= amounts.length; i++) {
        //     totalAmountMinted = totalAmountMinted + amounts[i];
        // }
        // for (uint256 j = 0; j <= totalAmountMinted; j++) {
        //     _tokenIds.increment();
        // }
    }

    // as is, we are not running revokeRole(HODLR_ROLE)
    // Same goes with batch operation below this one,
    // we need to figure out keeping or revoking the role,
    // which is given upon minting calls when not granted yet.
    function melt(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyRole(HODLR_ROLE) {
        require(
            _msgSender() == account,
            "You can only burn your own token"
        );
        _burn(account, id, amount);
        delete tokenOwners[id];
        //_tokenIds.decrement();
    }

    function meltBatch(
        address account,
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) public onlyRole(HODLR_ROLE) whenNotPaused {
        require(
            ids.length == amounts.length,
            "Each token needs an amount"
        );
        _burnBatch(account, ids, amounts);
        for (uint256 x = 0; x <= ids.length; x++) {
            delete tokenOwners[ids[x]];
        }
        // figure out how many, and increment counter as many tokens as we've just minted.
        // uint256 totalAmountMelted = 0;
        // for (uint256 i = 0; i <= amounts.length; i++) {
        //     totalAmountMelted = totalAmountMelted + amounts[i];
        // }
        // for (uint256 j = 0; j <= totalAmountMelted; j++) {
        //     _tokenIds.decrement();
        // }
    }

    // transfers an amount of tokens and
    // grants a HODLR_ROLE if the receiver does not have the role already:
    // when this is their first NFT on this collection.
    function transfer(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) public payable whenNotPaused {
        require(
            _msgSender() == from,
            "not authorized"
        );
        uint256 cost = tokenPrices[id] * amount;
        require(msg.value >= cost, "Insufficient funds");
        _safeTransferFrom(from, to, id, amount, "");

        if (!hasRole(HODLR_ROLE, to)) {
            _grantRole(HODLR_ROLE, to);
        }
    }

    // function batchTransfer(
    //  address from, address to, uint256[] ids, uint256[] amounts, bytes data
    // ) public payable{
    //     require(_paused() == false, "Currently all transfer operations are paused");
    //     require(_msgSender() == from, "You are not authorized to batch transfer these tokens.");
    //     //ids and amounts must have the same length and must emit TransferBatch event
    //     require(ids.length == amounts.length, "Each corresponding token needs an amount specified to batch transfer.");
    //     uint256 cost = tokenIdsPrices[id] * amounts[id];
    //     require(msg.value >= cost, "Insufficient funds for batch transfer.");
    //     safeBatchTransferFrom(from, to, ids, amounts, data);
    //     if(hasRole(HODLR_ROLE, to) == false){
    //         _grantRole(HODLR_ROLE, to);
    //     }

    //     // ~~~~~ we need to figure out the operator below. ~~~~~
    //      emit TransferBatch(operator, from, to, ids, values);
    // }

    // function setNotRevealedURI(string memory _notRevealedURI)
    //     public
    //     onlyRole(URI_SETTER_ROLE)
    // {
    //     notRevealedUri = _notRevealedURI;
    // }

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

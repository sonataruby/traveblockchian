SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    var login_wallet;
    let TokenAddress = "{nfttravel_address}";
    let Abi = JSON.parse({nfttravel_abi});
    var TravelContact;
    
    SmartApp.Travel = {};
    SmartApp.Travel.loadContracts = async () => {

            var contractLoader = await blockchain.loadContract(TokenAddress,Abi);
            TravelContact = contractLoader.methods;
            login_wallet = await blockchain.getLoginWallet();
            return true;
    }
    
    SmartApp.Travel.getContractAddress = ()=>{
        return TokenAddress;
    }

    SmartApp.Travel.setFatory = async (address) => {

            await TravelContact.setFactory(address).send();
    }

    SmartApp.Travel.init = async () => {
        await blockchain.init();
        await SmartApp.Travel.loadContracts();
        //const balance = await Token.methods.balanceOf(login_wallet);
        //$(".balance").html(balance);
    }
    SmartApp.components.docReady.push(SmartApp.Travel.init);
    return SmartApp;
})(SmartApp, jQuery, window);
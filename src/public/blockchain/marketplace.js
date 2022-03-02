SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    let login_wallet;
    let TokenAddress = "{token_address}";
    let Abi = JSON.parse({token_abi});
    let Token;
    SmartApp.Marketplace = {};
    
    SmartApp.Marketplace.loadContracts = async () => {

            Token = await blockchain.loadContract(TokenAddress,Abi);
            login_wallet = await blockchain.getLoginWallet();
    }
    
    SmartApp.Marketplace.init = async () => {
        await blockchain.init();
        await SmartApp.Marketplace.loadContracts();
        const balance = await Token.methods.balanceOf(login_wallet);
        //$(".balance").html(balance);
    }
    SmartApp.components.docReady.push(SmartApp.Marketplace.init);
    return SmartApp;
})(SmartApp, jQuery, window);
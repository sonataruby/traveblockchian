SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    let login_wallet;
    let TokenAddress = "{nfttravel_address}";
    let Abi = JSON.parse({nfttravel_abi});
    let Token;
    SmartApp.Travel = {};
    
    SmartApp.Travel.loadContracts = async () => {

            Token = await blockchain.loadContract(TokenAddress,Abi);
            login_wallet = await blockchain.getLoginWallet();
    }
    
    SmartApp.Travel.init = async () => {
        await blockchain.init();
        await SmartApp.Travel.loadContracts();
        const balance = await Token.methods.balanceOf(login_wallet);
        //$(".balance").html(balance);
    }
    SmartApp.components.docReady.push(SmartApp.Travel.init);
    return SmartApp;
})(SmartApp, jQuery, window);
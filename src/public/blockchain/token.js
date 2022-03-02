SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    var blockchain = SmartApp.Blockchain;
    var login_wallet;
    let TokenAddress = "{token_address}";
    let Abi = JSON.parse({token_abi});
    var Token;

    SmartApp.Token = {};
    
    SmartApp.Token.loadContracts = async () => {

            var TokenMethod = await blockchain.loadContract(TokenAddress,Abi);
            login_wallet = await blockchain.getLoginWallet();
            Token = TokenMethod.methods;
            return Token;
    }
    
    SmartApp.Token.init = async () => {
        await blockchain.init();
        await SmartApp.Token.loadContracts();
        const balance = await Token.balanceOf(login_wallet);
        $(".balance").html(balance);
    }
    SmartApp.components.docReady.push(SmartApp.Token.init);
    return SmartApp;
})(SmartApp, jQuery, window);
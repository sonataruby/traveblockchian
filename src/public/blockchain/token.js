SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    var blockchain = SmartApp.Blockchain;
    var login_wallet;
    let TokenAddress = "{token_address}";
    let Abi = JSON.parse({token_abi});
    var TokenContact;

    SmartApp.Token = {};
    SmartApp.Token.Balance = 0;
    SmartApp.Token.loadContracts = async () => {

            var contractLoader = await blockchain.loadContract(TokenAddress,Abi);
            TokenContact = contractLoader.methods;
            login_wallet = await blockchain.getLoginWallet();
            return true;
    }
    
    SmartApp.Token.getBalance = async () =>{
        return SmartApp.Token.Balance;
    };
    SmartApp.Token.init = async () => {
        await blockchain.init();
        await SmartApp.Token.loadContracts();
        const balance = await TokenContact.balanceOf(login_wallet).call();
        SmartApp.Token.Balance = SmartApp.Blockchain.fromWei(balance);
        $(".balance").html(balance);
    }
    SmartApp.components.docReady.push(SmartApp.Token.init);
    return SmartApp;
})(SmartApp, jQuery, window);
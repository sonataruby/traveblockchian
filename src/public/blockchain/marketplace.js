SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    var login_wallet;
    let TokenAddress = "{nftfactory_address}";
    let Abi = JSON.parse({nftfactory_abi});
    var MarketplaceContact;
    
    SmartApp.Marketplace = {};
    SmartApp.Marketplace.loadContracts = async () => {

            var contractLoader = await blockchain.loadContract(TokenAddress,Abi);
            MarketplaceContact = contractLoader.methods;
            login_wallet = await blockchain.getLoginWallet();
            return true;
    }
    SmartApp.Marketplace.sync = async (obj) => {
        SmartApp.Blockchain.notifyWait("");
        let data = MarketplaceContact.setMarketTour(obj.item_id, obj.price, obj.star,obj.night, obj.bed,obj.chuky, obj.exitmoiky).send({from : login_wallet}).then(async (data)=>{
           
            if(data.status == true){

                var tx = {blockHash : data.blockHash, transactionHash : data.transactionHash, blockNumber : data.blockNumber};
                await SmartApp.Blockchain.setReportUrl("marketplace/sync/"+obj.item_id,{token : "59e78438-fe00-41f3-97b8-37b13073d1e3"});
                SmartApp.Blockchain.notify("Complete update");
                
            }else{
                SmartApp.Blockchain.notify("Error update");
            }
        });
    }


    SmartApp.Marketplace.syncContent = async (obj) => {
        SmartApp.Blockchain.notifyWait("");
        let data = MarketplaceContact.setMarketTourCode(obj.item_id, obj.name, obj.code).send({from : login_wallet}).then(async (data)=>{
           
            if(data.status == true){

                var tx = {blockHash : data.blockHash, transactionHash : data.transactionHash, blockNumber : data.blockNumber};
                await SmartApp.Blockchain.setReportUrl("marketplace/sync/"+obj.item_id,{token : "59e78438-fe00-41f3-97b8-37b13073d1e3"});
                SmartApp.Blockchain.notify("Complete update");
                
            }else{
                SmartApp.Blockchain.notify("Error update");
            }
        });
    }

    

    SmartApp.Marketplace.buyTickets = async (id, songaymua) => {
        var tokenBalance = await SmartApp.Token.getBalance();
        let price = await MarketplaceContact.getPricePayment(id, songaymua).call();
        if(tokenBalance < price){
            SmartApp.Blockchain.notify("Your Balance");
            return false;
        }
        let data = await MarketplaceContact.buyTickets(id, songaymua).call();
    }
    SmartApp.Marketplace.setTicketsInfo = async (id, name, code) => {
        let data = await MarketplaceContact.setMarketTourCode(id, name, code).call();
    }

    SmartApp.Marketplace.init = async () => {
        if(window.Web3Modal == undefined) await blockchain.connect();
        await blockchain.init();
        await SmartApp.Marketplace.loadContracts();
        //const balance = await Token.methods.balanceOf(SmartApp.Marketplace.WalletClient);
        //console.log(balance);
    }
    //SmartApp.Marketplace.init();
    SmartApp.components.docReady.push(SmartApp.Marketplace.init);
    return SmartApp;
})(SmartApp, jQuery, window);
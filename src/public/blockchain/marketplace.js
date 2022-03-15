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
    SmartApp.Marketplace.getContractAddress = ()=>{
        return TokenAddress;
    }
    SmartApp.Marketplace.sync = async (obj) => {
        SmartApp.Blockchain.notifyWait("");
        let data = MarketplaceContact.setMarketTour(obj.item_id, Math.ceil(obj.price/obj.chuky), obj.star,obj.night, obj.bed,obj.chuky, obj.exitmoiky, obj.qty).send({from : login_wallet}).then(async (data)=>{
           
            if(data.status == true){

                var tx = {blockHash : data.blockHash, transactionHash : data.transactionHash, blockNumber : data.blockNumber, token : "59e78438-fe00-41f3-97b8-37b13073d1e3"};
                await SmartApp.Blockchain.setReportUrl("marketplace/sync/"+obj.item_id,tx);
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

                var tx = {blockHash : data.blockHash, transactionHash : data.transactionHash, blockNumber : data.blockNumber,token : "59e78438-fe00-41f3-97b8-37b13073d1e3"};
                await SmartApp.Blockchain.setReportUrl("marketplace/sync/"+obj.item_id,tx);
                SmartApp.Blockchain.notify("Complete update");
                
            }else{
                SmartApp.Blockchain.notify("Error update");
            }
        });
    }

    

    SmartApp.Marketplace.buyTickets = async (id, songaymua) => {
        var tokenBalance = await SmartApp.Token.getBalance();
        
        let priceCall = await MarketplaceContact.getPricePayment(id, songaymua).call();
        let price = SmartApp.Blockchain.fromWei(priceCall);
        console.log("Click Buy : ",priceCall);
        if(tokenBalance < price){
            SmartApp.Blockchain.notify("Your Balance");
            //return false;
        }
        console.log(price);
        await SmartApp.Token.setAccess(TokenAddress, priceCall);
        let data = await MarketplaceContact.buyTickets(id, songaymua).send({from : login_wallet, gas:900000}).then(async (data) =>{
            console.log(data);
        });
        
    }

    SmartApp.Marketplace.setNFT = async (nft) => {
        let data = await MarketplaceContact.setNft(nft).send({from : login_wallet}).then(async (data) =>{
            console.log(data);
        });
    };
    SmartApp.Marketplace.setTokenMoney = async (address) => {
        let data = await MarketplaceContact.setCurentcy(address).send({from : login_wallet}).then(async (data) =>{
            console.log(data);
        });
    };

    SmartApp.Marketplace.getInfoTour = async (total) => {
        let data = await MarketplaceContact.MarketPlaceItemOf(total).call();
        console.log(data);
    };

    SmartApp.Marketplace.setTicketsInfo = async (obj) => {
        let data = await MarketplaceContact.setMarketTourCode(obj.item_id, obj.name, obj.code).send({from : login_wallet}).then(async (data) =>{
            console.log(data);
        });
    }

    SmartApp.Marketplace.init = async () => {
        
        await blockchain.init();
        if(window.Web3Modal == undefined) await blockchain.connect();
        await SmartApp.Marketplace.loadContracts();
        //const balance = await Token.methods.balanceOf(SmartApp.Marketplace.WalletClient);
        //console.log(balance);
    }
    //SmartApp.Marketplace.init();
    SmartApp.components.docReady.push(SmartApp.Marketplace.init);
    return SmartApp;
})(SmartApp, jQuery, window);
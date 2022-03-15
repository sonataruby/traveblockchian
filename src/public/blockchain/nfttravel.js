SmartApp = (function (SmartApp, $, window) {
    "use strict";
    let GAS = 21000; 
    let blockchain = SmartApp.Blockchain;
    var login_wallet;
    let TokenAddress = "{nfttravel_address}";
    let Abi = JSON.parse({nfttravel_abi});
    var TravelContact;
    
   
    SmartApp.Travel = {};
    SmartApp.Travel.CacheHtml = '';
    SmartApp.Travel.MakeHtml = '';
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

    SmartApp.Travel.setHtml = async(item) => {
        SmartApp.Travel.CacheHtml = item;
    }
    SmartApp.Travel.getCacheHtml = async() => {
        return SmartApp.Travel.CacheHtml;
    }
    SmartApp.Travel.makeHtml = async(dataToken) => {
        console.log(dataToken.name);
        var itemMake = await SmartApp.Travel.getCacheHtml();
        itemMake = itemMake.replace('{name}',dataToken.name);
        itemMake = itemMake.replace('{star}',dataToken.star);
        
        SmartApp.Travel.MakeHtml += '<div class="col-lg-4 col-md-10 mb-4 item">';
        SmartApp.Travel.MakeHtml += itemMake;
        SmartApp.Travel.MakeHtml += '</div>';

        return SmartApp.Travel.MakeHtml;
    }
    SmartApp.Travel.getHtml = async() =>{
        let data = await SmartApp.Travel.MakeHtml;
        return data;
    }
    SmartApp.Travel.myNFT = async (item, _class, _target) => {
        if(TravelContact == undefined) await SmartApp.Travel.init();
        await SmartApp.Travel.setHtml(item);
        //SmartApp.Travel.MakeHtml = '';
            await TravelContact.getTokenOwner(login_wallet).call().then(async (data)=>{
               
                data.forEach(async (token_id) =>{
                    let dataToken = await TravelContact.getOptions(token_id).call();
                    await SmartApp.Travel.makeHtml(dataToken);
                    
                });

                
            });
        var getHtml = await SmartApp.Travel.getHtml();
        console.log(getHtml);
        $('#myNFT').html(getHtml); 
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
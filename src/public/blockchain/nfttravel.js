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

    
    SmartApp.Travel.getMyNFT = async (htmlItem, _class, _target) => {
        if(TravelContact == undefined) await SmartApp.Travel.init();
        
        //SmartApp.Travel.MakeHtml = '';
        let Items = await TravelContact.getTokenOwner(login_wallet).call().then(async (data)=>{
           var dataItems = [];
           for (var i = 0; i < data.length; i++) {
               let token_id = data[i];
               let token = await TravelContact.getOptions(token_id).call();
               //console.log(Object.keys(dataToken));
               var html = htmlItem;
                html = html.replace('{name}',token.name);
                html = html.replace('{star}',token.star);
                html = html.replace('{bed}',token.bed);
                html = html.replace('{night}',token.night);
                html = html.replace('{opentime}',moment.unix(token.opentime).format('DD-MM-YYYY HH:mm:ss'));
                html = html.replace('{exittime}',moment.unix(Number(token.opentime) + Number(token.songaymua) * 84600).format('DD-MM-YYYY HH:mm:ss'));
                html = html.replace('{lastupdate}',moment.unix(token.lastupdate).format('DD-MM-YYYY HH:mm:ss'));
                html = html.replace('{songayhetky}',token.songayhetky);
                html = html.replace('{songaymua}',token.songaymua);
                html = html.replace('{banner}','src="/'+token.code+'"');
                html = html.replaceAll("{item_id}",token_id);
                //html = '<div class="'+_class+'">'+html+'</div>';
                dataItems.push(html);
           }
            
            return dataItems;
            
        });
        
        var htmlOutput = "";
        for (var i = 0; i < Items.length; i++) {
            htmlOutput += '<div class="'+_class+'">'+Items[i]+'</div>';
        }
        $("#"+_target).html(htmlOutput);
        return true;
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
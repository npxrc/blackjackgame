/*=====================================*/
/* Definitions (functions, vars, etc.) */
/*=====================================*/
function get(a){return localStorage.getItem(a)}
function set(a,b){localStorage.setItem(a,b)}
function encode(a){return btoa(a)}
function decode(a){return atob(a)}
let titlemusic;//define music
if (get('titleMusic')==null){//plays music
    titlemusic = new Audio('bass-of-ace.mp3')
    set('titleMusic','bass-of-ace')
} else{
    let audioNameTesting = get('titleMusic')
    if (audioNameTesting=="bass-of-ace"||audioNameTesting=="pathetichouse"||audioNameTesting=="doors"||audioNameTesting=="amalgam"||audioNameTesting=="nowsyourchance"||audioNameTesting=="goodindahood"||audioNameTesting=="smw3d"){
        titlemusic = new Audio('music/'+audioNameTesting+'.mp3')
    }
}
titlemusic.loop = true;//sets loop
function start(){
    if (document.getElementById('timer')==null){
        document.getElementById('startbox').remove()
        pageto('mainselector')
        titlemusic.volume = 0.4
        titlemusic.play()
    }
}
function saveSettings(){
    if (document.getElementById('settings')!==null){
        titlemusic.pause()
        if (document.getElementById('bass-of-ace').checked){
            set('titleMusic','bass-of-ace')
        } else if (document.getElementById('amalgam').checked){
            set('titleMusic','amalgam')
        } else if (document.getElementById('pathetichouse').checked){
            set('titleMusic','pathetichouse')
        } else if (document.getElementById('nowsyourchance').checked){
            set('titleMusic','nowsyourchance')
        } else if (document.getElementById('doors').checked){
            set('titleMusic','doors')
        } else if (document.getElementById('goodindahood').checked){
            set('titleMusic','goodindahood')
        } else if (document.getElementById('smw3d').checked){
            set('titleMusic','smw3d')
        }
        titlemusic=new Audio(('music/'+((get('titleMusic'))+'.mp3').toString()))
        titlemusic.play()
        titlemusic.loop = true;
        titlemusic.volume = 0.4
    }
}

/* == Go to game Page == */
function pageto(pg){
    if (pg.toLowerCase()=="mainselector"){
        document.getElementById('titlescreen').innerHTML=`<h1 style="font-size: x-large;">Blackjack</h1><button onclick="pageto('bet')">Start Game</button><br><button onclick="pageto('settings')">Settings</button>`
    } else if (pg.toLowerCase()=="settings"){
        //Settings
        /*Updates page*/document.getElementById('titlescreen').innerHTML=`<div class="app centered" id="settings">Music<div class="seperator-small centered"></div><br><div id="setAudio">\n<p class="title">Set audio:<br><br><br><br><br><br></p>\n<label><input type="radio" class="app" id="bass-of-ace">Bass of Ace (default) - Shahrooz Raoofi</label><br>\n<label><input type="radio" class="app" id="amalgam">Undertale - Amalgam (OST: 084)</label><br>\n<label><input type="radio" class="app" id="pathetichouse">Undertale - Pathetic House (OST: 037)</label><br>\n<label><input type="radio" class="app" id="nowsyourchance">Deltarune Chapter 2 - NOWS YOUR CHANCE TO BE A (OST: 023)</label><br>\n<label><input type="radio" class="app" id="doors">ROBLOX Doors OST - Guiding Light</label><br>\n<label><input type="radio" class="app" id="goodindahood">DaDood - Good in Da Hood</label><br>\n<label><input type="radio" class="app" id="smw3d">New Super Mario 3D World (Nintendo) - World 1</label><br>\n<button onclick="saveSettings()">Save Changes</button><br>\n</div>\n<div class="seperator"></div><br><button onclick="pageto('mainselector')">Back</button></div>\n</div>`
        /*event listeners so user doesnt click button more than once*/document.getElementById('bass-of-ace').addEventListener('click',()=>{uncheck(['amalgam','pathetichouse','nowsyourchance','doors','goodindahood','smw3d']);})
        document.getElementById('amalgam').addEventListener('click',()=>{uncheck(['bass-of-ace','pathetichouse','nowsyourchance','doors','goodindahood','smw3d']);})
        document.getElementById('pathetichouse').addEventListener('click',()=>{uncheck(['bass-of-ace','amalgam','nowsyourchance','doors','goodindahood','smw3d']);})
        document.getElementById('doors').addEventListener('click',()=>{uncheck(['bass-of-ace','amalgam','nowsyourchance','pathetichouse','goodindahood','smw3d']);})
        document.getElementById('nowsyourchance').addEventListener('click',()=>{uncheck(['bass-of-ace','amalgam','doors','pathetichouse','goodindahood','smw3d']);})
        document.getElementById('goodindahood').addEventListener('click',()=>{uncheck(['bass-of-ace','amalgam','doors','pathetichouse','nowsyourchance','smw3d']);})
        document.getElementById('smw3d').addEventListener('click',()=>{uncheck(['bass-of-ace','amalgam','doors','pathetichouse','nowsyourchance','goodindahood']);})
    } else if (pg.toLowerCase()=="bet"){
        //Betting
        /*updates page*/document.getElementById('titlescreen').innerHTML=`Select bet:<br><div class="seperator"></div><br><label><input type="radio" class="app" id="5prcnt">$`+Math.floor((0.05)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="10prcnt">$`+Math.floor((0.1)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="25prcnt">$`+Math.floor((0.25)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="50prcnt">$`+Math.floor((0.5)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="100prcnt">All in ($`+Math.floor(decode(userBalance))+`)</label><label><input type="radio" class="app" id="custom">Custom</label><br><div id="customValueEntry"></div><div class="seperator"></div><button onclick="gameStart()">Begin</button><button onclick="pageto('mainselector')">Back</button>`
        /*event listeners so user doesnt click button more than once*/document.getElementById('custom').addEventListener('click',()=>{uncheck(['5prcnt','10prcnt','25prcnt','50prcnt','100prcnt']);document.getElementById('customValueEntry').innerHTML = `<br>Custom Bet:     <input id="customAmount">`;document.getElementById('customAmount').focus()})
        document.getElementById('5prcnt').addEventListener('click',()=>{uncheck(['custom','10prcnt','25prcnt','50prcnt','100prcnt']);document.getElementById('customValueEntry').innerHTML = '';})
        document.getElementById('10prcnt').addEventListener('click',()=>{uncheck(['5prcnt','custom','25prcnt','50prcnt','100prcnt']);document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('25prcnt').addEventListener('click',()=>{uncheck(['5prcnt','10prcnt','custom','50prcnt','100prcnt']);document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('50prcnt').addEventListener('click',()=>{uncheck(['5prcnt','10prcnt','25prcnt','custom','100prcnt']);document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('100prcnt').addEventListener('click',()=>{uncheck(['5prcnt','10prcnt','25prcnt','50prcnt','custom']);document.getElementById('customValueEntry').innerHTML = ''})
    }
}
function uncheck(a){
    if (Array.isArray(a)){
        for (let i=0;i<a.length;i++){
            try{
                document.getElementById(a[i]).checked=false;
            } catch{}
        }
    }
}
setTimeout(() => {
    let interval = setInterval(() => {
        if (get('balance')==null){location.replace('');clearInterval(interval)}
        else if ((decode(get('balance')).match(/NaN/g,''))){clearInterval(interval);alert('FUCK your money got FUCKED. We\'re resetting your progess');localStorage.clear();location.replace('')}
    }, 10);
}, 100);
let userBalance = get('balance')
let usercards = [];
let dealerCards = [];
let gameover = false;
//let readableUserCards = "User cards - "
//let readableDealerCards = "Dealer cards - "
let drawedcard;
let bet;
/*===========*/
/* Logistics */
/*===========*/
setInterval(()=>{
    try{
        document.getElementById('customAmount').value = document.getElementById('customAmount').value.replace(/\D/g,'')
    } catch(e){}
},10)
function gameFinished(){
    document.getElementById('game').innerHTML=''
    pageto('mainselector')
    titlemusic.volume = 0.4
}
/* == Enter UI for game == */
function gameStart(){
    if (document.getElementById('custom').checked){
        if (Math.floor(document.getElementById('customAmount').value)>0 && isFinite(document.getElementById('customAmount').value)){
            bet=Math.floor(document.getElementById('customAmount').value)
            if (bet>decode(get('balance'))){
                alert('The custom amount cannot be greater than how much money you have!')
                bet = 0
                return;
            }
        } else{
            alert('The custom value needs to be a number, and greater than 1!')
        }
    }else if (document.getElementById('5prcnt').checked){
        bet=(0.05*(Math.floor(decode(userBalance))))
    }else if (document.getElementById('10prcnt').checked){
        bet=(0.1*(Math.floor(decode(userBalance))))
    }else if (document.getElementById('25prcnt').checked){
        bet=(0.25*(Math.floor(decode(userBalance))))
    }else if (document.getElementById('50prcnt').checked){
        bet=(0.5*(Math.floor(decode(userBalance))))
    }else if (document.getElementById('100prcnt').checked){
        bet=(Math.floor(decode(userBalance)))
    }else{alert('You need to select a bet!');return;}
    document.getElementById('titlescreen').innerHTML=''
    document.getElementById('game').innerHTML=`<div id="alerts" class="centered">Alerts:<br><p id="gamealerts">None</p></div><div class="app centered dealer" id="dealerStats">Dealer:</div>\n<div class="app centered user" id="userStats">User:</div><br><div class="app centered" id="actions">Actions:<br><button id="hit" onclick="move('hit')">Hit</button><button id="stand" onclick="move('stand')">Stand</button><button id="forfeit" onclick="move('forfeit')">Forfeit (Lose 75% of bet)</button></div>`
    let smallfade = setInterval(() => {
        if (Math.floor(titlemusic.volume)<=0.05){
            clearInterval(smallfade)
            titlemusic.volume=0.05
            return;
        } else{
            titlemusic.volume=Math.floor(titlemusic.volume-0.05)
        }
    }, 30);
    usercards.push(draw())
    usercards.push(draw())
    dealerCards.push(draw())    
    dealerCards.push(draw())
    if (cardcalc(usercards)>21){usercards=[];usercards.push(draw());usercards.push(draw());}
    if (cardcalc(dealerCards)>21){win("The dealer went over 21!")}
    outputCards()
}
function outputCards(){
    let dealerHidden = dealerCards[0]
    let dealerHiddenVal;
    if (dealerCards[(dealerCards.length-1)]=="k"||dealerCards[(dealerCards.length-1)]=="j"||dealerCards[(dealerCards.length-1)]=="q"){
        dealerHiddenVal=cardcalc(dealerCards)-10
    } else{
        dealerHiddenVal=cardcalc(dealerCards)-dealerCards[(dealerCards.length-1)]
    }
    for (let i=1;i<dealerCards.length;i++){
        if (dealerCards[i]==0){
            continue;
        } else{
            dealerHidden = dealerHidden+", ?"
        }
    }
    let userCardsList = usercards[0]
    for (let i=1;i<usercards.length;i++){
        if (usercards[i]==0){
            continue;
        } else{
            userCardsList=userCardsList+", "+usercards[i]
        }
    }
    document.getElementById('userStats').innerHTML = "User: "+cardcalc(usercards)+"<br>Cards List: "+userCardsList
    document.getElementById('dealerStats').innerHTML = "Dealer: At least "+dealerHiddenVal+"<br>Cards List: "+dealerHidden
}
/* == Starting User == */
if (userBalance==null){
    console.log('User just started, setting balance to 10000')
    try{
        set('balance',encode(10000))
        userBalance = 10000
    } catch(e){
        console.error('Something went wrong.\n'+e)
    }
    console.log('Set balance.')
    location.replace('')
}
/* == Anticheat == */
else{
    var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (base64regex.test(userBalance)){
        console.log('User balance is '+(decode(userBalance)))
    } else if (get('balance').toString().toLowerCase()=='infinity'){
        alert('wow imagine trying to cheat and give yourself unlimited money ur baddddddd')
        set('balance',encode(10000))
        userBalance = 10000
    } else{
        alert('wow imagine trying to cheat and give yourself unlimited money ur baddddddd')
        set('balance',encode(10000))
        userBalance = 10000
    }
    set('balance',encode(Math.floor(decode(get('balance')))))
}
/* == Win / Lose == */
/* == == Win == == */
function win(r){
    gameover = true;
    set('balance',encode(Math.floor(decode(get('balance')))+(1.25*(bet))))
    set('balance',encode(Math.floor(decode(get('balance')))))
    console.log('You won!\n'+r)
    outputCards()
    let finalDealer=dealerCards[0]+", "
    for (let i=1;i<dealerCards.length;i++){
        finalDealer+=(dealerCards[i]+", ")
    }
    document.getElementById('dealerStats').innerHTML = "Dealer: "+finalDealer+"<br>Value: "+cardcalc(dealerCards)
    usercards=[]
    dealerCards=[]
    document.getElementById('actions').innerHTML = '<br>'
    let winbet = Math.floor(1.25*Math.floor(bet))
    document.getElementById('gamealerts').innerHTML = `You won! `+r+`\n<br><button onclick="gameFinished()">Back home (+${winbet})</button>`
}
/* == == Lose == == */
function lose(r){
    gameover = true;
    set('balance',encode(Math.floor(decode(get('balance')))-(0.75*(bet)))) //mild insurance so the user doesnt lose all of his/her money
    set('balance',encode(Math.floor(decode(get('balance')))))
    console.log('You lost!\n'+r)
    outputCards()
    let finalDealer=dealerCards[0]+", "
    for (let i=1;i<dealerCards.length;i++){
        finalDealer+=(dealerCards[i]+", ")
    }
    document.getElementById('dealerStats').innerHTML = "Dealer: "+finalDealer+"<br>Value: "+cardcalc(dealerCards)
    usercards=[]
    dealerCards=[]
    document.getElementById('actions').innerHTML = '<br>'
    let losebet = Math.floor(0.75*Math.floor(bet))
    document.getElementById('gamealerts').innerHTML = `You lost! `+r+`\n<br><button id="final" onclick="gameFinished()">Back home (-${losebet})</button>`
}
/* == Calculate Card Values == */
function cardcalc(l){
    if (Array.isArray(l)){
        let value = 0;
        for (let i=0;i<l.length;i++){
            let card = l[i]
            if (card<12 && isFinite(card)){
                if (card==0){
                    const index = l.indexOf(11);
                    if (index > -1) {
                        l.splice(index, 1);
                    }
                    if (cardcalc(l[i])>11){
                        l.push(1)
                    } else{
                        l.push(11)
                    }
                    value = (Math.floor(value))+(Math.floor(card))
                }
                else{
                    value = (Math.floor(value))+(Math.floor(card))
                }
            } else if (card=="k"||card=="q"||card=="j"){
                value+=10
            }
        }
        return value
    } else{return 'Error. Value being passed is not an array';}
}
/* == User move (hit, stand, forfeit) == */
function move(move){
    if (move=="hit"){
        usercards.push(draw()) // draws new card
        if (cardcalc(usercards)>21){ //checks for over 21
            lose("You busted and went over 21!")
            return;
        } else if (cardcalc(usercards).length==5){ // checks if user has 5 cards
            win("You took 5 cards without going over 21!")
            return;
        } else if (cardcalc(usercards)==21){ // checks for 21
            win("You reached 21!")
            return;
        }else{ // if they havent won or lost, game is on.
            console.log('Your cards value is '+cardcalc(usercards)+'.\nThe dealers card value is '+cardcalc(dealerCards)+'.')
            outputCards()
            document.getElementById("hit").disabled=true; //disables the movement so the user cant spam while the dealer is moving.
            document.getElementById("stand").disabled=true;
            document.getElementById('forfeit').disabled=true;
        }
    } else if (move=="stand"){
        if (cardcalc(dealerCards)>17 && cardcalc(usercards)<cardcalc(dealerCards)){ //dealer has more than 17, and dealer has more.
            lose('You stood with a lower score than the dealer!')
        }else if (cardcalc(dealerCards)<18 && cardcalc(dealerCards)<cardcalc(usercards)){
            win("You stood with a higher score than the dealer!")
        }
    } else if (move=="forfeit"){
        lose("You forfeited!");
        return;
    }
    /* == Set a random timeframe for the bot to wait until moving (so it seems real lol) == */
    let timeout = Math.floor(Math.random()*3000)
    timeout+=2000
    setTimeout(() => {
        if (cardcalc(usercards)>cardcalc(dealerCards) && cardcalc(dealerCards)<16){
            dealerMove("hit")
        } else if (cardcalc(dealerCards)>cardcalc(usercards) && cardcalc(dealerCards)>=16){
            dealerMove("stand")
        } else{
            dealerMove("hit")
        }
    }, timeout);
}
function dealerMove(move){
    move=move.toString().toLowerCase()
    if (gameover){
        return;
    }
    if (move=="hit"){
        dealerCards.push(draw())
        if (cardcalc(dealerCards)>21){
            win("The dealer busted and went over 21!")
            outputCards()
            return;
        } else if (cardcalc(usercards).length==5){
            lose("The dealer took 5 cards without going over 21!")
            outputCards()
            return;
        } else if (cardcalc(dealerCards)==21){
            lose("The dealer got to 21 before you!")
            outputCards()
            return;
        } else if (cardcalc(dealerCards)>16){
            dealerMove("stand")
        } 
        else{
            console.log('Your cards value is '+cardcalc(usercards)+'.\nThe dealers card value is '+cardcalc(dealerCards)+'.')
            outputCards()
            document.getElementById("hit").disabled=false;
            document.getElementById("stand").disabled=false;
            document.getElementById('forfeit').disabled=false;
        }
    } else if (move=="stand"){
        if (cardcalc(dealerCards)>cardcalc(usercards)){
            if (Math.floor(Math.random()*3)==2||cardcalc(dealerCards)>16){
                lose('The dealer stood with a higher score than you!')
            } else{
                dealerMove("hit")
                document.getElementById("hit").disabled=false;
                document.getElementById("stand").disabled=false;
                document.getElementById('forfeit').disabled=false;
            }
        } else if (cardcalc(dealerCards)<17){
            dealerMove("hit")
        }
    }
}
function draw(){
    let random = Math.floor(Math.random()*15-1)
    if (random==1){
        drawedcard = "j"
    } else if (random==2){
        drawedcard = "q"
    } else if (random==3){
        drawedcard = "k"
    }else{
        drawedcard = Math.floor(Math.random()*12-1)
        if (drawedcard<0){
            drawedcard = 1
        }
    }
    return drawedcard
}
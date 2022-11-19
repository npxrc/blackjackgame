/*=====================================*/
/* Definitions (functions, vars, etc.) */
/*=====================================*/
function get(a){return localStorage.getItem(a)}
function set(a,b){localStorage.setItem(a,b)}
function encode(a){return btoa(a)}
function decode(a){return atob(a)}
let titlemusic = new Audio('bass-of-ace.mp3')
titlemusic.loop = true;
function start(){
    if (document.getElementById('timer')==null){
        document.getElementById('startbox').remove()
        pageto('mainselector')
        titlemusic.volume = 0.4
        titlemusic.play()
    }
}
setInterval(()=>{
    try{
        document.getElementById('customAmount').value = document.getElementById('customAmount').value.replace(/\D/g,'')
    } catch(e){}
},10)
/* == Go to game Page == */
function pageto(pg){
    if (pg.toLowerCase()=="mainselector"){
        document.getElementById('titlescreen').innerHTML=`<h1 style="font-size: x-large;">Blackjack</h1><button onclick="pageto('bet')">Start Game</button><br><button onclick="pageto('settings')">Settings</button>`
    } else if (pg.toLowerCase()=="settings"){
        document.getElementById('titlescreen').innerHTML=`<div id="settings">No settings yet!<br><button onclick="pageto('mainselector')">Back</button></div>`
    } else if (pg.toLowerCase()=="bet"){
        document.getElementById('titlescreen').innerHTML=`Select bet:<br><div class="seperator"></div><br><label><input type="radio" class="app" id="5prcnt">$`+Math.floor((0.05)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="10prcnt">$`+Math.floor((0.1)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="25prcnt">$`+Math.floor((0.25)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="50prcnt">$`+Math.floor((0.5)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="100prcnt">All in ($`+Math.floor(decode(userBalance))+`)</label><label><input type="radio" class="app" id="custom">Custom</label><br><div id="customValueEntry"></div><div class="seperator"></div><button onclick="gameStart()">Begin</button><button onclick="pageto('mainselector')">Back</button>`
        document.getElementById('custom').addEventListener('click',()=>{document.getElementById('5prcnt').checked=false;document.getElementById('10prcnt').checked=false;document.getElementById('25prcnt').checked=false;document.getElementById('50prcnt').checked=false;document.getElementById('100prcnt').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = `<br>Custom Bet:     <input id="customAmount">`;})
        document.getElementById('5prcnt').addEventListener('click',()=>{document.getElementById('10prcnt').checked=false;document.getElementById('25prcnt').checked=false;document.getElementById('50prcnt').checked=false;document.getElementById('100prcnt').checked=false;document.getElementById('custom').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = '';})
        document.getElementById('10prcnt').addEventListener('click',()=>{document.getElementById('5prcnt').checked=false;document.getElementById('25prcnt').checked=false;document.getElementById('50prcnt').checked=false;document.getElementById('100prcnt').checked=false;document.getElementById('custom').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('25prcnt').addEventListener('click',()=>{document.getElementById('5prcnt').checked=false;document.getElementById('10prcnt').checked=false;document.getElementById('50prcnt').checked=false;document.getElementById('100prcnt').checked=false;document.getElementById('custom').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('50prcnt').addEventListener('click',()=>{document.getElementById('5prcnt').checked=false;document.getElementById('10prcnt').checked=false;document.getElementById('25prcnt').checked=false;document.getElementById('100prcnt').checked=false;document.getElementById('custom').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = ''})
        document.getElementById('100prcnt').addEventListener('click',()=>{document.getElementById('5prcnt').checked=false;document.getElementById('10prcnt').checked=false;document.getElementById('25prcnt').checked=false;document.getElementById('50prcnt').checked=false;document.getElementById('custom').checked=false;customBetInterval='';document.getElementById('customValueEntry').innerHTML = ''})
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
//let readableUserCards = "User cards - "
//let readableDealerCards = "Dealer cards - "
let drawedcard;
let bet;
/*===========*/
/* Logistics */
/*===========*/
/* == Enter UI for game == */
function gameStart(){
    if (document.getElementById('custom').checked){
        if (Math.floor(document.getElementById('customAmount').value)>0 && isFinite(document.getElementById('customAmount').value)){
            bet=Math.floor(document.getElementById('customAmount').value)
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
    document.getElementById('game').innerHTML=`<div class="app centered dealer" id="dealerStats">Dealer:</div>\n<div class="app centered user" id="userStats">User:</div><br><div class="app centered" id="actions">Actions:<br><button id="hit" onclick="move('hit')">Hit</button><button id="stand" onclick="move('stand')">Stand</button><button id="forfeit" onclick="move('forfeit')">Forfeit (Lose 75% of bet)</button></div>`
    titlemusic.volume = 0.4
    titlemusic.paused=true
    titlemusic.pause()
    usercards.push(draw())
    usercards.push(draw())
    dealerCards.push(draw())    
    dealerCards.push(draw())
    if (cardcalc(usercards)>21){usercards=[];usercards.push(draw());usercards.push(draw());}
    if (cardcalc(dealerCards)>21){win("The dealer went over 21!")}
    outputCards()
}
function outputCards(){
    document.getElementById('userStats').innerHTML = "User: "+cardcalc(usercards)
    document.getElementById('dealerStats').innerHTML = "Dealer: "+dealerCards[0]+", ?"
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
    set('balance',encode(Math.floor(decode(get('balance')))+(1.25*(bet))))
    set('balance',encode(Math.floor(decode(get('balance')))))
    console.log('You won!\n'+r)
    outputCards()
    usercards=[]
    dealerCards=[]
    alert('You won!\n'+r)
    document.getElementById('game').innerHTML=''
    pageto('mainselector')
    titlemusic.volume = 0.4
    titlemusic.play()
}
/* == == Lose == == */
function lose(r){
    set('balance',encode(Math.floor(decode(get('balance')))-(0.75*(bet))))
    set('balance',encode(Math.floor(decode(get('balance')))))
    console.log('You lost!\n'+r)
    outputCards()
    usercards=[]
    dealerCards=[]
    alert('You lost!\n'+r)
    document.getElementById('game').innerHTML=''
    pageto('mainselector')
    titlemusic.volume = 0.4
    titlemusic.play()
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
        } else if (cardcalc(usercards).length>5){ // checks if user has 5 cards
            win("You took 5 cards without going over 21!")
            return;
        } else if (cardcalc(usercards)==21){ // checks for 21
            win("You reached 21!")
            return;
        }else{ // if they havent won or lost, game is on.
            console.log('Your cards value is '+cardcalc(usercards)+'.\nThe dealers card value is '+cardcalc(dealerCards)+'.')
            outputCards()
            document.getElementById('hit').disabled=true; //disables the movement so the user cant spam while the dealer is moving.
            document.getElementById('stand').disabled=true;
            document.getElementById('forfeit').disabled=true;
        }
    } else if (move=="stand"){
        if (cardcalc(dealerCards)>17 && cardcalc(usercards)<cardcalc(dealerCards) && usercards.length<dealerCards.length){    
            let timeout = Math.floor(Math.random()*3000)
            timeout+=2000
            setTimeout(() => {
                if (Math.floor(Math.random()*3)==1){
                    if (cardcalc(dealerCards)==17) dealerCards.push('4')
                    else if (cardcalc(dealerCards)==18) dealerCards.push('3')
                    else if (cardcalc(dealerCards)==19) dealerCards.push('2')
                    else if (cardcalc(dealerCards)==20) dealerCards.push('1')
                } else{
                    dealerCards.push(draw())
                    if (cardcalc(dealerCards)>21){
                        win("The dealer busted and went over 21!")
                    } else if (cardcalc(usercards)>cardcalc(dealerCards)){
                        win("You stood with a higher score than the dealer!")
                    } else if (cardcalc(usercards)<cardcalc(dealerCards)){
                        lose("You stood with a lower score than the dealer!")
                    }
                }
            }, timeout);
        }  else if (cardcalc(dealerCards)<12 && cardcalc(dealerCards)<cardcalc(usercards)){
            dealerMove('hit')
        } else if (cardcalc(dealerCards)<18 && cardcalc(dealerCards)<cardcalc(usercards)){
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
            dealerstand()
        } else{
            dealerMove('hit')
        }
    }, timeout);
}
function dealerMove(move){
    if (move=="hit"){
        dealerCards.push(draw())
        if (cardcalc(dealerCards)>21){
            win("The dealer busted and went over 21!")
            outputCards()
            return;
        } else if (cardcalc(usercards).length>5){
            lose("The dealer took 5 cards without going over 21!")
            outputCards()
            return;
        } else if (cardcalc(dealerCards)==21){
            lose("The dealer got to 21 before you!")
            outputCards()
            return;
        }else{
            console.log('Your cards value is '+cardcalc(usercards)+'.\nThe dealers card value is '+cardcalc(dealerCards)+'.')
            outputCards()
            document.getElementById('hit').disabled=false;
            document.getElementById('stand').disabled=false;
            document.getElementById('forfeit').disabled=false;
        }
    } else if (move=="stand"){
        dealerstand()
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
function dealerstand(){
    if (cardcalc(usercards)>cardcalc(dealerCards) && cardcalc(dealerCards)<16){
        dealerMove("hit")
    } else if (cardcalc(dealerCards)>cardcalc(usercards)){
        if (Math.floor(Math.random()*10)==6){
            lose("The dealer stood with a higher score than you!")
        } else{
            dealerMove("hit")
        }
    }
}
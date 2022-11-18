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
    document.getElementById('startbox').remove()
    titlemusic.volume = 0.4
    titlemusic.play()
    pageto('mainselector')
}
setInterval(()=>{
    try{
        document.getElementById('customAmount').value = document.getElementById('customAmount').value.replace(/\D/g,'')
    } catch(e){}
},10)
/* == Go to game Page == */
function pageto(pg){
    if (pg.toLowerCase()=="mainselector"){
        document.getElementById('titlescreen').innerHTML=`<button onclick="pageto('bet')">Start Game</button><br><button onclick="pageto('settings')">Settings</button>`
    } else if (pg.toLowerCase()=="settings"){
        document.getElementById('titlescreen').innerHTML=`<div id="settings">No settings yet!<br><button onclick="pageto('mainselector')">Back</button></div>`
    } else if (pg.toLowerCase()=="bet"){
        document.getElementById('titlescreen').innerHTML=`Select bet:<br><div class="seperator"></div><br><label><input type="radio" class="app" id="5prcnt">$`+((0.05)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="10prcnt">$`+((0.1)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="25prcnt">$`+((0.25)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="50prcnt">$`+((0.5)*(decode(userBalance)))+`</label><label><input type="radio" class="app" id="100prcnt">All in ($`+(decode(userBalance))+`)</label><label><input type="radio" class="app" id="custom">Custom</label><br><div id="customValueEntry"></div><div class="seperator"></div><button onclick="gameStart()">Begin</button><button onclick="pageto('mainselector')">Back</button>`
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
    let titleinterval = setInterval(() => {
        document.getElementById('warningtitle').style.all="@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');"
        document.getElementById('warningtitle').style.fontFamily="'Montserrat',Helvetica"
    }, 10);
}, 100);
function gameStart(){
    if (document.getElementById('custom').checked){
        if (Math.floor(document.getElementById('customAmount').value)>0 && isFinite(document.getElementById('customAmount').value)){
            bet=Math.floor(document.getElementById('customAmount').value)
        } else{
            alert('The custom value needs to be a number, and greater than 1!')
        }
    }else if (document.getElementById('5prcnt').checked){
        bet=(0.05*(decode(userBalance)))
    }else if (document.getElementById('10prcnt').checked){
        bet=(0.1*(decode(userBalance)))
    }else if (document.getElementById('25prcnt').checked){
        bet=(0.25*(decode(userBalance)))
    }else if (document.getElementById('50prcnt').checked){
        bet=(0.5*(decode(userBalance)))
    }else if (document.getElementById('100prcnt').checked){
        bet=(decode(userBalance))
    }else{alert('You need to select a bet!')}
    if (bet!==0 && bet.length>0 && isFinite(bet)){
        document.getElementById('titlescreen').innerHTML=''
        document.getElementById('game').innerHTML='<h1>Hello</h1>'
    }
}
let userBalance = get('balance')
let usercards = [];
let uservalue = 0;
let dealerCards = [];
let dealervalue = 0;
let drawedcard;
let bet;
/*===========*/
/* Logistics */
/*===========*/
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
}

function win(r){
    set('balance',encode(Math.floor(decode(get('balance')))+(1.25*(bet))))
    console.log('You won!\n'+r)
    usercards=[]
    dealerCards=[]
}
function lose(r){
    set('balance',encode(Math.floor(decode(get('balance')))-(0.75*(bet))))
    console.log('You lost!\n'+r)
    usercards=[]
    dealerCards=[]
}
/* == Calculate Card Values == */
function cardcalc(l){
    if (Array.isArray(l)){
        let value = 0;
        for (let i=0;i<l.length;i++){
            let card = l[i]
            card=Math.floor(card)
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
                value = (Math.floor(value))+(Math.floor(10))
            }
        }
        return value
    } else{return 'Error. Value being passed is not an array';}
}
/* == Check for winning or over == */
function move(move){
    if (move=="hit"){
        usercards.push(draw())
        if (cardcalc(usercards)>21){
            lose("You busted and went over 21!")
        } else if (cardcalc(usercards).length>5){
            win("You took 5 cards without going over 21!")
        }
    } else if (move=="stand"){
        userstand()
    } else if (move=="forfeit"){
        lose("You forfeited!")
    }
    let timeout = Math.floor(Math.random()*5000)
    timeout+=2000
    setTimeout(() => {
        if (cardcalc(usercards)>cardcalc(dealerCards) && cardcalc(dealerCards)<16){
            dealerMove("hit")
        } else if (cardcalc(dealerCards)>cardcalc(usercards) && cardcalc(dealerCards)>=18){
            dealerstand()
        }
    }, timeout);
}
function dealerMove(move){
    if (move=="hit"){
        dealerCards.push(draw())
        if (cardcalc(dealerCards)>21){
            win("The dealer busted and went over 21!")
        } else if (cardcalc(usercards).length>5){
            lose("The dealer took 5 cards without going over 21!")
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
function userstand(){
    if (cardcalc(dealerCards)>17 && cardcalc(usercards)<cardcalc(dealerCards) && usercards.length<dealerCards.length){    
        let timeout = Math.floor(Math.random()*5000)
        timeout+=2000
        setTimeout(() => {
            if (Math.floor(Math.random()*3)==1){
                if (cardcalc(dealerCards)==17) dealerCards.push('4')
                else if (cardcalc(dealerCards)==18) dealerCards.push('3')
                else if (cardcalc(dealerCards)==19) dealerCards.push('2')
                else if (cardcalc(dealerCards)==20) dealerCards.push('1')
            } else{
                
            }
        }, timeout); 
    }  else if (cardcalc(dealerCards)<17 && cardcalc(dealerCards)<cardcalc(usercards)){
        win("You stood with a higher score than the dealer!")
    }
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
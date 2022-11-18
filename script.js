/*=====================================*/
/* Definitions (functions, vars, etc.) */
/*=====================================*/
function get(a){return localStorage.getItem(a)}
function set(a,b){localStorage.setItem(a,b)}
function encode(a){return btoa(a)}
function decode(a){return atob(a)}
function start(){
    document.getElementById('startbox').remove()
    let titlemusic = new Audio('bass-of-ace.mp3')
    titlemusic.loop = true;
    titlemusic.volume = 0.4
    titlemusic.play()
}
let userBalance = get('balance')
let usercards = [];
let uservalue = 0;
let dealerCards = [];
let dealervalue = 0;
let drawedcard;
let bet;
setTimeout(() => {
    setInterval(() => {
        if (get('balance')==null){location.replace('')}
    }, 10);
}, 100);
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
    set('balance',encode((decode(get('balance')))+bet))
    console.log('You won!\n'+r)
}
function lose(r){
    set('balance',encode((decode(get('balance')))-bet))
    console.log('You lost!\n'+r)
}
/* == Calculate Card Values == */
function cardcalc(l){
    if (Array.isArray(l)){
        let value = 0;
        for (let i=0;i<l.length;i++){
            let card = l[i]
            card=Math.floor(card)
            if (card<14){
                if (card==0){
                    //value = (Math.floor(value))+(Math.floor())
                    const index = l.indexOf(11);
                    if (index > -1) {
                        l.splice(index, 1);
                    }
                    if (cardcalc(l)>11){
                        l.push(1)
                    } else{
                        l.push(11)
                    }
                    value = (Math.floor(value))+(Math.floor(card))
                }
                else{
                    value = (Math.floor(value))+(Math.floor(card))
                }
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
    drawedcard = Math.floor(Math.random()*12-1)
    if (drawedcard<0){
        drawedcard = 0
    }
    return drawedcard
}
function userstand(){
    if (cardcalc(dealerCards)>17 && cardcalc(usercards)<cardcalc(dealerCards) && usercards.length<dealerCards.length){
        if (Math.floor(Math.random()*2)==1){
            lose("The dealer got to 21 before you!")
        } else{
            win("The dealer went over 21 and busted!")
        }
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
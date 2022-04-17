function startGame(){
    xValue = [];
    circleValue = [];
    xPosition = [];
    circlePositon = [];
    positionValue = [];
    isCircle = false;
    i   = 1;
    xWinAlert.style.display = 'none';
    circleWinAlert.style.display = 'none'
    drawAlert.style.display = 'none';
    playground.style.display = 'grid';
    gameBoard.classList.remove('drawBackground');
    resetBtn.textContent = 'Reset game';
    gameButtons.forEach(item=>{
        item.classList.remove(`${CIRCLE_MARK}`);
        item.classList.remove(`${X_MARK}`);
        item.classList.remove(`highlight`);
        item.removeEventListener('click',handleClick);
        item.addEventListener('click', handleClick, {once:true});
    })
    history()
}
let i = 1;    
startGame()
let placeCount;
function handleClick(e){
    const btn = e.target,
          currentClass = isCircle ? CIRCLE_MARK : X_MARK;
    placeMark(btn,currentClass);
    placeCount = xValue.length + circleValue.length;
    history();

    checkWinning();
    checkDraw();
    // console.log( circlePositon, xPosition)
}
function placeMark(btn, currentClass){
    isCircle = !isCircle;
    btn.classList.add(currentClass);
    let positionData = {
        position: btn.getAttribute('position'),
        step: i++,
        value: btn.value
    }
    positionValue.push(positionData)
    if(!isCircle){
        circleValue.push(btn.value);
        // circlePositon.push(btn.getAttribute('position'));
    }else{
        xValue.push(btn.value);
        // xPosition.push(btn.getAttribute('position'));
    }
}
function checkWinning(){
    for (let i = 0; i<winningCase.length;i++){
        let combination = winningCase[i];
        let a = combination.every(e => xValue.includes(e)),
            b = combination.every(e => circleValue.includes(e));
        if(a == true){
            xWinAlert.style.display = 'block';
            resetBtn.textContent = 'Play again';
            gameButtons.forEach(item=>{
                item.removeEventListener('click',handleClick)
            })
            highlight()
            break
        }
        else if(b==true){
            resetBtn.textContent = 'Play again';
            circleWinAlert.style.display = 'block';
            gameButtons.forEach(item=>{
                item.removeEventListener('click',handleClick)
            })
            highlight()
            break
        }
    }
}
resetBtn.addEventListener('click', function(){
    startGame()
})
function highlight(){
    for(let i = 0; i<winningCase.length;i++){
        let valueTurn = isCircle?xValue:circleValue;
        let winingMark = valueTurn.filter(e =>{
            let isContainEls = winningCase[i].every(item => valueTurn.includes(item));
            if(isContainEls == true){
              return  winningCase[i].includes(e);
            }
        } )
        winingMark.forEach(value=>{
            let winningBtn = document.querySelector(`button[value="${value}"]`)
            winningBtn.classList.add('highlight')
        })
    }
}
function checkDraw(){

        const a = document.getElementsByClassName('highlight')
        if(placeCount==gameButtons.length && a.length == 0){
            resetBtn.textContent = 'Play again';
            drawAlert.style.display = 'block';
            playground.style.display = 'none';
            gameBoard.classList.add('drawBackground');
        }
}
function history(){
    playerTurn.textContent = `Next Player: ${isCircle?'O':'X'}`;
    let valueTurn = isCircle?xValue:circleValue; 
    // let positionTurn = isCircle?xPosition:circlePositon;
    historyStep.innerHTML = `<span>1. <button step = '0'>Go to game start (0,0)</button></span>`
    positionValue.map(item =>{
        historyStep.innerHTML += 
        `<span>${item.step + 1}. <button>Go to move #${item.step} ${item.position}</button></span>`
    })
    const stepBtns = historyStep.querySelectorAll('button');
    stepBtns.forEach(btn =>{
        btn.addEventListener('click',renderHistory)
    })
}
function renderHistory(e){
    const btn = e.target;
    
    console.log( positionValue)
}
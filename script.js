

/* DOM elements */
let upperScreen = document.querySelector(".upper");
let lowerScreen = document.querySelector(".lower");
let ac = document.querySelector("#ac");
let buttons = document.querySelectorAll(".row:not(.row1):not(.row5) > div,row5 > #zero");
let backspace = document.querySelector("#backspace");
let decimal = document.querySelector("#decimal");
let operators = document.querySelectorAll("#plus,#minus,#multiply,#divide");
let equals = document.querySelector("#equals");

let content="";



/* input rules for digit buttons */
buttons.forEach(div => {
    div.addEventListener("click",e => {
        if(content.length < 12) {
            if(content == 0){
                content = div.textContent
            } else {
                content += div.textContent;
            }
        } else if (content.length == 12){
            content += div.textContent;
            let temp = content.split("").slice(1,content.length).join("");
            content = temp;
        }
        showContent();
    })
})


/* input rules for AC button*/
ac.addEventListener("click",e => {
    resetContent();
})


/* input rules for backspace button*/
backspace.addEventListener("click",e => {
    if (content.length == 1) {
        if (content != "0") {
            content = "0"
        }
    } else {
        let temp = content.split("").slice(0,(content.length-1)).join("");
        content = temp;
    }
    showContent();
})


/* input rules for decimal button */
decimal.addEventListener("click",e => {
    let toggle = true;
    for(let i=0;i<content.length;i++){
        if(content.charAt(i) === "."){
            toggle = false;
        }
    }
    if(content.length < 12) {
        if(toggle === true){
            content += decimal.textContent;
        }
    } else if (content.length === 12){
        if(toggle === true){
            content += decimal.textContent;
            let temps = content.split("").slice(2,content.length-1).join("");
            content = temps;
            showContent()
        }
    }
})

/* input rules for operators */

let firstNum = 0;
let secondNum = 0;
let operation= "";
let result = "";

operators.forEach(div => {
    div.addEventListener("click",e => {
        firstNum = content;
        resetContent();
        operation = div.textContent;
        showContent();
    })
})

/* input rules for equals */
equals.addEventListener("click", e => {
    secondNum = content;
    resetContent()
    result = String(operate(Number(firstNum),Number(secondNum),operation));
    lowerScreen.textContent = result;
    resetCalc;
})





function operate(num1,num2,operator) {
    if(operator === "plus"){
        return (num1+num2);
    } else if(operator === "minus"){
        return (num1-num2);
    } else if(operator === "multiply"){
        return (num1*num2);
    } else if(operator === "divide"){
        return (num1/num2);
    }
}

function showContent() {
    upperScreen.textContent = content;
}

function resetContent() {
    content = "0";
    upperScreen.textContent = content;
}

function resetCalc () {
    firstNum = 0;
    secondNum = 0;
    operation = "";
    result = "";
}


/* DOM elements */
let upperScreen = document.querySelector(".upper");
let lowerScreen = document.querySelector(".lower");
let ac = document.querySelector("#ac");
let buttons = document.querySelectorAll("#one,#two,#three,#four,#five,#six,#seven,#eight,#nine,#zero");
let backspace = document.querySelector("#backspace");
let decimal = document.querySelector("#decimal");
let operators = document.querySelectorAll("#plus,#minus,#multiply,#divide");
let equals = document.querySelector("#equals");
let sign = document.querySelector("#sign");

/* important variables */
let content="";
let contentNum = 0;

let firstNum = 0;
let secondNum = 0;
let operation= "";
let result = "";


/* important functions */

function operate(num1,num2,operator) {
    if(operator === "+"){
        return (num1+num2).toFixed(2);
    } else if(operator === "-"){
        return (num1-num2).toFixed(2);
    } else if(operator === "*"){
        return (num1*num2).toFixed(2);
    } else if(operator === "/"){
        return (num1/num2).toFixed(2);
    }
}

function showContent() {
    upperScreen.textContent = content;
}

function resetContent() {
    content = "0";
    contentNum = 0;
    upperScreen.textContent = content;
    lowerScreen.textContent = "";
}

function resetCalc () {
    firstNum = 0;
    secondNum = 0;
    operation = "";
    result = "";
}





/* input rules for digit buttons */
buttons.forEach(div => {
    div.addEventListener("click",e => {
        if(upperScreen.textContent.length < 12) {
            if(upperScreen.textContent === "0"){
                content = div.textContent;
                upperScreen.textContent = div.textContent;
                contentNum = Number(content);
            } else {
                content += div.textContent;
                upperScreen.textContent += div.textContent;
                contentNum = Number(content);
            }
        } else if (upperScreen.textContent.length == 12){
            upperScreen.textContent += div.textContent;
            let temp = upperScreen.textContent.split("").slice(1,upperScreen.textContent.length).join("");
            content = temp;
            upperScreen.textContent = temp;
            contentNum = Number(content);
        }
        
    })
})


/* input rules for AC button*/
ac.addEventListener("click",e => {
    resetContent();
    resetCalc();

})


/* input rules for backspace button*/
backspace.addEventListener("click",e => {
    if (upperScreen.textContent.length == 1) {
        if (upperScreen.textContent != "0") {
            upperScreen.textContent = "0"
            content = "0";
            contentNum = Number(content);
        }
    } else {
        let temp = upperScreen.textContent.split("").slice(0,(upperScreen.textContent.length-1)).join("");
        upperScreen.textContent = temp;
        content = temp;
        contentNum = Number(content);
    }
    //showContent();
})


/* input rules for decimal button */
decimal.addEventListener("click",e => {
    let toggle = true;
    for(let i=0;i<content.length;i++){
        if(content.charAt(i) === "."){
            toggle = false;
        }
    }
    if(upperScreen.textContent.length < 12) {
        if(toggle === true){
            upperScreen.textContent += decimal.textContent;
            content += decimal.textContent;
            contentNum = Number(content);
            //showContent();
        }
    } else if (upperScreen.textContent.length === 12){
        if(toggle === true){
            upperScreen.textContent += decimal.textContent;
            let temps = upperScreen.textContent.split("").slice(1,upperScreen.textContent.length).join("");
            upperScreen.textContent = temps;
            content = temps;
            contentNum = Number(content);
            
            //showContent();
        }
    }
})

/* input rules for operators */

operators.forEach(div => {
    div.addEventListener("click",e => {
        if (lowerScreen.textContent === ""){
            firstNum = contentNum;
            upperScreen.textContent += div.textContent;
            operation = div.textContent;
            content = "0";
            contentNum = Number(content); 
        } else {
            firstNum = Number(lowerScreen.textContent);
            upperScreen.textContent = lowerScreen.textContent;
            upperScreen.textContent += div.textContent;
            operation = div.textContent;
            content = "0";
            contentNum = Number(content);
        }
    })
})

/* input rules for equals */
equals.addEventListener("click", e => {
    secondNum = contentNum;
    result = operate(firstNum,secondNum,operation);
    firstNum = result;
    lowerScreen.textContent = result;
})

/* input rules for sign */

sign.addEventListener("click",e => {
    if(lowerScreen.textContent != ""){
        lowerScreen.textContent = (Number(lowerScreen.textContent)*(-1)).toFixed(2);
    }
})


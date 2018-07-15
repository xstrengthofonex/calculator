
function beginsWithZero(chain, value){
    if (value !== "0")
        return false;
    else if (chain.length > 0 && chain[0] === "0")
        return true;
}

function lastValueIsInterger(chain){
    return Number.isInteger(parseInt(chain[chain.length-1]))
}

function lastValueIsFloat(chain){
    return !!(parseFloat(chain[chain.length-1]) % 1);
}

function lastValueIsOperator(chain){
    let operators = ["+", "-", "*", "/"];
    return operators.includes(chain[chain.length-1]);
}

function replaceLastOperator(chain, operator){
    chain.pop();
    chain.push(operator);
}


function hasDecimal(chain){
    let lastValue = chain[chain.length-1];
    if (lastValue){
        return lastValue.charAt(lastValue.length - 1) === ".";
    }
}

function concatValues(chain, value){
    let lastValue = chain.pop();
    chain.push(lastValue + value);
}

function showDisplay(output, display){
    display.text(output);
}

$(document).ready(function(){
    let chain = [],
        initalValue = 0,
        display = $("#display");

    $(".numbers").click(function(){
        let value = $(this).text();
        if (beginsWithZero(chain, value))
            return;
        else if (lastValueIsInterger(chain))
            concatValues(chain, value);
        else 
            chain.push(value);
        let output = chain.join("");
        showDisplay(output, display);
    });

    $(".operations").click(function(){
        let operator = $(this).text();
        if (lastValueIsOperator(chain))
            replaceLastOperator(chain, operator);
        else 
            chain.push(operator);
        let output = chain.join("");
        showDisplay(output, display);
    });

    $("#clear").click(function(){
        chain = [];
        showDisplay(initalValue, display);
    });

    $("#equals").click(function(){
        let output = "" + eval(chain.join(""))
        showDisplay(output, display);
        chain = [output];
    });

    $("#decimal").click(function(){
        if (!hasDecimal(chain) && lastValueIsInterger(chain) 
            && !lastValueIsFloat(chain)){
            concatValues(chain, ".");
            let output = chain.join("");
            showDisplay(output, display);
        }
    });
});
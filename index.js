const slider = document.querySelector("[data-lengthSlider]");
const length = document.querySelector("[data-lengthNumber]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generatebutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const passwwordDisplay = document.querySelector("[data-password-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const symbols = '!@#$%^&*()_-+=[]{}\|;:,./<>?';

let password = "";
let passwordLength = 10;
let count = 0;
handleSlider();

setIndicator('#ccc');



function handleSlider(){

    slider.value = passwordLength;
    length.innerText = passwordLength;

    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%"

}

function setIndicator(color)
{
    indicator.getElementsByClassName.backgroundColor = color;
}

function getRandomInteger(min, max)
{

    return Math.floor(Math.random()*(max-min))+min;

}

function generateRandomNumber()
{
    return getRandomInteger(0, 9);
}

function generateLowerCase()
{
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase()
{
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbols()
{
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calStrength()
{
    let hasupper = false;
    let haslower = false;
    let hasnum = false;
    let hassym = false;

    if(uppercaseCheck.checked) hasupper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numbersCheck.checked) hasnum = true;
    if(symbolsCheck.checked) hassym = true;

    if(hasupper && haslower && (hasnum || hasSym) && passwordLength >= 8)
    {
        setIndicator("#0f0");
    }
    else if(
        (haslower || hasupper) &&
        (hasnum || hassym) &&
        passwordLength >=6
    )
    {
        setIndicator("#ff0");
    }
    else
    {
        setIndicator("#f00");
    }
}

async function copyContent()
{
    try{
    await navigator.clipboard.writeText(passwwordDisplay.value);
    copyMsg.innerText = 'copied';
    }
    catch{
        copyMsg.innerText = 'failed';
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

slider.addEventListener('input', function(e){
    passwordLength = e.target.value;
    handleSlider();
})

function handleCheckBoxChange()
{
    count= 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
        count++;
    });

    if(passwordLength <= count)
    {
        passwordLength = count;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

copyBtn.addEventListener('click', function()
{
    if(passwwordDisplay.value)
    copyContent();
});

function shufflepassword(array)
{
    //FisherYatesMethod

    for(let i=array.length-1; i>0;i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str+=el));
    return str;

}

generateBtn.addEventListener('click', function()
{
    if(count <= 0)
    return;

    if(passwordLength < count)
    {
        passwordLength = count;
        handleSlider();
    }

    password = '';

    let funcArr = [];

    if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
    funcArr.push(generateSymbols);

    for(let i=0;i<funcArr.length;i++)
    {
        password += funcArr[i]();
    }

    for(let i=0;i<passwordLength-funcArr.length; i++)
    {
        let randomindex = getRandomInteger(0, funcArr.length);
        password += funcArr[randomindex]();
    }

    

    password = shufflepassword(Array.from(password));

    passwwordDisplay.value = password;

    calStrength();
});
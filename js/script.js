const $ = (id) => {
    return document.getElementById(id);
};
let nameEl = document.querySelector('#username');
const addTypeOrderEl = document.querySelector('#addType');
const emailOrderEl = document.querySelector('#email');
const stAddOrderEl = document.querySelector('#streetAdd');
const aptStOrderEl = document.querySelector('#aptStFloor');
const cityOrderEl = document.querySelector('#city');
const stateOrderEl = document.querySelector('#state');

const zipOrderEl = document.querySelector('#zip');
const phoneOrderEl = document.querySelector('#phone');




const form = document.querySelector('#orderForm');

let rdPchecked = false;

let pizzaType = {
    "handTossed" : [
            ["small" , 9.99],
            ["medium" , 12.99],
            ["large" , 14.99]
    ],
    "thinCrust" : [
        ["medium" , 11.99],
        ["large" , 13.99]
    ],
    "NY" : [
        ["large" , 16.99],
        ["Extra Large" , 19.99]
    ],
    "GF" : [
        ["small" , 10.99]
    ],

    returnPizzaObject : function() {        
        return this.handTossed;
    }
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isValidUserName = (name) => {
    const re = /^[A-Za-z\s]+$/;
    return re.test(name);
};
const isValidState = (name) => {
    const re = /^[A-Za-z]{2}$/;
    return re.test(name);
};
const isValidZip = (zip) => {
    const re = /^[0-9]{5}$/;
    return re.test(zip);
}
const isValidPhoneNum = (phone) => {
    const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return re.test(phone);
}


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
   

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement; // parent of input
   // console.log(formField); 

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

const checkEmail = (emailEl) => {
    let valid = false;
    const email =  emailEl.value.trim();

    if(!isRequired(email)){
        showError(emailEl, '* Email cannot be blank');
        $('emailHelp').style.display = "none";
    } else if (!isEmailValid(email)) {
        showError(emailEl, '* Not a valid email id'); 
        $('emailHelp').style.display = "none";
    } else {
        showSuccess(emailEl);
        
        valid = true;
    }
    return valid;

};
const checkUsername = (usernameEl)  => {
    let valid = false;
    const min = 3, max = 50;
    const username = usernameEl.value.trim();    
 
    console.log('username' + username);
    if (!isRequired(username)) {
        showError(usernameEl, '* Full name cannot be blank');
    } else if (!isValidUserName(username)) {
        showError(usernameEl, '* Only letters are allowed in name');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `* Full name must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

const checkAddType = (addTypeEl,otherText,otherInputID) => {
    
    const addType = addTypeEl.value;
    let foo = document.getElementById(otherText);
    if (addType === 'other'){     
        let alreadyExistId = document.getElementById(otherInputID);
        if(!alreadyExistId) {
            let element = document.createElement("input");
            element.setAttribute("type", "text");
            element.setAttribute("value", "");
            element.setAttribute("id", otherInputID);
            element.setAttribute("class","form-control");
            //Append the element in page (in span).
            foo.appendChild(element);
        }
    } else {
        if(foo.hasChildNodes) {
            let element = document.getElementById(otherInputID);
            if(element) {
                foo.removeChild(element);
            }
            
        }
    }

    return true;
    
};

const checkState = (stateEl) => {
    let valid = false;
    const state = stateEl.value.trim();

    if(!isRequired(state)){
        showError(stateEl, '* State cannot be left blank ');
    } else if(!isValidState(state)){
        showError(stateEl, '* Use only 2 letters for state');
    } else {
        showSuccess(stateEl);
        valid = true;
    }
    return valid;
};
const checkZip = (zipEl) => {
    let valid = false;
    let zip = zipEl.value.trim();

    if(!isRequired(zip)){
        showError(zipEl,'* Please enter zip code');
    } else if(!(isValidZip(zip))) {
        showError(zipEl, '* Only 5 digits for zip code');
    } else {
        showSuccess(zipEl);
        valid = true;
    }
    return valid;
} ;

const checkPhone = (phoneEl) => {
    let valid = false;
    const phone = phoneEl.value.trim();
    if(!(isRequired(phone))) {
        showError(phoneEl,'* Please enter phone number');
    } else if (!(isValidPhoneNum(phone))){
        showError(phoneEl,'* Not a valid phone number');
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
};

const checkCity = (cityEl) => {
    let valid = false;
    const city = cityEl.value.trim();
    if(!(isRequired(city))){
        showError(cityEl, '* Please enter the city');
    }else {
        showSuccess(cityEl);
        valid = true;
    }

    return valid;
}

const checkStAdd = (stAddEl) => {
    let valid = false;
    const add = stAddEl.value.trim();
    if(!(isRequired(add))){
        showError(stAddEl, '* Please enter the Street Address');
    }else {
        showSuccess(stAddEl);
        valid = true;
    }
    return valid;
}

const chkAptStFl = (aptStEl) => {
    let valid = false;
    const aptSt = aptStEl.value.trim();
    if(!(isRequired(aptSt))){
        showError(aptStEl, '* Please enter the Apartment/ Suite / Room');
    }else {
        showSuccess(aptStEl);
        valid = true;
    }
    return valid;
}




const debounce = (fn, delay = 700) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername(nameEl);
            break;
        case 'addType':
            checkAddType(addTypeOrderEl,"otherText","otherInput");
            break;
        case 'email':
            checkEmail(emailOrderEl);
            break;
        case 'state':
            checkState(stateOrderEl);
            break;
        case 'zip':
            checkZip(zipOrderEl);
            break;
        case 'phone':            
            checkPhone(phoneOrderEl);
            break;
        case 'city':
            checkCity(cityOrderEl);
            break;
        case 'streetAdd':
            checkStAdd(stAddOrderEl);
            break;
        case 'aptStFloor':
            chkAptStFl(aptStOrderEl);
            break;
        case 'selSize':
            checkPizzaSize();
            break;
    }
}));

//PIZZA ORDER

const checkRdPizza = () => {
    let valid = false;
   if(rdPchecked) {
        valid = true;
        showSuccess(rdo);
    }else {
        valid = false;
        showError(rdo, '* Select the Dough Type.');
    }
    
    return valid;
};

const checkPizzaSize = () => {
    let valid = false;
    
    if(selSize.value != 0) {
        valid = true;
        showSuccess(selSize);
    }else {
        showError(selSize, '* Please select dough type first and then the size');
    }
        
    return valid;
}
let rdo = document.getElementById('rdWrapper');
let chkbox = document.getElementById('pizzaCheckboxes');
let cheeseHTML= "";
let sauceHTML = "";
let firstHTML = "";
let sizeHTML = "";
let toppingHTML = "";

let toppingPrice = 0.0;
let cheesePrice = 0.0;
let saucePrice = 0.0;
let totalPrice = 0.0;
const selSize = document.querySelector('#selSize');
const selCheese = document.getElementById('selCheese');
const selSauce = document.getElementById('selSauce');
const divPrice = document.getElementById('divPrice');

rdo.addEventListener('change', (e) => {   
    
    rdPchecked = false;
    let tmpArray; //Array to populate size select dropdown   
    //hide the optional div
    document.getElementById('optional').style.display = "none";  
    

    totalPrice = 0.0;
    //Default values to reset selection 
    cheesePrice = 0.0;
    saucePrice = 0.0;
    selCheese.selectedIndex = 0;
    selSauce.selectedIndex = 0;

      //Clearing the select dropdown
    let clearSelect = selSize.options.length;
    for(let i = 0 ; i < clearSelect ; i++) {
        document.getElementById('selSize').options.remove(0);
    }   

    //creating first empty dropdown with text choose size
    let emptySelect = document.createElement('option');
    emptySelect.value = 0;
    emptySelect.text = 'Select the size ';
    selSize.add(emptySelect); 
    selSize.selectedIndex =0;

    document.getElementById('divPrice').innerHTML =  `Price: $0.0`;
    const divOrder = document.getElementById('divOrder');
    divOrder.innerHTML = `Your Order: <br>`;

    if(e.target.value === "Hand Tossed"){
        tmpArray = pizzaType.handTossed;   
    } else if (e.target.value === "Thin Crust") {
         tmpArray = pizzaType.thinCrust;    
    } else if (e.target.value === "New York Style") {
        tmpArray = pizzaType.NY;        
    } else if (e.target.value === "Gluten Free") {
        tmpArray = pizzaType.GF;      
    }

    for(let i=0; i < tmpArray.length; i++)
        {
            rdPchecked = true;
            let newSelect = document.createElement('option');
            newSelect.value = tmpArray[i][1];
            newSelect.text =  tmpArray[i][0] + '( $' + tmpArray[i][1] + ')';
            selSize.add(newSelect);          
        }
    if (rdPchecked) {
      //  alert(selSize.options[selSize.selectedIndex].text);
      //alert(selSize.value);
      firstHTML = `Your order:<br/> 
      Pizza Type - ${e.target.value}<br/> `;   
      divOrder.innerHTML = firstHTML ;
      showSuccess(rdo);

    } else {
        showError(rdo,'* Please select dough type and size');
    }
});

selSize.addEventListener('change', (eve) => {
      
    if(rdPchecked && eve.target.value != 0) {
       
        // selCheese.selectedIndex = 0;
        // selSauce.selectedIndex = 0;
        cheeseHTML =  ` cheese - ${selCheese.options[selCheese.selectedIndex].text}<br />`;
        sauceHTML = ` sauce - ${selSauce.options[selSauce.selectedIndex].text}<br />`;
        sizeHTML = `Pizza Size - ${selSize.options[selSize.selectedIndex].text}<br/>`;  
        divOrder.innerHTML = firstHTML +sizeHTML + cheeseHTML + sauceHTML + toppingHTML;
      
        totalPrice = parseFloat(eve.target.value);
        // document.getElementById('divPrice').innerHTML =  `Price: $${totalPrice}`;
        let price = totalPrice + cheesePrice + saucePrice + toppingPrice;
        document.getElementById('divPrice').innerHTML =  `Price: $${price.toFixed(2)}`;
      
      
      
        //Write the code for selecting sauce cheese and extra toppings
        // display the block
       document.getElementById('optional').style.display = "block";                  
      
    } else {
        document.getElementById('optional').style.display = "none"; 
        divOrder.innerHTML = "Your order:"
    }  
  });

selCheese.addEventListener('change', (ch) => {               
    
    // getting prices from Cheese option

    // alert(ch.target.value);
     //Note: bubbling effect is used.
     //  to capture which event created it we can get from callback function 
     if (ch.target.value === "1" || ch.target.value === "2" ){
         cheesePrice = 0.0;
        
     } else if (ch.target.value === "3" ){
         cheesePrice = 2.99;
       
     } else if (ch.target.value === "4" ){
         cheesePrice = 3.99;
        
     } else {
        cheesePrice = 0.0;
     }
     cheeseHTML = `cheese - ${selCheese.options[ch.target.selectedIndex].text}<br/>`;
     divOrder.innerHTML = firstHTML + sizeHTML + cheeseHTML + sauceHTML + toppingHTML;
     let price = totalPrice + cheesePrice + saucePrice + toppingPrice;
     document.getElementById('divPrice').innerHTML =  `Price: $${price.toFixed(2)}`;
});

selSauce.addEventListener('change', (sc) => {
    if(sc.target.value === "1"){
        saucePrice = 0.0;
    } else if(sc.target.value === "2"){
        saucePrice = 0.99;
    } else if(sc.target.value === "3"){
        saucePrice = 1.99;
    } else {
        saucePrice = 0.0;
    }
    sauceHTML = `sauce -${selSauce.options[sc.target.selectedIndex].text}<br />`;
    divOrder.innerHTML = firstHTML +sizeHTML + cheeseHTML + sauceHTML + toppingHTML;
    let price = totalPrice + cheesePrice + saucePrice + toppingPrice;
    document.getElementById('divPrice').innerHTML =  `Price: $${price.toFixed(2)}`;
});

chkbox.addEventListener('click', () => {

    let chkPepper = false;
    let chkOlives = false;
    let chkJalapenos = false;
    let chkMushrooms = false;
    let chkPine = false;
    
    let chkOnion = false;
    let chkPepperoni = false;
    let chkSausage = false;
    let chkHam = false;
    let chkBacon = false;

    let toppingNewHTML = ""

    chkPepper = document.getElementById('flexChkPeppers').checked;
    chkOlives = document.getElementById('flexChkOlives').checked;
    chkJalapenos = document.getElementById('flexChkJalapenos').checked;
    chkMushrooms = document.getElementById('flexChkMushroom').checked;
    chkPine = document.getElementById('flexChkPine').checked;

    chkOnion = document.getElementById('flexChkOnion').checked;
    chkPepperoni = document.getElementById('flexChkPepperoni').checked;
    chkSausage = document.getElementById('flexChkSausage').checked;
    chkHam = document.getElementById('flexChkHam').checked;
    chkBacon = document.getElementById('flexChkBacon').checked;

    if(chkPepper) {
        toppingNewHTML += 'pepper ';
    }
     if(chkOlives){
        toppingNewHTML += 'olives ';
    }
     if(chkJalapenos){
        toppingNewHTML += 'jalapenos ';
    }
    if(chkMushrooms){
        toppingNewHTML += 'mushrooms ';
    }
    if(chkPine){
        toppingNewHTML += 'pineapple ';
    }
    if(chkOnion){
        toppingNewHTML += 'onion ';
    }
    if(chkPepperoni){
        toppingNewHTML += 'pepperoni ';
    }
    if(chkSausage){
        toppingNewHTML += 'sausage ';
    }
    if(chkHam){
        toppingNewHTML += 'ham ';
    }
    if(chkBacon){
        toppingNewHTML += 'bacon ';
    }

    let res = toppingNewHTML.trim().split(" ");
    let tmp = [];
    for (let i = 0; i < res.length ; i++){
        tmp[i] = res[i];
    }

    let resHTML = "Each extra topping for $0.99<br/> " + tmp.join(", ");
   
    //alert( document.querySelectorAll('input[name="toppings"]:checked').length);
   //total number of checkboxes checked  
   let  totalToppingsChk = document.querySelectorAll('input[name="toppings"]:checked').length;
   let solveFloat = totalToppingsChk * 0.99;
   toppingPrice = solveFloat;
//    toppingPrice =  totalToppingsChk * 0.99;
   let price = totalPrice + cheesePrice + saucePrice + toppingPrice;
   document.getElementById('divPrice').innerHTML =  `Price: $${price.toFixed(2)}`;
    
  
  
    // document.getElementById('chkboxes').innerHTML = resHTML;
    toppingHTML = resHTML;
    divOrder.innerHTML = firstHTML +sizeHTML + cheeseHTML + sauceHTML + toppingHTML;
   
});


$('orderForm').addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate fields
    let isUsernameValid = checkUsername(nameEl),
        isEmailValid = checkEmail(emailOrderEl),
        isStAddValid = checkStAdd(stAddOrderEl),
        isStateValid = checkState(stateOrderEl),
        isCityValid = checkCity(cityOrderEl),
        isZipValid = checkZip(zipOrderEl),
        isPhoneValid = checkPhone(phoneOrderEl),

        isAptStFlValid = chkAptStFl(aptStOrderEl),
        isPizzaTypeValid = checkRdPizza(),
        isPizzaSizeValid = checkPizzaSize();

        

    let isFormValid = isUsernameValid &&
                        isEmailValid &&
                        isStateValid &&
                        isZipValid &&
                        isPhoneValid &&
                        isCityValid && 
                        isStAddValid &&
                        isAptStFlValid &&
                        isPizzaTypeValid &&
                        isPizzaSizeValid;
    

    if(isFormValid) {
        let result = confirm("Are you sure you're done with pizza?");
        if(result){
            $('orderForm').style.display = "none";
            $('creditForm').style.display = "block"; 
            $('btnOrder').style.display = "none";
            $('sameAdd').focus();
        }
        
    }else {
        alert('Some fields have missing or incorrect values');
    }

});

// declaring all input form fields
let usernameBillEl = document.querySelector('#usernameBill');
let emailBill = document.querySelector('#emailBill');
//const isAptTypeValid = document.querySelector('#addTypeBill');
const addTypeBillEl = document.querySelector('#addTypeBill');
const stAddBillEl = document.querySelector('#streetAddBill');
const aptStFloorInputBillEl = document.querySelector('#aptStFloorInputBill');

const cityBillEl = document.querySelector('#cityBill');
const stateBillEl = document.querySelector('#stateBill');
const zipBillEl = document.querySelector('#zipBill');
const phoneBillEl = document.querySelector('#phoneBill');

//credit card

const expiryMonthEl = document.querySelector('#expiryMonth');
const expiryYearEl = document.querySelector('#expiryYear');
const cvcEl = document.querySelector('#cvc');
const isRegValidCVC = (cvc) => {
    const re = /^[0-9]{3,4}$/;
    return re.test(cvc);
};

const checkCVC = () => {
    let valid = false;
    const cvc = cvcEl.value;
    if(!(isRequired(cvc))){
        showError(cvcEl, '* Please enter a CVC number');
    } else if (!isRegValidCVC(cvc)){
        showError(cvcEl, '* CVC number is invalid');
    }else{
        showSuccess(cvcEl);
        valid = true;
    }

    return valid;
}
/////
//validate cardno

const cardNumberEl = document.querySelector('#cardNo');


const cardType = (cardNumber) => { // returns card type; should not rely on this for checking if a card is valid
	cardNumber = cardNumber.split(' ').join("");
    var o = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
    }
    for(var k in o) {
        if(o[k].test(cardNumber)) {
            return k;
           //return true;
        }
    }
	return null;
    //return false;
}

// returns true or false
const validateCreditCardNumber = (cardNumber) => {
	cardNumber = cardNumber.split(' ').join("");
	if (parseInt(cardNumber) <= 0 || (!/\d{13}(~\W[a-zA-Z])*$/.test(cardNumber)) || (!/\d{15,16}(~\W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
		return false;
	}
	var carray = new Array();
	for (var i = 0; i < cardNumber.length; i++) {
		carray[carray.length] = cardNumber.charCodeAt(i) - 48;
	}
	carray.reverse();
	var sum = 0;
	for (var i = 0; i < carray.length; i++) {
		var tmp = carray[i];
		if ((i % 2) != 0) {
			tmp *= 2;
			if (tmp > 9) {
				tmp -= 9;
			}
		}
		sum += tmp;
	}
	return ((sum % 10) == 0);
}

const checkCard = () => {
    let valid = false;
    let cardNumber = cardNumberEl.value;
    let msg = document.querySelector('#cardType');
    msg.textContent = "";

    
    if(!isRequired(cardNumber)){
        showError(cardNumberEl, '*Card Number is required');
    }else if(cardType(cardNumber) === null) { 
        showError(cardNumberEl, 'Not a valid card Type');
    } else if(!validateCreditCardNumber(cardNumber)) { 
        showError(cardNumberEl, 'Not a valid card number');
    }else{
        valid = true;

        showSuccess(cardNumberEl);
        let typeCard = cardType(cardNumber);
       
        msg.style.color = 'green';
        msg.textContent = typeCard;
    }

    return valid;

}

///

const checkExpiry = () =>{
    const month = expiryMonthEl.value;
    const year = expiryYearEl.value;
    let validMonth = false;
    let validYear = false;
    let valid = false;
  
 
  const expiryDate = new Date(year + '-' + month + '-01');
 
  console.log('month:' + month + ' year: ' + year + ' expiry date: ' + expiryDate);
  if(month === "Month"){
      
      showError(expiryMonthEl,'select the month');
    } else {
        showSuccess(expiryMonthEl);
        validMonth = true;
    }
  
   if (year === "Year") {
       
      showError(expiryYearEl,'Select the year');
    } else {
        validYear = true;
        showSuccess(expiryYearEl);
    }
  
    if(validMonth && validYear){
        if (expiryDate < new Date()) {
            showError(expiryMonthEl,'Card is expired');
          } else {
            // Valid expiry
            showSuccess(expiryMonthEl);
            valid = true;
          }
    }

    return valid;
    
}

$('creditForm').addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'usernameBill':
                checkUsername(usernameBillEl);
                break;
        case 'emailBill':
                checkEmail(emailBill);
                break;
        case 'addTypeBill':
                checkAddType(addTypeBillEl,"otherTextBill","otherInputBill");
                break;
        case 'streetAddBill':
                checkStAdd(stAddBillEl);
                break;
        case 'aptStFloorInputBill':
                chkAptStFl(aptStFloorInputBillEl);
                break;
        case 'cityBill':
                checkCity(cityBillEl);
                break;        
        case 'stateBill':
                checkState(stateBillEl);
                break;
        case 'zipBill':
                checkZip(zipBillEl);
                break;
        case 'phoneBill':            
                checkPhone(phoneBillEl);
                break;
        case 'cvc':            
                checkCVC();
                break;
        case 'cardNo':
            checkCard();
            break;

    }
}));

/////////////

//1. checkbox for Same as Dellivery
$('sameAdd').addEventListener('click',()=>{
        
    if($('sameAdd').checked){
        //alert($('username').value);
        $('usernameBill').value = $('username').value;
        $('emailBill').value = $('email').value;
        $('addTypeBill').value = $('addType').value;
        if (addTypeOrderEl.value === 'other') {
            checkAddType(addTypeBillEl,"otherTextBill","otherInputBill");
            $('otherInputBill').value = $('otherInput').value;
        }

        $('streetAddBill').value = $('streetAdd').value;
        $('aptStRoomBill').value = $('aptStRoom').value;
        $('aptStFloorInputBill').value = $('aptStFloor').value;
        $('cityBill').value = $('city').value;
        $('stateBill').value = $('state').value;
        $('zipBill').value = $('zip').value;
        $('phoneBill').value = $('phone').value;

    }else {
        $('usernameBill').value = "";
        $('emailBill').value = "";
        $('addTypeBill').selectedIndex = 0;        
        let foo = document.getElementById('otherTextBill');
        if(foo.hasChildNodes) {
            let element = document.getElementById('otherInputBill');
            if(element) {
                foo.removeChild(element);
            }
        }
        
        $('streetAddBill').value = "";
        $('aptStRoomBill').selectedIndex = 0;
        $('aptStFloorInputBill').value = "";

        $('cityBill').value = "";
        $('stateBill').value = "";
        $('zipBill').value = "";
        $('phoneBill').value = "";
       

    }

});
// 2. Evaluate all fields on submit
$('creditForm').addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    // validate fields

    let isUsernameValid = checkUsername(usernameBillEl);
    let isEmailValid = checkEmail(emailBill);
    let isAptTypeValid = checkAddType(addTypeBillEl,"otherTextBill","otherInputBill");
    let isStAddValid = checkStAdd(stAddBillEl);
    let isAptStFlValid = chkAptStFl(aptStFloorInputBillEl);
    let isCityValid = checkCity(cityBillEl);
    let isStateValid = checkState(stateBillEl);
    let isZipValid = checkZip(zipBillEl);
    let isPhoneValid = checkPhone(phoneBillEl);
    let isExpiryValid =  checkExpiry ();
    let isCvcValid = checkCVC();
    let isCardNumValid = checkCard();

    // 
    let isCreditFormValid = isUsernameValid &&
                            isEmailValid &&
                            isAptTypeValid &&
                            isStAddValid &&
                            isAptStFlValid &&
                            isCityValid &&
                            isStateValid &&
                            isZipValid &&
                            isPhoneValid &&
                            isExpiryValid && 
                            isCvcValid &&
                            isCardNumValid;



    if(isCreditFormValid) {
        let result = confirm("Do you want to proceed and order");
        if(result) {
            $('creditForm').style.display = "none"; 
            $('confirmedForm').style.display = "block";
        }

    }
});


$('btnOrder').addEventListener('click', ()=> {
    $('username').focus();
});

window.addEventListener('load', () => {
    document.getElementById('optional').style.display = "none";   
     $('creditForm').style.display = "none"; 
     $('confirmedForm').style.display = "none";
});


const BASE_URL =
  "https://open.er-api.com/v6/latest/USD";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg= document.querySelector(".msg");

document.addEventListener("click",async(evt) => {
    updateExchangeRate();
})

  for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode == "USD"){
            newOption.selected = "Selected";}
            else if(select.name == "to" && currCode == "INR"){
                newOption.selected= "Selected";
            }
            select.appendChild(newOption);
        }
        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
        });    
  }

  const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagcdn.com/64x48/${countryCode.toLowerCase()}.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };


const updateExchangeRate = async() => {
    
    let amountInput = document.querySelector(".amount input");
    let amtVal = amountInput.value;

    // Validate the amount before using it
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    let fromCurrency = fromCurr.value.toUpperCase();
    let toCurrency = toCurr.value.toUpperCase();

    let url = `https://open.er-api.com/v6/latest/${fromCurrency}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let rate = data.rates[toCurrency];
        let finalAmount = amtVal * rate;

        msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        msg.innerText = "Something went wrong. Please try again.";
        console.error(error);
    }

}
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

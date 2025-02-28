const countryList = {
    AUD: "AU",
    BGN: "BG",
    BRL: "BR",
    NOK: "BV",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    CZK: "CZ",
    DKK: "DK",
    EUR: "FR",
    GBP: "GB",
    HKD: "HK",
    HRK: "HR",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    ISK: "IS",
    JPY: "JP",
    KRW: "KR",
    MXN: "MX",
    MYR: "MY",
    NZD: "NZ",
    PHP: "PH",
    PLN: "PL",
    RON: "RO",
    RUB: "RU",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    USD: "US",
    ZAR: "ZA",
  };
let api="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NCqhmR5nBh0jQmQcya8cx681pvUuBytszlVSlt8f&currencies=INR&base_currency=USD";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
let text=document.querySelector(".text");
for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText =currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD")
            newOption.selected= "selected";
        else  if(select.name==="to" && currCode==="INR")
            newOption.selected= "selected";
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
        
        uf(evt.target);
    });
}
const uf=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    
    img.src = newSrc;
    
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    text.innerText="Getting...";
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value=1;
    }
   
    const URL=`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_NCqhmR5nBh0jQmQcya8cx681pvUuBytszlVSlt8f&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response= await fetch(URL);
    let data = await response.json();
    let rate=data.data[toCurr.value];
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    text.innerText="Get Exchange Rate";
})






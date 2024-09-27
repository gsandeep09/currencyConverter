

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector(".btn");
const fromCode=document.querySelector(".from select");
const toCode=document.querySelector(".to select");
const msg=document.querySelector(".msg");
// console.log(fromCode.value,toCode.value);
const baseUrl= "https://api.currencyapi.com/v3/latest?apikey=cur_live_rDg8HajYozQ0MXXmRvmRvSlkNy2XfZwZlzRbyHEr&base_currency=";

for(select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=currCode;
        
        newOption.value=currCode;
        if(select.name==="from"&&currCode==="USD"){
            newOption.selected="selected";
        
        }
         if(select.name==="to"&&currCode==="INR"){
            newOption.selected="selected";
        
        }
       
      select.append(newOption);
    }
    select.addEventListener("change",(e)=>{//e is like object
        updateFlag(e.target);
    })
}
const updateFlag=(element)=>{
    // console.log(element);
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
   
}
const update_msg=(amtVal,f,t,final_Amount)=>{
    msg.innerHTML=`${amtVal} ${f} =${final_Amount} ${t}`;

}


btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" ||amtVal<1){
       amtVal="1";
       amount.value="1";
        
    }
    // console.log(amtVal);


    let f=fromCode.value;
    let t=toCode.value;
    // console.log(t);
    const url=`${baseUrl}${f}`;
    let response=await fetch(url);
    let data=await response.json();
    console.log(data);
    let final_Amount=(data.data[t].value*amtVal);
    // console.log(final_Amount);
    update_msg(amtVal,f,t,final_Amount);
    
    
    
   
    

})

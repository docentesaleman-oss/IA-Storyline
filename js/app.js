const prompt=document.getElementById("prompt");

const send=document.getElementById("send");

send.onclick=sendMessage;

prompt.addEventListener("keydown",e=>{

if(e.key==="Enter"&&!e.shiftKey){

e.preventDefault();

sendMessage();

}

});

async function sendMessage(){

const text=prompt.value.trim();

if(text==="")return;

addMessage(text,"user");

prompt.value="";

const response=await askGPT(text);

addMessage(response,"bot");

}
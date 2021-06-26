const socket=io()

let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
do{

    name=prompt("Enter your name:") 
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMsg(e.target.value)
    }
})

function sendMsg(message){
   let msg={
    user:name,
    message:message.trim()
   }

//Appned

appendMessage(msg,'outgoing')
textarea.value=''
scrollToBottom()

socket.emit('message',msg)

}

// send to server




function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type;
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>


    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
    scrollToBottom()
    
}


//recieve msgs

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}
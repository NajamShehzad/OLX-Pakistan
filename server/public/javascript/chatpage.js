var database = firebase.database();
let friendkey;
let friendName;
var myId;
var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});




var sellerList;
var buyerList;
function getList() {
    fetch(`${url}/chat`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
        },
        method: 'POST'
    }).then(x => x.json()).then(x => {
        console.log(x);
        buyerList = x.buyer;
        sellerList = x.seller;
        sellerList.map(user => {
            var row = `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showChat('${user._id}','${user.buyerID}','${user.buyerName}',this)">${user.buyerName}(${user.productName})<a/>`
            document.getElementById("userlist1").innerHTML += row;
        });
        buyerList.map(user => {
            var row = `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showChat('${user._id}','${user.sellerID}','${user.sellerName}',this)">${user.sellerName}(${user.productName})<a/>`
            document.getElementById("userlist").innerHTML += row;
        });

    });
}









function sentmsg() {
    if (document.getElementById("message").value == "") {
        alert("Write Some Thing");
        return false;
    }
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
    var text = { msg, _id: currentChat, from: userData._id };
    fetch(`${url}/chatMsg`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
        },
        method: "POST",
        body: JSON.stringify(text)
    }).then(x => x.json()).then(x => {
        console.log(x.code)
        let notifcation = database.ref(`chat/notification/`).push();
        notifcation.set({
            userName: userData.name,
            message: msg,
            from: userData._id,
            to:friendkey,
            time: (new Date()).toLocaleTimeString()
    
        });
    });

}





var addId;
var addId1;


function closeAddChat() {

    var chatmsg = database.ref(`chat/seller/${userID}/${addId}/${friendkey}`);
    chatmsg.off('child_added');

    // chatmsg.on('child_added', function (data) {});
    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    document.getElementById("maindiv").style.opacity = "1"


}



var currentChat;
function showChat(chatID, friendId, friendInfo) {
    console.log(friendId,friendInfo);
    
    console.log(chatID);
    myId = userData._id;

    document.getElementById("sentbtn").setAttribute("onclick", "sentmsg()");
    document.getElementById("form1").setAttribute("onsubmit", "sentmsg()");
    document.getElementById("closeButton").setAttribute("onclick", "off()");
    document.getElementById("conversationArea").innerHTML = "";
    friendName = friendInfo.innerHTML;
    console.log(friendName);
    friendkey = friendId;
    //console.log(friendkey);
    document.getElementById("chatdiv").style.display = "block"
    document.getElementById("maindiv").style.opacity = ".3"
    document.getElementById("friendName").innerHTML = friendInfo;

    fetch(`${url}/getChat`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
        },
        method: "POST",
        body: JSON.stringify({ chatID })
    }).then(x => x.json()).then(x => {
        console.log(x.chat);
        x.chat.map(msg => {
            if (msg.from == userData._id) {
                document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
                        <div class="text_wrapper">
                        <div class="text">${msg.msg}</div>
                        </div>
                        </li>`
            }
            else {
                document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
                        <div class="text_wrapper">
                        <div class="text">${msg.msg}</div>
                        </div>
                        </li>`

            }

        });
        currentChat = x._id;
        socket.on(currentChat, (text) => {
            console.log('Connected Chat Live', text);
            if (text.from == myId) {
                document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
                        <div class="text_wrapper">
                        <div class="text">${text.msg}</div>
                        </div>
                        </li>`
            }
            else {
                document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
                        <div class="text_wrapper">
                        <div class="text">${text.msg}</div>
                        </div>
                        </li>`

            }
        });


    });




}

function off() {

    socket.off(currentChat);


    // chatmsg.on('child_added', function (data) {});
    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    document.getElementById("maindiv").style.opacity = "1"

}
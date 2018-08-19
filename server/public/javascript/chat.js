var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});

var chatID;
var from;
var myId;


function scrollToBottom() {
    // Selectors
    var messages = jQuery('#conversationArea');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}



function sentmsg() {
    if (document.getElementById("message").value == "") {
        alert("Write Some Thing");
        return false;
    }
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
    var text = { msg, _id: chatID, from };
    fetch(`${url}/chatMsg`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
        },
        method: "POST",
        body: JSON.stringify(text)
    }).then(x => x.json()).then(x => {
        console.log(x.code);
        let notifcation = database.ref(`chat/notification/`).push();
        notifcation.set({
            userName: userData.name,
            message: msg,
            from: userData._id,
            to:addUserID,
            time: (new Date()).toLocaleTimeString()
    
        });
    });
}

var chatclose;
function showChat() {
    var addName = addUserName;
    myId = userData._id
    //   alert(addName);
    var id = addUserID;
    if (userData._id == null) {
        alert("Please Login To Continue");
        return false;
    }
    if (myId == addUserID) {
        alert("We Dont Provide Self Chating");
        return false;
    }
    console.log(addUserID, userData._id);

    // alert(id);
    //alert(myId);
    document.getElementById("conversationArea").innerHTML = "";
    console.log(friendName);
    document.getElementById("chatdiv").style.display = "block"

    document.getElementById("friendName").innerHTML = addUserName;

    console.log(url);
    var item = {
        productID: productID,
        sellerID: addUserID,
        buyerID: userData._id
    }
    fetch(`${url}/checkChat`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-auth': token
        },
        method: "POST",
        body: JSON.stringify(item)
    }).then(x => x.json()).then(x => {
        console.log(x);
        if (!x.exist) {
            console.log('Do Something');
            var ChatItem = {
                productID: productID,
                productName: localData.title,
                sellerID: addUserID,
                sellerName: localData.userName,
                buyerID: userData._id,
                buyerName: userData.name,
            }
            console.log(ChatItem);

            fetch(`${url}/createChat`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-auth': token
                },
                method: "POST",
                body: JSON.stringify(ChatItem)
            }).then(x => x.json()).then(x => {
                console.log(x)
                chatID = x._id;
                from = userData._id;
                socket.on(chatID, (text) => {
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
                    scrollToBottom();
                });

            });
            return true;
        }

        console.log(x.chat[0].chat);
        chatID = x.chat[0]._id;
        from = userData._id;
        x.chat[0].chat.map(text => {
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
            scrollToBottom();

        });
        socket.on(chatID, (text) => {
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
            scrollToBottom();
        });

    });

}

function off() {
    console.log(addUserID)
    socket.off(chatID);

    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    // document.getElementById("maindiv").style.opacity = "1"

}

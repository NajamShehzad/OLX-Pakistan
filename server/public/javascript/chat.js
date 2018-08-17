var socket = io();
socket.on('connect', () => {
    console.log('Connected to server');
});

var chatID;
var from;
var myId;

// var database = firebase.database();
// let friendkey;
// let friendName;
// let userName;



// let userlist = database.ref("users");

// userlist.on('child_added', function (data) {
//     var datalist = data.val();
//     if (userID == datalist.userID) {
//         document.getElementById('name').innerHTML = datalist.fullname;
//         userName = datalist.fullname
//     }
//     if (datalist.userID !== userID) {
//         console.log(datalist.fullname, data.key);
//         let row = generateRow(datalist.fullname, data.key);
//         document.getElementById("userlist").innerHTML += row;

//     }

// });



// function generateRow(fullname, key) {
//     return `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showChat('${key}',this)">${fullname}<a/>`
// }


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
    })
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
                console.log(x.chat)
                chatID = x.chat[0]._id;
                from = userData._id;
            });
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

        });
        socket.on(chatID, (text) => {
            console.log('Connected Chat Live',text);
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
    console.log(addUserID)
    socket.off(chatID);

    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    // document.getElementById("maindiv").style.opacity = "1"

}

var database = firebase.database();
// let userID = JSON.parse(localStorage.getItem("userID"));
let friendkey;
let friendName;
let userName = JSON.parse(localStorage.getItem("userName"));
// document.getElementById("name").innerHTML = userName;
// document.getElementById("name1").innerHTML = userName;



let userlist = database.ref(`chat/buyer/${userID}`);

userlist.on('child_added', function (data) {

    // database.ref(`users/${data.key}`).on("value", function (x) {
        var data_user = data.val();
        console.log(data_user);
        let row = generateRow(data_user.userName, data_user.addID,data_user.userID,data_user.addName);
        document.getElementById("userlist").innerHTML += row;
        //document.getElementById("userlist1").innerHTML += row;

    // })


});
let addlist = database.ref(`chat/seller/${userID}`);

addlist.on('child_added', function (data) {

    database.ref(`adds/${data.key}`).on("value", function (x) {
        var data_user = x.val();
        console.log(data_user);
        let row = generateAddRow(data_user.title, data_user.addID);
        //document.getElementById("userlist").innerHTML += row;
        document.getElementById("userlist1").innerHTML += row;

    })


});

function generateAddUserRow(fullname, key) {
    return `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showUserAddChat('${key}',this)">${fullname}<a/>`

}

function generateAddRow(fullname, key) {
    console.log(key)
    return `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showAddChat('${key}',this)">${fullname}<a/>`
}


function generateRow(fullname, addID,userID,addName) {
    return `<a href="JavaScript:void(0)"  class="list-group-item list-group-item-action" onclick="showChat('${addID}','${userID}',this)">${fullname}-(${addName})<a/>`
}


function sentmsg() {
    if (document.getElementById("message").value == "") {
        alert("Write Some Thing");
        return false;
    }
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
    console.log(friendkey);
    let notifcation = database.ref(`chat/notification/`).push();
    notifcation.set({
        userName: userName,
        message: msg,
        from: userID,
        to: friendkey,
        time: (new Date()).toLocaleTimeString()

    });
    
    let chat = database.ref(`chat/seller/${friendkey}/${addId1}/${userID}`).push();
    chat.set({
        userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });

}


function showUserAddChat(friendId, friendInfo) {
    document.getElementById("closeButton").setAttribute("onclick", "closeAddChat()");
    document.getElementById("sentbtn").setAttribute("onclick", "sentAddMsg()");
    document.getElementById("form1").setAttribute("onsubmit", "sentAddMsg()");
    document.getElementById("conversationArea").innerHTML = "";
    friendName = friendInfo.innerHTML;
    console.log(friendName);
    friendkey = friendId;
    //console.log(friendkey);
    document.getElementById("chatdiv").style.display = "block"
    document.getElementById("maindiv").style.opacity = ".3"
    document.getElementById("friendName").innerHTML = friendName;

    var chatmsg = database.ref(`chat/seller/${userID}/${addId}/${friendkey}`);
    chatmsg.on('child_added', function (data) {
        var userinfo = data.val();
        // console.log(data.val());
        if (userinfo.from == userID) {
            document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`
        }
        else {
            document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`

        }
    });




}

function sentAddMsg() {
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";


    let notifcation = database.ref(`chat/notification/`).push();
    notifcation.set({
        userName: userName,
        message: msg,
        from: userID,
        to: friendkey,
        time: (new Date()).toLocaleTimeString()

    });

    let chatFriend = database.ref(`chat/seller/${userID}/${addId}/${friendkey}`).push();
    chatFriend.set({
        userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

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

function showAddChat(addID, addName) {
    // alert(addName.innerHTML);
   // console.log("addchat")
    addId = addID;
    console.log(addId);
    document.getElementById("addChat").style.display = "block"
    document.getElementById("addName").innerHTML = addName.innerHTML;
    document.getElementById("name1").innerHTML = userName;
    let addUserlist = database.ref(`chat/seller/${userID}/${addID}`);

    addUserlist.on('child_added', function (data) {

        database.ref(`users/${data.key}`).on("value", function (x) {
            var data_user = x.val();
            console.log(data_user);
            let row = generateAddUserRow(data_user.fullname, x.key);
            document.getElementById("addUserList").innerHTML += row;
            //document.getElementById("userlist1").innerHTML += row;

        })


    });



}

function offshow() {
    console.log("hi");
    document.getElementById("addUserList").innerHTML = "";
    document.getElementById("addChat").style.display = "none";


}


function showChat( sellerID,friendId,friendInfo) {
    console.log(sellerID);
    addId1 = sellerID;
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
    document.getElementById("friendName").innerHTML = friendName;

    var chatmsg = database.ref(`chat/seller/${friendId}/${sellerID}/${userID}`);
    chatmsg.on('child_added', function (data) {
        var userinfo = data.val();
        // console.log(data.val());
        if (userinfo.from == userID) {
            document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`
        }
        else {
            document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`

        }
    });





}

function off() {
    var chatmsg = database.ref(`chat/seller/${friendkey}/${addId1}/${userID}`);
    chatmsg.off('child_added');


    // chatmsg.on('child_added', function (data) {});
    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    document.getElementById("maindiv").style.opacity = "1"

}
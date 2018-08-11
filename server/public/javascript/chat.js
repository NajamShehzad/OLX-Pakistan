// var database = firebase.database();
let myId = JSON.parse(localStorage.getItem("userID"));
var userName1 = JSON.parse(localStorage.getItem("userName"));
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
    if(document.getElementById("message").value == ""){
        alert("Write Some Thing");
        return false;
    }
    let msg = document.getElementById("message").value;
    document.getElementById("message").value = "";
   // console.log(friendkey);
   let notifcation = database.ref(`chat/notification/`).push();
    notifcation.set({
        userName: userName1,
        message: msg,
        from: userID,
        to:addUserID,
        time: (new Date()).toLocaleTimeString()

    });
    // let chatSeen = database.ref(`chat/message/${myId}/${addUserID}`);
    // chatSeen.set({
    //     userName: userName,
    //     message: msg,
    //     from: userID,
    //     time: (new Date()).toLocaleTimeString()

    // });
    // let chatFriendSeen = database.ref(`chat/message/${addUserID}/${myId}`);
    // chatFriendSeen.set({
    //     userName: userName,
    //     message: msg,
    //     from: userID,
    //     time: (new Date()).toLocaleTimeString()

    // });
    console.log(addUserID);
    let chat = database.ref(`chat/seller/${addUserID}/${localData.addID}/${myId}`).push();
    chat.set({
        userName: userName,
        message: msg,
        from: userID,
        time: (new Date()).toLocaleTimeString()

    });
    let chatFriend = database.ref(`chat/buyer/${myId}/${localData.addID}`).set({
        addID:localData.addID,
        userID:addUserID,
        userName:addUserName,
        addName:localData.title
    }
    );
    



}

var chatclose ;
function showChat() {
    var addName = addUserName;
 //   alert(addName);
    var id = addUserID;
    if (myId == null) {
        alert("Please Login To Continue");
        return false;
    }
    if(myId == addUserID){
        alert("We Dont Provide Self Chating");
        return false;
    }

   // alert(id);
    //alert(myId);
    document.getElementById("conversationArea").innerHTML = "";
    console.log(friendName);
    document.getElementById("chatdiv").style.display = "block"

    document.getElementById("friendName").innerHTML = addUserName;
    var chatmsg = database.ref(`chat/seller/${addUserID}/${localData.addID}/${myId}`);
    chatclose = chatmsg;
    
    chatmsg.on('child_added', function (data) {
        var userinfo = data.val();
       // console.log(data.val());
        if (userinfo.from == myId) {
            document.getElementById("conversationArea").innerHTML += `<li class="message right appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`
        }
        else{
            document.getElementById("conversationArea").innerHTML += `<li class="message left appeared">
            <div class="text_wrapper">
            <div class="text">${userinfo.message}</div>
            </div>
            </li>`

        }
    });





}

function off() {
    console.log(addUserID)
    // var chatmsg = database.ref(`chat/conversation/${myId}/${addUserID}`);
    // chatmsg.off('child_added');
    chatclose.off("child_added");


    // chatmsg.on('child_added', function (data) {});
    document.getElementById("conversationArea").innerHTML = "";

    document.getElementById("chatdiv").style.display = "none"
    // document.getElementById("maindiv").style.opacity = "1"

}

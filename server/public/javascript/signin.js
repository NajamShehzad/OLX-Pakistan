var database = firebase.database();
// var email = document.getElementById("email").value;
// var password = document.getElementById("password").value;
// console.log(email, password);

function signUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email, password);
    var form = new FormData(document.querySelector('#form1'));
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(x => {
            console.log(x)
            let userid = x.user.uid;
            let data1 = database.ref(`users/${userid}`);
            data1.on("value", function (x) {
                var mobile = x.val();
                localStorage.setItem("mobile", JSON.stringify(mobile.mobile));
                console.log(mobile);
            });
            localStorage.setItem("userID", JSON.stringify(userid));
            localStorage.setItem("userLogin", JSON.stringify(true));
            setTimeout(function(){
                window.location.href = "index.html"
            },2000)
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            alert(error.message);
            var errorMessage = error.message;
            // ...
        });

}
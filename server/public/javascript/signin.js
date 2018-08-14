// var database = firebase.database();
// var email = document.getElementById("email").value;
// var password = document.getElementById("password").value;
// console.log(email, password);

function signUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email, password);
    // var form = new FormData(document.querySelector('#form1'));
    fetch(`${url}/users/login`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email, password})
        })
        .then(function (res) {
            localStorage.setItem('token', res.headers.get('x-auth'));
            return res.json()
        }).then(user => {
            if(user.code == 11000){
                return    alert('Email Already in Record')
            }else{
                document.getElementById('form1').reset();
                console.log(user);
                localStorage.setItem('userInfo',JSON.stringify(user))
                location.href = '/';
            }
        })
        .catch(function (err) { console.log('err', err) })
    return false;








    // firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then(x => {
    //         console.log(x)
    //         let userid = x.user.uid;
    //         let data1 = database.ref(`users/${userid}`);
    //         data1.on("value", function (x) {
    //             var mobile = x.val();
    //             localStorage.setItem("mobile", JSON.stringify(mobile.mobile));
    //             console.log(mobile);
    //         });
    //         localStorage.setItem("userID", JSON.stringify(userid));
    //         localStorage.setItem("userLogin", JSON.stringify(true));
    //         setTimeout(function(){
    //             window.location.href = "index.html"
    //         },2000)
    //     })
    //     .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         alert(error.message);
    //         var errorMessage = error.message;
    //         // ...
    //     });

}
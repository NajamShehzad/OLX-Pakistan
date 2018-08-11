
function signup() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    // var form = new FormData(document.querySelector('#form1'));
    fetch("http://localhost:8000/users",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email, password, name })
        })
        .then(function (res) {
            localStorage.setItem('token', res.headers.get('x-auth'));
            return res.json()
        }).then(x => {
            if(x.code == 11000){
                    alert('Email Already in Record')
            }
            console.log(x)
        })
        .catch(function (err) { console.log('err', err) })
    return false;
}
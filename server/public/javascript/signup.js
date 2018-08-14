
function signup() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    // var form = new FormData(document.querySelector('#form1'));
    fetch(`${url}/users`,
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
        }).then(user => {
            if(user.code == 11000){
                return    alert('Email Already in Record')
            }else{
                document.getElementById('form1').reset();
                console.log(user);
                localStorage.setItem('userInfo',JSON.stringify(user))
            }
        })
        .catch(function (err) { console.log('err', err) })
    return false;
}
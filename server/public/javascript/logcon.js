var token = localStorage.getItem('token');
console.log(token);
var userData;



if (token) {


    console.log('working');
    fetch(`${url}/users/me`,
        {
            headers: {
                'x-auth': token
            }

        }).then(function (res) {
            // localStorage.setItem('token', res.headers.get('x-auth'));
            return res.json()
        }).then(user => {

            console.log(user);
            icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
        ${user.name}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `;
            var userLog = true;
            userData = user;
            if(window.location.pathname =='/ads'){
            }
            try {
                if (checkFav) {
                    userData = user;
                    checkFav();
                }
            } catch (err) {
            }
            try {
                if (getAll) {
                    userData = user.favorite;
                    getAll();
                }
            } catch (err) {
            }
            try {
                if (getList) {
                    userData = user;
                    getList();
                }
            } catch (err) {
            }
            try {
                if (firebaseMessage) {
                    userData = user;
                    firebaseMessage()
                }
            } catch (err) {
            }
        })

    // icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
    //     ${data.fullname}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `;
    // localStorage.setItem("userName", JSON.stringify(data.fullname));

}
function logout() {
    fetch(`${url}/user/logout`, {
        headers: {
            'x-auth': token
        },
        method: 'DELETE'
    }).then(x => {
        console.log(x); localStorage.removeItem('token');
        firebase.database().ref('tokens').child(userData._id).remove();
        location.href = '/'
    }).catch(err => console.log(err)
    );
}
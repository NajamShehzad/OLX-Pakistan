var token = localStorage.getItem('token');
console.log(token);




if (token) {


    console.log('working');
    fetch("http://localhost:8000/users/me",
        {
            headers: {
                'x-auth':token
            }
            
        }).then(function (res) {
            // localStorage.setItem('token', res.headers.get('x-auth'));
            return res.json()
        }).then(user => {
            console.log(user);
            icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
        ${user.name}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `;
        })

    // icon.innerHTML = `	<a href="JavaScript:void(0)" aria-expanded="false">
    //     ${data.fullname}</a> <input type="submit" onclick="logout()" value="Sign Out" /> `;
    // localStorage.setItem("userName", JSON.stringify(data.fullname));

}
function logout() {
    firebase.auth().signOut().then(function () {
        localStorage.setItem("userID", JSON.stringify(null));
        localStorage.setItem("userLogin", JSON.stringify(null));
        localStorage.setItem("notification", JSON.stringify(null));
        firebase.database().ref('tokens').child(userID).remove();
        location.reload();
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}
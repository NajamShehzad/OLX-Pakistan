var addDiv = document.getElementById('addDiv');
window.addEventListener('load', myAdds);

var data;
// var database = firebase.database


function myAdds() {
    if (token) {
        fetch(`${url}/ads/my`,
            {
                headers: {
                    'x-auth': token
                }

            }).then(function (res) {
                // localStorage.setItem('token', res.headers.get('x-auth'));
                return res.json()
            }).then(data => {
                console.log(data);
                data.map(add => {
                    addDiv.innerHTML += `<a href='JavaScript:void(0)'>
                         <li>
                        <img onclick="addPage('${add._id}')" src=${add.image} title="" alt="" />
                        <section class="list-left">
                            <h5 class="title">${add.title}</h5>
                            <span class="adprice">Rs. ${add.price}</span>
                            <p class="catpath">${add.discription}</p>
                        </section>
                        <section class="list-right">
                            <span class="date">${add.time}</span>
                            <span class="cityname">Model: ${add.model}</span>
                            <button onclick="editAd('${add._id}')" >Edit</button>
                            <button onclick="dltadd('${add._id}',this)">Delete</button>
                        </section>
                        <div class="clearfix"></div>
                      </li>
                     </a>`
                })




            })
    }


}

function addPage(addId) {
    localStorage.setItem('addId', JSON.stringify(addId));
    window.open("/", "_blank");
}

function dltadd(addId, add) {
    console.log(add);
    fetch(`${url}/ads/my/${addId}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth': token
            },
            method: "DELETE"
        }).then(x => x.json()).then(data => { console.log(data); });

    document.querySelector('#addDiv').removeChild(add.parentElement.parentElement.parentElement);
}

function editAd(addId) {
    document.getElementById("addContainer").style.display = "block";
    fetch(`${url}/addPage/${addId}`)
        .then(x => x.json())
        .then(x => {
            data = x;
            console.log(x)
            document.getElementById("title").value = x.title;
            document.getElementById("year").value = x.model;
            document.getElementById("desc").value = x.discription;
            document.getElementById("price").value = x.price;
        });

}

function saveChanges() {
    console.log(data._id);
    var UpdatedData = {
        title: document.getElementById("title").value,
        discription: document.getElementById("desc").value,
        model: document.getElementById("year").value,
        sellerID: data.sellerID,
        _id: data._id,
        image: data.image,
        mobileNum: data.mobile,
        userName: data.userName,
        price: document.getElementById("price").value,
        time: data.time
    }
    fetch(`${url}/ads/my`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-auth': token
            },
            method: "PATCH",
            body: JSON.stringify(UpdatedData)
        }).then(x => x.json()).then(data => { console.log(data); location.reload() });




}


function off() {
    console.log("hi")
    document.getElementById("addContainer").style.display = "none";

}

function searchAdd() {
    var addToSearch = document.getElementById('searchBox').value;
    console.log(addToSearch);
    localStorage.setItem('addToSearch', JSON.stringify(addToSearch));
    var searchType = document.getElementById("selectbox").value;
    localStorage.setItem('searchType', searchType);
    console.log(addToSearch)
    location.href = '/search';
}

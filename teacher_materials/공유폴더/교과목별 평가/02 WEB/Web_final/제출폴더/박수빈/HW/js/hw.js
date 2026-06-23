var now = new Date();
var month = now.getMonth() + 1;

document.getElementById("monthBook").innerHTML =
    month + "월의 YArrBook";

document.getElementById("monthTitle").innerHTML =
    month + "월의 Yarreader";

const userMenu = document.getElementById("userMenu");

const user = sessionStorage.getItem("loginUser");


if(user){

    userMenu.innerHTML = `
        <span>${user}님</span>
        <a href="#" onclick="logout()">로그아웃</a>
    `;

}

function logout(){

    sessionStorage.removeItem("loginUser");

    location.href="hw.html";

}


function loadPage(page){

    fetch(page)
    .then(response => {

        if(!response.ok){
            throw new Error("페이지 로딩 실패");
        }

        return response.text();

    })
    .then(data => {


        document
        .getElementById("content")
        .innerHTML = data;

        if(page === "write.html"){

            const script =
            document.createElement("script");

            script.src="./js/write.js";

            document.body.appendChild(script);

        }

        if(page === "record.html"){

            const script =
            document.createElement("script");

            script.src="./js/record.js";

            document.body.appendChild(script);

        }

        if(page === "popular.html"){

            const script =
            document.createElement("script");

            script.src="./js/popular.js";

            document.body.appendChild(script);

        }

        if(page === "new-books.html"){

            const script =
            document.createElement("script");

            script.src="./js/new-books.js";

            document.body.appendChild(script);

        }


    })
    .catch(error => {

        console.log(error);

        alert("페이지를 불러오지 못했습니다.");

    });

}
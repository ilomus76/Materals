fetch("../../php/review_board/load.php")
.then(response => response.json())
.then(data => {

    console.log(data);

let board_list =
    document.getElementById("board_list");

for(let i=0; i<data.length; i++){

    board_list.innerHTML += `
        <tr>
            <td>${data[i].no}</td>
            <td>${data[i].movie_title}</td>
            <td class="col_title">
                <a href="./review_view.html?no=${data[i].no}">
                    ${data[i].review_title}
                </a>
            </td>
            <td>${data[i].user_id}</td>
            <td>${data[i].review_date.substring(0,10)}</td>
            <td>${data[i].hits}</td>
        </tr>
    `;

}

});


function searchReview(){

    const keyword =
        document.getElementById("keyword").value;

    fetch("../../php/review_board/load.php?keyword="+keyword)
    .then(response => response.json())
    .then(data => {

        let board_list =
            document.getElementById("board_list");

        board_list.innerHTML="";

        for(let i=0;i<data.length;i++){

            board_list.innerHTML += `
            <tr>
                <td>${data[i].no}</td>
                <td>${data[i].movie_title}</td>
                <td class="col_title">
                    <a href="./review_view.html?no=${data[i].no}">
                        ${data[i].review_title}
                    </a>
                </td>
                <td>${data[i].user_id}</td>
                <td>${data[i].review_date.substring(0,10)}</td>
                <td>${data[i].hits}</td>
            </tr>
            `;
        }

    });


}

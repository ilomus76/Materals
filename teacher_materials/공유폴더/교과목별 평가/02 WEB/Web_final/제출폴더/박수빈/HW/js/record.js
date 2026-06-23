function loaded(){

let posts =
JSON.parse(localStorage.getItem("posts")) || [];

let list =
document.getElementById("postList");

posts.forEach(p=>{

list.innerHTML += `

<tr>
<td>${p.no}</td>
<td class="col_title">

<a href="view.html?no=${p.no}">
${p.title}
</a>

</td>

<td>${p.book}</td>

<td>${p.date}</td>

</tr>`;

});

}

loaded();
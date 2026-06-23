const firebaseConfig = {
    apiKey: "AIzaSyCYNOgwOjAfJtLZskV1NoLDAn3xJ0sr87o",
    authDomain: "my-chat-app-24434.firebaseapp.com",
    databaseURL: "https://my-chat-app-24434-default-rtdb.asia-southeast1.firebasedatabase.app", 
    projectId: "my-chat-app-24434",
    storageBucket: "my-chat-app-24434.firebasestorage.app",
    messagingSenderId: "148768380893",
    appId: "1:148768380893:web:01fbfc9fe86d8f831cc834",
    measurementId: "G-7F651P7NQV"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let myChatId = localStorage.getItem('chat_user_id');
if(!myChatId) {
    myChatId = '유저_' + Math.floor(Math.random() * 10000);
    localStorage.setItem('chat_user_id', myChatId);
}

let currentLoginId = "";

function enableEdit(){
    const currentText=document.getElementById('intro2').innerText;
    document.getElementById('intro2').style.display='none';
    document.getElementById('intro3').style.display = 'block';    
    document.getElementById('intro3').value = currentText;            
    document.getElementById('btn-edit').style.display = 'none';    
    document.getElementById('btn-save').style.display = 'block';   
}

function saveEdit() {
    const newText = document.getElementById('intro3').value;
    document.getElementById('intro2').innerText = newText;       
    document.getElementById('intro2').style.display = 'block'; 
    document.getElementById('intro3').style.display = 'none';      
    document.getElementById('btn-edit').style.display = 'block';  
    document.getElementById('btn-save').style.display = 'none';    
    localStorage.setItem('user_intro', newText);
}

function switchTab(index) {
    const tabs = ['map', 'post', 'live'];
    tabs.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    const menubars = document.querySelectorAll('.menubar');
    menubars.forEach(menu => {
        menu.classList.remove('active');
    });
    
    document.getElementById(tabs[index]).style.display = 'block';
    menubars[index].classList.add('active');
    
    if (index === 0 && typeof map !== 'undefined' && map !== null) {
        map.relayout();
        if (typeof currentMarker !== 'undefined' && currentMarker) {
            map.setCenter(currentMarker.getPosition());
        }
    }
    
    if (index === 1) {
        loadBoardList();
    }
    
    if (index === 2) {
        initChatListener();
    }
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    if (id === 'writeModal') {
        document.getElementById('write_writer').value = currentLoginId ? currentLoginId : "확인 중...";
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function loadBoardList() {
    fetch('./board_process.php?action=list')
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById('board_content');
        tbody.innerHTML = '';
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">등록된 게시글이 없습니다.</td></tr>';
            return;
        }
        data.forEach((post, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td><a href="#" onclick="openViewModal(${post.no})">${post.title}</a></td>
                <td>${post.writer}</td>
                <td>${post.reg_date.substring(0, 10)}</td>
                <td>${post.hits}</td>
                <td>
                    <button class="btn-sm-edit" onclick="openEditModal(${post.no})">수정</button>
                    <button class="btn-sm-delete" onclick="deletePost(${post.no})">삭제</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function submitWrite() {
    const title = document.getElementById('write_title').value;
    const content = document.getElementById('write_content').value;

    if (!title || !content) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    fetch('./board_process.php?action=get_profile')
    .then(res => res.json())
    .then(data => {
        if (!data.login_user_id) {
            alert("로그인이 필요한 서비스입니다. 다시 로그인해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('action', 'insert');
        formData.append('title', title);
        formData.append('writer', data.login_user_id);
        formData.append('content', content);

        return fetch('./board_process.php', { method: 'POST', body: formData });
    })
    .then(res => {
        if(res) return res.text();
    })
    .then(data => {
        if (data && data.trim() === "success") {
            alert("글이 등록되었습니다.");
            closeModal('writeModal');
            loadBoardList();
            document.getElementById('write_title').value = '';
            document.getElementById('write_content').value = '';
        } else if(data) {
            alert("등록 실패: " + data);
        }
    });
}

function openViewModal(no) {
    fetch(`./board_process.php?action=view&no=${no}`)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            alert(data.error);
            return;
        }
        document.getElementById('view_title').innerText = data.title;
        document.getElementById('view_writer').innerText = data.writer;
        document.getElementById('view_date').innerText = data.reg_date;
        document.getElementById('view_content').innerText = data.content;
        openModal('viewModal');
    });
}

function openEditModal(no) {
    fetch(`./board_process.php?action=view&no=${no}`)
    .then(res => res.json())
    .then(data => {
        if(data.error) {
            alert(data.error);
            return;
        }
        document.getElementById('edit_no').value = data.no;
        document.getElementById('edit_title').value = data.title;
        document.getElementById('edit_content').value = data.content;
        openModal('editModal');
    });
}

function submitEdit() {
    const no = document.getElementById('edit_no').value;
    const title = document.getElementById('edit_title').value;
    const content = document.getElementById('edit_content').value;
    if (!title || !content) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }
    const formData = new FormData();
    formData.append('action', 'update');
    formData.append('no', no);
    formData.append('title', title);
    formData.append('content', content);
    fetch('./board_process.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "success") {
            alert("글이 수정되었습니다.");
            closeModal('editModal');
            loadBoardList(); 
        } else {
            alert("수정 실패: " + data);
        }
    });
}

function deletePost(no) {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('no', no);
    fetch('./board_process.php', { method: 'POST', body: formData })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "success") {
            alert("글이 삭제되었습니다.");
            loadBoardList(); 
        } else {
            alert("삭제 실패: " + data);
        }
    });
}

function loadUserProfile() {
    fetch('./board_process.php?action=get_profile')
    .then(res => res.json())
    .then(data => {
        if (data.profile_src) {
            document.getElementById('profile').src = data.profile_src;
        }
        if (data.login_user_id) {
            currentLoginId = data.login_user_id;
            if(document.getElementById('write_writer')) {
                document.getElementById('write_writer').value = currentLoginId;
            }
        }
    })
    .catch(err => console.error("프로필 로드 에러:", err));
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if(!message) return;

    database.ref('chats').push({
        sender: myChatId,
        message: message,
        timestamp: Date.now()
    });

    input.value = '';
}

let isChatListening = false;
function initChatListener() {
    if(isChatListening) return;
    isChatListening = true;

    const messagesContainer = document.getElementById('chat-messages');

    database.ref('chats').limitToLast(50).on('child_added', (snapshot) => {
        const data = snapshot.val();
        const msgDiv = document.createElement('div');
        
        if(data.sender === myChatId) {
            msgDiv.className = 'msg-box msg-me';
            msgDiv.innerHTML = `<span class="sender">나</span>${data.message}`;
        } else {
            msgDiv.className = 'msg-box msg-other';
            msgDiv.innerHTML = `<span class="sender">${data.sender}</span>${data.message}`;
        }

        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
}

kakao.maps.load(() => {
    loadUserProfile();
    switchTab(1); 
});
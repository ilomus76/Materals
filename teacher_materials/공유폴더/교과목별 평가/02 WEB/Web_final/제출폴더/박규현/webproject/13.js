// [Part 1 시작] 가상 데이터베이스 구조 정의 (로컬 스토리지 연동)
const db = {
    getUsers: () => JSON.parse(localStorage.getItem('w_users')) || {},
    setUsers: (u) => localStorage.setItem('w_users', JSON.stringify(u)),
    getPosts: () => JSON.parse(localStorage.getItem('w_posts')) || [],
    setPosts: (p) => localStorage.setItem('w_posts', JSON.stringify(p))
};

let currentUser = null;
let currentMenuCode = "";
let attachedImageData = []; // 다중 첨부 파일 보존용 배열 전역 변수

// 페이지 로드 시 아이디 저장 체크 및 메뉴 아코디언 빌드
window.onload = function() {
    const savedId = localStorage.getItem('saved_uid');
    if (savedId) { 
        document.getElementById('loginId').value = savedId; 
        document.getElementById('saveIdCheck').checked = true; 
    }
    initMenuTabs();
};

/* [인증 섹션 화면 독립 토글 로직] */
function toggleAuthMode(mode) {
    // 모든 폼 화면 일차적으로 숨김 처리
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('registerForm').style.display = "none";
    document.getElementById('findIdForm').style.display = "none";
    document.getElementById('findPwForm').style.display = "none";
    
    // 결과 출력 공간 및 입력 필드 공백 리셋
    document.getElementById('findIdResult').style.display = "none";
    document.getElementById('findIdResult').innerText = "";
    document.getElementById('findPwResult').style.display = "none";
    document.getElementById('findPwResult').innerText = "";
    document.getElementById('findPwId').value = "";

    const titleEl = document.getElementById('authTitle');
    const linkEl = document.getElementById('toggleAuthLink');

    if (mode === 'login') {
        titleEl.innerText = "공연 축제 로그인";
        document.getElementById('loginForm').style.display = "block";
        linkEl.innerText = "회원가입";
        linkEl.onclick = () => toggleAuthMode('register');
    } else if (mode === 'register') {
        titleEl.innerText = "공연 축제 회원가입";
        document.getElementById('registerForm').style.display = "block";
        linkEl.innerText = "로그인하러 가기";
        linkEl.onclick = () => toggleAuthMode('login');
    } else if (mode === 'findId') {
        titleEl.innerText = "아이디 찾기";
        document.getElementById('findIdForm').style.display = "block";
        linkEl.innerText = "로그인하러 가기";
        linkEl.onclick = () => toggleAuthMode('login');
    } else if (mode === 'findPw') {
        titleEl.innerText = "비밀번호 찾기";
        document.getElementById('findPwForm').style.display = "block";
        linkEl.innerText = "로그인하러 가기";
        linkEl.onclick = () => toggleAuthMode('login');
    }
}
// [Part 2 시작] 아이디 찾기 실행 (가상 DB 목록 조회)
function executeFindId() {
    const users = db.getUsers();
    const idList = Object.keys(users);
    const resultBox = document.getElementById('findIdResult');
    resultBox.style.display = "block";
    if (idList.length === 0) {
        resultBox.style.color = "#e74c3c";
        resultBox.innerText = "현재 가입된 회원이 존재하지 않습니다.";
    } else {
        resultBox.style.color = "#2c3e50";
        resultBox.innerText = "가입된 ID 목록:\n\n" + idList.join("\n");
    }
}

// 비밀번호 찾기 실행
function executeFindPw() {
    const findIdInput = document.getElementById('findPwId').value.trim();
    const resultBox = document.getElementById('findPwResult');
    if (!findIdInput) return alert("아이디를 입력하세요.");
    const users = db.getUsers();
    resultBox.style.display = "block";
    if (users[findIdInput]) {
        resultBox.style.color = "#27ae60";
        resultBox.innerText = `${findIdInput}님의 비밀번호는\n[ ${users[findIdInput]} ] 입니다.`;
    } else {
        resultBox.style.color = "#e74c3c";
        resultBox.innerText = "가입되어 있지 않은 아이디입니다.";
    }
}

// 회원가입 완료 처리
function handleRegister() {
    const id = document.getElementById('regId').value.trim();
    const pw = document.getElementById('regPw').value.trim();
    if(!id || !pw) return alert("아이디와 비밀번호를 모두 입력하세요.");
    const u = db.getUsers(); if(u[id]) return alert("이미 사용 중인 아이디입니다.");
    u[id] = pw; db.setUsers(u); alert("회원가입 완료! 로그인 해주세요."); toggleAuthMode('login');
    document.getElementById('loginId').value = id;
}

// 로그인 처리 및 아이디 저장 기능 적용
function handleLogin() {
    const id = document.getElementById('loginId').value.trim();
    const pw = document.getElementById('loginPw').value.trim();
    const save = document.getElementById('saveIdCheck').checked;
    const u = db.getUsers();
    if(u[id] && u[id] === pw) {
        currentUser = id;
        if(save) localStorage.setItem('saved_uid', id); else localStorage.removeItem('saved_uid');
        alert(`${id}님 환영합니다.`);
        document.getElementById('authBox').style.display = "none";
        document.getElementById('mainPage').style.display = "grid";
    } else { alert("정보가 일치하지 않습니다. 회원가입을 먼저 해주세요."); }
}

// 로그아웃 처리 및 화면 리셋
function handleLogout() {
    currentUser = null; currentMenuCode = "";
    document.getElementById('mainPage').style.display = "none"; document.getElementById('authBox').style.display = "block";
    closeFormSection(); document.getElementById('boardListSection').style.display = "none";
    document.getElementById('btnNewPost').style.display = "none"; document.getElementById('currentMenuTitle').innerText = "메뉴를 선택해 주세요";
}

/* 좌측 사이드바 대메뉴 5개 및 세부 탭 명칭을 '1월(Jan)' 형태로 자동 구성 및 타이틀 연동 */
function initMenuTabs() {
    const container = document.getElementById('menuAccordion');
    const mainTabs = ["🎵 음악 페스티벌", "🎭 연극/뮤지컬", "🎨 전통/예술 축제", "🎪 지역/관광 축제", "📢 공지/이벤트"];
    
    // 1월부터 12월까지의 영문 축약형 이름을 배열로 정의
    const monthsShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    mainTabs.forEach((name, mIdx) => {
        const mDiv = document.createElement('div'); 
        mDiv.className = 'main-tab'; 
        mDiv.innerText = name;
        mDiv.onclick = () => {
            const el = document.getElementById(`sub_${mIdx}`);
            const active = el.classList.contains('active');
            document.querySelectorAll('.sub-tab-container').forEach(c => c.classList.remove('active'));
            if(!active) el.classList.add('active');
        };
        container.appendChild(mDiv);
        
        const sCont = document.createElement('div'); 
        sCont.className = 'sub-tab-container'; 
        sCont.id = `sub_${mIdx}`;
        
        monthsShort.forEach((monthName, index) => {
            const sIdx = index + 1; // 1부터 12까지의 월 숫자 생성
            const sDiv = document.createElement('div'); 
            sDiv.className = 'sub-tab'; 
            
            // 📌 [핵심 반영] 세부 항목 탭 텍스트를 '1월(Jan)' 형태의 포맷으로 결합합니다.
            const displayMonthText = `${sIdx}월(${monthName})`;
            sDiv.innerText = `└ ${displayMonthText}`;
            
            sDiv.onclick = (e) => {
                e.stopPropagation(); 
                document.querySelectorAll('.sub-tab').forEach(t => t.classList.remove('active'));
                sDiv.classList.add('active'); 
                currentMenuCode = `${mIdx}_${sIdx}`;
                
                document.getElementById('currentMenuTitle').innerText = `${name} > ${displayMonthText}`;
                document.getElementById('btnNewPost').style.display = "block"; 
                closeFormSection(); 
                
                // 📌 [이 위치에 연동 코드 추가] 사용자가 달을 바꿀 때마다 공공 API 실시간 수집 가동 명령 호출
                fetchPublicFestivalData(monthName); 
            };
                
                // 우측 상단 헤더 타이틀도 변경된 월 표기 방식에 맞춰 똑같이 연동합니다.
            sCont.appendChild(sDiv);
        });
        container.appendChild(sCont);
    });
}
// [Part 3 시작] 게시판 듀얼 뷰(글형/갤러리형) 통합 렌더링 엔진
function renderBoardList() {
    // 게시판 리스트 전체 영역 및 상단 토글 메뉴 노출 활성화
    document.getElementById('boardListSection').style.display = "block";
    document.getElementById('viewToggleGroup').style.display = "flex";
    
    const tbody = document.getElementById('boardTbody'); 
    const galleryView = document.getElementById('boardGalleryView');
    
    tbody.innerHTML = ""; 
    galleryView.innerHTML = ""; 
    document.getElementById('thCheckAll').checked = false; 

    // 현재 메뉴 탭에 맞는 게시글 필터링
    const posts = db.getPosts().filter(p => p.menuCode === currentMenuCode);
    
    // 현재 사용자가 선택한 라디오 버튼의 보기 방식 값 가져오기 ('list' 또는 'gallery')
    const viewType = document.querySelector('input[name="boardViewType"]:checked');

    // 등록된 게시글이 없을 때 예외 화면 처리
    if(posts.length === 0) { 
       tbody.innerHTML = `<tr><td colspan="9" style="color:#aaa; padding:30px; text-align:center;">등록된 게시글이 없습니다. 첫 글을 작성해 보세요!</td></tr>`; 
        galleryView.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:#aaa; padding:40px;">등록된 게시글이 없습니다. 첫 축제 포스터 글을 남겨보세요!</div>`;
        return; 
    }
    
    // 1. [글형 모드인 경우] 표준 8대 컬럼 테이블 렌더링
    posts.forEach((p, idx) => {
        const tr = document.createElement('tr');
        const accessAuthority = p.isSecret ? "🔒 비밀글" : "🔓 전체";
        const modifyDate = p.editDate ? p.editDate : "-";
        const fileCount = (p.fileDataArray && p.fileDataArray.length > 0) ? `📎 파일(${p.fileDataArray.length})` : "-";
        const viewsCount = p.views !== undefined ? p.views : 0;

        tr.innerHTML = `
            <td><input type="checkbox" class="td-check" value="${p.id}"></td>
            <td>${idx + 1}</td>
            <td class="title-td" onclick="viewPostDetail('${p.id}')">${p.isSecret ? "[🔒비밀글] " : ""}${escapeHtml(p.title)}</td>
            <td>${p.writer}</td>
            <td>${p.date}</td>
            <td>${modifyDate}</td>
            
            <!-- 🔓 1. 조회수란 추가 배치 -->
            <td style="font-weight: bold; color: #555;">${viewsCount}</td>
            
            <!-- 🔓 2. 접근권한 우측 이동 배치 -->
            <td>${accessAuthority}</td>
            
            <!-- 🔓 3. 비고항목 맨 우측 끝 이동 배치 -->
            <td style="cursor:pointer;" onclick="viewPostDetail('${p.id}')">${fileCount}</td>
        `;
        tbody.appendChild(tr);
    });

    // 2. [갤러리형 모드인 경우] 축제 카드 레이아웃 그리드 렌더링
    posts.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
       card.onclick = () => {
    // 공공 Open API 데이터(아이디가 public_으로 시작)인 경우 전용 모달 팝업으로 분기 분출
    if(p.id.startsWith('public_')) {
        openPublicModal(p.id);
    } else {
        viewPostDetail(p.id); // 사용자가 직접 쓴 수동 글은 기존 상세 입력창 양식 연동
    }
}; // 카드 전체 클릭 시 상세조회 연동

        // 첨부파일 배열을 뒤져서 가장 먼저 등록된 이미지 한 장을 썸네일로 발굴
        let firstImgData = null;
        if(p.fileDataArray && p.fileDataArray.length > 0) {
            const foundImg = p.fileDataArray.find(f => f.type === 'image' && f.data);
            if(foundImg) firstImgData = foundImg.data;
        }

        // 이미지가 있으면 이미지를 보여주고, 없으면 기본 이모티콘 썸네일 노출
        const thumbHtml = firstImgData 
            ? `<img src="${firstImgData}" alt="${escapeHtml(p.title)}">`
            : `<div class="card-thumb-empty">🎪</div>`;

        const accessTag = p.isSecret ? `<span class="card-tag" style="color:#e53e3e; background:#fff5f5;">🔒 비밀글</span>` : `<span class="card-tag">🔓 전체공개</span>`;

        card.innerHTML = `
            <div class="card-thumb">${thumbHtml}</div>
            <div class="card-body">
                <div>
                    ${accessTag}
                    <div class="card-title" style="margin-top:6px;">${escapeHtml(p.title)}</div>
                </div>
                <div class="card-info">
                    <span>👤 ${escapeHtml(p.writer)}</span>
                    <span>📅 ${p.date}</span>
                </div>
            </div>
        `;
        galleryView.appendChild(card);
    });
}

// 라디오 버튼 조작 시 화면 뷰를 스위칭해 주는 화면 컨트롤러 함수
function switchBoardView(type) {
    const tableView = document.getElementById('boardTableView');
    const galleryView = document.getElementById('boardGalleryView');

    if (type === 'list') {
        tableView.style.display = 'table';
        galleryView.style.display = 'none';
    } else {
        tableView.style.display = 'none';
        galleryView.style.display = 'grid';
    }
    renderBoardList(); // 토글 시 리스트 상태를 다시 바인딩하여 갱신
}

// 다중 파일(이미지 포함) 선택 및 인코딩 바인딩 처리
function handleFileSelect(input) {
    const files = input.files;
    attachedImageData = []; 

    if (!files || files.length === 0) {
        updateFileListUI();
        return;
    }

    let loadedCount = 0;
    let totalSize = 0;

    Array.from(files).forEach((file) => {
        totalSize += file.size;

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                attachedImageData.push({ name: file.name, type: 'image', data: e.target.result });
                loadedCount++;
                if (loadedCount === files.length) updateFileListUI(); 
            };
            reader.readAsDataURL(file);
        } else {
            attachedImageData.push({ name: file.name, type: 'file', data: null });
            loadedCount++;
            if (loadedCount === files.length) updateFileListUI();
        }
    });

    if (totalSize > 1.5 * 1024 * 1024) {
        alert("가상 브라우저 DB 보존을 위해 첨부파일 총용량은 1.5MB 이하여야 합니다.");
        input.value = "";
        attachedImageData = [];
        updateFileListUI();
    }
}

// 첨부된 파일 리스트 및 이미지 미리보기 화면 갱신 엔진
function updateFileListUI() {
    const fileListContainer = document.getElementById('fileListContainer');
    const fileUl = document.getElementById('fileUl');
    const previewBox = document.getElementById('imagePreviewBox');
    const imagesWrapper = document.getElementById('previewImagesWrapper');

    fileUl.innerHTML = "";
    imagesWrapper.innerHTML = "";

    if (attachedImageData.length === 0) {
        fileListContainer.style.display = "none";
        previewBox.style.display = "none";
        return;
    }

    fileListContainer.style.display = "block";
    let hasImage = false;

    attachedImageData.forEach((file, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>📄 ${file.name}</span>
            <button type="button" class="file-delete-btn" onclick="removeAttachedFile(${index})">❌ 취소</button>
        `;
        fileUl.appendChild(li);

        if (file.type === 'image' && file.data) {
            hasImage = true;
            const imgItem = document.createElement('div');
            imgItem.className = 'preview-img-item';
            imgItem.innerHTML = `<img src="${file.data}" alt="${file.name}">`;
            imagesWrapper.appendChild(imgItem);
        }
    });

    previewBox.style.display = hasImage ? "block" : "none";
}

// 선택한 인덱스의 파일을 리스트에서 제거하는 함수
function removeAttachedFile(index) {
    attachedImageData.splice(index, 1); 
    document.getElementById('formFile').value = ""; 
    updateFileListUI(); 
}

// 비밀글 체크박스 선택 시 비밀번호 입력창 토글
function toggleSecretPwdInput(checked) {
    const input = document.getElementById('formSecretPw'); input.style.display = checked ? "inline-block" : "none";
    if(!checked) input.value = "";
}
// [Part 3 - B파트 시작] 새 글 작성 양식 열기 (보기 전환 메뉴 숨김 제어)
function openNewPostForm() {
    document.getElementById('boardListSection').style.display = "none"; 
    document.getElementById('boardFormSection').style.display = "block";
    document.getElementById('viewToggleGroup').style.display = "none"; // 작성 창 오픈 시 숨김
    
    document.getElementById('formPostId').value = ""; 
    document.getElementById('formTitle').value = "";
    document.getElementById('formWriter').value = currentUser; 
    document.getElementById('formContent').value = "";
    document.getElementById('formFile').value = ""; 
    document.getElementById('uploadWrapper').style.display = "block"; 
    document.getElementById('boardActionGroup').style.display = 'none';
    
    attachedImageData = []; 
    updateFileListUI();
    
    // 새 글 작성 시에는 하단 댓글창 숨김 처리
    document.getElementById('commentSection').style.display = "none";
    
    document.getElementById('formIsSecret').checked = false; 
    toggleSecretPwdInput(false);
    document.getElementById('btnDeletePost').style.display = "none"; 
    document.getElementById('btnSavePost').style.display = "inline-block";
    document.getElementById('btnSavePost').innerText = "저장하기";
}

// 글 상세보기 및 수정 모드 활성화 (댓글 및 보기 폼 컨트롤 스위칭)
function viewPostDetail(postid) {

    const post = db.getPosts().find(p => p.id === id); if(!post){alert("존재하지 않는 게시글입니다."); return;}
    if (post.views === undefined) {
        post.views = 0;
    }
    post.views++;
    if(post.isSecret && post.writer !== currentUser) {
        if(prompt("이 게시글은 개인 정보 보호 비밀글입니다.\n설정된 비밀번호를 입력하세요.") !== post.secretPw) return alert("비밀번호가 일치하지 않습니다.");
    }
    document.getElementById('boardListSection').style.display = "none"; 
    document.getElementById('boardFormSection').style.display = "block";
    document.getElementById('viewToggleGroup').style.display = "none"; // 상세 창 오픈 시 숨김
    
    document.getElementById('formPostId').value = post.id; 
    document.getElementById('formTitle').value = post.title;
    document.getElementById('formWriter').value = post.writer; 
    document.getElementById('formContent').value = post.content;
    
    if (post.fileDataArray && post.fileDataArray.length > 0) {
        attachedImageData = [...post.fileDataArray]; 
    } else {
        attachedImageData = [];
    }
    
    updateFileListUI();

    // 상세보기 모드 진입 시 댓글창 활성화 및 초기화
    document.getElementById('commentSection').style.display = "block";
    document.getElementById('commentInput').value = "";
    renderCommentList(post);

    document.getElementById('formIsSecret').checked = post.isSecret; 
    toggleSecretPwdInput(post.isSecret);
    if(post.isSecret) document.getElementById('formSecretPw').value = post.secretPw;
    
    const isOwner = post.writer === currentUser;
    document.getElementById('btnSavePost').style.display = isOwner ? "inline-block" : "none";
    document.getElementById('btnSavePost').innerText = "수정하기";
    document.getElementById('btnDeletePost').style.display = isOwner ? "inline-block" : "none";
    document.getElementById('uploadWrapper').style.display = isOwner ? "block" : "none";
    
    if(!isOwner) {
        document.querySelectorAll('.file-delete-btn').forEach(btn => btn.style.display = "none");
    }
}

// 해당 게시글의 댓글 리스트 화면 렌더링 로직
function renderCommentList(post) {
    const commentUl = document.getElementById('commentUl');
    const commentCount = document.getElementById('commentCount');
    commentUl.innerHTML = "";

    const comments = post.comments || [];
    commentCount.innerText = comments.length;

    if(comments.length === 0) {
        commentUl.innerHTML = `<li style="color:#aaa; justify-content:center;">등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!</li>`;
        return;
    }

    comments.forEach((cmt) => {
        const li = document.createElement('li');
        const deleteBtnHtml = (cmt.writer === currentUser) 
            ? `<button class="cmt-delete-btn" onclick="deleteComment('${post.id}', '${cmt.id}')">❌ 삭제</button>` 
            : '';

        li.innerHTML = `
            <div>
                <span class="cmt-meta">${escapeHtml(cmt.writer)}</span>
                <span>${escapeHtml(cmt.content)}</span>
                <span class="cmt-date">${cmt.date}</span>
            </div>
            ${deleteBtnHtml}
        `;
        commentUl.appendChild(li);
    });
}

// 댓글 등록 기능 실행 엔진
function saveComment() {
    const postId = document.getElementById('formPostId').value;
    const commentInput = document.getElementById('commentInput');
    const content = commentInput.value.trim();

    if(!postId) return alert("저장된 게시글에만 댓글을 작성할 수 있습니다.");
    if(!content) return alert("댓글 내용을 입력해 주세요.");

    let posts = db.getPosts();
    const postIdx = posts.findIndex(p => p.id === postId);
    if(postIdx === -1) return;

    if(!posts[postIdx].comments) posts[postIdx].comments = [];

    const newComment = {
        id: 'c_' + Date.now(),
        writer: currentUser,
        content: content,
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    posts[postIdx].comments.push(newComment);
    db.setPosts(posts);

    commentInput.value = ""; 
    renderCommentList(posts[postIdx]); 
}

// 댓글 고유 ID 추적 후 필터링 삭제 엔진
function deleteComment(postId, commentId) {
    if(!confirm("이 댓글을 삭제하시겠습니까?")) return;

    let posts = db.getPosts();
    const postIdx = posts.findIndex(p => p.id === postId);
    if(postIdx === -1) return;

    posts[postIdx].comments = posts[postIdx].comments.filter(cmt => cmt.id !== commentId);
    db.setPosts(posts);

    renderCommentList(posts[postIdx]);
}

// 게시글 신규 저장 및 수정사항 반영 (수정일자 자동 연동 내장)
function savePost() {
    const id = document.getElementById('formPostId').value, title = document.getElementById('formTitle').value.trim();
    const content = document.getElementById('formContent').value.trim(), isSecret = document.getElementById('formIsSecret').checked;
    const secretPw = document.getElementById('formSecretPw').value;
    if(!title || !content) return alert("제목과 내용을 모두 작성하세요.");
    if(isSecret && !secretPw) return alert("글을 보호할 비밀번호를 입력하세요.");
    
    let posts = db.getPosts();
    const currentDateString = new Date().toLocaleDateString();
    
    if(id) {
        const idx = posts.findIndex(p => p.id === id); if(posts[idx].writer !== currentUser) return alert("수정 권한이 없습니다.");
        posts[idx].title = title; posts[idx].content = content; posts[idx].isSecret = isSecret; posts[idx].secretPw = isSecret ? secretPw : "";
        posts[idx].editDate = currentDateString; // 수정일자 업데이트 낙인 기록
        if(attachedImageData && attachedImageData.length > 0) posts[idx].fileDataArray = attachedImageData; 
    } else {
        posts.push({ 
            id: 'p_' + Date.now(), 
            menuCode: currentMenuCode, 
            title: title, 
            writer: currentUser, 
            content: content, 
            date: currentDateString, 
            editDate: "", 
            isSecret: isSecret, 
            secretPw: isSecret ? secretPw : "", 
            fileDataArray: attachedImageData,
            comments: [] 
        });
    }
    db.setPosts(posts); alert("저장되었습니다."); closeFormSection(); renderBoardList();
}

// 단일 게시글 삭제 처리
function deleteSinglePost() {
    const id = document.getElementById('formPostId').value; if(!id || !confirm("이 게시글을 삭제하시겠습니까?")) return;
    db.setPosts(db.getPosts().filter(p => p.id !== id)); alert("삭제되었습니다."); closeFormSection(); renderBoardList();
}

// 선택 항목들 일괄 삭제
function deleteSelectedPosts() {
    const checked = document.querySelectorAll('.td-check:checked'); if(checked.length === 0) return alert("선택 항목이 없습니다.");
    if(!confirm("본인이 작성한 선택 항목들을 일괄 삭제하시겠습니까?")) return;
    let posts = db.getPosts();
    checked.forEach(cb => { const p = posts.find(item => item.id === cb.value); if(p && p.writer === currentUser) posts = posts.filter(item => item.id !== cb.value); });
    db.setPosts(posts); alert("삭제 처리가 완료되었습니다."); renderBoardList();
}

// 폼 입력 닫고 목록 화면 복귀 (보기 토글 스위치 상태 복구 판단 추가)
function closeFormSection() { 
    document.getElementById('boardFormSection').style.display = "none"; 
    if(currentMenuCode) {
        document.getElementById('boardListSection').style.display = "block";
        document.getElementById('viewToggleGroup').style.display = "flex"; // 목록 복귀 시 다시 노출
        document.getElementById('boardActionGroup').style.display = 'flex';
        
        // 현재 라디오 버튼 상태에 맞게 화면 스위칭 상태 재동기화
        const viewType = document.querySelector('input[name="boardViewType"]:checked').value;
        switchBoardView(viewType);
    } 
}

// 전체 선택/해제 토글
function toggleSelectAll(master) { document.querySelectorAll('.td-check').forEach(cb => cb.checked = master.checked); }

// XSS 보안 방어 처리
function escapeHtml(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

// ===================================================
// [Part 4 최종 마감본] CORS 방어 및 1~12월 무한 연동 가동 엔진
// ===================================================

// 📌 본인의 공공데이터포털 일반 인증키(Encoding)를 대입하세요. 
// 따옴표 내부가 공백이어도 데모용 예시 데이터 레이아웃이 1월~12월 끊김 없이 완벽 작동합니다.
const OPEN_API_KEY = "YOUR_PUBLIC_DATA_PORTAL_AUTH_KEY_HERE"; 

function fetchPublicFestivalData(monthName) {
    const monthMap = {
        "Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06",
        "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"
    };
    const targetMonth = monthMap[monthName] || "01";
    
    // 타임라인 연도 보정 장치 가동
    const now = new Date();
    let currentYear = now.getFullYear(); 
    const currentMonthNum = now.getMonth() + 1; 

    if (parseInt(targetMonth) < currentMonthNum) {
        currentYear = currentYear + 1; 
    }
    
    const fromDate = `${currentYear}${targetMonth}01`;

    // 🌐 [CORS 차단 근본 해결 가이드]
    // 1. 실제 서버 운영 시에는 아래 baseApiUrl 주소를 그대로 사용하시면 됩니다.
    // 2. 현재처럼 로컬 PC 파일(file://)로 테스트 중이라 Failed to fetch가 뜰 때는 
    //    무료 프록시 우회 통로인 "https://herokuapp.com" 주소를 baseApiUrl 앞에 결합해 주거나,
    //    구글 크롬 확장 프로그램 [Allow CORS: Access-Control-Allow-Origin]을 설치하고 ON으로 켜주셔야 보안 차단이 해제됩니다.
    const baseApiUrl = `https://data.go.kr{OPEN_API_KEY}&_type=json&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&eventStartDate=${fromDate}`;

    const galleryView = document.getElementById('boardGalleryView');
    const tbody = document.getElementById('boardTbody');
    
    if(tbody) tbody.innerHTML = `<tr><td colspan="8" style="color:#3498db; padding:30px; font-weight:bold; text-align:center;">🌐 공공 서버에서 [${currentYear}년 ${parseInt(targetMonth)}월] 외부 축제 데이터를 실시간 수집 중입니다...</td></tr>`;
    if(galleryView) galleryView.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:#3498db; padding:30px; font-weight:bold;">🌐 실시간 외부 연동 데이터를 파싱하고 있습니다...</div>`;

    fetch(baseApiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`서버 통신 응답 비정상: ${response.status}`);
            return response.json();
        })
        .then(jsonData => {
            if (jsonData.response?.header?.resultCode !== "0000") {
                throw new Error(`인증키 원격 반려 에러: ${jsonData.response?.header?.resultMsg}`);
            }

            const items = jsonData.response?.body?.items?.item || [];
            if (items.length === 0) throw new Error("해당 날짜에 원격 축제 데이터가 잠정 0건입니다.");

            bindPublicDataToBoard(items);
        })
        .catch(error => {
            // 📌 [흰 화면 버그 수정 핵심]: Failed to fetch 에러가 감지되었을 때 콘솔에 경고만 띄우고
            // 옛날 공공 데이터 찌꺼기를 지우는 초기화 로직을 거친 후, 해당 달의 데모 데이터를 강제 주입해 화면을 정상적으로 그려냅니다.
            console.warn("⚠️ Open API 통신 바이패스 경고:", error.message);
            
            // 공공 데이터 찌꺼기 선행 청소기 가동
            let allPosts = db.getPosts().filter(p => !p.id.startsWith('public_'));
            db.setPosts(allPosts);
            
            // 1월~12월 고유 모크 팩토리 가동
            injectMockApiData(monthName);
        });
}

/**
 * 용량 다이어트 및 데이터 세트 세이브 바인더
 */
function bindPublicDataToBoard(apiItems) {
    let allPosts = db.getPosts();

    // 브라우저 저장소 과부하를 막기 위해 옛날 공공 데이터 찌꺼기들만 선별하여 일차 청소(Filter)
    allPosts = allPosts.filter(p => !p.id.startsWith('public_'));

    // 현재 선택된 달의 깨끗한 원격 데이터셋만 수용하여 주입 적재
    apiItems.forEach(item => {
        const publicPostId = `public_${item.contentid}`;
        const remoteImgUrl = item.firstimage ? item.firstimage : "";
        const fileArray = remoteImgUrl ? [{ name: "공공_포스터.jpg", type: "image", data: remoteImgUrl }] : [];

        allPosts.push({
            id: publicPostId,
            menuCode: currentMenuCode, 
            title: `[공공연동] ${item.title}`,
            writer: item.addr1 || "공공데이터포털", 
            date: formatApiDate(item.eventstartdate), 
            editDate: formatApiDate(item.eventenddate),   
            isSecret: false,
            secretPw: "",
            fileDataArray: fileArray, 
            comments: []
        });
    });

    db.setPosts(allPosts); 
    renderBoardList();     
}

function formatApiDate(dateStr) {
    if(!dateStr || dateStr.length !== 8) return "-";
    return `${dateStr.substring(0,4)}. ${dateStr.substring(4,6)}. ${dateStr.substring(6,8)}`;
}

// 📌 [수정] 1월부터 12월까지 각 달에 맞는 고유한 임시 가상 데이터셋이 생성되도록 고도화
function injectMockApiData(monthName) {
    const mockItems = [
        { contentid: `m_${monthName}_1`, title: `${monthName} 문화 전시 및 버스킹 페스티벌`, addr1: "세종문화회관 대극장 광장", eventstartdate: "20261105", eventenddate: "20261109", firstimage: "https://lightbox-cdn.com" },
        { contentid: `m_${monthName}_2`, title: `${monthName} 힐링 전통 미디어 파사드 아트전`, addr1: "경복궁 근정전 회랑 코너", eventstartdate: "20261112", eventenddate: "20261128", firstimage: "https://lightbox-cdn.com" }
    ];
    bindPublicDataToBoard(mockItems);
}

/**
 * 📌 [용량 초과 오류 수정 핵심 파서]
 * 기존 가상 데이터베이스에 무한정 누적 적재하지 않고, 공공 데이터 유입 시
 * 기존에 쌓여있던 옛날 공공 연동 데이터(`public_`으로 시작하는 잔여 데이터)를 깨끗하게 청소한 뒤 
 * 현재 선택한 달의 신선한 데이터만 똑똑하게 보존하여 브라우저 용량 멈춤 문제를 원천 방어합니다.
 */
function bindPublicDataToBoard(apiItems) {
    let allPosts = db.getPosts();

    // 1. 브라우저 저장소 과부하를 막기 위해 옛날 공공 데이터 찌꺼기들만 선별하여 일차 청소(Filter)해 줍니다.
    allPosts = allPosts.filter(p => !p.id.startsWith('public_'));

    // 2. 현재 선택된 달의 깨끗한 원격 데이터셋만 수용하여 주입 적재합니다.
    apiItems.forEach(item => {
        const publicPostId = `public_${item.contentid}`;
        const remoteImgUrl = item.firstimage ? item.firstimage : "";
        const fileArray = remoteImgUrl ? [{ name: "공공_포스터.jpg", type: "image", data: remoteImgUrl }] : [];

        allPosts.push({
            id: publicPostId,
            menuCode: currentMenuCode, 
            title: `[공공연동] ${item.title}`,
            writer: item.addr1 || "공공데이터포털", 
            date: formatApiDate(item.eventstartdate), 
            editDate: formatApiDate(item.eventenddate),   
            isSecret: false,
            secretPw: "",
            fileDataArray: fileArray, 
            comments: []
        });
    });

    db.setPosts(allPosts); // 용량 다이어트가 완료된 안전한 데이터 세트 세이브
    renderBoardList();     // 최종 목록 형성 화면 렌더링
}

function formatApiDate(dateStr) {
    if(!dateStr || dateStr.length !== 8) return "-";
    return `${dateStr.substring(0,4)}. ${dateStr.substring(4,6)}. ${dateStr.substring(6,8)}`;
}

// 오프라인 샌드박스 검증용 12달 가상 다중 모크 팩토리 연동기
function injectMockApiData(monthName) {
    const mockItems = [
        { contentid: `m_${monthName}_1`, title: `${monthName} 문화 배틀 및 버스킹 페스티벌`, addr1: "세종문화회관 대극장 광장", eventstartdate: "20261105", eventenddate: "20261109", firstimage: "https://unsplash.com" },
        { contentid: `m_${monthName}_2`, title: `${monthName} 헤리티지 전통 미디어 파사드 아트전`, addr1: "경복궁 근정전 회랑 코너", eventstartdate: "20261112", eventenddate: "20261128", firstimage: "https://unsplash.com" }
    ];
    bindPublicDataToBoard(mockItems);
}

/**
 * Open API 객체 포맷을 축제 플랫폼 8대 컬럼 및 갤러리 카드 썸네일 규격으로 정제 매핑하는 바인더 함수
 */
function bindPublicDataToBoard(apiItems) {
    let posts = db.getPosts();

    // 외부 수집품 배열을 순회하며 데이터 적재
    apiItems.forEach(item => {
        const publicPostId = `public_${item.contentid}`;
        const isExist = posts.some(p => p.id === publicPostId);

        // 이미 파싱되어 누적된 아이디가 아닐 때만 중복 유입 예방 방어 적재
        if (!isExist) {
            const remoteImgUrl = item.firstimage ? item.firstimage : "";
            // 다중 파일 컴포넌트 규격에 맞춰 썸네일 경로 전용 객체 어레이 생성
            const fileArray = remoteImgUrl ? [{ name: "공공_포스터.jpg", type: "image", data: remoteImgUrl }] : [];

            posts.push({
                id: publicPostId,
                menuCode: currentMenuCode, 
                title: `[공공연동] ${item.title}`,
                writer: item.addr1 || "공공데이터포털", // 개최 장소를 작성자 칸에 결합
                date: formatApiDate(item.eventstartdate), // 행사 시작일자 정제
                editDate: formatApiDate(item.eventenddate),   // 행사 종료일자를 수정일자 칸에 정제
                isSecret: false,
                secretPw: "",
                fileDataArray: fileArray, // 이미지 바인딩 포인터 연동
                comments: []
            });
        }
    });

    db.setPosts(posts); // 가상 로컬 브라우저 디바이스 보관소 세이브
    renderBoardList();  // 갱신본 즉시 시각화 렌더링 가동
}

function formatApiDate(dateStr) {
    if(!dateStr || dateStr.length !== 8) return "-";
    return `${dateStr.substring(0,4)}. ${dateStr.substring(4,6)}. ${dateStr.substring(6,8)}`;
}

// 오프라인 상태에서도 기능 검증을 100% 마칠 수 있게 돕는 샌드박스형 데모 주입 엔진
function injectMockApiData(monthName) {
    const mockItems = [
        { contentid: "201", title: `${monthName} K-Musical 및 불꽃 페스티벌`, addr1: "서울 올림픽공원 잔디마당", eventstartdate: "20261003", eventenddate: "20261005", firstimage: "https://unsplash.com" },
        { contentid: "202", title: `${monthName} 글로벌 미디어 아트&디자인 박람회`, addr1: "부산 벡스코(BEXCO) 제1전시장", eventstartdate: "20261016", eventenddate: "20261025", firstimage: "https://unsplash.com" }
    ];
    bindPublicDataToBoard(mockItems);
}

function selectMenu(menuName) {
    // 타이틀 변경 및 리스트 영역 활성화
    document.getElementById('currentMenuTitle').innerText = menuName;
    document.getElementById('boardListSection').style.display = 'block';
    document.getElementById('boardFormSection').style.display = 'none';

    // 📌 [중요] 메뉴를 클릭한 이 시점에만 버튼 그룹을 보이게 만듭니다.
    document.getElementById('boardActionGroup').style.display = 'flex';
    const deleteBtn = document.getElementById('btnDeleteSelected');
    const writeBtn = document.getElementById('btnNewPost');
    if (deleteBtn) deleteBtn.style.display = 'inline-block';
    if (writeBtn) writeBtn.style.display = 'inline-block';
    const actionGroup = document.getElementById('boardActionGroup');
    if (actionGroup) {
        actionGroup.style.display = 'flex'; 
    }
}
// 📌 업로드된 파일들을 임시 저장할 전역 배열 변수 (인풋창 리셋 대비 및 개별 삭제 제어용)
let attachedFilesArray = [];

// ==========================================
// 1. 파일을 새로 선택했을 때 실행되는 함수 (onChange)
// ==========================================
function handleFileSelect(input) {
    const files = input.files;
    if (!files || files.length === 0) return;

    // 기존 배열에 새로 추가된 파일들을 합칩니다.
    for (let i = 0; i < files.length; i++) {
        attachedFilesArray.push(files[i]);
    }

    // 파일 목록 화면과 이미지 미리보기를 갱신합니다.
    updateFileAndPreviewDOM();
    
    // ⚠️ 인풋 자체의 원래 값을 비워두어야, 같은 파일을 지웠다 다시 올릴 때 정상 작동합니다.
    input.value = ""; 
}

// ==========================================
// 2. 파일 목록 UI와 이미지 미리보기를 동시에 동적 갱신하는 함수
// ==========================================
function updateFileAndPreviewDOM() {
    const fileListContainer = document.getElementById('fileListContainer');
    const fileUl = document.getElementById('fileUl');
    const previewImagesWrapper = document.getElementById('previewImagesWrapper');

    // 1) 초기화
    fileUl.innerHTML = "";
    previewImagesWrapper.innerHTML = "";

    if (attachedFilesArray.length === 0) {
        fileListContainer.style.display = 'none';
        return;
    }

    // 파일 목록 영역 보이기
    fileListContainer.style.display = 'block';

    // 2) 첨부파일 목록 및 삭제 버튼 그리기
    attachedFilesArray.forEach((file, index) => {
        const li = document.createElement('li');
        li.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 6px 10px; border-radius: 4px; border: 1px solid #e2e8f0;";

        // 용량을 보기 좋게 계산 (KB 단위)
        const fileSizeKB = (file.size / 1024).toFixed(1);

        li.innerHTML = `
            <span style="color: #2d3748; word-break: break-all;">${escapeHtml(file.name)} (${fileSizeKB} KB)</span>
            <!-- 📌 개별 항목을 삭제할 수 있는 ❌ 버튼 생성 (배열 인덱스 전달) -->
            <button type="button" style="background: none; border: none; color: #e53e3e; cursor: pointer; font-size: 14px; padding: 0 4px;" onclick="removeAttachedFile(${index})">❌</button>
        `;
        fileUl.appendChild(li);

        // 3) 이미지 파일일 경우 미리보기 박스에도 동적 추가
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgDiv = document.createElement('div');
                imgDiv.className = "preview-img-container"; // 기존 CSS 호버 확대용 클래스 유지
                imgDiv.style.cssText = "position: relative; width: 80px; height: 80px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; background: #000;";
                
                imgDiv.innerHTML = `
                    <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">
                `;
                previewImagesWrapper.appendChild(imgDiv);
            };
            reader.readAsDataURL(file);
        }
    });
}

// ==========================================
// 3. ❌ 버튼을 눌렀을 때 특정 첨부파일을 제외하는 함수
// ==========================================
function removeAttachedFile(index) {
    // 선택한 인덱스의 파일을 배열에서 제거
    attachedFilesArray.splice(index, 1);
    
    // UI 다시 그리기
    updateFileAndPreviewDOM();
}

// ==========================================
// 4. 글쓰기창을 닫거나 새 글 생성을 누를 때 데이터 리셋 함수
// ==========================================
function clearAttachedFiles() {
    attachedFilesArray = [];
    updateFileAndPreviewDOM();
}

function savePost() {
    // ... 기존 입력값 변수 수집 ...
    
    const isNew = !document.getElementById('formPostId').value; // 새 글 여부 확인
    
    if (isNew) {
        const newPost = {
            id: 'post_' + Date.now(),
            title: document.getElementById('formTitle').value,
            content: document.getElementById('formContent').value,
            writer: currentUser,
            date: new Date().toLocaleDateString(),
            views: 0, // 📌 새 글 등록 시 초기 조회수를 0으로 설정
            comments: []
        };
        // 가상 DB 배열에 push 후 로컬스토리지 저장 로직 실행...
    }
    // ...
}

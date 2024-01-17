let notes = [];
let titles =[];
let deletedTitles = [];
let deletedNotes = [];

load();

function render() {
    let content = document.getElementById('content');
    content.innerHTML =`
     <div class="image">
        <a href="index.html"><img class="img-logo" src="./img/5883219.png" alt="logo"></a>
        <a href="trash.html"><img class="trash-img" src="./img/trash_icon-icons.com_48207.png" alt="Logo"></a>
     </div>
       <h1>Notizblock<h1> 
      <div class="add-notes-container">
        <input class="input" type=text placeholder="Your Title..." id="title"> <br>
        <input class="input" type=text placeholder="Your Note..." id="note"> <br>
        <button class="create-button" onclick="addNotes()">Create Note</button>
      </div>
     `;

    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];
        content.innerHTML += `
        <div class="card">
        <b>Title:<b> ${title} <br>
        <b>Notiz:<b> ${note} <br>
        <button class="delete-button" onclick="deleteNote(${i})">X</button>
        </div>
        `;
    }
}

function renderTrash() {
    let trashContent = document.getElementById('trashContent');
    trashContent.innerHTML = '';
    trashContent.innerHTML += `
      <div class="image">
        <a href="index.html"><img class="img-logo" src="./img/5883219.png" alt="logo"></a>
        <a href="trash.html"><img class="trash-img" src="./img/trash_icon-icons.com_48207.png" alt="Logo"></a>
      </div>
      <h1>Gelöschte Notizen</h1>
    `;
    trashContent.innerHTML +=`
      <div class="body">
        <div id="deletedNotesContainer" class="notesContainer"></div>
      </div>    
    `;
    for (i = 0; i < deletedNotes.length; i++) {
        let deletedNotesContainer = document.getElementById('deletedNotesContainer');
        let title = deletedTitles[i];
        let note = deletedNotes[i];
        deletedNotesContainer.innerHTML += `
            <div class="note">
                <div id="deletedNoteText" class="deletedNoteText">
                   ${title} <br>
                   ${note}
                </div>
            <div class="delete">
                <button class="notesBtn" onclick="recoverNote(${i})"><img class="notesIcon" src="./img/redo-circular-arrow_icon-icons.com_56886.png"></button>
                <button class="notesBtn" onclick="deleteNoteForever(${i})"><img class="notesIcon" src="./img/trash_icon-icons.com_48207.png"></button>
            </div>
        </div>
        `;
       } 
    }

function addNotes() {
    let note = document.getElementById('note');
    let title = document.getElementById('title');
    if (note.value == "") {
        alert('Bitte fülle das Feld aus');
    } else {
        notes.push(note.value);
        render();
        save();
    }
    if (title.value == "") {
        alert('Bitte fülle das Feld aus');
    } else {
        titles.push(title.value);
        render();
        save();
    }
}

function deleteNote(i) {
    deletedTitles.push(titles[i]);
    deletedNotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();
}

function save() {
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let deletedNotesAsText = JSON.stringify(deletedNotes);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
    let deletedTitlesAsText = JSON.stringify(deletedTitles);
    localStorage.setItem('deletedTitles', deletedTitlesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('titles');
    if (titlesAsText) {
        titles = JSON.parse(titlesAsText);
    }
    let notesAsText = localStorage.getItem('notes');
    if (notesAsText) {
        notes = JSON.parse(notesAsText);
    }

    let deletedTitlesAsText = localStorage.getItem('deletedTitles');
    if (deletedTitlesAsText) {
        deletedTitles = JSON.parse(deletedTitlesAsText);
    }
    let deletedNotesAsText = localStorage.getItem('deletedNotes');
    if (deletedNotesAsText) {
        deletedNotes = JSON.parse(deletedNotesAsText);
    }
}

function recoverNote(i) {
    titles.push(deletedTitles[i]);
    deletedTitles.splice(i, 1);

    notes.push(deletedNotes[i]);
    deletedNotes.splice(i, 1);

    renderTrash();
    save();
}

function deleteNoteForever(i) {
    deletedTitles.splice(i, 1);
    deletedNotes.splice(i, 1);

    renderTrash();
    save();
}




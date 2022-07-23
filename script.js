let showNoteBtn = document.querySelector(".add-note-btn");
let editNoteContainer = document.querySelector(".edit-note");
let noteTitleInput = document.querySelector(".note-title-input");
let noteDescInput = document.querySelector(".note-body-input");
let noteBox = document.querySelector(".note-box");
let closeIcon = document.querySelector(".fa-arrow-left");

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Getting Local Storage Notes
const allNotes = JSON.parse(localStorage.getItem("allNotes") || "[]");
let isUpdate = false,
  updateId;

noteTitleInput.addEventListener("keyup", function (e) {
  this.style.height = "45px";
  let height = e.target.scrollHeight;
  noteTitleInput.style.height = `${height}px`;
});

closeIcon.addEventListener("click", () => {
  editNoteContainer.style.left = "-100%";
});

showNoteBtn.addEventListener("click", () => {
  editNoteContainer.style.left = "50%";
  noteTitleInput.value = "";
  noteDescInput.value = "";
  closeIcon.innerHTML = "<p>Add Note</p>"

});

function showNotes() {
  let noteAdd = "";
  document.querySelectorAll(".note").forEach((note) => note.remove());
  allNotes.forEach((note, index) => {
    let filtDesc = note.description.replaceAll("\n", "<br/>");
    noteAdd += `  <div class="note">
<h3 class="note-title">${note.title}</h3>
<p class="note-body">${note.description}</p>
<hr>
<p class="date">${note.date}</p>
<i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
<div class="settings">
    <div class="menu">
            <span class="edit-btn" onclick="editNote(${index},'${note.title}','${filtDesc}')"><i class="fa-solid fa-pen"></i> Edit</span>
            <span class="delete-btn" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i> Delete</span>
    </div>
</div>
  </div>
  `;
  });
  noteBox.innerHTML =
    noteAdd ||
    `
 <span><i class="fa-solid fa-note-sticky"></i></span> 
 <span class="no-notes-message">Add a note first</span>`;
}

showNotes();

function deleteNote(Noteid) {
  allNotes.splice(Noteid, 1); //Delete Note From Array
  localStorage.setItem("allNotes", JSON.stringify(allNotes));
  showNotes();
}

function editNote(Noteid, title, filtDesc) {
  let desc = filtDesc.replaceAll("<br/>", "\r\n");
  updateId = Noteid;
  isUpdate = true;
  showNoteBtn.click();
  noteTitleInput.value = title;
  noteDescInput.value = desc;
  closeIcon.innerHTML = "<p>Save Edit</p>"
}

const addNote = (e) => {
    e.preventDefault();
  let noteTitle = noteTitleInput.value; //Note Title Value
  let noteDesc = noteDescInput.value; //Note Description Value

  if (noteTitle || noteDesc) {
    let date = new Date(),
      month = months[date.getMonth()],
      day = date.getDate(),
      year = date.getFullYear();

    //All Notes Info
    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      allNotes.push(noteInfo); //Push Note Info In Notes
    } else {
      isUpdate = false;
      allNotes[updateId] = noteInfo;
    }
    //Saving To Local Storage
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
    showNotes();
  }
}

closeIcon.addEventListener("click", addNote)


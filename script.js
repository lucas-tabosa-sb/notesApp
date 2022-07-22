let showNoteBtn = document.querySelector('.add-note-btn')
let editNoteContainer = document.querySelector('.edit-note')
let noteTitleInput = document.querySelector('.note-title-input')
let noteDescInput = document.querySelector('.note-body-input')
let noteBox = document.querySelector('.note-box')
let closeIcon = document.querySelector('.fa-arrow-left')

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


// get from local storage
const allNotes = JSON.parse(localStorage.getItem("allNotes") || "[]")
let isUpdate = false, updateId

noteTitleInput.addEventListener('keyup', function (e) {
    this.style.height = "4.5rem"
    let height = e.target.scrollHeight
    noteTitleInput.style.height = `${height}px`
})


closeIcon.addEventListener('click', () => {
    editNoteContainer.style.left = '-100%'
})

showNoteBtn.addEventListener('click', () => {
    editNoteContainer.style.left = "50%"
    noteTitleInput.value = ""
    noteDescInput.value = ""
})

function showNotes() {
    let noteAdd = ""

    document.querySelectorAll('.note').forEach(note => note.remove())
    allNotes.forEach((note, index) => {
        let filtDesc = note.description.replaceAll("\n", "<br/>")

        noteAdd += `<div class="note">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-body">${note.description}</p>
                        <hr>
                        <p class="date">${note.date}</p>
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <div class="settings">
                            div class="menu">
                                <span class="edit-btn" onclick="editNote(${index},'${note.title}','${filtDesc}')"><i class="fa-solid fa-pen"></i> Edit</span>
                                <span class="delete-btn" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i> Delete</span>
                            </div>
                        </div>
                    </div>`
    })

    noteBox.innerHTML = noteAdd || `
    <span><i class="fa-solid fa-note-sticky"></i></span>
    <span class="no-notes-message">No Notes here yet</span>`
}

showNotes()

function deleteNote(noteId){
    allNotes.splice(noteId, 1) // delete note from array
    localStorage.setItem("allNotes", JSON.stringify(allNotes))
    showNotes()
}

function editNote(noteId, title, filtDesc){
    let desc = filtDesc.replaceAll('<br/>', '\r\n')
    updateId = noteId
    isUpdate = true
    showNoteBtn.click()
    noteTitleInput.value = title
    noteDescInput.value = desc
}

closeIcon.addEventListener('click', e => {
    e.preventDefault()

    let noteTitle = noteTitleInput.value //note title value
    let noteDesc = noteDescInput.value

    if(noteTitle || noteDesc){
        let date = new Date()

        month = months[date.getMonth()]
        day = date.getDate()
        year = date.getFullYear()


        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdate){
            allNotes.push(noteInfo)
        } else {
            isUpdate = false
            allNotes[updateId] = noteInfo
        }

        localStorage.setItem("allNotes", JSON.stringfy(allNotes))
        showNotes()
    }
})
import React, { useState, useEffect } from "react"
import styles from "./NotesList.module.css"
import NoteContent from "../NoteContent/NoteContent "
import Api from "../Api/Api"
import uniqid from "uniqid"

export default function NotesList() {
  const [notes, setNotes] = useState([])
  const [currentNoteData, setCurrentNoteData] = useState({})
  const [componentUpdate, setComponentUpdate] = useState(false)
  const [notesToFilter, setNotesToFilter] = useState([])
  const [cleanTextarea, setCleanTextarea] = useState(false)

  useEffect(() => {
    Api.getNotes().then((res) => {
      setNotes(res)
      setNotesToFilter(res)
    })
  }, [])

  if (componentUpdate) {
    Api.getNotes().then((res) => setNotes(res))
  }

  if (cleanTextarea) {
    setCurrentNoteData({})
  }

  const showNote = (note) => {
    setCurrentNoteData(note)
  }

  const deleteNote = (id) => {
    Api.deleteNote(id)
    setComponentUpdate(true)
    setCleanTextarea(true)
  }

  const updateComponent = (value) => {
    setComponentUpdate(value)
  }

  const cleanProps = () => {
    setCurrentNoteData({})
  }

  let arr = []

  const findNote = (e) => {
    notesToFilter.map((note) =>
      note.tags.map((tag) => {
        if (tag.includes(e.target.value)) {
          arr.push(note)
        }
        setNotes(arr)
      })
    )
  }

  if (componentUpdate) {
      setComponentUpdate(false)
      setCleanTextarea(false)    
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.NotesListContainer}>
          <div className={styles.InputDiv}>
            <label>
              <input placeholder="Поиск по всем заметкам" className={styles.Input} onChange={findNote}></input>
            </label>
          </div>
          <ul className={styles.NotesList}>
            {notes.length > 0
              ? notes.map((note) => (
                  <div className={currentNoteData.id !== note.id ? `${styles.NoteDiv}` : `${styles.NoteDiv} ${styles.NoteDivFocus}`} key={uniqid()}>
                    <li className={styles.NoteListElement} key={uniqid()} onClick={() => showNote(note)}>
                      <p className={styles.NoteContent}> {note.content}</p>
                      <p className={styles.NoteTag}>{note.tags}</p>
                      <button className={styles.DeleteNoteButton} onClick={() => deleteNote(note.id)}>
                        X
                      </button>
                    </li>
                  </div>
                ))
              : null}
          </ul>
        </div>
        <div className={styles.TextareaContainer}>
          {" "}
          <NoteContent
            cleanProps={cleanProps}
            cleanTextarea={cleanTextarea}
            updateComponent={updateComponent}
            notes={notes}
            note={currentNoteData}
          ></NoteContent>
        </div>
      </div>
    </>
  )
}

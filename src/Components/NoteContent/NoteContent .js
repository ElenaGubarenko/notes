import React, { useState, useEffect } from "react"
import styles from "./NoteContent.module.css"
import Api from "../Api/Api"

export default function NoteContent({ cleanProps, cleanTextarea, updateComponent, notes, note }) {
  const [textareaValue, setTextareaValue] = useState(note.content)

  useEffect(() => {
    setTextareaValue(note.content)
  }, [note])

  if (textareaValue === undefined) {
    setTextareaValue("")
  }

  const saveChanges = (id) => {
    let arr = []

    if (!textareaValue || textareaValue.trim() === "") {
      setTextareaValue("")
      return
    }

    if (textareaValue) {
      textareaValue.split(" ").map((element) => {
        if (element) {
          if (element[0].includes("#")) {
            arr.push(element)
          }
        }
      })
    }

    if (id) {
      if (note.tags.length === 0) {
        const toUpdate = {
          content: textareaValue,
          tags: [...arr],
        }
        Api.patchNote(id, toUpdate)
      }

      if (note.tags.length > 0) {
        arr = [...arr, ...note.tags]
        const uniqueTags = new Set(arr)
        const toUpdate = {
          content: textareaValue,
          tags: [...uniqueTags],
        }
        Api.patchNote(id, toUpdate)
      }
    }

    if (!id) {
      const toPost = {
        id: Date.now,
        content: textareaValue,
        tags: [...arr],
      }
      Api.postNote(toPost)
    }

    setTextareaValue("")
    updateComponent(true)
    updateComponent(true)
  }

  const handleTextarea = (e) => {
    setTextareaValue(e.target.value)
    // setTextareaValue(e.target.textContent)
  }

  const clean = () => {
    setTextareaValue("")
    cleanProps()
  }

  return (
    <>
      <div className={styles.TeatareaDiv}>
        {textareaValue ? (
          <button className={styles.Clear} onClick={clean}>
            X
          </button>
        ) : null}

        <textarea className={styles.Textarea} onChange={handleTextarea} value={textareaValue}></textarea>
        {/* <div contentEditable="true" onChange={handleTextarea}>
        {textareaValue}
      </div> */}

        {/* <div contentEditable="true" onInput={(e) => handleTextarea(e)}>
        {textareaValue}
      </div> */}

        {textareaValue ? (
          <button className={styles.TextareaButton} onClick={() => saveChanges(note.id)}>
            Сохранить
          </button>
        ) : null}
      </div>
    </>
  )
}

// setTextareaValue(e.target.textContent)

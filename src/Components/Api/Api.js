const URL = "http://localhost:3004/notes/"

async function getNotes() {
  const response = await fetch("http://localhost:3004/notes/")
  const notes = await response.json()
  return notes
}

async function patchNote(id, data) {
  const response = await fetch(`http://localhost:3004/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response
}

async function deleteNote(id) {
  const response = await fetch(`http://localhost:3004/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return response
}

async function postNote(data) {
  const response = await fetch(`http://localhost:3004/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response
}

export default {
  getNotes,
  patchNote,
  deleteNote,
  postNote,
}

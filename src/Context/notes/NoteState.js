import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
    let noteInitial = [] 
    
      const [notes, setNotes] = useState(noteInitial)

       // Get all notes
       const getNotes=async ()=>{
        // API call
        const response = await fetch(`${host}/api/note/fetchAllNotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMzRiZDFlM2QxYTZhOTZmYjJjZWY3In0sImlhdCI6MTY3NzE1MTAzOH0.8tWSR3YXl5f6OwFOScCyNPPBZpzZZNos6dexWgcP_os"
          },
        });
        const json = await response.json()
        setNotes(json)
        }

      // Adding Note
      const addNote=async (title, description, tag)=>{
      // API call
      const response = await fetch(`${host}/api/note/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMzRiZDFlM2QxYTZhOTZmYjJjZWY3In0sImlhdCI6MTY3NzE1MTAzOH0.8tWSR3YXl5f6OwFOScCyNPPBZpzZZNos6dexWgcP_os"
        },
        body: JSON.stringify({title, description, tag}), 
      });
      let note={
          "_id": "6412cb2b5854a949bfe64e74",
          "user": "63f34bd1e3d1a6a96fb2cef7",
          "title": title,
          "description":description,
          "tag": tag,
          "date": "2023-03-16T07:54:19.065Z",
          "__v": 0
        }
        setNotes(notes.concat(note));
        console.log(notes)

      }
    
      // Delete Note
      const deleteNote=async (id)=>{
        // API call
      const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMzRiZDFlM2QxYTZhOTZmYjJjZWY3In0sImlhdCI6MTY3NzE1MTAzOH0.8tWSR3YXl5f6OwFOScCyNPPBZpzZZNos6dexWgcP_os"
        },
      });
        let newNotes= notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

      //Edit Note
      const editNote=async (id,title,tag,description)=>{
        // API call
        const response = await fetch(`${host}/api/note/updateNote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmMzRiZDFlM2QxYTZhOTZmYjJjZWY3In0sImlhdCI6MTY3NzE1MTAzOH0.8tWSR3YXl5f6OwFOScCyNPPBZpzZZNos6dexWgcP_os"
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json= response.json(); 
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
          
        }
      }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState
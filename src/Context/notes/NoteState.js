import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props)=>{
    let noteInitial = [
        {
          "_id": "6407ff5692ff9d65c236e7fa",
          "user": "63f34bd1e3d1a6a96fb2cef7",
          "title": "Urvish",
          "description": "Hello World from Ur20!!!!",
          "tag": "home",
          "date": "2023-03-08T03:21:58.529Z",
          "__v": 0
        },
        {
          "_id": "640801deef0d7327f6141ed1",
          "user": "63f34bd1e3d1a6a96fb2cef7",
          "title": "Greet",
          "description": "Hello World updated",
          "tag": "updated Hyy",
          "date": "2023-03-08T03:32:46.414Z",
          "__v": 0
        },
        {
          "_id": "6412cb1e5854a949bfe64e72",
          "user": "63f34bd1e3d1a6a96fb2cef7",
          "title": "Hellllo ",
          "description": "You should start learning angular",
          "tag": "ANGULAR",
          "date": "2023-03-16T07:54:06.130Z",
          "__v": 0
        },
        {
          "_id": "6412cb2b5854a949bfe64e74",
          "user": "63f34bd1e3d1a6a96fb2cef7",
          "title": "Hellllo ",
          "description": "You should start learning react",
          "tag": "REACT",
          "date": "2023-03-16T07:54:19.065Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(noteInitial)
    
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState
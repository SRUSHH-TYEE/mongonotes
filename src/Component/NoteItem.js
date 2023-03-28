import React,{useContext} from 'react'
import NoteContext from '../Context/notes/NoteContext';

function NoteItem(props) {
  const context=useContext(NoteContext)
  const {deleteNote,editNote}=context
  const { note, updateNote } = props;
  const deleteClickHandler=()=>{
    deleteNote(note._id)
  }
  

  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash-can" onClick={deleteClickHandler}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
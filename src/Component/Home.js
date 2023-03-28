import React, { useContext,useEffect,useState,useRef } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'


 function Home() {
  const [note,setNote]= useState({
    title:"",
    description:"",
    tag:""
})
  const { notes,getNotes,editNote } = useContext(NoteContext)
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const updateClickHandler=(e)=>{
  console.log("Updating the note",note)
  e.preventDefult()
}

const updateNote=(currentNote)=>{
    ref.current.click()
    setNote(currentNote)
}
const ref = useRef(null)
  return (
    <div>
      <AddNote/>
      {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
      </div>
      <div className="modal-body">
      <div className="container my-3">
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                
            </form>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={updateClickHandler}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} />
        })}
      </div>
    </div>
  )
}

export default Home
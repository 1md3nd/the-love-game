import React, { useState, useEffect } from 'react';
import { createNote, getNotes, deleteNote, updateNote } from '../../api/apis';
import Modal from 'react-modal';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    try {
      const newNote = await createNote({ title, description });
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTitle('');
      setDescription('');
      setModalIsOpen(false); // Close the modal after creating the note
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleUpdateNote = async (id) => {
    try {
      await updateNote(id, { title, description });
      fetchNotes(); // Refresh notes after update
      setEditNoteId(null); // Reset edit state
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditNoteId(note._id);
    setTitle(note.title);
    setDescription(note.description);
    setModalIsOpen(true); // Open the modal for editing
  };

  const handleSubmitNote = (e) => {
    setModalIsOpen(false);
    e.preventDefault();

    if (editNoteId) {
      // If editNoteId is present, it means we are updating an existing note
      handleUpdateNote(editNoteId);
    } else {
      // If editNoteId is null, it means we are creating a new note
      handleAddNote(e);
    }
  };
  return (
    <div>
      <h1>Notes</h1>
      <p>Welcome, You have {notes.length} notes.</p>
  
      {/* Display notes */}
      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            <button onClick={() => handleEditNote(note)}>Update</button>
          </div>
        ))}
      </div>
  
      {/* Create Note button */}
      <button
        onClick={() => {
          setEditNoteId(null);
          setTitle('');
          setDescription('');
          setModalIsOpen(true);
        }}
      >
        Create Note
      </button>
  
      {/* Modal for creating or editing a note */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel={editNoteId ? 'Edit Note Modal' : 'Create Note Modal'}
      >
        <h1>{editNoteId ? 'Edit Note' : 'Create Note'}</h1>
        <form onSubmit={handleAddNote}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">{editNoteId ? 'Save Changes' : 'Add Note'}</button>
        </form>
      </Modal>
    </div>
  );
  };

export default Notes;

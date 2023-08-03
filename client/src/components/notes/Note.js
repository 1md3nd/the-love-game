// Note.js

import React from 'react';

const Note = ({ title, description, onDelete, onEdit }) => {
  return (
    <div className="note">
      <h2 className="note-title">{title}</h2>
      <p className="note-description">{description}</p>
      <div className="note-buttons">
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;

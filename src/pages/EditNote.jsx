// EditNote.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useNotes } from '../context/NotesContext';

const EditNote = () => {
    const { id } = useParams(); // get the note ID from the URL
    const navigate = useNavigate(); // for navigation after saving
    const { notes, dispatch, ACTIONS } = useNotes();

    // Find the note that matches the ID, or default if not found
    const noteToEdit = notes.find((note) => note.id === id) || {
        title: '',
        content: '',
        category: 'General',
    };

    const [title, setTitle] = useState(noteToEdit.title);
    const [content, setContent] = useState(noteToEdit.content);
    const [category, setCategory] = useState(noteToEdit.category);

    // If note doesn't exist, go back to home
    useEffect(() => {
        if (!noteToEdit.title) {
            navigate('/');
        }
    }, [noteToEdit, navigate]);

    // Handle form submission to update the note
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch({
            type: ACTIONS.UPDATE_NOTE,
            payload: { id, title, content, category },
        });
        // navigate back to home
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">Edit Note</h2>
            <form onSubmit={handleUpdate} className="card bg-base-100 shadow-md p-4 space-y-4">
                <div>
                    <label className="block font-medium">Title:</label>
                    <input
                        type="text"
                        placeholder="Edit title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Content:</label>
                    <textarea
                        placeholder="Edit content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Ideas">Ideas</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-full">Save Changes</button>
            </form>
        </div>
    );
};

export default EditNote;
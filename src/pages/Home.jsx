// Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router';
import { useNotes } from '../context/NotesContext';
import ThemeToggle from "../context/ThemeToggle";
import { v4 as uuidv4 } from 'uuid';

// The Home component shows a form to create a note and a list of existing notes.
const Home = () => {
    const { notes, dispatch, ACTIONS } = useNotes();

    // Local state for the "Create a New Note" form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');

    // Handle form submission to add a new note
    const handleAddNote = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newNote = {
            id: uuidv4(),
            title,
            content,
            category,
        };

        dispatch({ type: ACTIONS.ADD_NOTE, payload: newNote });
        // Clear the fields after adding
        setTitle('');
        setContent('');
        setCategory('General');
    };

    // Handle note deletion
    const handleDelete = (id) => {
        dispatch({ type: ACTIONS.DELETE_NOTE, payload: id });
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Notes App</h1>
                <ThemeToggle className="p-7" />
            </div>
            {/* Form to create a new note */}
            <form onSubmit={handleAddNote} className="card bg-base-100 shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">Create a New Note</h2>
                <div className="mb-2">
                    <label className="block font-medium">Title:</label>
                    <input
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block font-medium">Content:</label>
                    <textarea
                        placeholder="Enter note content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div className="mb-4">
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
                <button type="submit" className="btn btn-primary w-full">Add Note</button>
            </form>

            {/* Display existing notes */}
            {notes.length === 0 && (
                <p className="text-lg">No notes available. Please add a note above.</p>
            )}
            {notes.map((note) => (
                <div key={note.id} className="card bg-base-100 shadow-md p-4 mb-4">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-sm text-gray-500">{note.category}</p>
                    <p className="mt-2">{note.content}</p>
                    <div className="mt-4 flex gap-2">
                        <Link to={`/edit/${note.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                        <button
                            onClick={() => handleDelete(note.id)}
                            className="btn btn-error btn-sm"
                        >
                            Delete
                        </button>
                    </div>

                </div>

            ))}

        </div>

    );
};

export default Home;
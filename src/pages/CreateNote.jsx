// CreateNote.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useNotes } from "../context/NotesContext";
import { v4 as uuidv4 } from "uuid";

const CreateNote = () => {
    const { dispatch } = useNotes();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("General");

    const categories = ["Work", "Personal", "General", "Ideas"];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newNote = { id: uuidv4(), title, content, category };
        dispatch({ type: "ADD_NOTE", payload: newNote });
        navigate("/");
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-white drop-shadow">Create Note</h1>
            {/* Use daisyUI card for form container with a light background */}
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 space-y-4">
                {/* DaisyUI input with input-bordered */}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                />
                {/* DaisyUI textarea */}
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea textarea-bordered w-full"
                />
                {/* DaisyUI select dropdown */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select select-bordered w-full"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {/* DaisyUI primary button */}
                <button type="submit" className="btn btn-primary w-full">
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default CreateNote;
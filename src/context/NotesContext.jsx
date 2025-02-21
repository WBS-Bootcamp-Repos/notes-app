// NotesContext.jsx
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // for unique IDs if needed outside

// ACTION types for clarity
const ACTIONS = {
    ADD_NOTE: 'ADD_NOTE',
    UPDATE_NOTE: 'UPDATE_NOTE',
    DELETE_NOTE: 'DELETE_NOTE',
};

// Initial state from localStorage or empty array
const initialState = JSON.parse(localStorage.getItem('notes')) || [];

// Reducer handles adding, updating, deleting notes
const notesReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_NOTE:
            return [...state, action.payload];
        case ACTIONS.UPDATE_NOTE:
            return state.map(note =>
                note.id === action.payload.id ? { ...note, ...action.payload } : note
            );
        case ACTIONS.DELETE_NOTE:
            return state.filter(note => note.id !== action.payload);
        default:
            return state;
    }
};

// Create Context
const NotesContext = createContext();

// NotesProvider: wraps the app and manages global note state
export const NotesProvider = ({ children }) => {
    const [notes, dispatch] = useReducer(notesReducer, initialState);

    // Persist notes to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <NotesContext.Provider value={{ notes, dispatch, ACTIONS }}>
            {children}
        </NotesContext.Provider>
    );
};

// Optional custom hook to use notes context
export const useNotes = () => useContext(NotesContext);
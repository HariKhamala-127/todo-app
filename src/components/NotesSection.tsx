import { useState } from "react";
import type { Note } from "../types/note";

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
}

function NotesSection({
  notes,
  onAddNote,
  onDeleteNote,
}: NotesSectionProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    onAddNote(text.trim());
    setText("");
  }

  return (
    <section className="notes-section">
      <h2>Notes</h2>

      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a note..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
        />

        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <article className="note-card" key={note.id}>
              <p>{note.text}</p>

              <small>
                {new Date(note.createdAt).toLocaleDateString()}
              </small>

              <button
                className="delete-button"
                onClick={() => onDeleteNote(note.id)}
              >
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default NotesSection;
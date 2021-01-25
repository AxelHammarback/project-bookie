import React, { useState } from 'react';
export const NewMemberForm = ({ fetchMembers }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isRead, setIsRead] = useState(false);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/books`, {
      method: 'POST',
      body: JSON.stringify({
        author: author,
        title: title,
        isRead,
      }),
    });
    fetchMembers();
  };

  return (
    <form>
      <h2>New Book:</h2>

      <section>
        <label for="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </section>
      <section>
        <label for="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section>
        <label for="isRead">Is read:</label>
        <input
          type="checkbox"
          name="isRead"
          id="isRead"
          value={isRead}
          onChange={(e) => setIsRead(e.target.value)}
        />
      </section>
      <button onClick={onFormSubmit}>Create</button>
    </form>
  );
};

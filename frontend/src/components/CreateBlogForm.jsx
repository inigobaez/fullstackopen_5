import { useState } from 'react'
const CreateBlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return <>
    <h2>create new</h2>
    <form onSubmit={handleCreateBlog}>
      <div>
        <label htmlFor='title'>Title</label>
        <input data-testid='title' id='title' type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor='author'>Author</label>
        <input data-testid='author' id='author' type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor='url'>Url</label>
        <input data-testid='url' id='url' type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>Create</button>

    </form>
    <br />
  </>
}
export default CreateBlogForm
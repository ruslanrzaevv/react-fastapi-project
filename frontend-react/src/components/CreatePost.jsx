import { useState } from 'react';
import axios from 'axios';

export default function CreateBlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState(1); // можно захардкодить или получать из логина
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author_id", authorId);
    if (image) {
      formData.append("image", image);
    }

    const token = localStorage.getItem('token');
    console.log('token:',token)

    try {
      await axios.post('http://localhost:8000/blogs/create-blog', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`  
        }
      })
      console.log(response.data);
      alert("Пост создан!");
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании поста");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Содержимое" value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Создать пост</button>
    </form>
  );
}

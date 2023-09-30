import { useState } from 'react';
export default function Form(props) {
  const [userForm, setUserForm] = useState({
    username: '',
    imgurl: '',
    content: '',
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { content } = userForm;
    if (!content.length > 0) return;
    await fetch('https://online-chat-backend-azure.vercel.app/api/addPost', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setUserForm({
      username: '',
      imgurl: '',
      content: '',
    });
    props.fetchAgain();
  };

  return (
    <form className='form' onSubmit={sendData}>
      <label htmlFor='username'>Usuário</label>
      <input
        onChange={onChangeForm}
        value={userForm.username}
        name='username'
        type='text'
        size='20'
      />
      <label htmlFor='content'>Mensagem*</label>
      <textarea
        onChange={onChangeForm}
        value={userForm.content}
        name='content'
        cols='25'
        rows='2'
      ></textarea>
      <label htmlFor='imgurl'>Avatar Url</label>
      <input
        onChange={onChangeForm}
        value={userForm.imgurl}
        name='imgurl'
        type='text'
        size='20'
      />
      {userForm.content.length > 0 && <button type='submit'>Enviar</button>}
    </form>
  );
}

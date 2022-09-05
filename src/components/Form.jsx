import { useState, useEffect } from 'react';
export default function Form(props){
    
    const [userForm, setUserForm] = useState({
        username: '',
        imgurl: '',
        content: ''
    })

    const onChangeForm = (e)=>{
        const {name, value} = e.target;
        setUserForm(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const sendData = async (e)=>{
        e.preventDefault();
        const btn = document.querySelectorAll('[type="submit"]');
        const spanResult = document.querySelector('.resultSpan');
        btn.forEach(b=>b.setAttribute('disabled', ''));
        spanResult.innerText='Loading...';
        const {content} = userForm;
        if (content.length > 0){
            const response = await fetch('https://chat-backend.onrender.com/addPost', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(userForm),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if((await response.json()).status==='ok'){
                spanResult.style.color='green';
                spanResult.innerText='Sucesso!';
                setTimeout(() => {
                    spanResult.style.color='black';
                    spanResult.innerText='';
                    btn.forEach(b=>b.removeAttribute('disabled', ''));
                }, 3000);
            }else{
                spanResult.style.color='red';
                spanResult.innerText='Houve alguma falha!';
                setTimeout(() => {
                    spanResult.style.color='black';
                    spanResult.innerText='';
                    btn.forEach(b=>b.removeAttribute('disabled', ''));
                }, 3000);
            }
            setUserForm({
                username: '',
                imgurl: '',
                content: ''
            })
        }
        props.fetchAgain();
    }

    useEffect(()=>{
        const btn = document.querySelectorAll('[type="submit"]');
        if (userForm.content.length > 0){
            btn.forEach(b=>b.removeAttribute('disabled', ''))
        } else {
            btn.forEach(b=>b.setAttribute('disabled', ''))
        }
    }, [userForm.content])

    return (
        <div>
            <div data-window-user-one>
                <form action="post" onSubmit={sendData}>
                    <div>
                        <label htmlFor="username">Usuário:</label>
                        <input onChange={onChangeForm} value={userForm.username} name="username" type="text" size="20" />
                    </div>
                    <div>
                        <label htmlFor="content">Mensagem:</label>
                        <textarea onChange={onChangeForm} value={userForm.content} name="content" cols="25" rows="2"></textarea>
                    </div>
                    <label htmlFor="imgurl">Avatar Url:</label>
                    <input onChange={onChangeForm} value={userForm.imgurl} name="imgurl" type="text" size="20"/>
                    <div>
                        <span className="resultSpan"></span>
                        <button type="submit" className="smallSendButton" data-button>Enviar</button>
                    </div>
                </form>
            </div>
            <button className="bigSendButton" onClick={sendData} type="submit" data-button>Enviar</button>
        </div>
    )
}
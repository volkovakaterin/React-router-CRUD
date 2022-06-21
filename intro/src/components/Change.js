import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Change(props) {
    //console.log(props.);
    const[form, setForm] = useState('');
    const [post, setPost] = useState();
    //let post;
    let postCard;
    const saveChange =(id, e) =>{
console.log("save");
console.log(form);
const obj = { id: id , content: form }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/posts');
    xhr.addEventListener('readystatechange', function () {
      //Проверим состояние запроса, нас интересует случай когда он завершен ( DONE )
      if (xhr.readyState === 4) {
        //Дальше проверим какой код ответа нам выдал сервер
        if (xhr.status === 200) {
          //Если попали сюда, значит можно выполнить функцию, которую вам нужно
          console.log("200");
        }
      }
    }, false);
    const jsonstring = JSON.stringify(obj);
    console.log(jsonstring)
    xhr.send(jsonstring);
    }
    useEffect(() => {
        function loading() {
            fetch("http://localhost:8000/posts")
              .then(res => res.json())
              .then(
                (result) => {
                  let  pst = result.filter(pst => pst.id === props.changeID)[0];
                  setPost(pst);
                  setForm(pst.content)
                },
                (error) => {
                  setPost(error);
                }
              )
          }  return function cleanup() {
        loading()
      };
    }, [])
    
    const handlePostChange =(evt)=>{
        setForm(evt.target.value)
    }
     
        console.log(post);
        if(typeof post === 'object') {
         postCard = 
    <div key={post.id} className='post'>
            <div className='change-title'>
                <div className='name-change-title'>Редактировать пост</div>
                <Link to={`/post/${post.id}`} className='cancel'>
                 <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 47.095 47.095" style={{ width: '20px', height: '20px', enableBackground: "new 0 0 47.095 47.095"}} xmlSpace="preserve">
<g>
	<path d="M45.363,36.234l-13.158-13.16l12.21-12.21c2.31-2.307,2.31-6.049,0-8.358c-2.308-2.308-6.05-2.307-8.356,0l-12.212,12.21
		L11.038,1.906c-2.309-2.308-6.051-2.308-8.358,0c-2.307,2.309-2.307,6.049,0,8.358l12.81,12.81L1.732,36.831
		c-2.309,2.31-2.309,6.05,0,8.359c2.308,2.307,6.049,2.307,8.356,0l13.759-13.758l13.16,13.16c2.308,2.308,6.049,2.308,8.356,0
		C47.673,42.282,47.672,38.54,45.363,36.234z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>   
                </Link>
                
            </div>
            <form className='form'>
        <input className='input-change' id="name" name="name" value={form} onChange={handlePostChange}/>
      </form>
            <div className="post-hat">
              <div className="photo" style={{backgroundImage: `url(${post.photo})`}}></div>
              <div className="name">{post.name}</div>
              <div className="created">{post.created}</div>
            </div>
            <Link to={`/post/${post.id}`} onClick={(e) => saveChange(post.id, e)}>
            <button className='save'>Сохранить</button>
            </Link>
          </div>   
        }
        
    
    return(
        <>
        {postCard}
        </>
        
        )
}
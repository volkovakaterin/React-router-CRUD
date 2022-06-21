import React, { useState, useEffect } from 'react';
import useJsonFetch from '../hooks/useJsonFetch';
import { Link } from "react-router-dom";

export default function Post(props) {
    const posts = useJsonFetch();
    let post;
    let postCard;
    const deletePost=(id, e)=>{
        console.log("deletePost");
        fetch("http://localhost:8000/posts", {
method: 'DELETE',
headers: {'Content-type': 'application/x-www-form-urlencoded'},
body: JSON.stringify(id)
    }).then(response=> response.json()).then(response=> console.log(response))
    }
    if(typeof posts === "object"){post = posts.filter(pst => pst.id === props.lookID)[0]
        postCard = 
    <div key={post.id} className='post'>
            <div className="post-hat">
              <div className="photo" style={{backgroundImage: `url(${post.photo})`}}></div>
              <div className="name">{post.name}</div>
              <div className="created">{post.created}</div>
            </div>
            <div className='content'>{post.content}</div>
            <div className='bottom'>
            <Link to={`/post/${post.id}/change`}>
            <button className='change'>Изменить</button>
            </Link>
            <Link to='/' onClick={(e) => deletePost(post.id, e)}>
            <button className='delete'>Удалить</button>
            </Link>
            </div>
          </div>
    }
    const changePost=(id, e)=>{
        e.preventDefault();
        console.log("changePost");
    }
    
    return(
        <>
        {console.log(posts)}
        {console.log(props.lookID)}
        {console.log(post)}
        {postCard}
        </>
        
    )
}
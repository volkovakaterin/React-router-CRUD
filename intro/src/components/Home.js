import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { nanoid } from 'nanoid';

export default function Home(props) {
    const [statePosts, setPosts] = useState();
    const [form, setForm] = useState('');
    function loadingPosts() {
        fetch("http://localhost:8000/posts")
          .then(res => res.json())
          .then(
            (result) => {
              setPosts(result);
              console.log(result)
            },
            (error) => {
              setPosts(error);
            }
          )
      }
      let posts;
      const lookPost = (id, e)=>{
console.log('lookPost');
props.onLookPost(id);
      }
      const handlePostChange =(evt) => {
        setForm(evt.target.value)
      }
      const createPost = (evt) => {
        evt.preventDefault();
        console.log('создать пост');
      }
      useEffect(() => {
        console.log("first")
        loadingPosts();
        return function cleanup() {
          loadingPosts()
        };
      }, []);
      if (typeof statePosts === 'object') {
        posts = statePosts.map((post) =>
          <Link to={`/post/${post.id}`} key={post.id}>
          <div className='post' onClick={(e) => lookPost(post.id, e)}>
            <div className="post-hat">
              <div className="photo" style={{backgroundImage: `url(${post.photo})`}}></div>
              <div className="name">{post.name}</div>
              <div className="created">{post.created}</div>
            </div>
            <div className='content'>{post.content}</div>
          </div>
          </Link>
          );
      }
    return(
      <>
        <Link to='/post/new'>
          <button className='create'>Создать пост</button>
        </Link>
      <div className="ribbon">
            {posts}
        </div>
        
      </>
        
    )
}

import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
    const [statePosts, setPosts] = useState();
    function loadingPosts() {
        fetch("http://localhost:8000/posts")
          .then(res => res.json())
          .then(
            (result) => {
              setPosts(result);
            },
            (error) => {
              console.log(error);
            }
          )
      }
      let posts;
      const lookPost = (id, e)=>{
props.onLookPost(id);
      }
      useEffect(() => {
        return loadingPosts()
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

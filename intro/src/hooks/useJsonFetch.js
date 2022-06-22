import  { useState, useEffect } from 'react';

function useJsonFetch(){
    const [posts, setPosts] = useState('');
    useEffect(() => {
        function loading() {
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
          }  return loading()
         }, [])
    
    return posts
}

export default useJsonFetch;
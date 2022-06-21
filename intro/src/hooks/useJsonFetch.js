import React, { useState, useEffect } from 'react';

function useJsonFetch(){
    const [posts, setPosts] = useState('');
    useEffect(() => {
        function loading() {
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
          }  return function cleanup() {
        loading()
      };
    }, [])
    
    return posts
}

export default useJsonFetch;
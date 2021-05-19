import {useEffect, useReducer, useState} from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {...state, posts: action.payload}
        case 'SET_POST':
            return {...state, post: action.payload}
        case 'SET_POST_ID':
            return {...state, postId: action.payload}
    }

}

export default function ControlledPosts() {
    let [state, dispatch] = useReducer(reducer, {posts: [], post: null, postId: 0});
    let {posts, post, postId} = state
    // let [posts, setPosts] = useState([]);
    // let [post, setPost] = useState(null);
    // let [postId, setPostId] = useState(0);
    const fetchPosts = async () => {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts')
        const json = await resp.json()
        dispatch({type: 'SET_POSTS', payload: json})
    }
    const fetchSinglePost = async () => {
        if (postId > 0) {
            const resp = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
            const json = await resp.json()
            dispatch({type: 'SET_POST', payload: json})
        }

    }

    useEffect(() => {
        fetchPosts()
    }, [])
    useEffect(() => {
        if (postId > 0) {
            fetchSinglePost()
        }
    }, [postId])

    const select = (e) => {
        dispatch({type: 'SET_POST_ID', payload: e.target.value})
    }

    const getDetails = (e) => {
        e.preventDefault()
        console.log(e.target.post.value)
    }

    return (
        <div>
            <form onSubmit={getDetails}>
                <select name="post" onChange={select}>
                    {
                        posts.map(value => <option value={value.id}>{value.title}</option>)
                    }
                </select>

            </form>

            <div>
                {
                    post && <div>{JSON.stringify(post)}</div>
                }
            </div>


        </div>
    )
}
import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from "axios";
import Notification from "./components/Notification.jsx";
import NewPost from "./components/NewPost.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationIsError, setNotificationIsError] = useState(false)

    useEffect(() => {
        const cachedUser = JSON.parse(localStorage.getItem('user'));
        if (cachedUser) {
            setUser(cachedUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            blogService.getAll(user.token).then(blogs =>
                setBlogs(blogs.sort(function (a, b) {
                    return b.likes - a.likes;
                }))
            )
        }
    }, [user])

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    function login(event) {
        event.preventDefault();
        const username = event.target["username"].value
        const password = event.target["password"].value
        axios.post("http://localhost:3003/api/login", {username: username, password: password}).then((r) => {
            setUser(r.data);
        }).catch((e) => {
            setNotificationMessage(`wrong username or password`);
            setNotificationIsError(true);
        })
    }

    function logout(event) {
        event.preventDefault();
        setUser(null);
    }

    if (user) {
        return (
            <div>
                <h2>blogs</h2>
                <Notification message={notificationMessage} isError={notificationIsError}/>
                <span>{user.name} logged in</span>
                <button id="logout" onClick={logout}>logout</button>
                <br/>
                <br/>
                <NewPost user={user} setNotificationMessage={setNotificationMessage}
                         setNotificationIsError={setNotificationIsError} setBlogs={setBlogs}/>
                <br/>
                <br/>
                <div id="postContainer">
                    {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs}/>)}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification message={notificationMessage} isError={notificationIsError}/>
                <form data-testid="loginForm" onSubmit={login}>
                    username <input id="loginUsername" data-testid="loginUsername" name="username"/> <br/>
                    password <input id="loginPassword" data-testid="loginPassword" name="password"/> <br/>
                    <button id="loginSubmit" data-testid="loginSubmit" type="submit">login</button>
                </form>
            </div>
        )
    }
}

export default App
import {useState} from "react";
import blogService from "../services/blogs.js";

const NewPost = (props) => {
    const [newPostEditable, setNewPostEditable] = useState(false)

    function handleChangeEditable() {
        setNewPostEditable(!newPostEditable);
    }

    function createPost(event) {
        event.preventDefault();
        const title = document.getElementById("newTitle").value
        const author = document.getElementById("newAuthor").value
        const url = document.getElementById("newUrl").value
        if (props.mockMethodWhyMakeMeDoThis) {
            props.mockMethodWhyMakeMeDoThis(props.user.token, {
                    "title": title,
                    "author": author,
                    "url": url
                }
            )
        } else {
            blogService.createPost(props.user.token, {
                "title": title,
                "author": author,
                "url": url,
                "user": props.user
            }).then(() => {
                props.setNotificationMessage(`a new blog ${title} by ${author} added`);
                props.setNotificationIsError(false);
                setTimeout(() => {
                    props.setNotificationMessage("");
                }, 5000);
                blogService.getAll(props.user.token).then(blogs =>
                    props.setBlogs(blogs)
                )
                setNewPostEditable(false);
            })
        }
    }

    return (
        <>
            {newPostEditable ? (<>
                <h2>create new</h2>
                <form onSubmit={createPost}>
                    title <input data-testid="newTitle" id="newTitle" name="title"/> <br/>
                    author <input data-testid="newAuthor" id="newAuthor" name="author"/> <br/>
                    url <input data-testid="newUrl" id="newUrl" name="url"/>
                    <br/>
                    <button data-testid="submitNewPost" id="submitNewPost" type="submit">create</button>
                    <button onClick={handleChangeEditable}>cancel</button>
                </form>
            </>) : (<button id="newPostEditable" data-testid="newPostEditable" onClick={handleChangeEditable}>new
                post</button>)}
        </>
    )
}

export default NewPost
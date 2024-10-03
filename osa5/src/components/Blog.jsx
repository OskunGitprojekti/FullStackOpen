import {useState} from "react";
import blogService from '../services/blogs'

const Blog = ({blog, user, blogs, setBlogs, mockMethodWhyMakeMeDoThis}) => {
    const [detailedView, setDetailedView] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    function handleDetailedView() {
        setDetailedView(!detailedView);
    }

    const borderStyle = {
        "borderStyle": "solid", padding: "2px 4px"
    }

    function addLike() {
        if (mockMethodWhyMakeMeDoThis) {
            mockMethodWhyMakeMeDoThis();
        } else {
            const post = {
                author: blog.author,
                title: blog.title,
                url: blog.url,
                likes: likes + 1,
                user: user,
                id: blog.id
            }
            blogService.updatePost(user.token, post).then((r) => {
                setLikes(likes + 1);
                let tempBlogs = blogs.filter((post) => post.id !== blog.id);
                blog.likes = likes;
                tempBlogs.push(blog);
                setBlogs(tempBlogs.sort(function (a, b) {
                    return b.likes - a.likes;
                }));
            })
        }
    }

    function removePost() {
        blogService.removePost(user.token, blog).then((r) => {
            let tempBlogs = blogs.filter((post) => post.id !== blog.id);
            setBlogs(tempBlogs.sort(function (a, b) {
                return b.likes - a.likes;
            }));
        })
    }

    return (
        <>
            {detailedView ? (
                <>
                    <div style={borderStyle} data-testid="blogElement" data-likes={likes}>
                        <div id="title">{blog.title}
                            <button className="showDetailsButton" data-testid="showDetailsButton" id="showDetailsButton"
                                    onClick={handleDetailedView}>hide
                            </button>
                        </div>
                        <div id="url">{blog.url}</div>
                        <div data-testid="likes" id="likes">{likes}
                            <button data-testid="addLikeButton" id="addLikeButton" onClick={addLike}>like</button>
                        </div>
                        <div id="author">{blog.author}</div>
                        {user.username === blog.user.username &&
                            <button data-testid="removePostButton" id="removePostButton"
                                    onClick={removePost}>remove</button>
                        }
                    </div>
                </>
            ) : (
                <>
                    <div data-testid="blogElement" data-likes={likes}><span id="title">{blog.title}</span> <span
                        id="author">{blog.author}</span>
                        <button className="showDetailsButton" data-testid="showDetailsButton" id="showDetailsButton"
                                onClick={handleDetailedView}>view
                        </button>
                    </div>

                </>)}
        </>
    )
}

export default Blog
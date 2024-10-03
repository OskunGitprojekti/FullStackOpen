const totalLikes = (blogs) => {
    let total = 0;
    blogs.forEach((blog) => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0];
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let authorsToBlogs = new Map();
    blogs.forEach((blog) => {
        if (authorsToBlogs.has(blog.author)) {
            authorsToBlogs.set(blog.author, authorsToBlogs.get(blog.author) + 1)
        } else {
            authorsToBlogs.set(blog.author, 1)
        }
    })
    return Array.from(authorsToBlogs.keys()).reduce(function (a, b) {
        return authorsToBlogs.get(a) > authorsToBlogs.get(b) ? a : b
    });
}

const mostLikes = (blogs) => {
    let authorsToLikes = new Map();
    blogs.forEach((blog) => {
        if (authorsToLikes.has(blog.author)) {
            authorsToLikes.set(blog.author, authorsToLikes.get(blog.author) + blog.likes)
        } else {
            authorsToLikes.set(blog.author, blog.likes)
        }
    })
    return Array.from(authorsToLikes.keys()).reduce(function (a, b) {
        return authorsToLikes.get(a) > authorsToLikes.get(b) ? a : b
    });
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
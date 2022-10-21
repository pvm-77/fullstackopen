const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogposts) => {
    // user define reducer function for total count
    const totalLikesCountReducer = (totalLikes, blog) => {
        totalLikes = totalLikes + blog.likes
        return totalLikes
    }
    return blogposts.length === 0 ? 0 : blogposts.reduce(totalLikesCountReducer, 0)

}



const favoriteBlog = (blogposts) => {
    // return blog having most number of count
    const mostLiked = Math.max(...blogposts.map(blog => blog.likes))
    const blogMostLiked = blogposts.filter(blog => blog.likes === mostLiked)
    return blogMostLiked[0]

}


const frequencyCounter = (blogs, authorName) => {
    let counter = 0
    for (let index = 0; index < blogs.length; index++) {
        if (blogs[index].author === authorName) counter++;
    }
    return counter
}
const mostBlogs = (blogs) => {
    let maxCounter = 0
    let authorNameWithMaxblog = ''
    // initial blogger
    const blogger = {
        author: '',
        blogs: 0
    }
    for (let index = 0; index < blogs.length; index++) {
        let counter = frequencyCounter(blogs, blogs[index].author)
        // console.log(`${blogs[index].author} :${counter}`);
        if (maxCounter < counter) {
            maxCounter = counter;
            authorNameWithMaxblog = blogs[index].author

        }
    }
    console.log(`author:${authorNameWithMaxblog} blogs:${maxCounter}`);
    blogger.author = authorNameWithMaxblog
    blogger.blogs = maxCounter
    return blogger
    // find the most frequently repeated author name

}

const mostLikes = (blogs) => {
    const maxLikes = {
    }
    const mostLikedAuthor = {
        author: '',
        likes: 0
    }
    for (let index = 0; index < blogs.length; index++) {
        // if key exist in object 
        if (maxLikes[blogs[index].author]) {
            maxLikes[blogs[index].author] = maxLikes[blogs[index].author] + blogs[index].likes
            if (maxLikes[blogs[index].author] >= mostLikedAuthor.likes) {
                mostLikedAuthor.likes = maxLikes[blogs[index].author];
                mostLikedAuthor.author = blogs[index].author;
            }
        } else {
            // set key in variable object
            maxLikes[blogs[index].author] = blogs[index].likes;

        }
    }
    return mostLikedAuthor




}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
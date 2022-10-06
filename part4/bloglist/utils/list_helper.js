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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
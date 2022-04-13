const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }
 
const totalLikes = (blogs) => {
    const reducer = (accumulator, obj) => {
        return accumulator + obj.likes
    }

    return blogs.reduce(reducer, 0)
}

const favBlog = (blogs) => {
    let mostLikes = Math.max(...blogs.map(b => b.likes))
    let favBlog = blogs.find(blog => blog.likes === mostLikes)
    
    return (({ title, author, likes }) => ({ title, author, likes }))(favBlog)
}

const mostBlogs = (blogs) => {
    let authors = _.map(blogs, 'author');
    let authorWithMostBlogs = _.chain(authors).countBy().toPairs().sortBy(1).last().value();

    return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] }
}

const mostLikes = (blogs) => {
    let authorWithMostLikes = _(blogs)
        .groupBy('author')
        .map((array, author) => ({ author, likes: _.sumBy(array, 'likes')}))
        .sortBy('likes')
        .last()

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favBlog,
    mostBlogs,
    mostLikes
}
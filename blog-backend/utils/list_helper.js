const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if(blogs.length === 0) {
    return 0
  } else if(blogs.length === 1) {
    return blogs[0].likes 
  } else {
    const total = blogs.reduce((acumulador, actual) => acumulador + actual.likes, 0)
    return total;
  }
}

const mostLike = (blogs) => {
  const mostLiked = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  };
}

module.exports = {
  dummy,
  totalLikes,
  mostLike
}
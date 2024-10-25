const renderPosts = (req, res) => {
    if (req.user) {
        fetch('http://localhost:3000/post/read', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'authorization': `Bearer ${req.user.token}`
            }
        })
        .then(response => response.json())
        .then(posts => {
            console.log(posts);
            res.render("post", { posts: posts });
        })
        .catch(error => console.error(error));
    } else {
        res.redirect("/login");
    }
    
};

const renderCreatePost = (req, res) => {
    if (req.user) {
        
    } else {
        res.redirect("/login");
    }
}

module.exports = {
    renderPosts,
}
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
        res.render('createPost');
    } else {
        res.redirect("/login");
    }
};

const createPost = (req, res) => {
    console.log(req.user);

    fetch(`http://localhost:3000/post/create/${req.user.profile.id}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'authorization': `Bearer ${req.user.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: req.body.title,
            text: req.body.text,
        }),
    })
        .then(response => {
            res.redirect("/posts");
        })
        .catch(error => console.error(error));
};

module.exports = {
    renderPosts,
    renderCreatePost,
    createPost,
}
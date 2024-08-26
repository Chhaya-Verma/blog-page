// CKEditor initialization
CKEDITOR.replace('editor');

document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const blogContent = CKEDITOR.instances.editor.getData();

    if (blogContent) {
        const blogPost = {
            content: blogContent,
            date: new Date().toISOString()
        };

        let posts = JSON.parse(localStorage.getItem('blogs')) || [];
        posts.push(blogPost);
        localStorage.setItem('blogs', JSON.stringify(posts));

        alert("Blog posted successfully!");

        document.getElementById('blogForm').reset();
        CKEDITOR.instances.editor.setData('');
    } else {
        alert("Please write your blog before posting.");
    }
});

document.getElementById('viewBlogs').addEventListener('click', function() {
    window.location.href = 'blog.html';
});

// Script for viewing the blogs in `postblog.html`
document.addEventListener('DOMContentLoaded', function() {
    const blogContainer = document.getElementById('blogContainer');

    let posts = JSON.parse(localStorage.getItem('blogs')) || [];

    posts.forEach(post => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-post');

        // Create blog content element
        const blogContent = document.createElement('div');
        blogContent.innerHTML = post.content;

        // Create actions (like, comment, share) container
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        // Like button
        const likeButton = document.createElement('button');
        likeButton.innerText = 'Like';
        likeButton.addEventListener('click', function() {
            alert('Liked!');
        });

        // Comment button
        const commentButton = document.createElement('button');
        commentButton.innerText = 'Comment';
        commentButton.addEventListener('click', function() {
            const comment = prompt('Enter your comment:');
            if (comment) {
                alert('Comment added: ' + comment);
            }
        });

        // Share button
        const shareButton = document.createElement('button');
        shareButton.innerText = 'Share';
        shareButton.addEventListener('click', function() {
            alert('Shared!');
        });

        // Append buttons to actions container
        actionsDiv.appendChild(likeButton);
        actionsDiv.appendChild(commentButton);
        actionsDiv.appendChild(shareButton);

        // Append blog content and actions to blogDiv
        blogDiv.appendChild(blogContent);
        blogDiv.appendChild(actionsDiv);

        // Append blogDiv to blogContainer
        blogContainer.appendChild(blogDiv);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('loggedIn')) {
        alert("Please log in first!");
        window.location.href = 'login.html';
        return;
    }

    loadPosts();

    // Scroll to specific post if postId is present
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');
    if (postId) {
        document.getElementById(`post-${postId}`).scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById('blog-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('blog-title').value;
        const content = document.getElementById('blog-content').value;
        const username = getUsername();

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content, username, likes: 0, comments: [] });
        localStorage.setItem('posts', JSON.stringify(posts));

        document.getElementById('blog-form').reset();
        loadPosts();
    });
});

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const blogPostsContainer = document.getElementById('blog-posts');
    blogPostsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.id = `post-${index}`;

        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>Posted by: ${post.username}</p>
            <p>Likes: ${post.likes}</p>
            <button onclick="likePost(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
            </button>
            <div>
                <h4>Comments</h4>
                <div>${post.comments.map(comment => `<p>${comment}</p>`).join('')}</div>
                <input type="text" placeholder="Add a comment" id="comment-${index}">
                <button onclick="addComment(${index})">Comment</button>
            </div>
        `;

        blogPostsContainer.appendChild(postElement);
    });
}

function likePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts[index].likes += 1;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();function likePost(index) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].likes += 1;
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }
}

function addComment(index) {
    const commentInput = document.getElementById(`comment-${index}`);
    const commentText = commentInput.value;
    if (commentText) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts[index].comments.push(commentText);
        localStorage.setItem('posts', JSON.stringify(posts));
        commentInput.value = '';
        loadPosts();
    }
}

function getUsername() {
    return localStorage.getItem('username') || 'Anonymous';
}
 
function goBack(){
    window.location.href = "blog.html"
}



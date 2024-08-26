// Function to load and display blogs from localStorage
function loadBlogs() {
    const blogList = document.getElementById('blogList');
    const posts = JSON.parse(localStorage.getItem('blogs')) || [];

    if (posts.length === 0) {
        blogList.innerHTML = '<p>No blog posts available.</p>';
    } else {
        posts.forEach(post => {
            const blogDiv = document.createElement('div');
            blogDiv.classList.add('blog-post');
            
            const blogContent = `
                <h2>User ID: ${post.id}</h2>
                <p>${new Date(post.date).toLocaleDateString()}</p>
                <div>${post.content}</div>
            `;
            
            blogDiv.innerHTML = blogContent;
            blogList.appendChild(blogDiv);
        });
    }
}

// Load blogs when the page is loaded
window.onload = loadBlogs;

// Redirect to create blog page
document.getElementById('createBlog').addEventListener('click', function() {
    window.location.href = 'create-blog.html';
});

// Back to form page
document.getElementById('backToForm').addEventListener('click', function() {
    window.location.href = 'postblog.html';
});

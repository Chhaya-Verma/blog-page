// CKEditor initialization
CKEDITOR.replace('editor');

// Display the user name from local storage
document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('userName').textContent = userName;
    } else {
        document.getElementById('userName').textContent = 'Guest';
    }
});

document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userName = localStorage.getItem('userName');
    const blogContent = CKEDITOR.instances.editor.getData();

    if (userName && blogContent) {
        const blogPost = {
            userName: userName,
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
        alert("Please enter your User Name and write your blog before posting.");
    }
});

document.getElementById('backToHome').addEventListener('click', function() {
    window.location.href = 'home.html';
});

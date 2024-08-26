document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog');
    const apiKey = '095a2ae6e94e498d9360f0f75396bffa'; // Replace with your News API key

    // Function to fetch blogs with dynamic query
    const fetchBlogs = (query = 'blog') => {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                blogContainer.innerHTML = '';
                const articles = data.articles;
                articles.forEach(article => {
                    const blogPost = document.createElement('div');
                    blogPost.classList.add('blog-post');
                    blogPost.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                        <button class="save-blog">Save Blog</button>
                        <button class="like-blog">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                        </button>
                        <span class="like-count">0</span> Likes
                    `;
                    blogContainer.appendChild(blogPost);

                    // Add event listener to save blog button
                    blogPost.querySelector('.save-blog').addEventListener('click', () => {
                        saveBlog(article);
                    });

                    // Add event listener to like blog button
                    blogPost.querySelector('.like-blog').addEventListener('click', (e) => {
                        toggleLike(e.currentTarget);
                    });
                });
            })
            .catch(error => console.error('Error fetching the blogs:', error));
    };

    const saveBlog = (article) => {
        let savedBlogs = JSON.parse(localStorage.getItem('savedBlogs')) || [];
        savedBlogs.push(article);
        localStorage.setItem('savedBlogs', JSON.stringify(savedBlogs));
    };

    const removeBlog = (index) => {
        let savedBlogs = JSON.parse(localStorage.getItem('savedBlogs')) || [];
        savedBlogs.splice(index, 1); // Remove the blog at the specified index
        localStorage.setItem('savedBlogs', JSON.stringify(savedBlogs));
        displaySavedBlogs();
    };

    const displaySavedBlogs = () => {
        const savedBlogs = JSON.parse(localStorage.getItem('savedBlogs')) || [];
        blogContainer.innerHTML = '';
        savedBlogs.forEach((article, index) => {
            const blogPost = document.createElement('div');
            blogPost.classList.add('blog-post');
            blogPost.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Read more</a>
                <button class="remove-blog" data-index="${index}">Remove</button>
            `;
            blogContainer.appendChild(blogPost);

            // Add event listener to remove blog button
            blogPost.querySelector('.remove-blog').addEventListener('click', () => {
                removeBlog(index);
            });
        });
    };

    const toggleLike = (likeButton) => {
        const likeCountSpan = likeButton.nextElementSibling;
        let currentLikes = parseInt(likeCountSpan.textContent);

        if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            likeCountSpan.textContent = currentLikes - 1;
            likeButton.querySelector('svg').style.fill = 'currentColor'; // Reset heart color
        } else {
            likeButton.classList.add('liked');
            likeCountSpan.textContent = currentLikes + 1;
            likeButton.querySelector('svg').style.fill = 'red'; // Change heart color to red
        }
    };

    fetchBlogs(); // Initial fetch with default query

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        fetchBlogs(query);
    });

    const categories = document.querySelectorAll('.categories li');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryQuery = category.getAttribute('data-category');
            fetchBlogs(categoryQuery);
        });
    });

    const savedBlogsButton = document.getElementById('savedBlogs');
    savedBlogsButton.addEventListener('click', displaySavedBlogs);
});

function redirectToOtherPage() {
    window.location.href = "writeblog.html"; // Replace with your target page
}

function viewprofile(){
    window.location.href = "userprofile.html";
}


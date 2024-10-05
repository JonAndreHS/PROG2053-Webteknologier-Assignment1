let limit = 15;
let offset = 0;
let isLoading = false;


function fetchPosts() {
    if (isLoading) return;
    isLoading = true;

    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((posts) => {
            let container = document.getElementById("main-container");

            for (const post of posts) {
                const article = document.createElement("article");
                const title = document.createElement("h1");
                title.textContent = post.title;

                const body = document.createElement("p");
                body.textContent = post.body;

                article.appendChild(title);
                article.appendChild(body);
                container.appendChild(article);

                if (container.children.length % 3 === 0) {
                    const clearfix = document.createElement("div");
                    clearfix.setAttribute("class", "clearfix");
                    container.appendChild(clearfix);
                }
            }

            offset += limit;
            limit = 3;
            isLoading = false;
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
            isLoading = false;
        });
}

function checkScrollPosition() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchPosts();
    }
}

window.addEventListener("scroll", checkScrollPosition);

fetchPosts()

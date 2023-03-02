const fetchCategories = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=> {
        if (data?.status){
            showCategories(data.data);
        }
        else{
            alert('data not fund')
        };
    });

}
const showCategories = data => {
    // console.log(data)
    const categoriesContainer = document.getElementById('categories-container');
    // console.log(data)
    data.news_category.forEach(category =>{
        // console.log(category.category_name);
        categoriesContainer.innerHTML += `<a onclick="fetchCategoryNews('${category.category_id}' , '${category.category_name}')" class="nav-link" href="#">${category?.category_name}</a>`
        
    });
}
const fetchCategoryNews = (category_id , category_name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showAllNews(data.data , category_name));
}
const showAllNews = (data , category_name) =>{
    console.log(data);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "";
    data.forEach(news => {
        const {thumbnail_url , title , details , author , total_view , rating} = news;
        const d = new Date(author.published_date).toDateString();
        const div = document.createElement('div');
        div.classList.add("card" , "mb-3");
        div.innerHTML= `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                    <div class="col-md-8 d-flex flex-column ">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p>${details.slice(0 , 220)}...</p>
                        </div>
                        <div class="card-footer border-0 bg-body d-flex justify-content-between w-100">
                            <div class="d-flex gap-2">
                                <img src=${author.img} class="img-fluid rounded-circle" alt="..." height="40" width="40"/>
                                <div>
                                  <p class="m-0 p-0">${author.name ? author.name : "Not available" }</p>
                                  <p class="m-0 p-0">${d}</p>
                                </div> 
                            </div> 
                            <div class="d-flex align-items-center gap-2">
                                <i class="fa-solid fa-eye"></i>
                                <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
                            </div>
                            <div class="d-flex gap-2 align-items-center" >
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <p class="m-0 p-0">${rating.number ? rating.number : "Not available"}</p>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>   
                </div>
        `  
        newsContainer.appendChild(div);
    });
}

fetchCategories();
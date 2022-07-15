//Open Menu Mobile
const menuButton = document.querySelector(".bxs-chevron-down");
const menuContainer = document.querySelector("#menu-container");

menuButton.addEventListener("click", () => {
  if (menuButton.style.transform == "rotate(180deg)") {
    menuButton.style.animation = "rotateArrowDown 0.8s";
    menuButton.style.transform = "rotate(0deg)";
    menuContainer.classList.add("hidden");
  } else {
    menuButton.style.animation = "rotateArrowUp 0.8s";
    menuButton.style.transform = "rotate(180deg)";
    menuContainer.classList.remove("hidden");
  }
});

//Limit
let limit = 10;

//Filter Limit
if (screen.width > 600 && screen.width < 900) {
  limit = 12;
} else if (screen.width <= 600) {
  limit = 24;
}

//Title
let title = "";

//Pagination
let currentPage = 1;
let totalPage = 1;

const currPageContainer = document.querySelectorAll(".pagination-input");
function changeCurrentPage(currentPage) {
  currPageContainer.forEach((x) => {
    x.innerHTML = currentPage;
  });
}

changeCurrentPage(currentPage);

const totalPageContainer = document.querySelectorAll(".total-pages");
function changeTotalPage(totalPage) {
  totalPageContainer.forEach((x) => {
    x.innerHTML = totalPage;
  });
}

changeTotalPage(totalPage);

//Prev Page Button
const prev = document.querySelectorAll(".bxs-chevron-left");
prev.forEach((x) => {
  x.addEventListener("click", function () {
    currentPage == 1 ? currentPage : currentPage--;
    changeCurrentPage(currentPage);
    renderCard(limit, order, type, status, title, currentPage);
  });
});

/* Next Page Button */
const next = document.querySelectorAll(".bxs-chevron-right");
next.forEach((x) => {
  x.addEventListener("click", function () {
    currentPage == totalPage ? currentPage : currentPage++;
    changeCurrentPage(currentPage);
    renderCard(limit, order, type, status, title, currentPage);
  });
});

//Order
const orderList = [
  "favorites",
  "rank",
  "popularity",
  "volumes",
  "title",
  "scores",
];
let order = orderList[0];
const orderContainer = document.querySelectorAll(".order-by");
orderContainer.forEach((x) => {
  x.addEventListener("change", function () {
    order = x.value;
    renderCard(limit, order, type, status, title, currentPage);
  });

  orderList.forEach((y) => {
    x.innerHTML += `<option value="${y}">${
      y[0].toUpperCase() + y.substring(1, y.length)
    }</option>`;
  });
});

//Type
const typeList = [
  "manga",
  "novel",
  "lightnovel",
  "oneshot",
  "doujin",
  "manhwa",
  "manhua",
];
let type = "";
const typeContainer = document.querySelectorAll(".type");
typeContainer.forEach((x) => {
  x.addEventListener("change", function () {
    type = x.value;
    renderCard(limit, order, type, status, title, currentPage);
  });
  typeList.forEach((y) => {
    x.innerHTML += `<option value="${y}">${
      y[0].toUpperCase() + y.substring(1, y.length)
    }</option>`;
  });
});

//Status
const statusList = [
  "publishing",
  "complete",
  "hiatus",
  "discontinued",
  "upcoming",
];
let status = "";
const statusContainer = document.querySelectorAll(".status");
statusContainer.forEach((x) => {
  x.addEventListener("change", function () {
    type = x.value;
    renderCard(limit, order, type, status, title, currentPage);
  });
  statusList.forEach((y) => {
    x.innerHTML += `<option value="${y}">${
      y[0].toUpperCase() + y.substring(1, y.length)
    }</option>`;
  });
});

//Search
const searchBar = document.querySelectorAll(".search-bar");
searchBar.forEach((x) => {
  x.addEventListener("keyup", function () {
    title = x.value;
    currentPage = 1;
    changeCurrentPage(currentPage);
    renderCard(limit, order, type, status, title, currentPage);
  });
});

//Get Data from API
async function getData(...args) {
  [limit, order, type, status, title, currentPage] = args;
  try {
    let res = await fetch(
      `https://api.jikan.moe/v4/manga?sfw=true&sort=desc&limit=${limit}&order_by=${order}&type=${type}&status=${status}&letter=${title}&page=${currentPage}`
    );
    let data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

//Get Detail Card from API
const getDetail = async (id) => {
  try {
    let response = await fetch(`https://api.jikan.moe/v4/manga/${id}/full`);
    let result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
  }
};

//Creating Card
function createCard(items) {
  const cardContainer = document.querySelector("#card-container");
  cardContainer.innerHTML = ``;
  const offSet = currentPage * limit - limit;
  items.forEach((item, index) => {
    cardContainer.innerHTML += `
    <div
    class="card flex flex-col justify-between"
    data-id = "${item.mal_id}"
    style = "background-image:url('${item.images.jpg.image_url}')"
  >
    <div
      class="bg-secondary-80 inline-block ml-auto w-[25px] h-[25px] text-center text-18 text-teritary rounded-md"
    >
      ${offSet + index + 1}
    </div>
    <div
      class="bg-teritary-80 text-14 text-secondary text-center rounded-lg"
    >
      ${item.title}
    </div>
  </div>
    `;
  });
}

//Rendering Card
async function renderCard(...args) {
  const dataObj = await getData(...args);
  const mangaList = dataObj.data;
  totalPage = dataObj.pagination.last_visible_page;
  changeTotalPage(totalPage);
  createCard(mangaList);
}

//Create data Modal
function createModal(data) {
  modalHeader(data);
  modalBody(data);
}

//Modal Header
function modalHeader(item) {
  let modalHeader = document.querySelector("#modal-header");
  modalHeader.innerHTML = "";
  modalHeader.innerHTML += `<i
  id="close-modal"
  class="bx bx-x text-24 font-black cursor-pointer absolute right-[10vw] md:right-[20vw] xl:right-[35vw]"
></i>
<h1 class="flex items-center justify-center w-4/5 m-auto">
  ${item.title}
</h1>
<p class="text-14">${item.title_japanese}</p>
`;
}

//Modal Body
function modalBody(item) {
  let modalBody = document.querySelector("#modal-body");
  modalBody.innerHTML = "";
  modalBody.innerHTML += `<div class="flex flex-col md:flex-row items-center md:items-start">
  <img class="modal-poster" src="${item.images.jpg.image_url}" alt="no-image" />
  <div class="w-full px-3 font-bold">
    <div class="text-18">
      <h2>Information</h2>
      <div class="text-14 font-medium">
        <p>Type : ${item.type}</p>
        <p>Volume : ${item.volumes}</p>
        <p>Chapters : ${item.chapters}</p>
        <p>Status : ${item.status}</p>
        <p>
              Genres :
              <span id="genres-container" class="text-12"></span>
            </p>
            <p>
              Themes :
              <span id="themes-container" class="text-12"></span>
            </p>
            <p>
              Authors :
              <span id="authors-container" class="text-12"></span>
            </p>
      </div>
    </div>

    <div class="text-18 mt-2">
      <h2>Statistic</h2>
      <div class="text-14 font-medium">
        <p>Score : ${item.score}</p>
        <p>Ranked : ${item.rank}</p>
        <p>Popularity : ${item.popularity}</p>
      </div>
    </div>
  </div>
</div>

<div class="w-full font-bold mt-2">
  <h2 class="text-20">Sypnosis</h2>
  <p
    class="text-14 xl:h-[9rem] md:overflow-auto font-medium text-justify px-1"
  >
    "${item.synopsis}"
  </p>
</div>`;
  const genres = item.genres;
  const genreList = [];
  genres.forEach((item) => {
    genreList.push(item.name);
  });
  const genreContainer = document.querySelector("#genres-container");
  genreContainer.innerText = genreList;

  const themes = item.themes;
  const themeList = [];
  themes.forEach((item) => {
    themeList.push(item.name);
  });
  const themeContainer = document.querySelector("#themes-container");
  themeContainer.innerText = themeList;

  const authors = item.authors;
  const authorList = [];
  authors.forEach((item) => {
    authorList.push(item.name);
  });
  const authorContainer = document.querySelector("#authors-container");
  authorContainer.innerText = authorList;
}

//Show Modal Function
function showModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "flex";
}

//Close Modal function
function closeModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
}

//Show Modal
document.addEventListener("click", async function (e) {
  //Coba jalankan async await dari sini
  isCard = e.target.classList.contains("card");
  if (isCard) {
    const id = e.target.dataset.id;
    dataObj = await getDetail(id);
    data = dataObj.data;
    createModal(data);
    showModal();
  }
  /*  console.log(isCard); */
});

//Close Modal
document.addEventListener("click", function (e) {
  isCloseModal = e.target.id === "close-modal";
  if (isCloseModal) {
    closeModal();
  }
});

renderCard(limit, order, type, status, title, currentPage);

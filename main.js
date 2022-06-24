let mangaList = [
  {
    name: "Attack on Titan",
    image: "/img/dummy1.jpg",
  },
  {
    name: "Chainsawman",
    image: "/img/dummy2.jpg",
  },
  {
    name: "Breserk",
    image: "/img/dummy3.jpg",
  },
  {
    name: "Bleach",
    image: "/img/dummy4.jpg",
  },
  {
    name: "Rent a Girlfriend",
    image: "/img/dummy5.jpg",
  },
  {
    name: "Domestic Girlfriend",
    image: "/img/dummy6.jpg",
  },
  {
    name: "Nisekoi",
    image: "/img/dummy7.jpg",
  },
  {
    name: "Gleipnir",
    image: "/img/dummy8.jpg",
  },
  {
    name: "Wotakoi: Love is Hard for Otaku",
    image: "/img/dummy9.jpg",
  },
  {
    name: "Komi can't Communicate",
    image: "/img/dummy10.jpg",
  },
];

let title = "";
let currentPage = 1;
let newPage = 0;
let activePages = 1;
const cardContainer = document.querySelector("#card-container");
const paginationContainer = document.querySelector("#pagination-container");
const menuButton = document.querySelector(".bxs-chevron-down");
const menuContainer = document.querySelector("#menu-container");

//Open Menu Mobile
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

/* console.log(menuContainer); */

//Filter
let orderList = [
  "favorites",
  "rank",
  "popularity",
  "volumes",
  "title",
  "scores",
];

let orderBy = "favorites";
const orderByContainer = document.querySelectorAll(".order-by");
console.log(orderByContainer);

orderByContainer.forEach((container) => {
  orderList.forEach((item) => {
    /* console.log(item); */
    /* console.log(container); */
    container.innerHTML += `<option value="${item}">${
      item[0].toUpperCase() + item.substring(1, item.length)
    }</option>`;
  });
});

let typeList = [
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

typeContainer.forEach((container) => {
  typeList.forEach((item) => {
    /* console.log(item); */
    container.innerHTML += `<option value="${item}">${
      item[0].toUpperCase() + item.substring(1, item.length)
    }</option>`;
  });
});

let statusList = [
  "publishing",
  "complete",
  "hiatus",
  "discontinued",
  "upcoming",
];

let status = "";
const statusContainer = document.querySelectorAll(".status");

statusContainer.forEach((container) => {
  statusList.forEach((item) => {
    /* console.log(item); */
    container.innerHTML += `<option value="${item}">${
      item[0].toUpperCase() + item.substring(1, item.length)
    }</option>`;
  });
});

//genres
/* fetch("https://api.jikan.moe/v4/genres/manga").then((response) => {
  return response.json().then((data) => {
    console.log(data.data);
  });
}); */

//Limit
let limit = 0;

if (screen.width > 600 && screen.width <= 900) {
  limit = 12;
} else if (screen.width <= 600) {
  limit = 24;
} else {
  limit = 10;
}

fetch(
  `https://api.jikan.moe/v4/manga?sfw=false&sort=desc&limit=${limit}&order_by=${orderBy}&type=${type}&status=${status}&letter=${title}&page=${currentPage}`,
  {
    method: "GET",
  }
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    /* console.log(data.pagination.current_page); */
    /* activePages = data.pagination.current_page; */
    cardContainer.innerHTML = ``;
    data.data.forEach((item, index) => {
      cardContainer.innerHTML += `
      <div
      class="card flex flex-col justify-between"
      style = "background-image:url('${item.images.jpg.image_url}')"
    >
      <div
        class="bg-secondary-80 inline-block ml-auto w-[25px] h-[25px] text-center text-18 text-teritary rounded-md"
      >
        ${index + 1}
      </div>
      <div
        class="bg-teritary-80 text-14 text-secondary text-center rounded-lg"
      >
        ${item.title}
      </div>
    </div>
      `;
      /* console.log(item); */
    });
  })
  .catch((Err) => {
    console.log(Err);
  });

function getData(limit, orderBy, type, status, title, currentPage) {
  fetch(
    `https://api.jikan.moe/v4/manga?sfw=false&sort=desc&limit=${limit}&order_by=${orderBy}&type=${type}&status=${status}&letter=${title}&page=${currentPage}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      /* console.log(data.pagination.current_page); */
      /* activePages = data.pagination.current_page; */
      cardContainer.innerHTML = ``;
      data.data.forEach((item, index) => {
        cardContainer.innerHTML += `
        <div
        class="card flex flex-col justify-between"
        style = "background-image:url('${item.images.jpg.image_url}')"
      >
        <div
          class="bg-secondary-80 inline-block ml-auto w-[25px] h-[25px] text-center text-18 text-teritary rounded-md"
        >
          ${index + 1}
        </div>
        <div
          class="bg-teritary-80 text-14 text-secondary text-center rounded-lg"
        >
          ${item.title}
        </div>
      </div>
        `;
        /* console.log(item); */
      });
    })
    .catch((Err) => {
      console.log(Err);
    });
}

/* Pagination */
let paginationNumberList = 20;

screen.width <= 900 ? (paginationNumberList = 10) : (paginationNumberList = 20);

for (let i = 1; i <= paginationNumberList; i++) {
  let activeNumber = ``;

  if (i == currentPage) {
    activeNumber = ` <li class="pagination-list e">
    <button
      class="rounded-full bg-teritary w-[30px] h-[30px] flex items-center justify-center text-base cursor-pointer hover:shadow-2xl "
    >
      ${i}
    </button>
  </li>`;
  } else {
    activeNumber = ` <li class="pagination-list e">
    <button
      class="rounded-full bg-teritary w-[30px] h-[30px] flex items-center justify-center text-base cursor-pointer hover:shadow-2xl"
    >
      ${i}
    </button>
  </li>`;
  }

  paginationContainer.innerHTML += activeNumber;
}

let paginationList = document.querySelectorAll(".pagination-list");

paginationList.forEach((index, parameter) => {
  index.addEventListener("click", () => {
    currentPage = parameter + 1;
    console.log(currentPage);
    getData(limit, orderBy, type, status, title, currentPage);
  });
});

/* getData(limit, orderBy, type, status, title, currentPage); */

//search
let searchBar = document.querySelectorAll(".search-bar");

searchBar.forEach((searchBar, index) => {
  searchBar.addEventListener("keyup", () => {
    title = searchBar.value;
    orderBy = orderByContainer[index].value;
    type = typeContainer[index].value;
    status = statusContainer[index].value;
    currentPage = 1;

    getData(limit, orderBy, type, status, title, currentPage);
  });
});

/* console.log(paginationList); */

//Jquery Ajax

/* $.ajax({
  url: "https://api.jikan.moe/v4/manga",
  type: "GET",
  dataType: "JSON",
  data: {
    limit: limit,
    order_by: orderBy,
    sort: "desc",
  },

  success: (data) => {
    console.log(data);
    $.each(data.data, (index, item) => {
      console.log(item);
      $("#card-container").append(`
        <div
        class="card flex flex-col justify-between"
        style = "background-image:url('${item.images.jpg.image_url}')"
      >
        <div
          class="bg-secondary-80 inline-block ml-auto w-[25px] h-[25px] text-center text-18 text-teritary rounded-md"
        >
          ${index + 1}
        </div>
        <div
          class="bg-teritary-80 text-14 text-secondary text-center rounded-lg"
        >
          ${item.title}
        </div>
      </div>
      `);
    });
  },
}); */

//Data dummy
/* $.each(mangaList, (index, item) => {
  $("#card-container").append(`
  <div
  class="card flex flex-col justify-between"
  style = "background-image:url('${item.image}')"
>
  <div
    class="bg-secondary-80 inline-block ml-auto w-[25px] h-[25px] text-center text-18 text-teritary rounded-md"
  >
    ${index + 1}
  </div>
  <div
    class="bg-teritary-80 text-14 text-secondary text-center rounded-lg"
  >
    ${item.name}
  </div>
</div>
  `);
}); */

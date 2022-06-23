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

let limit = 0;

if (screen.width > 600 && screen.width <= 900) {
  limit = 12;
} else if (screen.width <= 600) {
  limit = 24;
} else {
  limit = 10;
}

$.ajax({
  url: "https://api.jikan.moe/v4/manga",
  type: "GET",
  dataType: "JSON",
  data: {
    limit: limit,
    order_by: "favorites",
    sort: "desc",
  },

  success: (data) => {
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
});

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

console.log(screen.width);

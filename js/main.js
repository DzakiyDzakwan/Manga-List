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

$.each(mangaList, (index, item) => {
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
});

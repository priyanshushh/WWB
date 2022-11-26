VanillaTilt.init(document.querySelector(".change1"), {
    max: 25,
    speed: 400,

});

VanillaTilt.init(document.querySelectorAll(".change1"));


VanillaTilt.init(document.querySelector(".home3-card1"), {
    max: 30,
    speed: 400,


});
VanillaTilt.init(document.querySelector("#home3-card2"), {
    max: 30,
    speed: 400,

});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll(".home3-card1"));
VanillaTilt.init(document.querySelectorAll("#home3-card2"));
/* global window */
// Event case studies. Each entry feeds an Events-page card and its own detail page.
// phones: two vertical videos shown on iPhone mockups (the first gets the sound toggle).
// stills: four 9:16 tiles; set video: true for a clip. Missing media renders as a drop slot.
window.AKIMBO_EVENTS = [
  {
    id: "summer-bash", meta: "AI Tinkerers", title: "Summer Bash",
    body: "AI Tinkerers throws the Summer Bash once a year. They wanted a recap of the night, and a piece that could stand in for the whole organization: that anyone can be a builder, and that the people who show up are the reason to come.",
    goal: "AI Tinkerers throws the Summer Bash once a year. They wanted a recap of the night, and a piece that could stand in for the whole organization: that anyone can be a builder, and that the people who show up are the reason to come.",
    approach: "We interviewed the two founders, Joe and Josh, on what AI Tinkerers is and why they keep putting on events, then about ten guests, some at their second event and some at their twentieth, and every one of them said a version of the same thing about the community. That is real support on camera from the people who showed up, and a live event is the only place you get it. Around it, the scale of the night: the rooftop, the crowd, how many people came. The stills carry the same thing, and they bridge the gap between editorial and event photography, so they hold up anywhere AI Tinkerers wants to use them. Each interview also works as its own social cut, which is how one night keeps posting for months.",
    list: ["Hero video", "34 edited stills"],
    poster: "assets/tinkerers-cover.webp", posterPosition: "56% 50%",
    hoverVideo: "assets/tinkerers-hover.mp4",
    phones: [], stills: [],
    // heroYoutube: YouTube video ID for a full-bleed 16:9 embed at the top of the page.
    // V2 working cut. Swap the ID when the final is ready.
    heroYoutube: "ov7ZTzVcNbM",
    // mosaic: replaces the four-still row. cols/rows are spans on a 12-column grid.
    mosaic: [
      { src: "assets/tinkerers-2.jpg", cols: 12, rows: 3, wide: true, pos: "50% 45%" },
      { src: "assets/tinkerers-1.jpg", cols: 4, rows: 3, pos: "40% 40%" },
      { src: "assets/tinkerers-4.jpg", cols: 8, rows: 3, pos: "50% 55%" },
      { src: "assets/tinkerers-5.jpg", cols: 7, rows: 3, pos: "40% 40%" },
      { src: "assets/tinkerers-3.jpg", cols: 5, rows: 3, pos: "50% 40%" },
      { src: "assets/tinkerers-7.jpg", cols: 8, rows: 3, pos: "50% 35%" },
      { src: "assets/tinkerers-6.jpg", cols: 4, rows: 3, pos: "40% 40%" },
    ],
  },
  {
    id: "hamptons-activation", meta: "HEAVENSAKE", title: "Hamptons Activation",
    pageTitle: ["Heavensake x The Surf Lodge", "x PARI PARI Miami"],
    body: "HEAVENSAKE put on a sushi dinner at Surf Lodge in Montauk with Pari Pari, with chefs in from Japan. The dinners are invite only. HEAVENSAKE wanted a film for social that looks as elevated as the evening itself and makes people want to be at the next one.",
    goal: "HEAVENSAKE put on a sushi dinner at Surf Lodge in Montauk with Pari Pari, with chefs in from Japan. The dinners are invite only. HEAVENSAKE wanted a film for social that looks as elevated as the evening itself and makes people want to be at the next one.",
    approach: "One film, shot by candlelight. The chefs and the making of the food, the guests, the room, and what the evening was like to be at.",
    list: ["Recap edit"],
    poster: "assets/heavensake-4.png", posterPosition: "50% 56%", hoverVideo: "assets/heavensake-hover.mp4",
    phones: ["assets/heavensake-film.mp4", "assets/heavensake-vert-1.mp4"],
    stills: [
      { src: "assets/heavensake-1.png" },
      { src: "assets/heavensake-phone.mp4", video: true },
      { src: "assets/heavensake-4.png" },
      { src: "assets/heavensake-5.png" },
    ],
  },
  {
    id: "europe-tour", meta: "Macklemore", title: "Europe tour",
    body: "Coverage across two tour dates in the register Macklemore already puts out. High quality, curated, and built for social.",
    goal: "Coverage across two tour dates in the register Macklemore already puts out. High quality, curated, and built for social.",
    approach: "Video, photo and design, turned around fast. A hero recap, social cuts, iPhone videos made for social only, stills from the green room to the stage, and a design scroll that runs across multiple slides with the motion and the stills together: custom Polaroid-style stickers and postcards from each city, a map of the route, bag tags.",
    list: ["Photo and video", "Multi-city", "Social cuts"],
    poster: "assets/mack-cover.webp", posterPosition: "50% 50%",
    hoverVideo: "assets/mack-hover.mp4",
    phones: [], stills: [],
    // hero: full-bleed 16:9 (image or video path; null = drop slot).
    // carousel: nine 4:5 slides; the 5th sits inside the phone. null = drop slot.
    hero: null,
    heroYoutube: "Ie9ZrURDwxw",
    mosaic: [
      { src: "assets/mack-web-4.jpg", cols: 12, rows: 3, wide: true, pos: "50% 55%" },
      { src: "assets/mack-web-1.jpg", cols: 4, rows: 4, pos: "50% 45%" },
      { src: "assets/mack-web-2.jpg", cols: 4, rows: 4, pos: "50% 55%" },
      { src: "assets/mack-web-7.jpg", cols: 4, rows: 4, pos: "50% 55%" },
      { src: "assets/mack-web-5.jpg", cols: 5, rows: 3, pos: "60% 55%" },
      { src: "assets/mack-web-6.jpg", cols: 7, rows: 3, wide: true, pos: "50% 55%" },
    ],
    carousel: ["assets/mack-1.mp4", "assets/mack-2.png", "assets/mack-3.mp4", "assets/mack-4.png", "assets/mack-5.png", "assets/mack-6.png", "assets/mack-7.mp4", "assets/mack-8.png", "assets/mack-9.png"],
  },
  {
    id: "somethings-nashville", meta: "Somethings", title: "Behavioral Tech Conference",
    poster: "assets/somethings-cover.jpg", posterPosition: "50% 0%",
    hoverVideo: "assets/somethings-hover.mp4",
    body: "BHT 2026 is the biggest behavioral health conference in the country - and for our friends at Somethings, they knew it was one of the biggest opportunities of the year to showcase the work they've done, the brand they've built, and their vision for the future.",
    goal: "Turn the biggest health conference Somethings attends for 2 days out of the year, into a set for evergreen content capture. Memorialize the months of work that went into the planning and creation of their presence at BHT - to be used not only for speedy recaps and relevant real-time posting from the event on socials like LinkedIn - and also for evergreen needs such as hiring, web content, decks, and more.",
    // Blank line in approach = new paragraph.
    approach: "A lean team fully equipped for pro photo and video capture. Shot list aligned on with the client before hand, full schedule for the 2 days down to minute, and a clear understanding of how the client wanted to be represented in the content.\n\nWe had a vision for all of the deliverables before the event even kicked off, allowing for 12-hour video recap edits and a full suite of lifestyle photography ready to go before the doors even opened for Day 2.",
    note: "We made a branded short-film for Somethings earlier in the year, which was prominently displayed in their booth and premiered live.",
    list: ["12-hour turnaround", "Photo & video"],
    hero: null,
    heroYoutube: "6u1MsliBcj4",
    mosaic: [
      { src: "assets/bht-6.jpg", cols: 3, rows: 3, pos: "50% 30%" },
      { src: "assets/bht-2.jpg", cols: 6, rows: 3, wide: true, pos: "52% 45%" },
      { src: "assets/bht-16.jpg", cols: 3, rows: 3, pos: "45% 35%" },
      { src: "assets/bht-3.jpg", cols: 4, rows: 3, pos: "55% 30%" },
      { src: "assets/bht-8.jpg", cols: 5, rows: 3, pos: "55% 50%" },
      { src: "assets/bht-10.jpg", cols: 3, rows: 3, pos: "50% 25%" },
      { src: "assets/bht-15.jpg", cols: 4, rows: 3, pos: "50% 30%" },
      { src: "assets/bht-5.jpg", cols: 8, rows: 3, wide: true, pos: "50% 40%" },
    ],
    phones: [], stills: [],
  },
  {
    id: "junior-achievement", meta: "Sound Credit Union", title: "Junior Achievement",
    body: "Tell the story of Sound Credit Union's partnership with Seahawks lineman Abe Lucas, on the day Sound opened its storefront at Junior Achievement's BizTown in Auburn. Junior Achievement teaches students how money and work function; BizTown is a simulated town where kids run the businesses for a day, and Sound's storefront is a working credit union inside it.",
    goal: "Tell the story of Sound Credit Union's partnership with Seahawks lineman Abe Lucas, on the day Sound opened its storefront at Junior Achievement's BizTown in Auburn. Junior Achievement teaches students how money and work function; BizTown is a simulated town where kids run the businesses for a day, and Sound's storefront is a working credit union inside it.",
    approach: "We wrote the interview questions ahead of time, knowing the story we wanted Abe to tell. On site for the ribbon cutting: interviews with Abe, the ceremony itself, and the students finding out what it is like to run a credit union for a day. Two films came out of it: the recap, and a piece built around Abe.",
    list: ["Event coverage", "Recap film"],
    hoverVideo: "assets/ja-hover.mp4",
    poster: "assets/scu-ja-cover.jpg",
    // hero: full-bleed 16:9 video file; heroYoutube: YouTube ID instead. null = drop slot.
    hero: null,
    heroYoutube: "qc3va5CJuRw",
    // Second final (the Abe Lucas piece). hero2Youtube takes a YouTube ID.
    hero2: null,
    hero2Youtube: "TZiGhCknGKk",
    phones: [],
    stills: [
      { src: "assets/scu-ja-still-1.jpg", pos: "47% 50%" },
      { src: "assets/scu-ja-still-2.jpg", pos: "44% 50%" },
      { src: "assets/scu-ja-still-4.jpg", pos: "48% 50%" },
    ],
    stillsCount: 3,
  },
  {
    id: "pride-weekend", meta: "W Seattle", title: "Pride weekend",
    body: "Three days of Pride with W Seattle, in collaboration with Life n Light, the third year running: brunches, multiple events, and the activation at Fisher Pavilion at Seattle Center. Media that shows this year and sells next year.",
    goal: "Three days of Pride with W Seattle, in collaboration with Life n Light, the third year running: brunches, multiple events, and the activation at Fisher Pavilion at Seattle Center. Media that shows this year and sells next year.",
    approach: "We handled the video across the weekend, built around the guests and the drag brunch, cut in the style we have kept consistent with W Seattle for three years so it plays on social. Delivered as a recap and as material for marketing next year's Pride.",
    list: ["Recap film"],
    hoverVideo: "assets/w-seattle-hover.mp4",
    poster: "assets/w-seattle-cover.png", posterPosition: "50% 36%",
    // hero: full-bleed 16:9 video file; heroYoutube: YouTube ID instead. null = drop slot.
    hero: null,
    heroYoutube: "-8H8s24L3jU", heroVertical: true,
    phones: [],
    stills: [
      { src: "assets/w-seattle-seq.mp4", video: true },
      { src: "assets/w-seattle-1.png" },
      { src: "assets/w-seattle-3.png" },
      { src: "assets/w-seattle-stickers.mp4", video: true },
    ],
  },
];

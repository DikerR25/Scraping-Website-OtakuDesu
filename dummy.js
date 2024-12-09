const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { default: Axios } = require("axios");
const qs = require("qs");

const app = express();
const PORT = 3000;
const baseURL = "https://otakudesu.cloud";

app.get('/', (req, res) => {
    res.send({ 
        "message": "Welcome to Otaku Desu API",
        "description": "This API is used to fetch anime information from Otaku Desu website",
        "endpoints": [],
        "routes": [],
        "methods": [],
        "status": 200,
        "author": "DikerR25"
    });
});

app.get('/api/listroute/', (req, res) => {
    res.send(`Welcome to the Anime Scraper API!`);
});

app.get('/api/ongoing/page/:page/', (req, res) => {
    const page = parseInt(req.params.page);
    const data = {
        "Status": "Success",
        "maxPage": 4,
        "Anime": [
          {
            "judul": "Trillion Game",
            "episode": "Episode 11",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Trillion-Game.jpg",
            "slug": "trilion-game-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Sayounara Ryuusei, Konnichiwa Jinsei",
            "episode": "Episode 10",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Sayounara-Ryuusei-Konnichiwa-Jinsei-Subtitle-Indonesia.jpg",
            "slug": "sayuseijinsei-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Rurouni Kenshin: Meiji Kenkaku Romantan - Kyoto Douran",
            "episode": "Episode 10",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/145530.jpg",
            "slug": "rurouni-kenshin-s2-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Ao no Hako",
            "episode": "Episode 11",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Ao-no-Hako.jpg",
            "slug": "ao-hako-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Kekkon suru tte, Hontou desu ka",
            "episode": "Episode 10",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Kekkon-suru-tte-Hontou-desu-ka.jpg",
            "slug": "kekkon-hontou-desu-ka-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Hitoribocchi no Isekai Kouryaku",
            "episode": "Episode 11",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/09/Hitoribocchi-no-Isekai-Kouryaku.jpg",
            "slug": "hitoribocchi-isekai-kyaku-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Dandadan",
            "episode": "Episode 10",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Subtitle-Indonesia.jpg",
            "slug": "dandan-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "NegaPosi Angler",
            "episode": "Episode 10",
            "hari": "Kamis",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/NegaPosi-Angler.png",
            "slug": "nega-angler-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Kamonohashi Ron no Kindan Suiri Season 2",
            "episode": "Episode 5",
            "hari": "Random",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Kamonohashi-Ron-no-Kindan-Suiri-Season-2.jpg",
            "slug": "kamonohashi-suiri-s2-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "DanMachi Season 5",
            "episode": "Episode 9",
            "hari": "Kamis",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/DanMachi-Season-5-Subtitle-Indonesia.jpg",
            "slug": "dnmaci-season-5-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Shin Tennis no Oujisama: U-17 World Cup Semifinal",
            "episode": "Episode 10",
            "hari": "Kamis",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/145670.jpg",
            "slug": "tennis-world-cup-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Yarinaoshi Reijou wa Ryuutei Heika wo Kouryakuchuu",
            "episode": "Episode 9",
            "hari": "Kamis",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Yarinaoshi.jpg",
            "slug": "yarjou-ryuchu-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Sengoku Youko: Senma Konton-hen",
            "episode": "Episode 19",
            "hari": "Kamis",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/07/Sengoku-Youko-Senam-Konton.jpg",
            "slug": "sengoku-youko-s2-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Tasuuketsu",
            "episode": "Episode 21",
            "hari": "Rabu",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/07/143629.jpg",
            "slug": "tasuketsu-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Amagami-san Chi no Enmusubi",
            "episode": "Episode 10",
            "hari": "Rabu",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Amagami-san-Chi-no-Enmusubi.jpg",
            "slug": "amagami-chi-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Youkai Gakkou no Sensei Hajimemashita!",
            "episode": "Episode 9",
            "hari": "Selasa",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/145662.jpg",
            "slug": "yokai-sensei-hajmeshita-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Rekishi ni Nokoru Akujo ni Naru zo",
            "episode": "Episode 10",
            "hari": "Selasa",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Rekishi-ni-Nokoru-Akujo-ni-Naru-zo.jpg",
            "slug": "rekishi-nokoru-naru-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Hoshifuru Oukoku no Nina",
            "episode": "Episode 9",
            "hari": "Senin",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Hoshifuru-Oukoku-no-Nina.jpg",
            "slug": "hoshifuru-nina-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Love Live! Superstar!! Season 3",
            "episode": "Episode 9",
            "hari": "Senin",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Love-Live-Superstar-Season-3-Subtitle-Indonesia.jpg",
            "slug": "love-superstar-s3-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Raise wa Tanin ga Ii",
            "episode": "Episode 9",
            "hari": "Selasa",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Raise-wa-Tanin-ga-Ii.jpg",
            "slug": "raitanin-ga-ii-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Natsume Yuujinchou Season 7",
            "episode": "Episode 9",
            "hari": "Selasa",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Natsume-Yuujinchou-Season-7.jpg",
            "slug": "ntsume-yujinchou-s7-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Seirei Gensouki Season 2",
            "episode": "Episode 9",
            "hari": "Selasa",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Seirei-Gensouki-Season-2-Subtitle-Indonesia.jpg",
            "slug": "seireig-s2-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Wajutsushi",
            "episode": "Episode 10",
            "hari": "Selasa",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/145446.jpg",
            "slug": "saikyou-shieshoku-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "Arifureta Shokugyou de Sekai Saikyou Season 3",
            "episode": "Episode 8",
            "hari": "Senin",
            "tanggal": "02 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Arifureta-Shokugyou-de-Sekai-Saikyou-Season-3.jpg",
            "slug": "arifureta-s3-sub-indo",
            "status": "Ongoing"
          },
          {
            "judul": "MF Ghost Season 2",
            "episode": "Episode 9",
            "hari": "Senin",
            "tanggal": "02 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/MF-Ghost-Season-2-Subtitle-Indonesia.jpg",
            "slug": "mf-ghst-s2-sub-indo",
            "status": "Ongoing"
          }
        ]
      }
      res.json(data);
});

app.get('/api/complete/page/:page/', (req, res) => {
    const page = parseInt(req.params.page);
    const data = {
        "Status": "Success",
        "maxPage": 58,
        "Anime": [
          {
            "judul": "Lv2 kara Cheat datta Motoyuusha Kouho no Mattari Isekai Life",
            "episode": "12 Episode",
            "hari": "6.81",
            "tanggal": "05 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Lv2-kara-Cheat-datta-Motoyuusha-Kouho-no-Mattari-Isekai-Life-Sub-Indo.jpg",
            "slug": "lv2-kara-cheat-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Hananoi-kun to Koi no Yamai",
            "episode": "12 Episode",
            "hari": "6.74",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Hananoi-kun-to-Koi-no-Yamai-Sub-Indo.jpg",
            "slug": "hananoi-koi-yamai-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Bartender: Kami no Glass",
            "episode": "12 Episode",
            "hari": "7.37",
            "tanggal": "04 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Bartender-Kami-no-Glass-Sub-Indo.jpg",
            "slug": "brtender-kami-glass-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Blue Archive the Animation",
            "episode": "12 Episode",
            "hari": "7.05",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Blue-Archive-the-Animation-Sub-Indo.jpg",
            "slug": "blue-archive-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Yuru Camp Season 3",
            "episode": "12 Episode",
            "hari": "8.02",
            "tanggal": "03 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Yuru-Camp-Season-3-Sub-Indo.jpg",
            "slug": "yuru-no-camp-season-3-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Touken Ranbu Kai",
            "episode": "8 Episode",
            "hari": "6.11",
            "tanggal": "02 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Touken-Ranbu-Kai-Sub-Indo.jpg",
            "slug": "touken-ranbu-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Tsuki ga Michibiku Isekai Douchuu Season 2",
            "episode": "25 Episode",
            "hari": "7.83",
            "tanggal": "02 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Tsuki-ga-Michibiku-Isekai-Douchuu-Season-2-Sub-Indo.jpg",
            "slug": "tsuki-michibiku-isekai-douchu-s2-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Tensei shitara Dainana Ouji Datta node",
            "episode": "12 Episode",
            "hari": "7.45",
            "tanggal": "02 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Tensei-shitara-Dainana-Ouji-Datta-node-Sub-Indo.jpg",
            "slug": "tensei-datta-node-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Tensei Kizoku, Kantei Skill de Nariagaru",
            "episode": "12 Episode",
            "hari": "7.15",
            "tanggal": "01 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/12/Tensei-Kizoku-Kantei-Skill-de-Nariagaru-Sub-Indo.jpg",
            "slug": "tensei-skill-nariagaru-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Shuumatsu Train Doko e Iku?",
            "episode": "12 Episode",
            "hari": "7.38",
            "tanggal": "29 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Shuumatsu-Train-Doko-e-Iku-Sub-Indo.jpg",
            "slug": "shuumatsu-train-doko-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Re:Monster",
            "episode": "12 Episode",
            "hari": "6.56",
            "tanggal": "27 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Re-Monster-Sub-Indo.jpg",
            "slug": "re-mnstr-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "KonoSuba Season 3",
            "episode": "11 Episode",
            "hari": "8.37",
            "tanggal": "27 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/KonoSuba-Season-3-Sub-Indo.jpg",
            "slug": "knsb-s3-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Seiyuu Radio no Uraomote",
            "episode": "12 Episode",
            "hari": "6.97",
            "tanggal": "26 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Seiyuu-Radio-no-Uraomote-Sub-Indo.jpg",
            "slug": "seiyu-radio-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Girls Band Cry",
            "episode": "13 Episode",
            "hari": "8.39",
            "tanggal": "26 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Girls-Band-Cry-Sub-Indo.jpg",
            "slug": "band-cry-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "One Room, Hiatari Futsuu, Tenshi-tsuki.",
            "episode": "12 Episode",
            "hari": "7.04",
            "tanggal": "25 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/06/One-Room-Hiatari-Futsuu-Tenshi-tsuki.-Sub-Indo.jpg",
            "slug": "one-room-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Madome",
            "episode": "12 Episode",
            "hari": "7.28",
            "tanggal": "25 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/06/Madome-Sub-Indo.jpg",
            "slug": "maou-elf-yome-shitanda-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "DekiSoko",
            "episode": "12 Episode",
            "hari": "5.19",
            "tanggal": "18 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/DekiSoko-Sub-Indo.jpg",
            "slug": "dekisoko-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Yubisaki to Renren",
            "episode": "12 Episode",
            "hari": "8.22",
            "tanggal": "17 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Yubisaki-to-Renren-Sub-Indo.jpg",
            "slug": "yubisaki-renren-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Bucchigiri?!",
            "episode": "12 Episode",
            "hari": "6.53",
            "tanggal": "16 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Bucchigiri-Sub-Indo.jpg",
            "slug": "bucchigiri-episode-1-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Bye Bye, Earth",
            "episode": "10 Episode",
            "hari": "6.09",
            "tanggal": "16 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Bye-Bye-Earth-Sub-Indo.jpg",
            "slug": "bye-earth-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Nige Jouzu no Wakagimi",
            "episode": "12 Episode",
            "hari": "7.84",
            "tanggal": "15 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Nige-Jouzu-no-Wakagimi-Sub-Indo.jpg",
            "slug": "nige-wakagimi-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Shy Season 2",
            "episode": "12 Episode",
            "hari": "6.92",
            "tanggal": "10 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Shy-Season-2-Sub-Indo.jpg",
            "slug": "shy-s2-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Uzumaki",
            "episode": "4 Episode",
            "hari": "6.01",
            "tanggal": "10 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Uzumaki-Sub-Indo.jpg",
            "slug": "uzmaki-sprial-horor-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Tensui no Sakuna-hime",
            "episode": "13 Episode",
            "hari": "6.74",
            "tanggal": "09 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Tensui-no-Sakuna-hime-Sub-Indo.jpg",
            "slug": "tensui-sakuna-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Yozakura-san Chi no Daisakusen",
            "episode": "27 Episode",
            "hari": "7.53",
            "tanggal": "08 Nov",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/11/Yozakura-san-Chi-no-Daisakusen-Sub-Indo.jpg",
            "slug": "yozakura-daisakusen-sub-indo",
            "status": "Complete"
          }
        ]
      }

      res.json(data);

});
app.get('/api/random/', (req, res) => {
    const data = {
        "Status": "Success",
        "currentPage": 45,
        "maxPage": {
          "lastPageComplete": 58,
          "lastPageOngoing": 4
        },
        "Info": "Complete",
        "Anime": [
          {
            "judul": "Beelzebub-jou no Okinimesu mama",
            "episode": "12 Episode",
            "hari": "7.34",
            "tanggal": "02 Jan",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Beelzebub-jou-no-Okinimesu-mama-Sub-Indo.jpg",
            "slug": "beelzebub-okinimesu-mama-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Umineko no Naku Koro ni",
            "episode": "26 Episode",
            "hari": "7.25",
            "tanggal": "01 Jan",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Umineko-no-Naku-Koro-ni-Sub-Indo.jpg",
            "slug": "umineko-naku-koro-ni-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Owari no Seraph Season 2",
            "episode": "12 Episode",
            "hari": "7.78",
            "tanggal": "31 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Owari-no-Seraph-Season-2-Sub-Indo.jpg",
            "slug": "owari-seraph-season-2-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Owari no Seraph",
            "episode": "12 Episode",
            "hari": "7.62",
            "tanggal": "31 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Owari-no-Seraph-Sub-Indo.jpg",
            "slug": "owari-seraph-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Watashi ga Motete Dousunda",
            "episode": "12 Episode",
            "hari": "7.38",
            "tanggal": "31 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Watashi-ga-Motete-Dousunda-Sub-Indo.jpg",
            "slug": "watashi-motete-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Yagate Kimi ni Naru",
            "episode": "13 Episode",
            "hari": "8.00",
            "tanggal": "31 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/09/Yagate-Kimi-ni-Naru-Sub-Indo.jpg",
            "slug": "yagate-kimi-naru-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Tokyo Ghoul:re Season 2",
            "episode": "12 Episode",
            "hari": "6.42",
            "tanggal": "30 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Tokyo-Ghoul-re-Season-2-Sub-Indo.jpg",
            "slug": "tokyo-in-ghoul-re-season-2-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Seishun Buta Yarou wa Bunny Girl Senpai no Yume wo Minai",
            "episode": "13 Episode",
            "hari": "8.67",
            "tanggal": "30 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/09/Seishun-Buta-Yarou-Sub-Indo.jpg",
            "slug": "seishun-bun-girl-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Kishuku Gakkou no Juliet",
            "episode": "12 Episode",
            "hari": "7.63",
            "tanggal": "29 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Kishuku-Gakkou-no-Juliet-Sub-Indo.jpg",
            "slug": "kishuku-gakkou-juliet-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "SSSS.Gridman",
            "episode": "12 Episode",
            "hari": "7.50",
            "tanggal": "29 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/SSSS.Gridman-Sub-Indo.jpg",
            "slug": "ssss-the-gridman-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Release the Spyce",
            "episode": "12 Episode",
            "hari": "7.05",
            "tanggal": "29 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Release-the-Spyce-Sub-Indo.jpg",
            "slug": "release-spyche-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Gakuen Basara",
            "episode": "12 Episode",
            "hari": "6.17",
            "tanggal": "29 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Gakuen-Basara-Sub-Indo.jpg",
            "slug": "gakuen-the-basara-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Uchi no Maid ga Uzasugiru!",
            "episode": "12 Episode",
            "hari": "7.55",
            "tanggal": "28 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Uchi-no-Maid-ga-Uzasugiru-Sub-Indo.jpg",
            "slug": "uchi-maid-uzasugiru-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Tonari no Kyuuketsuki-san",
            "episode": "12 Episode",
            "hari": "7.21",
            "tanggal": "27 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Tonari-no-Kyuuketsuki-san-Sub-Indo.jpg",
            "slug": "tonari-kyuuketsuki-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Zombieland Saga",
            "episode": "12 Episode",
            "hari": "7.80",
            "tanggal": "27 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Zombieland-Saga-Sub-Indo.jpg",
            "slug": "zombieland-the-saga-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Ore ga Suki nano wa Imouto dakedo Imouto ja Nai",
            "episode": "10 Episode",
            "hari": "5.15",
            "tanggal": "26 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/09/Ore-ga-Suki-nano-wa-Imouto-dakedo-Imouto-ja-Nai-Sub-Indo.jpg",
            "slug": "ore-ga-suki-nano-imouto-dakedo-imouto-ja-nai-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Sakurasou no Pet na Kanojo",
            "episode": "24 Episode",
            "hari": "8.35",
            "tanggal": "26 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2017/06/Sakurasou-Sub-Indo.jpg",
            "slug": "sakurasou-no-pet-na-kanojo-subttle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Anima Yell!",
            "episode": "12 Episode",
            "hari": "7.02",
            "tanggal": "26 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/10/Anima-Yell-Sub-Indo.jpg",
            "slug": "aniyel-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Akanesasu Shoujo",
            "episode": "12 Episode",
            "hari": "6.60",
            "tanggal": "26 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Akanesasu-Shoujo-Sub-Indo.jpg",
            "slug": "akanesasu-no-shoujo-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Kuroko no Basket Season 3",
            "episode": "25 Episode",
            "hari": "8.52",
            "tanggal": "21 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Kuroko-no-Basket-Season-3-Sub-Indo.jpg",
            "slug": "kuroko-basket-season-3-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Mondaiji-tachi",
            "episode": "10 Episode",
            "hari": "7.82",
            "tanggal": "19 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Mondaiji-tachi-Sub-Indo.jpg",
            "slug": "mondatachi-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Hunter x Hunter",
            "episode": "148 Episode",
            "hari": "9.11",
            "tanggal": "19 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Hunter-x-Hunter-Sub-Indo.jpg",
            "slug": "hunter-x-hunt-sub-indo",
            "status": "Complete"
          },
          {
            "judul": "Infinite Stratos",
            "episode": "12 Episode",
            "hari": "7.05",
            "tanggal": "18 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Infinite-Stratos-Sub-Indo.jpg",
            "slug": "infinite-stats-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "IS: Infinite Stratos Season 2",
            "episode": "12 Episode",
            "hari": "6.79",
            "tanggal": "18 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Infinite-Stratos-Season-2-Sub-Indo.jpg",
            "slug": "infinite-stros-2-subtitle-indonesia",
            "status": "Complete"
          },
          {
            "judul": "Date A Live Season 2",
            "episode": "10 Episode",
            "hari": "7.46",
            "tanggal": "17 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2018/12/Date-A-Live-Season-2-Sub-Indo.jpg",
            "slug": "date-live-ii-subtitle-indonesia",
            "status": "Complete"
          }
        ]
      };

    res.json(data);
});
app.get('/api/anime/:slug/', (req, res) => {
    const slug = parseInt(req.params.slug);
    const data = {
        "Status": "Success",
        "Anime": {
          "name": "MF Ghost (Episode 1 – 12) Subtitle Indonesia",
          "deskripsi": {
            "judul": "MF Ghost",
            "japanese": "MFゴースト",
            "skor": "none",
            "produser": "Animax, Kodansha, Avex Pictures, Sammy, Crunchyroll, Techno Sound",
            "tipe": "TV",
            "status": "Completed",
            "total_episode": "12",
            "durasi": "23 Menit",
            "tanggal_rilis": "Okt 02, 2023",
            "studio": "Felix Film",
            "genre": "Racing, Seinen",
            "season": "Unknown",
            "sinopsis": "Berlatar pada tahun 2020-an, saat ini mobil listrik dengan fitur Self Driving tekah menggantikan popularitas dari mobil konvensional. Walau begitu, di Jepang terdapat sebuah organisasi bernama MF Ghost yang dirikan oleh Ryosuke Takahashi dan melakukan kegiatan balapan jalanan dengan menggunakan mobil konvensional.Sementara itu, di sisi lain terdapat seorang pembalap baru bernama Kanata Livington dengan nama samaran Kanata Katagiri yang secara tiba-tiba muncul dengan mobil Toyota 86 miliknya. Ia bahkan berhasil mengalahkan beberapa pembala dengan mboil seperti Lamborghini, Ferrari 488 GTB, dan Porsche 911.",
            "img_cover": "https://otakudesu.cloud/wp-content/uploads/2024/01/MF-Ghost-Sub-Indo.jpg",
            "img_bg": "https://i.pinimg.com/originals/db/54/37/db5437539b009ea93def4dd29f0ca0fd.gif"
          },
          "episodes": [
            {
              "title": "MF Ghost Episode 12 (End) Subtitle Indonesia",
              "slug_episode": "mfghst-episode-12-sub-indo",
              "episode": "12",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 11 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-11-sub-indo",
              "episode": "11",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 10 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-10-sub-indo",
              "episode": "10",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 9 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-9-sub-indo",
              "episode": "9",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 8 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-8-sub-indo",
              "episode": "8",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 7 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-7-sub-indo",
              "episode": "7",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 6 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-6-sub-indo",
              "episode": "6",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 5 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-5-sub-indo",
              "episode": "5",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 4 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-4-sub-indo",
              "episode": "4",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 3 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-3-sub-indo",
              "episode": "3",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 2 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-2-sub-indo",
              "episode": "2",
              "release_date": "4 Januari,2024"
            },
            {
              "title": "MF Ghost Episode 1 Subtitle Indonesia",
              "slug_episode": "mfghst-episode-1-sub-indo",
              "episode": "1",
              "release_date": "4 Januari,2024"
            }
          ]
        }
      };

    res.json(data);

});
app.get('/api/episode/:episode/', (req, res) => {
    const episode = parseInt(req.params.episode);
    const data = {
        "id": "154373",
        "title": "MF Ghost Episode 11 Subtitle Indonesia",
        "slug": "mf-ghst-sub-indo",
        "currentslug": "mfghst-episode-11-sub-indo",
        "stream_link": "https://pixeldrain.com/api/file/R6Wvh8SR",
        "prev_eps_slug": "mfghst-episode-10-sub-indo",
        "next_eps_slug": "mfghst-episode-12-sub-indo",
        "episode_list": [
          {
            "title": "Episode 12",
            "id": "mfghst-episode-12-sub-indo"
          },
          {
            "title": "Episode 11",
            "id": "mfghst-episode-11-sub-indo"
          },
          {
            "title": "Episode 10",
            "id": "mfghst-episode-10-sub-indo"
          },
          {
            "title": "Episode 9",
            "id": "mfghst-episode-9-sub-indo"
          },
          {
            "title": "Episode 8",
            "id": "mfghst-episode-8-sub-indo"
          },
          {
            "title": "Episode 7",
            "id": "mfghst-episode-7-sub-indo"
          },
          {
            "title": "Episode 6",
            "id": "mfghst-episode-6-sub-indo"
          },
          {
            "title": "Episode 5",
            "id": "mfghst-episode-5-sub-indo"
          },
          {
            "title": "Episode 4",
            "id": "mfghst-episode-4-sub-indo"
          },
          {
            "title": "Episode 3",
            "id": "mfghst-episode-3-sub-indo"
          },
          {
            "title": "Episode 2",
            "id": "mfghst-episode-2-sub-indo"
          },
          {
            "title": "Episode 1",
            "id": "mfghst-episode-1-sub-indo"
          }
        ],
        "download": {
          "low_quality": {
            "quality": "360p",
            "size": "60.4 MB",
            "download_links": [
              {
                "host": "OtakuFiles",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVINWpYWTJuNXdCcjZmTHJ1Ym1aNnpsaU5ZYXF1bXd5QWZ3VGpubEZNSnZrdFpDOWp4dDR1M2xabElzVERUVHNDYll1Z0xvVkJQR0ZkMXQ2cUFNSmc9"
              },
              {
                "host": "Kraken",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVENERYWXluWi9BN2VKYy91ZGd0enoxeVpZYStyK2tDdzVra21QcTJzOCtsaFVBczZxOFpHL2pRPT0="
              },
              {
                "host": "PDrain",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVZK3l6V3czeHJDN0tDTHJhUmdKNnBqalY0SklEY3d4a3c="
              },
              {
                "host": "VidHide",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVlK3pEYnhueDhHcW1ETHJhUmdKNjZqaUFFZjZ6azJ6NEVuV1B3cWc9PQ=="
              },
              {
                "host": "Mega",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVGOXpQU2dYWmpSYjJGYkxEUnVQV1o0amhzVDRHeXpRRXU5RStwNzFjeXAxQklJWm5qb2FtRDJhNHp3eENmTDc3Z2ZxeGt3MEVuT1hZaThJNjZLTGJGL3c9PQ=="
              }
            ]
          },
          "medium_quality": {
            "quality": "480p",
            "size": "107.6 MB",
            "download_links": [
              {
                "host": "OtakuFiles",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVINWpYWTJuNXdCcjZmTHJ1Ym1aN3AxVFpNZXFiZ21TMVN6VFRubEZNSnZrdFpDOWp4dDR1M2xabElzVERUVHNDYll1OEZvVkJQR0ZkMXQ2cUFNSmc9"
              },
              {
                "host": "Kraken",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVENERYWXluWi9BN2VKYy91ZGd0enoxeVpZYStyanp4TWd6SDJZZ1ZGZitsaFVBczZxOFpHL2pRPT0="
              },
              {
                "host": "PDrain",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVZK3l6V3czeHJDN0tDTHJhUmdKNnBqaVpVUmJYKzRtRXc="
              },
              {
                "host": "VidHide",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVlK3pEYnhueDhHcW1ETHJhUmdKNjZqajFWTHFEdzJENEYybUw5ckE9PQ=="
              },
              {
                "host": "Mega",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVGOXpQU2dYWmpSYjJGYkxEUmxmNjM4SDUrZElHeTRETXUvWFNCNDIwWTQxWmZJdnIxeTYyVjA0ZFRvem1mRnE3eVdaaFkzVkpaSGtJSzlaS2hBcHk1bWc9PQ=="
              }
            ]
          },
          "high_quality": {
            "quality": "720p",
            "size": "220.6 MB",
            "download_links": [
              {
                "host": "OtakuFiles",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVINWpYWTJuNXdCcjZmTHJ1Ym1aN3V6SHBRZi96bjJEZGVuVDNubEZNSnZrdFpDOWp4dDR1M2xabElzVERUVHNDYll1d1BvVkJQR0ZkMXQ2cUFNSmc9"
              },
              {
                "host": "Kraken",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVENERYWXluWi9BN2VKYy91ZGd0enoxeVpZYStyRjd6UUErelR4aTBOZCtsaFVBczZxOFpHL2pRPT0="
              },
              {
                "host": "PDrain",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVZK3l6V3czeHJDN0tDTHJhUmdKNnBqaDBMUzdQNWtRWTQ="
              },
              {
                "host": "VidHide",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVlK3pEYnhueDhHcW1ETHJhUmdKNjZqanRTWnZQKzBXUmQzV2Foc1E9PQ=="
              },
              {
                "host": "Mega",
                "link": "https://desustream.com/safelink/link/?id=eXRoOHNYVG9UdnVGOXpQU2dYWmpSYjJGYkxEUnZOT0syeGRzWDZTeXd4UW1ua2VOcVV3UnZHY05OTnpSOXRTaXM1TlZqaytmRlpEbGNPdFE4MFVVUDIwVzFJZU5FSVMwbGc9PQ=="
              }
            ]
          }
        },
        "mirrorData": {
          "title": "MF Ghost Episode 11 Subtitle Indonesia",
          "link_stream": "https://desudrive.com/dstream/desudesuhd3/index.php?id=cW9rc0Rpc05lSnRXZW9GaTBiY0ZJemZ4aGdQcFpzemhDbVBabjFPMmlTST0="
        },
        "resolutions": {
          "360p": [],
          "480p": [
            {
              "driver": "desudesuhd3",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjowLCJxIjoiNDgwcCJ9"
            },
            {
              "driver": "filelions",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjoxLCJxIjoiNDgwcCJ9"
            },
            {
              "driver": "odstream",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjoyLCJxIjoiNDgwcCJ9"
            },
            {
              "driver": "mega",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjozLCJxIjoiNDgwcCJ9"
            }
          ],
          "720p": [
            {
              "driver": "filelions ",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjowLCJxIjoiNzIwcCJ9"
            },
            {
              "driver": "odstreamhd ",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjoxLCJxIjoiNzIwcCJ9"
            },
            {
              "driver": "mega ",
              "link": "/api/streaming/eyJpZCI6MTU0MzczLCJpIjoyLCJxIjoiNzIwcCJ9"
            }
          ]
        }
      };

    res.json(data);

});
app.get('/api/genre-list/', (req, res) => {
    const data = {
        "Status": "Success",
        "GenreList": [
          {
            "genre": "Action"
          },
          {
            "genre": "Adventure"
          },
          {
            "genre": "Comedy"
          },
          {
            "genre": "Demons"
          },
          {
            "genre": "Drama"
          },
          {
            "genre": "Ecchi"
          },
          {
            "genre": "Fantasy"
          },
          {
            "genre": "Game"
          },
          {
            "genre": "Harem"
          },
          {
            "genre": "Historical"
          },
          {
            "genre": "Horror"
          },
          {
            "genre": "Josei"
          },
          {
            "genre": "Magic"
          },
          {
            "genre": "Martial Arts"
          },
          {
            "genre": "Mecha"
          },
          {
            "genre": "Military"
          },
          {
            "genre": "Music"
          },
          {
            "genre": "Mystery"
          },
          {
            "genre": "Psychological"
          },
          {
            "genre": "Parody"
          },
          {
            "genre": "Police"
          },
          {
            "genre": "Romance"
          },
          {
            "genre": "Samurai"
          },
          {
            "genre": "School"
          },
          {
            "genre": "Sci-Fi"
          },
          {
            "genre": "Seinen"
          },
          {
            "genre": "Shoujo"
          },
          {
            "genre": "Shoujo Ai"
          },
          {
            "genre": "Shounen"
          },
          {
            "genre": "Slice of Life"
          },
          {
            "genre": "Sports"
          },
          {
            "genre": "Space"
          },
          {
            "genre": "Super Power"
          },
          {
            "genre": "Supernatural"
          },
          {
            "genre": "Thriller"
          },
          {
            "genre": "Vampire"
          }
        ]
      };

    res.json(data);
});
app.get('/api/genres/:genre/', (req, res) => {
    const genre = parseInt(req.params.genre);
    const data = {
        "Status": "Success",
        "GenreResult": [
          {
            "title": "Sengoku Youko: Senma Konton-hen",
            "animeUrl": "https://otakudesu.cloud/anime/sengoku-youko-s2-sub-indo/",
            "studio": "White Fox",
            "episodes": "22 Eps",
            "genres": "Action, Adventure, Fantasy, Historical, Mythology, Shounen",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/07/Sengoku-Youko-Senam-Konton.jpg",
            "synopsis": "",
            "releaseDate": "Summer 2024"
          },
          {
            "title": "Tasuuketsu",
            "animeUrl": "https://otakudesu.cloud/anime/tasuketsu-sub-indo/",
            "studio": "Satelight",
            "episodes": "Unknown Eps",
            "genres": "Action, Drama, Psychological, Suspense",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/07/143629.jpg",
            "synopsis": "Suatu hari, dunia tiba-tiba mengalami kejadian aneh yang mana hampir seluruh masyarkat Jepang tewas. Kini, hanya tersisa 1 juta orang yang masih hidup. Sekarang, orang yang masih hidup harus mengikuti sebuah permainan.Aturannya cuman satu, yakni Kematian Mayoritas. Itu berarti, seluruh orang yang tersisa harus bertahan hidup dan melawan kekuatan yang nantinya akan mengubah takdir mereka.",
            "releaseDate": "Summer 2024"
          },
          {
            "title": "Blue Archive the Animation",
            "animeUrl": "https://otakudesu.cloud/anime/blue-archive-sub-indo/",
            "studio": "Yostar Pictures, Studio CANDY BOX",
            "episodes": "12 Eps",
            "genres": "Action, Fantasy, School",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/12/Blue-Archive-the-Animation-Sub-Indo.jpg",
            "synopsis": "Berlatar belakang di Kivotos, sebuah kota akademis yang berisikan ribuan sekolah. Di sini, setiap siswa yang membawa senjata ke sekolah merupakan hal lumrah dan biasa bagi semua orang. Cerita pun berpusat di SMA Abydos, sebuah sekolah yang sedang terancam bangkrut.Untuk menghindari hal tersebut, lima siswa memilih mempertahankan sekolah ini dengan memanggil guru mereka sebagai bala bantuan. Mampukah mereka berlima membuat sekolah mereka Kembali seperti dulu lagi?",
            "releaseDate": "Spring 2024"
          },
          {
            "title": "Seirei Gensouki Season 2",
            "animeUrl": "https://otakudesu.cloud/anime/seireig-s2-sub-indo/",
            "studio": "TMS Entertainment",
            "episodes": "12 Eps",
            "genres": "Action, Adventure, Fantasy, Harem, Isekai, Reincarnation, Romance",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/Seirei-Gensouki-Season-2-Subtitle-Indonesia.jpg",
            "synopsis": "",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Wajutsushi",
            "animeUrl": "https://otakudesu.cloud/anime/saikyou-shieshoku-sub-indo/",
            "studio": "Felix Film, Ga-Crew",
            "episodes": "Unknown Eps",
            "genres": "Action, Adventure, Fantasy",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/145446.jpg",
            "synopsis": "Mengisahkan Noel, seorang anak laki-laki dan juga cucu dari pahlawan legendaris bernama Over Death. Ketika kecil dulu, Noel kehilangan sang kakek karena melindungi dirinya dari serangan Void. Ia pun berjanji akan mengikuti jejak sang kakek menjadi seorang Seeker.Beberapa tahun setelahnya, Noel kini menjadi seorang Seeker dengan mengemban tugas sebagai pendukung karena ia tidak memiliki kekuatan untuk bertarung. Walau begitu, Noel yang jago dalam berkomunikasi menggunakan kemampuannya tersebut untuk membentuk sebuah kelompok.",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Arifureta Shokugyou de Sekai Saikyou Season 3",
            "animeUrl": "https://otakudesu.cloud/anime/arifureta-s3-sub-indo/",
            "studio": "asread.",
            "episodes": "16 Eps",
            "genres": "Action, Adventure, Fantasy, Harem, Isekai",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/Arifureta-Shokugyou-de-Sekai-Saikyou-Season-3.jpg",
            "synopsis": "",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Touken Ranbu Kai",
            "animeUrl": "https://otakudesu.cloud/anime/touken-ranbu-sub-indo/",
            "studio": "domerica",
            "episodes": "8 Eps",
            "genres": "Action, Anthropomorphic, Fantasy, Historical, Samurai",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/12/Touken-Ranbu-Kai-Sub-Indo.jpg",
            "synopsis": "Salah satu franchise adaptasi dari anime Touken Ranbu.",
            "releaseDate": "Spring 2024"
          },
          {
            "title": "Tsuki ga Michibiku Isekai Douchuu Season 2",
            "animeUrl": "https://otakudesu.cloud/anime/tsuki-michibiku-isekai-douchu-s2-sub-indo/",
            "studio": "J.C.Staff",
            "episodes": "25 Eps",
            "genres": "Action, Adventure, Comedy, Fantasy, Isekai",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/12/Tsuki-ga-Michibiku-Isekai-Douchuu-Season-2-Sub-Indo.jpg",
            "synopsis": "Season ke-2 dari anime Tsuki ga Michibiku Isekai Douchuu.",
            "releaseDate": "Winter 2024"
          },
          {
            "title": "Nageki no Bourei wa Intai shitai",
            "animeUrl": "https://otakudesu.cloud/anime/nageki-bourei-intai-shitai-sub-indo/",
            "studio": "Zero-G",
            "episodes": "Unknown Eps",
            "genres": "Action, Adventure, Fantasy",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/09/Nageki-no-Bourei-wa-Intai-shitai.jpg",
            "synopsis": "Di masa sekarang, orang-orang memilih untuk menjadi pemburu harta karun. Sebab, pekerjaan ini menjanjikan hasil yang sangat bagus. Walau begitu, untuk mendapatkan kekayaan, mereka harus bertaruh nyawa dalam menjalankan misi yang berbahaya.Krai Andrey, berhasil membuat sebuah kelompok paling kuat Bersama dengan teman masa kecilnya. Klan bernama First Step tersebut menjadi begitu populer di penjuru dunia. Karena kepopulerannya, seluruh teman masa kecilnya meminta Krai untuk menjadi pemimpin.",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Shangri-La Frontier Season 2",
            "animeUrl": "https://otakudesu.cloud/anime/shangri-frontier-s2-sub-indo/",
            "studio": "C2C",
            "episodes": "Unknown Eps",
            "genres": "Action, Adventure, Fantasy, Shounen",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/Shangri-La-Frontier-Season-2.jpg",
            "synopsis": "",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Nanatsu no Taizai: Mokushiroku no Yonkishi S2",
            "animeUrl": "https://otakudesu.cloud/anime/nanatsu-taizai-my-s2-sub-indo/",
            "studio": "Telecom Animation Film",
            "episodes": "Unknown Eps",
            "genres": "Action, Adventure, Fantasy, Shounen",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/Nanatsu-no-Taizai-Mokushiroku-no-Yonkishi-S2-Subtitle-Indonesia.jpg",
            "synopsis": "",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Fairy Tail: 100-nen Quest",
            "animeUrl": "https://otakudesu.cloud/anime/fairy-tail-100-quest-sub-indo/",
            "studio": "J.C.Staff",
            "episodes": "Unknown Eps",
            "genres": "Action, Adventure, Fantasy, Shounen",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/07/144083.jpg",
            "synopsis": "",
            "releaseDate": "Summer 2024"
          },
          {
            "title": "Ranma ½ (2024)",
            "animeUrl": "https://otakudesu.cloud/anime/ranma-2024-sub-indo/",
            "studio": "MAPPA",
            "episodes": "Unknown Eps",
            "genres": "Action, Comedy, Ecchi, Romance, Shounen",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/144299.jpg",
            "synopsis": "Menceritakan Ranma Saotome, seorang anak laki-laki yang dijodohkan dengan Akane Tendou, putri ketiga dari pemilik Dojo. Sayangnya, perjodohan mereka menemui jalan buntu. Hal ini tidak lepas dari masalah yang Ranma alami.Pasalnya, ia dan ayahnya yang telah berlatih di Jusenkyou Tiongkok secara tidak sengaja jatuh di sebuah kolam dan membuat Ranma bisa berubah menjadi seorang Wanita jika terkena air dingin. Sebaliknya, ia akan Kembali jadi pria jika terkena air panas.",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Ao no Exorcist: Yuki no Hate-hen",
            "animeUrl": "https://otakudesu.cloud/anime/aoexocist-yuki-hen-sub-indo/",
            "studio": "Studio VOLN",
            "episodes": "12 Eps",
            "genres": "Action, Mythology, School, Shounen, Supernatura",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/144043.jpg",
            "synopsis": "Illuminati, organisasi yang kini menjadi musuh terbesar bagi umat manusia. Kini, Rin dan kawan-kawannya akan segera menghadapi ujian Exorcist yang berlangsung dalam waktu 1,5 bulan lagi. Tentu, hal ini membuat mereka semua terkejut dan merasa bahwa ujian tersebut terlalu cepat.Usut punya usut, saat ini manusia kekurangan Exorcist. Maka dari itu, Akademi Seijuuji memutuskan merekrut Exorcist dari luar sembari menunggu ujian berlangsung. Sekarang, apakah Rin dan kawan-kawannya mampu menghadapi ujian tersebut.",
            "releaseDate": "Fall 2024"
          },
          {
            "title": "Party kara Tsuihou sareta Sono Chiyushi, Jitsu wa Saikyou ni Tsuki",
            "animeUrl": "https://otakudesu.cloud/anime/party-kara-chyishu-sub-indo/",
            "studio": "Studio Elle",
            "episodes": "12 Eps",
            "genres": "Action, Adventure, Fantasy",
            "coverImage": "https://otakudesu.cloud/wp-content/uploads/2024/10/141123l.jpg",
            "synopsis": "Lust, seorang petualang dengan role healer ini telah dikeluarkan dari party karena dianggap tidak memberikan kontribusi apapun. Walau begitu, ada seorang gadis bernama Narsena yang mengajak Lust untuk membentuk sebuah party.Awalnya, banyak yang meragukan Keputusan Narsena untuk membentuk party dengan Lust. Walau begitu, Narsena tetap bertekad agar bisa Bersama dengan pria tersebut. Usut punya usut, Lust merupakan orang yang menyelamatkan Narsenal Ketika diserang monster beberapa tahun lalu.",
            "releaseDate": "Fall 2024"
          }
        ]
      };

    res.json(data);

});
app.get('/api/schedule/', (req, res) => {
    const data = {
        "Status": "Success",
        "Schedule": {
          "Senin": [
            {
              "title": "Arifureta Shokugyou de Sekai Saikyou Season 3",
              "slug": "arifureta-s3-sub-indo"
            },
            {
              "title": "Goukon ni Ittara Onna ga Inakatta Hanashi",
              "slug": "goukon-itara-hanashi-sub-indo"
            },
            {
              "title": "Hoshifuru Oukoku no Nina",
              "slug": "hoshifuru-nina-sub-indo"
            },
            {
              "title": "Kami wa Game ni Ueteiru.",
              "slug": "kami-game-ueteiru-sub-indo"
            },
            {
              "title": "Love Live! Superstar!! Season 3",
              "slug": "love-superstar-s3-sub-indo"
            },
            {
              "title": "MF Ghost Season 2",
              "slug": "mf-ghst-s2-sub-indo"
            },
            {
              "title": "Nageki no Bourei wa Intai shitai",
              "slug": "nageki-bourei-intai-shitai-sub-indo"
            },
            {
              "title": "Tensei Kizoku, Kantei Skill de Nariagaru S2",
              "slug": "tensei-skill-nariagaru-s2-sub-indo"
            },
            {
              "title": "The iDOLM@STER Shiny Colors Season 2",
              "slug": "the-imas-shiny-colors-s2-sub-indo"
            },
            {
              "title": "Tsuma, Shougakusei ni Naru.",
              "slug": "tsumasho-sub-indo"
            }
          ],
          "Selasa": [
            {
              "title": "Natsume Yuujinchou Season 7",
              "slug": "ntsume-yujinchou-s7-sub-indo"
            },
            {
              "title": "Raise wa Tanin ga Ii",
              "slug": "raitanin-ga-ii-sub-indo"
            },
            {
              "title": "Rekishi ni Nokoru Akujo ni Naru zo",
              "slug": "rekishi-nokoru-naru-sub-indo"
            },
            {
              "title": "Wajutsushi",
              "slug": "saikyou-shieshoku-sub-indo"
            },
            {
              "title": "Seirei Gensouki Season 2",
              "slug": "seireig-s2-sub-indo"
            },
            {
              "title": "Youkai Gakkou no Sensei Hajimemashita!",
              "slug": "yokai-sensei-hajmeshita-sub-indo"
            }
          ],
          "Rabu": [
            {
              "title": "Amagami-san Chi no Enmusubi",
              "slug": "amagami-chi-sub-indo"
            },
            {
              "title": "Kimisen Season 2",
              "slug": "kimi-boku-saigo-senjou-s2-sub-indo"
            },
            {
              "title": "Re:Zero kara Hajimeru Isekai Seikatsu Season 3",
              "slug": "re-zero-s3-sub-indo"
            },
            {
              "title": "Tasuuketsu",
              "slug": "tasuketsu-sub-indo"
            }
          ],
          "Kamis": [
            {
              "title": "Acro Trip",
              "slug": "acrotrip-sub-indo"
            },
            {
              "title": "DanMachi Season 5",
              "slug": "dnmaci-season-5-sub-indo"
            },
            {
              "title": "Delico's Nursery",
              "slug": "delic-nursery-sub-indo"
            },
            {
              "title": "Isekai Suicide Squad",
              "slug": "isekai-squad-sub-indo"
            },
            {
              "title": "Kinoko Inu",
              "slug": "knko-inu-sub-indo"
            },
            {
              "title": "NegaPosi Angler",
              "slug": "nega-angler-sub-indo"
            },
            {
              "title": "Sengoku Youko: Senma Konton-hen",
              "slug": "sengoku-youko-s2-sub-indo"
            },
            {
              "title": "Shin Tennis no Oujisama: U-17 World Cup Semifinal",
              "slug": "tennis-world-cup-sub-indo"
            },
            {
              "title": "Touhai: Ura Rate Mahjong Touhai Roku",
              "slug": "touharate-mahjong-sub-indo"
            },
            {
              "title": "Yarinaoshi Reijou wa Ryuutei Heika wo Kouryakuchuu",
              "slug": "yarjou-ryuchu-sub-indo"
            }
          ],
          "Jumat": [
            {
              "title": "2.5-jigen no Ririsa",
              "slug": "2-5-jigen-sub-indo"
            },
            {
              "title": "Ao no Hako",
              "slug": "ao-hako-sub-indo"
            },
            {
              "title": "Dandadan",
              "slug": "dandan-sub-indo"
            },
            {
              "title": "Hitoribocchi no Isekai Kouryaku",
              "slug": "hitoribocchi-isekai-kyaku-sub-indo"
            },
            {
              "title": "Kekkon suru tte, Hontou desu ka",
              "slug": "kekkon-hontou-desu-ka-sub-indo"
            },
            {
              "title": "Mecha-ude (TV)",
              "slug": "meca-ude-sub-indo"
            },
            {
              "title": "Rurouni Kenshin: Meiji Kenkaku Romantan - Kyoto Douran",
              "slug": "rurouni-kenshin-s2-sub-indo"
            },
            {
              "title": "Sayounara Ryuusei, Konnichiwa Jinsei",
              "slug": "sayuseijinsei-sub-indo"
            },
            {
              "title": "Senpai wa Otokonoko",
              "slug": "senpai-otokonoko-sub-indo"
            },
            {
              "title": "Trillion Game",
              "slug": "trilion-game-sub-indo"
            }
          ],
          "Sabtu": [
            {
              "title": "Astro Note",
              "slug": "astro-n-sub-indo"
            },
            {
              "title": "Kabushikigaisha Magi-Lumière",
              "slug": "kabushikigaisha-lumiere-sub-indo"
            },
            {
              "title": "Sword Art Online Alternative: Gun Gale Online S2",
              "slug": "sao-alternative-online-s2-sub-indo"
            }
          ],
          "Minggu": [
            {
              "title": "Ao no Exorcist: Yuki no Hate-hen",
              "slug": "aoexocist-yuki-hen-sub-indo"
            },
            {
              "title": "Bleach: Sennen Kessen-hen - Soukoku-tan",
              "slug": "bleach-oukoku-tan-sub-indo"
            },
            {
              "title": "Blue Lock Season 2",
              "slug": "blelock-s2-sub-indo"
            },
            {
              "title": "Chi.: Chikyuu no Undou ni Tsuite",
              "slug": "chi-chikyuu-tsuite-sub-indo"
            },
            {
              "title": "Fairy Tail: 100-nen Quest",
              "slug": "fairy-tail-100-quest-sub-indo"
            },
            {
              "title": "Kimi wa Meido-sama.",
              "slug": "meido-sama-sub-indo"
            },
            {
              "title": "Maou 2099",
              "slug": "maou-2099-sub-indo"
            },
            {
              "title": "Maou-sama, Retry! R",
              "slug": "maou-retry-r-sub-indo"
            },
            {
              "title": "Nanatsu no Taizai: Mokushiroku no Yonkishi S2",
              "slug": "nanatsu-taizai-my-s2-sub-indo"
            },
            {
              "title": "One Piece",
              "slug": "1piece-sub-indo"
            },
            {
              "title": "Party kara Tsuihou sareta Sono Chiyushi, Jitsu wa Saikyou ni Tsuki",
              "slug": "party-kara-chyishu-sub-indo"
            },
            {
              "title": "Ranma ½ (2024)",
              "slug": "ranma-2024-sub-indo"
            },
            {
              "title": "Shangri-La Frontier Season 2",
              "slug": "shangri-frontier-s2-sub-indo"
            }
          ],
          "Random": [
            {
              "title": "Kamonohashi Ron no Kindan Suiri Season 2",
              "slug": "kamonohashi-suiri-s2-sub-indo"
            },
            {
              "title": "Tonari no Youkai-san",
              "slug": "tonari-youkai-sub-indo"
            }
          ]
        }
      };

    res.json(data);

});
app.get('/api/list-banner', (req, res) => {
    const data = {
        "status": "Success",
        "banners": [
          {
            "imageUrl": "https://wallpapers-clan.com/wp-content/uploads/2024/04/asuka-evangelion-pink-anime-gif-preview-desktop-wallpaper.gif",
            "title": "What you are looking for?",
            "subtitle": "Find your favorite Anime between more than 10,000 Anime"
          },
          {
            "imageUrl": "https://wallpapers-clan.com/wp-content/uploads/2024/03/nezuko-glowing-eyes-demon-slayer-gif-desktop-wallpaper-cover.gif",
            "title": "Explore the latest Anime!",
            "subtitle": "Explore a wide range of genres."
          },
          {
            "imageUrl": "https://gifdb.com/images/high/sad-anime-houtarou-oreki-q6hgcd04mwtpt2vj.gif",
            "title": "Find more than 10,000 Anime!",
            "subtitle": "Discover anime from all over the world."
          }
        ]
      };

    res.json(data);

});

app.get('/api/search/?s:search&post_type=anime/', (req, res) => {
    const data = {
        "Status": "Success",
        "Anime": [
          {
            "judul": "Trillion Game",
            "episode": "Episode 11",
            "hari": "Jumat",
            "tanggal": "06 Des",
            "img": "https://otakudesu.cloud/wp-content/uploads/2024/10/Trillion-Game.jpg",
            "slug": "trilion-game-sub-indo",
            "status": "Ongoing"
          },
        ]
    };

    res.json(data);

});

app.get('/api/app/status/', (req, res) => {
    const data = {
            "Status": "Success",
            "Message": ""
    };

    res.json(data);

});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`(data dummy)`);
});
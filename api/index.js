const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { default: Axios } = require("axios");
const qs = require("qs");

const app = express();
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

app.get('/api/listroute', (req, res) => {
    res.send(`Welcome to the Anime Scraper API!`);
});

const getLastPageOngoing = async () => {
    try {
        const { data } = await axios.get(`${baseURL}/ongoing-anime/`);
        const $ = cheerio.load(data);

        const pages = [];
        $('.pagination .page-numbers').each((i, el) => {
            const page = $(el).text().trim();
            if (!isNaN(page)) {
                pages.push(parseInt(page));
            }
        });

        return Math.max(...pages);
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getLastPageComplete = async () => {
    try {
        const { data } = await axios.get(`${baseURL}/complete-anime/`);
        const $ = cheerio.load(data);

        const pages = [];
        $('.pagination .page-numbers').each((i, el) => {
            const page = $(el).text().trim();
            if (!isNaN(page)) {
                pages.push(parseInt(page));
            }
        });

        return Math.max(...pages);
    } catch (error) {
        console.error(error);
        return null;
    }
};

const extractSlugFromUrl = (url) => {
    const match = url.match(/\/anime\/([^\/]+)/);
    return match ? match[1] : null;
};

const extractEpisodeFromUrl = (url) => {
    const match = url.match(/\/episode\/([^\/]+)/);
    return match ? match[1] : null;
};

const extractEpisodeFromSlug = (url) => {
    const match = url.match(/episode-(\d+|ova\d+)-sub-indo/);
    if (match) {
        return match[1]; 
    } else {
        return "movie";
    }
};



app.get('/api/ongoing/page/:page', async (req, res) => {
    const page = parseInt(req.params.page);

    try {
        const lastPage = await getLastPageOngoing();

        if (page > lastPage || page < 1) {
            return res.status(400).json({ error: `Page ${page} is out of range. Please choose a page between 1 and ${lastPage}.` });
        }

        const url = page === 1 ? `${baseURL}/ongoing-anime/` : `${baseURL}/ongoing-anime/page/${page}/`; 

        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);

        const animeList = [];

        $('li').each((i, el) => {
            const parent = $(el);

            const judul = parent.find('.jdlflm').text().trim();
            const episode = parent.find('.epz').text().trim();
            const hari = parent.find('.epztipe').text().trim();
            const tanggal = parent.find('.newnime').text().trim();
            const img = parent.find('.thumbz img').attr('src');
            const animeUrl = parent.find('a').attr('href');
            const status = 'Ongoing';

            const slug = animeUrl ? extractSlugFromUrl(animeUrl) : null;

            if (judul && episode && hari && tanggal && img && slug) {
                animeList.push({ judul, episode, hari, tanggal, img, slug, status });
            }
        });

        res.json({ Status: 'Success', maxPage: lastPage, Anime: animeList });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/complete/page/:page', async (req, res) => {
    const page = parseInt(req.params.page); 

    try {
        const lastPage = await getLastPageComplete();

        if (page > lastPage || page < 1) {
            return res.status(400).json({ error: `Page ${page} is out of range. Please choose a page between 1 and ${lastPage}.` });
        }

        const url = page === 1 ? `${baseURL}/complete-anime/` : `${baseURL}/complete-anime/page/${page}/`; 

        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);

        const animeList = [];

        $('li').each((i, el) => {
            const parent = $(el);

            const judul = parent.find('.jdlflm').text().trim();
            const episode = parent.find('.epz').text().trim();
            const hari = parent.find('.epztipe').text().trim();
            const tanggal = parent.find('.newnime').text().trim();
            const img = parent.find('.thumbz img').attr('src');
            const animeUrl = parent.find('a').attr('href');
            const status = 'Complete';

            const slug = animeUrl ? extractSlugFromUrl(animeUrl) : null;

            if (judul && episode && hari && tanggal && img && slug) {
                animeList.push({ judul, episode, hari, tanggal, img, slug, status });
            }
        });

        res.json({ Status: 'Success', maxPage: lastPage, Anime: animeList });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/random', async (req, res) => {
    try {
        const lastPageComplete = await getLastPageComplete();
        const lastPageOngoing = await getLastPageOngoing();

        const randomPageComplete = Math.floor(Math.random() * lastPageComplete) + 1;
        const randomPageOngoing = Math.floor(Math.random() * lastPageOngoing) + 1; 


        const isComplete = Math.random() < 0.5;

        const url = isComplete
            ? (randomPageComplete === 2 ? `${baseURL}/complete-anime/` : `${baseURL}/complete-anime/page/${randomPageComplete}/`)
            : (randomPageOngoing === 2 ? `${baseURL}/ongoing-anime/` : `${baseURL}/ongoing-anime/page/${randomPageOngoing}/`);

        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);

        const animeList = [];

        $('li').each((i, el) => {
            const parent = $(el);

            const judul = parent.find('.jdlflm').text().trim();
            const episode = parent.find('.epz').text().trim();
            const hari = parent.find('.epztipe').text().trim();
            const tanggal = parent.find('.newnime').text().trim();
            const img = parent.find('.thumbz img').attr('src');
            const animeUrl = parent.find('a').attr('href');
            const status = isComplete ? 'Complete' : 'Ongoing';

            const slug = animeUrl ? extractSlugFromUrl(animeUrl) : null;

            if (judul && episode && hari && tanggal && img && slug) {
                animeList.push({ judul, episode, hari, tanggal, img, slug, status });
            }
        });

        res.json({
            Status: 'Success',
            currentPage: isComplete ? randomPageComplete : randomPageOngoing, 
            maxPage: { lastPageComplete, lastPageOngoing },
            Anime: animeList
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/anime/:slug', async (req, res) => {
    const slug = req.params.slug;

    const handleNull = (value) => (value === null || value === undefined ? 'none' : value);

    try {
        const url = `${baseURL}/anime/${slug}/`;
        const { data } = await axios.get(url, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authority': 'otakudesu.cloud',
                'Method': 'GET',
                'Path': `/anime/${slug}/`,
                'Scheme': 'https',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cache-Control': 'max-age=0',
                'Cookie': '_ga=GA1.2.219227550.1730100697; _gid=GA1.2.186202313.1733230554; _gat=1; _ga_025LZFQCB2=GS1.2.1733418001.22.1.1733418004.0.0.0',
                'If-Modified-Since': 'Thu, 05 Dec 2024 14:50:09 GMT',
                'Priority': 'u=0, i',
                'Referer': `${baseURL}/`, // pastikan referer sesuai
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });

        const $ = cheerio.load(data);

        const name = handleNull($('.jdlrx h1').text().trim());

        const deskripsi = {
            judul: handleNull($('.infozingle').text().match(/Judul:\s*(.*?)(?=Japanese:)/)?.[1].trim()),
            japanese: handleNull($('.infozingle').text().match(/Japanese:\s*(.*?)(?=Skor:)/)?.[1].trim()),
            skor: 'none',
            produser: handleNull($('.infozingle').text().match(/Produser:\s*(.*?)(?=Tipe:)/)?.[1].trim()),
            tipe: handleNull($('.infozingle').text().match(/Tipe:\s*(.*?)(?=Status:)/)?.[1].trim()),
            status: handleNull($('.infozingle').text().match(/Status:\s*(.*?)(?=Total Episode:)/)?.[1].trim()),
            total_episode: handleNull($('.infozingle').text().match(/Total Episode:\s*(.*?)(?=Durasi:)/)?.[1].trim()),
            durasi: handleNull($('.infozingle').text().match(/Durasi:\s*(.*?)(?=Tanggal Rilis:)/)?.[1].trim()),
            tanggal_rilis: handleNull($('.infozingle').text().match(/Tanggal Rilis:\s*(.*?)(?=Studio:)/)?.[1].trim()),
            studio: handleNull($('.infozingle').text().match(/Studio:\s*(.*?)(?=Genre:)/)?.[1].trim()),
            genre: handleNull($('.infozingle').text().match(/Genre:\s*(.*)/)?.[1].trim()),
            season: 'Unknown',
            sinopsis: handleNull($('.sinopc').text().trim()),
            img_cover: handleNull($('.fotoanime img').attr('src')),
            img_bg: 'https://i.pinimg.com/originals/db/54/37/db5437539b009ea93def4dd29f0ca0fd.gif',
        };

        const episodes = [];
        $('.episodelist').each((_, episodelist) => {
            const title = $(episodelist).find('.smokelister .monktit').text();
        
            if (title.includes('Episode List')) {
                $(episodelist)
                    .find('ul li')
                    .each((i, el) => {
                        const title = handleNull($(el).find('a').text().trim());
                        const episodeUrl = $(el).find('a').attr('href');
                        const releaseDate = handleNull($(el).find('.zeebr').text().trim());
        
                        const slug_episode = episodeUrl ? extractEpisodeFromUrl(episodeUrl) : 'Movie';
                        const episode = slug_episode ? extractEpisodeFromSlug(slug_episode) : 'Movie';
        
                        episodes.push({
                            title,
                            slug_episode,
                            episode,
                            release_date: releaseDate,
                        });
                    });
            }
        });

        if (name && deskripsi && episodes) {
            const anime = { name, deskripsi, episodes };
            res.json({ Status: 'Success', Anime: anime });
        } else {
            res.status(404).send('Data anime tidak ditemukan');
        }
    } catch (error) {
        const userIp = req.ip || req.connection.remoteAddress;
        console.error('Error occurred from IP:', userIp);
        res.status(500).send(`Server error. Request made from IP: ${userIp}`);
    }
});


function _epsQualityFunction(num, res) {
    const $ = cheerio.load(res);
    const element = $(".download");
    const download_links = [];
    let qualityData;

    element.find("ul").filter(function () {
        const quality = $(this).find("li").eq(num).find("strong").text();
        const size = $(this).find("li").eq(num).find("i").text();
        $(this).find("li").eq(num).find("a").each(function () {
            const _list = {
                host: $(this).text(),
                link: $(this).attr("href"),
            };
            download_links.push(_list);
            qualityData = { quality, size, download_links };
        });
    });

    return qualityData;
}

function _notFoundQualityHandler(res, num) {
    const $ = cheerio.load(res);
    const download_links = [];
    const element = $('.download');
    let qualityData;

    element.filter(function () {
        if ($(this).find('.anime-box > .anime-title').eq(0).text() === '') {
            $(this).find('.yondarkness-box').filter(function () {
                const quality = $(this).find('.yondarkness-title').eq(num).text().split('[')[1].split(']')[0];
                const size = $(this).find('.yondarkness-title').eq(num).text().split(']')[1].split('[')[1];
                $(this).find('.yondarkness-item').eq(num).find('a').each((idx, el) => {
                    const _list = {
                        host: $(el).text(),
                        link: $(el).attr("href"),
                    };
                    download_links.push(_list);
                    qualityData = { quality, size, download_links };
                });
            });
        } else {
            $(this).find('.anime-box').filter(function () {
                const quality = $(this).find('.anime-title').eq(num).text().split('[')[1].split(']')[0];
                const size = $(this).find('.anime-title').eq(num).text().split(']')[1].split('[')[1];
                $(this).find('.anime-item').eq(num).find('a').each((idx, el) => {
                    const _list = {
                        host: $(el).text(),
                        link: $(el).attr("href"),
                    };
                    download_links.push(_list);
                    qualityData = { quality, size, download_links };
                });
            });
        }
    });

    return qualityData;
}

app.get('/api/episode/:episode', async (req, res) => {
    const episodeId = req.params.episode;
    const url = `${baseURL}/episode/${episodeId}`;

    try {
        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);
        const streamElement = $("#lightsVideo").find("#embed_holder");

        const id = $("link[rel='shortlink']").attr("href").match(/p=(\d+)/)[1];
        const title = $(".venutama > h1").text();
        const slug = $("div.flir > a:contains('Episodes')").attr("href")?.match(/\/anime\/([^\/]+)/)[1] || "-";
        const currentslug = episodeId;
        const stream_link = streamElement.find("iframe").attr("src");
        const prev_eps_slug = $("div.flir > a:contains('Previous')").attr("href")?.match(/\/episode\/([^\/]+)/)[1] || "-";
        const next_eps_slug = $("div.flir > a:contains('Next')").attr("href")?.match(/\/episode\/([^\/]+)/)[1] || "-";

        const resolutions = {
            "360p": [],
            "480p": [],
            "720p": []
        };

        const episode_list = [];
        $("div.keyingpost > li").each((i, element) => {
            const dataEpsList = {
                title: $(element).find("a").text(),
                id: $(element).find("a").attr("href").match(/\/episode\/([^\/]+)/)[1]
            };
            episode_list.push(dataEpsList);
        });

        $('#embed_holder > div.mirrorstream > ul.m360p > li').each((k, v) => {
            const driver = $(v).text();
            resolutions["360p"].push({
                driver: driver,
                link: "/api/streaming/" + $(v).find('a').data().content
            });
        });

        $('.mirrorstream > .m480p > li').each((k, v) => {
            const driver = $(v).text();
            resolutions["480p"].push({
                driver: driver,
                link: "/api/streaming/" + $(v).find('a').data().content
            });
        });

        $('.mirrorstream > .m720p > li').each((k, v) => {
            const driver = $(v).text();
            resolutions["720p"].push({
                driver: driver,
                link: "/api/streaming/" + $(v).find('a').data().content
            });
        });

        let low_quality, medium_quality, high_quality;
        if ($('#venkonten > div.venser > div.venutama > div.download > ul > li:nth-child(1)').text() === '') {
            low_quality = _notFoundQualityHandler(data, 0);
            medium_quality = _notFoundQualityHandler(data, 1);
            high_quality = _notFoundQualityHandler(data, 2);
        } else {
            low_quality = _epsQualityFunction(0, data);
            medium_quality = _epsQualityFunction(1, data);
            high_quality = _epsQualityFunction(2, data);
        }

        const mirrorData = {};
        const titleMirror = $(".venutama > h1").text();
        const streamLink = $('#pembed > div > iframe').attr('src');

        if (titleMirror && streamLink) {
            mirrorData.title = titleMirror;
            mirrorData.link_stream = streamLink;
        }

        res.json({
            id,
            title,
            slug,
            currentslug,
            stream_link,
            prev_eps_slug,
            next_eps_slug,
            episode_list,
            download: { low_quality, medium_quality, high_quality },
            mirrorData,
            resolutions
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/streaming/:link', async (req, res) => {
    const link = req.params.link;
    try {
        let nonce = await episodeHelper.getNonce();

        const html_streaming = await episodeHelper.getUrlAjax(link, nonce); 
        const parse = cheerio.load(html_streaming);
        const streamingLink = parse('iframe').attr('src'); 
        const obj = {};
        obj.streaming_url = streamingLink;

        res.send(obj);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

const episodeHelper = {
    getNonce: async () => {
        let payload = {
            action: "aa1208d27f29ca340c92c66d1926f13f"
        }

        try {
            let url = `${baseURL}/wp-admin/admin-ajax.php`
            const response = await Axios.post(url, qs.stringify(payload), {
                headers: {
                    'Origin': baseURL,
                    'Cookie':'_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                    'Referer': baseURL,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            
            return response.data.data
        } catch (error) {
            console.log(error)
            return null
        }
    },
    getUrlAjax: async (content, nonce) => {
        try {
            let _e = JSON.parse(atob(content))
            let payload = {
                ..._e,
                nonce: nonce,
                action: "2a3505c93b0035d3f455df82bf976b84"
            }

            let url = `${baseURL}/wp-admin/admin-ajax.php`
            const response = await Axios.post(url, qs.stringify(payload), {
                headers: {
                    'Origin': baseURL,
                    'Cookie':'_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                    'Referer': baseURL,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            })
            

            return atob(response.data.data)
        } catch (error) {
            console.log(error.message)
            return null;
        }
    },
    get: async (url) => {
        try {
          const response = await Axios.get(url);
          const $ = cheerio.load(response.data);
          let source1 = $.html().search('"file":');
          let source2 = $.html().search("'file':");
       
          if (source1 !== -1) {
            const end = $.html().indexOf('","');
            return $.html().substring(source1 + 8, end);
          } else if (source2 !== -1) {
            const end = $.html().indexOf("','");
            return $.html().substring(source2 + 8, end);
          }
          return "-";
        } catch (error) {
          return "-";
        }
    },
    notFoundQualityHandler: (res, num) => {
        const $ = cheerio.load(res);
        const download_links = [];
        const element = $('.download')
        let response;
    
        element.filter(function () {
            if ($(this).find('.anime-box > .anime-title').eq(0).text() === '') {
                $(this).find('.yondarkness-box').filter(function () {
                    const quality = $(this).find('.yondarkness-title').eq(num).text().split('[')[1].split(']')[0];
                    const size = $(this).find('.yondarkness-title').eq(num).text().split(']')[1].split('[')[1];
                    $(this).find('.yondarkness-item').eq(num).find('a').each((idx, el) => {
                        const _list = {
                            host: $(el).text(),
                            link: $(el).attr("href"),
                        };
                        download_links.push(_list);
                        response = { quality, size, download_links };
                    })
                })
            } else {
                $(this).find('.anime-box').filter(function () {
                    const quality = $(this).find('.anime-title').eq(num).text().split('[')[1].split(']')[0];
                    const size = $(this).find('.anime-title').eq(num).text().split(']')[1].split('[')[1];
                    $(this).find('.anime-item').eq(num).find('a').each((idx, el) => {
                        const _list = {
                            host: $(el).text(),
                            link: $(el).attr("href"),
                        };
                        download_links.push(_list);
                        response = { quality, size, download_links };
                    })
                })
            }
        })
        return response;
    
    },
    epsQualityFunction: (num, res) => {
        const $ = cheerio.load(res);
        const element = $(".download");
        const download_links = [];
        let response;
    
        element.find("ul").filter(function () {
            const quality = $(this).find("li").eq(num).find("strong").text();
            const size = $(this).find("li").eq(num).find("i").text();
            $(this).find("li").eq(num).find("a").each(function () {
                const _list = {
                    host: $(this).text(),
                    link: $(this).attr("href"),
                };
                download_links.push(_list);
                response = { quality, size, download_links };
    
            });
        });
        return response;
    },
    batchQualityFunction: (num, res) => {
        const $ = cheerio.load(res);
        const element = $(".batchlink");
        const download_links = [];
        let response;
        element.find("ul").filter(function () {
          const quality = $(this).find("li").eq(num).find("strong").text();
          const size = $(this).find("li").eq(num).find("i").text();
          $(this)
            .find("li")
            .eq(num)
            .find("a")
            .each(function () {
              const _list = {
                host: $(this).text(),
                link: $(this).attr("href"),
              };
              download_links.push(_list);
              response = { quality, size, download_links };
            });
        });
        return response;
      }
}

module.exports = episodeHelper

app.get('/api/genre-list/', async (req, res) => {
    try {
        const url = `${baseURL}/genre-list/`;
        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);

        const genreList = [];

        $('ul.genres a').each((i, el) => {
            const genre = $(el).text().trim();

            if (genre) {
                genreList.push({ genre });
            }
        });

        res.json({ Status: 'Success', GenreList: genreList });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/genres/:genre', async (req, res) => {
    const genre = req.params.genre;

    try {
        const url = `${baseURL}/genres/${genre}/`;
        const { data } = await axios.get(url, {
          headers: {
                'Origin': baseURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '_ga=GA1.2.826878888.1673844093; _gid=GA1.2.1599003702.1674031831; _gat=1',
                'Referer': baseURL,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        const $ = cheerio.load(data);

        const GenreResult = [];

        $('.col-md-4.col-anime-con').each((i, el) => {
            const parent = $(el);

            const title = parent.find('.col-anime-title a').text().trim();
            const animeUrl = parent.find('.col-anime-title a').attr('href');
            const studio = parent.find('.col-anime-studio').text().trim();
            const episodes = parent.find('.col-anime-eps').text().trim();
            const genres = parent.find('.col-anime-genre').text().trim();
            const coverImage = parent.find('.col-anime-cover img').attr('src');
            const synopsis = parent.find('.col-synopsis p').text().trim();
            const releaseDate = parent.find('.col-anime-date').text().trim();

            if (title && animeUrl && studio && episodes && genres && coverImage) {
                GenreResult.push({
                    title,
                    animeUrl,
                    studio,
                    episodes,
                    genres,
                    coverImage,
                    synopsis,
                    releaseDate,
                });
            }
        });

        res.json({ Status: 'Success', GenreResult });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/schedule/', async (req, res) => {
    try {

        const { data } = await axios.get(`${baseURL}/jadwal-rilis/`);
        
        const $ = cheerio.load(data);

        const schedule = {};

        $('div.kglist321').each((index, element) => {
            const day = $(element).find('h2').text(); 
            const animes = [];

            $(element).find('ul li a').each((i, anime) => {
                const title = $(anime).text(); 
                const link = $(anime).attr('href');
                const slug = link ? extractSlugFromUrl(link) : null;
                animes.push({ title, slug });
            });

            schedule[day] = animes;
        });

        res.json( { Status: 'Success', Schedule: schedule } );
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/list-banner', (req, res) => {
    const banners = [
        {
            imageUrl: 'https://wallpapers-clan.com/wp-content/uploads/2024/04/asuka-evangelion-pink-anime-gif-preview-desktop-wallpaper.gif',
            title: 'What you are looking for?',
            subtitle: 'Find your favorite Anime between more than 10,000 Anime',
        },
        {
            imageUrl: 'https://wallpapers-clan.com/wp-content/uploads/2024/03/nezuko-glowing-eyes-demon-slayer-gif-desktop-wallpaper-cover.gif',
            title: 'Explore the latest Anime!',
            subtitle: 'Explore a wide range of genres.',
        },
        {
            imageUrl: 'https://gifdb.com/images/high/sad-anime-houtarou-oreki-q6hgcd04mwtpt2vj.gif',
            title: 'Find more than 10,000 Anime!',
            subtitle: 'Discover anime from all over the world.',
        },
    ];

    res.json({ status: 'Success', banners });
});

module.exports = app;

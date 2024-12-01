const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

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

app.get('/api/ongoing/page/:page', async (req, res) => {
    const page = parseInt(req.params.page);

    try {
        const lastPage = await getLastPageOngoing();

        if (page > lastPage || page < 1) {
            return res.status(400).json({ error: `Page ${page} is out of range. Please choose a page between 1 and ${lastPage}.` });
        }

        const url = page === 1 ? `${baseURL}/ongoing-anime/` : `${baseURL}/ongoing-anime/page/${page}/`; 

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const animeList = [];

        $('li').each((i, el) => {
            const parent = $(el);

            const judul = parent.find('.jdlflm').text().trim();
            const episode = parent.find('.epz').text().replace('Episode ', '').trim();
            const hari = parent.find('.epztipe').text().trim();
            const tanggal = parent.find('.newnime').text().trim();
            const img = parent.find('.thumbz img').attr('src');
            const animeUrl = parent.find('a').attr('href');

            const slug = animeUrl ? extractSlugFromUrl(animeUrl) : null;

            if (judul && episode && hari && tanggal && img && slug) {
                animeList.push({ judul, episode, hari, tanggal, img, slug });
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

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const animeList = [];

        $('li').each((i, el) => {
            const parent = $(el);

            const judul = parent.find('.jdlflm').text().trim();
            const episode = parent.find('.epz').text().replace('Episode ', '').trim();
            const hari = parent.find('.epztipe').text().trim();
            const tanggal = parent.find('.newnime').text().trim();
            const img = parent.find('.thumbz img').attr('src');
            const animeUrl = parent.find('a').attr('href');

            const slug = animeUrl ? extractSlugFromUrl(animeUrl) : null;

            if (judul && episode && hari && tanggal && img && slug) {
                animeList.push({ judul, episode, hari, tanggal, img, slug });
            }
        });

        res.json({ Status: 'Success', maxPage: lastPage, Anime: animeList });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.get('/api/anime/:slug', async (req, res) => {
    const slug = req.params.slug; 
    try {
        const url = `${baseURL}/anime/${slug}`;
 
        const { data } = await axios.get(url);
        const $ = cheerio.load(data); 
        
        const name = $('.jdlrx h1').text().trim();

        const deskripsi = {
            judul: $('.infozingle').text().match(/Judul:\s*(.*?)(?=Japanese:)/)?.[1].trim(),
            japanese: $('.infozingle').text().match(/Japanese:\s*(.*?)(?=Skor:)/)?.[1].trim(),
            skor: parseFloat($('.infozingle').text().match(/Skor:\s*(\d+\.\d+)/)?.[1].trim()),
            produser: $('.infozingle').text().match(/Produser:\s*(.*?)(?=Tipe:)/)?.[1].trim(),
            tipe: $('.infozingle').text().match(/Tipe:\s*(.*?)(?=Status:)/)?.[1].trim(),
            status: $('.infozingle').text().match(/Status:\s*(.*?)(?=Total Episode:)/)?.[1].trim(),
            total_episode: $('.infozingle').text().match(/Total Episode:\s*(.*?)(?=Durasi:)/)?.[1].trim(),
            durasi: $('.infozingle').text().match(/Durasi:\s*(.*?)(?=Tanggal Rilis:)/)?.[1].trim(),
            tanggal_rilis: $('.infozingle').text().match(/Tanggal Rilis:\s*(.*?)(?=Studio:)/)?.[1].trim(),
            studio: $('.infozingle').text().match(/Studio:\s*(.*?)(?=Genre:)/)?.[1].trim(),
            genre: $('.infozingle').text().match(/Genre:\s*(.*)/)?.[1].trim(),
        };

        const sinopsis = $('.sinopc').text().trim();
        const img = $('.fotoanime img').attr('src');

        if (name && deskripsi && sinopsis && img) {
            const anime = { name, deskripsi, sinopsis, img };
            res.json({ Status: 'Success', Anime: anime });
        } else {
            res.status(404).send('Data anime tidak ditemukan');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while scraping the website');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`
        ██████╗░██╗██╗░░██╗███████╗██████╗░██████╗░
        ██╔══██╗██║██║░██╔╝██╔════╝██╔══██╗██╔══██╗
        ██║░░██║██║█████═╝░█████╗░░██████╔╝██████╔╝
        ██║░░██║██║██╔═██╗░██╔══╝░░██╔══██╗██╔══██╗
        ██████╔╝██║██║░╚██╗███████╗██║░░██║██║░░██║
        ╚═════╝░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝`);
});




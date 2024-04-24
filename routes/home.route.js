import { Router } from 'express';
import Jimp from 'jimp';
import { nanoid } from 'nanoid/non-secure';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));


router.get('/', (req, res) => {
    return res.render('home')
})

router.post('/img', async (req, res) => {
    const {url} = req.body;
    console.log(url)
    const image = await Jimp.read(url);

    const buffer = await image
                    .resize(350, 350)
                    .grayscale()
                    .getBufferAsync(Jimp.MIME_JPEG);

    const directory = `${__dirname}/../public/img/${nanoid()}.jpeg`
    await image.writeAsync(directory);

    res.set("Content-Type", "image/jpeg")
    return res.send(buffer)
})


export default router;
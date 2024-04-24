import express from 'express';
import { engine } from 'express-handlebars';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import routeHome from './routes/home.route.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'))

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname, '/views'));

app.use('/', routeHome);


app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})
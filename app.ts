import express, { Application, Request, Response } from "express";
import fs, { Stats } from 'fs';
import path from "path";
const app: Application = express();
const port = 3000;
import { fileURLToPath } from 'url'
import { getFileInfo } from './util/file';
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)
console.log('__dirnameNew :>> ', __dirnameNew);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirnameNew, '/public')));


app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})



try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
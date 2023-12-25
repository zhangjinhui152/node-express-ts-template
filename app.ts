import express, { Application, Request, Response } from "express";
import child_process from 'child_process';
import util from 'util';
import path from "path";
const exec = util.promisify(child_process.exec);
const fs = require('fs');

const app: Application = express();
const port = 3000;
import { fileURLToPath } from 'url'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)







const runStartAp = async function () {
    child_process.exec('bash /home/zjh/startAp.sh', (error, stdout, stderr) => {
        if (!error) {
            // 成功
            console.log('stdout :>> ', stdout);
        } else {
            // 失败
            console.log('stdout :>> ', stdout);
            console.log('stdout :>> ', error);
        }
    });
}
const runStopAp = async function () {
    child_process.exec('sudo bash /home/k123du/stopAp.sh', (error, stdout, stderr) => {
        if (!error) {
            // 成功
            console.log('success stdout :>> ', stdout);
            child_process.exec("sudo reboot", (error, stdout, stderr) => {

            })
        } else {
            // 失败
            console.log('error stdout :>> ', stdout);
            console.log('error stdout :>> ', error);
        }
    });
}


console.log('__dirnameNew :>> ', __dirnameNew);
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirnameNew, '/public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirnameNew, '/public/index.html'));
})
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirnameNew, '/public/serach.html'));
})
app.post('/sumbitSMP', (req, res) => {
    console.log(req.body);
    // res.send('ok');
    let vimdata =
        `
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1
    
    network={
            ssid="${req.body.name}"
            psk="${req.body.password}"
    }
    `
    console.log('vimdata :>> ', vimdata);
    fs.writeFileSync('/etc/wpa_supplicant/wpa_supplicant.conf', vimdata);
    // return
    runStopAp()
    res.send("ok 啊哦捏，瓦达西这就重启desh！")
})
app.get('/join', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('ok');
})


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
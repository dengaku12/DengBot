const Discord = require('discord.js');
const {Client, MessageAttachment} = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios');
var Scraper = require('images-scraper');
require('dotenv').config();

const PREFIX = '$';

bot.on('ready', () => {
    console.log("DengBot is now online!! :)");
})

bot.on('message', msg=>{
    if(!msg.content.startsWith(PREFIX)) return;
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            msg.channel.send('ping me again my guy :gun:');
            break;
        
        case 'plug':
            if(args[1]==='twitter'){
                msg.channel.send('https://twitter.com/MichaelOdusanya');
            }else if(args[1]==='github'){
                msg.channel.send('https://github.com/dengaku12');
            }else if(args[1]==='linkedin'){
                msg.channel.send('https://www.linkedin.com/in/michael-odusanya/');
            }else{
                msg.channel.send('wtf am i pluggin bro? I dont recognize this shit :( ')
            }
            break;
        
        case 'userInfo':
            const embed = new Discord.MessageEmbed()
            .setTitle("User Info")
            .addField('Player Name', msg.author.username)
            .addField('Server Name', msg.guild.name)
            .setColor(0xff33f6)
            .setThumbnail(msg.author.displayAvatarURL())
            msg.channel.send(embed);
            break;
        
        case 'bless':
            const query = args.slice(1);
            image(msg, query);
            break;
        
        case 'sosa':
            msg.channel.send("Fuckers in school telling me, always in the barber shop Chief Keef ain’t bout this, Chief Keef ain’t bout that My boy a BD on fucking Lamron and them He, he they say that nigga don’t be putting in no work SHUT THE FUCK UP! Y'all niggas ain’t know shit All ya motherfuckers talk about Chief Keef ain’t no hitta Chief Keef ain’t this Chief Keef a fake SHUT THE FUCK UP Y'all don’t live with that nigga Y'all know that nigga got caught with a ratchet Shootin' at the police and shit Nigga been on probation since fuckin, I don’t know when! Motherfuckers stop fuckin' playin' him like that Them niggas savages out there If I catch another motherfucker talking sweet about Chief Keef I’m fucking beating they ass! I’m not fucking playing no more You know those niggas role with Lil' Reese and them");
            break;
        
        case 'gintoki':
            const attach = new MessageAttachment("https://media.giphy.com/media/kdM3zfq85XSb6/giphy.gif");
            msg.channel.send(attach);
            break;

        case 'joke':
            joke(msg);
            break;

        case 'meme':
            if(!args[1]){
                meme(msg);
            }else{
                meme(msg, args[1]);
            }
            break;
    }
});

function image(msg, input){
    const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${process.env.SEARCH_ENGINE_ID}&imgSize=imgSizeUndefined&num=10&q=${input}&searchType=image&key=${process.env.GOOGLE_API_KEY}`;
    axios.get(url)
    .then((resp)=>{
        const images = resp.data.items;
        msg.channel.send(images[Math.floor(Math.random()*images.length)].link);
    })
    .catch((err)=>{
        console.log(err);
        msg.channel.send("Gimme somethin to search for dummy :unamused:");
    })
}

function joke(msg){
    const url = "https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes";
    axios.get(url)
    .then((resp)=>{
        const jok = resp.data;
        msg.channel.send(jok.setup);
        msg.channel.send(jok.punchline);
    })
    .catch((err)=>{
        console.log(err);
    });
}

function meme(msg, input){
    let url;
    if(!input){
        url = "https://meme-api.herokuapp.com/gimme";
    }else{
        url = "https://meme-api.herokuapp.com/gimme/" + input;
    }
    axios.get(url)
    .then((resp)=>{
        const mem = resp.data;
        msg.channel.send(mem.url);
    })
    .catch((err)=>{
        console.log(err);
        msg.channel.send("Thats not a vaild subreddit, try again bro :smiling_imp:");
    });
}

bot.login(process.env.BOT_TOKEN);
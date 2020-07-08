const Discord = require("discord.js");
const profanities = require('profanities')
const bot = new Discord.Client();
const auth = require("./authchillybot.json");
const fs = require("fs");
const token = auth.token; //This makes an object called Token which stores the token of the Discord BOT
const prefix = auth.prefix;


//The following variables are all arrays
var appositive = ["Absobloodylutely!", "Sure!", "Ok Boomer", "Okay?", "Coolio",
    "Fun Fact: An 1000-sided polygon is called a chiliagon!"];
var reppositive = ["what are those!?", "what are those!?", "how's your day going", 
    "how's it going chillidudes", "is that a wrap?", "my sincerest apologies", "are you ok?"]
var cmd = ["ping", "hi", "hello"]
var basicSwears = ["fuck", "shit", "bitch", "b1tches", "cunt", "ass", "b1tch", "niger", "asshole", "fuq", "fvck", 
    "nigga", "shit", "sh1t", "cunt", "shit", "f0ck", "shiit", "sh1t", "whore", "fock", "@$$", "@ss", "a$$","sex"]
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var swearResonpses = ["You have no right to swear!", "Ha, NOPE!", "Stop forking swearing!", "LANGUAGE!", 
"\nIt's a beautiful day in this neighborhood, \na beautiful day to be a neighbor. \nSo won't you please, STOP SWEARING!",
"There are other more \"Family-Friendly\" ways to express yourself!", "Swears are not permitted in this server!", 
"Refrain from expressing yourself in such obscene terminology, PLEASE AND THANK YOU!", 
"*Police Officer:* \"Mam, where did your parenting skills all go wrong?\" \n  *Mother:* \"I-, I-, My children used to be good kids, I promise!... until I let them start swearing.\"",
"Do you talk to YO MAMA with those words?!", "Stop, just stop."]


//The following variables are NOT arrays :)


//These bottom four variables convert the array into a usable string. rss stands for rawSwearString
var rss = JSON.stringify(profanities)
var rss1 = rss.replace("[", "")
var rss2 = rss1.replace("]", "")
var rss3 = rss2.replace(/\"/g, "")

//Necessary refinements Section: The following variables removes words from the swear list that are NOT necessarily swears
var rss4 = rss3.replace(",ho", "") //"who"
var rss5 = rss4.replace(",kid", "")
var rss6 = rss5. replace(",gay", "")
var rss7 = rss6. replace("ky", "")


var extensiveSwears = rss7.split(",")

//For testing purposes ONLY
//console.log(rss4)
//console.log(extensiveSwears[5])
//console.log(swears[2])



/*This ENTIRE Next paragraph is  A HORRIBLE ALOGRITHIM but is necessary for the line of work that you achieve.
  delay(5000): THIS function just gobbles up time. It is just wastes time b4 another function occurs. */
async function delay(ms) {
    var startt = new Date();
    var endT = new Date(           new Date().getTime()                 +                                                      ms                                           );
    //                       Program puts it in automatically       Plus(duh)        Programmer-inputted Time (each specific func has a different amount of time for)

    while (endT >= new Date()) {
        if ((endT - new Date()) % 1000 === 0) {
            console.log((endT - new Date())/1000 + `seconds until IT happens...`)
        }
    }
}


bot.on("ready", function() {
    //This bottom section sends an opening msg to the Teapot Discord Server; not working for the fan club server tho
    /*
    let helpMenu = JSON.parse(fs.readFileSync("./Help1.json"));
    let e = {
        title: "Chilly Commands",
        description: "Bot Prefix = '&'",
        fields: helpMenu,
    }
    bot.channels.get("675528897009287169", "730186568865939527").send(`${bot.user.username} has been ` + 
    `activated in order to provide for a more wholesome and chill server.`)
    .then((msg) => {
        msg.channel.send("Here is a list of commands:", {embed: e});
    });
    */
    if (bot.guilds.size === 1) {
        console.log(`${bot.user.username} has been initiated. Serving ${bot.guilds.size} server.`)
    } else {
        console.log(`${bot.user.username} has been initiated. Serving ${bot.guilds.size} servers.`)
    }
    });

bot.on("message", async function(msg) {

    if(!(msg.author.bot)) {
        
        //ONLY use this to PREVENT all messages from being sent in to the server by users
        /* 
        for (loop of alphabet) {
            if(msg.content.toLowerCase().startsWith(loop)) {
                msg.delete();
            } 
        }
        */
        let swearBool = true;
        for (let swearLoop of basicSwears) {
            if(msg.content.toLowerCase().includes(swearLoop)) {
                let demo = Math.round(Math.random()*10);
                console.log("The following swear word was found in your server: \n" + swearLoop)
                msg.channel.send("HEY " + msg.author + "! " + swearResonpses[demo]);
                msg.delete();
                swearBool = false;
                break;
            } 
        }
        
        if (swearBool) {
            for (let swearLoop1 of extensiveSwears) {
                if(msg.content.toLowerCase().includes(swearLoop1)) {
                    let demo = Math.round(Math.random()*10);
                    console.log("The following swear word was found in your server: \n" + swearLoop1);
                    msg.channel.send("HEY " + msg.author + "! " + swearResonpses[demo]);
                    msg.delete();
                    break;
                } 
            }
        }
        if(msg.content.startsWith(prefix)) {

            msg.content = msg.content.substr(1);
            var args2 = msg.content.split(" ");
            var m = msg.content.toLowerCase();

            if (m === "ping") {
                var start = Date.now();
                msg.channel.send("pong").then(function(msg) {
                    var end = Date.now();
                    msg.edit(`Pong ${end-start} ms`);
                });

            } else if (reppositive.includes(m)) {
                msg.channel.send(appositive[Math.floor(Math.random()*appositive.length)]);

            } else if (m === "help") {
                msg.channel.send("Hi there fella! If you type the '&' sign followed by a command," +  
                "you might just get a very special reply!").then(function(msg) {
                    let helpMenu = JSON.parse(fs.readFileSync("./Help1.json"));
                    let e = {
                        description: "Bot Prefix = " + prefix,
                        fields: helpMenu,
                        title: "Chilly Commands",
                    }
                    msg.channel.send({embed: e});
                });

            } else if (m === "hi") {
                msg.channel.send("Hey")

            }   /* //FIX L8er else if (m.startsWith("tickle")) {
                msg.channel.send("success!")
                console.log("success!")
                let user = args2[1];
                if (user.includes(bot.user.id) || user.toLowerCase().includes(bot.user.username.toLowerCase())) {
                    msg.channel.send("You have no right to tickle me!");
                } else {
                    msg.channel.send("Woah! That was a firm tickle on " + user);
                }
                
            } */ else if (m === "fillthechatwithfun") {
                msg.channel.send("Why did the chicken cross the road?")
                msg.channel.send("To practice safe social distancing! HAHAHAHAHAHA")

            } else if (m === "password") {
                msg.channel.send("you_sly_dog...")

            } else if (m === "school") {
                msg.channel.send("HEY! YOU HAVE NO RIGHT TO USE SUCH VOCABULARY IN THIS SERVER!");

            } else if (1) {

            } else if (1) {

            } else if (1) {

            }  
        }
    } else { // <-- Only for what ChillyBot sends
        if (msg.content === "you_sly_dog...") {
        }
    }
})

bot.login(token);

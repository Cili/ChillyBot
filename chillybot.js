const Discord = require("discord.js");
const profanities = require("./chillybotSpecificProfanities.json"); 
//The JSON file that is required above was altered from the original module titled "profanities." This package can be found on https://github.com/words/profanities
const bot = new Discord.Client();
const config = require("./configchillybot.json");
const fs = require("fs");
const idList = require("./id.json");
const { assert } = require("console");
const helpMenuJSON = JSON.parse(fs.readFileSync("./chillyHelp.json"));
const helpMenuEmbed = {
    title: "Chilly Commands",
    description: "Bot Prefix = '&'",
    fields: helpMenuJSON,
}

//The following variables/arrays arse all from the configchillybot.json file
const token = config.token; //This makes an object called Token which stores the token of the Discord BOT
const prefix = config.prefix;
const appositive = config.appositive;
const reppositive = config.reppositive;
const cmd = config.cmd;
const alphabet = config.alphabet;
const swearResponses = config.swearResponses;
const serverIds = idList.serverIds;
const names = idList.names;
const chillyWords = config.chillyWords;
const swearMistakes = config.swearMistakes;
const botResponses = config.botResponses;
const restrictionResponses = config.restrictionResponses;

//Miscellaneous Variables
var stringy = "******************************************"
var stringy2 = "------------------------------------------------------------------------------------"
var restrictionLevel;
var notice = ` Please contact <@!${names[1][0]}> for more info.`
var botPrevent = false;
var openingMsg = false;  //Set this to true if you want to notify the server that ChillyBot has gone online!
var restrictionIncrementor = -1;



//These bottom four variables convert the array into a usable string. rss stands for rawSwearString
var rss = JSON.stringify(profanities);
var rss1 = rss.replace("[", "");
var rss2 = rss1.replace("]", "");
// eslint-disable-next-line no-useless-escape -- The double quotations marks escape character surrounded by regex is necessary to convert a JSON object into a usable array
var rss3 = rss2.replace(/\"/g, "");

var extensiveSwears = rss3.split(",");


/*This ENTIRE Next paragraph is  A HORRIBLE ALOGRITHIM but is necessary for the line of work that you achieve.
  delay(5000): THIS function just gobbles up time. It is just wastes time b4 another function occurs. */
async function delay(ms) {
    //var startt = new Date();
    var endT = new Date(           new Date().getTime()                 +                                                      ms                                           );
    //                       Program puts it in automatically       Plus(duh)        Programmer-inputted Time (each specific func has a different amount of time for)

    while (endT >= new Date()) {
        if ((endT - new Date()) % 1000 === 0) {
            console.log((endT - new Date())/1000 + "seconds until IT happens...");
        }
    }
}


bot.once("ready", function() {

    //This bottom section sends an opening msg to all the servers that ChillyBot is on
    if(openingMsg) {
        for (number of serverIds) {
            bot.channels.get(number[1]).send(stringy2 + `\n${bot.user.username} has been ` + 
                "activated in this server in order to provide for a more wholesome and chill server.").then((msg) => {
            msg.channel.send("Here is a list of commands:", {embed: helpMenuEmbed});
            msg.channel.send(stringy2)
            });
        }
    }

    console.log("\n" + stringy)
    if (bot.guilds.size === 1) {
        console.log(`${bot.user.username} has been initiated. Serving ${bot.guilds.size} server.`);
    } else {
        console.log(`${bot.user.username} has been initiated. Serving ${bot.guilds.size} servers.`);
    }
    console.log(stringy)
});

bot.on("message", async msg => {

    //The Following few lines run first in order to minimize wasted memory usage
    if(msg.author.username === names[0][1]) {return;} //returns all code if ChillyBot speaks

    console.log(`
    \nMessage: ${msg}
    Username: ${msg.author.username}. 
    UserID: ${msg.author.id}. 
    ServerName: ${msg.guild.name}. 
    ServerID: ${msg.guild.id}.
    `);

    for(let cycle of names) {
        if(cycle[3]) {
            if(msg.author.id == cycle[0]) {
                msg.delete();
                let demo = Math.floor(Math.random()*7);
                console.log(demo);
                msg.channel.send("HEY" + msg.author + "!\n" + restrictionResponses[demo] + "\n" + notice);
                return;
            }
        }
    }
    
    if(botPrevent && msg.author.bot) {
        msg.delete();
        let demo = Math.floor(Math.random()*10);
        msg.channel.send(`HEY ${msg.author}! \n` + botResponses[demo]);
        
    }
    
    //The Following Code DEFINES and then RUNS the function for advanced Swear Censorship in the server
    let swearBool = true; 
    function hasSwears(swearList) {
        firstLoop:
        for (let swearLoop of swearList) {   //Goes through each of the swears in the swear List that is provided in the parameter

            if(msg.content.toLowerCase().includes(swearLoop)) { //checks to see if ANY part of any word on the provided swear list is in the message
                let args0 = msg.content.toLowerCase().split(" ");
                secondLoop:
                for(let orbit of args0) {
                    if(orbit.includes(swearLoop)) {
                        thirdLoop:
                        for(let revolution of swearMistakes) {
                            if(orbit === revolution) {
                                console.log("Beep.")
                                swearBool = false;  //Required to stop second loop of checking for swears
                                break firstLoop;
                            }
                        }
                    }
                } 
                fourthLoop:
                for(let cycle of chillyWords) {  //checks to 
                    if(msg.content.toLowerCase().includes(cycle)) {
                        msg.delete();
                        msg.channel.send("HEY " + msg.author + "! \nNot only have you chosen to desecrate this sacred server with your foul language, " + 
                            "but you have also chosen to use such language alongside JON CILI's name!!! \nHow could you commit such an atrocious action?!");
                        console.log("\nThe following swear word was found in your server along side Jon Cili's name: \n *" + swearLoop + 
                            "*\n\nIt was identified in the following message: \n" + "*" + msg.content + "*");
                        swearBool = false;
                        break firstLoop;
                    }
                }
                msg.delete();
                let demo = Math.floor(Math.random()*10);
                console.log("\nThe following swear word was found in your server: \n *" + swearLoop + "*\n\nIt was identified in the following message: \n" + 
                    "*" + msg.content + "*");
                msg.channel.send("HEY " + msg.author + "! " + swearResponses[demo]);
                swearBool = false;
                break;
            } 
        } 
    }
    hasSwears(extensiveSwears);

    if(msg.content.trim().startsWith(prefix) && msg.content.trim().length > 1) {

        var noPrefixMsg = msg.content.substr(1).toLowerCase();
        var mArgs = noPrefixMsg.split(" ");
        var command = mArgs[0];
        var user;
        var commandOnlyMsg = true;
        if(noPrefixMsg.length > command.length) {
            user = mArgs[1].replace("!", "");
            var commandOnlyMsg = false;
        } 


        if (command === "ping") {
            var start = Date.now();
            msg.channel.send("pong").then(function(msg) {
                var end = Date.now();
                msg.edit(`Pong ${end-start} ms`);
            });

        } else if (reppositive.includes(noPrefixMsg)) {
            msg.channel.send(appositive[Math.random()*(appositive.length - 1)]);

        } else if (command === "help") {
            msg.channel.send("Hi there fella! If you type the '&' sign followed by a command," +  
            "you might just get a very special reply!").then(function(msg) {
                msg.channel.send({embed: helpMenuEmbed});
            });

        } else if (command === "hi") {
            msg.channel.send("Hey");

        } else if (command === "tickle") {
            if(!(commandOnlyMsg)) {
                if(user === `${msg.author}`) {
                    msg.channel.send(`HEY ${msg.author}, you have no right to tickle yourself!`)
                } else if(user === `<@${names[0][0]}>`) {
                    msg.channel.send("You have no right to tickle me!");
                } else {
                    msg.channel.send("Woah! That was a firm tickle on " + user);
                }
            } else {
                msg.channel.send(`Hey ${msg.author}, you have to specify the person ***whom*** shall be tickled. I can't tickle air just yet.`)
            }
        
        } else if (command === "fillthechatwithfun") {
            msg.channel.send("Why did the chicken cross the road?");
            msg.channel.send("To practice safe social distancing! HAHAHAHAHAHA");

        } else if (command === "password") {
            msg.channel.send("you_sly_dog...");
    
        } else if (command == "restrict") {
            if(msg.author.username === names[1][1]) {
                if(!(commandOnlyMsg)) {
                    for(let cycle of names) {
                        restrictionIncrementor++;
                        if(user === `<@${cycle[0]}>`) {
                            names[restrictionIncrementor][3] = true;
                            msg.channel.send(`The ability for <@${cycle[0]}> to verbalize in this server has been temporarily revoked.`);
                            console.log(names);
                            return;
                        } 
                    }
                    msg.channel.send("I appologize " + msg.author + " but it appears that the user you are attempting to restrict is not present in this server.");
                } else {
                    msg.channel.send(`Hey ${msg.author}, you have to specify the person ***whom*** shall be restricted. I can't restrict *"nobody"*... Unless nobody is someone on this server:eyes:`)
                }
            } else {
                msg.channel.send("HEY " + msg.author + "! You aren't ***authorized*** to use that command!");
            }
        } else if(command === "server") {
            msg.channel.send(`You are currently situated in the ***${msg.guild.name}*** server`);
        } else if(command === "members") {
            if(msg.guild.memberCount > 2) { //asserting that memberCount will NEVER equal 0 or 1 while the bot is being used in the server
                msg.channel.send(`It appears that there are a total of ***${msg.guild.memberCount}*** members in this server.`)
            } else {
                msg.channel.send(`It's just you and me pal...`);
            }
        } else if(command === "partytime") {
            msg.channel.send("@everyone it's PARTYTIME");
        }
    }
});

bot.login(token);

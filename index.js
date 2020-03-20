const FormData = require('form-data');
const cron = require("node-cron");
const express = require('express');
let formdatabody = 
[
    {
        "entry.380784503":"SIM",
        "entry.348251266":"30",
        "entry.1198114269":"Camargo"
    },
    {
        "entry.380784503":"SIM",
        "entry.348251266":"17",
        "entry.1198114269":"Felipe"
    }
];

// let formdatabody = 
// [
//     {
//         "entry.2083108767": "a",
//         "entry.2005620554": "aaaaaaaaaaaaaaaaa",
//         "entry.1045781291": 302
//     }
// ]

let formdataArray = [];

function request()
{
    try
    {
        for (let index = 0; index < formdatabody.length; index++) 
        {
            let keyval = Object.entries(formdatabody[index]).map(([key,value])=> ({key,value}));
            formdataArray[index] = new FormData();
            keyval.map(e=>
            {
                formdataArray[index].append(e.key,e.value);
            });
            formdataArray[index].submit("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeG4lo0PuSQp5Zu6sav5Mhlr26_EIj12kDNiOPt6yeAtBPXZg/formResponse",(err, res)=>
            {
                if (err) console.log(err);
                res.resume();
            });
        }
    }
    catch(err)
    {
        console.log("ERRO:" + err);
    }
    finally
    {
        let date = Date.now();
        console.log(`Requsições realizdas, hórario: ${new Date(Date.now()).toLocaleString()}`);
    }
}

cron.schedule("0 0 7 * * 1,2,3,4,5,6", () =>{request();},{timezone:"America/Sao_Paulo"});

cron.schedule("* * * * * *", () =>{console.log("App funcionando: " + new Date(Date.now()).toLocaleString())},{timezone:"America/Sao_Paulo"});

// cron.schedule("0 40 15 * * *", () =>{console.log("App Com timezone certo: " + new Date(Date.now()).toLocaleString())},{timezone:"America/Sao_Paulo"});

let app = express.application;
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log(`Servidor ouvindo na porta: ${PORT}`);
});



#!/usr/bin/env /usr/local/bin/node
// prem = 2021
//champs league = 2007

const fetch = require("node-fetch");
const premApiUrl = "https://api.football-data.org/v2/competitions/2021/matches?status=LIVE";
const champApiUrl = "https://api.football-data.org/v2/competitions/2001/matches?status=LIVE";
const authToken = "AUTH_TOKEN";

fetchMatchData();

async function fetchMatchData() {
    try {
        const res = await fetch(champApiUrl, {
            headers: {
                'X-Auth-Token': authToken
            }
        });
        const data = await res.json();
        if (data.count === 0) {
            console.log("❌ ⚽");
        } else {
            const matchData = data.matches;
            matchData.forEach((match) => {
                console.log(getScoreInfo(match))
            });
        }
    } catch (err) {
        console.log("❌")
    }
    logMenu(); 
}

function logMenu() {
    console.log("---"); 
    console.log("Options");    
    console.log("--Refresh | refresh=true");    
}

function getScoreInfo(match) {
    const homeTeamScore = match.score.fullTime.homeTeam;
    const awayTeamScore = match.score.fullTime.awayTeam;

    var homeTeamName = getTeamName(match.homeTeam.name);
    var awayTeamName = getTeamName(match.awayTeam.name);

    return homeTeamName + ": " + homeTeamScore 
                + " vs " +
                 awayTeamName + ": " + awayTeamScore;
}

function getTeamName(teamName) {
    if (teamName.substring(0, teamName.indexOf(" ")).length == 2) { //FC
        return teamName.substring(3, 6).toUpperCase();
    } else if(teamName.substring(0, teamName.indexOf(" ")).length == 3) { //AFC
        return teamName.substring(4, 7).toUpperCase();
    } else {
        return teamName.substring(0, 3).toUpperCase();
    }
}
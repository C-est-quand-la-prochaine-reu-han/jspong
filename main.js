token = "0ca7498892b9d855a206bd5d4dda60133bb65a27"
path = "http://localhost:8000/appong/api/"
debug = true


headers = {
    'Authorization': 'Token ' + token,
    'Content-Type':'application/json'
}

async function get() {
    let response = await fetch(path, { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_matches() {
    let response = await fetch(path + 'match', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_users() {
    let response = await fetch(path + 'user', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_tournament() {
    let response = await fetch(path + 'tournament', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_number_of_matches() {
    let response = await fetch(path + 'match', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

async function get_number_of_users() {
    let response = await fetch(path + 'user', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

async function get_number_of_tournaments() {
    let response = await fetch(path + 'tournament', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

async function get_match_by_id(id) {
    let response = await fetch(path + 'match/' + id, { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_user_by_id(id) {
    let response = await fetch(path + 'user/' + id, { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_tournament_by_id(id) {
    let response = await fetch(path + 'tournament/' + id, { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_matches_of_user(id) {
    let data = await get_all_matches();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].player1 === id || data[i].player2 === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(data);
    return data;
}

async function get_all_matches_of_tournament(id) {
    let data = await get_all_matches();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].tournament === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(data);
    return data;
}

async function get_all_tournaments_from_creator(id) {
    let data = await get_all_tournament();
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].creator === id) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(data);
    return data;
}

async function get_all_tournaments_of_user(id) {
    let data = await get_all_matches_of_user(id);
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        let tournament = await get_tournament_by_id(data[i].tournament);
        tournaments.push(tournament);
    }
    if (debug)
        console.log(data);
    return data;
}

get_all_matches()





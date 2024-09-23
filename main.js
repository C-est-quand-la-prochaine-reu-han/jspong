token = "9e81fbfd3c32255e0393b64ecd6f76e5267a0262"
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
    let response = await fetch(path + 'match/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_users() {
    let response = await fetch(path + 'user/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_all_tournament() {
    let response = await fetch(path + 'tournament/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

async function get_number_of_matches() {
    let response = get_all_matches();
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

async function get_number_of_users() {
    let response = await fetch(path + 'user/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

async function get_number_of_tournaments() {
    let response = await fetch(path + 'tournament/', { headers : headers });
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


async function get_all_matches_of_tournament(id) {
    let data = await get_all_matches();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].tournament === null)
            continue;
        if (data[i].tournament === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(data);
    return data;
}

async function get_all_users_of_tournament(id) {
    let data = await get_all_matches_of_tournament(id);
    let users = [];
    for (let i = 0; i < data.length; i++) {
        let user1 = await get_user_by_id(data[i].player1);
        let user2 = await get_user_by_id(data[i].player2);
        if (!users.includes(user1))
            users.push(user1);
        if (!users.includes(user2))
            users.push(user2);
    }
    if (debug)
        console.log(data);
    return data;
}

async function get_all_users_of_match(id) {
    let data = await get_match_by_id(id);
    let user1 = await get_user_by_id(data.player1);
    let user2 = await get_user_by_id(data.player2);
    if (debug)
        console.log(data);
    return [user1, user2];
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


async function get_username_by_id(id) {
    let user = await get_user_by_id(id);
    if (debug)
        console.log(user.user.username);
    return user.user.username;
}

async function get_nickname_by_id(id) {
    let user = await get_user_by_id(id);
    if (debug)
        console.log(user.user.username);
    return user.user.user_nick;
}

async function create_user(username, password) {
    let data = {
        "user": {
            "username": username,
            "password": password
        },
        "user_nick": username
    };    
    let response = await fetch(path + 'user/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    let user = await response.json();
    if (debug)
        console.log(user);
    return user;
}

async function update_user_nickname(id, nickname) {
    let data = {
        "user_nick": nickname
    };    
    let response = await fetch(path + 'user/' + id + '/', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    });
    let user = await response.json();
    if (debug)
        console.log(user);
    return user;
}


// TODO: Verifier que cela fonctionne
async function update_user_avatar(id, avatar) {
    if (avatar)
    {
        const formData = new FormData();
        formData.append('avatar', file);
        let response = await fetch(path + 'user/' + id + '/', {
            method: 'PUT',
            headers: headers,
            body: avatar
        });
        let user = await response.json();
        if (debug)
            console.log(user);
    }
    return user;
}

async function create_tournament(name, pending) {
    let data = {
        "name": name,
        "pending": pending
    };    
    let response = await fetch(path + 'tournament/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    let tournament = await response.json();
    if (debug)
        console.log(tournament);
    return tournament;
}

async function confirm_tournament(id) {
    let response = await fetch(path + 'tournament/' + id + '/confirm/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    let tournament = await response.json();
    if (debug)
        console.log(tournament);
    return tournament;
}

async function create_match(player1, player2, tournament) {
    let data = {
        "tournament": tournament,
        "player1": player1,
        "player2": player2,
    };
    let response = await fetch(path + 'match/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    let match = await response.json();
    if (debug)
        console.log(match);
    return match;
}


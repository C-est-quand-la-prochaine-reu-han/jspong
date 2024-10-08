let token = "9e81fbfd3c32255e0393b64ecd6f76e5267a0262";
let path = "http://localhost:8000/appong/api/";
let debug = false;


let headers = {
    'Authorization': 'Token ' + token,
    'Content-Type':'application/json'
}

export async function get() {
    let response = await fetch(path, { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_users() {
    let response = await fetch(path + 'user/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_dashboard() {
    let response = await fetch(path + 'dashboard/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_tournament() {
    let response = await fetch(path + 'tournament/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_number_of_matches() {
    let response = await fetch(path + 'match/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}


export async function get_number_of_users() {
    let response = await fetch(path + 'user/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

export async function get_number_of_tournaments() {
    let response = await fetch(path + 'tournament/', { headers : headers });
    let data = await response.json();
    if (debug)
        console.log(data.length);
    return data.length;
}

export async function get_user_by_id(id) {
    let response = await fetch(path + 'user/', { headers : headers });
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].pk === id) {
            if (debug)
                console.log(data[i]);
            return data[i];
        }
    }
    throw "User not found";
}

export async function get_tournament_by_id(id) {
    let response = await fetch(path + 'tournament/' + id, { headers : headers });
    if (response.status == 404)
        throw "Tournament not found";
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_matches_of_user(id) {
    let response = await fetch(path + 'match/', { headers : headers });
    let data = await response.json();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].player1 === id || data[i].player2 === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(matches);
    return matches;
}

export async function is_match_tournament(id) {
    let value = false;
    let response = await fetch(path + 'match/' + id, { headers : headers });
    if (response.status == 404)
        throw "Match not found";
    let data = await response.json();
    if (data.tournament != null)
        value = true;
    if (debug)
        console.log(value);
    return value;
}


export async function get_all_matches_of_tournament(id) {
    let response = await fetch(path + 'match/', { headers : headers });
    let data = await response.json();
    let matches = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].tournament === id) {
            matches.push(data[i]);
        }
    }
    if (debug)
        console.log(matches);
    return matches;
}

export async function get_all_tournaments_from_creator(id) {
    let data = await get_all_tournament();
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].creator.pk === id) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_tournaments_confirm_of_user(id) {
    let data = await get_all_tournament();
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].confirmed.includes(id)) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_tournaments_pending_of_user(id) {
    let data = await get_all_tournament();
    let tournaments = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].pending.includes(id)) {
            tournaments.push(data[i]);
        }
    }
    if (debug)
        console.log(tournaments);
    return tournaments;
}

export async function get_all_users_of_tournament(id) {
    let data = await get_all_matches_of_tournament(id);
    let users = [];
    let usersID = [];
    for (let i = 0; i < data.length; i++) {
        let user1 = await get_user_by_id(data[i].player1);
        let user2 = await get_user_by_id(data[i].player2);
        if (!usersID.includes(user1.pk))
        {
            usersID.push(user1.pk);
            users.push(user1);
        }
        if (!usersID.includes(user2.pk))
        {
            usersID.push(user2.pk);
            users.push(user2);
        }
    }
    if (debug)
        console.log(users);
    return users;
}

/**
 * @brief Recupere un match par son id.
 * 
 * @param id L'id du match.
 * @return Un json contenant les informations du match.
 */
export async function get_match_by_id(id) {
    let response = await fetch(path + 'match/' + id, { headers : headers });
    if (response.status == 404)
        throw "Match not found";
    let data = await response.json();
    if (debug)
        console.log(data);
    return data;
}

export async function get_all_users_of_match(id) {
    let data = await get_match_by_id(id);
    let user1 = await get_user_by_id(data.player1);
    let user2 = await get_user_by_id(data.player2);
    if (debug)
        console.log([user1, user2]);
    return [user1, user2];
}

export async function get_username_by_id(id) {
    let user = await get_user_by_id(id);
    if (debug)
        console.log(user.user.username);
    return user.user.username;
}


export async function get_nickname_by_id(id) {
    let user = await get_user_by_id(id);
    if (debug)
        console.log(user.user.username);
    return user.user.user_nick;
}

export async function login(username, password) {
    let data = {
        "username": username,
        "password": password
    };    
    let response = await fetch(path + 'user/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    if (response.status != 200)
        throw "Problem with the creation of the user (" + response.status + ")";
    let user = await response.json();
    if (debug)
        console.log(user);
    return user;
}



export async function create_user(username, user_nick, password) {
    let data = {
        "user": {
            "username": username,
            "password": password
        },
        "user_nick": user_nick
    };    
    let response = await fetch(path + 'user/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    if (response.status != 201)
        throw "Problem with the creation of the user (" + response.status + ")";
    let user = await response.json();
    if (debug)
        console.log(user);
    return user;
}
// TODO: Gerer les pending
export async function create_tournament(name, pending) {
    let data = {
        "name": name,
        "pending": pending
    };
    let response = await fetch(path + 'tournament/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    if (response.status != 201)
        throw "Problem with the creation of the tournament (" + response.status + ")";
    let tournament = await response.json();
    if (debug)
        console.log(tournament);
    return tournament;
}


export async function create_match(player1, player2, tournament) {
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

export async function delete_user(id) {
    let response = await fetch(path + 'user/' + id, {
        method: 'DELETE',
        headers: headers
    });
    if (response.status != 204)
        throw "Problem with the deletion of the user (" + response.status + ")";
    return true;
}



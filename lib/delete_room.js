'use script';

function delete_room(room, room_to_socket, socket_to_room, socket_id) {
    if (!socket_to_room.has(socket_id)) {
        return;
    }
    var room_id = socket_to_room.get(socket_id);
    var i = room_to_socket.get(room_id).black;
    var j = room_to_socket.get(room_id).white;
    if(room.has(room_id)){
        room.delete(room_id);
    }
    if(room_to_socket.has(room_id)){
        room_to_socket.delete(room_id);
    }
    if(socket_to_room.has(i)){
        socket_to_room.delete(i);
    }
    if(socket_to_room.has(j)){
        socket_to_room.delete(j);
    }
    
}

exports = module.exports = delete_room;
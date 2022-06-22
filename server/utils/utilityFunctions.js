function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const generateRoomCode = () => {
    var string = 'abcdefghijklmnopqrstuvwxyz';
    let room = '';

    // Find the length of string
    var len = string.length;
    for (let i = 1; i <= 9; i++) {
        room += string[Math.floor(Math.random() * len)];
        if (i % 3 === 0 && i < 9) room += "-"
    }
    return room;
}

module.exports = { shuffle, generateRoomCode }
import { Chess } from 'chess.js';

let chess = new Chess();

export function getChess() { return chess; }

export function makeMove(from, to) {
    chess.move({ from, to });
}

export function getFen() { return chess.fen(); }

export function reset() {
    chess = new Chess();
}

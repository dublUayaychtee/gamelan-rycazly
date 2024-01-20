const Instrument = {
    Gong: 0,
    Kajar: 1,
    Kendang: 2,
    Cengceng: 3,
    Reong: 4,
    Kantilan: 5,
    Pemade: 6,
    Ugal: 7,
    Jublag: 8,
    Jegog: 9,
    Suling: 10,
    Rebab: 11,
    Gentora: 12,
};

const arrowMovement = {
    38: [0, -1, 0],
    40: [0, 1, 0],
    37: [0, 0, -1],
    39: [0, 0, 1],
};

const ReverseInstrument = Object.entries(Instrument).reduce((ret, entry) => {
    const [key, val] = entry;
    ret[val] = key;
    return ret;
}, {});

var cursorSystem = 1;
var cursorInstrument = 1;
var cursorX = 1;

var oncangMode = false;

var data = {
    i: [
        // instruments
        Instrument.Pemade,
        Instrument.Pemade,
        Instrument.Kajar,
    ],
    l: [8, 8, 16], // lengths of patterns
    p: [
        // patterns
        [
            // 1st pattern
            "f.j.f.a.", // Gangsa 1
            ".g.g.s.s", // Gangsa 2
            "x   x   ", // Kajar
        ],
        [
            // 2nd pattern
            "f.j.f.a.", // Gangsa 1
            ".g.g.s.s", // Gangsa 2
            "x   x   ", // Kajar
        ],
        [
            // 3rd pattern
            "f.a.m.b.a.f.f.a.", // Gangsa 1
            ".m.b.v.m.s.g.s.s", // Gangsa 2
            "x   x   x   x   ", // Kajar
        ],
    ],
};

function resetBoard() {
    $(".content-area").empty();
    data.p.forEach((pattern, patternIndex) => {
        let systemLabel = $("<div />", {
            class: "system",
        });
        data.i.forEach((instrument, instrIndex) => {
            let channel = $("<div />", {
                class: "channel channel" + instrIndex,
                text: ReverseInstrument[instrument],
            });
            systemLabel.append(channel);
        });

        let systemNotes = $("<div />", {
            class: "system",
        });
        let noteArea = $("<div />", {
            class: "note-area",
        });

        pattern.forEach((notes, instrIndex) => {
            let channel = $("<div />", {
                class: "channel channel" + instrIndex,
            });
            console.log(instrIndex, notes);
            if (notes.length <= data.l[patternIndex]) {
                for (i = 0; i < notes.length; i++) {
                    channel.append(
                        $("<div />").prop({
                            innerHTML: notes[i],
                        })
                    );
                }
            }
            noteArea.append(channel);
        });
        $(".editor-label .content-area").append(systemLabel);
        systemNotes.append(noteArea);
        $(".editor-notes .content-area").append(systemNotes);
    });
}

function updateCursor() {
    $(".cursor").removeClass("cursor");
    $(".highlight").removeClass("highlight");
    $(".note-area .channel div:nth-child(" + cursorX + ")").addClass(
        "highlight"
    );
    $(
        ".system:nth-child(" +
            cursorSystem +
            ") .channel:nth-child(" +
            cursorInstrument +
            ") div"
    ).addClass("highlight");
    $(
        ".system:nth-child(" +
            cursorSystem +
            ") .channel:nth-child(" +
            cursorInstrument +
            ") div:nth-child(" +
            cursorX +
            ")"
    ).addClass("cursor");
}

function moveCursor(system, instrument, x) {
    system = Math.min(Math.max(1, system), data.p.length);

    if (instrument < 1) {
        if (system > 1) {
            system = Math.min(Math.max(1, system - 1), data.p.length);
            instrument = data.p[system - 1].length;
        } else {
            instrument = 1;
        }
    } else if (instrument > data.p[system - 1].length) {
        if (system < data.p.length) {
            system = Math.min(Math.max(1, system + 1), data.p.length);
            instrument = 1;
        } else {
            instrument = data.p[system - 1].length;
        }
    }

    if (x < 1) {
        if (system > 1) {
            system = Math.min(Math.max(1, system - 1), data.p.length);
            x = data.p[system - 1][instrument - 1].length;
        } else {
            x = 1;
        }
    } else if (x > data.p[system - 1][instrument - 1].length) {
        if (system < data.p.length) {
            system = Math.min(Math.max(1, system + 1), data.p.length);
            x = 1;
        } else {
            x = data.p[system - 1][instrument - 1].length;
        }
    }

    cursorSystem = system;
    cursorInstrument = instrument;
    cursorX = x;

    updateCursor();
}

$(function () {
    resetBoard();
    updateCursor();
});

$(window).keydown(function (e) {
    var movement = arrowMovement[e.keyCode] || [0, 0, 0];
    moveCursor(
        ...movement.map((v, i) => {
            return [cursorSystem, cursorInstrument, cursorX][i] + v;
        })
    );
});

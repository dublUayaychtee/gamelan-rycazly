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

const ReverseInstrument = Object.entries(Instrument).reduce((ret, entry) => {
    const [key, val] = entry;
    ret[val] = key;
    return ret;
}, {});

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
        data.i.forEach((instrument) => {
            let channel = $("<div />", {
                class: "channel",
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

        pattern.forEach((notes, instrumentIndex) => {
            let channel = $("<div />", {
                class: "channel",
            });
            console.log(instrumentIndex, notes);
            if (notes.length <= data.l[patternIndex]) {
                for (i = 0; i < data.l[patternIndex]; i++) {
                    channel.append("<div />", {
                        text: notes[i],
                    });
                }
            }
            noteArea.append(channel);
        });
        $(".editor-label .content-area").append(systemLabel);
        systemNotes.append(noteArea);
        $(".editor-notes .content-area").append(systemNotes);
    });
}

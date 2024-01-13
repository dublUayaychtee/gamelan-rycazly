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

var data = {
    i: [
        // instruments
        Gangsa,
        Gangsa,
        Kajar,
    ],
    o: [1, 1, 2, 1, 1, 2], // song pattern order
    l: [8, 8, 16], // lengths of patterns
    p: [
        // patterns
        [
            // 1st pattern
            [
                // Gangsa 1
                11, 0, 14, 0, 11, 0, 8, 0,
            ],
            [
                // Gangsa 2
                0, 12, 0, 12, 0, 9, 0, 9,
            ],
            [
                // Kajar
                1, 0, 0, 0, 1, 0, 0, 0,
            ],
        ],
        [
            // 2nd pattern
            [
                // Gangsa 1
                11, 0, 8, 0, 7, 0, 5, 0, 8, 0, 11, 0, 11, 0, 8, 0,
            ],
            [
                // Gangsa 2
                0, 7, 0, 5, 0, 4, 0, 7, 0, 9, 0, 12, 0, 9, 0, 9,
            ],
            [
                // Kajar
                1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
            ],
        ],
    ],
};

function resetBoard() {
    $(".content-area").empty();
    data.o.forEach((pattern) => {
        $(".editor-label .content-area").append("<div />", {
            class: "system",
        });
    });
}

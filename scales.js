/**
 * Created by Chris on 10/25/2014.
 * source reference: http://www.grantmuller.com/MidiReference/doc/midiReference/ScaleReference.html
 */
module.exports = {
    pentatonic: [
        0, 2, 4, 7, 9
    ],
    aeolian: [
        0, 2, 3, 5, 7, 8, 10
    ],
    blues: [
        0, 2, 3, 4, 5, 7, 9, 10, 11
    ],
    chromatic: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ],
    diatonic_minor: [
        0, 2, 3, 5, 7, 8, 10
    ],
    dorian: [
        0, 2, 3, 5, 7, 9, 10
    ],
    harmonic_minor: [
        0, 2, 3, 5, 7, 8, 11
    ],
    indian: [
        0, 1, 1, 4, 5, 8, 10
    ],
    locrian: [
        0, 1, 3, 5, 6, 8, 10
    ],
    lydian: [
        0, 2, 4, 6, 7, 9, 10
    ],
    melodic_minor: [
        0, 2, 3, 5, 7, 8, 9, 10, 11
    ],
    minor: [
        0, 2, 3, 5, 7, 8, 10
    ],
    mixolydian: [
        0, 2, 4, 5, 7, 9, 10
    ],
    natural_minor: [
        0, 2, 3, 5, 7, 8, 10
    ],
    phrygian: [
        0, 1, 3, 5, 7, 8, 10
    ],
    turkish: [
        0, 1, 3, 5, 7, 10, 11
    ],
    calcNote: function (scale, key, note){
        var output;
        var octave = Math.floor(note/scale.length);
        output = key+(octave*12)+scale[(note-(octave*scale.length))];
        return output;
    }
};
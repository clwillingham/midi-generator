var fs = require('fs');
var Midi = require('jsmidgen');
var scales = require('./scales');
var instruments = require('./instruments');
var sh = require('shelljs');

file = new Midi.File();
var mainTrack = file.addTrack();
var bassTrack = file.addTrack();
mainTrack.setInstrument(0, instruments.acoustic_grand_piano);

//mainTrack.addNote(0, 52, 64);
//mainTrack.addNote(0, 55, 64);
//mainTrack.addNote(0, 57, 64);
//mainTrack.addNote(0, 59, 64);
//mainTrack.addNote(0, 62, 64);
//mainTrack.addNote(0, 64, 64);
//mainTrack.addNote(0, 67, 128);
//mainTrack.addNote(0, 67, 64);
//mainTrack.addNote(0, 64, 64);
//mainTrack.addNote(0, 62, 64);
//mainTrack.addNote(0, 59, 64);
//mainTrack.addNote(0, 57, 64);
//mainTrack.addNote(0, 55, 64);
//mainTrack.addNote(0, 52, 128);
var key = Midi.Util.midiPitchFromNote('E3');
var scale = scales.pentatonic;
var max = 10;
var min = -5;
var hold_chance = 0.3;
var default_delay = 256;

var loops = 0;
var randNum;
var goingUp = true;
var current_note = -3;
var notes = [];
var prev_note = current_note;
var delay = default_delay;
while(current_note < max){
    current_note ++;
    mainTrack.addNote(0, scales.calcNote(scale, key, current_note), delay);
    goingUp = false;
}
while(loops < 3){
    var randNum;
    prev_note = current_note;
    if (goingUp){
        randNum = Math.random();
        if (randNum > 0.4 && current_note > min){
            current_note++;
        }
        else if (randNum < 0.2 && current_note < max){
            current_note--;
        }
        else if (current_note <= min){
            current_note++;

        }
        else if (current_note >= max){
            current_note--;
            goingUp = false;
        }
    }
    else{
        randNum = Math.random();
        default_delay = 32;
        if (randNum > 0.8 && current_note < max){
            current_note++;
        }
        else if (randNum < 0.4 && current_note > min){
            current_note--;
        }
        else if (current_note <= min){
            current_note++;
            goingUp = true;
            delay = 128;
            loops++;
        }
        else if (current_note >= max){
            current_note--;
        }
    }
    console.log(scales.calcNote(scale, key, current_note));
    if(prev_note == current_note){
        delay += 32
    }else{
        if(goingUp) {
            mainTrack.addNote(0, scales.calcNote(scale, key, current_note), delay);
        }else{
            mainTrack.addNoteOn(0, scales.calcNote(scale, key, current_note), 0);
            mainTrack.addNoteOn(0, scales.calcNote(scale, key, current_note+2), 0);
            mainTrack.addNoteOff(0, scales.calcNote(scale, key, current_note), delay);
            mainTrack.addNoteOff(0, scales.calcNote(scale, key, current_note+2), 0);
        }

        delay = default_delay;
    }

}
mainTrack.addNote(0, scales.calcNote(scale, key, current_note-1), 200);
mainTrack.addNote(0, scales.calcNote(scale, key, current_note-2), 200);
mainTrack.addNote(0, scales.calcNote(scale, key, current_note-3), 500);
mainTrack.addNote(0, scales.calcNote(scale, key, current_note-2), 1000);

mainTrack.addNoteOff(0, scales.calcNote(scale, key, current_note-2), 500);

//mainTrack.addNote(0, scales.calcNote(scale, key, 0), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 1), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 2), 32);
//mainTrack.addNote(0, scales.calcNote(scale, key, 3), 32);
//mainTrack.addNote(0, scales.calcNote(scale, key, 4), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 5), 500);
//mainTrack.addNote(0, scales.calcNote(scale, key, 5), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 4), 32);
//mainTrack.addNote(0, scales.calcNote(scale, key, 3), 32);
//mainTrack.addNote(0, scales.calcNote(scale, key, 2), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 1), 64);
//mainTrack.addNote(0, scales.calcNote(scale, key, 0), 500);
//mainTrack.addNoteOff(0, scales.calcNote(scale, key, 0), 500);
//mainTrack.setInstrument(0, instruments.acoustic_grand_piano);
//
//for(var i=20; i < 60; i++){
//    mainTrack.addNote(0, scales.calcNote(scales.pentatonic, i), 4, 64);
//}
//for(i=58; i > 20; i--){
//    mainTrack.addNote(0, scales.calcNote(scales.pentatonic,  i), 4, 64);
//}

//
fs.writeFileSync('test2.mid', file.toBytes(), 'binary');
sh.exec('fluidsynth -a alsa -m alsa_seq -l -i /usr/share/soundfonts/FluidR3_GM2-2.sf2 test2.mid');
//sh.exec('test2.mid');
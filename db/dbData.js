const fs = require('fs');
const util = require('util');
const uuid = require('uuid');

const readDislay = util.promisify(fs.readFile);
const writeDisplay = util.promisify(fs.writeFile);

class Store {
    read(){
        return readDislay('db/db.json', 'utf8')
    } 
    write(note) {
        return writeDisplay('db/db.json', JSON.stringify(note))
    }
    getNotes(){
        return this.read().then((notes) => {
            let displayNotes;
            try {
                displayNotes = [].concat(JSON.parse(notes))
            } catch (error) {
                displayNotes = [];
            }
            return displayNotes
        })
    }
    addNote(note){
        const {title,text} = note;
        if (!title || !text) {
            throw new Error('Please enter a title and a text')
            
        }
        const newNote = {title, text, id:uuid.v1()}
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)

    }
}
module.exports = new Store();
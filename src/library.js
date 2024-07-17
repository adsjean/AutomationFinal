const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const librarySchema = mongoose.Schema(
    {    
        "location": {
            "type": "String"
        },
        "duration": {
            "type": "Number"
        },
        "attributes": {
            "tvg-id": {
            "type": "String"
            },
            "tvg-name": {
            "type": "String"
            },
            "tvg-logo": {
            "type": "String"
            },
            "group-title": {
            "type": "String"
            }
        },
        "kodiProps": {},
        "name": {
            "type": "String"
        }
             
    },
    {
        timestamps: true
    }
)

const Library = mongoose.model('library', librarySchema);

module.exports = Library; 
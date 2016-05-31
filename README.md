# django-app
A django backend for AntiPoachingMap

# Antipoaching

The antipoaching project (needs a sexy name) seeks to make it easier to report and view antipoaching events as they occur.
This API defines how to ingest and view data in the system.

## Authentication [/auth]

Each request must supply authentication credentials with the header parameter like this "Authorization: Basic ABCDEF".

Note that we'll manage user access manually (for added security). So there are no endpoints for user registration.

### Get an Auth Token [GET]
+ Attributes
    + username (string) - The user's username
    + password (string) - The user's password

+ Response 200 (application/json)
    + Body

            {
                "token": "ABCDEF"
            }
    

## Poaching Event [/events/{event_id}]

+ Parameters
    + event_id (number) - ID of the event in the form of an integer

### View a Poaching Event [GET]
+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

+ Response 200 (application/json)
    + Body

            {
                "description": "Seven elephants and a lion found dead",
                "severity": "critical",
                "timestamp":1463322187,
                "lat":13.5317,
                "long":2.4604,
                "media":[123, 456, 789],
                "extra": {
                    "animals":[ "elephants":7, "lion":1],
                    "details":"tusks missing"
                }
            }


### Edit a Poaching Event [PUT]
+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

    + Body
            
            {
                "description": "Seven elephants and a lion found partying",
                "severity": "info",
                "timestamp":1463322187,
                "lat":13.5317,
                "long":2.4604,
                "media":[123, 456, 789],
                "extra": {
                    "animals":[ "elephants":7, "lion":1],
                    "details":"tusks painted pink, whiskers awry"
                }
            }

+ Response 200 (application/json)
    + Body

            {
                "description": "Seven elephants and a lion found partying",
                "severity": "info",
                "timestamp":1463322187,
                "lat":13.5317,
                "long":2.4604,
                "media":[123, 456, 789],
                "extra": {
                    "animals":[ "elephants":7, "lion":1],
                    "details":"tusks painted pink, whiskers awry"
                }
            }


## Poaching Event Collection [/events]

### Create Poaching Event [POST]

+ Attributes
    + description (string) - A description of what happened.
    + severity (enum[string]) - How important is this event.
        + Members
            + critical - A poaching event occurred
            + warning - A poaching might soon occur
            + info - Everything else
    + timestamp (number) - A unix timestamp indicating when the event happened
    + lat (number) - The latitude where this event occurred
    + long (number) - The longitude where this event occurred
    + media (array[number]) - A list of media objects related to this event
    + extra (object) - An object representing any additional data related to this event


+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

    + Body
            
            {
                "description": "Seven elephants and a lion found dead",
                "severity": "critical",
                "timestamp":1463322187,
                "lat":13.5317,
                "long":2.4604,
                "media":[123, 456, 789],
                "extra": {
                    "animals":[ "elephants":7, "lion":1],
                    "details":"tusks missing"
                }
            }

+ Response 201 (application/json)
    + Headers

            Location: /events/2

    + Body

            {
                "description": "Seven elephants and a lion found dead",
                "severity": "critical",
                "timestamp":1463322187,
                "lat":13.5317,
                "long":2.4604,
                "media":[123, 456, 789],
                "extra": {
                    "animals":[ "elephants":7, "lion":1],
                    "details":"tusks missing"
                }
            }

### List Poaching Events [GET /events{?before,after,severity,limit,offset}]
+ Parameters
    + before: 1463322187 (number, optional) - Get all poaching events before this timestamp
    + after: 1463366666 (number, optional) - Get all poaching events after this timestamp
    + severity: critical (string, optional) - Get all poaching events with this severity
        + Members
            + critical - A poaching event occurred
            + warning - A poaching might soon occur
            + info - Everything else
    + limit: 10 (number, optional) - Limit the number of poaching events to return
    + offset: 5 (number, optional) - In the list of matching poaching events, return only those after this number.

+ Response 200 (application/json)
    + Body

            [
                {
                    "description": "Seven elephants and a lion found dead",
                    "severity": "critical",
                    "timestamp":1463322188,
                    "lat":13.5317,
                    "long":2.4604,
                    "media":[123, 456, 789],
                    "extra": {
                        "animals":[ "elephants":7, "lion":1],
                        "details":"tusks missing"
                    }
                },
                {
                    "description": "Seven elephants and a lion found partying",
                    "severity": "info",
                    "timestamp":1463322189,
                    "lat":13.5317,
                    "long":2.4604,
                    "media":[123, 456, 789],
                    "extra": {
                        "animals":[ "elephants":7, "lion":1],
                        "details":"tusks painted pink, whiskers awry"
                    }
                }
            ]
            


## Media [/media/{media_id}]
Store and retrieve binary blobs of data, like images, sound files, etc. There are no restrictions on the file types, we want to be really flexible since we anticipate a wide variety of data.

Users of this API must handle the file format. 
This includes encoding/decoding, compression/decompression, etc.

+ Parameters
    + media_id (number) - ID of the media file in the form of an integer


### View a Media File [GET /media/{media_id}]
+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

+ Response 200 (application/json)
    + Body
            
            {
                "description": "A party pangolin",
                "format": "png",
                "timestamp":1463322187,
                "filename":"party_pangolin",
                "filesize":500666,
                "data": "1010010101010111101010"
            }


### Edit a Media File [PUT]
+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

    + Body
            
            {
                "description": "A party pangolin",
                "format": "png",
                "timestamp":1463322187,
                "filename":"party_pangolin",
                "filesize":500666,
                "data": "1010010101010111101010"
            }

+ Response 201 (application/json)
    + Headers

            Location: /media/2

    + Body
            
            {
                "description": "A party pangolin",
                "format": "png",
                "timestamp":1463322187,
                "filename":"party_pangolin",
                "filesize":500666,
                "data": "1010010101010111101010"
            }


## Media Collection [/media]

### Create a Media File [POST]
+ Attributes
    + description (string) - A description of the media file.
    + format  (string) - The file type. png, jpg, mp3, etc.
    + timestamp (number) - A unix timestamp indicating when the image was taken
    + filename (string) - The file's name
    + filesize (number) - The size (in bytes) of the file
    + data (object) - An object representing the media file

+ Request (application/json)
    + Headers

            Authorization: Basic ABCDEF

    + Body
            
            {
                "description": "A party parrot",
                "format": "png",
                "timestamp":1463322187,
                "filename":"party_parrot",
                "filesize":500123,
                "data": "1010010101010111101010"
            }

+ Response 201 (application/json)
    + Headers

            Location: /media/2

    + Body
            
            {
                "description": "A party parrot",
                "format": "png",
                "timestamp":1463322187,
                "filename":"party_parrot",
                "filesize":500123,
                "data": "1010010101010111101010"
            }


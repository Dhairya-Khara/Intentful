import axios from "axios"
import uniqid from 'uniqid';

const addBlock = async (diagramID, email, password, intent) => {
    const token = await login(email, password)
    const url = `https://api.voiceflow.com/v2/diagrams/${diagramID}/nodes/bulk`

    const id1 = uniqid()
    const id2 = uniqid()
    console.log(id1)
    const blocks = [
        {
            "nodeID": id1,
            "type": "intent",
            "data": {
                "name": "",
                "intent": intent,
                "mappings": [],
                "availability": "GLOBAL ",
                "portsV2": {
                    "byKey": {},
                    "builtIn": {
                        "next": {
                            "type": "next",
                            "target": "None",
                            "id": id1
                        }
                    },
                    "dynamic": []
                }
            }
        },

        {
            "nodeID": id2,
            "type": "block",
            "coords": [
                350,
                78
            ],
            "data": {
                "name": intent,
                "steps": [
                    id1
                ]
            }
        }]


    const body = {"nodes": blocks}
    axios.post(url, body, { headers: { "Authorization": token } }).then(async (res) => {
        console.log(res)
    })
}

const login = async (email, password) => {
    const url = "https://api.voiceflow.com/session"
    let token = ""
    const payload = {
        "user": {
            "email": email,
            "password": password
        },
        "device": { "os": "macOS", "version": "10.15.7", "browser": "Chrome", "platform": "desktop" }
    }

    await axios.put(url, payload).then(async (res) => {
        token = res.data.token
    })
    return token
}

export default addBlock
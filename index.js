const fetch = require("node-fetch")
require("dotenv").config()

let API_ID = process.env.API_ID
let API_SECRET = process.env.API_SECRET

let base_url = `https://restapi.nftscan.com/gw/token?apiKey=${API_ID}&apiSecret=${API_SECRET}`

console.log(base_url)

let token; 
async function main() {
    let response = await fetch(base_url)
    let body = await response.json()
    token = body.data.accessToken
    // console.log(response)
    console.log(token)
    let data = await getNftByContract()
    parseData(data)
    let data2 = await getRecordByUserAddressAndTokenId()
    parseData(data2)
}

async function getNftByContract() {
    let url = `https://restapi.nftscan.com/api/v1/getNftByContract`
    let payload = {
        "nft_address": "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f",
        "page_index": 1,
        "page_size": 10
    }
    let options = {
        "method":"POST",
        "headers":{
            "Access-Token": token,
            "Content-type":"application/json",
        },
        
        "body": JSON.stringify(payload)
    }
    let response = await fetch(url, options)
    let body = await response.json()
    return body.data.content
}

async function getRecordByUserAddressAndTokenId() {
    let url = `https://restapi.nftscan.com/api/v1/getRecordByUserAddressAndTokenId`
    let payload = {
        "nft_address": "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f",
        "page_index": 1,
        "page_size": 100,
        "token_id": "0x0000000000000000000000000000000000000000000000000000000000001567",
        "user_address": "0xa18a2ae011287a2a5074ca326021ef1e199d1ab0"
      }
    let options = {
        "method":"POST",
        "headers":{
            "Access-Token": token,
            "Content-type":"application/json",
        },
        
        "body": JSON.stringify(payload)
    }
    let response = await fetch(url, options)
    let body = await response.json()
    return body.data.content
}

function parseData(content) {
    for (var i =0; i < content.length; i++) {
        console.log(content[i])
    }
}
main()

import {client} from "../index"
import WebSocket from "ws";

export function reconnect() {
    client.taurus = new WebSocket(client.config!.chatbridge.websocket_endpoint);
    client.taurus!.onmessage = async (e: any) => {
        let msg = e.data.toString();
        // console.log(msg);
        if (msg.startsWith("MSG ") && client.config?.chatbridge.enabled && msg.length > 5) {
            client.channels.cache.get("641509498573422602").send(msg.slice(4));
        } else {
            client.messageCache?.push(msg);
        }
    }
    client.taurus!.onopen = async () => {
        console.log("Connecting to Taurus");
        client.taurus?.send(client.config!.chatbridge.password);
        client.taurus?.send("PING");
    }
}

export async function fetchLatestWithType(type: string): Promise<String | void> {
    return new Promise((resolve, reject) => {
        if (!client.messageCache) {
            return reject("No message cache");
        }
        const cacheLength = client.messageCache!.length;
        let tries = 0;
        const tryThing = () => {
            if(client.messageCache!.length > 0 && cacheLength < client.messageCache!.length) {
                const latest = client.messageCache![client.messageCache!.length - 1];
                if (latest.length >= 1 && latest.split(" ")[0] == type) {
                    return resolve(client.messageCache!.pop());
                }
            }
            tries++;
            if (tries > 5) {
                return reject("Timeout");
            }
            setTimeout(tryThing, 500);
        }
        setTimeout(() => {
            tryThing()
        }, 20);
    });
}
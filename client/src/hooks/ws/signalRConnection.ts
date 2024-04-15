import { WS_URL } from "../../thunks/APIEndpoints";
import * as signalR from "@microsoft/signalr";

let connection: null | signalR.HubConnection = null;

export function getSignalRConnection() {
    if (!connection) {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(WS_URL)
            .withAutomaticReconnect()
            .build();
    }
    return connection;
}
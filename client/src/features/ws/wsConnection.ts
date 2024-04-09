import { WS_URL } from "../../thunks/APIEndpoints";
import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
.withUrl(WS_URL)
.withAutomaticReconnect()
.build();
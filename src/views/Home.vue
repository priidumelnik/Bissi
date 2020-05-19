<template>
    <div class="container">
        <form>
            <div class="input-zone">
                <label>Name:</label>
                <input class="form-control" type="text" v-model="name" />
                <label>Message:</label>
                <input class="form-control" type="text" v-model="message" />
                <button type="submit" @click="send()">Send</button>
            </div>
        </form>
        <div id="divMessages" class="messages">
            <ul>
                <li v-for="mess in messages" v-bind:key="mess.message">{{mess.message}}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as signalR from "@microsoft/signalr";
// "https://localhost:5001/chat"
@Component
export default class Home extends Vue {
    private name = "";
    private message = "";
    private messages: Array<IMessage> = [];
    private connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .build();

    constructor() {
        super();
        this.connection.on(
            "broadcastMessage",
            (name: string, message: string) => {
                console.log(name, message);
                this.messages.push({ name: name, message: message });
            }
        );
        this.connection
            .start()
            .catch(err => console.log("SinglR ERROR: ", err));
    }

    send(): void {
        if (this.message.length > 0) {
            this.connection.send("send", this.name, this.message).then(() => {
                this.message = "";
            });
        }
    }
}

interface IMessage {
    name: string;
    message: string;
}
</script>

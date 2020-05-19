<template>
    <div class="container-fluid" v-if="authenticated">
        <div class="row row-height">
            <div class="col-4 left border border-dark rounded" style="text-align: left">
                <div class="bg-dark text-white" @onclick="newMessage()">
                    New message
                    <span class="material-icons">queue</span>
                </div>
                <div
                    class="bg-dark text-white"
                    v-for="conversation in conversations"
                    :key="conversation.id"
                >{{conversation.conversationName}}</div>
            </div>
            <div class="col-8 left border border-dark rounded">
                <div>message</div>
                <div style="text-align: right">message</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IConversation } from "../../domain/IConversation";
import { ConversationApi } from "../../services/ConversationApi";
import store from "@/store";
import { IFetchResponse } from "../../types/IFetchResponse";

@Component
export default class MessagingHub extends Vue {
    private conversations: IConversation[] = [];

    get authenticated(): boolean {
        return store.getters.isAuthenticated;
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    async created(): Promise<void> {
        console.log("created");
        if (store.state.jwt !== null) {
            const response = await ConversationApi.getAll<IConversation>(
                store.state.jwt
            ).then((res: IFetchResponse<IConversation[]>) => {
                if (res.data !== undefined) {
                    this.conversations = res.data;
                } else {
                    console.log("NO CONVERSATIONS RECEIVED!");
                }
            });
        }
    }

    beforeMount(): void {
        console.log("beforeMount");
    }

    mounted(): void {
        console.log("mounted");
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    beforeDestroy(): void {
        console.log("beforeDestroy");
    }

    destroy(): void {
        console.log("destroy");
    }
}
</script>

<style>
/*Set the row height to the viewport*/
.row-height {
    height: 85vh;
}

/*Set up the columns with a 100% height, body color and overflow scroll*/

.left {
    height: 100%;
    overflow-y: scroll;
}

.right {
    height: 100%;
    overflow-y: scroll;
}

.mid {
    height: 100%;
    overflow-y: scroll;
}

/*Remove the scrollbar from Chrome, Safari, Edge and IE*/
::-webkit-scrollbar {
    width: 5px;
    background: rgb(102, 101, 101);
}

* {
    -ms-overflow-style: none !important;
}
</style>

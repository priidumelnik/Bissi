<template>
    <div class="alert alert-danger alert-dismissible fade show">{{info}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IFetchResponse } from "../types/IFetchResponse";

@Component
export default class ErrorMessage extends Vue {
    @Prop()
    private info!: string;
}
</script>

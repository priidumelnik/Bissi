<template>
    <div class="alert alert-danger alert-dismissible fade show">
        Account was deleted!
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AccountDeleted extends Vue {}
</script>

<template>
    <div id="app">
        <HintTracker/>
    </div>
</template>
<style lang="scss">
    @import "assets/scss/app.scss";
</style>
<script>


    import HintTracker from "./components/HintTracker";

    export default {
        name: "app",
        components: {HintTracker},
    };
</script>

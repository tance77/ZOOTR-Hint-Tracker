<template>
    <div class="container mx-auto">
        <div class="flex flex-wrap justify-center min-h-screen w-full">
            <div class="w-full text-center">
                <h1 class="text-4xl my-4">Hello World!</h1>
            </div>
            <div class="w-full text-center">
                <button class="btn mx-1">I'm a Button</button>
                <button class="btn btn-blue mx-1">I'm a Blue Button</button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'HintTracker',
        props: {
            msg: {type: String, default: ''},
        },
        data() {
            return {};
        },
        methods: {},
        computed: {},
        created() {

        },
        mounted() {

        },
    };
</script>

<style scoped lang="scss">

</style>

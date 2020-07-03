<template>
    <div class="container mx-auto">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate mt-4">
            Ocarina of Time Hint Tracker
        </h2>
        <div class="mt-4">
            <div class="block sm:hidden text-center mb-2">
                <button type="button" class="w-full items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150" @click.stop.prevent="resetModal = true">
                    Reset
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
                <div class="col-span-3">
                    <div class="overflow-hidden bg-white rounded-lg shadow">
                        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">
                                Way of the Hero
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 px-4 py-5 sm:p-6">
                            <label v-for="location in locations" :key="location.id" class="flex items-center">
                                <input v-model="selectedWayOfHero" type="checkbox" class="form-checkbox text-green-500 transition duration-150 ease-in-out" :value="location">
                                <span class="ml-2 text-sm text-gray-700">{{ location.name }}</span>
                            </label>
                        </div>
                    </div>
                    <div class="overflow-hidden bg-white rounded-lg shadow mt-4">
                        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 class="text-lg font-medium leading-6 text-gray-900">
                                Foolish Choice
                            </h3>
                        </div>
                        <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 px-4 py-5 sm:p-6">
                            <label v-for="location in locations" :key="location.id" class="flex items-center">
                                <input v-model="selectedFoolish" type="checkbox" class="form-checkbox text-red-500 transition duration-150 ease-in-out" :value="location">
                                <span class="ml-2 text-sm text-gray-700">{{ location.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-span-2">
                    <div class="overflow-hidden bg-white rounded-lg shadow">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="text-right">
                                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150" @click.stop.prevent="resetModal = true">
                                    Reset
                                </button>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                <div class="col-span-1">
                                    <span class="block text-sm font-medium leading-5 text-gray-700">WOTH Locations</span>
                                    <label v-for="option in selectedWayOfHero" :key="option.id">
                                        <input type="text" class="form-input w-full bg-green-50 mt-2" :value="option.name" disabled>
                                    </label>
                                </div>
                                <label class="col-span-1">
                                    <span class="block text-sm font-medium leading-5 text-gray-700">Rewards</span>
                                    <label v-for="option in selectedWayOfHero" :key="option.id">
                                        <input v-model="option.reward" type="text" class="form-input w-full mt-2">
                                    </label>
                                </label>
                            </div>
                            <div class="grid grid-cols-2 gap-2 mt-4">
                                <label class="col-span-1">
                                    <span class="block text-sm font-medium leading-5 text-gray-700">Foolish Locations</span>
                                    <label v-for="option in selectedFoolish" :key="option.id">
                                        <input type="text" class="form-input w-full bg-red-50 mt-2" :value="option.name" disabled>
                                    </label>
                                </label>
                                <label class="col-span-1">
                                    <span class="block text-sm font-medium leading-5 text-gray-700">Extra Notes</span>
                                    <textarea v-model="extraNotes" class="w-full resize-none form-textarea" rows="8"/>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="overflow-auto mt-4">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th class="text-left px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Hints
                                    </th>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Dead
                                    </th>
                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Required
                                    </th>
                                    <th class="text-left px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                        Notes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="location in miscLocations" :key="location.id">
                                    <td class="text-gray-900 text-sm">
                                        {{ location.name }}
                                    </td>
                                    <td class="text-gray-500 text-center">
                                        <input v-model="miscLocations[location.id-1].dead" type="checkbox" class="form-checkbox border-red-300 text-red-500">
                                    </td>
                                    <td class="text-gray-500 text-center">
                                        <input v-model="miscLocations[location.id-1].required" type="checkbox" class="form-checkbox border-green-200 text-green-500">
                                    </td>
                                    <td class="text-gray-500">
                                        <input v-model="miscLocations[location.id-1].notes" type="text" class="form-input">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div v-if="resetModal" class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                <transition
                    enter-class="ease-out duration-300"
                    leave-class="ease-in duration-200"
                    enter-active-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"/>
                    </div>
                </transition>

                <transition
                    enter-class="ease-out duration-300"
                    leave-class="ease-in duration-200"
                    enter-active-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div class="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="sm:flex sm:items-start">
                            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 id="modal-headline" class="text-lg leading-6 font-medium text-gray-900">
                                    Reset Data
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm leading-5 text-gray-500">
                                        Are you sure you want to reset? All of your data will be permanently removed. This action cannot be undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click.stop.prevent="reset">
                                    Reset
                                </button>
                            </span>
                            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="resetModal = false">
                                    Cancel
                                </button>
                            </span>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HintTracker",
        data() {
            return {
                resetModal: false,
                extraNotes: null,
                selectedWayOfHero: [],
                selectedFoolish: [],
                miscLocations: [
                    {id: 1, dead: false, required: false, notes: null, name: "10 Skulltulas"},
                    {id: 2, dead: false, required: false, notes: null, name: "20 Skulltulas"},
                    {id: 3, dead: false, required: false, notes: null, name: "30 Skulltulas"},
                    {id: 4, dead: false, required: false, notes: null, name: "40 Skulltulas"},
                    {id: 5, dead: false, required: false, notes: null, name: "50 Skulltulas"},
                    {id: 6, dead: false, required: false, notes: null, name: "Biggoron Sword"},
                    {id: 7, dead: false, required: false, notes: null, name: "Frog a Ocarina"},
                    {id: 8, dead: false, required: false, notes: null, name: "Skull Mask"},
                    {id: 9, dead: false, required: false, notes: null, name: "Ocarina of Time"},
                ],
                locations: [
                    {id: 1, reward: null, name: "Bottom of the Well"},
                    {id: 2, reward: null, name: "Death Mountain Crater"},
                    {id: 3, reward: null, name: "Death Mountain Trail"},
                    {id: 4, reward: null, name: "Deku Tree"},
                    {id: 5, reward: null, name: "Desert Colossus"},
                    {id: 6, reward: null, name: "Dodongo's Cavern"},
                    {id: 7, reward: null, name: "Fire Temple"},
                    {id: 8, reward: null, name: "Forest Temple"},
                    {id: 9, reward: null, name: "Ganon's Castle"},
                    {id: 10, reward: null, name: "Geurdo's Fortress"},
                    {id: 11, reward: null, name: "Geurdo Training Grounds"},
                    {id: 12, reward: null, name: "Guerdo Valley"},
                    {id: 13, reward: null, name: "Goron City"},
                    {id: 14, reward: null, name: "Graveyard"},
                    {id: 15, reward: null, name: "Haunted Wasteland"},
                    {id: 16, reward: null, name: "Hyrule Castle"},
                    {id: 17, reward: null, name: "Hyrule Field"},
                    {id: 18, reward: null, name: "Ice Cavern"},
                    {id: 19, reward: null, name: "Jabu Jabu's Belly"},
                    {id: 20, reward: null, name: "Kakariko Village"},
                    {id: 21, reward: null, name: "Kokiri Forest"},
                    {id: 22, reward: null, name: "Lake Hylia"},
                    {id: 23, reward: null, name: "Lon Lon Ranch"},
                    {id: 24, reward: null, name: "Lost Woods"},
                    {id: 25, reward: null, name: "Market"},
                    {id: 26, reward: null, name: "Outside Ganon's Castle"},
                    {id: 27, reward: null, name: "Sacred Forest Meadow"},
                    {id: 28, reward: null, name: "Shadow Temple"},
                    {id: 29, reward: null, name: "Spirit Temple"},
                    {id: 30, reward: null, name: "Temple of Time"},
                    {id: 31, reward: null, name: "Water Temple"},
                    {id: 32, reward: null, name: "Zora's Domain"},
                    {id: 33, reward: null, name: "Zora's Fountain"},
                    {id: 34, reward: null, name: "Zora's River"},
                ],
            };
        },
        watch: {
            extraNotes() {
                localStorage.extraNotes = JSON.stringify(this.extraNotes);
            },
            selectedFoolish() {
                localStorage.selectedFoolish = JSON.stringify(this.selectedFoolish);
            },
            selectedWayOfHero: {
                deep: true,
                handler(newWayOfTheHero) {
                    this.locations = this.locations.map(location => {
                        if (newWayOfTheHero.id === location.id) {
                            location = newWayOfTheHero;
                        }
                        return location;
                    });
                    localStorage.selectedWayOfHero = JSON.stringify(this.selectedWayOfHero);
                },
            },
            miscLocations: {
                deep: true,
                handler(newMiscLocation) {
                    localStorage.miscLocations = JSON.stringify(this.miscLocations);
                },
            },
        },
        mounted() {
            if (localStorage.selectedWayOfHero) {
                this.selectedWayOfHero = JSON.parse(localStorage.selectedWayOfHero);
            }
            if (localStorage.selectedFoolish) {
                this.selectedFoolish = JSON.parse(localStorage.selectedFoolish);
            }
            if (localStorage.extraNotes) {
                this.extraNotes = JSON.parse(localStorage.extraNotes);
            }

            if (localStorage.miscLocations) {
                this.miscLocations = JSON.parse(localStorage.miscLocations);
            }

            this.selectedWayOfHero.forEach(wayOfTheHero => {
                this.locations = this.locations.map(location => {
                    if (location.id === wayOfTheHero.id) {
                        location = wayOfTheHero;
                    }
                    return location;
                });
            });

        },
        methods: {
            reset() {
                localStorage.clear();
                this.selectedFoolish = [];
                this.selectedWayOfHero = [];
                this.extraNotes = null;
                this.locations = this.locations.map(location => {
                    location.reward = null;
                    return location;
                });
                this.resetModal = false;
            },
        },
    };
</script>

<style scoped lang="scss">

</style>

<template>
    <div class="container mx-auto">
        <div class="flex items-center space-x-4 p-4">
            <h2 class="text-2xl font-bold leading-7 text-gray-100 sm:text-3xl sm:leading-9 sm:truncate">
                Ocarina of Time Hint Tracker
            </h2>
            <div class="text-right">
                <button
                    type="button"
                    class="items-center w-full px-4 py-2 text-sm font-medium leading-5 text-center text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md lg:inline-flex lg:w-auto lg:text-left hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
                    @click.stop.prevent="resetModal = true"
                >
                    Reset
                </button>
            </div>
        </div>
        <div class="mt-4">
            <!--Way of the Hero Things-->
            <div class="overflow-hidden bg-gray-800 rounded-lg shadow">
                <div class="px-4 py-5 border-b border-gray-700 sm:px-6">
                    <div class="flex items-center">
                        <h3 class="flex-1 font-medium leading-6 text-gray-100">
                            Way of the Hero / Foolish
                        </h3>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center justify-end w-full">
                                <input type="checkbox" class="bg-transparent rounded border-teal-500 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-offset-0 focus:ring-teal-200 focus:ring-opacity-50" disabled checked>
                                <span class="ml-2 font-medium text-gray-300">WOTH</span>
                            </label>
                            <label class="flex items-center justify-end w-full">
                                <input type="checkbox" class="bg-transparent rounded border-purple-500 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50" disabled checked>
                                <span class="ml-2 mr-2 font-medium text-gray-300">Foolish</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 px-4 py-5 lg:grid-cols-3 xl:grid-cols-5 sm:p-6">
                    <div v-for="location in locations" :key="location.id" class="flex items-center">
                        <div class="grid grid-cols-2 gap-2">
                            <label>
                                <input
                                    v-model="selectedWayOfHero" type="checkbox" class="bg-transparent rounded border-teal-500 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-offset-0 focus:ring-teal-200 focus:ring-opacity-50" :value="location"
                                    @click="toggleWoth(location, true)"
                                >
                            </label>
                            <label>
                                <input
                                    v-model="selectedFoolish" type="checkbox" class="bg-transparent rounded border-purple-500 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50" :value="location"
                                    @click="toggleWoth(location, false)"
                                >
                            </label>
                        </div>
                        <span class="ml-2 text-gray-300">{{ location.name }}</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 mt-4 mb-4 overflow-hidden bg-gray-800 rounded-lg shadow">
                    <div class="hidden lg:grid grid-cols-2 border-b border-gray-800">
                        <div class="text-xs pb-1 font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-gray-800 border-b border-gray-700 text-right mr-2">
                            Hints
                        </div>
                        <div class="text-xs pb-1 font-medium leading-4 tracking-wider text-left text-gray-400 uppercase bg-gray-800 border-b border-gray-700">
                            Rewards
                        </div>
                    </div>
                    <div v-for="location in miscLocations" :key="location.id" class="grid grid-cols-1 lg:grid-cols-2">
                        <div class="whitespace-no-wrap lg:flex items-center lg:space-x-4 lg:justify-end lg:mr-2">
                            <div class="text-gray-100">
                                {{ location.name }}
                            </div>
                            <div class="flex items-center space-x-2">
                                <input
                                    v-model="miscLocations[location.id-1].dead" type="checkbox" class="bg-transparent rounded border-purple-500 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50"
                                    @click="toggleDead(location)"
                                >
                                <input
                                    v-model="miscLocations[location.id-1].required" type="checkbox" class="bg-transparent rounded border-teal-500 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-offset-0 focus:ring-teal-200 focus:ring-opacity-50"
                                    @click="toggleRequired(location)"
                                >
                            </div>
                        </div>
                        <div class="py-1">
                            <input v-model="miscLocations[location.id-1].notes" type="text" class="w-full lg:w-auto py-1 text-gray-300 bg-gray-900 border-gray-700 rounded focus:outline-none focus:shadow-none">
                        </div>
                    </div>
                </div>
                <div class="p-4 mt-4 mb-4 overflow-hidden bg-gray-800 rounded-lg shadow">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid gap-2 mt-2 overflow-auto gird-cols-1 md:grid-cols-2" style="min-height: 250px; max-height: 250px;">
                            <div class="col-span-1">
                                <span class="block text-sm font-medium leading-5 text-gray-300">WOTH (5)</span>
                                <label v-for="option in sortedWayOfTheHero" :key="option.id">
                                    <input type="text" class="w-full mt-2 text-xs bg-teal-900 border-teal-900 rounded text-teal-50" :value="option.name" disabled readonly>
                                </label>
                            </div>
                            <label class="col-span-1">
                                <span class="block text-sm font-medium leading-5 text-gray-300">Rewards</span>
                                <label v-for="option in sortedWayOfTheHero" :key="option.id">
                                    <input
                                        v-for="aOption in selectedWayOfHero" v-if="option.id === aOption.id" :key="aOption.id" v-model="aOption.reward" type="text"
                                        class="w-full mt-2 text-xs text-gray-300 bg-gray-900 border-gray-700 rounded focus:outline-none focus:shadow-none"
                                    >
                                </label>
                            </label>
                        </div>
                        <div class="grid gap-2 mt-4 gird-cols-1 lg:grid-cols-2">
                            <div class="col-span-1 overflow-auto" style="min-height: 150px; max-height: 150px;">
                                <span class="block text-sm font-medium leading-5 text-gray-300">Foolish (3)</span>
                                <label v-for="option in sortedFoolish" :key="option.id">
                                    <input type="text" class="w-full mt-2 text-xs bg-purple-900 border-purple-900 rounded text-purple-50" :value="option.name" disabled>
                                </label>
                            </div>
                            <label class="col-span-1">
                                <span class="block text-sm font-medium leading-5 text-gray-300">Extra Notes</span>
                                <textarea v-model="extraNotes" class="w-full mt-2 text-gray-300 bg-gray-900 border-gray-700 resize-none form-textarea focus:outline-none focus:shadow-none" rows="8"/>
                            </label>
                        </div>
                    </div>
                    <div class="block mt-4 mb-2 text-center sm:hidden">
                        <button
                            type="button"
                            class="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-red active:bg-purple-700"
                            @click.stop.prevent="resetModal = true"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="resetModal" class="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
                <transition
                    enter-class="duration-300 ease-out"
                    leave-class="duration-200 ease-in"
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
                    enter-class="duration-300 ease-out"
                    leave-class="duration-200 ease-in"
                    enter-active-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                    enter-to-class="translate-y-0 opacity-100 sm:scale-100"
                    leave-active-class="translate-y-0 opacity-100 sm:scale-100"
                    leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
                >
                    <div class="px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="sm:flex sm:items-start">
                            <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="w-6 h-6 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 id="modal-headline" class="text-lg font-medium leading-6 text-gray-900">
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
                                <button
                                    type="button"
                                    class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                                    @click.stop.prevent="reset"
                                >
                                    Reset
                                </button>
                            </span>
                            <span class="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                                <button
                                    type="button"
                                    class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                                    @click="resetModal = false"
                                >
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
                nonModifiedMiscLocations: [
                    {id: 1, dead: false, required: false, notes: null, name: "10 Skulltulas"},
                    {id: 2, dead: false, required: false, notes: null, name: "20 Skulltulas"},
                    {id: 3, dead: false, required: false, notes: null, name: "30 Skulltulas"},
                    {id: 4, dead: false, required: false, notes: null, name: "40 Skulltulas"},
                    {id: 5, dead: false, required: false, notes: null, name: "50 Skulltulas"},
                    {id: 6, dead: false, required: false, notes: null, name: "Biggoron Sword"},
                    {id: 7, dead: false, required: false, notes: null, name: "Frog Ocarina"},
                    {id: 8, dead: false, required: false, notes: null, name: "Skull Mask"},
                    {id: 9, dead: false, required: false, notes: null, name: "Ocarina of Time"},
                ],
                miscLocations: [
                    {id: 1, dead: false, required: false, notes: null, name: "10 Skulltulas"},
                    {id: 2, dead: false, required: false, notes: null, name: "20 Skulltulas"},
                    {id: 3, dead: false, required: false, notes: null, name: "30 Skulltulas"},
                    {id: 4, dead: false, required: false, notes: null, name: "40 Skulltulas"},
                    {id: 5, dead: false, required: false, notes: null, name: "50 Skulltulas"},
                    {id: 6, dead: false, required: false, notes: null, name: "Biggoron Sword"},
                    {id: 7, dead: false, required: false, notes: null, name: "Frog Ocarina"},
                    {id: 8, dead: false, required: false, notes: null, name: "Skull Mask"},
                    {id: 9, dead: false, required: false, notes: null, name: "Ocarina of Time"},
                ],
                nonModifiedLocations: [
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
                rewards: [
                    "Arrows",
                    "Biggoron Sword",
                    "Bolero of Fire",
                    "Bomb Bag",
                    "Bombchus",
                    "Bombs",
                    "Boomerang",
                    "Bottle with Blue Potion",
                    "Bottle with Fairy",
                    "Bottle with Green Potion",
                    "Bottle with Letter",
                    "Bow",
                    "Deku Nut Capacity",
                    "Deku Nuts",
                    "Deku Seeds",
                    "Deku Shield",
                    "Deku Stick",
                    "Deku Stick Capacity",
                    "Dins Fire",
                    "Double Defense",
                    "Eponas Song",
                    "Farores Wind",
                    "Fire Arrows",
                    "Goron Tunic",
                    "Hammer",
                    "Heart Container",
                    "Hover Boots",
                    "Hylian Shield",
                    "Ice Arrows",
                    "Ice Trap",
                    "Iron Boots",
                    "Kokiri Sword",
                    "Lens of Truth",
                    "Light Arrows",
                    "Magic Meter",
                    "Minuet of Forest",
                    "Mirror Shield",
                    "Nayrus Love",
                    "Nocturne of Shadow",
                    "Piece of Heart",
                    "Prelude of Light",
                    "Prescription",
                    "Hookshot",
                    "Scale",
                    "Strength",
                    "Wallet",
                    "Recovery Heart",
                    "Requiem of Spirit",
                    "Rupee (1)",
                    "Rupees (20)",
                    "Rupees (200)",
                    "Rupees (5)",
                    "Rupees (50)",
                    "Sarias Song",
                    "Serenade of Water",
                    "Slingshot",
                    "Song of Storms",
                    "Song of Time",
                    "Stone of Agony",
                    "Suns Song",
                    "Zeldas Lullaby",
                    "Zora Tunic",
                ],
            };
        },
        computed: {
            sortedWayOfTheHero() {
                let data = JSON.parse(JSON.stringify(this.selectedWayOfHero));
                data.sort((a, b) => {
                    return a.id > b.id ? 1 : -1;
                });
                return data;
            },
            sortedFoolish() {
                let data = JSON.parse(JSON.stringify(this.selectedFoolish));
                data.sort((a, b) => {
                    return a.id > b.id ? 1 : -1;
                });
                return data;
            },
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
                handler() {
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
            toggleWoth(location, flag) {
                if (flag === true) {
                    //woth true remove it from foolish
                    this.selectedFoolish = this.selectedFoolish.filter(foolishLocation => {
                        if (foolishLocation.id !== location.id) {
                            return foolishLocation;
                        }
                    });
                }
                if (flag === false) {
                    //foolish remove it from woth
                    this.selectedWayOfHero = this.selectedWayOfHero.filter(wothLocation => {
                        if (wothLocation.id !== location.id) {
                            return wothLocation;
                        }
                    });
                }
            },
            toggleDead(location) {
                if (location.dead === false) {
                    location.dead = true;
                    location.required = false;
                } else {
                    location.dead = false;
                }
                this.miscLocations[location.id - 1] = location;
            },
            toggleRequired(location) {
                if (location.required === false) {
                    location.required = true;
                    location.dead = false;
                } else {
                    location.required = false;
                }
                this.miscLocations[location.id - 1] = location;
            },
            reset() {
                localStorage.clear();
                this.selectedFoolish = [];
                this.selectedWayOfHero = [];
                this.extraNotes = null;
                this.locations = this.nonModifiedLocations;
                this.miscLocations = [];
                this.miscLocations = this.nonModifiedMiscLocations;
                this.resetModal = false;
            },
        },
    };
</script>

<style scoped lang="scss">

</style>

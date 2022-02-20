<template>
    <div class="w-full bg-gray-800 ">
    <div class="h-36"></div>
    <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div class="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
            <p class="text-3xl font-bold leading-7 text-center text-white">LastFM Chart Generator</p>
            <form action="" method="post">
                <div class="md:flex items-center mt-12">
                    <div class="w-full md:w-1/2 flex flex-col">
                        <label class="font-semibold leading-none text-gray-300">LastFM Name</label>
                        <input type="text" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" @input="updateValue($event.target.value, 'username')" />
                    </div>
                    
                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label class="font-semibold leading-none text-gray-300">Type</label>
                        <select 
                            class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                            @input="updateValue($event.target.value, 'type')"
                        >
                            <option value="recenttracks">Recent Tracks</option>
                            <option value="albums">Albums</option>
                            <option value="artists">Artists</option>
                        </select>
                    </div>

                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label class="font-semibold leading-none text-gray-300">Data</label>
                        <select 
                            class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                            @input="updateValue($event.target.value, 'datatime')"
                        >
                            <option value="overall">Alltime</option>
                            <option value="7day">Last Week</option>
                            <option value="1month">Last Month</option>
                            <option value="3month">Last 3 Months</option>
                            <option value="6month">Last 6 Months</option>
                            <option value="12month">Last Year</option>
                        </select>
                    </div>
                </div>
                 <div class="md:flex md:justify-center">
                     <div class="w-full md:w-1/6 flex flex-col md:mt-0 mt-4">
                        <label class="font-semibold leading-none text-gray-300">Width</label>
                        <input value="3" type="number" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" @input="updateValue($event.target.value, 'width')" />
                    </div>
                    <div class="w-full md:w-1/6 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label class="font-semibold leading-none text-gray-300">Height</label>
                        <input value="3" type="number" class="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" @input="updateValue($event.target.value, 'height')" />
                    </div>
                 </div>

                <div class="flex items-center justify-center w-full">
                    <button 
                        class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                        @click="submit"
                    >
                        Generate
                    </button>
                </div>
            </form>
        </div>
        <div v-if="data.displayImage" class="hero container max-w-screen-lg mx-auto py-8 pb-10 flex">
        <img :src="data.blob" class="mx-auto"/>
        </div>
    </div>
    
</div>

</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useToast, POSITION } from "vue-toastification";

const data = reactive({
  displayImage: false,
  datatime: "overall",
  type: "recenttracks",
  username: "",
  width: "3",
  height: "3",
  blob: "",
});

function updateValue(value: string, event: string) {
  switch (event) {
    case "username":
        data.username = value;
        break;
    case "type":
        data.type = value;
        break;
    case "datatime":
        data.datatime = value;
        break;
    case "width":
        data.width = value;
        break;
    case "height":
        data.height = value;
  }
}

function submit(event: any) {
    event.preventDefault();
    const toast = useToast();
    if (data.username === "") {
        toast.error("Please enter a username");
        return
    }
    if(Number(data.width) + Number(data.height) > 31) {
        toast.error("Maximum size of width + height must be less than or equal to 31");
        return
    }
    data.blob = "";
    const req = fetch(`URL/lastfm/chart/${data.username}/${data.type}/${data.datatime}?width=${data.width}&height=${data.height}`, {method: "POST", headers: {'Access-Control-Allow-Origin': '*',}})
        .then(data => data.blob()).then(blob => data.blob = URL.createObjectURL(blob)).then(() => data.displayImage = true);
    toast.info("Generating...", {position: POSITION.BOTTOM_RIGHT});
}

</script>
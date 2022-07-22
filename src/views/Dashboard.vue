<template>
  <div class="w-full h-full flex flex-wrap">
    <div
      class="
        w-[17rem]
        h-[7rem]
        border-2
        hover:border-none
        ease-linear
        duration-150
        border-dashboard_border
        text-[#828193]
        rounded-[10px]
        hover:bg-dashboard_bg hover:text-white_color
        text-center
        mt-6
        ml-10
        inline-flex
        flex-col
      "
    >
      <span class="font-poppins text-lg font-normal mt-8"
        >The number of all employees</span
      >
      <span class="font-poppins text-base font-normal mt-4 ml-52">{{
        employees.length
      }}</span>
    </div>
    <div
      class="
        w-[17rem]
        h-[7rem]
        ease-linear
        duration-150
        hover:border-none hover:bg-dashboard_bg hover:text-white_color
        rounded-[10px]
        border-dashboard_border
        text-[#828193]
        border-2
        text-center
        mt-6
        ml-10
        inline-flex
        flex-col
      "
    >
      <span class="font-poppins text-lg font-normal mt-8"
        >Average age of an employee</span
      >
      <span class="font-poppins text-base font-normal mt-4 ml-52">{{employee_number}}</span>
    </div>
    <div class="flex flex-wrap mt-10 ml-10">
      <BarChart
        :deparments="[
          IT_department.length,
          marketing_department.length,
          accounting_department.length,
        ]"
      />
      <Piechart
        class="ml-15"
        :genger_number="[number_men.length, number_women.length]"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import Piechart from "@/components/pages/Piechart.vue";
import BarChart from "@/components/pages/Barchart.vue";
import moment from "moment";
import axios from "axios";
import store from "@/store";
const employees = ref([]);
const number_men = ref([]);
const number_women = ref([]);
const IT_department = ref([]);
const accounting_department = ref([]);
const marketing_department = ref([]);
const employee_number = ref('')
function getEmployee() {
  axios.get("./server/data.json").then((res) => {
    employees.value = res.data.items;
    employees.value.filter((item) => {
      if (item.gender === "male") {
        number_men.value.push(item);
      } else if (item.gender === "female") {
        number_women.value.push(item);
      }
    });
    let allAgeCount = 0
    employees.value.forEach((item) => {
      let arr =[]
      let new_year = new Date();
      new_year = moment(new_year).format("YYYY");
      if (item.department === "IT") {
        IT_department.value.push(item);
      } else if (item.department === "Accounting") {
        accounting_department.value.push(item);
      } else if (item.department === "Marketing") {
        marketing_department.value.push(item);
      }
     arr = item.birth_date
     allAgeCount+= new_year-arr.slice(6,10)
    });
    employee_number.value = Math.floor(allAgeCount/employees.value.length)
  });
}
getEmployee();
</script>

<style >
</style>
<template>
  <div class="w-full">
    <h1 class="p-5 text-xl">List of employees</h1>
    <div class="w-full flex justify-between">
      <div class="w-full">
        <select
          v-model="filter"
          @change="SelectDepartment($event)"
          class="
            w-48
            text-center
            h-10
            rounded-xl
            border-gray-200 border-2
            border-button_bg
            outline-none
          "
        >
          <option disabled selected hidden value="">Departments</option>
          <option value="IT">IT</option>
          <option value="Accounting">Accounting</option>
          <option value="Marketing">Marketing</option>
        </select>
        <button
          @click="filter = ''"
          class="
            pl-4
            pr-4
            pt-2
            pb-2
            border-2
            bg-delate_btn
            ml-2
            rounded-xl
            text-sidebar_bg
          "
        >
          X
        </button>
      </div>
      <button
        @click="dialog2 = true"
        class="
          p-2
          px-5
          border-2
          bg-button_bg
          ml-2
          rounded-xl
          text-sidebar_bg
          mr-4
        "
      >
        Add+
      </button>
    </div>
    <apptable :headers="headers" :body="filteredList">
      <template #body_actions="{ item }">
        <router-link
          class="hover:underline"
          :to="{ name: 'singleEmployer', params: { id: item.id } }"
        >
          <i class="fa-solid fa-eye"></i>
        </router-link>
      </template>
    </apptable>
    <v-pagination
      class="mt-7 pb-7"
      v-model="params.page"
      :pages="params.total"
      :range-size="1"
      active-color="#EAF5FF"
      @update:modelValue="changePage"
    />
    <AppModal v-model="dialog2" :width="'40%'">
      <div class="w-full p-7 text-center flex flex-col">
        <p class="text-xl">Yangi ishchi qo'shish</p>
        <div class="w-full flex items-center m-4 flex-wrap">
          <Input
            :id_name="input_data.input1"
            :label_name="input_data.label1"
            v-model="forms.full_name"
          />
        </div>
        <div class="w-full flex items-center m-4 flex-wrap">
          <select
            v-model="forms.department"
            class="
              w-full
              text-center
              h-11
              rounded-md
              border-2
              border-dashboard_border
              outline-none
            "
          >
            <option disabled selected hidden value="">Department</option>
            <option value="IT">IT</option>
            <option value="Accounting">Accounting</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div class="w-full flex items-center m-4 flex-wrap">
          <Input
            :id_name="input_data.input2"
            :label_name="input_data.label2"
            :v-model="forms.position"
          />
        </div>
        <div class="flex m-4 items-center flex-wrap">
          <span>Gender:</span>
          <div class="w-80 ml-4 flex text-start">
            <div class="w-6/12">
              <input
                type="radio"
                v-model="forms.gender"
                value="male"
                name="gender"
              />
              <span class="ml-1">Male</span>
            </div>
            <div class="w-6/12">
              <input
                type="radio"
                v-model="forms.gender"
                value="female"
                name="gender"
              />
              <span class="ml-1">Female</span>
            </div>
          </div>
        </div>
        <div class="w-full flex m-4 pb-8 items-center flex-wrap">
          <span>Date_birth:</span>
          <datepicker
            v-model="forms.birth_date"
            class="
              h-10
              flex-1
              w-[355px]
              ml-4
              border-2
              rounded-md
              border-dashboard_border
              text-base
              p-3
              outline-none
            "
          />
        </div>
        <button
          type="submit"
          @click="AddEmployee"
          class="p-2 border-2 bg-button_bg ml-2 rounded-xl text-sidebar_bg"
        >
          Add Employee
        </button>
      </div>
    </AppModal>
  </div>
</template>
<script setup>
import apptable from "@/components/ui/app_table.vue";
import axios from "axios";
import AppModal from "@/components/ui/app-modal.vue";
import VPagination from "@hennge/vue3-pagination";
import Datepicker from "vue3-datepicker";
import Input from "@/components/ui/app-input.vue";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { computed, onMounted, ref, watch } from "vue";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const dialog2 = ref(false);
const ID = ref(null);
const employees = ref([]);
let filter = ref("");
const input_data = ref({
  input1: "f_name1",
  input2: "f_name2",
  label1: "Full Name",
  label2: "Postion",
});
const filters = ref([]);
const params = ref({
  page: 1,
  per_page: 10,
  total: 0,
});
const forms = ref({
  full_name: "",
  department: "",
  birth_date: new Date(),
  position: "",
  gender: "",
});
const headers = ref([
  { title: "№", value: "id" },
  { title: "FullName", value: "full_name" },
  { title: "Department", value: "department" },
  { title: "Position", value: "position" },
  { title: "Gender", value: "gender" },
  { title: "Birth date", value: "birth_date" },
  { title: "Amallar", value: "actions" },
]);
const filteredList = computed(() => {
  let a = filters.value.filter((item) => item.department === filter.value);
  if (filter.value) {
    return a;
  } else {
    return employees.value;
  }
});
async function changePage(val) {
  await router.push({ query: { page: val } });
  getEmployers();
}
function AddEmployee() {
  forms.value.birth_date = moment(forms.value.birth_date).format("DD-MM-YYYY");
  axios
    .post("http://localhost:3000/items", {
      ...forms.value,
    })
    .then((res) => {
      if (res.data.success) {
        dialog2.value = false;
        getEmployers();
        forms.value = "";
      }
    });
}
async function getEmployers() {
  const page = route.query.page || 1;
  axios.get("http://localhost:3000/items").then((res) => {
    filters.value = res.data;
    const pagination = params.value.per_page * (+page - 1);
    params.value.total = Math.ceil(res.data.length / params.value.per_page);
    employees.value = res.data.slice(pagination, pagination + 10);
  });
}
onMounted(async () => {
  const { page } = route.query;
  if (!page) {
    router.replace({ query: { page: params.value.page } });
  }
  getEmployers();
});
</script>

<style>
</style>
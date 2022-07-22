<template>
  <div class="w-full flex justify-center items-center">
  <router-link to='/list_of_employees' class="fixed top-[1rem] left-[17rem] p-2 px-5 border-2 bg-button_bg ml-2 rounded-xl text-sidebar_bg mr-4">
    <i class="fa-solid fa-arrow-left"></i>
    <span class="ml-1">orqaga</span>
    </router-link>
    <div>
      <p class="text-2xl text-center my-2 font-poppins font-bold">
        Employee Detail
      </p>
      <div
        class="flex flex-col items-center bg-white_color shadow-sinfle_shadow"
        style="
          width: 370px;
          height: 480px;
          box-shadow: 0px 4px 40px rgba(91, 99, 169, 0.3);
        "
      >
        <img v-show="single_employee.gender === 'female'" class="w-28 h-28 my-3" :src="woman" alt="" />
        <img v-show="single_employee.gender === 'male'" class="w-28 h-28 my-3" :src="man" alt="" />
        <div class="w-full text-center">
          <div class="text-center my-3 border-b-sidebar_text px-3">
            <h2 class="font-poppins font-bold text-2xl text-person_color">
              {{ single_employee.full_name }}
            </h2>
            <p class="font-poppins text-base font-normal text-color_green">
              {{ single_employee.gender }}
            </p>
            <p class="font-poppins text-base font-normal text-color_green">
              {{ single_employee.birth_date }}
            </p>
          </div>
          <div class="text-center my-10 border-b-sidebar_text px-3">
            <div class="w-full flex items-center justify-between my-3">
              <span class="font-poppins text-sm font-light text-[#A5A8BF]">Department</span>
              <p class="font-poppins text-lg font-normal text-[#41477A]">
                {{ single_employee.department }}
              </p>
            </div>
            <div class="w-full flex items-center justify-between my-3">
              <span class="font-poppins text-base font-light text-[#A5A8BF]">Position</span>
              <p class="font-poppins text-lg font-normal text-[#41477A]">
              {{ single_employee.position }}
            </p>
            </div>
            
          </div>
        </div>
        <div class="w-full mt-5 flex items-center justify-center">
            <button @click="deleteItem(single_employee.id)" class=" rounded-[7px] bg-delate_btn py-3 px-10 m-3 text-white_color text-base">delate</button>
            <button @click="editItem(single_employee.id)" class="rounded-[7px] bg-button_bg py-3 px-10 m-3 text-white_color text-base">edit</button>
        </div>
      </div>
    </div>
     <AppModal v-model="dialog" :width="'35%'">
      <div class="w-full p-10 text-center flex flex-col justify-center">
        <p class="m-5 text-center text-lg">Ro'yxatdan o'chirishga ishonchingiz komilmi?</p>
        <div class="flex flex-wrap items-center justify-center">
          <button
          class="rounded-[7px] bg-button_bg py-3 px-10 m-3 text-white_color text-base"
            @click="dialog = false"
          >
            close
          </button>
          <button
            @click="delateEmployee"
            class=" rounded-[7px] bg-delate_btn py-3 px-10 m-3 text-white_color text-base"
          >
            delete
          </button>
        </div>
      </div>
    </AppModal>
     <AppModal v-model="dialog2" :width="'40%'">
      <div class="w-full p-7 text-center flex flex-col">
        <p class="text-xl">Ishchi malumotlarini o'zgartirish</p>
        <div class="w-full flex items-center m-4 flex-wrap">
          <Input :id_name="input_data.input1" :label_name="input_data.label1" v-model="single_employee.full_name"/>
        </div>
        <div class="w-full flex items-center m-4 flex-wrap">
          <select
            v-model="single_employee.department"
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
           <Input :id_name="input_data.input2" :label_name="input_data.label2" v-model="single_employee.position"/>
        </div>
        <div class="flex m-4 items-center flex-wrap">
          <span>Gender:</span>
          <div class="w-80 ml-4 flex text-start">
            <div class="w-6/12">
              <input
                type="radio"
                v-model="single_employee.gender"
                value="male"
                name="gender"
              />
              <span class="ml-1">Male</span>
            </div>
            <div class="w-6/12">
              <input
                type="radio"
                v-model="single_employee.gender"
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
            v-model="single_employee.birth_date"
            class="h-10 flex-1 w-[355px] ml-4 border-2 rounded-md border-dashboard_border text-base p-3 outline-none"
          />
        </div>
        <button
          @click="EditEmployee"
          class="p-2 border-2 bg-button_bg ml-2 rounded-xl text-sidebar_bg"
        >
          Edit
        </button>
      </div>
    </AppModal>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import AppModal from "@/components/ui/app-modal.vue";
import Datepicker from "vue3-datepicker";
import Input from '@/components/ui/app-input.vue'
import man from "@/assets/images/men1.svg";
import woman from "@/assets/images/famale1.svg";
import { useRouter } from "vue-router";
const url = window.location.href.split("/");
const router = useRouter();
const ID = ref(null);
const ID2 = ref(null);
const dialog = ref(false);
const dialog2 = ref(false);
const single_employee = ref({});
console.log(url[4]);
const input_data = ref({
  input1: "f_name1",
  input2: "f_name2",
  label1: "Full Name",
  label2: "Postion"
})
const forms = ref({
  full_name: "",
  department: "",
  birth_date: new Date(),
  position: "",
  gender: "",
});
function deleteItem(id) {
  dialog.value = true;
  ID.value = id;
}
function editItem(id) {
  dialog2.value = true;
  ID2.value = id;
}
function GetSingleEmployer() {
  axios.patch(`http://localhost:3000/items/${url[4]}`).then((res) => {
    single_employee.value = res.data;
    console.log(single_employee.value, "val");
  });
}
function delateEmployee() {
  axios.delete(`http://localhost:3000/items/${ID.value}`).then((res) => {
      dialog.value = false;
      router.push({ name: "list_of_employees" });
  });
}
function EditEmployee(){
  // forms.value.birth_date = moment(forms.value.birth_date).format("DD-MM-YYYY");
   axios.patch(`http://localhost:3000/items/${ID2.value}`,{
    single_employee
   }).then((res) => {
      dialog2.value = false;
  });
}
GetSingleEmployer();
</script>
<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  {{ datasets }}
</template>

<script setup>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin,
} from "chart.js";
import { computed, watch } from "@vue/runtime-core";
import { ref } from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
const props = defineProps({
  chartId: {
    type: String,
    default: "pie-chart",
  },
  datasetIdKey: {
    type: String,
    default: "label",
  },
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 400,
  },
  cssClasses: {
    default: "",
    type: String,
  },
  styles: {
    type: Object,
    default: () => {},
  },
  genger_number: {
    type: Array,
  },
  plugins: {
    type: Object,
    default: () => {},
  },
});

watch(props, (val) => {
  chartData.value.datasets[0].data = val.genger_number;
});
const chartData = ref({
  labels: ["Men", "Women"],
  datasets: [
    {
      backgroundColor: [ "#0971F1","#DD1B16"],
      data: props.genger_number,
    },
  ],
  chartOptions: {
    responsive: true,
  },
});
</script>

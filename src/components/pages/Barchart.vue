<template>
  <Bar
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
{{datasets}}
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, watch } from '@vue/runtime-core'
import {ref} from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const props = defineProps({
    chartId: {
       type: String,
       default: 'bar-chart'
     },
     IT:{
         type: String
     },
    
     datasetIdKey: {
       type: String,
       default: 'label'
     },
     width: {
       type: Number,
       default: 500
     },
     height: {
       type: Number,
       default: 400
     },
     cssClasses: {
       default: '',
       type: String
     },
     styles: {
       type: Object,
       default: () => {}
     },
      deparments:{
         type: Array
     },
     plugins: {
       type: Object,
      default: () => {}
   }
})

watch(props, (val) => {
    chartData.value.datasets[0].data = val.deparments
})
const chartData = ref({
         labels : [ 'IT Department', 'Marketing Department', 'Accounting Department' ],
         datasets : [ 
          { 
            backgroundColor: ['#3DC6D6', '#FF53C4', '#F9AB91'],
            data: props.deparments
            }
           ],
         chartOptions: {
            responsive: true
        }
       })
</script>

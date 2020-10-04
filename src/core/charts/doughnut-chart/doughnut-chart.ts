import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'doughnut-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp]
})
export default class DoughnutChart extends Vue {
  @Prop({ required: true, type: Object })
  chartData!: Chart.ChartData;

  @Prop({ required: true, type: Object })
  chartOptions!: Chart.ChartOptions;

  mounted(): void {
    (this as any).renderChart(this.chartData, this.chartOptions)
  }
}

import Vue from 'vue';
import { mixins, Pie } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'pie-chart',
  extends: Pie,
  mixins: [mixins.reactiveProp]
})
export default class PieChart extends Vue {
  @Prop({ required: true, type: Object })
  chartData!: Chart.ChartData;

  @Prop({ required: true, type: Object })
  chartOptions!: Chart.ChartOptions;

  mounted(): void {
    (this as any).renderChart(this.chartData, this.chartOptions)
  }
}

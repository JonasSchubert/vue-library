import Vue from 'vue';
import { Bar, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'bar-chart',
  extends: Bar,
  mixins: [mixins.reactiveProp]
})
export default class BarChart extends Vue {
  @Prop({ required: true, type: Object })
  chartData!: Chart.ChartData;

  @Prop({ required: true, type: Object })
  chartOptions!: Chart.ChartOptions;

  mounted(): void {
    (this as any).renderChart(this.chartData, this.chartOptions)
  }
}

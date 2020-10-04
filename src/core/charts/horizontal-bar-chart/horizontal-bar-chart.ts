import Vue from 'vue';
import { HorizontalBar, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'horizontal-bar-chart',
  extends: HorizontalBar,
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

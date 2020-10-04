import Vue from 'vue';
import { Line, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp]
})
export default class LineChart extends Vue {
  @Prop({ required: true, type: Object })
  chartData!: Chart.ChartData;

  @Prop({ required: true, type: Object })
  chartOptions!: Chart.ChartOptions;

  mounted(): void {
    (this as any).renderChart(this.chartData, this.chartOptions)
  }
}

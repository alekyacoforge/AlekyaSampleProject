import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/ChartController.getOpportunities'

export default class UseCaseChartWrapper extends LightningElement {
   
    chartConfig;
    @wire(getOpportunities)
    wiredOpportunities({ data, error })
    {
        if (data) {
            let chartCountData = [];
            let chartStageData = [];

            data.forEach(opp =>
            {
                chartCountData.push(opp.Total);
                chartStageData.push(opp.StageName);
            });

            this.chartConfig = {
                type: 'pie',/*bar */
                data: {
                    datasets: [{
                        label: 'Number',
                        backgroundColor: ['green','orange','red','ash','pink','blue','voilet', 'Hotpink','yellow'],
                        data: chartCountData
                    }],
                    labels : chartStageData
                }
                
            }
        }
    }
}
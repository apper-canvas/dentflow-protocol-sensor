import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CostEstimator = ({ procedures, totals }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryTotals = () => {
    const categoryTotals = {};
    procedures.forEach(procedure => {
      const category = procedure.category;
      if (!categoryTotals[category]) {
        categoryTotals[category] = {
          count: 0,
          totalCost: 0,
          totalInsurance: 0
        };
      }
      categoryTotals[category].count += 1;
      categoryTotals[category].totalCost += procedure.cost || 0;
      categoryTotals[category].totalInsurance += (procedure.cost || 0) * (procedure.insuranceRate || 0);
    });
    return categoryTotals;
  };

  const categoryTotals = getCategoryTotals();

  const getCategoryColor = (category) => {
    const colors = {
      preventive: "success",
      restorative: "primary",
      endodontic: "warning", 
      surgical: "error",
      orthodontic: "info",
      cosmetic: "secondary"
    };
    return colors[category] || "secondary";
  };

  const insuranceRate = totals.totalCost > 0 ? 
    (totals.totalInsuranceCovered / totals.totalCost) * 100 : 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cost Estimator</h3>
        <p className="text-sm text-gray-600">
          Real-time cost and insurance calculations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Total Summary */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 to-blue-50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Procedures</span>
              <span className="font-medium text-gray-900">{totals.procedureCount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Cost</span>
              <span className="font-semibold text-lg text-gray-900">
                {formatCurrency(totals.totalCost)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Insurance Coverage</span>
              <div className="text-right">
                <div className="font-medium text-success">
                  {formatCurrency(totals.totalInsuranceCovered)}
                </div>
                <div className="text-xs text-gray-500">
                  {insuranceRate.toFixed(1)}% coverage
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="font-medium text-gray-900">Patient Portion</span>
              <span className="font-bold text-xl text-primary">
                {formatCurrency(totals.patientPortion)}
              </span>
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        {Object.keys(categoryTotals).length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Category Breakdown</h4>
            <div className="space-y-3">
              {Object.entries(categoryTotals).map(([category, data]) => (
                <Card key={category} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getCategoryColor(category)} size="sm">
                        {category}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {data.count} procedure{data.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium">{formatCurrency(data.totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="text-success">{formatCurrency(data.totalInsurance)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Patient:</span>
                      <span>{formatCurrency(data.totalCost - data.totalInsurance)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Insurance Information */}
        <Card className="p-4 bg-blue-50">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Info" className="w-5 h-5 text-info mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Insurance Notes</h5>
              <p className="text-sm text-gray-600">
                Coverage estimates are based on typical insurance plans. 
                Actual coverage may vary depending on the patient's specific plan, 
                deductibles, and annual maximums.
              </p>
            </div>
          </div>
        </Card>

        {procedures.length === 0 && (
          <Card className="p-6 text-center">
            <ApperIcon name="Calculator" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">No Procedures Added</h4>
            <p className="text-sm text-gray-600">
              Add procedures to see cost estimates and insurance calculations
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CostEstimator;
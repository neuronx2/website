import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency

# Step 1: Simulate data
np.random.seed(42)
n_visitors = 1000

# Simulate A group: CTA at top
# Assume a 12% conversion rate
A_conversions = np.random.binomial(1, 0.12, n_visitors // 2)

# Simulate B group: CTA at bottom
# Assume a 9% conversion rate
B_conversions = np.random.binomial(1, 0.09, n_visitors // 2)

# Combine into DataFrame
data = pd.DataFrame({
    'group': ['A'] * (n_visitors // 2) + ['B'] * (n_visitors // 2),
    'converted': np.concatenate([A_conversions, B_conversions])
})

# Step 2: Summary stats
summary = data.groupby('group')['converted'].agg(['count', 'sum'])
summary['conversion_rate'] = summary['sum'] / summary['count']
print("Conversion Summary:\n", summary)

# Step 3: Chi-square test
contingency_table = pd.crosstab(data['group'], data['converted'])
chi2, p, _, _ = chi2_contingency(contingency_table)

print("\nChi-square test result:")
print(f"Chi2 Statistic = {chi2:.4f}, p-value = {p:.4f}")
if p < 0.05:
    print("\nResult: Statistically significant difference in CTA position.")
else:
    print("\nResult: No significant difference in CTA position.")

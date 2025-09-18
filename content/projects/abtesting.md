---
title: "Experimentation: Increasing signups through A/B Tests"
excerpt: "Applied experimentation methods like A/B testing to optimize user engagement, conversion funnels, and campaign effectiveness across marketing touchpoints."
thumbnail: "projects/abtesting.jpg"
relatedSkills: ["da","ce","strategy"]
relatedIndustries: ["boutique-consultancy","ecommerce","marketing-research"]
relatedBlogs: [
  "experimentation"
]

---

As Business Analytics Manager and as a part of the Marketing BI, Data Strategy and Growth Optimization teams, I’ve worked hands-on with experimentation to improve user engagement, reactivation, and conversion. A/B testing has been one of the most powerful tools in this process — enabling data-driven decisions across email campaigns and web design to drive measurable business impact.

Whether the goal is to re-engage lapsed users, optimize lead conversion funnels, or boost website performance, experimentation allows one to test hypotheses, validate assumptions, and prioritize what truly works — not just what one thinks might work.

some projects undertaken:
- Reactivating dormant users through personalized email campaigns.
- Increasing signups or demo requests on landing pages.
- Converting leads into paying customers through nurturing emails.
- Encouraging first-time website visitors to make purchase.
- Increase CTR (Click-Through Rate) or ROAS (Return on Ad Spend) for social media advertisement.
- Increasing collection rates through weekly/biweekly payment reminders.
- Optimizing discount strategy through discount vouchers

## Project Goal

Increasing signups or demo requests on landing pages.

### Test
A/B test positioning of the CTA button (e.g., above-the-fold vs. below-the-fold).
- Version A: CTA at the top
- Version B: CTA at the bottom

### Hypothesis
Moving the CTA button to the top will increase signups.

### Results
- Chi-square statistic: 7.45
- p-value: 0.0064

### Interpretation
- Group A (CTA at the top) has a noticeably higher conversion rate (13.8%) than Group B (CTA at the bottom) at 8.2%.
- The p-value < 0.05 means this difference is statistically significant — it’s very unlikely to have happened by chance.

### Business Implications
- Moving the CTA button to the top of the page could significantly increase conversions.
- This small UX change might drive a ~5.6% absolute increase in conversions.
- Over time, more revenue or users without extra marketing spend.

### Stack
- Python + Pandas for modeling
- Tableau for dashboard delivery
- DBT (SQL) + Salesforce + Snowflake for pipeline

#### Additional Resources (for this project)

- [A/B Test: Python File](../../contents/others/abtest.py)
- [Cleaned Data for Viewing or Practice](../../contents/others/abtest_not_original.csv)
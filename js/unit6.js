const Unit6 = {
    evaluate: (data) => {
        let score = 0;
        const results = [];

        const roe = data.roe;
        const margin = data.margin;
        const de_ratio = data.de_ratio;
        const price = data.price;
        const eps = data.eps;
        const growth_rate = data.growth_rate;
        const pe_ratio = (eps > 0) ? price / eps : 0;

        // Test 1: 10 Year EPS
        const future_eps = eps * Math.pow((1 + (growth_rate / 100)), 10);
        const projected_pe = Math.min(pe_ratio, 15.0);
        const future_price = future_eps * projected_pe;

        let expected_return = 0;
        if (price > 0) {
            expected_return = Math.pow((future_price / price), (1 / 10)) - 1;
        }

        if (expected_return >= 0.12) {
            score += 2;
            results.push(`Pass: Ten Year EPS Test yields ${(expected_return * 100).toFixed(2)}% return.`);
        } else {
            results.push(`Fail: Ten Year EPS Test yields only ${(expected_return * 100).toFixed(2)}% return.`);
        }

        // Test 2: Margins
        if (margin >= 0.10) {
            score += 1;
            results.push(`Pass: Healthy Net Profit Margin (${(margin * 100).toFixed(1)}%).`);
        } else {
            results.push(`Fail: Low Profit Margin.`);
        }

        // Test 3: Debt
        if (de_ratio < 0.50) {
            score += 1;
            results.push(`Pass: Conservative Debt-to-Equity (${de_ratio}).`);
        } else {
            results.push(`Fail: High Debt-to-Equity.`);
        }

        // Test 4: ROE
        if (roe >= 0.15) {
            score += 1;
            results.push(`Pass: Strong ROE (${(roe * 100).toFixed(1)}%).`);
        } else {
            results.push(`Fail: Low ROE.`);
        }

        let verdict = "Pass";
        if (score >= 4) verdict = "Buffett Buy";
        else if (score >= 2) verdict = "Hold / Watchlist";

        return { score, verdict, details: results };
    }
};
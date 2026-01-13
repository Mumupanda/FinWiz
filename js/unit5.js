const Unit5 = {
    checkStatus: (value, benchmark, higherIsBetter = true) => {
        if (higherIsBetter) return value >= benchmark ? "Good" : "Bad";
        return value <= benchmark ? "Good" : "Bad";
    },

    calculateRatios: (d) => {
        const res = {};
        try {
            // Helpers
            const safeDiv = (n, d) => (d !== 0 ? n / d : 0);

            // 1. Price/Market
            const pe = safeDiv(d.price, d.eps);
            res['P/E Ratio'] = { val: pe, status: Unit5.checkStatus(pe, 15, false) };

            const p_cf = safeDiv(d.price, d.ocfps);
            res['P/CF Ratio'] = { val: p_cf, status: Unit5.checkStatus(p_cf, 10, false) };

            const p_b = safeDiv(d.price, d.bvps);
            res['P/B Ratio'] = { val: p_b, status: Unit5.checkStatus(p_b, 1, false) };

            const salesPerShare = safeDiv(d.sales, d.shares_os);
            const p_s = safeDiv(d.price, salesPerShare);
            res['P/S Ratio'] = { val: p_s, status: Unit5.checkStatus(p_s, 1, false) };

            // PEG: Python assumed d['growth'] was decimal 0.05, converted to 5.
            const peg = safeDiv(pe, d.growth * 100); 
            res['PEG Ratio'] = { val: peg, status: Unit5.checkStatus(peg, 1, false) };

            // 2. Profitability
            const roe = safeDiv(d.ni, d.equity);
            res['Return on Equity (ROE)'] = { val: roe, status: Unit5.checkStatus(roe, 0.15) };

            const roa = safeDiv(d.ni, d.assets);
            res['Return on Assets (ROA)'] = { val: roa, status: Unit5.checkStatus(roa, 0.04) };

            const npm = safeDiv(d.ni, d.sales);
            res['Net Profit Margin'] = { val: npm, status: "Compare to Industry" };

            // 3. Liquidity
            const cr = safeDiv(d.current_assets, d.current_liab);
            res['Current Ratio'] = { val: cr, status: Unit5.checkStatus(cr, 2) };

            const tie = safeDiv(d.ebit, d.int_exp);
            res['Interest Coverage (TIE)'] = { val: tie, status: Unit5.checkStatus(tie, 4) };

            const de = safeDiv(d.lt_debt, d.equity);
            res['Debt to Equity'] = { val: de, status: Unit5.checkStatus(de, 1, false) };

            // 4. Asset Mgmt
            const ar_turn = safeDiv(d.sales, d.ar);
            res['A/R Turnover'] = { val: ar_turn, status: Unit5.checkStatus(ar_turn, 7.3) };

            const inv_turn = safeDiv(d.cogs, d.inv);
            res['Inventory Turnover'] = { val: inv_turn, status: Unit5.checkStatus(inv_turn, 6) };

            const sales_emp = safeDiv(d.sales, d.emps);
            res['Sales per Employee'] = { val: sales_emp, status: Unit5.checkStatus(sales_emp, 100000) };

        } catch (e) {
            console.error(e);
            return { "Error": { val: 0, status: "Error calculating ratios" } };
        }
        return res;
    }
};
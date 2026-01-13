const Unit4 = {
    calculateMarginLong: (originalPrice, currentPrice, numShares, marginReq) => {
        const loanRatio = 1 - marginReq;
        const originalLoan = (originalPrice * numShares) * loanRatio;
        const currentMarketValue = currentPrice * numShares;
        
        const currentMarginRatio = (currentMarketValue - originalLoan) / currentMarketValue;
        const isMarginCall = currentMarginRatio < marginReq;
        
        let sharesToSell = 0;
        if (isMarginCall) {
            const denom = currentPrice * (1 - marginReq);
            if (denom !== 0) {
                const numerator = originalLoan - (numShares * currentPrice * (1 - marginReq));
                sharesToSell = Math.ceil(numerator / denom);
            }
        }

        return {
            originalLoan,
            currentMarginRatio,
            isMarginCall,
            sharesToSell
        };
    },

    calculateShortSale: (salePrice, currentPrice, numShares, marginReq) => {
        const saleProceeds = salePrice * numShares;
        const requiredMargin = saleProceeds * marginReq;
        const totalAssets = saleProceeds + requiredMargin;
        
        const currentDebtValue = currentPrice * numShares;
        const currentMarginRatio = (totalAssets - currentDebtValue) / currentDebtValue;
        
        const marginCallPrice = totalAssets / (numShares * (1 + marginReq));
        
        return {
            totalAssets,
            currentMarginRatio,
            marginCallPrice,
            isMarginCall: currentPrice > marginCallPrice
        };
    },

    calculateIndices: (prices, shares, divPw, divMw) => {
        const sumPrices = prices.reduce((a, b) => a + b, 0);
        const pwIndex = sumPrices / divPw;

        const marketCaps = prices.map((p, i) => p * shares[i]);
        const sumMc = marketCaps.reduce((a, b) => a + b, 0);
        const mwIndex = sumMc / divMw;

        return { pwIndex, mwIndex, totalMc: sumMc };
    }
};
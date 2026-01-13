const Unit8 = {
    calculateOptionAll: (st, x, premium, isCall, isHolder) => {
        let intrinsicValue = 0;
        let optionType = "";
        
        if (isCall) {
            intrinsicValue = Math.max(0, st - x);
            optionType = "Call";
        } else {
            intrinsicValue = Math.max(0, x - st);
            optionType = "Put";
        }

        let role = "", payoff = 0, profit = 0, breakeven = 0;

        if (isHolder) {
            role = "Holder (Buyer)";
            payoff = intrinsicValue;
            profit = payoff - premium;
            breakeven = isCall ? (x + premium) : (x - premium);
        } else {
            role = "Writer (Seller)";
            payoff = -intrinsicValue;
            profit = premium + payoff;
            breakeven = isCall ? (x + premium) : (x - premium);
        }

        return {
            role, type: optionType, payoff, profit, breakeven,
            note: intrinsicValue > 0 ? "In the Money" : "Out of the Money"
        };
    },
    
    // Additional functions (straddle, covered, protective) follow the same pattern...
};
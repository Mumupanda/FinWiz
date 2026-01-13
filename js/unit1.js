// Utility: Format Currency
const toCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

// 1. Simple Interest FV
function calculateSimpleFV() {
    const pv = parseFloat(document.getElementById('simple_pv').value);
    const rate = parseFloat(document.getElementById('simple_rate').value) / 100;
    const timeType = document.getElementById('simple_time_type').value;
    const timeVal = parseFloat(document.getElementById('simple_time_val').value);

    let t = (timeType === 'days') ? timeVal / 365.0 : timeVal;
    const fv = pv * (1 + rate * t);

    displayResult(`Simple Future Value: ${toCurrency(fv)}`);
}

// 2. Compound Interest
function calculateCompound() {
    const calcType = document.getElementById('comp_type').value;
    const amount = parseFloat(document.getElementById('comp_amount').value);
    const rate = parseFloat(document.getElementById('comp_rate').value) / 100;
    const freq = parseInt(document.getElementById('comp_freq').value);
    const years = parseFloat(document.getElementById('comp_years').value);

    const i = rate / freq;
    const n = years * freq;
    let res = 0;
    let label = "";

    if (calcType === 'fv') {
        res = amount * Math.pow((1 + i), n);
        label = "Future Value";
    } else {
        res = amount * Math.pow((1 + i), -n);
        label = "Present Value";
    }
    displayResult(`${label}: ${toCurrency(res)}`);
}

// 3. Perpetuities
function calculatePerpetuity() {
    const pmt = parseFloat(document.getElementById('perp_pmt').value);
    const rate = parseFloat(document.getElementById('perp_rate').value) / 100;
    const freq = parseInt(document.getElementById('perp_freq').value);
    const growthRate = parseFloat(document.getElementById('perp_growth').value || 0) / 100;

    const periodicRate = rate / freq;

    if (periodicRate <= growthRate) {
        displayResult("Undefined (Interest rate must be > Growth rate)");
        return;
    }

    const pv = pmt / (periodicRate - growthRate);
    displayResult(`Perpetuity Present Value: ${toCurrency(pv)}`);
}

// 4. Growing Annuity
function calculateGrowingAnnuity() {
    const pmt = parseFloat(document.getElementById('ga_pmt').value);
    const rate = parseFloat(document.getElementById('ga_rate').value) / 100;
    const freq = parseInt(document.getElementById('ga_freq').value);
    const years = parseFloat(document.getElementById('ga_years').value);
    const growth = parseFloat(document.getElementById('ga_growth').value) / 100;

    const i = rate / freq;
    const n = years * freq;
    
    const t1 = pmt * Math.pow((1 + i), -1);
    
    let pv = 0;
    if (i === growth) {
        pv = n * t1;
    } else {
        const r = (1 + growth) / (1 + i);
        pv = t1 * (1 - Math.pow(r, n)) / (1 - r);
    }
    
    displayResult(`Growing Annuity PV: ${toCurrency(pv)}`);
}

// 5. Standard Annuity
function calculateAnnuity() {
    const calcType = document.getElementById('ann_type').value;
    const pmt = parseFloat(document.getElementById('ann_pmt').value);
    const rate = parseFloat(document.getElementById('ann_rate').value) / 100;
    const freq = parseInt(document.getElementById('ann_freq').value);
    const years = parseFloat(document.getElementById('ann_years').value);
    const timing = document.getElementById('ann_timing').value;
    const isDue = (timing === 'due');

    const i = rate / freq;
    const n = years * freq;
    let res = 0;
    let label = "";

    if (calcType === 'fv') {
        const fvOrd = pmt * ((Math.pow(1 + i, n) - 1) / i);
        res = isDue ? fvOrd * (1 + i) : fvOrd;
        label = "Annuity Future Value";
    } else {
        const pvOrd = pmt * ((1 - Math.pow(1 + i, -n)) / i);
        res = isDue ? pvOrd * (1 + i) : pvOrd;
        label = "Annuity Present Value";
    }

    displayResult(`${label}: ${toCurrency(res)}`);
}

// THE FIX: This function now correctly reveals the parent container
function displayResult(msg) {
    const container = document.getElementById('result-box');
    const text = document.getElementById('main-result');
    if (container && text) {
        container.style.display = 'block';
        text.innerText = msg;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

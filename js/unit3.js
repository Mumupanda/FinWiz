function calculateBond() {
    const faceValue = parseFloat(document.getElementById('par').value);
    const couponRate = parseFloat(document.getElementById('c_rate').value);
    const marketYield = parseFloat(document.getElementById('m_rate').value);
    const years = parseFloat(document.getElementById('years').value);

    // Logic from unit3.py
    const i = (marketYield / 100) / 2;
    const n = years * 2;
    const pmt = ((couponRate / 100) * faceValue) / 2;
    
    let price = 0;
    if (i === 0) {
        price = (pmt * n) + faceValue;
    } else {
        const pvCoupons = pmt * ((1 - Math.pow(1 + i, -n)) / i);
        const pvFace = faceValue * Math.pow(1 + i, -n);
        price = pvCoupons + pvFace;
    }

    const annualCoupon = (couponRate / 100) * faceValue;
    const currentYield = (price > 0) ? (annualCoupon / price) : 0;

    // Determine status
    let status = "Par";
    if (price > faceValue) status = "Premium";
    if (price < faceValue) status = "Discount";

    // Update UI
    const resultBox = document.getElementById('res-box');
    resultBox.style.display = 'block';
    
    document.getElementById('res-price').innerText = 
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    
    document.getElementById('res-yield').innerText = 
        (currentYield * 100).toFixed(2) + "%";
        
    document.getElementById('res-status').innerText = status;
}
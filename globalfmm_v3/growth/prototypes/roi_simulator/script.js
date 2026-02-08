document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roi-form');
    const resultsArea = document.getElementById('results-area');

    // BENCHMARKS (Based on Industry Standards for Predictive Maintenance)
    const SAVINGS_MAINTENANCE_PERCENT = 0.25; // 25% reduction in maintenance costs
    const SAVINGS_ENERGY_PERCENT = 0.15;      // 15% reduction in energy costs
    const DOWNTIME_REDUCTION_HOURS = 40;      // Assumed average reduction in downtime hours per year

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // animate processing
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Calculando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            calculateROI();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;

            // Reveal results
            resultsArea.style.opacity = '1';
            resultsArea.style.pointerEvents = 'all';
            resultsArea.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });

    function calculateROI() {
        // Get inputs
        const maintenanceBudget = parseFloat(document.getElementById('maintenanceBudget').value) || 0;
        const downtimeCost = parseFloat(document.getElementById('downtimeCost').value) || 0;
        const energySpend = parseFloat(document.getElementById('energySpend').value) || 0;
        const assetValue = parseFloat(document.getElementById('assetValue').value) || 0;

        // Calculations
        const maintenanceSavings = maintenanceBudget * SAVINGS_MAINTENANCE_PERCENT;
        const energySavings = energySpend * SAVINGS_ENERGY_PERCENT;
        const downtimeSavings = downtimeCost * DOWNTIME_REDUCTION_HOURS;

        const totalAnnualSavings = maintenanceSavings + energySavings + downtimeSavings;

        // ROI Calculation (Assuming Advance Licensing is ~10-15% of maintenance budget generally, or a fixed cost. 
        // For simulation, let's assume implementation cost is roughly 5% of asset value or 20% of budget for conservative estimate)
        // Simplified: (Gain from Investment - Cost of Investment) / Cost of Investment
        const estimatedCost = Math.max(maintenanceBudget * 0.15, 5000); // Floor of 5k
        const roi = ((totalAnnualSavings - estimatedCost) / estimatedCost) * 100;

        // Update UI
        document.getElementById('roi-display').innerText = `+${Math.round(roi)}%`;
        document.getElementById('savings-maintenance').innerText = formatCurrency(maintenanceSavings);
        document.getElementById('savings-energy').innerText = formatCurrency(energySavings);
        document.getElementById('savings-downtime').innerText = formatCurrency(downtimeSavings);
        document.getElementById('total-savings').innerText = formatCurrency(totalAnnualSavings);
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(value);
    }

    // Wire up CTA button (Future implementation: Open Modal or Send Data)
    document.getElementById('download-btn').addEventListener('click', () => {
        alert('Esta funcionalidad conectará con la API de generación de reportes PDF en la Fase 2.');
    });
});

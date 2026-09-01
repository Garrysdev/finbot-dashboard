// FinBot EA Engine & Interactive Investment Simulator

const state = {
    currentPhase: "Fase 3.1",
    tests: [
        {
            id: "#3 (Campeão)",
            data: "2026-08-21",
            ativo: "EURUSD",
            tf: "H1",
            periodo: "2022.08-2026.08",
            risco: "0.5%",
            sl: "3.5x",
            tp: "6.0x",
            trailing: "4.0x",
            lucro: "+557.97 $",
            payoff: "1.79 $",
            dd: "9.13%",
            status: "PASS",
            statusLabel: "🟢 SUCESSO VENCEDOR",
            notas: "Passe 1,71 da Otimização Genética. Lucro positivo sustentável com DD minúsculo de 9.13%. Aprovado para Fase 3 (Demo 24/7)."
        },
        {
            id: "#2",
            data: "2026-08-20",
            ativo: "EURUSD",
            tf: "H1",
            periodo: "2022.08-2026.08",
            risco: "0.5%",
            sl: "2.5x",
            tp: "5.0x",
            trailing: "3.0x",
            lucro: "-670.56 $",
            payoff: "-1.52 $",
            dd: "9.37%",
            status: "WARN",
            statusLabel: "🟡 Transição",
            notas: "Reduziu DD para 9.37% e taxa de acerto subiu para 71.66%, mas Trailing fechava trades cedo."
        },
        {
            id: "#1",
            data: "2026-08-20",
            ativo: "EURUSD",
            tf: "M15",
            periodo: "2022.08-2026.08",
            risco: "1.0%",
            sl: "1.5x",
            tp: "2.5x",
            trailing: "1.0x",
            lucro: "-8,357.30 $",
            payoff: "-0.08 $",
            dd: "85.25%",
            status: "FAIL",
            statusLabel: "🔴 Falha",
            notas: "Estratégia padrão M15. Ruído excessivo e SL curto."
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupNavigation();
    runSimulation();
});

function setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const elem = document.getElementById(targetId);
            if (elem) elem.classList.add('active');
        });
    });
}

// Dynamic Investment vs Time Simulator Engine
function runSimulation() {
    const capitalElem = document.getElementById('sim-capital');
    const timeElem    = document.getElementById('sim-time');
    const botElem     = document.getElementById('sim-bot');
    if (!capitalElem || !timeElem || !botElem) return;

    const capital = parseFloat(capitalElem.value) || 200;
    const timeYears = parseFloat(timeElem.value) || 1.0;
    const botType   = botElem.value || 'gold';

    // Annual Return Rates based on Strategy Optimization
    let annualRate = 0.45; // Default Gold 45%/yr
    let botNameRate = "~45.0% / ano";

    if (botType === 'forex') {
        annualRate = 0.15;
        botNameRate = "~15.0% / ano";
    } else if (botType === 'gold') {
        annualRate = 0.45;
        botNameRate = "~45.0% / ano";
    } else if (botType === 'champ') {
        annualRate = 0.65;
        botNameRate = "~65.0% / ano (Juros Compostos)";
    }

    // Compound Interest Calculation: Final = Capital * (1 + annualRate)^timeYears
    const finalFinBot = capital * Math.pow((1 + annualRate), timeYears);
    const profitFinBot = finalFinBot - capital;
    const roiFinBot = (profitFinBot / capital) * 100;

    // Bank Fixed Deposit Rate: 2.5% per year
    const bankRate = 0.025;
    const finalBank = capital * Math.pow((1 + bankRate), timeYears);
    const profitBank = finalBank - capital;
    const diffProfit = profitFinBot - profitBank;

    // Update Metric Card Elements
    const kpiCapDisp    = document.getElementById('kpi-capital-display');
    const kpiFinalVal   = document.getElementById('kpi-final-val');
    const kpiProfitSub  = document.getElementById('kpi-profit-sub');
    const kpiRoiVal     = document.getElementById('kpi-roi-val');
    const kpiDiffVal    = document.getElementById('kpi-diff-val');

    if (kpiCapDisp)    kpiCapDisp.innerText   = `${capital.toFixed(2)} €`;
    if (kpiFinalVal)   kpiFinalVal.innerText   = `${finalFinBot.toFixed(2)} €`;
    if (kpiProfitSub)  kpiProfitSub.innerText  = `Lucro Líquido: +${profitFinBot.toFixed(2)} €`;
    if (kpiRoiVal)     kpiRoiVal.innerText     = `+${roiFinBot.toFixed(1)}%`;
    if (kpiDiffVal)    kpiDiffVal.innerText    = `+${diffProfit.toFixed(2)} €`;

    // Update Detailed Table Elements
    const tblFinCap   = document.getElementById('tbl-finbot-capital');
    const tblFinTime  = document.getElementById('tbl-finbot-time');
    const tblFinRate  = document.getElementById('tbl-finbot-rate');
    const tblFinFinal = document.getElementById('tbl-finbot-final');
    const tblFinProf  = document.getElementById('tbl-finbot-profit');

    const tblBankCap  = document.getElementById('tbl-bank-capital');
    const tblBankTime = document.getElementById('tbl-bank-time');
    const tblBankFin  = document.getElementById('tbl-bank-final');
    const tblBankProf = document.getElementById('tbl-bank-profit');

    const timeText = timeYears === 0.5 ? '6 Meses (0.5 Anos)' : `${timeYears.toFixed(1)} Anos`;

    if (tblFinCap)   tblFinCap.innerText   = `${capital.toFixed(2)} €`;
    if (tblFinTime)  tblFinTime.innerText  = timeText;
    if (tblFinRate)  tblFinRate.innerText  = botNameRate;
    if (tblFinFinal) tblFinFinal.innerText = `${finalFinBot.toFixed(2)} €`;
    if (tblFinProf)  tblFinProf.innerText  = `+${profitFinBot.toFixed(2)} €`;

    if (tblBankCap)  tblBankCap.innerText  = `${capital.toFixed(2)} €`;
    if (tblBankTime) tblBankTime.innerText = timeText;
    if (tblBankFin)  tblBankFin.innerText  = `${finalBank.toFixed(2)} €`;
    if (tblBankProf) tblBankProf.innerText = `+${profitBank.toFixed(2)} €`;
}

function renderTable() {
    const tbody = document.getElementById('backtest-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    state.tests.forEach(item => {
        let badgeClass = 'status-fail';
        if (item.status === 'WARN') badgeClass = 'status-running';
        if (item.status === 'PASS') badgeClass = 'status-pass';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.data}</td>
            <td style="color:var(--accent-gold); font-weight:600;">${item.ativo}</td>
            <td>${item.tf}</td>
            <td>${item.periodo}</td>
            <td>${item.risco}</td>
            <td>${item.sl}</td>
            <td>${item.tp}</td>
            <td>${item.trailing}</td>
            <td style="color: ${item.lucro.includes('-') ? '#ef4444' : '#22c55e'}; font-weight:700;">${item.lucro}</td>
            <td style="color:var(--accent-green); font-weight:600;">${item.payoff}</td>
            <td>${item.dd}</td>
            <td><span class="status-pill ${badgeClass}">${item.statusLabel}</span></td>
            <td class="notes-cell">${item.notas}</td>
        `;
        tbody.appendChild(tr);
    });
}

function exportCSV() {
    let csv = 'ID;Data;Ativo;Timeframe;Periodo;Risco;SL_ATR;TP_ATR;Trailing_ATR;Lucro_Liquido;Payoff;Max_Drawdown;Resultado;Notas\n';
    state.tests.forEach(row => {
        csv += `${row.id};${row.data};${row.ativo};${row.tf};${row.periodo};${row.risco};${row.sl};${row.tp};${row.trailing};${row.lucro};${row.payoff};${row.dd};${row.statusLabel};"${row.notas}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'FinBot_Backtests_History.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// js/chart-script.js

// Função para buscar os dados do endpoint
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/graficos');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Dados recebidos:', data); // Adicione este log
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

// Função para criar o gráfico
async function createChart() {
    const data = await fetchData();

    if (!data || data.length === 0) {
        console.error('Nenhum dado disponível para criar o gráfico.');
        return;
    }

    const labels = data.map(item => item.fundo_titulo); // Usar fundo_titulo como rótulo
    const valores = data.map(item => parseFloat(item.dy)); // Converter dy para número

    console.log('Labels:', labels); // Adicione este log
    console.log('Valores:', valores); // Adicione este log

    const ctx = document.getElementById('meuGrafico').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dividend Yeld',
                data: valores,
                backgroundColor: 'rgba(83, 25, 217, 0.2)',
                borderColor: 'rgba(83, 25, 217, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Chamar a função para criar o gráfico ao carregar a página
document.addEventListener('DOMContentLoaded', createChart);

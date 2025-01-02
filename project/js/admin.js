// Configuração dos gráficos
document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Atividade de Clientes
    const clientActivityCtx = document.getElementById('clientActivityChart').getContext('2d');
    new Chart(clientActivityCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Clientes Ativos',
                data: [150, 165, 175, 172, 182, 195],
                borderColor: '#2196f3',
                tension: 0.4,
                fill: false
            }, {
                label: 'Clientes Temporários',
                data: [50, 55, 58, 61, 63, 60],
                borderColor: '#ff9800',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Distribuição de Clientes
    const clientDistributionCtx = document.getElementById('clientDistributionChart').getContext('2d');
    new Chart(clientDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Ativos', 'Temporários', 'Inativos'],
            datasets: [{
                data: [182, 63, 53],
                backgroundColor: [
                    '#4caf50',
                    '#ff9800',
                    '#f44336'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Buscar número de sessões ativas da API
    fetchActiveSessions();
});

// Função para buscar número de sessões ativas da API
function fetchActiveSessions() {
    fetch('http://localhost:5000/api/active-sessions')
        .then(response => response.json())
        .then(data => {
            const activeSessions = document.getElementById('activeSessions');
            activeSessions.textContent = data.active_sessions;
        })
        .catch(error => {
            console.error('Erro ao buscar número de sessões ativas:', error);
        });
}

// Função para atualizar estatísticas aleatoriamente
function updateRandomStats() {
    const activeSessions = document.getElementById('activeSessions');
    const currentValue = parseInt(activeSessions.textContent);
    const change = Math.floor(Math.random() * 11) - 5; // Variação de -5 a +5
    activeSessions.textContent = Math.max(0, currentValue + change);

    // Adicionar nova atividade aleatória
    const activities = [
        { icon: 'user-plus', text: 'Novo cliente cadastrado' },
        { icon: 'wifi', text: 'Nova sessão iniciada' },
        { icon: 'user-minus', text: 'Sessão expirada' }
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    const activityList = document.querySelector('.activity-list');
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <i class="fas fa-${randomActivity.icon}"></i>
        <div class="activity-info">
            <p>${randomActivity.text}</p>
            <span>Agora mesmo</span>
        </div>
    `;

    activityList.insertBefore(newActivity, activityList.firstChild);
    if (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Função para formatar números
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
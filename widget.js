(function() {
    // Конфигурация виджета
    const config = {
        funnelId: 12345,
        successStatuses: [142, 143],
        styles: {
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#2e7d32',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
        }
    };

    const widgetContainer = document.createElement('div');
    Object.assign(widgetContainer.style, config.styles);
    widgetContainer.textContent = 'Загрузка...';
    document.body.appendChild(widgetContainer);

    async function getLeadsData() {
        try {
            const response = await fetch(`/api/v4/leads?with=statuses&filter[pipeline_id]=${config.funnelId}`);
            if (!response.ok) throw new Error('Ошибка при получении данных');
            const data = await response.json();
            return data._embedded.leads;
        } catch (error) {
            console.error('Ошибка:', error);
            widgetContainer.textContent = 'Ошибка';
            return null;
        }
    }

    function calculateConversion(leads) {
        const totalLeads = leads.length;
        if (totalLeads === 0) return 0;
        const successfulLeads = leads.filter(lead => 
            config.successStatuses.includes(lead.status_id)
        ).length;
        return (successfulLeads / totalLeads * 100).toFixed(1);
    }

    async function init() {
        const leads = await getLeadsData();
        if (leads) {
            const conversionRate = calculateConversion(leads);
            widgetContainer.textContent = `${conversionRate}%`;
        }
    }

    init();
    setInterval(init, 5 * 60 * 1000);
})();

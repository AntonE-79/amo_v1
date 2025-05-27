(function() {
    // Конфигурация виджета
    const config = {
        // ID воронки, которую нужно анализировать
        funnelId: 12345, // Замените на ID вашей воронки
        
        // ID статусов, которые считаются успешными
        successStatuses: [142, 143], // Замените на ID ваших успешных статусов
        
        // Стили для отображения
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

    // Создаем контейнер для виджета
    const widgetContainer = document.createElement('div');
    Object.assign(widgetContainer.style, config.styles);
    widgetContainer.textContent = 'Загрузка...';
    document.body.appendChild(widgetContainer);

    // Функция для получения данных о сделках
    async function getLeadsData() {
        try {
            // Используем API AMO CRM для получения сделок в указанной воронке
            const response = await fetch(`/api/v4/leads?with=statuses&filter[pipeline_id]=${config.funnelId}`);
            
            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }
            
            const data = await response.json();
            return data._embedded.leads;
        } catch (error) {
            console.error('Ошибка:', error);
            widgetContainer.textContent = 'Ошибка';
            return null;
        }
    }

    // Функция для расчета конверсии
    function calculateConversion(leads) {
        const totalLeads = leads.length;
        if (totalLeads === 0) return 0;
        
        const successfulLeads = leads.filter(lead => 
            config.successStatuses.includes(lead.status_id)
        ).length;
        
        return (successfulLeads / totalLeads * 100).toFixed(1);
    }

    // Основная функция инициализации
    async function init() {
        const leads = await getLeadsData();
        if (leads) {
            const conversionRate = calculateConversion(leads);
            widgetContainer.textContent = `${conversionRate}%`;
        }
    }

    // Запускаем виджет
    init();
    
    // Обновляем данные каждые 5 минут
    setInterval(init, 5 * 60 * 1000);
})();

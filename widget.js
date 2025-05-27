(function() {
    // Создаем контейнер для виджета
    const widgetContainer = document.createElement('div');
    
    // Настраиваем стили для текста
    Object.assign(widgetContainer.style, {
        fontSize: '24px',
        fontWeight: 'normal',
        color: '#ffffff',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif'
    });
    
    // Устанавливаем текст
    widgetContainer.textContent = 'Расчетное поле';
    
    // Добавляем виджет на страницу
    document.body.appendChild(widgetContainer);
})();

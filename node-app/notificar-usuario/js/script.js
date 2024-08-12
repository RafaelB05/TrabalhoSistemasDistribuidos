document.addEventListener('DOMContentLoaded', function () {
    const notificationOptions = document.querySelectorAll('input[name="notificacao"]');
    const dynamicField = document.getElementById('dynamicField');
    const dynamicLabel = document.getElementById('dynamicLabel');
    const dynamicInput = document.getElementById('dynamicInput');
    const ifundoForm = document.getElementById('ifundoForm');

    notificationOptions.forEach(option => {
        option.addEventListener('change', function () {
            dynamicField.classList.remove('hidden');
            switch (this.value) {
                case 'telegram':
                    dynamicLabel.textContent = 'Digite seu ID do Telegram:';
                    dynamicInput.setAttribute('placeholder', 'ID do Telegram');
                    dynamicInput.setAttribute('type','text')
                    break;
                case 'email':
                    dynamicLabel.textContent = 'Digite seu Email:';
                    dynamicInput.setAttribute('placeholder', 'Email');
                    dynamicInput.setAttribute('type','email')
                    break;
                case 'sms':
                    dynamicLabel.textContent = 'Digite seu número de celular:';
                    dynamicInput.setAttribute('placeholder', 'Número de celular');
                    dynamicInput.setAttribute('type','text')
                    break;
            }
        });
    });

    ifundoForm.addEventListener('submit', function(event) {
        const fundos = document.querySelectorAll('input[name="fundos"]:checked');
        if (fundos.length === 0) {
            alert('Por favor, selecione pelo menos um fundo.');
            event.preventDefault();
        }
    });
});

function clearDynamicField() {
    const dynamicField = document.getElementById('dynamicField');
    dynamicField.classList.add('hidden');
    const dynamicInput = document.getElementById('dynamicInput');
    dynamicInput.value = '';
    const notificationOptions = document.querySelectorAll('input[name="notificacao"]');
    notificationOptions.forEach(option => {
        option.checked = false;
    });
}
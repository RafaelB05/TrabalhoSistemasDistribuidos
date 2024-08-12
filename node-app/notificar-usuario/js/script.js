
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);  

    const data = {
        variacao: formData.get("variacao"),
        fundos: formData.getAll("fundos"),
        notificacao: formData.get("notificacao"),
        dynamicInput: formData.get("dynamicInput")
    };

    try {
        const response = await fetch("/api/v1/notify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Notificação enviada com sucesso!");
        } else {
            alert("Erro ao enviar notificação.");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao enviar notificação.");
    }
}

function handleNotificationChange(event) {
    const dynamicField = document.getElementById("dynamicField");
    const dynamicLabel = document.getElementById("dynamicLabel");
    const dynamicInput = document.getElementById("dynamicInput");

    dynamicField.classList.remove("hidden");
    if (event.target.value === "email") {
        dynamicLabel.textContent = "Digite seu Email:";
        dynamicInput.setAttribute("placeholder", "Email");
    } else if (event.target.value === " ") {
        dynamicField.classList.add("hidden")
    }
}

function clearDynamicField() {
    const dynamicField = document.getElementById("dynamicField");
    dynamicField.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('input[name="notificacao"]').forEach(radio => {
        radio.addEventListener("change", handleNotificationChange);
    });
});
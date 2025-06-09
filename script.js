async function enviarLink() {
  const driveLink = document.getElementById("driveLink").value;
  const status = document.getElementById("status");
  const downloadSection = document.getElementById("downloadSection");
  const downloadLink = document.getElementById("downloadLink");

  status.textContent = "Processando...";
  downloadSection.style.display = "none";

  try {
    const response = await fetch("https://n8n.faculdademaratlantico.com.br/webhook/upload-transcricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driveLink })
    });

    const data = await response.json();

    if (data && data.fileUrl) {
      downloadLink.href = data.fileUrl;
      downloadSection.style.display = "block";
      status.textContent = "Apostila pronta!";
    } else {
      status.textContent = "Erro ao gerar a apostila.";
    }
  } catch (error) {
    status.textContent = "Erro na requisição.";
    console.error(error);
  }
}
atualiza script com webhook da FMA

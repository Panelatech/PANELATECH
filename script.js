function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function calculateAmortization() {
    let principal = 100000;  // Capital prestado (ejemplo)
    let annualRate = 0.1;    // Tasa de interés anual (ejemplo)
    let years = 5;           // Duración del préstamo en años (ejemplo)

    let monthlyRate = annualRate / 12;
    let numPayments = years * 12;
    let monthlyPayment = (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -numPayments);

    let amortizationSchedule = [];
    for (let n = 1; n <= numPayments; n++) {
        let interestPayment = principal * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        principal -= principalPayment;
        amortizationSchedule.push([n, monthlyPayment, interestPayment, principalPayment, principal]);
    }

    console.log(amortizationSchedule);  // Imprimir en consola (puedes adaptarlo para exportar a Excel si es necesario)

    // Simular la creación de un archivo Excel
    let amortizationLink = document.getElementById("amortization-link");
    amortizationLink.style.display = "block";
}

async function loadNFTs() {
    const nftGallery = document.getElementById('nft-gallery');
    const nftMetadataUrl = 'https://gateway.pinata.cloud/ipfs/QmcAMBhUdWHKsFuBgXASSxqjLiCFAk2G66Y4LpkESU6sWg';  // URL de la metadata del NFT
    try {
        const response = await fetch(nftMetadataUrl);
        if (!response.ok) {
            throw new Error(`Error fetching metadata: ${response.statusText}`);
        }
        const metadata = await response.json();
        const nftElement = document.createElement('div');
        nftElement.className = 'nft';
        nftElement.innerHTML = `
            <h3>${metadata.name}</h3>
            <img src="${metadata.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')}" alt="${metadata.name}">
            <p>${metadata.description}</p>
        `;
        nftGallery.appendChild(nftElement);
    } catch (error) {
        console.error("Failed to load NFTs:", error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadNFTs();
});

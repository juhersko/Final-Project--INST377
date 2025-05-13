const API_KEY = "d229cab2-5da9-4342-8673-8e5307f88801";

async function searchPlayer() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const first = input.split(" ")[0];
  const last = input.split(" ")[1];

  const resultDiv = document.getElementById('player-info');
  resultDiv.innerHTML = "Loading...";

  console.log("Player name:", first, last);

  try {
    const response = await fetch(`https://api.balldontlie.io/v1/players?first_name=${first}&last_name=${last}`, {
      headers: { 'Authorization': API_KEY }
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const data = await response.json();
    console.log("Response:", data);
    console.log("API results:", data.data);

    const player = data.data.find(p =>
      p.first_name.toLowerCase() === first && p.last_name.toLowerCase() === last
    );

    if (!player) {
      resultDiv.innerHTML = "Player not found.";
      return;
    }

    resultDiv.innerHTML = `
      <h3>${player.first_name} ${player.last_name}</h3>
      <p><strong>Team:</strong> ${player.team.full_name}</p>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Height:</strong> ${player.height_feet}</p>
      <p><strong>Weight:</strong> ${player.weight_pounds} lbs</p>
      <p><strong>Jersey Number:</strong> ${player.jersey_number}</p>
      <p><strong>Draft Year:</strong> ${player.draft_year}</p>

    `;

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "Error fetching player data.";
  }
}

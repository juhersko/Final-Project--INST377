async function fetchNBATeams() {
    const loading = document.getElementById('teams-loading');
    const errorDiv = document.getElementById('teams-error');
    const content = document.getElementById('teams-content');
    const infoDisplay = document.getElementById('team-info-display');
    const apiKey = 'd229cab2-5da9-4342-8673-8e5307f88801';
  
    try {
      const response = await fetch('https://api.balldontlie.io/v1/teams', {
        headers: { 'Authorization': apiKey }
      });
  
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
  
      if (!data.data || data.data.length === 0) throw new Error('No teams found');
  
      if (content) {
        content.innerHTML = data.data.map(team => `
          <button class="team-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-2 rounded"
                  data-team='${JSON.stringify(team)}'>
            ${team.full_name}
          </button>
        `).join('');
      }
  
      document.querySelectorAll('.team-button').forEach(button => {
        button.addEventListener('click', () => {
          const team = JSON.parse(button.dataset.team);
          if (infoDisplay) {
            infoDisplay.innerHTML = `
              <div class="bg-white p-6 rounded-lg shadow-md mt-4">
                <h3 class="font-bold text-lg">${team.full_name}</h3>
                <p>City: ${team.city}</p>
                <p>Conference: ${team.conference}</p>
                <p>Division: ${team.division}</p>
              </div>
            `;
          }
        });
      });
  
    } catch (error) {
      if (errorDiv) {
        errorDiv.textContent = 'Something went wrong while loading NBA teams.';
        errorDiv.classList.remove('hidden');
      }
    } finally {
      if (loading) {
        loading.classList.add('hidden');
      }
    }
  }
      // function showTeamInfo(team) {
      //   const infoDisplay = document.getElementById('team-info-display');
      //   if (infoDisplay && team) {
      //     infoDisplay.innerHTML = `
      //       <div class="bg-white p-6 rounded-lg shadow-md mt-4">
      //         <h3 class="font-bold text-lg">${team.full_name}</h3>
      //         <p>City: ${team.city}</p>
      //         <p>Conference: ${team.conference}</p>
      //         <p>Division: ${team.division}</p>
      //       </div>
      //     `;
      //   }
      // }
    
      fetchNBATeams();

  
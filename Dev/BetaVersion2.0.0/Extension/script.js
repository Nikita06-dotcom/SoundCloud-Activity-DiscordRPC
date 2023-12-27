fetch('http://localhost:5000/request_response')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Received number from the server:", data);
    var ID = data


    var manifest = chrome.runtime.getManifest();
    const Inf = `${manifest.name} | ${manifest.version} | ${ID}`

    let previousTrackUrl = null;
    let isCurrentlyPlaying = null;

    function sendMessageToServer(data) {
      fetch('http://localhost:5000/send', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Ошибка:', error));
    }

    function handleMutation(mutations) {
      mutations.forEach(mutation => {
        // Ссылка на трек
        const avatarElement = document.querySelector('.playbackSoundBadge__avatar');
        const trackUrl = avatarElement ? avatarElement.getAttribute('href') : '';

        // Плей / Пауза
        const playButton = document.querySelector('.playControls__play').classList;
        const playButtonArray = Array.from(playButton);
        const playStatus = playButtonArray.length == 4 ? 'Pause' : 'Play'

        // Выполняется при переключении трека (смена ссылки на трек)
        if (previousTrackUrl != trackUrl) {
          
          // Название трека
          const trackNameElement = document.querySelector('.playControls__soundBadge.sc-ml-3x .sc-visuallyhidden');
          const trackName = trackNameElement ? trackNameElement.textContent.slice(15) : 'Unknown Track';

          // Исполнитель
          const artistElement = document.querySelector('.playbackSoundBadge__titleContextContainer .playbackSoundBadge__lightLink.sc-link-light.sc-link-secondary.sc-truncate.sc-text-h5');
          const artistName = artistElement ? artistElement.textContent : 'Unknown Artist';

          // Обложка
          const artworkElement = document.querySelector('.sc-artwork.sc-artwork-4x.image__full.g-opacity-transition');
          const imageUrl = artworkElement ? artworkElement.style.backgroundImage.slice(5, -2).replace(/120/g, '500') : 'No Image';

          // Ссылка на трек
          previousTrackUrl = trackUrl

          // Плей / Пауза
          isCurrentlyPlaying = playStatus

          console.log(`${Inf}
          Track Name: ${trackName}
          Artist: ${artistName}
          Image URL: ${imageUrl}
          Track Link: https://soundcloud.com${trackUrl}
          Play control: ${playStatus}
          `);

          data = {
            ID: ID,
            TrackName: trackName,
            Artist: artistName,
            ImageURL: imageUrl,
            TrackLink: `https://soundcloud.com${trackUrl}`,
            PlayControl: playStatus
          };
          sendMessageToServer(data)
        }

        // Выполняется при нажатиии на кнопку Плей/Пауза
        if (isCurrentlyPlaying != playStatus) {
          isCurrentlyPlaying = playStatus
          console.log(`${Inf}
          Play control: ${playStatus}
          `);

          data = {
            ID: ID,
            PlayControl: playStatus
          };
          sendMessageToServer(data)
        }
      });
    }

    function setupObserver() {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };

      const observer = new MutationObserver(handleMutation);
      observer.observe(targetNode, config);
    }

    setupObserver();
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
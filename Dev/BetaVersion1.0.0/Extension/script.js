// Переменные для хранения предыдущих данных
let previousArtist = null;
let previousTrackName = null;
let isCurrentlyPlaying = null;
let hasAlreadyDisplayedPlayingMessage = false;

let previousImageUrl = null;

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

function replaceAndLogChangingString(imageUrl) {
  const replacedImageUrl = imageUrl.replace(/120/g, '500');
  sendMessageToServer({ imageUrl: replacedImageUrl });
  console.log("Ссылка на обложку:", replacedImageUrl);
}

function handleMutation(mutations) {
  mutations.forEach(mutation => {
    const playControl = document.querySelector('.playControl');
    const visuallyHiddenSpans = document.querySelectorAll('.sc-visuallyhidden');
    const links = document.querySelectorAll('.playbackSoundBadge__lightLink');

    if (playControl) {
      const isPlaying = playControl.classList.contains('playing');

      if (isPlaying !== isCurrentlyPlaying || isPlaying) {
        visuallyHiddenSpans.forEach(span => {
          if (span.textContent.trim().startsWith('Current track:')) {
            const textAfterComma = span.textContent.trim().substring('Current track:'.length).trim();
            if (textAfterComma !== previousArtist) {
              sendMessageToServer({ trackName: textAfterComma });
              console.log('Название трека:', textAfterComma);
              previousArtist = textAfterComma;
            }
          }
        });

        links.forEach(link => {
          const linkText = link.textContent.trim();
          if (linkText !== previousTrackName) {
            sendMessageToServer({ artist: linkText });
            console.log('Исполнитель:', linkText);
            previousTrackName = linkText;

            const element = document.querySelector('.playbackSoundBadge__avatar.sc-media-image.sc-mr-2x');
            if (element) {
              const trackUrl = 'https://soundcloud.com' + element.getAttribute('href');
              sendMessageToServer({ trackUrl: trackUrl })
              console.log('Ссылка на трек:', trackUrl);
            } else {
              console.log('Элемент не найден.');
            }            

            // Вызываем функцию для замены и вывода ссылки на изображение
            findAndLogChangingString();
          }
        });

        if (!isPlaying) {
          sendMessageToServer({ PlayControl1: false });
          console.log('Пауза');
          hasAlreadyDisplayedPlayingMessage = false; // Сбрасываем флаг, если проигрывание остановлено
        } else if (isPlaying && previousTrackName === previousTrackName && !hasAlreadyDisplayedPlayingMessage) {
          sendMessageToServer({ PlayControl1: true });
          console.log('Играет');
          hasAlreadyDisplayedPlayingMessage = true; // Устанавливаем флаг, чтобы сообщение вывелось только один раз
        }

        isCurrentlyPlaying = isPlaying;
      }
    }
  });
}

function findAndLogChangingString() {
  const spanElements = document.querySelectorAll('.image span');

  if (spanElements.length > 0) {
    for (let i = spanElements.length - 1; i >= 0; i--) {
      const spanElement = spanElements[i];
      const backgroundImageStyle = spanElement.style.backgroundImage;
      const imageUrlMatches = backgroundImageStyle.match(/url\("([^"]+)"\)/);

      if (imageUrlMatches && imageUrlMatches.length > 1) {
        const imageUrl = imageUrlMatches[1];
        
        if (imageUrl !== previousImageUrl) {
          replaceAndLogChangingString(imageUrl);
          previousImageUrl = imageUrl;
        }
        break;
      } else {
        console.log("URL изображения не найден.");
      }
    }
  } else {
    console.log("Элементы с изображениями не найдены.");
  }
}

// Вызываем функцию для настройки наблюдателя изменений
function setupObserver() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(handleMutation);
  observer.observe(targetNode, config);
}

// Вызываем функцию для настройки наблюдателя изменений
setupObserver();
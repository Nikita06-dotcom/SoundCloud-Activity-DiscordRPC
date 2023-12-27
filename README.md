[//]: # (Сайт для форматирования: https://dillinger.io/ и https://gist.github.com/Jekins/2bf2d0638163f1294637)

![Итог проекта на момент 22.12.2023](https://cdn.discordapp.com/attachments/888178520981909555/1187869237293883392/1.png)
###### Промежуточный итог проекта на 22.12.2023 (BetaVersion1.0.0) / Interim project outcome on 22.12.2023 (BetaVersion1.0.0)

<blockquote>
<p class="has-line-data" data-line-start="0" data-line-end="10">Обновление бета-версии | 2.0.0:<br>
ㅤ<br>
— Полностью переписан код для обоих приложений (расширение и сервер).<br>
— Логика и поиск сообщений в расширении переписаны.<br>
— Повышена оптимизация работы приложений.<br>
ㅤ<br>
Новые функции:<br>
— Теперь сервер имеет возможность определить, из какой вкладки проигрывается музыка. Каждая вкладка теперь имеет свой уникальный идентификатор.<br>
— Время проигрывания определенного трека на вкладке теперь сохраняется. При паузе счетчик времени не сбрасывается, а продолжает общий подсчёт игры данного трека.<br>
— Запоминается время только для трека, который активен на текущей вкладке. Другие вкладки имеют свои счетчики, которые сохраняют время до паузы.</p>
</blockquote>
<blockquote>
<p class="has-line-data" data-line-start="11" data-line-end="21">Beta Version Update | 2.0.0:<br>
ㅤ<br>
— The code for both the extension and server has been completely rewritten.<br>
— The logic and message search in the extension have been rewritten.<br>
— Optimization of the application’s performance has been improved.<br>
ㅤ<br>
New features:<br>
— The server now has the ability to determine which tab is playing music. Each tab now has its own unique identifier.<br>
— The playback time of a specific track on a tab is now saved. When paused, the time counter is not reset but continues counting for the active track on the current tab. Only the time for the track active on the current tab is remembered. Other tabs have their own counters that save the time until the pause.<br>
28.12.23</p>
<hr>
</blockquote>

<blockquote>
<p class="has-line-data" data-line-start="0" data-line-end="4">Проект находится в ранней стадии разработки и требует проведения множества оптимизаций. Желательно полностью переписать код, поскольку в его текущем состоянии он был написан неэффективно и в спешке, чтобы лишь обеспечить его функциональность.<br>
ㅤ<br>
The project is in its early development stages and requires numerous optimizations. It is advisable to completely rewrite the code since, in its current state, it was written inefficiently and hastily just to ensure its functionality.<br>
25.12.2023</p>
</blockquote>

# Название проекта: Отображение музыкальной активности SoundCloud в Discord с использованием Discord RPC

## Описание проекта:
Проект "Отображение музыкальной активности SoundCloud в Discord с использованием Discord RPC" представляет собой комбинированное приложение, состоящее из расширения для браузера и серверной части. Расширение получает данные о текущем треке с веб-сайта SoundCloud.com и передает их на локальный сервер. Затем сервер использует Discord Rich Presence (RPC) для отображения информации о проигрываемом треке в Discord. Приложение позволяет пользователям видеть, что слушают их друзья на SoundCloud.com, и присоединяться к прослушиванию текущего трека.

## Функциональность проекта:
- Расширение для браузера, написанное на языке JavaScript, которое получает данные о треке с веб-сайта SoundCloud.com, такие как название, исполнитель, длительность, обложка
- Локальный сервер, написанный на языке программирования Python, который принимает данные от расширения и использует Discord RPC для отображения информации о треке в Discord.

## Технологии:
Для реализации проекта используются следующие технологии:
- Расширение для браузера: JavaScript.
- Серверная часть: Python.
- Взаимодействие с Discord: Discord Rich Presence (RPC).

## План разработки:
Разработка проекта будет выполняться в следующем порядке:
1. Написание расширения для браузера на языке JavaScript, которое будет получать данные о треке с веб-сайта SoundCloud.com.
2. Разработка локального сервера на языке программирования Python, который будет принимать данные от расширения и использовать Discord RPC для отображения информации о треке в Discord.
3. Тестирование и отладка проекта.
---
# Project Title: Displaying SoundCloud Music Activity in Discord Using Discord RPC

## Project Description:
The "Displaying SoundCloud Music Activity in Discord Using Discord RPC" project is a combined application consisting of a browser extension and a server-side component. The extension retrieves data about the current track from the SoundCloud.com website and sends it to a local server. The server then uses Discord Rich Presence (RPC) to display information about the playing track in Discord. The application allows users to see what their friends are listening to on SoundCloud.com and join in listening to the current track.

## Project Functionality:
- A browser extension written in JavaScript that retrieves track data from the SoundCloud.com website, such as title, artist, duration, and cover art.
- A local server written in Python that receives data from the extension and uses Discord RPC to display track information in Discord.

## Technologies:
The following technologies are used to implement the project:
- Browser extension: JavaScript.
- Server-side: Python.
- Interaction with Discord: Discord Rich Presence (RPC).

## Development Plan:
The project development will be carried out in the following order:
1. Writing a browser extension in JavaScript that retrieves track data from the SoundCloud.com website.
2. Developing a local server in Python that receives data from the extension and uses Discord RPC to display track information in Discord.
3. Testing and debugging the project.

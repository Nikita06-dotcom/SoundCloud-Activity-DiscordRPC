from flask import Flask, request, jsonify
import threading
from pypresence import Presence
import time

client_id = '1187368303052726323'
RPC = Presence(client_id)
RPC.connect()

app = Flask(__name__)

# Добавляем декоратор для обработки CORS (Cross-Origin Resource Sharing)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

# Переменные для хранения значений
current_artist = ""
current_track_name = ""
current_image_url = ""
current_track_url = ""
is_playing = False

# Мьютекс для синхронизации доступа к переменным из разных потоков
data_lock = threading.Lock()

def send_data():
    global current_artist, current_track_name, current_image_url, current_track_url, is_playing
    with data_lock:
        print("Отправка данных:")
        print("Исполнитель:", current_artist)
        print("Название трека:", current_track_name)
        print("Ссылка на обложку:", current_image_url)
        print("Ссылка на трек:", current_track_url)
        print("Статус воспроизведения:", is_playing)
        # Отправка данных на клиент

        button = [{
            "label": "Слушать",
            "url": current_track_url,
        }]

        if is_playing:
            RPC.update(start=time.time(),
                       buttons= button,
                       state=current_artist,
                       details=current_track_name,
                       large_image=current_image_url,
                       large_text=f"{current_artist} — {current_track_name}")
        else:
            RPC.update(state=current_artist,
                       buttons=button,
                       details=current_track_name,
                       large_image=current_image_url,
                       large_text="Пауза")

def receive_data_callback(data):
    global current_artist, current_track_name, current_image_url, current_track_url, is_playing
    with data_lock:
        # Обновляем значения переменных только если данные не пустые
        current_artist = data.get('artist', current_artist)
        current_track_name = data.get('trackName', current_track_name)
        current_image_url = data.get('imageUrl', current_image_url)
        current_track_url = data.get('trackUrl', current_track_url)
        is_playing = data.get('PlayControl1', is_playing)

        # Запускаем таймер для отправки данных через 3 секунды

        threading.Timer(3, send_data).start()

@app.route('/send', methods=['POST'])
def receive_data():
    data = request.get_json()

    # Проверяем, что данные не пустые, прежде чем вызывать функцию обратного вызова
    if data:
        # Вызываем функцию обратного вызова после получения сообщения
        receive_data_callback(data)

        # Возвращаем подтверждение
        return jsonify({'message': 'Данные успешно получены на сервере!'})
    else:
        return jsonify({'message': 'Пустые данные!'})

if __name__ == '__main__':
    # Запускаем сервер на порту 5000
    app.run(port=5000)
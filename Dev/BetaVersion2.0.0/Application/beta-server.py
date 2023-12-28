from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from pypresence import Presence
import time

client_id = '1187368303052726323'
RPC = Presence(client_id)
RPC.connect()

app = Flask(__name__)
CORS(app)

ID = 0
@app.route('/request_response', methods=['GET'])
def request_response():
    global ID
    try:
        response_data = ID
        ID += 1
        return jsonify(response_data)
    except Exception as e:
        print("Error processing request:", str(e))
        return {"status": "error", "message": str(e)}

@app.route('/send', methods=['POST'])
def receive_message():
    try:
        data = request.get_json()
        add_track_to_playlist(data)
        return {"status": "success"}
    except Exception as e:
        print("Error processing message:", str(e))
        return {"status": "error"}

music_tracks = []
time_traks = []
ID_now = 0
PlayControl_old = ''
Link_old = ''

def add_track_to_playlist(data):
    global music_tracks, time_traks, ID, ID_now, PlayControl_old, Link_old

    def RequestDataDisplay(ID_old):
        global music_tracks, ID_now, PlayControl_old, Link_old
        if ID_old != ID_now or PlayControl_old != music_tracks[ID_now]['PlayControl'] or Link_old != music_tracks[ID_now]['TrackLink']:
            DiscordInfoDisplay(ID_now)
            PlayControl_old = data.get('PlayControl')
            Link_old = music_tracks[ID_now]['TrackLink']

    try:
        ID_old = ID_now
        if ID > 0 and data.get('PlayControl') == "Play":
            ID_now = data.get('ID')

        if len(music_tracks) - 1 < data.get('ID'):
            music_tracks.append(data)
            time_traks.append([float(0), float(0), music_tracks[data.get('ID')]['TrackLink']])
        else:
            music_tracks[data.get('ID')].update(data)
            if time_traks[data.get('ID')][2] != music_tracks[data.get('ID')]['TrackLink']:
                time_traks[data.get('ID')] = [float(0), float(0), music_tracks[data.get('ID')]['TrackLink']]
            if music_tracks[data.get('ID')]['PlayControl'] == "Play":
                RequestDataDisplay(ID_old)
                time_traks[ID_now][0] = time.time()
            if music_tracks[data.get('ID')]['PlayControl'] == "Pause":
                time_traks[data.get('ID')][1] += time.time() - time_traks[data.get('ID')][0]

        RequestDataDisplay(ID_old)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")

def DiscordInfoDisplay(id):
    global music_tracks, time_traks
    inf = music_tracks[id]
    button = [{
        "label": "Слушать",
        "url": inf['TrackLink'],
    }]

    time_start = time.time()
    if time.time() - time_traks[id][1] > 1:
        time_start -= time_traks[id][1]

    if music_tracks[id]['PlayControl'] == "Play":
        RPC.update(start = time_start,
                   buttons = button,
                   state = inf['Artist'] + 'ㅤ',
                   details= inf['TrackName'] + 'ㅤ',
                   large_image = inf['ImageURL'],
                   large_text=f"{inf['Artist']} — {inf['TrackName']}")
    else:
        RPC.update(state = inf['Artist'] + 'ㅤ',
                   buttons = button,
                   details= inf['TrackName'] + 'ㅤ',
                   large_image = inf['ImageURL'],
                   large_text="Пауза")

if __name__ == '__main__':
    app.run(port=5000)

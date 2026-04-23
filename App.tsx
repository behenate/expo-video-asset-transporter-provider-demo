import { StatusBar } from 'expo-status-bar';
import { useEvent } from 'expo';
import { VideoSource, VideoView, useVideoPlayer } from 'expo-video';
import 'expo-video-dash-support-module';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const dashUri = 'https://expo-test-media.com/tos_dash/manifest.mpd';

const dashSource: VideoSource = {
  uri: dashUri,
  metadata: {
    title: 'Tears Of Steel',
    artist: 'Blender Foundation',
    artwork: 'https://expo-test-media.com/tos_dash/artwork.jpg',
  },
};

export default function App() {
  const player = useVideoPlayer(dashSource, (player) => {
    player.loop = true;
    player.play();
  });
  const { status } = useEvent(player, 'statusChange', { status: player.status });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo-video DASH extension demo</Text>
      <Text style={styles.source}>{dashUri}</Text>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls
        fullscreenOptions={{ enable: true }}
      />
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={() => player.play()}>
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => player.pause()}>
          <Text style={styles.buttonText}>Pause</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            player.currentTime = 0;
            player.play();
          }}>
          <Text style={styles.buttonText}>Restart</Text>
        </Pressable>
      </View>
      <Text style={styles.status}>Status: {status}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  source: {
    color: '#475569',
    fontSize: 13,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#020617',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  status: {
    color: '#334155',
  },
});

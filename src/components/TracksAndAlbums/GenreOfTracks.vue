<template>
    <div class="tracks">
        <h2 class="tracks__title">Genre of Tracks</h2>
        <div class="tracks__body">
            <div class="track" 
            v-for="track in $store.state.genre.tracks"
            :key="track"
            :class="[
                {playing: $store.state.player.playlist.length > 0 
                && $store.state.player.currentTrack.id === track.id
                && $store.state.player.isPlaying},
                
                {paused: $store.state.player.playlist.length > 0 
                && $store.state.player.currentTrack.id === track.id
                && !$store.state.player.isPlaying}
            ]">
                <div class="track__play">
                    <div class="track__img">
                        <img :src="track.song_poster" alt="Song Poster">
                        <div class="track__controls controls">
                        <button class="controls__more">
                            <more-button />
                        </button>
                        <button class="controls__play">
                            <play-button @click="$store.dispatch('player/addUserATrackToPlayList', {track})" />
                        </button>
                        <button class="controls__pause">
                            <pause-button @click="$store.dispatch('player/setPause', false)" />
                        </button>
                        </div>
                    </div>
                    <div class="track__info">
                        <div class="track__name">
                        {{ track.name }}
                        </div>
                        <div class="track__author">
                        {{ track.track_author }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayButton from '@/components/Controls/PlayButton.vue';
import PauseButton from '@/components/Controls/PauseButton.vue';
import MoreButton from '@/components/Controls/MoreButton.vue';

export default {
    components: {
        PlayButton,
        PauseButton,
        MoreButton,
    },
    setup() {

        return {
        }
    }
}
</script>

<style lang="scss" scoped>
@import './track-styles.scss';
</style>
"use client"
import { useEffect, useRef, useState } from 'react';
import {
  FaBackward,
  FaForward,
  FaMusic,
  FaPause,
  FaPlay,
} from 'react-icons/fa';
import { iRadio } from '../interfaces';
import getData from '../utils/getData';
import getRandomInt from '../utils/getRandomInt.js';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [radioCode, setRadioCode] = useState('');
  const [radioSrc, setRadioSrc] = useState('');
  const [radioImg, setRadioImg] = useState('https://cdn.awsli.com.br/2775/2775576/arquivos/google_merchant.png');
  const [radioName, setRadioName] = useState('');
  const [radioPlayedNames, setRadioPlayedNames] = useState<string[]>([]);
  const [radioStations, setRadioStations] = useState<iRadio[]>([])
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const radioSwitcher = useRef<HTMLAudioElement | null>(null);
  const radioPlayerImg = useRef(null);

  const radioPlayerPause = () => {
    const iframe = iframeRef.current;
    iframe?.contentWindow?.postMessage(
      '{"event":"command", "func":"pauseVideo", "args":""}',
      '*'
    );
    setIsPlaying(false);
    setIsPaused(true);
  };

  const radioPlayerPlay = () => {
    const iframe = iframeRef.current;
    iframe?.contentWindow?.postMessage(
      '{"event":"command", "func":"playVideo", "args":""}',
      '*'
    );

    setIsPlaying(true);
    setIsPaused(false);
  };

  const radioPlayerInit = (index = getRandomInt(radioStations.length - 1)) => {
    if (!radioStations.length) return
    
    const filteredSetList = radioStations.filter((item: iRadio) => {
      return item.name !== radioName;
    });
    
    const playingNow: iRadio =
    index > filteredSetList.length
    ? filteredSetList[index--]
    : filteredSetList[index];
    
    setRadioCode(playingNow?.code);
    setRadioName(playingNow.name);
    setRadioPlayedNames((prev: string[]) => {
      return [...prev, playingNow.name];
    });
  };

  const radioPlayNext = () => {
    radioPlayerInit();
    setIsPlaying(true);
    radioSwitcher?.current?.play();
  };

  const radioPlayPrev = () => {
    const newArray = radioPlayedNames.slice(0, -1);
    const lastSongName = newArray[newArray.length - 1];
    const index =
      newArray.length > 0
        ? radioStations.findIndex((item: iRadio) => item.name === lastSongName)
        : 0;
    const playingNow: iRadio = radioStations[index];
    radioSwitcher?.current?.play();

    setRadioCode(playingNow.path);
    setRadioName(playingNow.name);
    setRadioPlayedNames(newArray);
  };

  useEffect(() => {
    setRadioSrc(
      `https://www.youtube.com/embed/${radioCode}?autoplay=${Number(
        isPlaying
      )}&mute=0&controls=0&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=true&color=black&enablejsapi=1&widgetid=1`
    );
    setRadioImg(
      `https://i.ytimg.com/vi/${radioCode}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=`
    );
  }, [radioCode]);

  useEffect(() => {
    console.log("radioStations: ", radioStations)
    if (radioStations.length) {
      radioPlayerInit();
    }
  }, [radioStations]);

  useEffect(() => {
    if (radioCode) {
      window.parent.postMessage({ type: 'mostrarMensagem', path: radioCode }, '*');
    }
  }, [radioCode])

  useEffect(() => {
    window.parent.postMessage({ type: 'pausarDespausar', isPlaying: isPlaying, isPaused: isPaused }, '*');
  }, [isPaused, isPlaying])

  useEffect(() => {
    async function fetchStations() {
      try {
        const data = await getData();
        console.log("🚀 ~ fetchStations ~ data:", data)
        if (data) {
          setRadioStations(data);
        }
      } catch (err) {
        console.log("Erro ao carregar estações de rádio: ", err);
      } finally {
        console.log(false);
      }
    }

    fetchStations();
  }, []);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);


  useEffect(() => {
    function onYouTubeIframeAPIReady() {
      if (iframeRef.current) {
        const player = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                console.log("🎵 Vídeo terminou, tocando próxima rádio...");
                radioPlayNext();
              }
            }
          }
        });
      }
    }

    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
  }, [radioCode]);

  return (
    <div
      className={`showUp fixed left-2 bottom-2 z-30 radio_container ${isPlaying ? 'playing' : isPaused ? 'paused' : 'not_playing'
        }`}
    >
      <div
        className="playing_icon"
        onClick={() => {
          if (!isPlaying) {
            radioPlayerPlay();
          } else {
            console.log("Not Playing");
          }
        }}
      >

        <FaMusic />
        <div className="music_waves">
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
          <span className="stroke"></span>
        </div>
      </div>

      {
        radioSrc != '' && (
          <iframe
            width="560"
            height="315"
            id="radio-iframe"
            src={radioSrc}
            className="absolute opacity-0 pointer-events-none" 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            ref={iframeRef}
          ></iframe>
        )
      }
      
      <div className="img_play_container">
        <audio
          ref={radioSwitcher}
          style={{ display: 'none' }}
          controls
        >
          <source
            src="/assets/radio_switch_effect.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
        <div className="controls">
          <div
            className="prev_song"
            onClick={radioPlayPrev}
          >
            <FaBackward />
          </div>
          <div className="play_pause">
            {!isPaused ? (
              <FaPause
                className="fa-pause"
                onClick={radioPlayerPause}
              />
            ) : (
              <FaPlay
                className="fa-play"
                onClick={radioPlayerPlay}
              />
            )}
          </div>
          <div
            className="next_song"
            onClick={radioPlayNext}
          >
            <FaForward />
          </div>
        </div>

        <img
          loading="lazy"
          ref={radioPlayerImg}
          height={70}
          width={70}
          alt="Banner da radio"
          title="Banner da radio"
          src={radioImg}
        />

      </div>

      <div className="radio_container_text">
        <p>Now playing 📻</p>
        <div className="song_info">
          {radioName != '' && <span className="name">{radioName}</span>}
          {radioName == '' && (
            <div className="skeleton-item-text h-2.5 rounded-full w-24 mb-4"></div>
          )}
        </div>
      </div>

    </div>
  );
};

export default RadioPlayer;
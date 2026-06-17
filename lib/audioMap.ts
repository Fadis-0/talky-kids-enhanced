// Audio assets map for letters game
// Metro bundler requires static `require` calls - no dynamic paths allowed.
// Each key is an image ID from letters-game-data.ts.
// Audio files are .mp4 located in assets/audio/letters-game/.

export const audioMap: Record<string, any> = {
  // أ - Alif
  "alif-1": require("../assets/audio/letters-game/arnab.mp4"),
  "alif-2": require("../assets/audio/letters-game/dar.mp4"),
  "alif-3": require("../assets/audio/letters-game/ma.mp4"),

  // ب - Ba
  "ba-1": require("../assets/audio/letters-game/bab.mp4"),
  "ba-2": require("../assets/audio/letters-game/kebch.mp4"),
  "ba-3": require("../assets/audio/letters-game/hlib.mp4"),

  // ت - Ta
  "ta-1": require("../assets/audio/letters-game/tefah.mp4"),
  "ta-2": require("../assets/audio/letters-game/houta.mp4"),
  "ta-3": require("../assets/audio/letters-game/oil.mp4"),

  // ج - Jim
  "jim-1": require("../assets/audio/letters-game/jbal.mp4"),
  "jim-2": require("../assets/audio/letters-game/hajra.mp4"),
  "jim-3": require("../assets/audio/letters-game/telj.mp4"),

  // ح - Ha
  "ha-1": require("../assets/audio/letters-game/hsan.mp4"),
  "ha-2": require("../assets/audio/letters-game/sea.mp4"),
  "ha-3": require("../assets/audio/letters-game/meftah.mp4"),

  // خ - Kha
  "kha-1": require("../assets/audio/letters-game/khyar.mp4"),
  "kha-2": require("../assets/audio/letters-game/mkhada.mp4"),
  "kha-3": require("../assets/audio/letters-game/mokh.mp4"),

  // د - Dal
  "dal-1": require("../assets/audio/letters-game/djaja.mp4"),
  "dal-2": require("../assets/audio/letters-game/madrsa.mp4"),
  "dal-3": require("../assets/audio/letters-game/kard.mp4"),

  // ر - Ra
  "ra-1": require("../assets/audio/letters-game/rmal.mp4"),
  "ra-2": require("../assets/audio/letters-game/mraya.mp4"),
  "ra-3": require("../assets/audio/letters-game/kmar.mp4"),

  // ز - Zay
  "zay-1": require("../assets/audio/letters-game/zarafa.mp4"),
  "zay-2": require("../assets/audio/letters-game/ghzala.mp4"),
  "zay-3": require("../assets/audio/letters-game/khobz.mp4"),

  // س - Sin
  "sin-1": require("../assets/audio/letters-game/srir.mp4"),
  "sin-2": require("../assets/audio/letters-game/kesra.mp4"),
  "sin-3": require("../assets/audio/letters-game/kas.mp4"),

  // ش - Shin
  "shin-1": require("../assets/audio/letters-game/chems.mp4"),
  "shin-2": require("../assets/audio/letters-game/mochta.mp4"),
  "shin-3": require("../assets/audio/letters-game/mechmach.mp4"),

  // ص - Sad
  "sad-1": require("../assets/audio/letters-game/shan.mp4"),
  "sad-2": require("../assets/audio/letters-game/bssal.mp4"),
  "sad-3": require("../assets/audio/letters-game/kfas.mp4"),

  // ط - Ta2
  "ta2-1": require("../assets/audio/letters-game/tabla.mp4"),
  "ta2-2": require("../assets/audio/letters-game/tmatm.mp4"),
  "ta2-3": require("../assets/audio/letters-game/khayt.mp4"),

  // ع - Ain
  "ain-1": require("../assets/audio/letters-game/anab.mp4"),
  "ain-2": require("../assets/audio/letters-game/maajoun.mp4"),
  "ain-3": require("../assets/audio/letters-game/dbaa.mp4"),

  // غ - Ghain
  "ghain-1": require("../assets/audio/letters-game/ghaba.mp4"),
  "ghain-2": require("../assets/audio/letters-game/moghref.mp4"),
  "ghain-3": require("../assets/audio/letters-game/sebagh.mp4"),

  // ف - Fa
  "fa-1": require("../assets/audio/letters-game/foum.mp4"),
  "fa-2": require("../assets/audio/letters-game/tfol.mp4"),
  "fa-3": require("../assets/audio/letters-game/sif.mp4"),

  // ق - Qaf
  "qaf-1": require("../assets/audio/letters-game/qalb.mp4"),
  "qaf-2": require("../assets/audio/letters-game/saqr.mp4"),
  "qaf-3": require("../assets/audio/letters-game/wraq.mp4"),

  // ك - Kaf
  "kaf-1": require("../assets/audio/letters-game/kelb.mp4"),
  "kaf-2": require("../assets/audio/letters-game/sekina.mp4"),
  "kaf-3": require("../assets/audio/letters-game/serdouk.mp4"),

  // ل - Lam
  "lam-1": require("../assets/audio/letters-game/lsan.mp4"),
  "lam-2": require("../assets/audio/letters-game/alam.mp4"),
  "lam-3": require("../assets/audio/letters-game/jmal.mp4"),

  // م - Mim
  "mim-1": require("../assets/audio/letters-game/masjid.mp4"),
  "mim-2": require("../assets/audio/letters-game/nemal.mp4"),
  "mim-3": require("../assets/audio/letters-game/lham.mp4"),

  // ن - Nun
  "nun-1": require("../assets/audio/letters-game/najma.mp4"),
  "nun-2": require("../assets/audio/letters-game/fenjal.mp4"),
  "nun-3": require("../assets/audio/letters-game/ain.mp4"),

  // ه - Ha2
  "ha2-1": require("../assets/audio/letters-game/hlal.mp4"),
  "ha2-2": require("../assets/audio/letters-game/nahr.mp4"),
  "ha2-3": require("../assets/audio/letters-game/wajh.mp4"),

  // و - Waw
  "waw-1": require("../assets/audio/letters-game/warda.mp4"),
  "waw-2": require("../assets/audio/letters-game/dwa.mp4"),
  "waw-3": require("../assets/audio/letters-game/jarw.mp4"),

  // ي - Ya
  "ya-1": require("../assets/audio/letters-game/yed.mp4"),
  "ya-2": require("../assets/audio/letters-game/lil.mp4"),
  "ya-3": require("../assets/audio/letters-game/korsi.mp4"),

  // ق٢ - Qaf2
  "qaf2-1": require("../assets/audio/letters-game/gandoura.mp4"),
  "qaf2-2": require("../assets/audio/letters-game/bagra.mp4"),
  "qaf2-3": require("../assets/audio/letters-game/brag.mp4"),
};

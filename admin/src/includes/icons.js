import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as MaterialIcons from 'oh-vue-icons/icons/md';
import * as BootstrapIcons from 'oh-vue-icons/icons/bi';
import * as HeroIcons from 'oh-vue-icons/icons/hi';
import * as GameIcons from 'oh-vue-icons/icons/gi';
import * as OctiIcons from 'oh-vue-icons/icons/oi';
import * as RemixIcons from 'oh-vue-icons/icons/ri';
import * as FontAwesome from 'oh-vue-icons/icons/fa';
import * as Ionicons from 'oh-vue-icons/icons/io';
import * as LineAwesome from 'oh-vue-icons/icons/la';

const Md = Object.values({ ...MaterialIcons });
const Bi = Object.values({ ...BootstrapIcons });
const Hi = Object.values({ ...HeroIcons });
const Gi = Object.values({ ...GameIcons });
const Oi = Object.values({ ...OctiIcons });
const Ri = Object.values({ ...RemixIcons });
const Fa = Object.values({ ...FontAwesome });
const Io = Object.values({ ...Ionicons });
const La = Object.values({ ...LineAwesome });

addIcons(...Md);
addIcons(...Bi);
addIcons(...Hi);
addIcons(...Gi);
addIcons(...Oi);
addIcons(...Ri);
addIcons(...Fa);
addIcons(...Io);
addIcons(...La);

export default {
  install(app) {
    app.component('v-icon', OhVueIcon);
  },
};

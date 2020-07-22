import editeur from './editeur.vue';

editeur.install = Vue => {
  Vue.component(editeur.name, editeur)
}

export default editeur;
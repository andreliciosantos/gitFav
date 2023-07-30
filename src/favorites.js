// classe qe vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}

// classe que vai criar a visualização de eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root){
    super(root)
    
    this.update()
  }

  update() {
    this.removeAllTr()
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
        <td class="user">
          <img src="https://github.com/Fernanda-Kipper.png" alt="Foto de perfil de Fernanda Kipper">
          <a target="_blank" href="https://github.com/Fernanda-Kipper">
            <p>Fernanda Kipper</p>
            <span>Fernanda-Kipper</span>
          </a>
        </td>
        <td class="repositories">
          39
        </td>
        <td class="followers">
          1600
        </td>
        <td>
          <button class="remove">&times;</button>
        </td>
    ` 
    return tr
  }

  removeAllTr() {
    const tbody = this.root.querySelector('table tbody')

    tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}
// classe qe vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
      login: 'andreliciosantos',
      name: "Andrelicio Santos",
      public_repos: '15',
      followers: '12000'
      },
      {
      login: 'diego3g',
      name: "Diego Fernandes",
      public_repos: '15',
      followers: '12000'
      }
    ]
  }

  delete(user) {
    // Higher-order function -> filter
    this.entries = this.entries.filter(entry => entry.login !== user.login)
    this.update()
  }
}

// classe que vai criar a visualização de eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root){
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    
    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()
      
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Foto de perfil de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOK = confirm('Tem certeza que deseja desfavoritar essa pessoa?')
        if(isOK){
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/andreliciosantos.png" alt="Foto de perfil de Andrelicio Santos">
        <a target="_blank" href="https://github.com/andreliciosantos">
          <p>Andrelicio Santos</p>
          <span>/andreliciosantos</span>
        </a>
      </td>
      <td class="repositories">
        00
      </td>
      <td class="followers">
        0000
      </td>
      <td>
        <button class="remove">Remover</button>
      </td>
    ` 
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}